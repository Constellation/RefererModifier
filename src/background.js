(function(win, doc) {
  var VERSION = '0.0.1';
  var getWebRequest = (function() {
    var webRequest;
    if (chrome.webRequest) {
      webRequest = chrome.webRequest;
    } else if (chrome.experimental && chrome.experimental.webRequest) {
      webRequest = chrome.experimental.webRequest;
    } else {
      throw new Error("THIS EXTENSION IS NOT AVAILABLE");
    }
    return function getWebRequest() {
      return webRequest;
    }
  })();

  // now, only for fc2
  getWebRequest().onBeforeSendHeaders.addListener(
    function listener(details) {
      for (var i = 0, len = details.requestHeaders.length; i < len; ++i) {
        if (details.requestHeaders[i].name === 'Referer') {
          details.requestHeaders[i].value = "";
          return { requestHeaders: details.requestHeaders };
        }
      }
      details.requestHeaders.push({ name: "Referer", value: "" });
      return { requestHeaders: details.requestHeaders };
    },
    {
      urls: ['http://*.fc2.com/*'],
      types: ['image']
    },
    ['blocking', 'requestHeaders']);

})(window, document);
