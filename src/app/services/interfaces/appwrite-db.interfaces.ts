export interface RunningAndCyclingRecords {
  total: number;
  documents: Array<RunningAndCyclingRecordsDocuments>;
}

export interface RunningAndCyclingRecordsDocuments {
  user_id: string;
  distance: number;
  record_time: string;
  type: number;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[];
  $databaseId: string;
  $collectionId: string;
}

export interface GymRecords {
  total: number;
  documents: Array<GymRecordsDocuments>;
}

export interface GymRecordsDocuments {
  user_id: string;
  weight: number;
  body_part: string;
  excercise: string;
  reps: number;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[];
  $databaseId: string;
  $collectionId: string;
}
