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
                  <MyproductSearch />
                  <!-- Button Add Start -->
                        <div class="mt-3 mb-5">
                          <nuxt-link v-for="(row,index) in categoryButton" :key="index" :to="row.url"
                                      class="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                    {{ row.name }}
                          </nuxt-link> 

                          <nuxt-link v-for="(row,index) in countryButton" :key="index" :to="row.url"
                                      class="text-white bg-gradient-to-br from-purple-600 to-red-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                                    {{ row.name }} 
                          </nuxt-link> 
                          <nuxt-link to="/admin/myproduct/create"
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
                      <MyproductTables />
                    <!--table End -->
                  </div>
                  <div class=" mt-4">
                    <!-- Pagination Start -->
                      <MyproductPaginations />
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
import { myproductsInfo } from '@/stores/index';

const route = useRoute();
const router = useRouter();
const store = myproductsInfo();
const Loding = ref(true)
const hasPost = () => { return store.list.length > 0 ? true : false; }
const params = ref({});


console.log(store.list, 'product')
const categoryList = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/statistics/stats`, {
      method: "get",
      credentials: 'include',
    });
const statList = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/statistics/productstatistics`, {
      method: "get",
      credentials: 'include',
    });

    console.log(statList);

// Top Nav
const navs = [
  { name: 'Product', href: '#', current: false },
  { name: 'Product Table', href: '#', current: true },
]

const categoryButton = [
 { name: '전체', url: '/admin/myproduct' },
{ name: '판매중', url: '/admin/myproduct?page=1&in_stock=1' },
{ name: '완판', url: '/admin/myproduct?page=1&in_stock=0' },
  ]


const countryButton = [
{ name: statList.totalProductByCountry[0].country_name, url: `/admin/myproduct?page=1&lang_id=${statList.totalProductByCountry[0].lang_id}` },
{ name: statList.totalProductByCountry[1].country_name, url: `/admin/myproduct?page=1&lang_id=${statList.totalProductByCountry[1].lang_id}` },
{ name: statList.totalProductByCountry[2].country_name, url: `/admin/myproduct?page=1&lang_id=${statList.totalProductByCountry[3].lang_id}` },
{ name: statList.totalProductByCountry[3].country_name, url: `/admin/myproduct?page=1&lang_id=${statList.totalProductByCountry[2].lang_id}` },
]

onMounted(async () => {
  Loding.value = true
  try {
    if (route.query.page == undefined) {
      store.page = 1
    } else {
      store.page = route.query.page
    }
    store.category_id = route.query.category_id,
    store.in_stock = route.query.in_stock,
    store.lang_id = route.query.lang_id,
    store.search = route.query.q
    store.startdate = route.query.startdate
    store.enddate = route.query.enddate
    store.exSearch = route.query.q
    store.exStartdate = route.query.startdate
    store.exEnddate = route.query.enddate
    await store.postApi(null, params.value, '/api/admin/myproducts', 'get')
  }
  catch (e) {
    console.log(e)
  }
  finally {
    Loding.value = false
  }
})


watch(() => route.query, async () => {
  store.Loding = true
  try {
    store.category_id = route.query.category_id,
    store.in_stock = route.query.in_stock,
    store.lang_id = route.query.lang_id,
    store.page = route.query.page
    store.search = route.query.q
    store.startdate = route.query.startdate
    store.enddate = route.query.enddate
    store.exSearch = route.query.q
    store.exStartdate = route.query.startdate
    store.exEnddate = route.query.enddate
    await store.postApi(null, params.value, '/api/admin/myproducts', 'get')
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
