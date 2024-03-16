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
                  <VoterSearch />

                <!-- Search End -->
              <div class="px-4" v-if="loading">
                <Loading :size="24" />
              </div>
              <template v-else>          
                <div v-if="hasPost()">
                  <div>              
                    <!-- table -->
                      <VoterTables :voteId = "24" />
                    <!--table End -->
                  </div>
                  <div class=" mt-4">
                    <!-- Pagination Start -->
                      <VoterPaginations />
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
import { votersInfo } from '@/stores/index';

const props = defineProps({
  voteId: {
    type: Number,
    required: true,
  },
})

console.log(props.voteId);


const route = useRoute();
const router = useRouter();
const store = votersInfo();
const loading = ref(true)
const hasPost = () => { return store.list.length > 0 ? true : false; }
const params = ref({});
const voteId = route.params.id;

// Top Nav
const navs = [
  { name: 'Voter', href: '#', current: false },
  { name: 'Voter Table', href: '#', current: true },
  
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
    await store.postApi(null, null, `/api/admin/voter/${voteId}`, 'get')
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
    await store.postApi(null, params.value, `/api/admin/voter/${voteId}`, 'get')
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
