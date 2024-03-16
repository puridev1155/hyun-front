<template>
  <AuthCard>

    <form @submit.prevent="submitForm">
      <!-- 이메일 -->
      <div class="mt-4">
        <Label for="email">Email</Label>
        <Input
          id="email"
          type="email"
          class="block mt-1 w-full opacity-80"
          v-model="data.email"
          :errors="errors.email"
          disabled
          required
        />
      </div>

      <!-- 비밀번호 -->
      <div class="mt-4">
        <Label for="password">새 비밀번호</Label>
        <Input
          id="password"
          type="password"
          class="block mt-1 w-full"
          v-model="data.password"
          :errors="errors.password"
          required
        />
      </div>

      <!-- 비밀번호 다시 입력 -->
      <div class="mt-4">
        <Label for="password_confirmation">새 비밀번호 다시 입력</Label>
        <Input
          id="password_confirmation"
          type="password"
          class="block mt-1 w-full"
          v-model="data.password_confirmation"
          :errors="errors.password_confirmation"
          required
        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <Button>비밀번호 재설정하기</Button>
      </div>
    </form>
  </AuthCard>
</template>
<script setup lang="ts">
definePageMeta({ middleware: ["guest"] });

const router = useRouter();
const route = useRoute();
const { resetPassword } = useAuth();

if (!route.query.email) {
  router.push("/");
}

const data = reactive({
  email: route.query.email as string,
  password: null,
  password_confirmation: null,
});
const errors = ref<Record<string, string[]>>({});
const token = computed(() => route.params.token);

async function submitForm() {
  errors.value = {};

  submitRequest(
    resetPassword({ token: token.value, ...data }),
    (result) => {
      router.push({ path: "/login", query: { reset: btoa(result?.status ?? "") } });
    },
    (validationErrors) => {
      errors.value = validationErrors ?? {};
    }
  );
}
</script>

