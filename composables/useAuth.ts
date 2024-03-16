import { $fetch, FetchOptions, FetchError } from "ofetch";

//토큰 Property 
const CSRF_COOKIE = "XSRF-TOKEN"; 
const CSRF_HEADER = "X-XSRF-TOKEN";


export type User = {
  name: string;
  email?: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};


// Value is initialized in: ~/plugins/auth.ts
export const useUser = () => {
  return useState<User | undefined | null>("user", () => undefined);
};


export const useAuth = async () => {
  const router = useRouter();
  const user = useUser();

  const isLoggedIn = computed(() => !!user.value);

  async function refresh() {
    try {
      user.value = await fetchCurrentUser();
    } catch {
      user.value = null;

    }
  }

  async function login(credentials: LoginCredentials) {
    if (isLoggedIn.value) return;

    await $larafetch("/api/login", { method: "post", body: credentials });
    await refresh();
  }

  async function logout() {
    if (!isLoggedIn.value) return;

    await $fetcher("/api/auth/logout", { method: "get" });
    user.value = null;

    await router.push("/login");
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
    refresh,

  };
};

//User 불러오기
export const fetchCurrentUser = async () => {
  try {
    return await $larafetch<User>("/api/auth/user", {
      redirectIfNotAuthenticated: false,
    });
  } catch (error: any) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
};
