import { Component, OnInit } from '@angular/core';
import { ScanService } from '../services/scan.service';

@Component({
  selector: 'my-scan',
  template: `
    <my-video-devices
      [videoDevices]="scanService.videoDevices"
      [videoDevice]="scanService.videoDevice"
      (selectVideoDevice)="onSelectVideoDevice($event)">
    </my-video-devices>
    
    <div class="my-1"></div>
    
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

  private onSelectVideoDevice(videoDeviceId: string) {
    this.scanService.turnOnCamera(videoDeviceId);
  }
}
