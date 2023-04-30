import Echo from 'laravel-echo';

// @ts-ignore
window.Pusher = require('pusher-js');

const echoInstance = (room_id: string, token: string) => {
  return new Echo({
    broadcaster: 'pusher',
    key: 'livepost_key', // Replace with your actual Pusher key
    cluster: 'mt1', // Replace with your actual Pusher cluster
    forceTLS: false,
    wsHost: window.location.hostname,
    wsPort: 6001,
    encrypted: false,
    enabledTransports: ['ws', 'wss'],
  });
}



export default echoInstance;
