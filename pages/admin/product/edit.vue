<template>
  <div>
    <NuxtLayout name="adminlayout">
      <div class="flex flex-1 flex-col md:pl-64">
        <main class="flex-1">
            <!-- Page Direction Start -->
              <ProductNavtop :navs="navs" />
            <!-- Page Direction End -->
          <div class="max-w-4xl">
            <div class="mx-auto px-4 lg:px-10">
              <div class="px-4 pt-10">
                <!-- Form Start-->
                  <div>
                    <h2 class="text-lg font-medium text-gray-900">{{ navs[0].name }} Information</h2>   
                    <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                      <div>
                        <label for="visibility" class="block text-sm font-medium text-gray-700 mb-1">Select Visibility(공개 여부)</label>
                        <div class="mt-1">
                          <select id="visibility" v-model="form.public" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option :value="null" selected>Select</option>
                            <option v-for="row in visibility" :key="row" :value="row.value">{{ row.name }}</option>
                      </select>
                        </div>
                      </div>
                      <div>
                        <label for="category" class="block text-sm font-medium text-gray-700 mb-1">Category(카테고리 선택)</label>
                        <div class="mt-1">
                          <select id="visibility" v-model="form.category_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                            <option :value="null" selected>Select</option>
                            <option v-for="row in categoryId.data" :key="row" :value="row.id">{{ row.category_name }}</option>
                      </select>
                        </div>
                      </div>
                      <div>
                        <label for="country" class="block text-sm font-medium text-gray-700 mb-1">Select Country(국가 선택)</label>
                        <div class="mt-1">
                          <select id="visibility" v-model="form.lang_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                              <option :value="null" selected>Select</option>
                              <option v-for="row in countryId.data" :key="row" :value="row.id">{{ row.name }}</option>
                      </select>
                        </div>
                      </div>
                    </div>

                    <div class="mt-4">
                      <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title(제목)</label>
                      <input type="text" name="title" v-model="form.product_name"
                          class="block w-full rounded-md border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    </div>
                    <div class="mt-4">
                      <label for="title" class="block text-sm font-medium text-gray-700 mb-1">브랜드명</label>
                      <input type="text" name="title" v-model="form.brand"
                          class="block w-full rounded-md border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    </div>
                    <div class="mt-4">
                      <label for="title" class="block text-sm font-medium text-gray-700 mb-1">간단한 설명</label>
                      <textarea id="message" v-model="form.description" rows="4" class="block p-2.5 w-full text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="간단한 설명 입력"></textarea>
                    </div>
                    <div class="mt-4">
                      <label for="title" class="block text-sm font-medium text-gray-700 mb-1">배송정보</label>
                      <textarea id="message" v-model="form.shipping" rows="4" class="block p-2.5 w-full text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="간단한 설명 입력"></textarea>
                    </div>
                    <div class="mt-4">
                      <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div> <label for="title" class="block text-sm font-medium text-gray-700 mb-1">(Thumbnail) 썸네일 이미지</label>
                        <input type="file" name="file" @change="handleFile" :v-model="imageFile"
                            class="block w-full rounded-md border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></div>
                          <div class="mt-6">
                            <button @click="cancelFile" v-if="imageUrl || form.image_url"
                                  class="absolute ml-14 text-sky-500 border border-sky-500 hover:bg-sky-500 hover:text-white active:bg-sky-600 font-bold uppercase text-xs px-4 py-2 rounded outline-none focus:outline-none ease-linear transition-all duration-150"
                                  type="button">삭제
                            </button><img v-if="imageUrl ? imageUrl : form.image_url" :src="imageUrl ? imageUrl : form.image_url" alt="Preview" class="w-10 ">
                            </div>                  
                        </div>  
                    </div>
                    <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                    <div class="mt-4">
                          <label for="visibility" class="block text-sm font-medium text-gray-700 mb-1">재고</label>
                          <div class="mt-1">
                            <input type="text" name="price" v-model="form.in_stock" placeholder="10000"
                            class="block w-full rounded-md border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                          </div>
                    </div>
                    <div class="mt-4">
                          <label for="visibility" class="block text-sm font-medium text-gray-700 mb-1">가격 메모</label>
                          <div class="mt-1">
                            <input type="text" name="price" v-model="form.memo_price" placeholder="10000"
                            class="block w-full rounded-md border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                          </div>
                    </div>
                      <div class="mt-4">
                          <label for="visibility" class="block text-sm font-medium text-gray-700 mb-1">가격명 : 가격 </label>
                          <div class="mt-1">
                            <button @click="priceAdd" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l p-1 text-center">
                              <PlusSmIcon class="w-8 h-8 text-white" /></button>
                          </div>
                        </div>
                    <div class="mt-4">
                        <div v-for="(row, index) in form.pprices" :key="index">
                          <label for="visibility" class="block text-sm font-medium text-gray-700">가격 추가</label>
                              <div class="mt-1 flex">
                                <input type="text" name="price" v-model="row.title" placeholder="제목"
                                class="block w-1/3 rounded-md border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mr-1">
                                <input type="text" name="price" v-model="row.price" placeholder="30000"
                                class="block w-2/3 rounded-md border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mr-1">
                                <button @click="priceRemove(index)">
                                <MinusSmIcon class="w-7 h-7 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-l text-center" /></button>
                              </div>
                        </div>
                    </div></div>
                  </div>     
                  <div class="mt-10 border-gray-200 pt-5">
                    <h2 class="text-lg font-medium text-gray-900">Content Information</h2>
                      <div class="mt-4 sm:gap-x-4"  v-if="showEditor">
                        <Editor v-model="form.info" api-key="gydmxr4by8tp0qh2qr7sg95qfmqsn3tir7uapl8hlg35gufz"
                        :init="initObject" />
                      </div>
                      <div v-else>
                        <Loading :size="10" />
                      </div>
                    <div class=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                      <div class=" px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                        <button type="button"
                          class="inline-flex w-full justify-center rounded-md bg-white px-10 py-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50  sm:ml-3 sm:w-auto"
                          @click="cancelPost()">취소</button>
                        <button type="button"
                          class="mt-3 inline-flex w-full justify-center rounded-md bg-blue-600 px-10 py-3.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-500 sm:mt-0 sm:w-auto"
                          @click="updatePost()" ref="cancelButtonRef">수정</button>
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
import Editor from '@tinymce/tinymce-vue'
import { dataCrud } from '@/stores/index'
import { validate } from '@/stores/validation'
import { PlusSmIcon, MinusSmIcon } from '@heroicons/vue/outline'
import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();
const store = dataCrud();
const valid = validate();
const imageUrl = ref(null);
const imageFile = ref();
const form = ref({});
const showEditor = ref('');

