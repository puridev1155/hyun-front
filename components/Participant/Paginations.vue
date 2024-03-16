<template>
  <nav class="flex items-center justify-center border-t border-gray-200 px-4 sm:px-0">
    <div class=" -mt-px flex">
      <!-- 왼쪽 화살표 -->
      <a @click="doubleBackPage" :disabled="store.page == 1 ? true : false" class="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-double-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8.354 1.646a.5.5 0 0 1 0 .708L2.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          <path fill-rule="evenodd" d="M12.354 1.646a.5.5 0 0 1 0 .708L6.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>
      </a>
      <a @click="backPage" :disabled="store.page == 1 ? true : false" class="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
        </svg>  
      </a>
      <!-- 페이지 숫자-->
      <ul>
        <li class="float-left"  v-for="items in pageList" :key="items" style="cursor: pointer">
          <a @click="goToPage(items)" :class="store.page == items ? current : different">{{ items }}</a>
        </li>
      </ul>
      <!-- 오른쪽 화살표 -->
      <a @click="nextPage" :disabled="store.page == store.totalPageCount ? true : false" class="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </a>
      <a @click="doubleNextPage" :disabled="store.page == store.totalPageCount ? true : false" class="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-chevron-double-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"/>
          <path fill-rule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"/>
        </svg>
      </a>
    </div>
  </nav>
</template>
<script setup>

import { ref, computed } from 'vue'
import { participantsInfo} from '../../stores/index'
import { useRoute, useRouter } from 'vue-router'

    const route = useRoute();
    const router = useRouter();

const store = participantsInfo();
const current = ref("inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600")
const different = ref("inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700")


// 페이지 그룹 수
const pageDisplayCount = ref(10);

// 현재 페이지 그룹
const currentPageGroup = computed(() => Math.ceil(store.page / pageDisplayCount.value));

  const nextPage = () =>  {
    if (store.page < store.totalPageCount) {
    store.page++
    // router.push({ path: `/admin/user/${store.page},${store.search},${store.startdate},${store.enddate}`, query: { page: store.page, q: store.search, startdate: store.startdate, enddate: store.enddate } })
    router.push({ query: { page: store.page, q: store.search, startdate: store.startdate, enddate: store.enddate } })
    }
    
   
  };
  const backPage = () => {
  if (store.page > 1) {
    store.page--
    router.push({ query: { page: store.page, q: store.search, startdate: store.startdate, enddate: store.enddate } })
    //  router.push({ path: `/admin/user`, query: { page:store.page, q:store.search} })

  }
  console.log("뒤로감")
};
  const doubleNextPage = () => {
  if (store.page < store.totalPageCount) {
      store.page = lastPageNumber.value

      router.push({ query: { page: store.page, q: store.search, startdate: store.startdate, enddate: store.enddate } })
    }
    console.log("앞으로감")
  };
  const doubleBackPage = () => {
    if (store.page > 1) {
      store.page = 1
      router.push({ query: { page: store.page, q: store.search, startdate: store.startdate, enddate: store.enddate } })
      //  router.push({ path: `/admin/user`, query: { page:store.page, q:store.search} })

    }
  };
  

  const goToPage = (numPage) => {
    store.page = numPage
    router.push({ query: { page: store.page, q: store.search, startdate: store.startdate, enddate: store.enddate } })

  };

  // 마지막 페이지 번호
    const lastPageNumber = computed(() => {
      const lastNumber = currentPageGroup.value * pageDisplayCount.value;
      if (lastNumber > store.totalPageCount) return store.totalPageCount;
      return lastNumber;
    });
    
  // 첫번째 페이지 번호
    const firstPageNumber = computed(() => {
     // 끝 번호가 26,27 이렇게 끝날 경우 페이지를 [26,27] 이렇게 보여줘야 하기에 존재하는 로직
      if (lastPageNumber.value == store.totalPageCount) {
        const multipleOfPageDisplayCount = lastPageNumber.value % pageDisplayCount.value === 0;
        return multipleOfPageDisplayCount
          ? lastPageNumber.value - pageDisplayCount.value + 1
          : lastPageNumber.value - (lastPageNumber.value % pageDisplayCount.value) + 1;
      }
      return lastPageNumber.value - (pageDisplayCount.value - 1);
  
    });
    
   // 페이지 리스트 (pageDisplayCount가 5일 경우 [1~5], [6~10]...)
    const pageList = computed(() => {
      const list = [];
      for (let i = firstPageNumber.value; i <= lastPageNumber.value; i++) {
        list.push(i);
      }
      return list;
    });





</script>
