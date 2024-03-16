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
      <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">가입완료</h2>
      <p class="my-6 text-center text-md tracking-tight text-gray-900">
        당원 신청 완료되었습니다! 감사합니다</p>
      <div>
        <!-- 당비납부하러 가기 > 링크로 이동: https://www.ihappynanum.com/Nanum/api/JGATA800JM -->
        <button type="submit" 
        
        class="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-6 px-4 text-2xl font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-Sky-500 focus:ring-offset-2">
          <a href="https://www.ihappynanum.com/Nanum/B/JGATA800JM">
            당비납부하러 가기
          </a>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 ml-2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12.75 15l3-3m0 0l-3-3m3 3h-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        </button>
      </div>
    </div>
  </div>
</div>
  <Footer class="fixed bottom-0" />
</template>

<script setup>
import Footer from '~/components/Footer.vue';
definePageMeta({ middleware: ["member"] });
</script>