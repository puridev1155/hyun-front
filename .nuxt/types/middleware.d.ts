import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "auth" | "guest" | "member" | "unverified" | "verified"
declare module "/Users/sungjunahn/Documents/hyun-front-1/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}