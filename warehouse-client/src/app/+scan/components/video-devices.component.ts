import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'my-video-devices',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="form-inline">
      <select
        class="form-control"
        [ngModel]="videoDevice.id"
        (ngModelChange)="onSelectVideoDevice($event)">
        <option value="select">Select</option>
        <option *ngFor="let device of videoDevices" [ngValue]="device.id">{{device.label}}</option>
      </select>
    <div>
  `
})
export class VideoDevicesComponent {
  @Input() videoDevices: any[];
  @Input() videoDevice: any;
  @Output() selectVideoDevice = new EventEmitter<any>();


  private onSelectVideoDevice(videoDeviceId: string) {
    if (videoDeviceId === 'select') {
      return;
    }

    this.selectVideoDevice.emit(videoDeviceId);
  }
}
