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

  getBestGymRecord(userId: string, exercise: string): Observable<GymRecordsDocuments | null> {
    if (!userId || !exercise) {
      return of(null);
    }
    return from(
      this.database.listDocuments(this.databaseId, this.gymRecordsId, [
        Query.equal('user_id', userId),
        Query.equal('excercise', exercise),
        Query.orderDesc('weight'),
        Query.limit(1),
      ])
    ).pipe(
      map((response) => (response.documents.length > 0 ? response.documents[0] as GymRecordsDocuments : null)),
      catchError((error) => {
        console.error('Failed loading best gym record:', error);
        return of(null);
      })
    );
  }
  
  getBestTimeRecord(userId: string, type: number, distance: number): Observable<RunningAndCyclingRecordsDocuments | null> {
    if (!userId || !type || !distance) {
      return of(null);
    }
    return from(
      this.database.listDocuments(this.databaseId, this.runningAndCyclingRecordsId, [
        Query.equal('user_id', userId),
        Query.equal('type', type),
        Query.equal('distance', distance),
        Query.orderAsc('record_time'),
        Query.limit(1),
      ])
    ).pipe(
      map((response) => (response.documents.length > 0 ? response.documents[0] as RunningAndCyclingRecordsDocuments : null)),
      catchError((error) => {
        console.error('Failed loading best time record:', error);
        return of(null);
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
