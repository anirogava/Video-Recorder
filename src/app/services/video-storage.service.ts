import { Injectable } from '@angular/core';
import { AppDB } from './app-db.service';
import { VideoRecord } from '../models';

@Injectable({
  providedIn: 'root',
})
export class VideoStorageService {
  constructor(private db: AppDB) {}

  async saveVideo(video: VideoRecord): Promise<number> {
    return this.db.videos.add(video);
  }

  async getAllVideos(): Promise<VideoRecord[]> {
    return this.db.videos.reverse().toArray();
  }

  async deleteVideo(id: number): Promise<void> {
    await this.db.videos.delete(id);
  }
}
