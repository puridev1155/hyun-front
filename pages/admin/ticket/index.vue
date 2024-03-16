<template>
  <div>
    <NuxtLayout name="adminlayout">
      <div class="flex flex-1 flex-col md:pl-64">
        <main class="flex-1">
            <!-- Page Direction Start -->
              <Navtop :navs="navs" />
            <!-- Page Direction End -->
          <div class="">
            <div class="mx-auto px-4 lg:px-10">
                <!-- Search Start -->
                  <TicketSearch />
                   <!-- Button Add Start -->
                   <div class="mt-3 mb-5">
                          <nuxt-link v-for="(row,index) in categoryButton" :key="index" :to="row.url"
                                      class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                    {{ row.name }}
                          </nuxt-link> 
                          <nuxt-link to="/admin/ticket/create"
                            class="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                            추가하기
                          </nuxt-link>
                        </div>
                        <!-- Button Add End -->
                <!-- Search End -->
              <div class="px-4" v-if="Loding">
                <Loading :size="24" />
              </div>
              <template v-else>          
                <div v-if="hasPost()">
                  <div>              
                    <!-- table -->
                      <TicketTables />
                    <!--table End -->
                  </div>
                  <div class=" mt-4">
                    <!-- Pagination Start -->
                      <TicketPaginations />
                    <!-- Pagination End -->
                  </div>
                </div>
                <div v-else>
                  <div>
                    <!-- table Start -->
                      <Empty />
                    <!--table End -->
                  </div>
                </div>
              </template>
            </div>
          </div>
        </main>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
definePageMeta({ middleware: ["auth"] });
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { postsInfo } from '@/stores/index';

const route = useRoute();
const router = useRouter();
const store = postsInfo();
const Loding = ref(true)
const hasPost = () => { return store.list.length > 0 ? true : false; }
const categoryId = 2; 

const categoryList = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/statistics/stats-event`, {
      method: "get",
      credentials: 'include',
    });



const categoryButton = [
{ name: '전체',  url: '/admin/ticket',},
{ name: '홍보',  url: '/admin/ticket?page=1&board=event', },
{ name: '한국',  url: '/admin/ticket?page=1&langId=1', },
{ name: '일본',  url: '/admin/ticket?page=1&langId=2', },
{ name: '인도네시아',  url: '/admin/ticket?page=1&langId=3',  },
{ name: '미국',  url: '/admin/ticket?page=1&langId=4',  },
]

// Top Nav
const navs = [
  { name: 'Ticket', href: '#', current: false },
  { name: 'Ticket Table', href: '#', current: true },
]

onMounted(async () => {
  Loding.value = true
  try {
    if (route.query.page == undefined) {
      store.page = 1
    } else {
      store.page = route.query.page
    }
    store.search = route.query.q
    store.startdate = route.query.startdate
    store.enddate = route.query.enddate
    store.exSearch = route.query.q
    store.exStartdate = route.query.startdate
    store.exEnddate = route.query.enddate
    store.langId = route.query.langId
    store.board = route.query.board
    await store.postApi(categoryId, store.langId, store.board)
  }
  catch (e) {
    console.log(e)
  }
  finally {
    Loding.value = false
  }
})


// 전체엑셀 다운로드
async function excelExport() {
  try {
    const response = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/members/export`, {
      method: "get",
      credentials: 'include',
    });
    downloadBlob(response, '당원 리스트')
    return response
  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
}

// 선택엑셀 다운로드
async function selectExport() {
  try {
    const response = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/members/export`, {
      method: "get",
      params: {
        Searches: {
          keyword: store.exSearch,
          dates: store.exStartdate == "" || store.exStartdate == null && store.exEnddate == "" || store.exEnddate == null ? [] : [store.exStartdate, store.exEnddate]
        }
      },
      credentials: 'include',
    });

    downloadBlob(response, '당원 리스트')
    return response
  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
}


function downloadBlob(blob, fileName) {
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}

watch(() => route.query, async () => {
  store.Loding = true
  try {
    store.page = route.query.page
    store.search = route.query.q
    store.startdate = route.query.startdate
    store.enddate = route.query.enddate
    store.exSearch = route.query.q
    store.exStartdate = route.query.startdate
    store.exEnddate = route.query.enddate
    store.langId = route.query.langId
    store.board = route.query.board
    await store.postApi(categoryId, store.langId, store.board)
    hasPost()
  }
  catch (e) {
    console.log(e)
  }
  finally {
    store.Loding = false
  }
})
</script>
