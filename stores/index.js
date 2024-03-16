import { defineStore, storeToRefs } from 'pinia'
import axios from 'axios';
import {ref} from 'vue'
import member from '~~/middleware/member';
import { total, page, perPage, totalPageCount } from '@/stores/page'
import { search, startdate, enddate, exSearch, exStartdate, exEnddate, langId  } from '@/stores/search'
import { editOpen, createOpen, infoOpen, memoOpen, choiceOpen } from '@/stores/modals'
import { list } from 'postcss';



// User api
export const usersInfo = defineStore('usersInfo',() => {    
   
    // 유저 정보 리스트
    const memberList = ref([]);
  
        async function userApi() {
        try {
            //axios 줄이는 방법 구상!
            const response = await $fetcher(useRuntimeConfig().public.backendUrl + "/api/admin/members", {
            method: "get",
            params:{
                'page': page.value,
                'filter[search]': search.value,
                'filter[startdate]': startdate.value,
                'filter[enddate]': enddate.value,
                'itemsPerPage': perPage.value
            },
            credentials: 'include',
            });
            memberList.value = response.data;
            page.value = response.meta.current_page;
            total.value = response.meta.total;
            return response;

        } catch (error) {
            if ([401, 419].includes(error?.response?.status)) return null;
            throw error;
            }
        }
        return{ page, perPage, total,search,totalPageCount, editOpen, memoOpen, memberList, startdate, enddate, userApi, createOpen, infoOpen, exSearch, exStartdate,exEnddate }
})

// Posts Api Start
export const postsInfo = defineStore('postsInfo',() => {    
    // 유저 정보 리스트
    const list = ref([]);
    async function postApi(categoryId, langId, board) {
        try {        
            const response = await $fetcher(useRuntimeConfig().public.backendUrl + "/api/admin/posts", {
            method: "get",
            params:{
                page: page.value,
                'filter[category_id]' : categoryId,
                'filter[board]' : board,
                'filter[lang_id]' : langId,
                'filter[search]': search.value,
                'filter[startdate]': startdate.value,
                'filter[enddate]': enddate.value,
                itemsPerPage: perPage.value
            },
            credentials: 'include',
            });

            list.value = response.data;
            page.value = response.meta.current_page;
            total.value = response.meta.total;
            categoryId = null;
        } catch (error) {
            if ([401, 419].includes(error?.response?.status)) return null;
            throw error;
        }
    }
    return{ page, perPage, total, search,totalPageCount, editOpen, memoOpen, startdate, enddate, createOpen, list, infoOpen, postApi, exSearch, exStartdate,exEnddate }
})
//Post Api End

// Product
export const productsInfo = defineStore('productsInfo',() => {    
   
    // 유저 정보 리스트
    const list = ref([]);
    const category_id = ref('')
    const lang_id = ref('')
    const in_stock = ref('')
    async function postApi(bodyData, paramData, dataUrl, methodType) {

        console.log(in_stock.value, 'in_stock');
        paramData = {
            page: page.value,
            'filter[search]': search.value,
            'filter[startdate]': startdate.value,
            'filter[enddate]': enddate.value,
            'filter[category_id]' : category_id.value,
            'filter[in_stock]' : in_stock.value,
            'filter[lang_id]' : lang_id.value,

            itemsPerPage: perPage.value
        }

        try {
            const response = await $fetcher(useRuntimeConfig().public.backendUrl + dataUrl, {
                method: methodType,
                params: paramData,
                credentials: 'include',
                });

            console.log(response)
            list.value = response.data;
            page.value = response.meta.current_page;
            total.value = response.meta.total;
          

        } catch (error) {
            if ([401, 419].includes(error?.response?.status)) return null;
            throw error;
        }

    }

    
    return{ page, category_id, in_stock, lang_id, perPage, total, search,totalPageCount, editOpen, memoOpen, startdate, enddate, createOpen, list, infoOpen, postApi, exSearch, exStartdate,exEnddate }
})
// Product Api End

