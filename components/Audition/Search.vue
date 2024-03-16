<template>
  <div>

    <div class="grid mx-2">
      <div class="flex flex-wrap -mx-3">
        <div class="w-full md:w-1/4 px-2 mt-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" for="grid-state">
            Start Date
          </label>
          <div class="relative">
            <input type="date" v-model="startdate" @input="change1"
              class="block appearance-none w-full  border border-gray-200 text-gray-700 bg-white py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state" placeholder="시작날짜 선택" />
          </div>
        </div>
        <div class="w-full md:w-1/4 px-2 mt-6 md:mb-0">
          <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" for="grid-state">
            End Date
          </label>
          <div class="relative">
            <input type="date" v-model="enddate" @input="change2"
              class="block appearance-none w-full  border border-gray-200 text-gray-700 bg-white py-3 px-4 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-state" placeholder="종료날짜 선택" />
          </div>
        </div>
        <div class="w-full md:w-2/4 px-2 mt-10">
          <div class="flex justify-items-end border-b border-gray-300 py-2  mb-4">
            <input v-model="search" @input="change" @keyup.enter="dataSearch"
              class="appearance-none bg-transparent border-none w-full text-gray-700  py-1 px-2 leading-tight focus:outline-none"
              type="search" aria-label="Full name" placeholder="Title">    
            <button type="button" @click="dataSearch"
              class="flex-shrink-0 from-purple-800 to-blue-800 bg-gradient-to-r px-4 py-2 text-sm font-medium text-white shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                stroke="currentColor" class="inline-block mb-1 w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              SEARCH
            </button>
            <button type="button" @click="refresh"
              class="ml-3 flex-shrink-0 bg-blue-800 px-3 py-2 text-sm font-medium text-white shadow-sm">
              <RefreshIcon class="w-4 h-4" />
            </button>
            
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import {ref} from 'vue'
import { postsInfo} from '../../stores/index'
import { RefreshIcon } from '@heroicons/vue/outline'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();
const store = postsInfo();
const startdate = ref('');
const enddate = ref('');
const search = ref('');
const langId = ref('');

onMounted(()=> {
  search.value = route.query.q
  startdate.value = route.query.startdate
  enddate.value = route.query.enddate
  langId.value = route.query.langId
})

watch(() => route.query,  () => {

  try {
    search.value = route.query.q
    startdate.value = route.query.startdate
    enddate.value = route.query.enddate
    langId.value = route.query.langId
  }
  catch (e) {

  }
})

const refresh = () => { //reset
  router.push({ path: `/admin/audition` })
}

async function dataSearch() {
  if(startdate.value == undefined && enddate.value != undefined) {
    alert('시작일을 선택해주세요.')
    return;
  } else if (startdate.value != undefined && enddate.value == undefined) {
    alert('종료일을 선택해세요.')
    return;
  } else if (enddate.value < startdate.value) {
    alert('종료일이 시작일보다 빠릅니다. 다시 선택해주세요.')
    return;
  } else {
    store.page = 1
    store.search = search.value
    store.startdate = startdate.value
    store.enddate = enddate.value
    store.langId = langId.value
    router.push({ query: { page: store.page, q: store.search, startdate: store.startdate, enddate: store.enddate, langId: store.langId } })
  }
}

function change(e) {
  store.exSearch = e.target.value
}
function change1(e) {
  store.exStartdate = e.target.value
}
function change2(e) {
  store.exEnddate = e.target.value
}

</script>