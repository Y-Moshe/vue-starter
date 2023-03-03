<template>
  <section class="main-layout">
    <app-header />
    <main class="main-view">
      <router-view />
    </main>
    <app-footer />
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { version } from '../../package.json'

import { appHeader, appFooter } from '@/components'
import { useAuthStore } from '@/stores'

const store = useAuthStore()

onMounted(() => {
  console.log('App running v' + version)
  store.loadUser()
})
</script>
