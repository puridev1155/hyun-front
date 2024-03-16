<template>
  <div class="md:flex md:justify-end">

    <Listbox as="div" v-model="storeDistricts.stateData" class=" md:w-[250px]">
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

        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ListboxOption as="template" v-for="state in storeDistricts.states" :key="state" :value="state"
              v-slot="{ active }">
              <li @click="stateClick(state)"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                <div class="flex items-center">
                  <!-- <img :src="person.avatar" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" /> -->
                  <span :class="[storeDistricts.stateData ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">{{
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


    <Listbox as="div" v-model="storeDistricts.electionData" class="md:ml-4 md:w-[250px]">
      <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">선거구</ListboxLabel>
      <div class="relative mt-2">
        <ListboxButton
          class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
          <span class="flex items-center">

            <span class="ml-3 block truncate">{{ storeDistricts.electionData }}.</span>
          </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">

          </span>
        </ListboxButton>

        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ListboxOption as="template" v-for="election in storeDistricts.elections" :key="election" :value="election"
              v-slot="{ active }">
              <li @click="electionCLick(election)"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                <div class="flex items-center">
                  <!-- <img :src="city.avatar" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" /> -->
                  <span :class="[storeDistricts.electionData ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">{{
                    election }}</span>
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


  <Listbox as="div" v-model="storeDistricts.cityData" class="md:ml-4 md:w-[250px]">
        <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">시군구</ListboxLabel>
        <div class="relative mt-2">
          <ListboxButton
            class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
            <span class="flex items-center">

              <span class="ml-3 block truncate">{{ storeDistricts.cityData }}.</span>
            </span>
            <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">

            </span>
          </ListboxButton>

          <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <ListboxOptions
              class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              <ListboxOption as="template" v-for="city in storeDistricts.cities" :key="city" :value="city"
                v-slot="{ active }">
                <li @click="citiyCLick(city)"
                  :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                  <div class="flex items-center">
                    <!-- <img :src="city.avatar" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" /> -->
                    <span :class="[storeDistricts.cityData ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">{{
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



    <Listbox as="div" v-model="storeDistricts.districtIdData" class="md:ml-4 md:w-[250px]">
      <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">읍면동</ListboxLabel>
      <div class="relative mt-2">
        <ListboxButton
          class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
          <span class="flex items-center">

            <span class="ml-3 block truncate">{{ storeDistricts.districtIdData }}</span>
          </span>
          <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">

          </span>
        </ListboxButton>

        <transition leave-active-class="transition ease-in duration-100" leave-from-class="opacity-100"
          leave-to-class="opacity-0">
          <ListboxOptions
            class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            <ListboxOption as="template" v-for="district in storeDistricts.districts" :key="district.id"
              :value="district.district" v-slot="{ active }">
              <li @click="districtClick(district.district)"
                :class="[active ? 'bg-indigo-600 text-white' : 'text-gray-900', 'relative cursor-default select-none py-2 pl-3 pr-9']">
                <div class="flex items-center">
                  <!-- <img :src="district.avatar" alt="" class="h-5 w-5 flex-shrink-0 rounded-full" /> -->
                  <span
                    :class="[storeDistricts.districtIdData ? 'font-semibold' : 'font-normal', 'ml-3 block truncate']">{{
                      district.district }}</span>
                </div>

                <span v-if="storeDistricts.districtIdData"
                  :class="[active ? 'text-white' : 'text-indigo-600', 'absolute inset-y-0 right-0 flex items-center pr-4']">

                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>

  </div>
</template>

<script setup>
import { Listbox, ListboxButton, ListboxLabel, ListboxOption, ListboxOptions } from '@headlessui/vue'
import { districts } from '@/stores/index';
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();
const storeDistricts = districts();
const emit = defineEmits(['districtSubmit'])
onMounted(() => {
  storeDistricts.getState();
  storeDistricts.stateData = '선택'
  storeDistricts.cityData = '선택'
  storeDistricts.districtIdData = '선택'

})

const emitData = ref({
  district: {
    state: null,
    election: null,
    city: null,
    id: null,

  }
})

async function stateClick(state) {
  emitData.value.district.state = state
  emitData.value.district.election = null
  emitData.value.district.city = null
  emitData.value.district.id = null
  storeDistricts.electionData = '선택'
  storeDistricts.elections = []
  storeDistricts.cityData = '선택'
  storeDistricts.cities = []
  storeDistricts.districtIdData = '선택'
  storeDistricts.districts = []
  await emit('districtSubmit', emitData.value)
  await storeDistricts.getCity();

}
async function electionCLick(election) {
  emitData.value.district.election = election
  emitData.value.district.city = null
  emitData.value.district.id = null
  storeDistricts.cityData = '선택'
  storeDistricts.districtIdData = '선택'
  storeDistricts.districts = []
  await emit('districtSubmit', emitData.value)
  await storeDistricts.getDistrict();

}


async function citiyCLick(city) {
  emitData.value.district.city = city
  emitData.value.district.election = null
  emitData.value.district.id = null
  storeDistricts.electionData = '선택'
  storeDistricts.districtIdData = '선택'
  storeDistricts.districts = []
  await emit('districtSubmit', emitData.value)
  await storeDistricts.getDistrict();
  
}

function districtClick(id) {
  storeDistricts.districtId = id
  emitData.value.district.id = id
  emit('districtSubmit', emitData.value)
  // storeDistricts.update.district.id = id
}

// watch(() => storeDistricts.stateData, async () => {
//   storeDistricts.electionData = '선택'
//   storeDistricts.elections = []
//   storeDistricts.cityData = '선택'
//   storeDistricts.cities = []
//   storeDistricts.districtIdData = '선택'
//   storeDistricts.districts = []
//   // storeDistricts.update.district.state = storeDistricts.stateData
//   // storeDistricts.update.district.election = null
//   // storeDistricts.update.district.city = null
//   // storeDistricts.update.district.id = null
//   await storeDistricts.getCity();

// })

// watch(() => storeDistricts.electionData, async () => {
//   storeDistricts.cityData = '선택'

//   storeDistricts.districtIdData = '선택'
//   storeDistricts.districts = []
//   await storeDistricts.getDistrict();
// })

// watch(() => storeDistricts.cityData, async () => {
//   storeDistricts.electionData = '선택'

//   storeDistricts.districtIdData = '선택'
//   storeDistricts.districts = []
//   await storeDistricts.getDistrict();
// })


</script>