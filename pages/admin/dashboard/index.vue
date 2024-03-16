<template>
    <div>
      <NuxtLayout name="adminlayout">
        <div class="flex flex-1 flex-col md:pl-64">
          <main class="flex-1">
            <div class="mx-auto">     
                <div class="relative isolate overflow-hidden bg-gray-900 py- sm:py-10">
                 <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2850&q=80&blend=111827&blend-mode=multiply&sat=-100&exp=15" alt="" class="absolute inset-0 -z-10 h-full w-full object-cover" />
                 <div class="relative mx-auto max-w-7xl px-6 lg:px-8">
                   <div class="absolute -bottom-8 -left-96 -z-10 transform-gpu blur-3xl sm:-bottom-64 sm:-left-40 lg:-bottom-32 lg:left-8 xl:-left-10" aria-hidden="true">
                     <div class="aspect-[1266/975] w-[79.125rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20" style="clip-path: polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" />
                   </div>
                   <div class="text-center">
                     <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">PIVOT WORLDWIDE REPORT</h2>
                   </div>
                   <dl class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-10 text-white sm:mt-20 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
                     <div v-for="stat in stats" :key="stat.id" class="flex flex-col gap-y-3 border-l border-white/10 pl-6 mb-10">
                       <dt class="text-sm leading-6">{{ stat.name }}</dt>
                       <dd class="order-first text-5xl font-semibold tracking-tight">{{ stat.value }}</dd>
                     </div>
                   </dl>
                 </div>
                </div>
            </div>
            <div class="mx-auto">
            <div class="flex flex-row items-center justify-between">
                <div class="basis-3/5 text-sm w-auto m-5 h-96 bg-white p-6 pb-12 rounded-md">
                    <div class="relative">
                      <div class="absolute inset-0 flex items-center" aria-hidden="true">
                        <div class="w-full border-t border-gray-300" />
                      </div>
                      <div class="relative flex justify-start">
                        <span class="bg-white pr-3 text-base font-semibold leading-6 text-gray-900">DAILY USER STATISTIC</span>
                      </div>
                    </div>
                    <Line :data="data" :options="options" />
                </div>
                <div class="basis-2/5 text-sm w-auto m-5 h-96 bg-white p-6 pb-12 rounded-md">
                    <div class="relative">
                      <div class="absolute inset-0 flex items-center" aria-hidden="true">
                        <div class="w-full border-t border-gray-300" />
                      </div>
                      <div class="relative flex justify-start">
                        <span class="bg-white pr-3 text-base font-semibold leading-6 text-gray-900">RECENT REGISTERED USER</span>
                      </div>
                    </div>
                    <table class="w-full table-auto text-sm">
                        <thead>
                            <tr class="text-sm leading-normal">
                                <th class="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Name</th>
                                <th class="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Instagram</th>
                                <th class="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody>   
                            <tr class="hover:bg-grey-lighter"  v-for="record in records" :key="record.id">
                                <td class="py-2 px-4 text-center border-b border-grey-light">{{record.name}}</td>
                                <td class="py-2 px-4 text-center border-b border-grey-light">{{ record.instagram}}</td>
                                <td class="py-2 px-4 text-center border-b border-grey-light text-right">{{ record.date }}</td>
                            </tr> 
                        </tbody>
                    </table>
                    <Nuxt-link to="/admin/user"
                      type="button"
                      class="mb-2 block w-full rounded border-1 border-primary px-6 pb-[6px] text-center pt-3 text-xs font-medium uppercase leading-normal text-primary"
                      data-te-ripple-init>
                      더보기 + 
                    </Nuxt-link>
                </div>
                </div>
            </div> <!-- mx auto end -->
            <div class="mx-auto">
                <div class="flex flex-row items-center justify-between">
                    <div class="basis-2/6 w-auto m-5 h-96 bg-white p-6 pb-12 rounded-md">
                        <div class="relative">
                      <div class="absolute inset-0 flex items-center" aria-hidden="true">
                        <div class="w-full border-t border-gray-300" />
                      </div>
                      <div class="relative flex justify-start">
                        <span class="bg-white pr-3 text-base font-semibold leading-6 text-gray-900">DAILY USER STATISTIC</span>
                      </div>
                    </div>
                        <Pie class="m-auto" :data="data2" :options="options2" />
                    </div>
                    <div class="basis-2/6 w-auto m-5 h-96 bg-white p-6 pb-12 rounded-md">
                        <div class="relative">
                      <div class="absolute inset-0 flex items-center" aria-hidden="true">
                        <div class="w-full border-t border-gray-300" />
                      </div>
                      <div class="relative flex justify-start">
                        <span class="bg-white pr-3 text-base font-semibold leading-6 text-gray-900">COUNTRY STATISTIC</span>
                      </div>
                    </div>
                        <Bar class="mt-10" :data="bar" :options="options2" />
                    </div>
                    <div class="basis-2/6 w-auto m-5 h-96 bg-white p-6 pb-12 rounded-md">
                        <div class="relative">
                      <div class="absolute inset-0 flex items-center" aria-hidden="true">
                        <div class="w-full border-t border-gray-300" />
                      </div>
                      <div class="relative flex justify-start">
                        <span class="bg-white pr-3 text-base font-semibold leading-6 text-gray-900">POPULAR PRODUCT</span>
                      </div>
                    </div>
                        <PolarArea class="m-auto" :data="polar" :options="options2" />
                    </div>
                </div>
            </div>
            <div class="mx-auto">
                <div class="flex flex-row items-center justify-between">
                    <div class="basis-3/6 w-auto m-5 h-96 bg-white p-6 pb-12 rounded-md">
                        <div class="relative">
                      <div class="absolute inset-0 flex items-center" aria-hidden="true">
                        <div class="w-full border-t border-gray-300" />
                      </div>
                      <div class="relative flex justify-start">
                        <span class="bg-white pr-3 text-base font-semibold leading-6 text-gray-900">RECENT PAYMENT</span>
                      </div>
                    </div>
                    <table class="w-full table-auto text-sm">
                        <thead>
                            <tr class="text-sm leading-normal">
                                <th class="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Name</th>
                                <th class="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">PRICE</th>
                                <th class="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Instagram</th>
                                <th class="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody>   
                            <tr class="hover:bg-grey-lighter"  v-for="record in payments" :key="record.id">
                                <td class="py-2 px-4 text-center border-b border-grey-light">{{record.name}}</td>
                                <td class="py-2 px-4 text-center border-b border-grey-light">{{ record.pay}}</td>
                                <td class="py-2 px-4 text-center border-b border-grey-light">{{ record.product}}</td>
                                <td class="py-2 px-4 text-center border-b border-grey-light text-right">{{ record.date }}</td>
                            </tr> 
                        </tbody>
                    </table>
                    <Nuxt-link to="/admin/payment"
                      type="button"
                      class="mb-2 block w-full rounded border-1 border-primary px-6 pb-[6px] text-center pt-3 text-xs font-medium uppercase leading-normal text-primary"
                      data-te-ripple-init>
                      더보기 + 
                    </Nuxt-link>
                    </div>
                    <div class="basis-3/6 w-auto m-5 h-96 bg-white p-6 pb-12 rounded-md">
                        <div class="relative">
                      <div class="absolute inset-0 flex items-center" aria-hidden="true">
                        <div class="w-full border-t border-gray-300" />
                      </div>
                      <div class="relative flex justify-start">
                        <span class="bg-white pr-3 text-base font-semibold leading-6 text-gray-900">RECENT NOTICE</span>
                      </div>
                    </div>
                    <table class="w-full table-auto text-sm">
                        <thead>
                            <tr class="text-sm leading-normal">
                                <th class="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light">Title</th>
                                <th class="py-2 px-4 bg-grey-lightest font-bold uppercase text-sm text-grey-light border-b border-grey-light text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody>   
                            <tr class="hover:bg-grey-lighter"  v-for="record in notices" :key="record.id">
                                <td class="py-2 px-4 text-center border-b border-grey-light">{{record.name}}</td>
                                <td class="py-2 px-4 text-center border-b border-grey-light text-right">{{ record.date }}</td>
                            </tr> 
                        </tbody>
                    </table>
                    <Nuxt-link to="/admin/notice"
                      type="button"
                      class="mb-2 block w-full rounded border-1 border-primary px-6 pb-[6px] text-center pt-3 text-xs font-medium uppercase leading-normal text-primary"
                      data-te-ripple-init>
                      더보기 + 
                    </Nuxt-link>
                    </div>
                  
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

  import {
  Chart as ChartJS,
  CategoryScale,
  RadialLinearScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

import { Line, Pie, Bar, PolarArea } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
)

