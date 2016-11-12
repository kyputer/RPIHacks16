import { NgModule } from '@angular/core';

import { ScanModule } from './+scan/modules/scan.module';
import { SharedModule } from './shared/modules/';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    ScanModule,

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
