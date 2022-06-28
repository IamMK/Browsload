<template>
  <base-dialog>
    <h3>Pobieranie w toku</h3>
    <section class="dialog__timing">
      <p class="dialog__paragraph">{{ appStore.progress.percent }}%</p>
      <p class="dialog__paragraph">{{ appStore.progress.speed }}kbps</p>
      <p class="dialog__paragraph">
        {{ appStore.progress.remaining.minutes }} minutes
        {{ appStore.progress.remaining.seconds }} seconds
      </p>
    </section>
    <progress
      :value="appStore.progress.percent"
      max="100"
      class="dialog__progressBar"
    ></progress>
  </base-dialog>
</template>

<script>
import { useAppStore } from "@/store";
export default {
  setup() {
    const appStore = useAppStore();

    return {
      appStore,
    };
  },
};
</script>

<style lang="scss">
.dialog__progressBar {
  width: 100%;
}
</style>
