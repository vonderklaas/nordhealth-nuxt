<template>
  <div class="container">
    <h1 class="title">Thank you for signing up!</h1>

    <provet-banner variant="success" class="success-banner">
      We'll be in touch soon.
    </provet-banner>

    <provet-stack layout="col">
      <p>Your account has been created successfully.</p>
      <span>You should receive a confirmation email shortly.</span>

      <div class="actions">
        <provet-button variant="primary" @click="goToHome">
          <provet-icon slot="start" name="interface-home"></provet-icon>
          Back to Home
        </provet-button>
      </div>
    </provet-stack>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function goToHome() {
  router.push("/");
}
</script>

<style scoped>
.container {
  max-width: 480px;
  margin: 0 auto;
  margin-top: 5rem;
}

.success-banner {
  margin: 2rem 0;
}

.title {
  font-family: sans-serif;
  margin-bottom: 1rem;
}

.actions {
  margin-top: 2rem;
}
</style>
