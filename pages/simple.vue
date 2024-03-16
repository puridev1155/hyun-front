<template>
  <div class="flex min-h-full flex-col justify-center py-6 sm:px-6 lg:px-8">
    <meta charset="utf-8">
    <!-- 타임라인 -->
    <div class="px-6">
      <!-- 위치에 따라 위치명 변경 -->
      <p class="text-lg font-medium text-gray-900">본인인증</p>
      <div class="mt-6" aria-hidden="true">
        <div class="overflow-hidden rounded-full bg-gray-200">
          <!-- 위치에 따라 %변경, 본인인증 33.3%, 회원가입 66.6%, 가입완료 100%-->
          <div class="h-2 rounded-full bg-blue-600" style="width: 66.6%"></div>
        </div>
        <div class="mt-6 hidden grid-cols-3 text-sm font-medium text-gray-600 sm:grid">
          <!-- 현 위치는 색생 text-Sky-600으로 변경-->
          <div class="text-center text-blue-600">본인인증</div>
          <div class="text-center text-blue-600">회원가입</div>
          <div class="text-center">가입완료</div>
        </div>
      </div>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">당원 전화가입 신청서</h2>
        <div>
          <form class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8 mt-4" @submit.prevent="">
            <div class="sm:col-span-2">
              <label for="name" class="block text-sm font-medium text-gray-700">이름(필수)</label>
              <div class="mt-1">
                <!-- 인증완료시 발급되는 이름으로 등록, 수정안되도록 설정-->
                <input type="text" name="name" v-model="name" placeholder="ex)홍길동"
                  class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              </div>
            </div>

            <div class="sm:col-span-2">
              <label for="phone" class="block text-sm font-medium text-gray-700">핸드폰번호 (11자리 숫자)</label>
              <div class="mt-1">
                <!-- 핸드폰 번호 11자 이상 입력되지 않게, 문자가 아닌 숫자만 입력되도록 설정-->
                <input type="text" maxlength="11" placeholder="ex)01099991234"
                  oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" name="phone"
                  v-model="phone"
                  class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
              </div>
            </div>

            <div class="sm:col-span-2">
              <div class="flex flex-row items-center justify-between">
                <div class="basis-1/2 text-sm w-auto">
                  <!-- 개인 약관 클릭시에 agreement.html에 나와있는 팝업이 가입페이지에 노출-->
                  <span @click="agreementClick()" class="font-medium text-blue-600 hover:text-blue-500">개인약관에
                    동의하시겠습니까?</span>
                </div>
                <div class="basis-1/2 flex items-center">
                  <!-- 동의 버튼 -->
                  <input id="agree" name="agree" type="checkbox" v-model="agree"
                    class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
                  <label for="agree" class="ml-2 block text-sm text-gray-900">동의 체크</label>
                </div>
              </div>
              <!-- 필수사항이 입력되지 않은 경우 에러 메세지 나오기, 입력 성공시 > 1. 가입정보 관리자로 전송 > 2. 가입회원에게 가입완료 문자 보내기 > 3. 완료 complete.html으로 이동-->
              <button type="submit" @click="infosubmit()"
                class="mt-10 flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-6 px-4 text-2xl font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-Sky-500 focus:ring-offset-2">
                가입하기
              </button>
            </div>
          </form>

        </div>

      </div>
    </div>

    <AgreeMent v-if='showModal' @close="showModal = false"></AgreeMent>

    <!-- 팝업 개인약관 동의-->

  </div>
  <Footer class="fixed bottom-0" />
</template>
<script setup>
import { ref } from 'vue'
import { state } from '../stores/index'
import AgreeMent from "../components/Agreement.vue";
import { useRoute, useRouter } from 'vue-router'
import Footer from '~/components/Footer.vue';
const route = useRoute();
const router = useRouter();
const store = state();
const agree = ref(false);
const showModal = ref(false)

// 전달 데이터
const name = ref(store.name);
const phone = ref(store.phone);

function agreementClick() {
  showModal.value = true;
}
async function infosubmit() {
  if (name.value == "" || name.value == null) {
    alert("이름을 입력해주세요.")
  } else if (phone.value == "" || phone.value == null) {
    alert("핸드폰번호를 입력해주세요.")
  } else if (phone.value.length != 11) {
    alert("핸드폰번호를 정확히 입력해주세요.");
    return;
  } else if (agree.value == false) {
    alert("이용약관을 동의해주세요.")
  } else {
    //console.log(this.post)
    //this.form = new FormData;
    let formData = new FormData();
    formData.append('name', name.value);
    formData.append('phone', phone.value);
    formData.append('agree', 1);
    await userRegister(formData);

  }
}
async function userRegister(formData) {

  try {
    const response = await $fetcher(useRuntimeConfig().public.backendUrl + "/api/call-register", {
      method: "post",
      body: formData,
      headers: {
        // 'Accept': 'application/json',
        // 'Content-type': 'application/json',
        // 'Cookie' : getCookie('gongzime_session'),
      },
      credentials: 'include',
    });
    if (response.result == false) {
      alert('이미 가입된 당원입니다.')
      router.push('/')
      return;
    } else {
      router.push('/complete-simple');
    }
    return response;

  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }

}

</script>

<style></style>
