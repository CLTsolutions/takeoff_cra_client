let APIURL = ''

switch (window.location.hostname) {
  case 'localhost':
  case '127.0.0.1':
    APIURL = 'http://localhost:3000'
    break
  case 'clt-takeofftravelapp.herokuapp.com':
    APIURL = 'https://clt-takeofftravelapp.herokuapp.com/'
    break
  default:
    APIURL = 'https://clt-takeofftravelapp.herokuapp.com/'
}

export default APIURL
