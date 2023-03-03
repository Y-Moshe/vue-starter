<template>
  <header class="main-header main-layout full">
    <nav class="main-nav">
      <router-link to="/">BRAND LOGO</router-link>

      <ul class="clean-list d-flex gap-10" v-if="user">
        <li>
          <span>{{ user.email }}</span>
        </li>
        <li>
          <button type="button" :disabled="isSubmitting" @click="handleLogout">Logout</button>
        </li>
      </ul>
      <ul class="clean-list d-flex gap-10" v-else>
        <li>
          <router-link to="/auth/login">Login</router-link>
        </li>
        <li>
          <router-link to="/auth/signup">Signup</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'

const store = useAuthStore()
const router = useRouter()

const user = computed(() => store.loggedInUser)
const isSubmitting = computed(() => store.isSubmitting)

const handleLogout = async () => {
  try {
    await store.logoutUser()
    router.push('/')
  } catch (err) {
    console.log('Failed to logged out!')
  }
}
</script>
