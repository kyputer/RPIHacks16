import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Configs } from '../../shared/configs/';
import { extractData, handleError } from '../../shared/lib/';

@Injectable()
export class ScanService {
  private leaguesUrl = `${Configs.httpUrl}/api/leagues`;
  stream: any;
  videoIds: string[] = [];
  videoId: string = 'select';

  constructor(
    private http: Http
  ) {}

  getSomething(): Observable<any[]> {
    return this.http
      .get(`${this.leaguesUrl}/get-something`)
      .map(extractData)
      .catch(handleError);
  }

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
            this.videoIds = [...this.videoIds, device.deviceId];
          }
        });
        console.log('this.videoIds', this.videoIds);
      });
  }

  scan(videoId: string) {
    this.videoId = videoId;

    const constraints = { audio: false, video: {
      // width: { ideal: 1280 },
      // height: { ideal: 1024 },
      deviceId: this.videoId ? { exact: this.videoId } : undefined
    } };

    navigator.mediaDevices.getUserMedia(constraints)
      .then(stream => {
        console.log('stream: ', stream);
        this.stream = stream;
      })
      .catch(error => {
        console.log('getUserMedia: ', error);
      });
  }

  private hasUserMedia() {
    navigator.getUserMedia = navigator.getUserMedia;
    // navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    return !!navigator.getUserMedia;
  }
}
