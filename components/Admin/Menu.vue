<template>
  <div>
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-40 md:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0"
          enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100"
          leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform"
            enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform"
            leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0"
                enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button type="button"
                    class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    @click="sidebarOpen = false">
                    <span class="sr-only">Close sidebar</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                      stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" class="text-white" />
                    </svg>

                  </button>
                </div>
              </TransitionChild>
              <div class="flex flex-shrink-0 items-center px-4">
                <h4 class="ohsquare-kr text-1xl">회원정보 관리</h4>
              </div>
              <div class="mt-5 h-0 flex-1 overflow-y-auto">
                <nav class="space-y-1 px-2">
                  <Nuxt-link v-for="item in navigation" :key="item.name" :to="item.href"
                    :class="[item.current ? 'bg-white text-gray-900' : 'text-gray-600 hover:bg-white hover:text-gray-900', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']">
                    <component :is="item.icon"
                      :class="[item.current ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-4 flex-shrink-0 h-6 w-6']"
                      aria-hidden="true" />
                    {{ item.name }}
                  </Nuxt-link>


                  <!-- 당원 관리 -->
                  <!-- <button type="button" @click="toggle1Open"
                    class="flex items-center w-full p-2 text-base font-normal text-gray-500 transition duration-75 rounded-lg group hover:bg-gray-100 "
                    aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                    <svg class="flex-shrink-0 w-6 h-6 transition duration-75 " fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clip-rule="evenodd"></path>
                    </svg>
                    <span class="flex-1 ml-3  text-left whitespace-nowrap" sidebar-toggle-item>당원관리</span>
                    <svg sidebar-toggle-item class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </button>

                  <ul v-if="toggle1" class=" py-2 space-y-2">
                    <li>
                      <Nuxt-link v-for="item in memberNavigation" :key="item.name" :to="item.href"
                        class="flex items-center w-full p-2 text-base font-normal text-gray-500  transition duration-75 rounded-lg group hover:bg-gray-100 pl-11">
                        {{ item.name }}
                      </Nuxt-link>
                    </li>
                  </ul> -->

                  <!-- 단체 관리-->
                  <!-- <button type="button" @click="toggle2Open"
                    class="flex items-center w-full p-2 text-base font-normal text-gray-500 transition duration-75 rounded-lg group hover:bg-gray-100 "
                    aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                    <svg class="flex-shrink-0 w-6 h-6  transition duration-75 " fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clip-rule="evenodd"></path>
                    </svg>
                    <span class="flex-1 ml-3   text-left whitespace-nowrap" sidebar-toggle-item>단체관리</span>
                    <svg sidebar-toggle-item class="w-6 h-6 " fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </button>

                  <ul v-if="toggle2" class=" py-2 space-y-2">
                    <li>
                      <Nuxt-link v-for="item in groupNavigation" :key="item.name" :to="item.href"
                        class="flex items-center w-full p-2 text-base font-normal text-gray-500  transition duration-75 rounded-lg group hover:bg-gray-100 pl-11">
                        {{ item.name }}
                      </Nuxt-link>
                    </li>
                  </ul> -->


                  <!-- 메시지 관리-->


                  <!-- <button type="button" @click="toggle3Open"
                    class="flex items-center w-full p-2 text-base font-normal text-gray-500 transition duration-75 rounded-lg group hover:bg-gray-100 "
                    aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                    <svg class="flex-shrink-0 w-6 h-6 transition duration-75 " fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clip-rule="evenodd"></path>
                    </svg>
                    <span class="flex-1 ml-3  text-left whitespace-nowrap" sidebar-toggle-item>메시지관리</span>
                    <svg sidebar-toggle-item class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </button>

                  <ul v-if="toggle3" class=" py-2 space-y-2">
                    <li>
                      <Nuxt-link v-for="item in messageNavigation" :key="item.name" :to="item.href"
                        class="flex items-center w-full p-2 text-base font-normal text-gray-500  transition duration-75 rounded-lg group hover:bg-gray-100 pl-11">
                        {{ item.name }}
                      </Nuxt-link>
                    </li>
                  </ul>

                  <button type="button" @click="toggle4Open"
                    class="flex items-center w-full p-2 text-base font-normal text-gray-500 transition duration-75 rounded-lg group hover:bg-gray-100 "
                    aria-controls="dropdown-example" data-collapse-toggle="dropdown-example">
                    <svg class="flex-shrink-0 w-6 h-6 transition duration-75 " fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                        clip-rule="evenodd"></path>
                    </svg>
                    <span class="flex-1 ml-3  text-left whitespace-nowrap" sidebar-toggle-item>당비관리</span>
                    <svg sidebar-toggle-item class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path>
                    </svg>
                  </button>

                  <ul v-if="toggle4" class=" py-2 space-y-2">
                    <li>
                      <Nuxt-link v-for="item in expensesNavigation" :key="item.name" :to="item.href"
                        class="flex items-center w-full p-2 text-base font-normal text-gray-500  transition duration-75 rounded-lg group hover:bg-gray-100 pl-11">
                        {{ item.name }}
                      </Nuxt-link>
                    </li>
                  </ul> -->

                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 flex-shrink-0" aria-hidden="true">
            <!-- Dummy element to force sidebar to shrink to fit close icon -->
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

    <div class="flex flex-1 flex-col md:pl-64">
      <div class="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white border-b hidden">
        <button type="button"
          class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
          @click="sidebarOpen = true">
          <span class="sr-only">Open sidebar</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
        <div class="flex flex-1 justify-between px-4 hidden">
          <div class="flex flex-1">
            <Nuxt-link to="/" class="pt-5">
              <HomeIcon class="w-6 h-6 mb-1 inline-block" aria-hidden="true" />
            </Nuxt-link>
          </div>
          <div class="ml-4 flex items-center md:ml-6">
            <Nuxt-link @click="logout()"
              class="ml-2 flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50">로그아웃</Nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import {
  FolderIcon,
  HomeIcon,
  NewspaperIcon,
  AnnotationIcon,
  UserGroupIcon,
  UserIcon,
  ChartBarIcon,
  CalendarIcon,
  FolderOpenIcon,
  DocumentIcon
} from '@heroicons/vue/outline'

