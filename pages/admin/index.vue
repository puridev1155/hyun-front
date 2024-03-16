<template>
  <div>
    <NuxtLayout name="adminlayout">
    <div class="flex flex-1 flex-col md:pl-64">
     <main class="flex-1">
        <div class="py-6">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <!-- Replace with your content -->
            <div class="py-4">
             
            </div>
            <!-- /End replace -->
          </div>
        </div>
      </main>
    </div>
    </NuxtLayout>
  </div>
</template>

<script setup>
definePageMeta({ middleware: ["auth"] });


</script>