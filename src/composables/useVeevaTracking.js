import { readonly, ref } from 'vue';

const log = [];
const isVeeva = typeof window !== 'undefined'
  && window.com?.veeva?.clm;

function trackEvent(type, payload = {}) {
  const entry = { type, timestamp: Date.now(), ...payload };
  log.push(entry);

  if (isVeeva) {
    window.com.veeva.clm.createRecord(
      'Call_Clickstream_vod__c',
      {
        Track_Action_vod__c: type,
        Track_Description_vod__c: JSON.stringify(payload),
        DateTime_vod__c: new Date().toISOString(),
      },
      (r) => console.log('[CLM]', r),
    );
  } else {
    console.log(`[CLM Track] ${type}`, payload);
  }
}

export function useVeevaTracking() {
  const slideView = (id, title) => trackEvent('slide_view', { slideId: id, slideTitle: title });
  const slideExit = (id, sec) => trackEvent('slide_exit', { slideId: id, viewTimeSec: sec });
  const hotspotClick = (slideId, hotspotId) => trackEvent('hotspot_click', { slideId, hotspotId });
  const pillarExpand = (id) => trackEvent('pillar_expand', { pillarId: id });

  const exitPresentation = () => {
    if (isVeeva) {
      window.com.veeva.clm.gotoSlide('exit');
    } else {
      console.log('[CLM] exit');
    }
  };

  return { trackEvent, slideView, slideExit, hotspotClick, pillarExpand, exitPresentation, log };
}
