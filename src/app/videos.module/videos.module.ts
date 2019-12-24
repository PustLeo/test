import {NgModule} from '@angular/core';
import {VideosComponent} from './videos/videos.component';
import {VIDEOS_ROUTES} from './videos.routes';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {SharedModule} from '@shared/shared.module';
import {ElementComponent} from './element/element.component';
import {VideoInfoPipe} from './utils/video-info.pipe';

/**
 * Модуль отображения видео-элементов
 */
@NgModule({
  declarations: [
    VideosComponent,
    ElementComponent,
    VideoInfoPipe
  ],
  entryComponents: [
    VideosComponent,
    ElementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(VIDEOS_ROUTES),
    SharedModule.forRoot()
  ],
  exports: [
    RouterModule
  ]
})
export class VideosModule {}