// MyProduct
export const myproductsInfo = defineStore('myproductsInfo',() => {    
   
    // 유저 정보 리스트
    const list = ref([]);
    const category_id = ref('')
    const lang_id = ref('')
    const in_stock = ref('')
    async function postApi(bodyData, paramData, dataUrl, methodType) {

        console.log(in_stock.value, 'in_stock');
        paramData = {
            page: page.value,
            'filter[search]': search.value,
            'filter[startdate]': startdate.value,
            'filter[enddate]': enddate.value,
            'filter[category_id]' : category_id.value,
            'filter[in_stock]' : in_stock.value,
            'filter[lang_id]' : lang_id.value,

            itemsPerPage: perPage.value
        }

        try {
            const response = await $fetcher(useRuntimeConfig().public.backendUrl + dataUrl, {
                method: methodType,
                params: paramData,
                credentials: 'include',
                });

            console.log(response)
            list.value = response.data;
            page.value = response.meta.current_page;
            total.value = response.meta.total;
          

        } catch (error) {
            if ([401, 419].includes(error?.response?.status)) return null;
            throw error;
        }

    }

    
    return{ page, category_id, in_stock, lang_id, perPage, total, search,totalPageCount, editOpen, memoOpen, startdate, enddate, createOpen, list, infoOpen, postApi, exSearch, exStartdate,exEnddate }
})
// Product Api End

// Payments
export const paymentsInfo = defineStore('paymentsInfo',() => {    
    // 유저 정보 리스트
    const list = ref([]);
    const category_id = ref('')
    const payment_type = ref('')
    const status = ref('')
    async function postApi(bodyData, paramData, dataUrl, methodType) {

        console.log(payment_type.value, 'paramData')
        console.log(status.value, 'status')
        paramData = {
            page: page.value,
            'filter[search]': search.value,
            'filter[startdate]': startdate.value,
            'filter[enddate]': enddate.value,
            'filter[status]' : status.value,
            'filter[payment_type]' : payment_type.value,
            itemsPerPage: perPage.value
        }

        try {
            console.log(dataUrl, 'dataUrl');
            const response = await $fetcher(useRuntimeConfig().public.backendUrl + dataUrl, {
                method: methodType,
                params: paramData,
                credentials: 'include',
                });

            console.log(response)
            list.value = response.data;
            page.value = response.meta.current_page;
            total.value = response.meta.total;
          

        } catch (error) {
            if ([401, 419].includes(error?.response?.status)) return null;
            throw error;
        }

    }
    
    return{ page, category_id, status, payment_type, perPage, total, search,totalPageCount, editOpen, memoOpen, startdate, enddate, createOpen, list, infoOpen, postApi, exSearch, exStartdate,exEnddate }
})
// Payments Api End

// MyPayments
export const mypaymentsInfo = defineStore('mypaymentsInfo',() => {    
    // 유저 정보 리스트
    const list = ref([]);
    const category_id = ref('')
    const payment_type = ref('')
    const status = ref('')
    async function postApi(bodyData, paramData, dataUrl, methodType) {

        console.log(payment_type.value, 'paramData')
        console.log(status.value, 'status')
        paramData = {
            page: page.value,
            'filter[search]': search.value,
            'filter[startdate]': startdate.value,
            'filter[enddate]': enddate.value,
            'filter[status]' : status.value,
            'filter[payment_type]' : payment_type.value,
            itemsPerPage: perPage.value
        }

        try {
            console.log(dataUrl, 'dataUrl');
            const response = await $fetcher(useRuntimeConfig().public.backendUrl + dataUrl, {
                method: methodType,
                params: paramData,
                credentials: 'include',
                });

            console.log(response)
            list.value = response.data;
            page.value = response.meta.current_page;
            total.value = response.meta.total;
          

        } catch (error) {
            if ([401, 419].includes(error?.response?.status)) return null;
            throw error;
        }

    }
    
    return{ page, category_id, status, payment_type, perPage, total, search,totalPageCount, editOpen, memoOpen, startdate, enddate, createOpen, list, infoOpen, postApi, exSearch, exStartdate,exEnddate }
})
// MyPayments Api End

