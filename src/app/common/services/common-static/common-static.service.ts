import {Injectable} from '@angular/core';
import {ApiSettingsModel} from '@common/services/common-static/api-settings.model';

/**
 * Сервис статичных данных
 */
@Injectable({
  providedIn: 'root'
})
export class CommonStaticService {
  /** Ключ сохраненных элементов внутри хранилища */
  public static readonly SAVED_LIST_KEY = 'saved-list';
  /** Регулярное выражение пути доп файлов */
  public static readonly ASSETS_PATH_REGEX = /^\/(assets)/;
  /** Путь доп файлов */
  public static readonly ASSETS_PATH = '/assets';
  /** Путь к файлу настроек */
  public static readonly SETTINGS_PATH = CommonStaticService.ASSETS_PATH + '/app.settings.json';

  /**
   * Конструктор
   */
  constructor() {}
  /** Модель API настроек */
  protected _apiSettings: ApiSettingsModel = new ApiSettingsModel();

  /**
   * Сохранение API настроек
   * @param {ApiSettingsModel} data
   */
  public set apiSettings(data: ApiSettingsModel) {
    this._apiSettings.apiKey = data.apiKey;
    this._apiSettings.host = data.host;
  }

  /**
   * Загрузка API настроек
   * @return {ApiSettingsModel}
   */
  public get apiSettings(): ApiSettingsModel {
    return this._apiSettings;
  }

  /**
   * Сопоставление данных
   * @param {number} index
   * @param elem
   * @return {number}
   */
  public static trackByFn(index: number, elem: any): number {
    return index;
  }

  /**
   * Загрузка данных из локального хранилища
   * @param {string} key
   * @return {any | null}
   */
  public static loadInStorage(key: string): any | null {
    try {
      const strData = localStorage.getItem(key);
      return JSON.parse(strData);
    } catch (e) {
      return null;
    }
  }

  /**
   * Запись в локальное хранилище
   * @param {string} key
   * @param {string} data
   */
  public static setToStorage(key: string, data: string): void {
    localStorage.setItem(key, data);
  }
}
