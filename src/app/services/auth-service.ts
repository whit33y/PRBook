import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ID, Account } from 'appwrite';
import { client } from '../../lib/appwrite';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private account: Account;
  private loggedInUserSubject = new BehaviorSubject<any>(null);
  loggedInUser$ = this.loggedInUserSubject.asObservable();
  constructor() {
    this.account = new Account(client);
    this.checkCurrentSession();
  }

  async login(email: string, password: string) {
    await this.account.createEmailPasswordSession(email, password);
    const user = await this.account.get();
    this.loggedInUserSubject.next(user);
  }

  async register(email: string, password: string, name: string) {
    try {
      await this.account.create(ID.unique(), email, password, name);
      return this.login(email, password);
    } catch (error) {
      console.error('Registration failed: ', error);
      throw error;
    }
  }

  async logout() {
    await this.account.deleteSession('current');
    this.loggedInUserSubject.next(null);
  }

  private async checkCurrentSession() {
    try {
      const user = await this.account.get();
      this.loggedInUserSubject.next(user);
    } catch (error) {
      this.loggedInUserSubject.next(null);
    }
  }
}

export type User = {
  email: string;
  password: string;
  name: string;
};
