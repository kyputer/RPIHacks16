import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ScanComponent } from '../components/';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'scan', component: ScanComponent }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class ScanRoutingModule { }
