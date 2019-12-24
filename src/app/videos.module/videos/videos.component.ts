import {Component, OnDestroy, OnInit} from '@angular/core';
import {VideosService} from './videos.service';
import {CommonStaticService} from '@common/services/common-static/common-static.service';
import {VideosModel} from './videos.model';
import {VIDEOS_PROVIDERS} from './videos.providers';

/**
 * Компонент отображения списка видео-элементов
 */
@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  providers: VIDEOS_PROVIDERS
})
export class VideosComponent implements OnInit, OnDestroy {
  /** Модель данных */
  public model: VideosModel;
  /** Сопоставление данных */
  public trackByFn = CommonStaticService.trackByFn;

  /**
   * Конструктор
   * @param {VideosService} service
   */
  constructor(public service: VideosService) {
    this.model = service.model;
  }

  /**
   * Инициализация
   */
  ngOnInit(): void {
    this.service.init();
  }

  /**
   * Уничтожение
   */
  ngOnDestroy(): void {
    this.service.destroy();
  }

  /**
   * Изменение данных поиска
   */
  public changeSearchValue: () => void = () => this.service.changeSearchValue();

  /**
   * Добавление видео-элемента в список сохраненных
   * @param value
   * @return {Promise<void>}
   */
  public addVideoElement: (value: any) => void = (value: any) => this.service.addVideoElement(value);

  /**
   * Удаление конкретного видео-элемента
   * @param $event
   * @param {number} index
   */
  public deleteSavedElement: ($event: any, index: number) => void = ($event: any, index: number) => this.service.deleteSavedElement($event, index);
}
