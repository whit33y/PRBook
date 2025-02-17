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
