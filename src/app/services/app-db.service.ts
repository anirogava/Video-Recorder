import { Injectable } from '@angular/core';
import { Dexie, Table } from 'dexie';
import { VideoRecord } from '../models';

@Injectable({
  providedIn: 'root',
})
export class AppDB extends Dexie {
  videos!: Table<VideoRecord, number>;

  constructor() {
    super('VideoRecorderDB');
    this.version(1).stores({
      videos: '++id, title, createdAt',
    });
  }
}
