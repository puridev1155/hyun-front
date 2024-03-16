<template>
  <div>
    <!-- Static sidebar for desktop -->
    <div class="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex min-h-0 flex-1 flex-col bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-pink-600 via-purple-950 via-purple-650 to-purple-950">
        <div class="flex h-16 flex-shrink-0 items-center text-xl px-4">
          <h4 class="ohsquare-kr text-1xl"><img src="@/assets/images/pivot.png" /></h4>
        </div>
        <div class="flex flex-1 flex-col overflow-y-auto">
          <nav class="flex-1 space-y-1 px-4 py-4">
            <div v-for="item in navigation" :key="item.name">
              <Nuxt-link @click="refresh" :to="item.href"
                :class="[item.current ? 'bg-gray-900 text-white' : 'text-white hover:bg-white hover:text-purple-800', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
                <component :is="item.icon"
                  :class="[item.current ? 'text-white' : 'text-white group-hover:text-gray-300', 'mr-3 flex-shrink-0 h-6 w-6']"
                  aria-hidden="true" />
                {{ item.name }}
              </Nuxt-link>
            </div>
          </nav>
        </div>
        <div class="flex flex-shrink-0 bg-white bg-opacity-10 backdrop-blur-lg p-4">
          <a href="#" class="group block w-full flex-shrink-0">
            <div class="flex items-center">
              <div class="ml-3">
                <p class="text-sm font-medium text-white">{{ footer[0].name }}</p>
                <p class="text-xs font-medium text-gray-300 group-hover:text-gray-200">{{ footer[0].title }}</p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>

import { ref } from 'vue'
import {
  FolderIcon,
  HomeIcon,
  NewspaperIcon,
  AnnotationIcon,
  UserGroupIcon,
  UserIcon,
  IdentificationIcon,
  ChartBarIcon,
  ChartSquareBarIcon,
  CalendarIcon,
  FolderOpenIcon,
  DocumentIcon,
  ClockIcon,
  UsersIcon,
  MailIcon,
  DatabaseIcon,
  ArchiveIcon,
  UserRemoveIcon,
  TicketIcon
} from '@heroicons/vue/outline'
import { usersInfo } from '~~/stores';


// 당원관리
const memberNavigation = [
  { name: '당원현황', href: '/admin/user', icon: ChartBarIcon, current: false },
  { name: '엑셀등록', href: '/admin', icon: ChartBarIcon, current: false },
]

// 단체관리
const groupNavigation = [
  { name: '단체현황', href: '/admin/group', icon: UserGroupIcon, current: false },
]

// 메시지관리
const messageNavigation = [
  { name: '쪽지', href: '/admin/memberManagement', icon: MailIcon, current: false },
  { name: '문자(SMS)', href: '/admin', icon: MailIcon, current: false },
  { name: '공지사항', href: '/admin', icon: MailIcon, current: false },
]

// 당비관리
const expensesNavigation = [
  { name: '해피나눔', href: '/admin/memberManagement', icon: DatabaseIcon, current: false },
]

// const navigation = [
//   { name: '조직현황', href: '/admin/organization', icon: ChartSquareBarIcon, current: false },
//   { name: '당원추이현황', href: '/admin/trendMembers', icon: ChartSquareBarIcon, current: false },
//   { name: '선거구별현황', href: '/admin/constituency', icon: ChartSquareBarIcon, current: false },
//   { name: '서명대기', href: '/admin/signature', icon: ClockIcon, current: false },
//   { name: '탈당현황', href: '/admin/defections', icon: UserRemoveIcon, current: false },
// ]

const navigation = [
  { name: '대시보드', href: '/admin/dashboard', icon: ChartBarIcon, current: false, role: '10' },
  { name: '회원 관리', href: '/admin/user', icon: UserGroupIcon, current: false, role: '10' },
  { name: '오디션 관리', href: '/admin/audition', icon: IdentificationIcon, current: false, role: '10' },
  { name: '티켓 관리', href: '/admin/ticket', icon: TicketIcon, current: false, role: '10' },
  { name: '참여자 관리', href: '/admin/participant', icon: UsersIcon, current: false, role: '10' },
  { name: '투표 관리', href: '/admin/vote', icon: ArchiveIcon, current: false, role: '10' },
  { name: '투표자 관리', href: '/admin/voter/24', icon: UsersIcon, current: false, role: '10' },
  { name: '재고관리', href: '/admin/product', icon: ArchiveIcon, current: false, role: '10' },
  { name: '결제 관리', href: '/admin/payment', icon: ArchiveIcon, current: false, role: '10' },
  { name: '설정', href: '#', icon: ArchiveIcon, current: false, role: '10' },
  { name: '내 재고관리', href: '/admin/myproduct', icon: ArchiveIcon, current: false, role: '2' },
  { name: '내 고객관리', href: '/admin/mypayment', icon: ArchiveIcon, current: false, role: '2' },

]


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
const footer = [
  { name: '2023 Copyright@PIVOT', title: 'CMS Management' }
]
const store = usersInfo();
// 새로고침
const refresh = async () => {
  await refreshNuxtData()
}

const sidebarOpen = ref(false)
</script>