//Vote Api Start
export const votesInfo = defineStore('votesInfo',() => {    
   
    // 유저 정보 리스트
    const list = ref([]);
    async function postApi() {
        try {
            const response = await $fetcher(useRuntimeConfig().public.backendUrl + "/api/admin/votes", {
            method: "get",
            params:{
                page: page.value,
                'filter[search]': search.value,
                'filter[startdate]': startdate.value,
                'filter[enddate]': enddate.value,
                itemsPerPage: perPage.value
            },
            credentials: 'include',
            });

            list.value = response.data;
            page.value = response.meta.current_page;
            total.value = response.meta.total;

        } catch (error) {
            if ([401, 419].includes(error?.response?.status)) return null;
            throw error;
        }

    }

    
    return{ page, perPage, total, search,totalPageCount, editOpen, choiceOpen, startdate, enddate, list, infoOpen, postApi, exSearch, exStartdate,exEnddate }
})
//Vote Api End

// Participant Api Start
export const participantsInfo = defineStore('participantsInfo',() => {    
   
    // 유저 정보 리스트
    const list = ref([]);
    const category_id = ref('')
    const status = ref('')
    async function postApi(bodyData, paramData, dataUrl, methodType) {

        paramData = {
            page: page.value,
            'filter[search]': search.value,
            'filter[startdate]': startdate.value,
            'filter[enddate]': enddate.value,
            'filter[payments.status]' : status.value,
            'filter[posts.category_id]' : category_id.value,

            itemsPerPage: perPage.value
        }

        try {
            const response = await $fetcher(useRuntimeConfig().public.backendUrl + dataUrl, {
                method: methodType,
                params: paramData,
                credentials: 'include',
                });

            console.log(response)
            list.value = response.data;
            page.value = response.meta.current_page;
            total.value = response.meta.total;
          

        } catch (error) {
            if ([401, 419].includes(error?.response?.status)) return null;
            throw error;
        }

    }

    
    return{ page, category_id, status, perPage, total, search,totalPageCount, editOpen, memoOpen, startdate, enddate, createOpen, list, infoOpen, postApi, exSearch, exStartdate,exEnddate }
})
//Participant Api End


// Participant Api Start
export const votersInfo = defineStore('votersInfo',(id) => {    
   
    // 유저 정보 리스트
    const list = ref([]);
    const category_id = ref('')
    const status = ref('')
    async function postApi(bodyData, paramData, dataUrl, methodType) {

        paramData = {
            page: page.value,
            'filter[search]': search.value,
            'filter[startdate]': startdate.value,
            'filter[enddate]': enddate.value,
            'filter[payments.status]' : status.value,
            'filter[posts.category_id]' : category_id.value,

            itemsPerPage: perPage.value
        }

        try {
            console.log(dataUrl, 'sdfsdf')
            const response = await $fetcher(useRuntimeConfig().public.backendUrl + dataUrl, {
                method: methodType,
                params: paramData,
                credentials: 'include',
                });

            console.log(response)
            list.value = response.data;
            page.value = response.meta.current_page;
            total.value = response.meta.total;
          

        } catch (error) {
            if ([401, 419].includes(error?.response?.status)) return null;
            throw error;
        }

    }

    
    return{ page, category_id, status, perPage, total, search, choiceOpen, totalPageCount, editOpen, memoOpen, startdate, enddate, createOpen, list, infoOpen, postApi, exSearch, exStartdate,exEnddate }
})
//Participant Api End

