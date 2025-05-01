<template>
  <div class="container">
    <h1 class="title">Sign Up</h1>

    <template v-if="error">
      <provet-banner variant="danger">
        {{ error }}
      </provet-banner>
      <div class="mt-4">
        <provet-button variant="primary" @click="resetError">
          Try again
        </provet-button>
      </div>
    </template>

    <template v-else>
      <provet-stack layout="col" gap="1rem">
        <div>
          <provet-input
            placeholder="hello@mail.com"
            label="Email"
            name="email"
            type="email"
            v-model="email"
            :invalid="touched.email && !!emailError"
            autocomplete="email"
            @blur="handleEmailBlur"
          />
          <div v-if="touched.email && emailError" class="error-message">
            {{ emailError }}
          </div>
        </div>

        <div class="password-container">
          <provet-input
            label="Password"
            name="password"
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            :invalid="touched.password && !!passwordError"
            autocomplete="new-password"
            @blur="handlePasswordBlur"
          />
          <provet-button
            variant="ghost"
            @click="togglePassword"
            aria-label="Toggle password visibility"
            class="password-toggle-button"
          >
            <provet-icon
              :name="showPassword ? 'interface-close' : 'interface-password'"
            />
          </provet-button>
        </div>

        <div v-if="touched.password && passwordError" class="error-message">
          {{ passwordError }}
        </div>

        <div v-else-if="password && !passwordError" class="password-strength">
          <span :class="passwordStrength.color"
            >Password strength: {{ passwordStrength.label }}</span
          >
        </div>

        <provet-checkbox
          v-model="updates"
          type="checkbox"
          label="Receive occasional product updates and announcements"
        />

        <provet-button
          variant="primary"
          @click="handleSubmit"
          :disabled="loading"
        >
          <provet-icon v-if="loading" slot="start" name="arrow-refresh" />
          {{ loading ? "Signing up..." : "Sign up" }}
        </provet-button>
      </provet-stack>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const email = ref("");
const password = ref("");
const updates = ref(false);
const showPassword = ref(false);
const loading = ref(false);
const error = ref<string | null>(null);

const touched = ref({
  email: false,
  password: false,
});

function handleEmailBlur() {
  touched.value.email = true;
}

function handlePasswordBlur() {
  touched.value.password = true;
}

const emailError = computed(() => {
  if (!email.value.trim()) {
    return "Email is required";
  }

  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    return "Please enter a valid email address";
  }

  return "";
});

const passwordError = computed(() => {
  if (!password.value.trim()) {
    return "Password is required";
  }

  if (password.value.length < 8) {
    return "Password must be at least 8 characters long";
  }

  return "";
});

const passwordStrength = computed(() => {
  if (!password.value) {
    return { value: 0, label: "None", color: "text-gray-500" };
  }

  let strength = 0;

  // Length check
  if (password.value.length >= 8) strength += 1;
  if (password.value.length >= 12) strength += 1;

  // Complexity checks
  if (/[A-Z]/.test(password.value)) strength += 1;
  if (/[a-z]/.test(password.value)) strength += 1;
  if (/[0-9]/.test(password.value)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password.value)) strength += 1;

  // Return appropriate label and color
  if (strength < 3) {
    return { value: strength, label: "Weak", color: "text-red-500" };
  } else if (strength < 5) {
    return { value: strength, label: "Medium", color: "text-yellow-500" };
  } else {
    return { value: strength, label: "Strong", color: "text-green-500" };
  }
});

function togglePassword() {
  showPassword.value = !showPassword.value;
}

function resetForm() {
  email.value = "";
  password.value = "";
  updates.value = false;
  showPassword.value = false;
  touched.value = { email: false, password: false };
  error.value = null;
}

function resetError() {
  error.value = null;
}

async function handleSubmit() {
  touched.value.email = true;
  touched.value.password = true;

  if (emailError.value || passwordError.value) {
    return;
  }

  loading.value = true;
  error.value = null;

  try {
    // In a real app, we would call our API here, but for now lets simulate it
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push("/success");
  } catch (err) {
    error.value =
      err instanceof Error ? err.message : "An unexpected error occurred";
  } finally {
    loading.value = false;
  }
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
}

.password-container {
  display: flex;
  align-items: flex-end;
  gap: 1rem;
}

.error-message {
  color: var(--n-color-status-danger);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.password-strength {
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.text-red-500 {
  color: var(--n-color-status-danger);
}

.text-yellow-500 {
  color: var(--n-color-status-warning);
}

.text-green-500 {
  color: var(--n-color-status-success);
}

.text-gray-500 {
  color: var(--n-color-text-subdued);
}
</style>
