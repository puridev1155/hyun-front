<template v-if="store.editOpen">
  <TransitionRoot as="template" :show="store.editOpen">
    <Dialog as="div" class="relative z-10">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-x-auto">
        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-left sm:ml-4 sm:mt-0 sm:text-left">
                    <div class="flex space-x-4 m-2">
                      <div class="mt-1">
                        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                        <div class="mt-1">
                          <!-- 인증완료시 발급되는 이름으로 등록, 수정안되도록 설정-->
                          <input type="text" name="name" v-model="memberList.name"
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                      <div class="mt-1">
                        <label for="birth" class="block text-sm font-medium text-gray-700">Birth</label>
                        <div class="mt-1">
                          <!-- 인증완료시 발급되는 생년월일로 등록, 수정안되도록 설정-->
                          <input type="text" name="name" v-model="memberList.birth"
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                    </div>

                    <div class="flex">
                      <div class="w-1/2 m-2">
                        <label for="gender" class="block text-sm font-medium text-gray-700">Gender</label>
                        <select id="gender" v-model="memberList.gender"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                          <option selected>선택하기</option>
                          <option v-for="gender in gender_list" :key="gender" :value="gender.name">{{ gender.name }}
                          </option>
                        </select>
                      </div>
                      <div class="w-1/2 m-2">
                        <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                        <select id="countries" v-model="country.id"
                          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
                          <option selected>선택하기</option>
                          <option v-for="country in country_list" :key="country" :value="country.value">{{ country.name }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="flex">
                      <div class="w-full m-2">
                        <label for="phone" class="block text-sm font-medium text-gray-700">Email(읽기만 가능)</label>
                        <div class="mt-1">
                          <input type="text" name="name" v-model="memberList.email" readonly
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                    </div>
                    <div class="flex">
                      <div class="w-full m-2">
                        <label for="phone" class="block text-sm font-medium text-gray-700">Phone</label>
                        <div class="mt-1">
                          <input type="text" name="name" v-model="memberList.phone"
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                    </div>
                    <div class="flex">
                      <div class="w-full m-2">
                        <label for="phone" class="block text-sm font-medium text-gray-700">Address</label>
                        <div class="mt-1">
                          <input type="text" name="name" v-model="memberList.address"
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                    </div>
                    <div class="flex">
                      <div class="w-full m-2">
                        <label for="phone" class="block text-sm font-medium text-gray-700">Zipcode</label>
                        <div class="mt-1">
                          <input type="text" name="name" v-model="memberList.zipcode"
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                    </div>
                    <div class="flex">
                      <div class="w-1/2 m-2">
                        <label for="phone" class="block text-sm font-medium text-gray-700">Height</label>
                        <div class="mt-1">
                          <input type="text" name="name" v-model="memberList.height"
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                      <div class="w-1/2 m-2">
                        <label for="phone" class="block text-sm font-medium text-gray-700">Weight</label>
                        <div class="mt-1">
                          <input type="text" name="name" v-model="memberList.weight"
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                    </div>

                    <div class="flex">
                      <div class="w-full m-2">
                        <label for="phone" class="block text-sm font-medium text-gray-700">Instagram ID</label>
                        <div class="mt-1">
                          <input type="text" name="name" v-model="memberList.instagram"
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                    </div>
                    <div class="flex">
                      <div class="w-full m-2">
                        <label for="phone" class="block text-sm font-medium text-gray-700 text-red">Password Reset(비밀번호
                          변경)</label>
                        <div class="mt-1">
                          <input type="password" name="name" v-model="memberList.password"
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                <button type="button"
                  class="inline-flex w-full justify-center rounded-md bg-white px-10 py-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50  sm:ml-3 sm:w-auto"
                  @click="store.editOpen = false">취소</button>
                <button type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-blue-600 px-10 py-3.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-500 sm:mt-0 sm:w-auto"
                  @click="memberEdit" ref="cancelButtonRef">수정</button>
              </div>

            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>



<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { usersInfo } from '@/stores/index'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
const router = useRouter();
const store = usersInfo();
const memberList = ref({});
const country = ref({});
//const postOpen = ref(false);
const gender_list = ref([
  { name: "male", value: "male" },
  { name: "female", value: "female" },
]);
const country_list = ref([
  { name: "Korea", value: 1 },
  { name: "Japan", value: 2 },
  { name: "indonesia", value: 3 },
  { name: "USA", value: 4 },
]);

onMounted(async () => {
  await userList()
})

// props 데이터 받아오기  (postId)
const props = defineProps({
  postId: {
    type: Number,
    required: true,
  },
})


// 유정 정보
async function userList() {
  try {
    const { data: member } = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/members/${props.postId}`, {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      credentials: 'include',
    });
    memberList.value = member;
    country.value = member.country;

  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }

}



function editMember() {
  Swal.fire({
    title: '회원을 수정 하시겠습니까?',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '수정',
    cancelButtonText: '취소'

  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '수정 되었습니다.',
        '성공'
      )
      store.editOpen = false;
      await userEdit();
      await store.userApi()

    }
  })
}

function memberEdit() {
  memberList.value.country_id = country.value.id; //country_id 변경

  if (memberList.value.name == '') {
    alert("Insert your name");
    return;
  } else if (memberList.value.birth == '') {
    alert("Insert Birthday");
    return;
  } else if (memberList.value.email == '') {
    alert("Insert Email Address");
    return;
  } else if (memberList.value.gender == '') {
    alert("Choose your gender");
    return;
  } else if (memberList.value.country_id == '') {
    alert("Choose your country");
    return;
  } else if (memberList.value.instagram == '') {
    alert("Insert Instagram");
    return;
  }
  editMember()

}

async function userEdit() {
  try {

    console.log(memberList.value)
    const response = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/members/${props.postId}`, {
      method: "put",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      credentials: 'include',
      params: memberList.value
    });

  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }

}


</script>