form.value = await store.crudApi(null, null, `/admin/products/${route.query.id}`, 'get'); //Parameter (body, params.  postUrl, methodType)
const categoryId = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/categories?filter[category_type]=product`, {
      method: "get",
      credentials: 'include',
    });

const countryId = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/countries`, {
      method: "get",
      credentials: 'include',
    });

//onMounted(()=> {
//  categoryApi({ 'filter[category_type]' : 'product' })
//  countryApi(null)
// })

//async function categoryApi(filterType) {
//  try {
//    const { data : response } = store.crudApi(null, { 'filter[category_type]' : 'product' }, `/admin/categories`, 'get');
//    categoryId.value = response
//  } catch (error) {
//    if ([401, 419].includes(error?.response?.status)) return null;
//    throw error;
// }
//
// }



//Static Top Nav 
const navs = [
  { name: 'Product', href: '#', current: false },
  { name: 'Product Table', href: '#', current: false },
  { name: 'Edit', href: '#', current: true },
]

const visibility = [
  { name: '공개', value: "1"},
  { name: '비공개', value: "0"}
]

//Editor Delay Start
showEditor.value = false;
  onMounted(()=> {
    setTimeout(() => {
      showEditor.value = true;
  }, 800);
})
//Editor Delay End

//File Handling Start
const handleFile = (event) => {
    imageFile.value = event.target.files[0];
    const reader = new FileReader();
  reader.readAsDataURL(imageFile.value);
    reader.onload = (e) => {
      imageUrl.value = e.target.result;
    };
  }

const cancelFile = (event) => {
  imageUrl.value = null;
  form.value.image_url = null;
}
//File Handling End

const updatePost = () => {

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
        '완료되었습니다',
        '성공'
      )
      const formData = new FormData();
        //formData.append('postData', JSON.stringify(form.value)); 값을 formData에 저장되는 경우 json.stringify처리를 해야 함.
      
      formData.append('image', imageFile.value); 
      formData.append('_method', 'PUT'); //put method 사용

      console.log(formData, form.value)
      store.crudApi(formData, form.value, `/admin/products/${route.query.id}`, 'post'); //Parameter (body, params.  postUrl, methodType)  
      router.push({ path: `/admin/product` })
     
    }
  })
  
}

const cancelPost = () => {
  router.push({ path: `/admin/product` })
}

const priceAdd = () => {
    inputBoxes.value.push([]);
  }

  const priceRemove = (i) => {
    console.log(i, 'iiii');
    inputBoxes.value.splice(i, 1);
  }



const initObject = {
height: 600,
plugins: ' lists image link searchreplace emoticons table code media',
toolbar: ' image imagetools undo redo |  styleselect | bold italic charmap | alignleft aligncenter alignright alignjustify link | lists numlist outdent indent | media emoticons code',

language: "ko_KR",
file_picker_types: 'file image media',
/* enable title field in the Image dialog*/
image_title: true,
/* enable automatic uploads of images represented by blob or data URIs*/
automatic_uploads: true,
images_reuse_filename: true,

file_picker_callback: (cb, value, meta) => {

  const input = document.createElement('input');

  input.setAttribute('type', 'file');
  input.setAttribute('accept', 'image/*');

  // url 변환
  input.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    let editorUrl;
    console.log(file)
    let formData = new FormData();
    formData.append('image', file)
    // formData.append('')
    try {
       const response = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/posts/images`, {
        method: "post",
        body: formData,
        credentials: 'include',
      });
      editorUrl = response.data
      console.log(editorUrl);
    } catch (error) {
      if ([401, 419].includes(error?.response?.status)) return null;
      throw error;
    }
    cb(editorUrl.original_url, { title: file.name })
    
  });

  input.click();
},
content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
}

</script>
