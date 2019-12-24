import {Provider} from '@angular/core';
import {VideosHttpService} from '../utils/videos-http.service';
import {VideosService} from './videos.service';

/**
 * Провайдеры компонента
 * @type {(VideosService | VideosHttpService)[]}
 */
export const VIDEOS_PROVIDERS: Provider[] = [
  VideosService,
  VideosHttpService
];
