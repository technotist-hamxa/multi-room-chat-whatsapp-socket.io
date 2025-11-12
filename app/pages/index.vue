<script setup lang="ts">
import ChatClient from "~/components/Chat.client.vue";
// import { pusherClient } from "~/components/pusherClient";
// import { socket } from "~/components/socket";
const {data: user} = await useFetch('/api/users/createOrGetDbUser');

onMounted(() => {
  console.log(user);
  // pusherClient.subscribe('room');
  // pusherClient.bind('joined', (data: any) => {
  //   alert(data.msg);
  // })

})

// socket.on('connect', () => {
//   console.log('the user has been connected to the socket server');
// })
</script>

<template>
  <ChatSidebar />
</template>
