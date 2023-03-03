<template>
  <section class="auth-view">
    <form @submit.prevent="handleSubmit">
      <h1>{{ authType }}</h1>

      <template v-if="!isLogin">
        <label for="firstName">First Name</label>
        <input type="text" v-model="authForm.firstName" id="firstName" :disabled="isSubmitting" />

        <label for="lastName">Last Name</label>
        <input type="text" v-model="authForm.lastName" id="lastName" :disabled="isSubmitting" />
      </template>

      <label for="email">E-Mail</label>
      <input type="email" v-model="authForm.email" id="email" :disabled="isSubmitting" />

      <label for="password">Password</label>
      <input type="password" v-model="authForm.password" id="password" :disabled="isSubmitting" />

      <button type="submit" :disabled="isSubmitting">
        {{ authType }}
      </button>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'
import type { IUser } from '@/types'

const props = defineProps({ isLogin: Boolean })

const authForm = reactive<IUser>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
})

const authType = computed(() => (props.isLogin ? 'Log-In' : 'Sign-Up'))
const store = useAuthStore()
const isSubmitting = computed(() => store.isSubmitting)
const router = useRouter()

const handleSubmit = async () => {
  const doAuthAction = props.isLogin ? doLogin : doSignup
  try {
    await doAuthAction({ ...authForm })
    router.push('/')
  } catch (err) {
    console.log(`Failed to ${authType}!`)
  }
}

const doLogin = (credentials: IUser) =>
  store.loginUser({
    email: credentials.email,
    password: credentials.password!,
  })
const doSignup = (user: IUser) => store.signupUser(user)
</script>