const stats = [
  { id: 1, name: 'TOTAL USER', value: '80,000' },
  { id: 2, name: 'TOTAL EVENT', value: '120' },
  { id: 3, name: 'TOTAL PRODUCT', value: '350' },
  { id: 4, name: 'TOTAL PAYMENT', value: '$135,000' },
]

const records = [
{ id: 1, name: 'Johnny Dept', instagram: 'sdaf@', date: '2023-08-30' },
  { id: 2, name: 'Jennifer Lopez', instagram: 'jenni@', date: '2023-08-30' },
  { id: 3, name: 'Ahsley Sniper', instagram: 'sdddd@', date: '2023-08-30' },
  { id: 4, name: 'Hoffman State',instagram: 'sdaf@', date: '2023-08-30' },
  { id: 5, name: 'Karter Man', instagram: 'dddd@', date: '2023-08-30' },
  { id: 6, name: 'Lorena Millen', instagram: 'fff@', date: '2023-08-30' },
  { id: 6, name: 'Lorena Millen', instagram: 'sdaf@', date: '2023-08-30' },
]

const payments = [
{ id: 1, name: 'Johnny Dept', product: 'product 1', pay: '10000', date: '2023-08-30' },
  { id: 2, name: 'Jennifer Lopez', product: 'product 1', pay: '10000',date: '2023-08-30' },
  { id: 3, name: 'Ahsley Sniper', product: 'product 1', pay: '30000',date: '2023-08-30' },
  { id: 4, name: 'Hoffman State', product: 'product 1', pay: '10000',date: '2023-08-30' },
  { id: 5, name: 'Karter Man', product: 'product 1', pay: '50000',date: '2023-08-30' },
  { id: 6, name: 'Lorena Millen', product: 'product 1', pay: '10000',date: '2023-08-30' },
  { id: 6, name: 'Lorena Millen', product: 'product 1', pay: '10000', date: '2023-08-30' },
]

