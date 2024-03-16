<template>
  <TransitionRoot as="template" :show="store.editOpen">
    <Dialog as="div" class="relative z-50">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed  inset-0 z-10 overflow-y-auto">
        <div class="flex min-h-full  items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              class="relative transform  overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full sm:w-1/2 ">
              <div class="bg-whit md:h-[300px] px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div class="sm:flex  sm:items-start">

                  <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <DialogTitle as="h3" class="text-base font-semibold leading-6 text-gray-900">지역 수정</DialogTitle>
                    <div class="mt-2">

                      <div class="sm:flex">
                        <Listbox as="div" v-model="storeDistricts.stateData" class="w-1/3 px-2">
                          <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">시도</ListboxLabel>
                          <div class="relative mt-2">
                            <ListboxButton
                              class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                              <span class="flex items-center">
                                <span class="ml-3 block truncate">{{ storeDistricts.stateData }}</span>
                              </span>
                              <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                                <!-- <ChevronDownIcon size="5" class="h-5 w-5 text-gray-400" aria-hidden="true" /> -->
                              </span>
                            </ListboxButton>

                            <transition leave-active-class="transition ease-in duration-100"
                              leave-from-class="opacity-100" leave-to-class="opacity-0">
                              <ListboxOptions
                                class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                <ListboxOption as="template" v-for="state in storeDistricts.states" :key="state"
                                  :value="state" v-slot="{ active }">
                                  <li
                                    :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                    <div class="flex items-center">
                                      <!-- <img :src="person.avatar" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" /> -->
                                      <span
                                        :class="[storeDistricts.stateData ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">{{
                                          state }}</span>
                                    </div>

                                    <span v-if="storeDistricts.stateData"
                                      :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">

                                    </span>
                                  </li>
                                </ListboxOption>
                              </ListboxOptions>
                            </transition>
                          </div>
                        </Listbox>

                        <Listbox as="div" v-model="storeDistricts.electionData" class="w-1/3 px-2">
                            <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">선거구</ListboxLabel>
                            <div class="relative mt-2">
                              <ListboxButton
                                class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                                <span class="flex items-center">

                                  <span class="ml-3 block truncate">{{ storeDistricts.electionData }}</span>
                                </span>
                                <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">

                                </span>
                              </ListboxButton>

                              <transition leave-active-class="transition ease-in duration-100"
                                leave-from-class="opacity-100" leave-to-class="opacity-0">
                                <ListboxOptions
                                  class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                  <ListboxOption as="template" v-for="city in storeDistricts.elections" :key="city"
                                    :value="city" v-slot="{ active }">
                                    <li
                                      :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                      <div class="flex items-center">
                                        <!-- <img :src="city.avatar" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" /> -->
                                        <span
                                          :class="[storeDistricts.electionData ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">{{
                                            city }}</span>
                                      </div>

                                      <span v-if="storeDistricts.electionData"
                                        :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">

                                      </span>
                                    </li>
                                  </ListboxOption>
                                </ListboxOptions>
                              </transition>
                            </div>
                          </Listbox>


                        <Listbox as="div" v-model="storeDistricts.cityData" class="w-1/3 px-2">
                          <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">시군구</ListboxLabel>
                          <div class="relative mt-2">
                            <ListboxButton
                              class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                              <span class="flex items-center">

                                <span class="ml-3 block truncate">{{ storeDistricts.cityData }}</span>
                              </span>
                              <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">

                              </span>
                            </ListboxButton>

                            <transition leave-active-class="transition ease-in duration-100"
                              leave-from-class="opacity-100" leave-to-class="opacity-0">
                              <ListboxOptions
                                class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                <ListboxOption as="template" v-for="city in storeDistricts.cities" :key="city"
                                  :value="city" v-slot="{ active }">
                                  <li
                                    :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                                    <div class="flex items-center">
                                      <!-- <img :src="city.avatar" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" /> -->
                                      <span
                                        :class="[storeDistricts.cityData ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">{{
                                          city }}</span>
                                    </div>

                                    <span v-if="storeDistricts.cityData"
                                      :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">

                                    </span>
                                  </li>
                                </ListboxOption>
                              </ListboxOptions>
                            </transition>
                          </div>
                        </Listbox>

                      </div>

                      <div class="flex mt-2">

                        <div class=" relative px-2 w-full sm:flex sm:justify-between  ">
                            <div>
                              <label for="name-with-label" class="text-gray-700">
                                읍면동
                              </label>
                              <input type="text" id="name-with-label" v-model="district"
                                class=" rounded-lg  flex-1 appearance-none border border-gray-200 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                name="email" placeholder="읍면동 이름" />
                            </div>
                             <div>
                                <label for="name-with-label" class="text-gray-700">
                                  당원수
                                </label>
                                <input type="text" id="name-with-label" v-model="count2" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                                  class=" rounded-lg  flex-1 appearance-none border border-gray-200 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                  name="email" placeholder="당원수를 입력하세요." />
                              </div>
                               <div>
                                <label for="name-with-label" class="text-gray-700">
                                  동네 인원수
                                </label>
                                <input type="text" id="name-with-label" v-model="population" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                                  class=" rounded-lg  flex-1 appearance-none border border-gray-200 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                                  name="email" placeholder="동네 인원수를 입력하세요." />
                              </div>
                          </div>
                      </div>
                      <div class="hidden sm:flex mt-10 justify-center">
                        읍면동을 입력해주세요.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 justify-center">
                <button type="button"
                  class="inline-flex w-full justify-center rounded-md bg-white px-10 py-3.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50  sm:ml-3 sm:w-auto"
                  @click="store.editOpen = false">취소</button>
                <button type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-blue-600 px-10 py-3.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-500 sm:mt-0 sm:w-auto"
                  @click="editBtn">수정</button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup>
