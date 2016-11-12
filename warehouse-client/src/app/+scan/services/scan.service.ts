import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Configs } from '../../shared/configs/';
import { extractData, handleError } from '../../shared/lib/';

@Injectable()
export class ScanService {
  private leaguesUrl = `${Configs.httpUrl}/api/leagues`;

  constructor(
    private http: Http
  ) {}

  getSomething(): Observable<any[]> {
    return this.http
      .get(`${this.leaguesUrl}/get-something`)
      .map(extractData)
      .catch(handleError);
  }
}
