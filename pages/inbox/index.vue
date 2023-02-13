<template>
    <h1>this is inbox page</h1>
</template>
<router>
{
    name: 'inbox.index'
}
</router>
<script>
import Echo from 'laravel-echo'
window.io = require('socket.io-client')

export default {
    mounted() {
        // let echo = new Echo({
        //     broadcaster: 'socket.io',
        //     host: 'http://127.0.0.1:6001',
        //     auth: { headers: { Authorization: this.token } }
        // })
        this.$echo.channel('chat')
            .listen('TestEvent', (data) => {
                console.log('test data', data)
            })
    }
}
</script>