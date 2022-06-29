<script setup lang="ts">
import { useAppStore } from "@/store";

import BaseButton from "@/components/UI/BaseButton.vue";
import axios from "axios";

const appStore = useAppStore();

const downloadItem = async (url: string, label: string) => {
  const startTime = new Date().getTime();

  axios
    .get(url, {
      responseType: "blob",
      onDownloadProgress: (progress) => {
        appStore.downloadStatus = 200;

        const percentComplete = Math.round(
          (progress.loaded / progress.total) * 100
        );

        const duration = (new Date().getTime() - startTime) / 1000;
        const bps = progress.loaded / duration;
        const kbps = Math.floor(bps / 1024);

        const time = (progress.total - progress.loaded) / bps;
        const seconds = Math.floor(time % 60);
        const minutes = Math.floor(time / 60);

        appStore.progress = {
          percent: percentComplete,
          speed: kbps,
          remaining: {
            minutes,
            seconds,
          },
        };
      },
    })
    .then((response) => {
      appStore.downloadStatus = response.status;
      const imageURL = window.URL.createObjectURL(response.data);
      const anchor = document.createElement("a");
      anchor.href = imageURL;
      anchor.download = label;
      document.body.appendChild(anchor);
      anchor.click();
    })
    .catch((error) => {
      appStore.downloadStatus = error.response.status;
      appStore.error = true;
    });
};

function clearErrors() {
  appStore.error = false;
}

function isLetter(e: KeyboardEvent) {
  const keyCode = e.which;

  console.log(e);

  if (keyCode === 46) {
    return true;
  }

  if (keyCode !== 8 && (keyCode < 48 || keyCode > 57)) {
    e.preventDefault();
  }
}
</script>

<template>
  <div class="form">
    <div class="form__column">
      <input
        class="form__input"
        type="text"
        @keypress="isLetter($event)"
        v-model="appStore.orderNo"
        @click="clearErrors"
        @keyup="clearErrors"
        @keyup.enter="downloadItem(appStore.url, appStore.label)"
      />
    </div>
    <base-button
      type="submit"
      parent="form"
      @click.prevent="downloadItem(appStore.url, appStore.label)"
    >
      Pobierz
    </base-button>
  </div>
</template>

<style lang="scss">
.form {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  &__column {
    display: flex;
    flex-direction: column-reverse;
  }
  &__input {
    border-radius: 9px;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);

    font-weight: 300;
    font-size: 16px;
    text-indent: 10px;
    color: #000;

    width: 250px;
    height: 48px;
    margin-right: 50px;
    transition: 0.1s;

    &:focus {
      border: 2px solid #232323;
    }

    &:focus:invalid {
      border: 2px solid #fffdfd;
    }

    &:focus:invalid + .form__label {
      visibility: visible;
    }
  }
}
</style>
