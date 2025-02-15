import { Injectable } from '@angular/core';
import { Databases, Query } from 'appwrite';
import { client } from '../../lib/appwrite';
import { environment } from '../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AppwriteDbService {
  private database: Databases;
  private databaseId = environment.databaseId;
  private runningAndCyclingRecordsId = environment.runningAndCyclingRecordsId;

  constructor() {
    this.database = new Databases(client);
  }

  async getAllRunningAndCyclingRecords(userId: string) {
    if (userId) {
      try {
        const response = await this.database.listDocuments(
          this.databaseId,
          this.runningAndCyclingRecordsId,
          [Query.equal('user_id', userId)]
        );
        console.log(response);
        return response.documents;
      } catch (error) {
        console.error('Failed loading records:', error);
        return [];
      }
    } else {
      return;
    }
  }
}
