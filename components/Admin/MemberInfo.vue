<template v-if="store.infoOpen">
  <TransitionRoot as="template" :show="store.infoOpen">
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
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
            
            <div class="flex space-x-4 m-2">
              <!-- 정보 -->
                <div class="mt-1 w-1/2">
                  <div class="sm:flex sm:items-start">
                  <div class="mt-3 text-left sm:ml-4 sm:mt-0 sm:text-left">
                    <div class="flex space-x-4 m-2">
                      <div class="mt-1 w-1/2">
                        <img v-if="memberList.profile_url" :src="memberList.profile_url" class="object-none h-48 w-48 " />
                        <img v-else-if="memberList.gender == 'male'" src="@/assets/images/male.png" class="px-5" />
                        <img v-else src="@/assets/images/female.png" class="px-5" />
                      </div>
                      <div class="mt-1 w-1/2">
                        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
                        <div class="mb-3">
                          <!-- 인증완료시 발급되는 이름으로 등록, 수정안되도록 설정-->
                          <input type="text" name="name" :value="memberList.name" readonly
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>

                        <label for="birth" class="block text-sm font-medium text-gray-700">Birth</label>
                        <div class="mt-1">
                          <!-- 인증완료시 발급되는 생년월일로 등록, 수정안되도록 설정-->
                          <input type="text" name="name" :value="memberList.birth" readonly
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                    </div>

                    <div class="flex">
                      <div class="w-1/2 m-2">
                        <label for="phone" class="block text-sm font-medium text-gray-700">Gender</label>
                        <div class="mt-1">
                          <input type="text" name="name" :value="memberList.gender" readonly
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                      <div class="w-1/2 m-2">
                        <label for="phone" class="block text-sm font-medium text-gray-700">Country</label>
                        <div class="mt-1">
                          <input type="text" name="name" :value="country.name" readonly
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                    </div>
                    <div class="flex">
                      <div class="w-full m-2">
                        <label for="phone" class="block text-sm font-medium text-gray-700">Email</label>
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
                          <input type="text" name="name" v-model="memberList.phone" readonly
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                    </div>
                    <div class="flex">
                      <div class="w-full m-2">
                        <label for="phone" class="block text-sm font-medium text-gray-700">Address</label>
                        <div class="mt-1">
                          <input type="text" name="name" v-model="memberList.address" readonly
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                    </div>
                    <div class="flex">
                      <div class="w-full m-2">
                        <label for="phone" class="block text-sm font-medium text-gray-700">Zipcode</label>
                        <div class="mt-1">
                          <input type="text" name="name" v-model="memberList.zipcode" readonly
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                    </div>
                    <div class="flex">
                      <div class="w-1/2 m-2">
                        <label for="phone" class="block text-sm font-medium text-gray-700">Height</label>
                        <div class="mt-1">
                          <input type="text" name="name" v-model="memberList.height" readonly
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                      <div class="w-1/2 m-2">
                        <label for="phone" class="block text-sm font-medium text-gray-700">Weight</label>
                        <div class="mt-1">
                          <input type="text" name="name" v-model="memberList.weight" readonly
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                    </div>
                    <div class="flex">
                      <div class="w-full m-2">
                        <label for="phone" class="block text-sm font-medium text-gray-700">InstagramID</label>
                        <div class="mt-1">
                          <input type="text" name="name" v-model="memberList.instagram" readonly
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                    </div>
                  </div>
                 
                </div>
                </div>
                <!-- 결제 -->
                <div class="mt-1 w-1/2">
                  <div class="flex">     
                      <div class="w-full m-2">
                        <!-- 결제내역 -->
                        <label for="phone" class="block text-sm font-medium text-gray-700">결제 내역 {{ payment }}</label>
                        <div class="mt-1 overflow-auto h-80">
                          <table class=" min-w-full divide-y">
                            <thead class="bg-gray-100">
                              <tr class="text-gray">
                                  <th scope="col" class="py-2 pl-4 pr-3 text-center text-sm font-semibold">Date</th>
                                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">Name</th>
                                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">Status</th>
                              </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                              <tr v-for="(row,index) in historyList.payment" :key="index">
                                <td class="py-2 text-sm text-gray-500 text-center"> {{ dateFormat(row.created_at) }}</td>
                                <td class="py-2 text-sm text-gray-500 text-center"> {{ row.title }}</td>
                                <td class="py-2 text-sm text-gray-500 text-center"> {{ row.status }}</td>
                            </tr>
                            <tr>
                                <td colspan='3' class="py-2 text-sm text-gray-500 text-center">No more</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>

                        <!-- 참가내역 -->
                        <label for="phone" class="mt-5 block text-sm font-medium text-gray-700">투표 내역</label>
                        <div class="mt-1 overflow-auto h-96">
                          <table class=" min-w-full divide-y">
                            <thead class="bg-gray-100">
                              <tr class="text-gray">
                                  <th scope="col" class="py-2 pl-4 pr-3 text-center text-sm font-semibold">Date</th>
                                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">Name</th>
                                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">Status</th>
                              </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200 bg-white">
                              <tr v-for="(row,index) in historyList.voter" :key="index">
                                <td class="py-2 text-sm text-gray-500 text-center"> {{ dateFormat(row.created_at) }}</td>
                                <td class="py-2 text-sm text-gray-500 text-center"> {{ row.vote_title }}</td>
                                <td class="py-2 text-sm text-gray-500 text-center"> {{ row.choice_name }}</td>
                              </tr>
                              <tr >
                                <td colspan='3' class="py-2 text-sm text-gray-500 text-center">No more</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                </div>             
            </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                <button type="button"
                  class="inline-flex w-full justify-center rounded-md bg-blue-600 px-10 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400  sm:ml-3 sm:w-auto"
                  @click="store.infoOpen = false">확인</button>
              </div>

            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'

import { usersInfo } from '@/stores/index'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
const router = useRouter();
const store = usersInfo();
const memberList = ref({});
const historyList = ref({});
const country = ref({});

// 날짜 변경
function dateFormat(i) {
  const date = new Date(i);
  return date.toISOString().slice(0, 10);
}

// 유정 정보
async function userList() {
  try {
   // console.log(props.postId)
    const { data: member } = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/members/${props.postId}`, {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      credentials: 'include',
    });
    //console.log(member);
    memberList.value = member;
    country.value = member.country;
  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }

}

// 내역
async function hisList() {
  try {
    console.log(props.postId)
    const history = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/members/history/${props.postId}`, {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      credentials: 'include',
    });
    historyList.value = history;
    console.log(historyList.value, 'sdf')
  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }

}

onMounted(() => {
  userList()
  hisList()
})

// props 데이터 받아오기  (postId)
const props = defineProps({
  postId: {
    type: Number,
    required: true,
  },
})

</script>