<template>
  <div>
    <div class="mt-8 flex flex-col">
      <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <div class="overflow-hidden shadow-sm ring-1 ring-black ring-opacity-5">

            <table class=" min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <!-- <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-gray-900 text-center"><input
                      type="checkbox" v-model="allCheckBox" /></th> -->
                  <th scope="col" class=" py-3.5 pl-4 pr-3 text-center text-sm font-semibold text-gray-900">ID</th>
                  <th scope="col" class="w-1/6 px-3 py-3.5 text-sm font-semibold text-gray-900 text-center">시도</th>
                  <th scope="col" class="w-1/6 px-3 py-3.5 text-sm font-semibold text-gray-900 text-center">선거구</th>
                  <th scope="col" class="w-1/6 px-3 py-3.5 text-sm font-semibold text-gray-900 text-center">시군구</th>
                  <th scope="col" class="w-1/6 px-3 py-3.5 text-sm font-semibold text-gray-900 text-center">읍면동</th>
                  <th scope="col" class=" px-3 py-3.5 text-sm font-semibold text-gray-900 text-center">당원수</th>
                  <th scope="col" class=" px-3 py-3.5 text-sm font-semibold text-gray-900 text-center">동네 인원수</th>
                  <th scope="col" class=" px-3 py-3.5 text-sm font-semibold text-gray-900 text-center">수정/삭제</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="(district,index) in store.districtsList" :key="index">
                  <!-- <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center"><input type="checkbox"
                      v-model="selectList" :value="call.id" /> </td> -->
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                     {{ number(index) }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{{ district.state }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{{ district.election }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{{ district.city }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{{ district.district }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{{ district.count }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{{ district.population }}</td> 
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                    <button @click="modalEdit(district.id)"
                      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 transition delay-1 duration-300 ease-in-out">수정</button>
                    <button @click="deleateDistricts(district.id)"
                      class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition delay-1 duration-300 ease-in-out">삭제</button>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
          <DistrictEdit v-if="store.editOpen" :postId="postId"></DistrictEdit>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

import { ref, onBeforeMount, onMounted } from 'vue'
import member from '~~/middleware/member';
import { districtsInfo} from '../../stores/index';
import DistrictEdit from '@/components/Districts/DistrictEdit.vue';
import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();
const router = useRouter();
const selectList = ref([]);
// 멤버 아이디 값
let postId = null;

const store = districtsInfo();


// 체크박스
const allCheckBox = computed({
  get() {
    return store.callList.length == selectList.value.length
  },
  set(e) {
    const result = store.callList.map(id => {
      return id.id
    })
    selectList.value = e ? result : [];
  }
})



// 마지막 번호부터 보이기
function number(index) {
  return store.total - (index + (store.page - 1) * store.perPage);
}


const modalEdit = (id) => {
  postId = id;
  store.editOpen = true
}



// 지역 삭제
async function districtsDelete(id) {
  try {
    const response = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/districts/${id}`, {
      method: "delete",
      credentials: 'include',
    });
    return response
  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
}



function deleateDistricts(id) {
  Swal.fire({
    title: '지역을 삭제하시겠습니까?',
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
     await districtsDelete(id);
      await store.districtsApi();
    }
  })
}








</script>