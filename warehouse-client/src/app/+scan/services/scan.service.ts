import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Configs } from '../../shared/configs/';
import { extractData, handleError } from '../../shared/lib/';

@Injectable()
export class ScanService {
  private leaguesUrl = `${Configs.httpUrl}/api/leagues`;
  stream: any;

  constructor(
    private http: Http
  ) {}

  getSomething(): Observable<any[]> {
    return this.http
      .get(`${this.leaguesUrl}/get-something`)
      .map(extractData)
      .catch(handleError);
  }

  scan() {
    if (!this.hasUserMedia()) {
      alert('Sorry, your cannot call because of browser compatibility. Please use Chrome, Firefox, or Opera.');
      return;
    }
    // this.store.dispatch({ type: CallActions.CALL_NEW_CHAT, payload: this.otherId });


    const constraints = { audio: false, video: true };

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
