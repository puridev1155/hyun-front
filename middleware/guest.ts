export default defineNuxtRouteMiddleware(async () => {
  const user = useUser();
  if (user.value) return navigateTo("/admin/user", { replace: true });
});
