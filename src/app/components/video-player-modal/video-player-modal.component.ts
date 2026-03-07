import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SafeUrlPipe } from "../../../pipes/safe-url.pipe";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-video-player-modal',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './video-player-modal.component.html',
  styleUrl: './video-player-modal.component.scss'
})
export class VideoPlayerModalComponent {
  @Input() videoBlob!: Blob;
  @Output() close = new EventEmitter<void>();

  @ViewChild('player') player!: ElementRef<HTMLVideoElement>;

  isPlaying = true;
  currentTime = '00:00';
  duration = '00:00';
  progressPercent = 0;

  togglePlay(): void {
    const video = this.player.nativeElement;
    if (video.paused) {
      video.play();
      this.isPlaying = true;
    } else {
      video.pause();
      this.isPlaying = false;
    }
  }

  updateProgress(): void {
    const video = this.player.nativeElement;

    this.progressPercent = (video.currentTime / video.duration) * 100;

    this.currentTime = this.formatTime(video.currentTime);
    this.duration = this.formatTime(video.duration);
  }

  private formatTime(seconds: number): string {
    if (isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }
}
