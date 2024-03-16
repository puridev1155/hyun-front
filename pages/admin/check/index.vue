<template>
  <div>
    <NuxtLayout name="adminlayout">
      <div class="flex flex-1 flex-col md:pl-64">
        <main class="flex-1">
          <div class="pt-6">

            <div class="mx-auto px-4 lg:px-10">
              <!-- 검색 -->
              <div class="sm:flex sm:items-center">
                <div class="sm:flex-auto">
                  <h1 class="text-xl font-semibold text-gray-900">당원확인 목록</h1>
                  <p class="mt-2 text-sm text-gray-700">이미 가입하신 당원이 전화인증을 한 리스트입니다.</p>
                </div>

              </div>
              <CheckSearch />
              <div class="px-4" v-if="Loding">
                <AdminLoding />
              </div>
              <template v-else>
                <div v-if="hasPost()">
                  <div class="px-4">
                    <!-- pc용 -->
                    <div class="flex items-center hidden md:flex ">
                      <div class="w-[110px]">전체: {{ store.total }}명</div>
                      <div class="flex justify-between w-full">
                        <div>
                          <button class="p-3 rounded-sm text-white font-semibold bg-blue-600 mx-4"
                            @click="excelExport">전체excel</button>
                          <button class="p-3 rounded-sm text-white font-semibold bg-blue-600"
                            @click="selectExport">선택excel</button>
                        </div>
                        <button class="py-3 px-6 rounded-sm text-white font-semibold bg-red-500">삭제</button>
                      </div>
                    </div>

                    <!-- 모바일 -->
                    <div class="flex items-center flex flex-col md:hidden ">
                      <div class="w-[110px]">전체: {{ store.total }}명</div>
                      <div class="flex justify-between w-full mt-4">
                        <button class="p-3 rounded-sm text-white font-semibold bg-blue-600 "
                          @click="excelExport">전체excel</button>
                        <button class="p-3 rounded-sm text-white font-semibold bg-blue-600"
                          @click="selectExport">선택excel</button>
                        <button class="py-3 px-6 rounded-sm text-white font-semibold bg-red-500">삭제</button>
                      </div>
                    </div>
                    <!-- table -->
                    <CheckUserTable />
                    <!--table End -->
                  </div>
                  <!-- /End replace -->
                  <div class=" mt-4">
                    <CheckPaginations />
                  </div>
                </div>
                <div v-else>
                  <div>
                    <!-- table -->
                    <AdminEmpty />
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
import { checkInfo } from '../../../stores';
import CheckPaginations from '@/components/Check/Paginations.vue';
import CheckUserTable from '../../../components/Check/Usertable.vue';
import CheckSearch from '@/components/Check/Search.vue';
// const user = useAuth();
const route = useRoute();
const router = useRouter();
const store = checkInfo();
const Loding = ref(true);
const hasPost = () => {
  return store.checkList.length > 0 ? true : false;
}

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
    await store.checkApi()
  }
  catch (e) {
    console.log(e)
  }
  finally {
    Loding.value = false
  }
})

const modalCreate = () => {
  router.push('/')
}

// 전체엑셀 다운로드
async function excelExport() {
  try {
    const response = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/cert/export`, {
      method: "get",
      credentials: 'include',
    });
    downloadBlob(response, '당원 확인 리스트')
    return response
  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
}

// 선택엑셀 다운로드
async function selectExport() {
  try {
    const response = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/cert/export`, {
      method: "get",
      params: {
        Searches: {
          keyword: store.exSearch,
          dates: store.exStartdate == "" || store.exStartdate == null && store.exEnddate == "" || store.exEnddate == null ? [] : [store.exStartdate, store.exEnddate]
        }
      },
      credentials: 'include',
    });
    console.log(response)
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
    await store.checkApi()
  }
  catch (e) {
    console.log(e)
  }
  finally {
    store.Loding = false
  }
})


</script>