// DataList Api Start
export const DataList = defineStore('DataList',() => {    
   
    // 유저 정보 리스트
    const list = ref([]);
    async function postApi(bodyData, paramData, dataUrl, methodType) {

        paramData = {
            page: page.value,
            'filter[search]': search.value,
            'filter[startdate]': startdate.value,
            'filter[enddate]': enddate.value,
            itemsPerPage: perPage.value
        }
        try {
            const response = await $fetcher(useRuntimeConfig().public.backendUrl + dataUrl, {
                method: methodType,
                params: paramData,
                credentials: 'include',
                });

            console.log(response)
            list.value = response.data;
            page.value = response.meta.current_page;
            total.value = response.meta.total;
          

        } catch (error) {
            if ([401, 419].includes(error?.response?.status)) return null;
            throw error;
        }

    }

    
    return{ page, perPage, total, search,totalPageCount, editOpen, memoOpen, startdate, enddate, createOpen, list, infoOpen, postApi, exSearch, exStartdate,exEnddate }
})
//DataList Api End

//DataCrud Api Start
export const dataCrud = defineStore('dataCrud',() => {

    const list = ref([]);
    const postId = ref('');

    async function crudApi(bodyData, paramData, dataUrl, methodType) { 
        try {
           // console.log(paramData, 'paramData');
            let config = {};
            config = bodyData && paramData ? { ...config, body: bodyData, params: paramData } : 
            bodyData ? { ...config, body: bodyData } : paramData ? { ...config, params: paramData } : config; //config setting
            config.method = methodType; //method setting

           // console.log(config, 'config')
       
            const post = await $fetcher(useRuntimeConfig().public.backendUrl + `/api${dataUrl}`, config); //send data
    
           // console.log(post, 'post.data')
            
       
            //TODO list Show 다시 시도할 것임.

            return post.data;            
        } catch (error) {
            //if ([401, 419].includes(error?.post?.status)) return null;
            throw error;
        }
    }

    return{ crudApi, postId, choiceOpen }
});
//DataCrud Api End


  
// 정당 가입페이지
export const state = defineStore('info', ()=> {

    const name = ref('');
    const phone = ref('');
    const birth = ref('');
    const gender = ref('');
    const req_seq = ref('');
    const auth_type = ref('');
    const mobile_co = ref('');
    const utf8name = ref('');
    const dataUrl = ref('');
    const districtList = ref([]);
async function listApi(state,city) {
         try {
            const response = await $fetcher(useRuntimeConfig().public.backendUrl + "/api/districts", {
            method: "get",
            params:{
                state:state,
                city:city
            },
            credentials: 'include',
            });
            districtList.value = response
            return response;

        } catch (error) {
            if ([401, 419].includes(error?.response?.status)) return null;
            throw error;
        }
    }



return {name, phone, birth, gender, req_seq, auth_type, mobile_co, utf8name, dataUrl, districtList, listApi}

})



// 당원 확인
export const checkInfo = defineStore('checkInfo',() => {
    const checkList = ref([]);
        // 수정 모달창
    const editOpen = ref(false)
    // 유저 추가 모달창
    const createOpen = ref(false)

    // 총 인원수
    const total = ref('');
     // 현재 페이지
    const page = ref(1);
      // 페이지당 데이터 갯수
    const perPage = ref(10);
    // 검색 데이터
    const search = ref(''); 
    // 시작날짜
    const startdate = ref('')
    // 종료날짜
    const enddate = ref('')
    // 엑셀 검색 키워드
    const exSearch = ref('');
    // 엑셀시작날짜
    const exStartdate = ref('')
    // 엑셀종료날짜
    const exEnddate = ref('')
    // sadfdsaf
    const langId = ref('')

    // 페이지 토탈 
    const totalPageCount = computed(() => {
      return Math.ceil(total.value / perPage.value);
    })
    // 유저 메모 모달창
    const memoOpen = ref(false)

    async function checkApi() {
      try {
            const response = await $fetcher(useRuntimeConfig().public.backendUrl + "/api/admin/cert", {
            method: "get",
            params:{
                page: page.value,
                q: search.value,
                startdate: startdate.value,
                enddate: enddate.value,
                itemsPerPage: perPage.value
            },
            headers: {
                // 'Accept': 'application/json',
                // 'Content-type': 'application/json',
                // 'Cookie' : getCookie('gongzime_session'),
            },
            credentials: 'include',
            }); 
            checkList.value = response.data;
            page.value = response.meta.current_page;
            total.value = response.meta.total;
            return response;
        } catch (error) {
            if ([401, 419].includes(error?.response?.status)) return null;
            throw error;
        }
    }

    return{ checkList, checkApi, editOpen, createOpen, total, page, search, startdate, enddate, perPage, totalPageCount, memoOpen, exSearch, exStartdate, exEnddate}
})



