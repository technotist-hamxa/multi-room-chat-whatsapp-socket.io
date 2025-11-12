import Pusher from "pusher-js";


export const pusherClient = new Pusher('843d8691266cc6768b7f', {
  cluster: 'ap2',
});