import { defineStore } from "pinia";

import { appStore } from "./app/index";

export const useAppStore = defineStore("appStore", appStore);
