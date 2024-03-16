<template>
  <div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <div class="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">

            <table class=" min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center"><input
                      type="checkbox" v-model="allCheckBox" /></th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900">ID</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center">연락처</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center">가입일자</th>
  
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center">메모내용</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center">메모</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center">삭제</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="(check,index) in store.checkList" :key="index">
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center"><input type="checkbox"
                      v-model="selectList" :value="check.id" /> </td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                    {{ number(index)}}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{{ check.phone }}</td>                
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{{ dateFormat(index) }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{{ check.memo == null ? '없음' : check.memo.length > 15 ? check.memo.substring(0, 15) + '...' : check.memo }}</td>                  
                  <td class="whitespace-nowrap px-2 py-4 text-sm text-gray-500 text-center"><div @click="modalMemo(check.id)" class="flex justify-center"><img class="w-5" src="/static/images/memo.svg" /></div></td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                    <button @click="deleateMember(check.id)"
                      class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition delay-1 duration-300 ease-in-out">삭제</button>
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
import memoModal from './Memo.vue'
import { checkInfo} from '../../stores/index'
import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();
const router = useRouter();
const selectList = ref([]);
// 멤버 아이디 값
let postId = null;

const store = checkInfo();
const publicOpen = "transition delay-75 text-center bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300";
const publicClose = "transition delay-75 text-center bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300";


// 체크박스
const allCheckBox = computed({
  get() {
    return store.checkList.length == selectList.value.length
  },
  set(e) {
    const result = store.checkList.map(id => {
      return id.id
    })
    selectList.value = e ? result : [];
  }
})

// 날짜 변경
function dateFormat(i) {
  const date = new Date(store.checkList[i].updated_at);
   return date.toISOString().slice(0, 10);
}

// 마지막 번호부터 보이기
function number(index) {
  return store.total - (index + (store.page - 1) * store.perPage);
}

const modalInfo = (id) => {
  postId = id;
  store.infoOpen = true
}


const modalEdit = (id) => {
  postId = id;
  store.editOpen = true
}

const modalMemo = (id) => {
  postId = id;
  store.memoOpen = true
}

function deleateMember(id) {
  Swal.fire({
    title: '당원을 삭제하시겠습니까?',
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
      await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/cert/${id}`, {
        method: "delete",
        credentials: 'include',
      });
      store.checkApi();
    }
  })
}


</script>