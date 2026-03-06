import { Action, Selector, State, StateContext } from '@ngxs/store';
import { VideoQuality, VideoStateModel } from '../models';
import { Injectable } from '@angular/core';
import { AddVideo, DeleteVideo, LoadVideos, SetQuality } from './video.actions';
import { VideoStorageService } from '../services/video-storage.service';

@State<VideoStateModel>({
  name: 'videoApp',
  defaults: {
    quality: VideoQuality.MEDIUM,
    videos: [],
  },
})
@Injectable()
export class VideoState {
  constructor(private storageService: VideoStorageService) {}

  @Selector()
  static getVideos(state: VideoStateModel) {
    return state.videos;
  }
  @Selector()
  static getQuality(state: VideoStateModel) {
    return state.quality;
  }

  @Action(LoadVideos)
  async loadVideos(ctx: StateContext<VideoStateModel>) {
    const videos = await this.storageService.getAllVideos();
    ctx.patchState({ videos });
  }

  @Action(AddVideo)
  async addVideo(ctx: StateContext<VideoStateModel>, { video }: AddVideo) {
    const id = await this.storageService.saveVideo(video);
    const state = ctx.getState();

    ctx.patchState({
      videos: [...state.videos, { ...video, id }],
    });
  }
  @Action(DeleteVideo)
  async deleteVideo(ctx: StateContext<VideoStateModel>, { id }: DeleteVideo) {
    await this.storageService.deleteVideo(id);
    const state = ctx.getState();

    ctx.patchState({
      videos: state.videos.filter((v) => v.id !== id),
    });
  }

  @Action(SetQuality)
  setQuality(ctx: StateContext<VideoStateModel>, { quality }: SetQuality) {
    ctx.patchState({ quality });
  }
}
