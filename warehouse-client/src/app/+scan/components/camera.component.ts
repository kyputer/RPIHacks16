import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChange, OnInit, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
const Quagga = require('quagga');

@Component({
  selector: 'my-camera',
  styles: [`
    .my-video {
      z-index: 1;
    }
  `],
  template: `
    <div>
      <button class="btn btn-primary" (click)="onScan()">Scan</button>
    </div>
    <video #videoDOM class="my-video"></video>
    <!--<canvas #photoDOM></canvas>-->
  `
})
export class CameraComponent  implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input() stream: any;
  @ViewChild('videoDOM') videoDOM: ElementRef;
  // @ViewChild('photoDOM') photoDOM: ElementRef;
  video: any;
  photo: any;
  subsShowVideoStream: Subscription;
  showVideoStream = new EventEmitter<void>();

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['stream'] && !_.isEqual(changes['stream'].previousValue, changes['stream'].currentValue)) {
      if (this.stream) {
        this.showVideoStream.emit(null);
      }
    }
  }

  ngOnInit() {
    this.subsShowVideoStream = this.showVideoStream
      .subscribe(() => {
        if (this.stream && this.video) {
          this.video.src = URL.createObjectURL(this.stream);
          this.video.onloadedmetadata = () => {
            this.video.play();
          };
        }
      });
  }

  ngAfterViewInit() {
    this.video = this.videoDOM.nativeElement;
    // this.photo = this.photoDOM.nativeElement;

    this.showVideoStream.emit(null);
  }

  ngOnDestroy() {
    if (this.subsShowVideoStream) this.subsShowVideoStream.unsubscribe();
  }

  onScan() {
    // const canvas = this.photo;
    // const context = canvas.getContext('2d');
    // context.drawImage(this.video, 0, 0, canvas.width, canvas.height);

    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: this.video    // Or '#yourElement' (optional)
      },
      decoder : {
        readers : ["upc_reader", "upc_e_reader"],
        debug: {
          drawBoundingBox: true,
          showFrequency: true,
          drawScanline: true,
          showPattern: true
        }
      }
    }, err => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("Initialization finished. Ready to start");
      Quagga.start();

      Quagga.onDetected(res => {
        console.log('res', res);
        console.log('code', res.codeResult.code);
        window.location.href = `http://104.236.25.176/entry?itemno=${res.codeResult.code}`;
        // alert(res);
      })
    });
  }
}
