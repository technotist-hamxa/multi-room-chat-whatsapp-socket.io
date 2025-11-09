<script setup>
const { data: users } = await useFetch('/api/users/getContacts');
const { data: user } = await useFetch('/api/users/createOrGetDbUser');
</script>

<template>
  <div class="contacts-container">
    <h2 class="heading">Contacts</h2>

    <ul class="contacts-list">
      <li v-for="u in users" :key="u.id" class="contact-item">
        <NuxtLink
          :to="`/${u.id}?senderId=${user.id}`"
          class="contact-link"
        >
          <div class="avatar">{{ u.userName.charAt(0).toUpperCase() }}</div>
          <span class="username">{{ u.userName }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.contacts-container {
  max-width: 420px;
  margin: 40px auto;
  padding: 20px;
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  font-family: 'Inter', system-ui, sans-serif;
}

.heading {
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
}

.contacts-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.contact-item {
  margin-bottom: 10px;
  border: 1px solid #f1f1f1;
  border-radius: 12px;
  transition: background 0.2s, transform 0.15s;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  color: #444;
  text-decoration: none;
}

.contact-link:hover {
  background: #f3f8ff;
  transform: scale(1.02);
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4e8cff, #3a66ff);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 16px;
}

.username {
  font-size: 16px;
  font-weight: 500;
}
</style>
