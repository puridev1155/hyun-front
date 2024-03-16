<template>
   <nav class="flex border-b border-gray-200 bg-white" aria-label="Breadcrumb">
      <ol role="list" class="mx-auto flex w-full max-w-screen-xl space-x-4 px-4 sm:px-6 lg:px-8">
        <li class="flex">
          <div class="flex items-center">
            <a href="#" class="text-gray-400 hover:text-gray-500">
              <!-- <HomeIcon class="h-5 w-5 flex-shrink-0" aria-hidden="true" /> -->
              <span class="sr-only">Home</span>
            </a>
          </div>
        </li>
        <li v-for="nav in navs" :key="nav.name" class="flex">
          <div class="flex items-center">
            <svg class="h-full w-6 flex-shrink-0 text-gray-200" viewBox="0 0 24 44" preserveAspectRatio="none" fill="currentColor" aria-hidden="true">
              <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
            </svg>
            <a :href="nav.href" class="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700" :aria-current="nav.current ? 'nav' : undefined">{{ nav.name }}</a>
          </div>
        </li>
        <li class="absolute right-5">
          <button @click="logout()" class="h-7 px-4 m-2 mt-2 text-sm text-indigo-100 transition-colors duration-150 bg-indigo-700 focus:shadow-outline hover:bg-indigo-800">
            LOGOUT
          </button>
        </li>
      </ol>
    </nav>
</template>
<script setup>
  // props 데이터 받아오기  (postId)
  import { useRouter } from 'vue-router';
const props = defineProps({
  navs: {
    type: Object,
    required: true,
  },
});

const { user, logout } = await useAuth();
</script>