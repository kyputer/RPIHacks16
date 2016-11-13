import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'my-video-id-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <select
      class="form-control"
      [ngModel]="videoId"
      (ngModelChange)="onSelectLanguage($event)">
      <option value="select">Select</option>
      <option *ngFor="let id of videoIds" [ngValue]="id">{{id}}</option>
    </select>
  `
})
export class VideoIdListComponent {
  @Input() videoIds: string[];
  @Input() videoId: string;
  @Output() selectVideoId = new EventEmitter<string>();


  private onSelectLanguage(videoId: string) {
    if (videoId === 'select') {
      return;
    }

    this.selectVideoId.emit(videoId);
  }
}
