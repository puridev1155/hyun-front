<template>
  <div class="flex min-h-full flex-col justify-center py-6 sm:px-6 lg:px-8">
  <!-- 타임라인 -->
  <div class="px-6">
    <!-- 위치에 따라 위치명 변경 -->
    <p class="text-lg font-medium text-gray-900">가입완료</p> 
    <div class="mt-6" aria-hidden="true">
      <div class="overflow-hidden rounded-full bg-gray-200">
        <!-- 위치에 따라 %변경, 본인인증 33.3%, 회원가입 66.6%, 가입완료 100%-->
        <div class="h-2 rounded-full bg-blue-600" style="width: 100%"></div>
      </div>
      <div class="mt-6 hidden grid-cols-3 text-sm font-medium text-gray-600 sm:grid">
        <!-- 현 위치는 색생 text-Sky-600으로 변경-->
        <div class="text-center text-blue-600">본인인증</div>
        <div class="text-center text-blue-600">회원가입</div>
        <div class="text-center text-blue-600">가입완료</div>
      </div>
    </div>
  </div>
  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
    <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">전화가입 완료</h2>
      <p class="mt-6 mb-3 text-center text-md tracking-tight text-gray-900">
        전화가입 신청 완료되었습니다! 감사합니다</p>
      <p class="mb-3 text-center text-md tracking-tight text-gray-900">
        고객센터에서 확인 후 전화가 갈 예정입니다.    
      </p>
      <p class="mb-3 text-center text-md tracking-tight text-gray-900">
          많은 신청으로 인해 전화가 늦어질 수 있습니다.
      </p>
       <p class="mb-6 text-center text-md tracking-tight text-gray-900">
            1주일 내에 연락드리겠습니다.
        </p>
    </div>
  </div>
</div>
<Footer class="fixed bottom-0" />
</template>
<script setup>
import Footer from '~/components/Footer.vue';

</script>