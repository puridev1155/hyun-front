<template>
  <TransitionRoot as="template" :show="store.memoOpen">
    <Dialog as="div" class="relative z-10">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-x-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8  w-full sm:max-w-lg">
              <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:justify-center">
                  <div class="w-full mt-3 text-center sm:mt-0 ">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">메모
                    </DialogTitle>
                    <div class="flex mt-4">
                      <textarea v-model="content" class="border-2 border-blue-200 w-[85%]" />
                      <button @click="send" class="w-[15%] bg-blue-200 ">입력</button>
                    </div>
                    <div class=" max-h-[50vh] overflow-auto">
                      <div class="flex justify-between rounded-md  bg-gray-200 mt-3 p-4" v-for="(memo, index) in memoList" :key="index">
                        <div class="text-start">
                          <div class="text-[18px]">
                            {{ memo.info }}
                          </div>
                          <div class="text-sm">
                            {{ memo.created_at }}
                          </div>
                        </div>
                        <div @click="deleteCheck(memo.id)" class="flex items-center">
                          <TrashIcon class="w-6 h-6" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                <button type="button"
                  class="inline-flex w-full justify-center rounded-md bg-blue-600 px-10 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-400  sm:ml-3 sm:w-auto"
                  @click="store.memoOpen = false">취소</button>
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
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {TrashIcon} from '@heroicons/vue/outline'
import { usersInfo } from '@/stores/index'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
const router = useRouter();
const store = usersInfo();
const memoList = ref([]);
const content = ref('');
// props 데이터 받아오기  (postId)
const props = defineProps({
  postId: {
    type: Number,
    required: true,
  },
})

onMounted(()=> {
  memoListApi()
})

async function memoListApi() {
  try {
    const response = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/memos/${props.postId}`, {
      method: "get",
      params:{
        memo_type: 'member'
      },
      credentials: 'include',
    });
    memoList.value = response
    return response;
  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }

}

async function send() {
  try {
    const response = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/memos`, {
      method: "post",
      params:{
        user_id: props.postId,
        memo_type: 'member',
        info: content.value
      },
      credentials: 'include',
    });
    memoListApi()
    store.userApi()
    content.value = ''
    return response;
  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
}


// 메모삭제
async function memoDelete(id) {
  try {
    const response = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/memos/${id}`, {
      method: "delete",
      credentials: 'include',
    });
    store.userApi()
    return response;
  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
}

// 삭제 확인
function deleteCheck(id) {
  Swal.fire({
    title: '메모를 삭제 하시겠습니까?',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '삭제',
    cancelButtonText: '취소'
  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '수정 되었습니다.',
        '성공'
      )
      await memoDelete(id)
      await memoListApi()

    }
  })
}
</script>