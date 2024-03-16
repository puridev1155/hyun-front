import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "adminlayout" | "app-layout" | "default"
declare module "/Users/sungjunahn/Documents/hyun-front-1/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}