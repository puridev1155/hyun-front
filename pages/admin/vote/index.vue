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
                  <VoteSearch />
                <!-- Search End -->
              <div class="px-4" v-if="Loding">
                <Loading :size="24" />
              </div>
              <template v-else>          
                <div v-if="hasPost()">
                  <div>              
                    <!-- table -->
                      <VoteTables />
                    <!--table End -->
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
import { votesInfo } from '@/stores/index';

const route = useRoute();
const store = votesInfo();
const Loding = ref(true)
const hasPost = () => { return store.list.length > 0 ? true : false; }

// Top Nav
const navs = [
  { name: 'Vote', href: '#', current: false },
  { name: 'Vote Table', href: '#', current: true },
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
    await store.postApi()
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
    store.page = route.query.page
    store.search = route.query.q
    store.startdate = route.query.startdate
    store.enddate = route.query.enddate
    store.exSearch = route.query.q
    store.exStartdate = route.query.startdate
    store.exEnddate = route.query.enddate
    await store.postApi()
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
