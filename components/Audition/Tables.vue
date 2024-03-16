<template>
  <div>

    <!-- Statistic Start -->
    <div class="bg-white shadow-sm">
           <div class="mx-auto max-w-7xl">
             <div class="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
             
             </div>
           </div>
    </div>
    <!-- Button Add Start -->
    <!-- Button Add End -->
    <!-- Statistic End -->
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
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">OPEN</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">LANG</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">IMAGE</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">TITLE</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">PLACE</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">SNS</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">PMEMO</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">AGE</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">IN_STOCK</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">OUT_STOCK</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">UPDATED_AT</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">EDIT</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">

                <tr v-for="(row,index) in store.list" :key="index">
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center"><input type="checkbox"
                      v-model="selectList" :value="row.id" /></td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                    {{ number(index) }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                    <div class="flex justify-center">
                      <div><LockOpenIcon v-if="row.public" class="w-4 h-4 text-green-600" /><LockClosedIcon v-if="!row.public" class="w-4 h-4 text-red-600" /></div>
                    </div>
                  </td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                    {{  row.lang_id == null ? 'All' : convertCountry(row.lang_id) }}</td>
                  <td class="whitespace-nowrap py-4 flex justify-center items-center">
                    <img v-if="row.original_url" :src="row.original_url" class="h-10" /></td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                    <Nuxt-link to="#" class="text-indigo-700">{{ row.title.substring(0,32) }}...</Nuxt-link></td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                    {{  countryList.filter(obj => obj.id === row.country_id)[0].name }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                    <div class="flex justify-center">
                      <div><CheckCircleIcon v-if="row.sns_agree" class="w-4 h-4 text-green-600" /></div>
                    </div></td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                    {{ row.memo_price ? row.memo_price : 'Free' }}</td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                    {{ row.age_limit ? row.age_limit : 'None' }}</td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                    {{ row.ticket_count > row.buy_count ? row.ticket_count : '매진' }}</td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                    {{ row.buy_count }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{{ dateFormat(index) }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                    <button @click="modalEdit(row.id)"
                      class="from-blue-600 to-blue-900 bg-gradient-to-b hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 transition delay-1 duration-300 ease-in-out"><PencilAltIcon class="w-4 h-4" /></button>
                    <button @click="deletePost(row.id)"
                      class="from-red-500 to-red-700 bg-gradient-to-b text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition delay-1 duration-300 ease-in-out"><TrashIcon class="w-4 h-4" /></button>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>

          <memoModal v-if="store.memoOpen" :postId="postId"></memoModal>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import { dataCrud, postsInfo } from '../../stores/index'
import {LockClosedIcon, LockOpenIcon, PencilAltIcon, TrashIcon, CheckCircleIcon, PlusCircleIcon} from '@heroicons/vue/outline'
import {UserIcon, XIcon} from '@heroicons/vue/solid'
import memoModal from '@/components/Admin/Memo.vue';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();
const router = useRouter();
const selectList = ref([]);
const categoryId = 1;
const langId = ref('');

// 멤버 아이디 값
let postId = null;
const store = postsInfo();
const crud = dataCrud();
const countryList = await crud.crudApi(null, null, `/admin/countries`, 'get');//get data from promise value, you gotta use await!!
const categoryList = await crud.crudApi(null, null, `/admin/categories`, 'get');


const stats = [
  { name: 'TOTAL AUDITION', value: store.total, unit: 'posts' },
  { name: '진행될 AUDITION ', value: '30', unit: 'posts' },
  { name: '진행중 AUDITION', value: '20', unit: 'posts' },
  { name: '종료 AUDITION', value: '9', unit: 'posts' },
]

// 날짜 변경
function dateFormat(i) {
  const date = new Date(store.list[i].updated_at);
  return date.toISOString().slice(0, 10);
}

function convertCountry(j) {
  let cc = countryList.filter(obj => obj.id === j )[0].name;
  return cc;
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
  router.push(`/admin/audition/edit?id=${id}`);
}

const modalMemo = (id) => {
  postId = id;
  store.memoOpen = true
}

function deletePost(id) {

  Swal.fire({
    title: '포스트를 삭제하시겠습니까?',
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
     await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/posts/${id}`, {
        method: "delete",
        credentials: 'include',
      });
      store.postApi(categoryId, store.langId, store.board);
    }
  })
}

// const memberSlice = computed(()=>{
//   return store.memberList.slice((store.page - 1) * store.perPage, store.page * store.perPage)
// })

</script>