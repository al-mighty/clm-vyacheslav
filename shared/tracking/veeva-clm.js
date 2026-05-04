/**
 * Veeva CLM Tracking Wrapper
 * 
 * В реальном Veeva-приложении на iPad доступен глобальный объект `com.veeva.clm`
 * с методами для трекинга и работы с CRM-данными.
 * 
 * Этот модуль — обёртка, которая:
 * - в Veeva-окружении вызывает реальные API
 * - в браузере (для разработки) логирует события в console
 * 
 * @see https://developer.veevavault.com/clm/ (дока за пейволлом, доступ через партнёрский договор)
 */

const isVeevaEnvironment = () => {
  return typeof window !== 'undefined' &&
         typeof window.com !== 'undefined' &&
         typeof window.com.veeva !== 'undefined' &&
         typeof window.com.veeva.clm !== 'undefined';
};

const log = (event, data) => {
  console.log(`[CLM Track] ${event}`, data);
};

export const tracking = {
  /**
   * Создаёт запись Call_Clickstream_vod__c в Veeva CRM.
   * В реальной презентации — каждое значимое событие.
   */
  trackEvent(eventType, payload = {}) {
    const event = {
      type: eventType,
      timestamp: Date.now(),
      ...payload,
    };

    if (isVeevaEnvironment()) {
      // Реальный Veeva API
      window.com.veeva.clm.createRecord(
        'Call_Clickstream_vod__c',
        {
          'Track_Action_vod__c': eventType,
          'Track_Description_vod__c': JSON.stringify(payload),
          'DateTime_vod__c': new Date().toISOString(),
        },
        (response) => log('createRecord response', response)
      );
    } else {
      log(eventType, event);
    }
  },

  /**
   * Получить данные текущего объекта (Call, Account и т.д.) из CRM.
   * Используется чтобы персонализировать презентацию под врача/клиента.
   */
  getCurrentObject(callback) {
    if (isVeevaEnvironment()) {
      window.com.veeva.clm.getDataForCurrentObject('Call_vod__c', 'Id', callback);
    } else {
      log('getCurrentObject', 'mock — would fetch from CRM');
      callback({ Id: 'mock-call-id', Account_vod__c: 'mock-account' });
    }
  },

  /**
   * Завершить и закрыть презентацию (вернуться в Veeva CRM).
   */
  exitPresentation() {
    if (isVeevaEnvironment()) {
      window.com.veeva.clm.gotoSlide('exit');
    } else {
      log('exit', 'would close in Veeva');
    }
  },

  // Удобные шорткаты для частых событий
  slideView(slideId, slideTitle) {
    this.trackEvent('slide_view', { slideId, slideTitle });
  },
  slideExit(slideId, viewTimeSec) {
    this.trackEvent('slide_exit', { slideId, viewTimeSec });
  },
  hotspotClick(slideId, hotspotId) {
    this.trackEvent('hotspot_click', { slideId, hotspotId });
  },
  pillarExpand(pillarId) {
    this.trackEvent('pillar_expand', { pillarId });
  },
};

// Глобальный доступ для дебага из консоли браузера
if (typeof window !== 'undefined') {
  window.__clmTracking = tracking;
}

export default tracking;
