<script setup lang="ts">
import ChatClient from "~/components/Chat.client.vue";
const {data: user} = await useFetch('/api/users/createOrGetDbUser');

onMounted(() => {
  console.log(user);

})
</script>

<template>
  <ChatSidebar />
</template>
