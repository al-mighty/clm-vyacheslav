const log = [];
const isVeeva = typeof window !== 'undefined'
  && window.com?.veeva?.clm;

function ym(...args) {
  if (typeof window !== 'undefined' && window.ym) {
    window.ym(...args);
  }
}

function trackEvent(type, payload = {}) {
  const entry = { type, timestamp: Date.now(), ...payload };
  log.push(entry);

  // Yandex.Metrika
  ym(109033343, 'reachGoal', type, payload);

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

function getUtmParams() {
  const params = new URLSearchParams(window.location.search);
  const utm = {};
  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
    if (params.has(key)) utm[key] = params.get(key);
  }
  return Object.keys(utm).length ? utm : null;
}

let _sourceTracked = false;

function trackSource() {
  if (_sourceTracked) return;
  _sourceTracked = true;

  const utm = getUtmParams();
  const ref = document.referrer || null;

  const source = {
    ...(utm || {}),
    referrer: ref,
    landing: window.location.href,
    timestamp: new Date().toISOString(),
  };

  if (utm || ref) {
    trackEvent('traffic_source', source);
    console.log('[CLM Source]', source);
  }
}

export function useVeevaTracking() {
  trackSource();

  const slideView = (id, title) => trackEvent('slide_view', { slideId: id, slideTitle: title });
  const slideExit = (id, sec) => trackEvent('slide_exit', { slideId: id, viewTimeSec: sec });
  const hotspotClick = (slideId, hotspotId) => trackEvent('hotspot_click', { slideId, hotspotId });
  const pillarExpand = (id) => trackEvent('pillar_expand', { pillarId: id });
  const langToggle = (lang) => trackEvent('lang_toggle', { lang });

  const exitPresentation = () => {
    if (isVeeva) {
      window.com.veeva.clm.gotoSlide('exit');
    } else {
      console.log('[CLM] exit');
    }
  };

  return { trackEvent, slideView, slideExit, hotspotClick, pillarExpand, langToggle, exitPresentation, log };
}
