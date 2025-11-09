<script setup lang="ts">
import ChatClient from "~/components/Chat.client.vue";
await useFetch('/api/users/createOrGetDbUser');
</script>

<template>
  <ChatSidebar />
</template>
