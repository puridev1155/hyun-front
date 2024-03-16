<script setup lang="ts">
definePageMeta({ middleware: ["unverified"] });

const { logout, resendEmailVerification } = useAuth();
const verificationIsSent = ref(false);

async function handleResendVerification() {
  const status = (await resendEmailVerification()).status;
  if (status === "verification-link-sent") {
    verificationIsSent.value = true;
  }
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
      이메일 인증
    </div>

    <template v-if="verificationIsSent">
      <div class="mb-4 font-medium text-sm text-green-600">
       이메일 인증 테스트
      </div>
    </template>

    <div class="mt-4 flex items-center justify-between">
      <Button @click="handleResendVerification" :disabled="verificationIsSent">
        이메일 다시보내기
      </Button>

      <button
        type="button"
        class="underline text-sm text-gray-600 hover:text-gray-900"
        @click="logout"
      >
        로그아웃
      </button>
    </div>
  </AuthCard>
</template>
