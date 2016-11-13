import { Component, OnInit } from '@angular/core';
import { ScanService } from '../services/scan.service';

@Component({
  selector: 'my-scan',
  template: `
    <my-video-id-list
      [videoIds]="scanService.videoIds"
      [videoId]="scanService.videoId"
      (selectVideoId)="onSelectVideoId($event)">
    </my-video-id-list>
    <my-camera
      [stream]="scanService.stream">
    </my-camera>
  `
})
export class ScanComponent implements OnInit {
  constructor(
    private scanService: ScanService
  ) {}

  ngOnInit() {
    this.scanService.getVideoIdList();
  }

  private onSelectVideoId(videoId: string) {
    this.scanService.scan(videoId);
  }
}
