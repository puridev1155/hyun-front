<template>
  <div>

    <!-- Statistic Start
    <div class="bg-white shadow-sm">
           <div class="mx-auto max-w-7xl">
             <div class="grid grid-cols-1 gap-px bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
              <div v-for="stat in stats" :key="stat.name" class="bg-white px-2 py-3 sm:px-6 lg:px-8">
                <memberStat :stat="stat"  /> 
               </div>
             </div>
           </div>
    </div>  -->
    <!-- Statistic End -->
    <div class="flex flex-col">
      <div class="overflow-x-auto">
        <div class="inline-block min-w-full py-2 align-middle">
          <div class="overflow-hidden ring-1 ring-black ring-opacity-5">
            <table class=" min-w-full divide-y">
              <thead class="bg-gray-100">
                <tr class="text-gray">
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center"><input type="checkbox"
                      v-model="allCheckBox" /></th>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-center text-sm font-semibold">ID</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">INSTAGRAM</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">GENDER</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">NAME</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">AGE</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">BIRTH</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">EMAIL</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">UPDATED_AT</th>
                  <th scope="col" class="px-3 py-3.5 text-sm font-semibold text-center">EDIT</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="(member, index) in store.memberList" :key="index">
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center"><input type="checkbox"
                      v-model="selectList" :value="member.id" /> </td>
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 text-center">
                    {{ number(index) }}</td>
                  <td class="whitespace-nowrap text-sm text-gray-500 text-center">
                    <Nuxt-link :to="externalLink(member.instagram)" target="_blank"
                      class="font-bold py-2 px-4 rounded  mr-2">
                      <div class="flex justify-center">
                        <img v-if="member.instagram" class="font-bold w-8 h-8 mx-auto" src="@/assets/images/instagram.jpg" />
                      </div>
                    </Nuxt-link>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                    <img v-if="member.gender == 'female'" class="font-bold w-8 h-8 mx-auto"
                      src="@/assets/images/female.png" />
                    <img v-if="member.gender == 'male'" class="font-bold w-8 h-8 mx-auto"
                      src="@/assets/images/male.png" />
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                    <button @click="modalInfo(member.id)" class="text-indigo-600 hover:text-indigo-900">{{ member.name
                    }}</button>
                  </td>

                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{{ getAge(member.birth) }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{{ member.birth }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{{ member.email }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">{{ dateFormat(index) }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 text-center">
                    <button @click="modalEdit(member.id)"
                      class="from-blue-600 to-blue-900 bg-gradient-to-b hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 transition delay-1 duration-300 ease-in-out">
                      <PencilAltIcon class="w-4 h-4" />
                    </button>
                    <button @click="deleateMember(member.id)"
                      class="from-red-500 to-red-700 bg-gradient-to-b text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition delay-1 duration-300 ease-in-out">
                      <TrashIcon class="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

          </div>
          <memberEdit v-if="store.editOpen" :postId="postId"></memberEdit>
          <memberInfo v-if="store.infoOpen" :postId="postId"></memberInfo>
          <memoModal v-if="store.memoOpen" :postId="postId"></memoModal>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'
import { usersInfo } from '../../stores/index'
import { PencilAltIcon, TrashIcon, CheckIcon, QrcodeIcon } from '@heroicons/vue/outline'
import { UserIcon, XIcon } from '@heroicons/vue/solid'
import memberStat from '~/components/Admin/memberStat.vue';
import memberEdit from '~~/components/Admin/MemberEdit.vue';
import memberInfo from '@/components/Admin/MemberInfo.vue';
import memoModal from '@/components/Admin/Memo.vue';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute();
const router = useRouter();
const selectList = ref([]);

// 멤버 아이디 값
let postId = null;
const store = usersInfo();

const stats = [
  { name: 'TOTAL USERS', value: store.total, unit: 'users' },
  { name: 'DAILY USERS', value: '10', unit: 'users' },
  { name: 'WEEKLY USERS', value: '14', unit: 'users' },
  { name: 'MONTLY USERS', value: '30', unit: 'users' },
]

// 날짜 변경
function dateFormat(i) {
  const date = new Date(store.memberList[i].updated_at);
  return date.toISOString().slice(0, 10);
}

// 체크박스
const allCheckBox = computed({
  get() {
    return store.memberList.length == selectList.value.length
  },
  set(e) {
    const result = store.memberList.map(id => {
      return id.id
    })
    selectList.value = e ? result : [];
  }
})

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

function externalLink(instagram) {
  const link = 'https://www.instagram.com/' + instagram
  return link;
}

function getAge(yearString) {

  // Get the first four characters from the input year string as the birth year
  const birthYear = parseInt(yearString.slice(0, 4), 10);

  // Get the current year
  const currentYear = new Date().getFullYear();

  // Calculate the age by subtracting the birth year from the current year
  const age = currentYear - birthYear;

  return age;
}

function deleateMember(id) {
  Swal.fire({
    title: '회원을 삭제하시겠습니까?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '삭제',
    cancelButtonText: '취소'

  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '삭제되었습니다.',
        '성공'
      )
      await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/members/${id}`, {
        method: "delete",
        credentials: 'include',
      });
      store.userApi();
    }
  })
}

// const memberSlice = computed(()=>{
//   return store.memberList.slice((store.page - 1) * store.perPage, store.page * store.perPage)
// })

</script>