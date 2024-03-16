<template>
  
  <AuthCard>
    <!-- 세션 status -->
    <AuthSessionStatus class="mb-4" :status="status" />
    <form @submit.prevent="submitForm">
        <div>
          <div class="mt-2">
          <label for="email" class="block text-sm font-medium leading-6 text-white">사용자 ID</label>
            <Input
          id="user_id"
          type="text"
          class="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          v-model="data.email"
          :errors="errors.email?.[0]"
          required
          autoFocus
        />
        
          </div>
        </div>

        <div>
          <div class="mt-2">
          <label for="email" class="block text-sm font-medium leading-6 text-white">비밀번호</label>
            <Input
          id="password"
          type="password"
          class="block w-full p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          v-model="data.password"
          :errors="errors.password"
          required
          autoComplete="current-password"
        />
          </div>
        </div>

        <div class="block mt-4">
        <label for="remember" class="inline-flex items-center">
          <input
            id="remember"
            type="checkbox"
            name="remember"
            class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            v-model="data.remember"
          />
          <span class="ml-2 text-sm text-white"> 기억하기 </span>
        </label>
        </div>

        <div>
          <button type="submit" class="flex w-full justify-center rounded-md from-pink-600 to-pink-700 bg-gradient-to-b px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
        </div>
      </form>
  </AuthCard>
</template>
<script setup lang="ts">
definePageMeta({ middleware: ["guest"] });

const router = useRouter();
const route = useRoute();
const { login } = await useAuth();

const data = reactive({
  email: "",
  password: "",
  remember: false,
});
const status = ref(
  (route.query.reset ?? "").length > 0 ? atob(route.query.reset as string) : ""
);
const errors = ref<Record<string, string[]>>({});

async function submitForm() {
  errors.value = {};
  status.value = "";

  submitRequest(
    login(data),
    () => {
      router.push("/admin/user");
    },
    (validationErrors) => {
      errors.value = validationErrors ?? {};
    }
  );
}
</script>
