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
      @click.prevent="downloadItem(appStore.url, appStorelabel)"
    >
      Pobierz
    </base-button>
  </div>
</template>

<script lang="ts">
import { useAppStore } from "@/store";

import BaseButton from "@/components/UI/BaseButton.vue";

interface Dupa extends EventTarget {
  keyCode: number;
  preventDefault(): boolean;
}

export default {
  components: {
    BaseButton,
  },
  setup() {
    const appStore = useAppStore();

    async function downloadItem(url: string, label: string) {
      const startTime = new Date().getTime();

      const request = new XMLHttpRequest();

      request.responseType = "blob";
      request.open("get", url, true);
      request.send();

      request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          appStore.downloadStatus = 200;
          const imageURL = window.URL.createObjectURL(this.response);
          const anchor = document.createElement("a");
          anchor.href = imageURL;
          anchor.download = label;
          document.body.appendChild(anchor);
          anchor.click();
        } else if (this.status == 404) {
          appStore.downloadStatus = 404;
          appStore.error = true;
        }
      };

      request.onprogress = function (e) {
        if (this.status != 404) {
          appStore.downloadStatus = 200;
          const percentComplete = Math.floor((e.loaded / e.total) * 100);

          const duration = (new Date().getTime() - startTime) / 1000;
          const bps = e.loaded / duration;

          const kbps = Math.floor(bps / 1024);

          const time = (e.total - e.loaded) / bps;
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
        }
      };
    }

    function clearErrors() {
      appStore.error = false;
    }
    return {
      appStore,
      downloadItem,
      clearErrors,
      label: appStore.label,
    };
  },
  methods: {
    isLetter(e: Dupa) {
      console.log(e.keyCode);

      const keyCode = e.keyCode;

      if (keyCode === 46) {
        return true;
      }

      if (keyCode !== 8 && (keyCode < 48 || keyCode > 57)) {
        e.preventDefault();
      }
    },
  },
};
</script>

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
