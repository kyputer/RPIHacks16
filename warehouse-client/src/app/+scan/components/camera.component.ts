import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChange, OnInit, AfterViewInit, OnDestroy, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';
const Quagga = require('quagga');

@Component({
  selector: 'my-camera',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    video {
      border-radius: .3rem;
      box-shadow: 0 0 1.5rem rgba(0, 0, 0, .15);
    }
  `],
  template: `
    <div>
      <button class="btn btn-primary" (click)="onScan()">Scan</button>
      <button class="btn btn-secondary" (click)="onTest()">Test</button>
    </div>
    
    <div class="my-1"></div>
    
    <video #videoDOM></video>
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
        window.location.href = `http://104.236.25.176/entry?itemno=${res.codeResult.code}`;
        // alert(res);
      })
    });
  }

  onTest() {
    window.location.href = String(Math.random()).substr(2);
  }
}