const { logout } = await useAuth();

const sidebarOpen = ref(false)
const toggle1 = ref(false);
const toggle2 = ref(false);
const toggle3 = ref(false);
const toggle4 = ref(false);
function toggle1Open() {
  toggle1.value = !toggle1.value;
}
function toggle2Open() {
  toggle2.value = !toggle2.value;
}
function toggle3Open() {
  toggle3.value = !toggle3.value;
}
function toggle4Open() {
  toggle4.value = !toggle4.value;
}

// 당원관리
const memberNavigation = [
  { name: '당원현황', href: '/admin/user', icon: ChartBarIcon, current: false },
  { name: '당원등록', href: '/admin', icon: ChartBarIcon, current: false },
  { name: '엑셀등록', href: '/admin', icon: ChartBarIcon, current: false },
]

// 단체관리
const groupNavigation = [
  { name: '단체현황', href: '/admin/group', icon: ChartBarIcon, current: false },
  { name: '단체생성', href: '/admin', icon: ChartBarIcon, current: false },
  { name: '단체수정', href: '/admin', icon: ChartBarIcon, current: false },
]

// 메시지관리
const messageNavigation = [
  { name: '쪽지', href: '/admin/memberManagement', icon: ChartBarIcon, current: false },
  { name: '문자(SMS)', href: '/admin', icon: ChartBarIcon, current: false },
  { name: '공지사항', href: '/admin', icon: ChartBarIcon, current: false },
]

// 당비관리
const expensesNavigation = [
  { name: '해피나눔', href: '/admin/memberManagement', icon: ChartBarIcon, current: false },
]

// const navigation = [
//   { name: '조직현황', href: '/admin/organization', icon: ChartBarIcon, current: false },
//   { name: '당원추이현황', href: '/admin/trendMembers', icon: UserIcon, current: false },
//   { name: '선거구별현황', href: '/admin/constituency', icon: UserIcon, current: false },
//   { name: '서명대기', href: '/admin/signature', icon: UserIcon, current: false },
//   { name: '탈당현황', href: '/admin/defection', icon: UserIcon, current: false },
// ]
const navigation = [
  { name: 'USER', href: '/admin/user', icon: UserGroupIcon, current: false },
  { name: '전화 가입 목록', href: '/admin/call', icon:  UserIcon, current: false },
  { name: '당원 확인 목록', href: '/admin/check', icon: UserIcon, current: false },
  { name: '추천인 목록', href: '/admin/referrer', icon: UserIcon, current: false },
  { name: '지역 관리', href: '/admin/districts', icon: UserIcon, current: false },

]
</script>