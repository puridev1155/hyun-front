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
                  <ParticipantSearch />
                  <!-- Button Add Start -->
                  <div class="mt-3 mb-5">
                          <nuxt-link v-for="(row,index) in categoryButton" :key="index" :to="row.url"
                                      class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                    {{ row.name }} {{ row.count }}
                          </nuxt-link> 
                        </div>
                        <!-- Button Add End -->
                <!-- Search End -->
              <div class="px-4" v-if="loading">
                <Loading :size="24" />
              </div>
              <template v-else>          
                <div v-if="hasPost()">
                  <div>              
                    <!-- table -->
                      <ParticipantTables />
                    <!--table End -->
                  </div>
                  <div class=" mt-4">
                    <!-- Pagination Start -->
                      <ParticipantPaginations />
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
import { participantsInfo } from '@/stores/index';

const route = useRoute();
const router = useRouter();
const store = participantsInfo();
const loading = ref(true)
const hasPost = () => { return store.list.length > 0 ? true : false; }
const params = ref({});

// Top Nav
const navs = [
  { name: 'Participant', href: '#', current: false },
  { name: 'Participant Table', href: '#', current: true },
  
]
const categoryList = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/statistics/stats`, {
      method: "get",
      credentials: 'include',
    });
const statList = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/statistics/participantstats`, {
      method: "get",
      credentials: 'include',
    });


const categoryButton = [
{ name: '전체', count: statList.totalParticipant, url: '/admin/participant', unit: 'users' },
{ name: '오디션', count: statList.totalParticipantByCategory[0] ? statList.totalParticipantByCategory[0].participant_count : 0, url: '/admin/participant?category_id=1',  unit: 'users' },
{ name: '티켓', count: statList.totalParticipantByCategory[1] ? statList.totalParticipantByCategory[1].participant_count : 0, url: '/admin/participant?category_id=3',  unit: 'users' }
]

onMounted(async () => {
  loading.value = true
  try {
    if (route.query.page == undefined) {
      store.page = 1
    } else {
      store.page = route.query.page
    }
    store.category_id = route.query.category_id,
    store.status = route.query.status,
    store.search = route.query.q
    store.startdate = route.query.startdate
    store.enddate = route.query.enddate
    store.exSearch = route.query.q
    store.exStartdate = route.query.startdate
    store.exEnddate = route.query.enddate
    await store.postApi(null, null, '/api/admin/participants', 'get')
  }
  catch (e) {
    console.log(e)
  }
  finally {
    loading.value = false
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

function downloadBlob(blob, fileName) {
  var url = window.URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
}

watch(() => route.query, async () => {
  store.loading = true
  try {
    store.category_id = route.query.category_id,
    store.status = route.query.status,
    store.page = route.query.page
    store.search = route.query.q
    store.startdate = route.query.startdate
    store.enddate = route.query.enddate
    store.exSearch = route.query.q
    store.exStartdate = route.query.startdate
    store.exEnddate = route.query.enddate
    await store.postApi(null, params.value, '/api/admin/participants', 'get')
    hasPost()
  }
  catch (e) {
    console.log(e)
  }
  finally {
    store.loading = false
  }
})
</script>