// 추천인 목록
export const referrerInfo = defineStore('referrerInfo',() => {
    const referrerList = ref([]);
    const referrerShowList = ref([]);
        // 수정 모달창
    const editOpen = ref(false)
    // 유저 추가 모달창
    const createOpen = ref(false)

    // 총 인원수
    const total = ref('');
     // 현재 페이지
    const page = ref(1);
    // 추천인 상세보기 페이지 
    const referrerPage = ref(1);
    // 추천인 상세보기 토탈
    const referrerTotal = ref('');
     // 추천인 상세보기 검색
    const referrerSearch = ref('');
      // 페이지당 데이터 갯수
    const perPage = ref(10);
    // 검색 데이터
    const search = ref(''); 
    // 시작날짜
    const startdate = ref('')
    // 종료날짜
    const enddate = ref('')
    // 엑셀 검색 키워드
    const exSearch = ref('');
    // 엑셀시작날짜
    const exStartdate = ref('')
    // 엑셀종료날짜
    const exEnddate = ref('')

    // 페이지 토탈 
    const totalPageCount = computed(() => {
      return Math.ceil(total.value / perPage.value);
    })

      // 추천인 상세페이지 토탈 
    const referrerTotalPageCount = computed(() => {
      return Math.ceil(referrerTotal.value / perPage.value);
    })
    // 유저 메모 모달창
    const memoOpen = ref(false)

    async function referrerApi() {
      try {
            const response = await $fetcher(useRuntimeConfig().public.backendUrl + "/api/admin/referrer", {
            method: "get",
            params:{
                page: page.value,
                q: search.value,
                startdate: startdate.value,
                enddate: enddate.value,
                itemsPerPage: perPage.value
            },
            headers: {
                // 'Accept': 'application/json',
                // 'Content-type': 'application/json',
                // 'Cookie' : getCookie('gongzime_session'),
            },
            credentials: 'include',
            }); 
            referrerList.value = response.data;
            page.value = response.current_page;
            total.value = response.total;
            return response;
        } catch (error) {
            if ([401, 419].includes(error?.response?.status)) return null;
            throw error;
        }
    }

    async function referrerShow(id) {
      try {
            const response = await $fetcher(useRuntimeConfig().public.backendUrl + '/api/admin/referrer/show', {
            method: "get",
            params:{
                referrer:id,
                page: referrerPage.value,
                q: referrerSearch.value,
                itemsPerPage: perPage.value
            },
            headers: {
                // 'Accept': 'application/json',
                // 'Content-type': 'application/json',
                // 'Cookie' : getCookie('gongzime_session'),
            },
            credentials: 'include',
            }); 
            referrerShowList.value = response.data;
            referrerPage.value = response.current_page;
            referrerTotal.value = response.total;
            return response;
        } catch (error) {
            if ([401, 419].includes(error?.response?.status)) return null;
            throw error;
        }
    }



    return{ referrerList, referrerApi, editOpen, createOpen, total, page, search, startdate, enddate, perPage, totalPageCount, memoOpen, exSearch, exStartdate, exEnddate,
         referrerShowList, referrerShow, referrerPage,referrerTotal, referrerSearch, referrerTotalPageCount}
})


    // 
