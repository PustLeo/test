import {Routes} from '@angular/router';
import {VideosComponent} from './videos/videos.component';

/**
 * Роутинг модуля отображения видео-элементов
 * @type {Routes}
 */
export const VIDEOS_ROUTES: Routes = [{
  path: '',
  component: VideosComponent
}];
