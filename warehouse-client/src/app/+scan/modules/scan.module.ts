import { NgModule } from '@angular/core';

import {
  CameraComponent,
  VideoIdListComponent,

  ScanComponent
} from '../components/';
import { ScanService } from '../services/';

import { SharedModule } from '../../shared/modules/';
import { ScanRoutingModule } from './';

@NgModule({
  imports: [
    SharedModule,

    ScanRoutingModule
  ],
  declarations: [
    CameraComponent,
    VideoIdListComponent,

    ScanComponent
  ],
  providers: [
    ScanService
  ]
})
export class ScanModule { }
