<script setup lang="ts">

</script>

<template>
  <div class="layout">
    <header class="header">
      <h1 class="logo">Sharjeel’s Chats</h1>

      <div class="auth-buttons">
        <SignedOut>
          <SignInButton class="signin-btn" />
        </SignedOut>

        <SignedIn>
          <UserButton class="user-btn" />
        </SignedIn>
      </div>
    </header>

    <main class="content">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  background: #f7f9fc;
  font-family: "Inter", system-ui, sans-serif;
}

/* --- HEADER STYLES --- */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #3a66ff, #4e8cff);
  padding: 14px 24px;
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.auth-buttons {
  display: flex;
  align-items: center;
  gap: 12px;
}

/* Optional: style buttons if needed */
.signin-btn,
.user-btn {
  border: none;
  background: white;
  color: #3a66ff;
  padding: 6px 14px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.1s ease;
}

.signin-btn:hover {
  background: #e7eeff;
  transform: translateY(-1px);
}

.content {
  padding: 20px;
}
</style>
