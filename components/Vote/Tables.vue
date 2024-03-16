<template>
  <div>


    <!-- Statistic Start -->
    <div class="bg-white shadow-sm">
           <div class="mx-auto max-w-7xl">
             <div class="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
              <!-- <div v-for="stat in stats" :key="stat.name" class="bg-white px-2 py-3 sm:px-6 lg:px-8">
                 <AuditionStat :stat="stat"  />
               </div>-->
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
            <nuxt-link to="/admin/vote/create"
                      class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    CREATE
          </nuxt-link>
          </div>
          <div class="flex">
            <div class="w-1/2 m-2">
                <div class="relative">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" class="px-1 py-3  text-center">
                                  ID
                              </th>
                              <th scope="col" class="px-1 py-3  text-center">
                                  IMAGE
                              </th>
                              <th scope="col" class="px-1 py-3  text-center">
                                  TITLE
                              </th>
                              <th scope="col" class="px-1 py-3  text-center">
                                  USER#
                              </th>
                              <th scope="col" class="px-1 py-3  text-center">
                                  END AT
                              </th>
                              <th scope="col" class="px-1 py-3 text-center">
                                  EDIT
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr v-for="(row,index) in store.list" :key="index" class="bg-white border-b bg-white">
                              <td scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
                                {{ number(index) }}
                              </td>
                              <td>
                                <div class="flex justify-center">
                                   <img class="w-8 h-8" :src="row.original_url ?? ''"/>
                                </div>
                              </td>
                              <td class="px-6 py-4">
                                {{ row.title }}
                              </td>
                              <td class="px-6 py-4">
                                  <Nuxt-link :to="`/admin/voter/${row.id}`" class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-2 py-1 text-center">{{ statList.getVotersPerVote[0].vote_id == row.id ? statList.getVotersPerVote[0].total_voters : 0 }}</Nuxt-link>
                              </td>
                              <td class="px-6 py-4">
                                  {{ dateFormat(row.end_at) }}
                              </td>
                              <td class="whitespace-nowrap text-sm text-gray-500 text-center px-2">
                                <button @click="modalList(row.id)"
                      class=" hover:bg-red-600 bg-orange-600 text-white font-bold py-2 px-4 rounded mr-2"><MenuIcon class="w-4 h-4" /></button>
                                <button @click="modalEdit(row.id)"
                      class="from-blue-600 to-blue-900 bg-gradient-to-b hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 transition delay-1 duration-300 ease-in-out"><PencilAltIcon class="w-4 h-4" /></button>
                    <button @click="deleateMember(row.id)"
                      class="from-red-500 to-red-700 bg-gradient-to-b text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition delay-1 duration-300 ease-in-out"><TrashIcon class="w-4 h-4" /></button>
                              </td>
                          </tr>
                      </tbody>
                  </table>
                    <!-- Pagination Start -->
                      <VotePaginations />
                    <!-- Pagination End -->
              </div>
            </div>
            <div class="w-1/2 m-2">
              <div class="relative">
                <VoteChoice v-if="choiceOpen" :postId="postId"></VoteChoice>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import { dataCrud, votesInfo } from '../../stores/index'
import {LockClosedIcon, LockOpenIcon, PencilAltIcon, TrashIcon, CheckCircleIcon, PlusCircleIcon, MenuIcon} from '@heroicons/vue/outline'
import {UserIcon, XIcon} from '@heroicons/vue/solid';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();
const router = useRouter();
const selectList = ref([]);
const categoryId = 1;
const postId = ref('');
const choiceOpen = ref(false);
const inputBoxes = ref([]);

const elements = [
  { name : 'dfd'},
  { name : 'fggg'},
  { name : 'eee' }
]

// 멤버 아이디 값
const store = votesInfo();
const crud = dataCrud();
const statList = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/statistics/vstatistics`, {
      method: "get",
      credentials: 'include',
    });

console.log(statList)



const stats = [
  { name: 'TOTAL VOTES', value: statList.totalVote, unit: 'votes' },
  { name: 'ACTIVE VOTES', value: statList.activeVotes, unit: 'votes' },
  { name: 'ENDED VOTES', value: statList.endedVotes, unit: 'votes' },
  { name: 'UNLIMITED VOTES', value: statList.unlimitedVotes, unit: 'votes' },
]

// 날짜 변경
function dateFormat(i) {
  return i.substring(0, 10);
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

const modalList = (id) => {
  postId.value = id;
  store.postId;
  choiceOpen.value = true
}

const modalEdit = (id) => {
  router.push(`/admin/vote/edit?id=${id}`);
}



function deleateMember(id) {

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
    await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/votes/${id}`, {
      method: "delete",
      credentials: 'include',
    });
    store.postApi();
  }
})
}

</script>