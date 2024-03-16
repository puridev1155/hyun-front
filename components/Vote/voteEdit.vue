<template v-if="store.choiceOpen">
  <TransitionRoot as="template" :show="store.choiceOpen">
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
                        <label for="name" class="block text-sm font-medium text-gray-700">Image</label>
                        <img v-if="choiceList.original_url" :src="choiceList.original_url" alt="Preview" class="w-full h-48">
                        <div class="mt-1">
                          <!-- 인증완료시 발급되는 이름으로 등록, 수정안되도록 설정-->
                          <input type="file" name="file" @change="handleFile" :v-model="imageFile"
                          class="block w-full rounded-md border-gray-300 bg-white py-2 px-1 shadow-sm">
                        </div>
                        </div>
                      </div>
                      <div class="mt-1">
                        <label for="name" class="block text-sm font-medium text-gray-700">Title</label>
                        <div class="mt-1">
                          <input type="text" name="name" v-model="choiceList.name" placeholder="제목"
                          class="block w-full rounded-md border-gray-300 bg-white py-3 px-4 shadow-sm">
                        </div>
                        </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                <button type="button"
                  class="inline-flex w-full justify-center rounded-md bg-white px-10 py-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50  sm:ml-3 sm:w-auto"
                  @click="store.choiceOpen = false">취소</button>
                <button type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-blue-600 px-10 py-3.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-500 sm:mt-0 sm:w-auto"
                  @click="edit" ref="cancelButtonRef">수정</button>
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

import { votersInfo } from '@/stores/index'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
const router = useRouter();
const store = votersInfo();
const choiceList = ref({});
const country = ref({});

// 날짜 변경
function dateFormat(i) {
  const date = new Date(i);
  return date.toISOString().slice(0, 10);
}

// 내역
async function choiceShow() {
  try {
    console.log(props.postId)
    console.log(props.voteId)
    const { data : choice } = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/votes/${props.voteId}/choices/${props.postId}`, {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      credentials: 'include',
    });
    choiceList.value = choice;
    console.log(choice, 'chiice!')

  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }

}

async function choiceEdit() {
  try {
    const response = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/votes/${props.voteId}/choices/${props.postId}`, {
      method: "put",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      credentials: 'include',
      params: choiceList.value
    });

  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }

}

function edit() {
  Swal.fire({
    title: '수정하시겠습니까?',
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
      store.choiceOpen = false;
      await choiceEdit();

    }
  })
}


onMounted(() => {
  choiceShow()
})

// props 데이터 받아오기  (postId)
const props = defineProps({
  postId: {
    type: Number,
    required: true,
  },
  voteId: {
    type: Number,
    required: true,
  },
})

</script>