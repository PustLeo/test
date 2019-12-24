import {Routes} from '@angular/router';
import {CanActivateRootService} from './utils/can-activate-root.service';

/**
 * Роутинг первичного модуля
 * @type {Routes}
 */
export const APP_ROUTES: Routes = [
  {
    path: '',
    canActivate: [CanActivateRootService],
    children: [
      {
        path: 'videos',
        loadChildren: () => import('./videos.module/videos.module')
          .then(m => m.VideosModule)
      },
      {
        path: '**',
        redirectTo: 'videos',
        pathMatch: 'full'
      }
    ]
  }
];

