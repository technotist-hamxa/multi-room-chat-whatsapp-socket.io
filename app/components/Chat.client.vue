<script setup>
import { pusherClient } from "./pusherClient";
// import { socket } from "./socket";
import { nextTick, ref, watch } from "vue";

const message = ref("");
const route = useRoute();
const chatList = ref(null); // 🧩 reference to UL element

// Fetch old messages between sender & receiver
// pusherClient.bind('joined', (data: any) => {
//   alert(data.msg);
// })
const { data: messages, refresh } = await useFetch(
  `/api/messages?senderId=${route.query.senderId}&recieverId=${route.params.recieverId}`
);

console.log(messages, "messages");

// console.log(messages, "msg");
// hello
// Create unique room key
const room = [route.query.senderId, route.params.recieverId].sort().join("-");

pusherClient.subscribe(room);
// Connect once
// socket.once("connect", () => {
//   console.log("Connected to server ✅");
// });

// Listen for new messages
// socket.on("new-message", async (msg) => {
//   console.log(msg, 'msg');
//   await refresh(); // reload from DB
//   await nextTick(); // wait for DOM to update
//   scrollToBottom(); // scroll down after refresh
// });
pusherClient.bind("sendMessage", async (data) => {
  await refresh(); // reload from DB
  await nextTick(); // wait for DOM to update
  scrollToBottom(); // scroll down after refresh
});

// Join the room when component mounts
onMounted(() => {
  console.log(route.query.senderId, route.params.recieverId, 'route');
  // socket.emit("join-room", room);
  scrollToBottom(); // scroll to bottom on initial load
});

// Scroll function
const scrollToBottom = () => {
  if (chatList.value) {
    chatList.value.scrollTop = chatList.value.scrollHeight;
  }
};

// Watch for new fetched messages
watch(messages, async () => {
  await nextTick();
  scrollToBottom();
});

// Send message
const handleOnSubmit = async () => {
  if (!message.value.trim()) return;
  await $fetch("/api/messages/createMessage", {
    method: "POST",
    body: {
      message: message.value,
      senderId: route.query.senderId,
      receiverId: route.params.recieverId,
      room,
    },
  });
  message.value = "";
};
</script>

<template>
  <div class="chat-container">
    <h1 class="chat-heading">Messages</h1>

    <ul ref="chatList" class="chat-list">
      <li
        v-for="(msg, index) in messages"
        :key="index"
        :class="['chat-bubble', msg.status]"
      >
        {{ msg.message }}
      </li>
    </ul>

    <form @submit.prevent="handleOnSubmit" class="chat-form">
      <input v-model="message" type="text" placeholder="Type your message..." />
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<style scoped>
.chat-container {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #f9fafb;
  height: 100vh;
  overflow: hidden;
}

.chat-form {
  display: flex;
  gap: 0.5rem;
}

.chat-form input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
}

.chat-form button {
  background: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
}

.chat-form button:hover {
  background: #1d4ed8;
}

.chat-heading {
  font-weight: bold;
  font-size: 1.25rem;
  margin-top: 1rem;
}

.chat-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow-y: auto;
  flex-grow: 1;
  padding-right: 0.5rem;
  scroll-behavior: smooth; /* 🧩 smooth scrolling */
}

.chat-bubble {
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  max-width: 70%;
  word-wrap: break-word;
}

.chat-bubble.sent {
  background-color: #2563eb;
  color: white;
  align-self: flex-end;
  margin-left: auto;
  text-align: right;
}

.chat-bubble.received {
  background-color: #e5e7eb;
  color: #111827;
  align-self: flex-start;
  margin-right: auto;
  text-align: left;
}
</style>
