import { Component, OnInit } from '@angular/core';
import { ScanService } from '../services/scan.service';

@Component({
  selector: 'my-scan',
  template: `
    <my-camera
      [stream]="scanService.stream">
    </my-camera>
  `
})
export class ScanComponent implements OnInit {
  constructor(
    private scanService: ScanService
  ) {}

  ngOnInit() {
    this.scanService.scan();
  }
}
