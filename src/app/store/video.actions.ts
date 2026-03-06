import { VideoQuality, VideoRecord } from '../models';

export class SetQuality {
  static readonly type = '[Video] Set Quality';
  constructor(public quality: VideoQuality) {}
}

export class AddVideo {
  static readonly type = '[Video] Add Video';
  constructor(public video: VideoRecord) {}
}

export class LoadVideos {
  static readonly type = '[Video] Load Videos';
  constructor() {}
}

export class DeleteVideo {
  static readonly type = '[Video] Delete Video';
  constructor(public id: number) {}
}
