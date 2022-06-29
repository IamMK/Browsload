<script setup lang="ts">
import TheProgress from "@/components/TheProgress.vue";
import TheForm from "@/components/TheForm.vue";

import { storeToRefs } from "pinia";
import { useAppStore } from "@/store";

const { error, downloadStatus } = storeToRefs(useAppStore());
</script>

<template>
  <main class="main">
    <h2 class="main__title">Wyszukaj Zlecenie</h2>
    <h3 v-if="error" class="form__error">Nieprawidłowy numer zlecenia</h3>
    <the-progress v-if="downloadStatus != 404 && downloadStatus != 0" />
    <the-form />
  </main>
</template>

<style lang="scss">
.main__title {
  font-weight: normal;
  font-size: 24px;
}
</style>
