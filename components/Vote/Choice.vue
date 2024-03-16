<template>
  <div>
      <table class="w-full text-sm text-left text-gray-500 bg-white">
        
        <tbody>
          <tr  class="text-xs text-gray-700 uppercase ">
              <td colspan="2">
                <input type="file" name="file" @change="handleFile" :v-model="imageFile"
                   class="block w-full rounded-md border-gray-300 bg-white py-2 px-1 shadow-sm">
                    <img v-if="imageUrl" :src="imageUrl" alt="Preview" class="w-48 h-48">
              </td>
              <td>
                <input type="text" name="name" v-model="form.name" placeholder="옵션 이름"
              class="block w-full rounded-md border-gray-300 bg-white py-3 px-4 shadow-sm">
              </td>
              <td class="text-sm text-gray-500 text-right bg-white">
                <button @click="createData"
            class="from-blue-600 to-blue-900 bg-gradient-to-b hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 transition delay-1 duration-300 ease-in-out">
            <PlusIcon class="w-4 h-4" /></button>
            <button @click="refresh"
            class="from-purple-600 to-purple-900 bg-gradient-to-b hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 transition delay-1 duration-300 ease-in-out">
            <RefreshIcon class="w-4 h-4" /></button>
              </td>
            </tr>
        </tbody>
      </table>
                  <!-- Order Data Start -->
                  <VueDraggableNext class="flex flex-wrap -mx-3" tag="div" :list="list" @change="updateData" v-if="!loading">
              <div class="w-full md:w-1/4 px-2 mt-6 md:mb-0" v-for="(row,index) in list">
                <div class="flex justify-center">
                    <img :src="row.original_url" class="w-full" />
                </div>
                <p class="text-center py-1 bg-white">{{ row.id }}</p>
                <p class="text-center py-1">{{ row.name }}</p>
                <div>
                 <!-- <button @click="modalEdit(row.id, row.vote_id)"
                      class="from-blue-600 to-blue-900 bg-gradient-to-b hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 transition delay-1 duration-300 ease-in-out"><PencilAltIcon class="w-4 h-4" /></button>-->
                    <button @click="deleteData(row.id)"
                      class="from-red-500 to-red-700 bg-gradient-to-b text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition delay-1 duration-300 ease-in-out"><TrashIcon class="w-4 h-4" /></button></div>
              </div>   
            </VueDraggableNext>    
        <!-- Order Data End -->
    <!--  <voteEdit v-if="store.choiceOpen" :postId="postId" :voteId="voteId"></voteEdit> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import {TrashIcon, PencilAltIcon, RefreshIcon,  SortDescendingIcon, PlusIcon } from '@heroicons/vue/outline'
import voteEdit from '@/components/Vote/voteEdit.vue';
import { VueDraggableNext } from 'vue-draggable-next'
import { dataCrud } from '@/stores/index'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { $fetcher } from '~/utils/$larafetch'
const router = useRouter();
const store = dataCrud();
const form = ref({});
const content = ref('');
const imageFile = ref({});
const imageUrl = ref('');
const list = ref([]);
// choice 값
let postId = null;
let voteId = null;
const loading = ref(false);
const options = {
  name: "table-example",
  display: "Table",
  order: 8,
};

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


const modalEdit = (id, vId) => {
  console.log(id, 'id')
  console.log(vId, 'voteId')
  postId = id;
  voteId = vId;
  store.choiceOpen = true
}


const listRun = async () => {
    loading.value = true;
    try {
      list.value = await store.crudApi(null, null, `/admin/votes/${props.postId}/choices`, 'get');
    } catch (error) {
      console.log("Data not found");
      throw createError({
        statusCode: 404,
        statusMessage: "Data not found.",
        fatal: true,
      });
    } finally {
      loading.value = false;
    }
  };

const refresh = () => { //reset
  console.log('refresh')
  form.value.name = '';
  imageFile.value = {};
  imageUrl.value = '';

}

onMounted(()=>{
  listRun();
})


watch(
  () => props.postId, async (newValue, oldValue) => {
    loading.value = true;
    try {
      list.value = await store.crudApi(null, null, `/admin/votes/${newValue ? newValue : oldValue }/choices`, 'get');
    } catch (error) {
        console.log(error)
    } finally {
      loading.value = false;
    }
  },
  { deep: true }
)

const onUpdate = () => {
    console.log(list.value, 'df');
   }

const handleFile = (event) => {
    imageFile.value = event.target.files[0];
    const reader = new FileReader();
  reader.readAsDataURL(imageFile.value);
    reader.onload = (e) => {
      imageUrl.value = e.target.result;
    };
  }

const createData = () => {

    //validation
    if(!form.value.name) {
      alert('옵션 제목을 등록해주세요.');
      return false;
    } else if(!imageFile.value) {
      alert('이미지 파일을 등록해주세요.');
    }

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
        store.crudApi(formData, form.value, `/admin/votes/${props.postId}/choices`, 'post');
        list.value = await store.crudApi(null, null, `/admin/votes/${props.postId}/choices`, 'get'); //Parameter (bodyData, paramsData, postUrl, methodType)
        form.value.name = '';
        imageFile.value = {};
        imageUrl.value = '';
      }
  })
}

function deleteData(id) {

Swal.fire({
  title: '삭제하시겠습니까?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: '삭제',
  cancelButtonText: '취소'

}).then(async(result) => {
  if (result.isConfirmed) {
    Swal.fire(
      '삭제되었습니다.',
      '성공'
    )
    await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/votes/${props.postId}/choices/${id}`, {
      method: "delete",
      credentials: 'include',
    });
    list.value = await store.crudApi(null, null, `/admin/votes/${props.postId}/choices`, 'get');
  }
})
}

function orderData(id) {
Swal.fire({
  title: '순서 변경하시겠습니까?',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: '삭제',
  cancelButtonText: '취소'

}).then(async(result) => {
  if (result.isConfirmed) {
    Swal.fire(
      '삭제되었습니다.',
      '성공'
    )
    await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/votes/${props.postId}/choices/${id}`, {
      method: "delete",
      credentials: 'include',
    });
   
    list.value = await store.crudApi(null, null, `/admin/votes/${props.postId}/choices`, 'get');
  }
})
}

async function updateData() {

  let result = list.value.map( a => a.id );
  await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/votes/order/${props.postId}`, {
      method: "post",
      params : result,
      credentials: 'include',
    });
    list.value = await store.crudApi(null, null, `/admin/votes/${props.postId}/choices`, 'get');

}
</script>