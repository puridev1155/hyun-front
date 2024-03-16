<template>
    <div class="min-h-[15rem] flex flex-col bg-white border shadow-sm">
      <div class="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
        <div class="flex justify-center">
          <div :class="`animate-spin inline-block w-${props.size} h-${props.size} border-[6px] border-current border-t-transparent text-purple-700 rounded-full role='status' aria-label='loading'`">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
    </template>

<script setup>
const props = defineProps({
  size: {
    type: Number,
    required: true,
  },
})
</script>