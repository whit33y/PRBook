import { Injectable } from '@angular/core';
import { Databases, Query } from 'appwrite';
import { client } from '../../lib/appwrite';
import { environment } from '../../../environment';
import { RunningAndCyclingRecordsDocuments } from './interfaces/appwrite-db.interfaces';
import { catchError, from, map, Observable, of } from 'rxjs';

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

  getUserRecords(
    userId: string
  ): Observable<RunningAndCyclingRecordsDocuments[]> {
    if (!userId) {
      return of([]);
    }
    return from(
      this.database.listDocuments(
        this.databaseId,
        this.runningAndCyclingRecordsId,
        [Query.equal('user_id', userId)]
      )
    ).pipe(
      map(
        (response) => response.documents as RunningAndCyclingRecordsDocuments[]
      ),
      catchError((error) => {
        console.error('Failed loading records:', error);
        return of([]);
      })
    );
  }

  //get get get get get get get get get get get get get get get get

  //create create create create create create create create create

  async createRunningAndCyclingRecord(
    user_id: string,
    distance: number,
    record_time: string,
    type: number
  ): Promise<RunningAndCyclingRecordsDocuments | null> {
    try {
      const response = await this.database.createDocument(
        this.databaseId,
        this.runningAndCyclingRecordsId,
        'unique()',
        {
          user_id,
          distance,
          record_time,
          type,
        }
      );
      console.log('Document created:', response);
      return response as RunningAndCyclingRecordsDocuments;
    } catch (error) {
      console.error('Failed to create record:', error);
      return null;
    }
  }

  createNewRecord(
    user_id: string,
    distance: number,
    record_time: string,
    type: number
  ): Observable<RunningAndCyclingRecordsDocuments | null> {
    return from(
      this.database.createDocument(
        this.databaseId,
        this.runningAndCyclingRecordsId,
        'unique()',
        {
          user_id,
          distance,
          record_time,
          type,
        }
      )
    ).pipe(
      map((response) => response as RunningAndCyclingRecordsDocuments),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }

  //create create create create create create create create create
}
