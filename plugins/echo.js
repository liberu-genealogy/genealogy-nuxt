import Echo from 'laravel-echo'
window.io = require('socket.io-client')

export default ({ app, env }, inject) => {
  const echo = new Echo({
    broadcaster: 'socket.io',
    // host: `https://familytree365.com:6001`,
    host: `http://127.0.0.1:6001`,
  })

  inject('echo', echo)
}