import {
  Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot, Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions
} from '@headlessui/vue'
import { districtsInfo, districtsEdit } from '@/stores/index';
import Swal from 'sweetalert2'
const storeDistricts = districtsEdit();
const store = districtsInfo();
const count = ref(1); // 수정할때 선택방지
const count2 = ref(''); // 당원수
const population = ref('') // 동네 인원수
const district = ref('');
const state = ref('')
const election = ref('')
const city = ref('')

onMounted(async () => {
  await storeDistricts.getState();
  await districtsShow(props.postId);
  storeDistricts.stateData = state.value
  storeDistricts.electionData = election.value
  storeDistricts.cityData = city.value

})
// props 데이터 받아오기  (postId)
const props = defineProps({
  postId: {
    type: Number,
    required: true,
  },
})

watch(() => storeDistricts.stateData, async () => {
  if (count.value == 1) {
    await storeDistricts.getCity();
    count.value++;
    return;
  }
  storeDistricts.cityData = '선택'
  storeDistricts.cities = []
  storeDistricts.electionData = '선택'
  storeDistricts.elections = []
  await storeDistricts.getCity();

})


// 지역 세부정보
async function districtsShow() {
  try {
    const response = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/districts/${props.postId}`, {
      method: "get",
      headers: {
        // 'Accept': 'application/json',
        // 'Content-type': 'application/json',
        // 'Cookie' : getCookie('gongzime_session'),
      },
      credentials: 'include',
    });
    console.log("api", response)
    state.value = response.district.state
    election.value = response.district.election
    city.value = response.district.city
    district.value = response.district.district
    count2.value = response.district.count
    population.value = response.district.population
    return response;
  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
}


// 지역 수정
async function districtEdit() {
  try {
    const response = await $fetcher(useRuntimeConfig().public.backendUrl + `/api/admin/districts/${props.postId}`, {
      method: "put",
      params: {
        state: storeDistricts.stateData,
        election: storeDistricts.electionData,
        city: storeDistricts.cityData,
        district:district.value,
        count: count2.value,
        population: population.value
      },
      headers: {
        // 'Accept': 'application/json',
        // 'Content-type': 'application/json',
        // 'Cookie' : getCookie('gongzime_session'),
      },
      credentials: 'include',
    });
    return response;
  } catch (error) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
}





function editBtn() {
  if (district.value == '') {
    alert("읍면동을 입력해주세요.");
    return;
  } else if (storeDistricts.stateData == '') {
    alert("시도를 선택해주세요.")
    return;
  }
  else if (storeDistricts.electionData == '선택') {
    alert("선거구를 선택해주세요.")
    return;
  }
  else if (storeDistricts.cityData == '선택') {
    alert("시군구를 선택해주세요.")
    return;
  }
  // } else if (count2.value == '' && population.value == '') {
  //   console.log(count2.value)
  //   console.log(population.value)
  //   alert('당원수 또는 동네 인원수를 입력해주세요.')
  //   return;
  // }
  createSwal()
}


function createSwal() {
  Swal.fire({
    title: '지역을 수정 하시겠습니까?',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '수정',
    cancelButtonText: '취소'

  }).then(async (result) => {
    if (result.isConfirmed) {
      Swal.fire(
        '수정 되었습니다.',
        '성공'
      )
      store.editOpen = false
      await districtEdit();
      await store.districtsApi();

    }
  })
}



</script>
