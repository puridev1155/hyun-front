<template v-if="store.createOpen">
  <TransitionRoot as="template" :show="store.createOpen">
    <Dialog as="div" class="relative z-10">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <!-- overflow-x-auto 하면 화면이 잘돌아감-->
      <div class="fixed inset-0 z-10 overflow-x-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <form>
              <DialogPanel
                class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div class="sm:flex sm:items-start">
                    <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">사용자 정보
                      </DialogTitle>
                      <div class="flex space-x-4">
                        <div class="mt-1">
                          <label for="name" class="block text-sm font-medium text-gray-700">이름(필수)</label>
                          <div class="mt-1">
                            <!-- 인증완료시 발급되는 이름으로 등록, 수정안되도록 설정-->
                            <input type="text" name="name" v-model="memberName"
                              class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                          </div>
                        </div>
                        <div class="mt-1">
                          <label for="birth" class="block text-sm font-medium text-gray-700">생년월일(필수)</label>
                          <div class="mt-1">
                            <!-- 인증완료시 발급되는 생년월일로 등록, 수정안되도록 설정-->
                            <input type="text" y maxlength="8" v-model="memberBirth" placeholder="ex) 19980329"
                              oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                              name="birth"
                              class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                          </div>
                        </div>
                      </div>

                      <div>
                        <label for="phone" class="block text-sm font-medium text-gray-700">핸드폰번호(11자리 숫자 필수)</label>
                        <div class="mt-1">
                          <!-- 핸드폰 번호 11자 이상 입력되지 않게, 문자가 아닌 숫자만 입력되도록 설정-->
                          <input type="text" maxlength="11" v-model="memberPhone" placeholder="ex)01099991234"
                            oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..s*)\./g, '$1');"
                            name="phone"
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                      <div>
                        <label for="phone" class="block text-sm font-medium text-gray-700">성별(필수)</label>
                        <div class="mt-1">
                          <select v-model="memberGender"
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                            <option v-for="(item, index) in gender_list" :key="index" :value="item.value">{{ item.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div class="sm:col-span-2">
                        <label for="address" class="block text-sm font-medium text-gray-700">주소</label>
                        <div class="relative mt-1 rounded-md shadow-sm">
                          <div class="absolute inset-y-0 right-0 flex items-center">
                            <!-- <button class="py-1 px-3" type="button" @click="search()">주소찾기</button> -->
                            <button class="py-1 px-3" type="button" @click="postSearch">주소찾기</button>
                          </div>
                          <input type="text" name="address" v-model="memberAddress" readonly
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="서울시 종로구 ...">
                        </div>
                        <div class="post-box" v-if="postOpen == true">
                          <client-only>
                            <VueDaumPostcode @complete="oncomplete" />
                          </client-only>
                        </div>
                      </div>

                      <div class="sm:col-span-2">
                        <label for="address" class="block text-sm font-medium text-gray-700">상세주소</label>
                        <div class="relative mt-1 rounded-md shadow-sm">
                          <input name="address-detail" type="text" v-model="memberAddressDetail"
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>

                      <div class="mt-1">
                        <label for="image" class="block text-sm font-medium text-gray-700">이미지 파일</label>
                        <div class="mt-1">
                          <input type="file" name="image" @change="handleImageChange" accept="image/*"
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                          <img v-if="imageUrl" :src="imageUrl" alt="Preview" class="w-48 h-24" />
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                  <button type="button"
                    class="inline-flex w-full justify-center rounded-md bg-white px-10 py-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50  sm:ml-3 sm:w-auto"
                    @click="store.createOpen = false">취소</button>
                  <button type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-blue-600 px-10 py-3.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-500 sm:mt-0 sm:w-auto"
                    @click="memberCreation" ref="cancelButtonRef">생성</button>
                </div>

              </DialogPanel>
            </form>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import axios from 'axios'
import { usersInfo } from '@/stores/index'
import { VueDaumPostcode } from "@/node_modules/vue-daum-postcode/lib/vue-daum-postcode";
import { useRoute, useRouter } from 'vue-router'
import member from '~~/middleware/member';
import Swal from 'sweetalert2';
const route = useRoute();
const router = useRouter();
const store = usersInfo();
const memberName = ref('');
const memberBirth = ref('');
const memberPhone = ref('');
const memberGender = ref('');
const memberAddress = ref('');
const memberAddressDetail = ref('');
const stateData = ref('');
const cityData = ref('');
const districtData = ref('');
const gender_list = ref([
  { name: "선택안함", value: "" },
  { name: "남성", value: "1" },
  { name: "여성", value: "2" },
]);
const imageFiles = ref('');
const imageUrl = ref(null);
const postOpen = ref(false)

function postSearch() {
  postOpen.value = !postOpen.value
}

// 이미지 화면에 보이게
function handleImageChange(event) {
  // files.value = URL.createObjectURL(event.target.files[0]);
  imageFiles.value = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(imageFiles.value);
  reader.onload = async (e) => {
    imageUrl.value = e.target.result;
  };
}





// 주소 선택
function oncomplete(result) {
  if (result.userSelectedType === 'R') {  // 도로명 주소 선택
    memberAddress.value = result.sido + " " + result.sigungu + " " + result.bname
    stateData.value = result.sido
    cityData.value = result.sigungu
    districtData.value = result.bname
  } else {  // 지번 주소 선택
    memberAddress.value = result.sido + " " + result.sigungu + " " + result.bname //도로명주소 검색되게함
    stateData.value = result.sido
    cityData.value = result.sigungu
    districtData.value = result.bname
  }
  postOpen.value = false
}

function createMember() {
  Swal.fire({
    title: '회원을 수정 하시겠습니까?',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '생성',
    cancelButtonText: '취소'

  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '생성 되었습니다.',
        '성공'
      )
      const form = new FormData();
      form.append('name', memberName.value);
      form.append('birth', memberBirth.value);
      form.append('gender', memberGender.value);
      form.append('phone', memberPhone.value);
      form.append('address', memberAddress.value);
      form.append('address_detail', memberAddressDetail.value);
      axios.post(`http://ec2-13-209-67-110.ap-northeast-2.compute.amazonaws.com/api/user`, form)
        .then((response) => {
          console.log(response);
          store.createOpen = false;
          router.go();
        })
        .catch((error) => {
          console.log(error);
        });
      // router.go()
    }
  })
}




function memberCreation() {
  if (memberName.value == '') {
    alert("이름을 입력해주세요.");
    return;
  } else if (memberBirth.value == '') {
    alert("생년월일을 입력해주세요.");
    return;
  } else if (memberBirth.value.length != 8) {
    alert("생년월일을 정확히 입력해주세요.");
    return;
  } else if (memberPhone.value == '') {
    alert("핸드폰번호를 입력해주세요.");
    return;
  } else if (memberPhone.value.length != 11) {
    alert("핸드폰번호를 정확히 입력해주세요.");
    return;
  } else if (memberGender.value == '') {
    alert("성별을 선택해주세요.");
    return;
  }
  createMember()
}



</script>