<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
  <div class="flex flex-1 flex-col justify-center px-6 lg:px-8 min-h-screen from-purple-800 to-blue-800 bg-gradient-to-r">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="@/assets/images/pivot.png" alt="Your Company" />
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <slot />
    </div>
    <h2 class="mt-20 text-center text-sm font-bold leading-9 tracking-tight text-white">PIVOT CMS MANAGEMENT 2023</h2>
  </div>
</template>
