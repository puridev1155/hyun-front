<template>
    <div class="my-4text-sm ">
        <select class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 w-full focus:border-blue-500 block  p-2.5" name="" id="" v-model="stateData" @change="changeState">
          <option value="" disabled>시/도</option>
          <option :value="state" v-for="(state, index) in states" :key="index">{{ state }}</option>
        </select>
    </div>

    <div class="my-4">
        <select class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 w-full focus:border-blue-500 block p-2.5" name="" id="" v-model="cityData" @change="changeCity" :disabled="stateData == ''">
          <option value="" disabled>시/군/구</option>
          <option :value="city" v-for="(city, index) in cities" :key="index">{{ city }}</option>
        </select>
    </div>

    <div class="">
        <select class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 w-full focus:border-blue-500 block p-2.5" name="" id="" v-model="districtIdData" @change="change" :disabled="cityData == ''">
          <option value="" disabled>읍/면/동</option>
          <option :value="district.id" v-for="(district, index) in districts" :key="index">{{ district }}</option>
        </select>
  </div>


</template>
<script setup>
import { state } from '~~/stores';


const stateData = ref('');
const cityData = ref('')
const districtIdData = ref('')

const states = ref([]);
const cities = ref([]);
const districts = ref([]);

onMounted(()=>{
  stateApi()
})
watch(() => stateData.value, async () => {
  cityData.value = ""
  cities.value = []
  districtIdData.value = ""
  districts.value = []
 await cityApi()
})
watch(() => cityData.value,async() => {
  districtIdData.value = ""
  districts.value = []
  await districtApi()
})

async function stateApi() {
  try {
    const response = await $fetcher(useRuntimeConfig().public.backendUrl + "/api/auth/register", {
      method: "get",
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      credentials: 'include',
    });
    for(let i = 0; i < response.data.states.length; i++){
      states.value.push(response.data.states[i])
    }

  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
}

async function cityApi() {
  try {
    const response = await $fetcher(useRuntimeConfig().public.backendUrl + "/api/cities", {
      method: "get",
      params:{
        state: stateData.value
      },
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      credentials: 'include',
    });
    for (let i = 0; i < response.length; i++) {
      cities.value.push(response[i])
    }

  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
}

async function districtApi() {
  try {
    const response = await $fetcher(useRuntimeConfig().public.backendUrl + "/api/districts", {
      method: "get",
      params: {
        state: stateData.value,
        city: cityData.value
      },
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json',
      },
      credentials: 'include',
    });
    for (let i = 0; i < response.length; i++) {
      districts.value.push(response[i].district)
    }

  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
}
</script>
