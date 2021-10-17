window.io = require('socket.io-client')
import Echo from 'laravel-echo'

export default ({ app, env }, inject) => {
  const echo = new Echo({
    broadcaster: 'socket.io',
    host: `http://localhost:3000`,
  })

  inject('echo', echo)
}