export const districtsInfo = defineStore('districtsInfo',() => {
    const districtsList = ref([]);
        // 수정 모달창
    const editOpen = ref(false)
    // 유저 추가 모달창
    const createOpen = ref(false)

    // 총 인원수
    const total = ref('');
     // 현재 페이지
    const page = ref(1);
      // 페이지당 데이터 갯수
    const perPage = ref(10);
    // 시도
    const state = ref('');
    // 선거구
    const election = ref('');
    // 시군구
    const city = ref('');
    // 읍면동
    const district = ref('');

    // 검색 데이터
    const search = ref(''); 
    // 시작날짜
    const startdate = ref('')
    // 종료날짜
    const enddate = ref('')
    // 엑셀 검색 키워드
    const exSearch = ref('');
    // 엑셀시작날짜
    const exStartdate = ref('')
    // 엑셀종료날짜
    const exEnddate = ref('')

    // 페이지 토탈 
    const totalPageCount = computed(() => {
      return Math.ceil(total.value / perPage.value);
    })
    // 유저 메모 모달창
    const memoOpen = ref(false)



    async function districtsApi() {
      try {
            const response = await $fetcher(useRuntimeConfig().public.backendUrl + "/api/admin/districts", {
            method: "get",
            params:{
                page: page.value,
                itemsPerPage: perPage.value,
                state: state.value,
                election: election.value,
                city: city.value,
                district: district.value
            },
            headers: {
                // 'Accept': 'application/json',
                // 'Content-type': 'application/json',
                // 'Cookie' : getCookie('gongzime_session'),
            },
            credentials: 'include',
            });
            districtsList .value = response.data;
            page.value = response.meta.current_page;
            total.value = response.meta.total;
            return response;
        } catch (error) {
            if ([401, 419].includes(error?.response?.status)) return null;
            throw error;
        }
    }

    return{ districtsList, districtsApi, editOpen, createOpen, total, page, search, startdate, enddate, perPage, totalPageCount, memoOpen, exSearch, exStartdate, exEnddate, state, district, election, city }
})


// 국가 select
export const districts = defineStore('districts', ()=> {
const stateData = ref('선택');
const electionData = ref('선택');
const cityData = ref('선택');
const districtIdData = ref('선택')
const districtId = ref('');
const states = ref([]);
const elections = ref([]);
const cities = ref([]);
const districts = ref([]);
const update = ref({
    district:{
        state: null,
        election: null,
        city: null,
        id: null
    }

})

 async function getState() {
        try {
            const response = await $fetcher(useRuntimeConfig().public.backendUrl + '/api/auth/register', {
            method: "get",
            // body: formData,
            headers: {
                // 'Accept': 'application/json',
                // 'Content-type': 'multipart/form-data; boundary=<calculated when request is sent>',
                // 'Content-type': 'application/json',
            },
            credentials: 'include',
            });
            states.value = response.data.states
            return response
        } catch (error) {
            if ([401, 419].includes(error?.response?.status)) return null;
            throw error;
        }
    }

     async function getCity() {
        try {
            const response = await $fetcher(useRuntimeConfig().public.backendUrl + '/api/admin/elections-cities', {
            method: "get",
            params:{
                state: stateData.value
            },
            headers: {
                // 'Accept': 'application/json',
                // 'Content-type': 'multipart/form-data; boundary=<calculated when request is sent>',
                // 'Content-type': 'application/json',
            },
            credentials: 'include',
            });
            elections.value = response.elections
            cities.value = response.cities
            return response
        } catch (error) {
            if ([401, 419].includes(error?.response?.status)) return null;
            throw error;
        }
    }
    async function getDistrict() {
        if(electionData.value == '선택') {
            electionData.value = ''
        } else if(cityData.value == '선택'){
            cityData.value = ''
        }
            try {
                const response = await $fetcher(useRuntimeConfig().public.backendUrl + '/api/districts', {
                method: "get",
                params:{
                    state: stateData.value,
                    election: electionData.value,
                    city: cityData.value
                },
                headers: {
                    // 'Accept': 'application/json',
                    // 'Content-type': 'multipart/form-data; boundary=<calculated when request is sent>',
                    // 'Content-type': 'application/json',
                },
                credentials: 'include',
                });
                districts.value = response
                return response
            } catch (error) {
                if ([401, 419].includes(error?.response?.status)) return null;
                throw error;
            }
    }

return{stateData,electionData,cityData,districtIdData,states,elections,cities,districts,getState,getCity, getDistrict, districtId, update }
})


