import {state} from '../stores/index';
export default defineNuxtRouteMiddleware(() => {
  const store = state();
   if(store.$state.name === "" || store.$state.phone == ""){
     return navigateTo("page-not-found");
  }
});