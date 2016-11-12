import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '**', redirectTo: 'scan' }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
