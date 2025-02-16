import { Injectable } from '@angular/core';
import { Databases, Query } from 'appwrite';
import { client } from '../../lib/appwrite';
import { environment } from '../../../environment';
import { RunningAndCyclingRecordsDocuments } from './interfaces/appwrite-db.interfaces';
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

  //get get get get get get get get get get get get get get get get

  async getAllRunningAndCyclingRecords(
    userId: string
  ): Promise<RunningAndCyclingRecordsDocuments[]> {
    if (userId) {
      try {
        const response = await this.database.listDocuments(
          this.databaseId,
          this.runningAndCyclingRecordsId,
          [Query.equal('user_id', userId)]
        );
        console.log(response);
        return response.documents as RunningAndCyclingRecordsDocuments[];
      } catch (error) {
        console.error('Failed loading records:', error);
        return [];
      }
    } else {
      return [];
    }
  }

  //get get get get get get get get get get get get get get get get

  //create create create create create create create create create

  async createRunningAndCyclingRecord(
    user_id: string,
    distance: number,
    record_time: string
  ): Promise<RunningAndCyclingRecordsDocuments | null> {
    try {
      const response = await this.database.createDocument(
        this.databaseId,
        this.runningAndCyclingRecordsId,
        'unique()',
        {
          user_id: user_id,
          distance: distance,
          record_time: record_time,
        }
      );
      console.log('Document created:', response);
      return response as RunningAndCyclingRecordsDocuments;
    } catch (error) {
      console.error('Failed to create record:', error);
      return null;
    }
  }

  //create create create create create create create create create
}
