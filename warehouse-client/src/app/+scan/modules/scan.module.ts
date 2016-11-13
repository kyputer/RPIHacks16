import { NgModule } from '@angular/core';

import {
  CameraComponent,
  VideoDevicesComponent,

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
    VideoDevicesComponent,

    ScanComponent
  ],
  providers: [
    ScanService
  ]
})
export class ScanModule { }
