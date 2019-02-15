var iframe, body = null

var store = window.localforage.createInstance({
  name: 'local',
  storeName: 'electron'
})

var app = {

  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
  },

  onDeviceReady: function() {

    window.open = window.cordova.InAppBrowser

    document.addEventListener('pause', pause, false)
    document.addEventListener('resume', resume, false)

    iframe = document.createElement('iframe')
    iframe.setAttribute('src', 'http://192.168.0.4:3000')
    iframe.setAttribute('border', 0)

    body = document.getElementById('cordova')
    body.appendChild(iframe)

    function sendMessage(action, data) {
      iframe.contentWindow.postMessage({
        action,
        data
      }, '*')
    }

    function pause() {
      sendMessage('pause')
    }

    function resume() {
      sendMessage('resume')
    }


    function getVersion() {
      window.cordova.getAppVersion.getVersionNumber(function(version){
        sendMessage('setVersion', { version })
      })
    }

    function openWindow(url) {
      window.SafariViewController.isAvailable(function (available) {
        if (available) {
          window.SafariViewController.show({
            url: url,
            hidden: false,
            animated: false,
            transition: 'curl',
            enterReaderModeIfAvailable: false,
            tintColor: '#00ffff',
            barColor: '#0000ff',
            controlTintColor: '#ffffff'
          },
          function(result) { },
          function(msg) { })
        } else {
          window.open(url, '_blank', 'location=no')
        }
      })
      window.cordova.InAppBrowser.open(url, '_blank', 'location=no')
    }

    window.addEventListener('message', function (e) {
      var message = e.data
      if(message.action === 'getVersion') return getVersion()
      if(message.action === 'openWindow') return openWindow(message.data)
    }, false)

    window.handleOpenURL = function(target) {
      const url = new URL(target)
      setTimeout(() => sendMessage('pushRoute', {
        route: {
          pathname: url.pathname,
          search: url.search ? url.search.slice(1) : null,
          hash: url.hash ? url.hash.slice(1) : null
        }
      }), 1000)
    }

  }

}

app.initialize()
