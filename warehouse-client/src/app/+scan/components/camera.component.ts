import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChange, OnInit, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import * as _ from 'lodash';

@Component({
  selector: 'my-camera',
  styles: [`
    .my-video {
      z-index: 1;
    }
  `],
  template: `
    <video #videoDOM class="my-video"></video>
    
    <button (click)="onTakePhoto()">Test</button>
    <canvas #photoDOM></canvas>
  `
})
export class CameraComponent  implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input() stream: any;
  @ViewChild('videoDOM') videoDOM: ElementRef;
  @ViewChild('photoDOM') photoDOM: ElementRef;
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
    this.photo = this.photoDOM.nativeElement;

    this.showVideoStream.emit(null);
  }

  ngOnDestroy() {
    if (this.subsShowVideoStream) this.subsShowVideoStream.unsubscribe();
  }

  onTakePhoto() {
    const canvas = this.photo;
    const context = canvas.getContext('2d');
    context.drawImage(this.video, 0, 0, canvas.width, canvas.height);
  }
}