// 지역 수정
export const districtsEdit = defineStore('districtsEdit', ()=> {
const stateData = ref('선택');
const electionData = ref('선택');
const cityData = ref('선택')
const districtIdData = ref('선택')
const districtId = ref('');
const states = ref([]);
const elections = ref([]);
const cities = ref([]);
const districts = ref([]);

 async function getState() {
        try {
            const response = await $fetcher(useRuntimeConfig().public.backendUrl + '/api/auth/register', {
            method: "get",
            // body: formData,
            headers: {
                // 'Accept': 'application/json',
                // 'Content-type': 'multipart/form-data; boundary=<calculated when request is sent>',
                // 'Content-type': 'application/json',
            },
            credentials: 'include',
            });
            states.value = response.data.states
            return response
        } catch (error) {
            if ([401, 419].includes(error?.response?.status)) return null;
            throw error;
        }
    }

    async function getCity() {
        try {
            const response = await $fetcher(useRuntimeConfig().public.backendUrl + '/api/admin/elections-cities', {
            method: "get",
            params:{
                state: stateData.value
            },
            headers: {
                // 'Accept': 'application/json',
                // 'Content-type': 'multipart/form-data; boundary=<calculated when request is sent>',
                // 'Content-type': 'application/json',
            },
            credentials: 'include',
            });
            cities.value = response.cities
            elections.value = response.elections
            return response
        } catch (error) {
            if ([401, 419].includes(error?.response?.status)) return null;
            throw error;
        }
    }
    async function getDistrict() {
            try {
                const response = await $fetcher(useRuntimeConfig().public.backendUrl + '/api/districts', {
                method: "get",
                params:{
                    state: stateData.value,
                    city: cityData.value,
                },
                headers: {
                    // 'Accept': 'application/json',
                    // 'Content-type': 'multipart/form-data; boundary=<calculated when request is sent>',
                    // 'Content-type': 'application/json',
                },
                credentials: 'include',
                });
                districts.value = response
                return response
            } catch (error) {
                if ([401, 419].includes(error?.response?.status)) return null;
                throw error;
            }
    }

return{stateData,electionData ,cityData,districtIdData,states, elections,cities,districts,getState,getCity, getDistrict,districtId }
})









    export const defectionsInfo = defineStore('defectionsInfo',() => {
    // 카테고리 리스트
    const categoryList = ref([]);
    async function categoryApi () {
        const response =  await axios.get('http://ec2-13-209-67-110.ap-northeast-2.compute.amazonaws.com/api/categories')
        categoryList.value= response.data.data
        total.value = response.data.total
    }
     // 총 공지 갯수
    const total = ref('');
     // 현재 페이지
    const page = ref(1);
      // 페이지당 데이터 갯수
    const perPage = ref(10);
    // 검색 데이터
    const search = ref(''); 
    // 시작날짜
    const startdate = ref('')
    // 종료날짜
    const enddate = ref('')
    // 페이지 토탈 
    const totalPageCount = computed(() => {
      return Math.ceil(total.value / perPage.value);
    })
    // 카테고리 수정 모달창
    const editOpen = ref(false)
    // 카테고리 추가 모달창
    const createOpen = ref(false)
    

   
    return { categoryList, categoryApi, page, perPage, search,totalPageCount, editOpen, startdate, enddate, createOpen}
})

