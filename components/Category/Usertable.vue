<template>
<div>
  <div class="mt-8 flex flex-col">
    <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full py-2 align-middle">
        <div class="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">
          <table class="min-w-full divide-y divide-gray-300 justify">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900">ID</th>
                <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center">카테고리</th>
                <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center">수정/삭제</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="category in store.categoryList" :key="category">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">{{category.id}}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                  <button  @click="modalEdit(category.id)" class="text-indigo-600 hover:text-indigo-900">{{category.category_name}}</button>
                </td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                  <button @click="modalEdit(category.id)" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 transition delay-1 duration-300 ease-in-out">수정</button>
                  <button @click="deleateCategory(category.id)" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition delay-1 duration-300 ease-in-out">삭제</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <CategoryEdit v-if="store.editOpen" :postId="postId"></CategoryEdit>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>

import {ref, onBeforeMount,onMounted} from 'vue'
import member from '~~/middleware/member';
import {categoryInfo} from '@/stores/index'
import CategoryEdit from '@/components/Category/CategoryEdit.vue'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router'
import consolaGlobalInstance from 'consola';
const route = useRoute();
const router = useRouter();

// 멤버 아이디 값
let postId = null;
const store = categoryInfo();


const modalEdit = (id) =>{
  postId = id;
  store.editOpen = true
  console.log(postId)
}

 function deleateCategory(id){
  Swal.fire({
    title: '카테고리를 삭제하시겠습니까?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '삭제',
    cancelButtonText: '취소'
  
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '삭제되었습니다.',
        '성공'
      )
      axios.delete(`http://ec2-13-209-67-110.ap-northeast-2.compute.amazonaws.com/api/category/${id}`)
      router.go()
    }
  })
}
</script>