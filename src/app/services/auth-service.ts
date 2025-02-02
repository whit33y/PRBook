import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}
}

export type User = {
  email: string;
  password: string;
  name: string;
};
