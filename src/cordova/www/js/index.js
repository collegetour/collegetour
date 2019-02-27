var iframe, body = null

var app = {

  initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
  },

  onDeviceReady: function() {

    screen.orientation.lock('portrait')

    document.addEventListener('pause', pause, false)
    document.addEventListener('resume', resume, false)

    iframe = document.createElement('iframe')
    // iframe.setAttribute('src', 'http://localhost:3000')
    iframe.setAttribute('src', 'https://collegetouristapp.com')
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

    function signin(auth_url) {
      if (parseInt(window.device.version) >= 12 && window.device.platform == 'iOS') {
        window.ASWebAuthSession.start('collegetourist://', auth_url, function(url) {
          sendMessage('pushPath', { path: url.replace('collegetourist:/', '') })
        }, function(error) {
          console.log(error)
        })
      }
    }

    function keepAwake() {
      window.plugins.insomnia.keepAwake()
    }

    function allowSleep() {
      window.plugins.insomnia.allowSleepAgain()
    }

    window.addEventListener('message', function (e) {
      var message = e.data
      if(message.action === 'allowSleep') return allowSleep()
      if(message.action === 'keepAwake') return keepAwake()
      if(message.action === 'openWindow') return openWindow(message.data)
      if(message.action === 'signin') return signin(message.data)
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
