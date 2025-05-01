<template>
  <div class="container">
    <h1 class="title">Welcome!</h1>

    <provet-stack layout="col" gap="1rem">
      <p>Join thousands of satisfied users today.</p>

      <div class="actions">
        <provet-button variant="primary" @click="goToSignup">
          <provet-icon slot="start" name="user-add"></provet-icon>
          Sign Up
        </provet-button>
      </div>
    </provet-stack>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function goToSignup() {
  router.push("/signup");
}
</script>

<style scoped>
.container {
  max-width: 480px;
  margin: 0 auto;
  margin-top: 5rem;
}

.title {
  font-family: sans-serif;
  margin-bottom: 1rem;
}

.actions {
  margin-top: 2rem;
}
</style>
