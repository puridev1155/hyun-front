<template>
  <div>

    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="inline-block min-w-full py-2 align-middle">
          <div class="overflow-hidden ring-1 ring-black ring-opacity-5">
            <table class=" min-w-full divide-y">
              <thead class="bg-gray-100">
                <tr class="text-gray">
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center"><input
                      type="checkbox" v-model="allCheckBox" /></th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-center text-sm font-semibold">ID</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">TITLE</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">OPTION</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">NAME</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">INSTAGRAM</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">UPDATED_AT</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">DELETE</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="(row,index) in store.list" :key="index">
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center"><input type="checkbox"
                      v-model="selectList" :value="row.id" /></td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                    {{ number(index) }}</td>

                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                      {{ row.vote_title }}</td>
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                      {{ row.choice_name }}</td>
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                      {{ row.name }}
                    </td>
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                      <nuxt-link :to="`https://www.instagram.com/${row.instagram}`"><img v-if="row.instagram" class="font-bold w-8 h-8 mx-auto" src="@/assets/images/instagram.jpg" /></nuxt-link></td>
                    
                  
                    
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{{ dateFormat(index) }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                    <button @click="deleteData(row.id)"
                      class="from-red-500 to-red-700 bg-gradient-to-b text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition delay-1 duration-300 ease-in-out"><TrashIcon class="w-4 h-4" /></button>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import { votersInfo, dataCrud } from '../../stores/index'
import {LockClosedIcon, LockOpenIcon, PencilAltIcon, TrashIcon, CheckCircleIcon, PlusCircleIcon} from '@heroicons/vue/outline'
import {UserIcon, XIcon} from '@heroicons/vue/solid'
import memoModal from '@/components/Admin/Memo.vue';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();
const router = useRouter();
const selectList = ref([]);


const props = defineProps({
  voteId: {
    type: Number,
    required: true,
  },
})



// 멤버 아이디 값
//Index에 있는 자료를 store에 저장하여 component로 불러오기****
let postId = null;
const store = votersInfo();
const crud = dataCrud();//get data from promise value, you gotta use await!!
const categoryList = await crud.crudApi(null, null, `/admin/categories`, 'get');
const statList = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/statistics/vstatistics`, {
      method: "get",
      credentials: 'include',
    });

    console.log(statList, props.voteId)

const stats = [
  { name: 'TOTAL VOTERS', value: '', unit: 'users' },
  { name: 'BEST OPTION', value: '', unit: 'users' },
]


// 날짜 변경
function dateFormat(i) {
  const date = new Date(store.list[i].updated_at);
  return date.toISOString().slice(0, 10);
}

// 체크박스
const allCheckBox = computed({
  get() {
    return store.list.length == selectList.value.length
  },
  set(e) {
    const result = store.list.map(id => {
      return id.id
    })
    selectList.value = e ? result : [];
  }
})

// 마지막 번호부터 보이기
function number(index) {
  return store.total - (index + (store.page-1) * store.perPage); 
}

const modalEdit = (id) => {
  router.push(`/admin/participant/edit?id=${id}`);
}

const modalMemo = (id) => {
  postId = id;
  store.memoOpen = true
}

function deleteData(id) {

  console.log('delete', id)
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
     await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/voters/${id}`, {
        method: "delete",
        credentials: 'include',
      });
      await store.postApi(null, null, `/api/admin/voters`, 'get')
    }
  })
}

// const memberSlice = computed(()=>{
//   return store.memberList.slice((store.page - 1) * store.perPage, store.page * store.perPage)
// })

</script>