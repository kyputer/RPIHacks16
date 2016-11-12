import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChange, OnInit, AfterViewInit, OnDestroy, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'my-camera',
  styles: [`
    .my-video {
      z-index: 1;
    }
  `],
  template: `
    <video #videoDOM class="my-video"></video>
  `
})
export class CameraComponent  implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  @Input() stream: any;
  @ViewChild('videoDOM') videoDOM: ElementRef;
  video: any;
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

    this.showVideoStream.emit(null);
  }

  ngOnDestroy() {
    if (this.subsShowVideoStream) this.subsShowVideoStream.unsubscribe();
  }
}
