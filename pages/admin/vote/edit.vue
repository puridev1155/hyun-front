<template>
  <div>
    <NuxtLayout name="adminlayout">
      <div class="flex flex-1 flex-col md:pl-64">
        <main class="flex-1">
            <!-- Page Direction Start -->
              <Navtop :navs="navs" />
            <!-- Page Direction End -->
          <div class="max-w-4xl">
            <div class="mx-auto px-4 lg:px-10">
              <div class="px-4 pt-10">
                <!-- Form Start-->
                  <div>
                    <h2 class="text-lg font-medium text-gray-900">{{ navs[0].name }} Information</h2>   
                    <div class="mt-4">
                      <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title(제목)</label>
                      <input type="text" name="title" v-model="form.title"
                          class="block w-full rounded-md border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    </div>
                    <div class="mt-4">
                      <label for="title" class="block text-sm font-medium text-gray-700 mb-1">(Thumbnail) 썸네일 이미지</label>
                      <input type="file" name="file" @change="handleFile" :v-model="imageFile"
                          class="block w-full rounded-md border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                          <img v-if="imageUrl" :src="imageUrl" alt="Preview" class="w-48 h-48">
                    </div>
                  </div>
                  
                  <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                      <div>
                        <label for="visibility" class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <div class="mt-1">
                          <input type="date" @input="change1" v-model="form.start_at"
                            class="block appearance-none w-full  border border-gray-200 text-gray-700 bg-white py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state" placeholder="시작날짜 선택" />
                        </div>
                      </div>
                      <div>
                        <label for="visibility" class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <div class="mt-1">
                          <input type="date" @input="change2" v-model="form.end_at"
                            class="block appearance-none w-full  border border-gray-200 text-gray-700 bg-white py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-state" placeholder="종료날짜 선택" />
                        </div>
                      </div>
                  </div>
                
                  <div class="mt-10 border-gray-200 pt-5">
                    <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                      <div class="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                        <button type="button"
                          class="inline-flex w-full justify-center rounded-md bg-white px-10 py-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50  sm:ml-3 sm:w-auto"
                          @click="cancelPost()">Cancel</button>
                        <button type="button"
                          class="mt-3 inline-flex w-full justify-center rounded-md bg-blue-600 px-10 py-3.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-500 sm:mt-0 sm:w-auto"
                          @click="createPost()" ref="cancelButtonRef">Create</button>
                      </div>
                    </div>
                  </div>
                <!-- Form End-->
              </div>
            </div>
          </div>
        </main>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
definePageMeta({ middleware: ["auth"] });
import { dataCrud } from '@/stores/index'
import { validate } from '@/stores/validation'
import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();
const store = dataCrud();
const valid = validate();
const imageUrl = ref(null);
const imageFile = ref(); //파일은 empty로
const form = ref({});
form.value = await store.crudApi(null, null, `/admin/votes/${route.query.id}`, 'get'); 

// Top Nav
const navs = [
  { name: 'Vote', href: '#', current: false },
  { name: 'Vote Table', href: '#', current: false },
  { name: 'Edit', href: '#', current: true },
]

const handleFile = (event) => {
  imageFile.value = event.target.files[0];
  const reader = new FileReader();
reader.readAsDataURL(imageFile.value);
  reader.onload = (e) => {
    imageUrl.value = e.target.result;
  };
}

const createPost = () => {
  Swal.fire({
  title: '진행하시겠습니까?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: '추가',
  cancelButtonText: '취소'

}).then(async(result) => {
  if (result.isConfirmed) {
    Swal.fire(
      '추가되었습니다.',
      '성공'
    )
  
      const formData = new FormData();
      formData.append('image', imageFile.value); //이미지인 경우 body로 보내기
      store.crudApi(formData, form.value, `/admin/votes/${route.query.id}`, 'put'); //Parameter (bodyData, paramsData, postUrl, methodType)
      router.push({ path: `/admin/vote` })
  }
})


}

const cancelPost = () => {
  router.push({ path: `/admin/vote` })
}


</script>
