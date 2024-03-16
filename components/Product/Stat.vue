<template>
<div>
                 <p class="text-sm font-medium leading-6 text-gray-400">{{ stat.name }}</p>
                 <p class="mt-1 flex items-baseline gap-x-2">
                   <span class="text-3xl font-bold from-purple-600 to-blue-600 bg-gradient-to-r bg-clip-text text-transparent">{{ stat.value }}</span>
                   <span v-if="stat.unit" class="text-sm text-gray-400">{{ stat.unit }}</span>
                 </p>
</div>
</template>
<script setup>
  // props 데이터 받아오기  (postId)
const props = defineProps({
  stat: {
    type: Object,
    required: true,
  },
});

const { stat } = props;

</script>