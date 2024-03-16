<template>
    <div>
    </div>
</template>

<script setup>
import { state } from '../stores/index'
import axios from 'axios'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute();
const router = useRouter();
const store = state();

async function certifyFunc() {
    const response = await axios.get('https://api.koreacrps.com/api/decode', {
        params: {
            encodeData: route.query.EncodeData
        }
    });
    const info = response.data;

    store.birth = info.split(':')[10].slice(0, -1),
        store.phone = info.split(':')[18].slice(0, -1),
        store.gender = info.split(':')[12].slice(0, 1),
        store.name = info.split(':')[8].slice(0, -1),
        store.utf8name = info.split(':')[22],
        store.req_seq = info.split(':')[2].slice(0, -1),
        store.auth_type = info.split(':')[6].slice(0, -1),
        store.mobile_co = info.split(':')[16].slice(0, -1),

        change();
    return store.phone;
}
async function userCheckFunc() {
    const data = await certifyFunc();

    await axios.get(useRuntimeConfig().public.backendUrl + '/api/userCheck', {
        params: {
            phone: data
        }
    })
        .then((response) => {
            if (response.data.result == true) {
                router.replace({ name: "member-info" })
                return;
            } else {
                alert("이미 가입된 번호 입니다.");
                router.replace({ name: "index" })
                return;
            }
        })
        .catch(() => {
            alert("오류")
            router.replace({ name: "index" })
        })
}

function change() {
    store.name = decodeURIComponent(store.utf8name);
    return store.name;
}

onMounted(() => {
    userCheckFunc();
})


</script>