const notices = [
{ id: 1, name: '공지올립니다 테스트 1', instagram: 'sdaf@', date: '2023-08-30' },
{ id: 2, name: '공지올립니다 테스트 1', instagram: 'sdaf@', date: '2023-08-30' },
{ id: 3, name: '공지올립니다 테스트 1', instagram: 'sdaf@', date: '2023-08-30' },
{ id: 4, name: '공지올립니다 테스트 1', instagram: 'sdaf@', date: '2023-08-30' },
{ id: 5, name: '공지올립니다 테스트 1', instagram: 'sdaf@', date: '2023-08-30' },
{ id: 6, name: '공지올립니다 테스트 1', instagram: 'sdaf@', date: '2023-08-30' },
{ id: 6, name: '공지올립니다 테스트 1', instagram: 'sdaf@', date: '2023-08-30' },

]

const data = ref({
  //  가로
  labels: ['2023-08-24', '2023-08-25', '2023-08-26', '2023-08-27', '2023-08-28', '2023-08-29', '2023-08-30'],
  datasets: [{
    // 라벨 이름
    label: '회원',
    //  세로 데이터
    data: [ 30, 40, 140, 25, 40, 60, 55 ],
    // 색상
    borderColor: '#22C55E',
    fill: false
  }]
})

const bar = {
  labels: [
    'KOREA',
    'JAPAN',
    'US',
    'INDIA',
  ],
  datasets: [
    {
      label: 'COUNTRY STATISTIC',
      backgroundColor: '#db2777',
      data: [60, 120, 100, 160]
    }
  ]
}

const polar = {
  labels: [
    'Product 1',
    'Product 2',
    'Product 3',
    'Product 4',
  ],
  datasets: [
    {
      label: 'POPULAR PRODUCT',
      backgroundColor: '#db2777',
      pointBackgroundColor: '#db2777',
      pointBorderColor: '#000',
      pointHoverBackgroundColor: '#3b0764',
      pointHoverBorderColor: '#db2777',
      data: [65, 59, 90, 81]
    }
  ]
}


const data2 = ref({
    labels: ['MALE', 'FEMALE'],
  datasets: [
    {
      backgroundColor: ['#3b0764', '#db2777'],
      data: [20, 80]
    }
  ]
})

const options = {
  responsive: true,
  maintainAspectRatio: false
}

const options2 = {
  responsive: true,
  //maintainAspectRatio: false
}

const route = useRoute();
  // Top Nav
const navs = [
  { name: 'Dashboard', href: '#', current: false },
  { name: 'Dashboard Table', href: '#', current: true },
]
  
onMounted(async () => {
    Loding.value = true
  })
  
  </script>
  