<template>
    <div>
      <NuxtLayout name="adminlayout">
        <div class="flex flex-1 flex-col md:pl-64">
          <main class="flex-1">
              <!-- Page Direction Start -->
                <AuditionNavtop :navs="navs" />
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
                            <select id="visibility" v-model="form.public" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" >
                              <option :value="null" selected>Select</option>
                              <option v-for="row in visibility" :key="row" :value="row.value">{{ row.name }}</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label for="visibility" class="block text-sm font-medium text-gray-700 mb-1">Select Country(국가 선택)</label>
                          <div class="mt-1">
                            <select id="visibility" v-model="form.country_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option :value="null" selected>Select</option>
                                <option v-for="row in countryId" :key="row" :value="row.id">{{ row.name }}</option>
                            </select>
                          </div>
                        </div>
                        <div>
                          <label for="visibility" class="block text-sm font-medium text-gray-700 mb-1">Select Language(언어 선택)</label>
                          <div class="mt-1">
                            <select id="visibility" v-model="form.lang_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                                <option :value="null" selected>Select</option>
                                <option v-for="row in countryId" :key="row" :value="row.id">{{ row.name }}</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="mt-4">
                        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title(제목)</label>
                        <input type="text" name="title" v-model="form.title"
                            class="block w-full rounded-md border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                      </div>
                      <div class="mt-4">
                        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">내용</label>
                        <textarea name="title" v-model="form.memo_info"
                            class="block w-full rounded-md border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                        </textarea>
                      </div>
                      <div class="mt-4">
                        <label for="title" class="block text-sm font-medium text-gray-700 mb-1">(Thumbnail) 썸네일 이미지</label>
                        <input type="file" name="file" @change="handleFile" :v-model="imageFile"
                            class="block w-full rounded-md border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                            <img v-if="imageUrl" :src="imageUrl" alt="Preview" class="w-48 h-48">
                      </div>
                    </div>
                    <div>
                      <div class="mt-4">
                        <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-6 sm:gap-x-4">
                          <div>
                            <label for="visibility" class="block text-sm font-medium text-gray-700 mb-1">SNS Agree</label>
                            <label class="relative inline-flex items-center mb-5 cursor-pointer">
                              <input type="checkbox" v-model="form.sns_agree" class="sr-only peer">
                              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <div>
                            <label for="visibility" class="block text-sm font-medium text-gray-700 mb-1">Price Agree</label>
                            <label class="relative inline-flex items-center mb-5 cursor-pointer">
                              <input type="checkbox" v-model="form.price_agree" class="sr-only peer">
                              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <!-- <div>
                            <label for="visibility" class="block text-sm font-medium text-gray-700 mb-1">Age Limit</label>
                            <label class="relative inline-flex items-center mb-5 cursor-pointer">
                              <input type="checkbox" v-model="form.age_agree" class="sr-only peer">
                              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div> -->
                          <div>
                            <label for="visibility" class="block text-sm font-medium text-gray-700 mb-1">Ticket Limit</label>
                            <label class="relative inline-flex items-center mb-5 cursor-pointer">
                              <input type="checkbox" v-model="form.ticket_agree" class="sr-only peer">
                              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                          <div>
                            <label for="visibility" class="block text-sm font-medium text-gray-700 mb-1">Time Set</label>
                            <label class="relative inline-flex items-center mb-5 cursor-pointer">
                              <input type="checkbox" v-model="form.time_agree" class="sr-only peer">
                              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div v-if="form.price_agree || form.age_agree || form.ticket_agree" class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                        <div v-if="form.price_agree">
                          <label for="visibility" class="block text-sm font-medium text-gray-700 mb-1">가격 메모</label>
                          <div class="mt-1">
                            <input type="text" name="price" v-model="form.memo_price" placeholder="오디션 비용 30,000, 60,000원"
                            class="block w-full rounded-md border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                          </div>
                        </div>
                        <div v-if="form.price_agree">
                          <label for="visibility" class="block text-sm font-medium text-gray-700 mb-1">가격명 : 가격 </label>
                          <div class="mt-1">
                            <button @click="priceAdd" class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l p-1 text-center">
                              <PlusSmIcon class="w-8 h-8 text-white" /></button>
                          </div>
                        </div>

                        <div v-if="form.price_agree" v-for="(row, index) in inputBoxes" :key="index">
                          <label for="visibility" class="block text-sm font-medium text-gray-700">가격 추가</label>
                            <div class="mt-1 flex">
                                <input type="text" name="price" v-model="row[0]" placeholder="제목"
                                class="block w-1/3 rounded-md border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mr-1">
                                <input type="text" name="price" v-model="row[1]" placeholder="30000"
                                class="block w-2/3 rounded-md border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 mr-1">
                                <button @click="priceRemove(index)">
                                <MinusSmIcon class="w-7 h-7 text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-l text-center" /></button>
                              </div>
                            </div>
                        <!-- <div v-if="form.age_agree">
                          <label for="visibility" class="block text-sm font-medium text-gray-700 mb-1">나이제한(숫자만)</label>
                          <div class="mt-1">
                            <input type="text" name="age" v-model="form.age_limit" placeholder="20"
                            class="block w-full rounded-md border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                          </div>
                        </div> -->
                        <div  v-if="form.ticket_agree">
                          <label for="visibility" class="block text-sm font-medium text-gray-700 mb-1">티켓제한(숫자만)</label>
                          <div class="mt-1">
                            <input type="number" name="age" v-model="form.ticket_count" placeholder="100" 
                              class="block w-full rounded-md border-gray-300 bg-white py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                          </div>
                        </div>
                    </div>

                      <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4" v-if="form.time_agree">
                        <div>
                          <label for="visibility" class="block text-sm font-medium text-gray-700 mb-1">시작일</label>
                          <div class="mt-1">
                            <input type="date" v-model="form.start_date"
                              class="block appearance-none w-full  border border-gray-200 text-gray-700 bg-white py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-state" placeholder="시작날짜 선택" />
                          </div>
                        </div>
                        <div>
                          <label for="visibility" class="block text-sm font-medium text-gray-700 mb-1">종료일</label>
                          <div class="mt-1">
                            <input type="date" v-model="form.end_date"
                              class="block appearance-none w-full  border border-gray-200 text-gray-700 bg-white py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                              id="grid-state" placeholder="종료날짜 선택" />
                          </div>
                        </div>
                      </div>
                  
                    <div class="mt-10 border-gray-200 pt-5">
                      <h2 class="text-lg font-medium text-gray-900">상세 내용</h2>
                    
                      <div class="mt-4 sm:gap-x-4"  v-if="showEditor">
                        <Editor v-model="form.content" api-key="gydmxr4by8tp0qh2qr7sg95qfmqsn3tir7uapl8hlg35gufz"
                        :init="initObject" />
                      </div>
                      <div v-else>
                        <Loading :size="10" />
                      </div>
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
  import Editor from '@tinymce/tinymce-vue'
  import { dataCrud, postsInfo } from '@/stores/index'
  import { PlusSmIcon, MinusSmIcon } from '@heroicons/vue/outline'
  import Swal from 'sweetalert2'
  import { useRoute, useRouter } from 'vue-router'

  const { user } = await useAuth(); //fetch current User data
  //console.log(user.value.id); //proxy인 경우 value 값 추가

  const route = useRoute();
  const router = useRouter();
  const store = dataCrud();
  const post = postsInfo();
  const form = ref({});
  const imageUrl = ref(null);
  const imageFile = ref();
  form.value.country_id = null; //선택 option 1
  form.value.lang_id = null; //선택 option 1
  form.value.public = null; //선택 option 1
  form.value.price_agree = 0;
  form.value.sns_agree = 0;
  form.value.category_id = 1; //audition
  form.value.ticket_agree = 0;
  const showEditor = ref('');
  const inputBoxes = ref([]);
  form.value.price = [];

  const countryId = await store.crudApi(null, null, `/admin/countries`, 'get'); //Parameter (body, params.  postUrl, methodType)

  

  // Top Nav
  const navs = [
    { name: 'Audition', href: '#', current: false },
    { name: 'Audition Table', href: '#', current: false },
    { name: 'Edit', href: '#', current: true },
  ]
  const visibility = [
    { name: '공개', value: "1"},
    { name: '비공개', value: "0"}
  ]

  showEditor.value = false;
  onMounted(()=> {
    setTimeout(() => {
      showEditor.value = true;
  }, 800);
})

  const handleFile = (event) => {
    imageFile.value = event.target.files[0];
    const reader = new FileReader();
  reader.readAsDataURL(imageFile.value);
    reader.onload = (e) => {
      imageUrl.value = e.target.result;
    };
  }


  const priceAdd = () => {
    inputBoxes.value.push([]);
  }

  const priceRemove = (i) => {
    console.log(i, 'iiii');
    inputBoxes.value.splice(i, 1);
  }

  const createPost = () => {
    
    if(validation()) { //validate 통과시 실행
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
              form.value.prices = JSON.stringify(inputBoxes.value);
              form.value.price_agree = form.value.price_agree ? 1 : 0;
              form.value.sns_agree = form.value.sns_agree ? 1 : 0;
              //formData.append('postData', JSON.stringify(form.value)); 값을 formData에 저장되는 경우 json.stringify처리를 해야 함.
              formData.append('image', imageFile.value); //이미지인 경우 body로 보내기
              store.crudApi(formData, form.value, '/admin/posts', 'post'); //Parameter (bodyData, paramsData, postUrl, methodType)
              router.push({ path: `/admin/audition` })
          }
        })

    }

  }

  const cancelPost = () => {
    router.back()
  }

  const validation = () => {
  let isValid = true; // Assume the form is valid by default

  console.log(inputBoxes.value, 'title')
  if (form.value.country_id === null) {
    alert("국가를 선택하세요");
    isValid = false;
  } else if (form.value.lang_id === null) {
    alert("언어를 선택하세요");
    isValid = false;
  } else if (form.value.title === undefined || form.value.title === '') {
    alert("제목을 입력하세요");
    isValid = false;
  } else if (form.value.memo_price === null) {
    alert("가격 메모를 입력하세요");
    isValid = false;
  } else if (inputBoxes.value == null) {
    alert("가격을 추가 입력하세요");
    isValid = false;
  } else if (form.value.memo_info === null) {
    alert("내용이 있는지 확인해주세요");
    isValid = false;
  }

  if (!isValid) {
    // Validation failed; prevent form submission
    return false;
  }

  // Validation passed
  return true;
};




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
  