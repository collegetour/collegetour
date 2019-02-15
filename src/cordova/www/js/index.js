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

    if (parseInt(window.device.version) >= 12 && window.device.platform == 'iOS') {
      window.ASWebAuthSession.start('collegetourist://', 'https://accounts.google.com/o/oauth2/v2/auth?state=&prompt=consent&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile&response_type=code&client_id=549274983663-rsk4fp7mbl3epuq6juu6hej3ij3qjod2.apps.googleusercontent.com&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsignin%2Fgoogle%2Ftoken', function(url) {
        sendMessage('pushPath', { path: url.replace('collegetourist:/', '') })
      },function(error){
        console.log(error)
      })
    }

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

    function openWindow(url) {
      window.SafariViewController.isAvailable(function (available) {
        if(!available) return window.open(url, '_blank', 'location=no')
        window.SafariViewController.show({
          url: url,
          hidden: false,
          animated: false,
          transition: 'curl',
          enterReaderModeIfAvailable: false,
          tintColor: '#DB2828',
          barColor: '#DB2828',
          controlTintColor: '#ffffff'
        },
        function(result) { },
        function(msg) { })
      })
    }

    window.addEventListener('message', function (e) {
      var message = e.data
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
