<script setup lang="ts">
const route = useRoute();
const verified = computed(() => !!route.query.verified);
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Navigation />

    <!-- 페이지 헤더  -->
    <header class="bg-white shadow">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <slot name="header" />
      </div>
    </header>

    <main>
      <!-- 이메일 인증 성공 -->

      <div v-if="verified" class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <div
          class="my-12 p-6 bg-gray-900 text-white font-semibold shadow-sm sm:rounded-lg"
        >
          이메일 인증 성공하였습니다.
        </div>
      </div>

      <!-- Page Content -->
      <slot />
    </main>
  </div>
</template>
