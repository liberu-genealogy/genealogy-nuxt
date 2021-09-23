window.io = require('socket.io-client')
import Echo from 'laravel-echo'

export default ({ app, env }, inject) => {
  const echo = new Echo({
    broadcaster: 'socket.io',
    host: `${env.HOSTNAME}:${env.ECHO_PORT}`,
  })

  inject('echo', echo)
}
