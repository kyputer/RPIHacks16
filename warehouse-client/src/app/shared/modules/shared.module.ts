import { NgModule } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

// import {
//   AddCurrentLanguagePipe
// } from '../../shared/pipes/';

import {
  // NavbarComponent
} from '../components/';

// import { AuthHttpService } from '../services/';

const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  BrowserModule,
  HttpModule,
  ReactiveFormsModule
];

const PIPES = [

];

const COMPONENTS = [

];

@NgModule({
  imports: [
    MODULES
  ],
  declarations: [
    PIPES,
    COMPONENTS
  ],
  providers: [
    // AuthHttpService
  ],
  exports: [
    MODULES,
    PIPES,
    COMPONENTS
  ]
})
export class SharedModule { }
