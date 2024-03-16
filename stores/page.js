// 총 인원수
const total = ref('');
// 현재 페이지 
const page = ref(1);
// 페이지당 데이터 갯수
const perPage = ref(10);

// 페이지 토탈 
const totalPageCount = computed(() => {
   return Math.ceil(total.value / perPage.value);
})

export { total, page, perPage, totalPageCount }