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
    <progress
      :value="progress.percent"
      max="100"
      class="dialog_progressbar"
    ></progress>
  </base-dialog>
</template>

<script>
import { useAppStore } from "@/store";
export default {
  setup() {
    const appStore = useAppStore();

    return {
      progress: appStore.progress,
    };
  },
};
</script>
