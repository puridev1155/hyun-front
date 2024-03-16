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
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">CATEGORY</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">TITLE</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">PRICE</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">USER</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">STATUS</th>
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
                    {{ row.payment_type == 'posts' ? '챌린지' : '제품' }}</td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                      {{ row.title.substring(0,20) }}...</td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                    {{ row.price }}</td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                      <button @click="modalInfo(row.user_id)" class="text-indigo-600 hover:text-indigo-900">{{ row.name
                    }}</button></td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                      <button v-if="row.status == 'paid' || row.status == 'canceled'" :class="[row.status == 'paid' ? `text-green-600` : `text-red-600`]">{{ row.status }}</button>
                      <button v-if="row.status == 'hold'" class="text-yellow-400">hold</button>
                    </td>
                    
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{{ dateFormat(index) }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                  
                    <button @click="deleteData(row.id)"
                      class="from-red-500 to-red-700 bg-gradient-to-b text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition delay-1 duration-300 ease-in-out"><TrashIcon class="w-4 h-4" /></button>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
          <memberInfo v-if="store.infoOpen" :postId="postId"></memberInfo>

        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import { paymentsInfo, dataCrud } from '../../stores/index'
import {LockClosedIcon, LockOpenIcon, PencilAltIcon, TrashIcon, CheckCircleIcon, PlusCircleIcon} from '@heroicons/vue/outline'
import {UserIcon, XIcon} from '@heroicons/vue/solid'
import memoModal from '@/components/Admin/Memo.vue';
import memberInfo from '@/components/Admin/MemberInfo.vue';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();
const router = useRouter();
const selectList = ref([]);

// 멤버 아이디 값
let postId = null;
const store = paymentsInfo();
const crud = dataCrud();//get data from promise value, you gotta use await!!
const categoryList  = await crud.crudApi(null, null, `/admin/payments`, 'get');

const stats = [
  { name: 'NUMBER OF POSTS', value: '', unit: 'users' },
  { name: 'DAILY paymentS', value: '', unit: 'users' },
  { name: 'WEEKLY paymentS', value: '150', unit: 'users' },
  { name: 'MONTLY paymentS', value: '700', unit: 'users' },
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
  router.push(`/admin/payment/edit?id=${id}`);
}

const modalMemo = (id) => {
  postId = id;
  store.memoOpen = true
}

const modalInfo = (id) => {
  postId = id;
  store.infoOpen = true
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
     await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/payments/${id}`, {
        method: "delete",
        credentials: 'include',
      });
      await store.postApi(null, null, '/api/admin/payments', 'get')
    }
  })
}


</script>