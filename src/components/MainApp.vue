<template>
  <main class="main">
    <h2 class="main__title">Wyszukaj Zlecenie</h2>
    <h3 v-if="appStore.error" class="form__error">
      Nieprawidłowy numer zlecenia
    </h3>
    <the-progress
      v-if="appStore.downloadStatus != 404 && appStore.downloadStatus != 0"
    ></the-progress>
    <the-form></the-form>
  </main>
</template>

<script>
import { useAppStore } from "@/store";

import TheProgress from "@/components/TheProgress.vue";
import TheForm from "@/components/TheForm.vue";

export default {
  components: {
    TheProgress,
    TheForm,
  },
  setup() {
    const appStore = useAppStore();

    return {
      appStore,
    };
  },
};
</script>

<style lang="scss">
.main__title {
  font-weight: normal;
  font-size: 24px;
}
</style>
