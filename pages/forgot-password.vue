<script setup lang="ts">
definePageMeta({ middleware: ["guest"] });

const { forgotPassword } = useAuth();

const email = ref(null);
const resetEmailSent = ref(false);
const status = ref("");
const errors = ref<Record<string, string[]>>({});

async function submitForm() {
  errors.value = {};
  status.value = "";

  submitRequest(
    forgotPassword(email.value),
    (data) => {
      status.value = data?.status ?? "";
      resetEmailSent.value = true;
    },
    (validationErrors) => {
      errors.value = validationErrors ?? {};
    }
  );
}
</script>

<template>
  <AuthCard>
    <template #logo>
      <NuxtLink to="/">
        <ApplicationLogo class="w-20 h-20 fill-current text-gray-500" />
      </NuxtLink>
    </template>

    <div class="mb-4 text-sm text-gray-600">
      비밀번호를 잊으셨습니까?
    </div>

    <!-- 세션 status -->
    <AuthSessionStatus class="mb-4" :status="status" />

    <form @submit.prevent="submitForm">
      <!-- 이메일 주소 -->
      <div>
        <Label for="email">Email</Label>
        <Input
          id="email"
          type="email"
          class="block mt-1 w-full"
          v-model="email"
          :errors="errors.email"
          required
          autoFocus
        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <Button class="ml-3" :disabled="resetEmailSent">
          이메일 비밀번호 다시 설정하기
        </Button>
      </div>
    </form>
  </AuthCard>
</template>
