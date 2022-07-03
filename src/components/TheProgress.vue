<script setup lang="ts">
import { useAppStore } from "@/store";
import { storeToRefs } from "pinia";
import BaseDialog from "@/components/UI/BaseDialog.vue";

const { progress } = storeToRefs(useAppStore());
</script>

<template>
  <base-dialog>
    <h3>Pobieranie w toku</h3>
    <section class="dialog__timing">
      <p class="dialog__paragraph">{{ progress.percent }}%</p>
      <p class="dialog__paragraph">{{ progress.speed }}kbps</p>
      <p class="dialog__paragraph">
        {{ progress.remaining.minutes }} minutes
        {{ progress.remaining.seconds }} seconds
      </p>
    </section>
    <progress :value="progress.percent" max="100" class="dialog__progressBar" />
  </base-dialog>
</template>

<style lang="scss">
.dialog__progressBar {
  width: 100%;
}
</style>
