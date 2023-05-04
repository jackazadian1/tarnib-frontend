import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

// @ts-ignore
window.Pusher = require('pusher-js');

const echoInstance = (room_id: string, token: string) => {
  return new Echo({
    broadcaster: 'pusher',
    key: 'livepost_key', // Replace with your actual Pusher key
    cluster: 'mt1', // Replace with your actual Pusher cluster
    wsHost: 'tarnib.net',
    wsPort: 80,
    wssPort: 443,
    forceTLS: true,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
  });
}



export default echoInstance;
