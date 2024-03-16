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
                      <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">카테고리 생성
                      </DialogTitle>
                      <div class="flex space-x-4">
                      <div class="mt-1">
                        <label for="name" class="block text-sm font-medium text-gray-700">이름</label>
                        <div class="mt-1">
                          <input type="text" v-model="name" name="name"
                            class="block w-full rounded-md border-gray-300 bg-gray-100 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center mt-3">
                  <button type="button"
                    class="inline-flex w-full justify-center rounded-md bg-white px-10 py-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50  sm:ml-3 sm:w-auto"
                    @click="store.createOpen = false">취소</button>
                  <button type="button"
                    class="mt-3 inline-flex w-full justify-center rounded-md bg-blue-600 px-10 py-3.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-500 sm:mt-0 sm:w-auto"
                    @click="memberCreation" ref="cancelButtonRef">생성</button>
                </div>
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
import { categoryInfo } from '@/stores/index'
import { useRoute, useRouter } from 'vue-router'
import member from '~~/middleware/member';
import Swal from 'sweetalert2'
const route = useRoute();
const router = useRouter();
const store = categoryInfo();
const name = ref('');


function memberCreation(){
  if(name.value == ''){
    alert("카테고리 이름을 입력해주세요.");
    return;
  } 
  createMember()
}


function createMember() {
  Swal.fire({
    title: '카테고리를 생성 하시겠습니까?',
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
      form.append('category_name', name.value);
      axios.post(`http://ec2-13-209-67-110.ap-northeast-2.compute.amazonaws.com/api/category`, form)
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

// 1행사 2 문자 3 보도

</script>