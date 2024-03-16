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
                  <h1 class="text-xl font-semibold text-gray-900">지역 관리</h1>
                  <p class="mt-2 text-sm text-gray-700">지역관리 리스트입니다.</p>
                </div>
                <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                   <button @click="reset"
                      class="mr-5 inline-flex items-center justify-center border border-transparent bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-offset-2 sm:w-auto">
                      지역 초기화
                    </button>
                  <button @click="modalCreate"
                    class="inline-flex items-center justify-center border border-transparent bg-blue-700 px-4 py-2 text-sm font-medium text-white shadow-sm focus:ring-offset-2 sm:w-auto">
                    지역 등록
                  </button>
                </div>
              </div>
              <DistrictsSearch @district-submit="child" />
              <div class="px-4" v-if="Loding">
                <AdminLoding />
              </div>
              <template v-else>
                
                  <div class="px-4">
                    <!-- pc용 -->
                    <div class="flex items-center hidden md:flex ">
                      <div class="w-[110px]">전체: {{ store.total }}개</div>
                      <!-- <div class="flex justify-between w-full">
                        <div>
                          <button class="p-3 rounded-sm text-white font-semibold bg-blue-600 mx-4"
                            @click="excelExport">전체excel</button>
                          <button class="p-3 rounded-sm text-white font-semibold bg-blue-600"
                            @click="selectExport">선택excel</button>
                        </div>
                        <button class="py-3 px-6 rounded-sm text-white font-semibold bg-red-500">삭제</button>
                      </div> -->
                    </div>

                    <!-- 모바일 -->
                    <div class="flex items-center flex flex-col md:hidden ">
                      <div class="w-[110px]">전체: {{ store.total }}개</div>
                      <!-- <div class="flex justify-between w-full mt-4">

                        <button class="p-3 rounded-sm text-white font-semibold bg-blue-600 "
                          @click="excelExport">전체excel</button>
                        <button class="p-3 rounded-sm text-white font-semibold bg-blue-600"
                          @click="selectExport">선택excel</button>
                        <button class="py-3 px-6 rounded-sm text-white font-semibold bg-red-500">삭제</button>
                      </div> -->
                    </div>
                    <!-- table -->
                    <DistrictsUserTable />
                    <!--table End -->
                  </div>
                  <!-- /End replace -->
                  <div class=" mt-4">
                    <DistrictsPaginations />
                  </div> 
              </template>
            </div>
          </div>
          <DistrictsCreate v-if="store.createOpen"></DistrictsCreate>
        </main>
      </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
definePageMeta({ middleware: ["auth"] });
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { districtsInfo, districts } from '@/stores/index'
import DistrictsPaginations from '@/components/Districts/Paginations.vue';
import DistrictsUserTable from '../../../components/Districts/Usertable.vue';
import DistrictsSearch from '@/components/Districts/Search.vue';
import DistrictsCreate from '@/components/Districts/DistrictCreate.vue';
// const user = useAuth();
const route = useRoute();
const router = useRouter();
const store = districtsInfo();
const storeDis = districts();
const Loding = ref(true);
const hasPost = () => {
  return store.districtsList.length > 0 ? true : false;
}

onMounted(async () => {
  Loding.value = true
  try {
    if (route.query.page == undefined) {
      store.page = 1
    } else {
      store.page = route.query.page
    }
    store.state = route.query.state
    store.election = route.query.election
    store.city = route.query.city
    store.district = route.query.district
    await store.districtsApi()
  }
  catch (e) {
    console.log(e)
  }
  finally {
    Loding.value = false
  }
})

const modalCreate = () => {
  store.createOpen = true;
}

function reset() {
  storeDis.stateData = '선택'
  storeDis.electionData = '선택'
  storeDis.cityData = '선택'
  storeDis.districtIdData = '선택'
  router.push({ query: { page: 1 } })
}


// 전체엑셀 다운로드
async function excelExport() {
  try {
    const response = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/caller/export`, {
      method: "get",
      credentials: 'include',
    });
    downloadBlob(response, '전화가입 리스트')
    return response
  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
}

// 선택엑셀 다운로드
async function selectExport() {
  try {
    const response = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/caller/export`, {
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

const child = (data) => {
  console.log(data)
  store.page = 1
  store.state = data.district.state
  store.election = data.district.election
  store.city = data.district.city
  store.district = data.district.id
  // districtData.value = data.district
  router.push({ query: { page: store.page, state: store.state, election: store.election, city:store.city, district: store.district } })
}



watch(() => route.query, async () => {
  store.Loding = true
  try {
    store.page = route.query.page
    store.state = route.query.state
    store.election = route.query.election
    store.city = route.query.city
    store.district = route.query.district
    await store.districtsApi()
  }
  catch (e) {
    console.log(e)
  }
  finally {
    store.Loding = false
  }
})


</script>
