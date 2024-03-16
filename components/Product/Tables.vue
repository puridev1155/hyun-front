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
          <div class="mt-3 mb-5">
            <!-- <nuxt-link to="/admin/product/create"
                      class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    CREATE
            </nuxt-link> -->
          </div>
          <div class="overflow-hidden ring-1 ring-black ring-opacity-5">
            <table class=" min-w-full divide-y">
              <thead class="bg-gray-100">
                <tr class="text-gray">
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center"><input
                      type="checkbox" v-model="allCheckBox" /></th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-center text-sm font-semibold">ID</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">CATEGORY</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">IMAGE</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">PRODUCT</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">재고량</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">판매량</th>
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
                     {{ row.category_name }} </td>
                     <td class="whitespace-nowrap py-4 flex justify-center items-center">
                      <img v-if="row.image_url" :src="row.image_url" class="h-10" /> </td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                    <Nuxt-link to="#" class="text-indigo-700">{{ row.product_name.substring(0,40) }}</Nuxt-link></td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                    {{ row.in_stock }}</td>
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                    {{ row.out_stock }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{{ dateFormat(index) }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                    <button @click="modalEdit(row.id)"
                      class="from-blue-600 to-blue-900 bg-gradient-to-b hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 transition delay-1 duration-300 ease-in-out"><PencilAltIcon class="w-4 h-4" /></button>
                    <button @click="deleteData(row.id)"
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
import { dataCrud, productsInfo } from '../../stores/index'
import {LockClosedIcon, LockOpenIcon, PencilAltIcon, TrashIcon, CheckCircleIcon, PlusCircleIcon} from '@heroicons/vue/outline'
import {UserIcon, XIcon} from '@heroicons/vue/solid'
import memoModal from '@/components/Admin/Memo.vue';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();
const router = useRouter();
const selectList = ref([]);
const categoryList = ref([]);
const dat = ref({});

// 멤버 아이디 값
let postId = null;
const store = productsInfo();
const crud = dataCrud();
const response = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/categories?filter[category_type]=product`, {
      method: "get",
      credentials: 'include',
    });
    categoryList.value = response.data;
    console.log(categoryList)


// 날짜 변경
function dateFormat(i) {
  const date = new Date(store.list[i].created_at);
  return date.toISOString().slice(0, 10);
}

function categoryShow(i) {
  dat.value = categoryList.value.find(categoryList => categoryList.id === i);

  
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
  router.push(`/admin/product/edit?id=${id}`);
}

const modalMemo = (id) => {
  postId = id;
  store.memoOpen = true
}

function deleteData(id) {

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
     await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/products/${id}`, {
        method: "delete",
        credentials: 'include',
      });
      store.postApi(null, null, '/api/admin/products', 'get');
    }
  })
}

</script>