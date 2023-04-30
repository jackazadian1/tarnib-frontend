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
    authEndpoint: `${process.env.REACT_APP_PHP_BACKEND_API_URI}/api/broadcasting_token_auth`,
    auth:{
      params: {
        room_id: room_id,
        token: token
      }
    }
  });
}



export default echoInstance;
