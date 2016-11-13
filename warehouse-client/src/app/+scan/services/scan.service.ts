import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { Configs } from '../../shared/configs/';
import { extractData, handleError } from '../../shared/lib/';

@Injectable()
export class ScanService {
  private url = `${Configs.httpUrl}`;
  stream: any;
  videoDevices: any[] = [];
  videoDevice: any = {
    label: 'Select',
    id: 'select'
  };

  constructor(
    private http: Http
  ) {}

  getVideoIdList() {
    if (!this.hasUserMedia()) {
      alert('Sorry, your cannot call because of browser compatibility. Please use Chrome, Firefox, or Opera.');
      return;
    }

    navigator.mediaDevices.enumerateDevices()
      .then(devices => {
        devices.forEach(device => {
          if (device.kind === 'videoinput') {
            // alert(device.deviceId);
            this.videoDevices = [...this.videoDevices, { label: device.label, id: device.deviceId }];
          }
        });
      });
  }

  turnOnCamera(videoDeviceId: string) {
    console.log('videoDeviceId', videoDeviceId);
    const idx = _.chain(this.videoDevices).map('id').indexOf(videoDeviceId).value();

    console.log('idx', idx);
    this.videoDevice = this.videoDevices[idx];
    console.log('videoDevice', this.videoDevice);

    const constraints = { audio: false, video: {
      // width: { ideal: 1280 },
      // height: { ideal: 1024 },
      deviceId: this.videoDevice.id ? { exact: this.videoDevice.id } : undefined
    } };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => this.stream = stream)
      .catch(error => console.log('getUserMedia: ', error));
  }

  private hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia;
    // navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    return !!navigator.getUserMedia;
  }
}
