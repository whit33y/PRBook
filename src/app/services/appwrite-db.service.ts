import { Injectable } from '@angular/core';
import { Databases, Query } from 'appwrite';
import { client } from '../../lib/appwrite';
import { environment } from '../../../environment';
import {
  GymRecordsDocuments,
  RunningAndCyclingRecordsDocuments,
} from './interfaces/appwrite-db.interfaces';
import { catchError, from, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppwriteDbService {
  private database: Databases;
  private databaseId = environment.databaseId;
  private runningAndCyclingRecordsId = environment.runningAndCyclingRecordsId;
  private gymRecordsId = environment.gymRecordsId;

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

  getUserGymRecords(userId: string): Observable<GymRecordsDocuments[]> {
    if (!userId) {
      return of([]);
    }
    return from(
      this.database.listDocuments(this.databaseId, this.gymRecordsId, [
        Query.equal('user_id', userId),
      ])
    ).pipe(
      map((response) => response.documents as GymRecordsDocuments[]),
      catchError((error) => {
        console.error('Failed loading records:', error);
        return of([]);
      })
    );
  }

  //get get get get get get get get get get get get get get get get

  //create create create create create create create create create

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

  createNewGymRecord(
    user_id: string,
    weight: number,
    body_part: string,
    excercise: string,
    reps: number
  ): Observable<GymRecordsDocuments | null> {
    return from(
      this.database.createDocument(
        this.databaseId,
        this.gymRecordsId,
        'unique()',
        {
          user_id,
          weight,
          body_part,
          excercise,
          reps,
        }
      )
    ).pipe(
      map((response) => response as GymRecordsDocuments),
      catchError((error) => {
        console.error(error);
        return of(null);
      })
    );
  }

  //create create create create create create create create create
}
