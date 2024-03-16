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
                  <AdminSearch />
                <!-- Search End -->
              <div class="px-4" v-if="Loding">
                <Loading :size="24" />
              </div>
              <template v-else>          
                <div v-if="hasPost()">
                  <div>              
                    <!-- table -->
                      <AdminUsertable />
                    <!--table End -->
                  </div>
                  <div class=" mt-4">
                    <!-- Pagination Start -->
                      <AdminPaginations />
                    <!-- Pagination End -->
                  </div>
                </div>
                <div v-else>
                  <div>
                    <!-- table Start -->
                      <AdminEmpty />
                    <!--table End -->
                  </div>
                </div>
                  <!-- Member Create Start -->
                    <memberCreate v-if="store.createOpen"></memberCreate>
                  <!-- Member Create End -->
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
import { usersInfo } from '@/stores/index';
import memberCreate from '@/components/Admin/MemberCreate.vue';
import memberNav from '~/components/Admin/memberNav.vue';

const route = useRoute();
const router = useRouter();
const store = usersInfo();
const Loding = ref(true)
const hasPost = () => { return store.memberList.length > 0 ? true : false; }

// Top Nav
const navs = [
  { name: 'User', href: '#', current: false },
  { name: 'User Table', href: '#', current: true },
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
    await store.userApi()
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
    await store.userApi()
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
