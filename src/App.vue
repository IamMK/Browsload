<template>
  <the-header></the-header>

  <main class="main">
    <h2 class="main__title">Wyszukaj Zlecenie</h2>
    <h3 v-if="appStore.error" class="form__error">
      Nieprawidłowy numer zlecenia
    </h3>
    <the-progress v-if="appStore.downloadStatus === 200"></the-progress>
    <div class="form">
      <div class="form__column">
        <input
          class="form__input"
          type="text"
          @keypress="isLetter($event)"
          v-model="appStore.orderNo"
          @click="clearErrors"
          @keyup="clearErrors"
          @keyup.enter="
            downloadItem({
              url: appStore.siteUrl + appStore.orderNo + '.zip',
              label: appStore.label,
            })
          "
        />
      </div>
      <button
        class="form__submit"
        @click.prevent="
          downloadItem({
            url: siteUrl + orderNo + '.zip',
            label: 'order.zip',
          })
        "
      >
        Pobierz
      </button>
    </div>
  </main>
  <footer class="footer">
    <p class="footer__paragraph">Made by MK&copy; 2022</p>
  </footer>
</template>

<script>
import { useAppStore } from "@/store";
import TheHeader from "./components/UI/TheHeader.vue";
import TheProgress from "./components/TheProgress.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    TheProgress,
  },
  setup() {
    const appStore = useAppStore();

    async function downloadItem({ url, label }) {
      const startTime = new Date().getTime();
      //   const that = this;

      const request = new XMLHttpRequest();

      request.responseType = "blob";
      request.open("get", url, true);
      request.send();

      request.onreadystatechange = function () {
        // if (this.readyState == 4) that.$data.download = true;
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
        if (appStore.downloadStatus != 404) {
          const percentComplete = Math.floor((e.loaded / e.total) * 100);

          const duration = (new Date().getTime() - startTime) / 1000;
          const bps = e.loaded / duration;

          const kbps = Math.floor(bps / 1024);

          const time = (e.total - e.loaded) / bps;
          const seconds = Math.floor(time % 60);
          const minutes = Math.floor(time / 60);

          console.log("dupa");

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
      // console.log(appStore.progress);
      appStore.error = false;
      // console.log(appStore.progress);
    }

    return {
      appStore,
      downloadItem,
      clearErrors,
    };
  },
  methods: {
    isLetter(e) {
      const keyCode = e.which;

      if (keyCode === 46) {
        return true;
      }

      if ((keyCode !== 8 || keyCode === 32) && (keyCode < 48 || keyCode > 57)) {
        e.preventDefault();
      }
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap");

* {
  box-sizing: border-box;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;

  padding: 0;
  margin: 0;
  background-color: #000;
  color: white;

  font-family: "Ubuntu";
  line-height: normal;
  text-align: center;
  mix-blend-mode: normal;
}

//jest

//jest
.page__title {
  font-weight: 100;
  font-size: 60px;
  letter-spacing: 5px;
  text-transform: uppercase;
}

//jest
.logo__image {
  width: 37.5%;
  object-fit: cover;
}

//jest
.main__title {
  font-weight: normal;
  font-size: 24px;
}

//jest
.form {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  //jest
  &__column {
    display: flex;
    flex-direction: column-reverse;
  }
  //jest
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

  //jest
  &__submit {
    background: #000;
    border-radius: 9px;
    text-decoration: none;

    font-weight: bold;
    font-size: 16px;
    text-align: center;
    border: solid #fff 1px;

    color: #ffffff;
    width: 250px;
    padding: 1em;
    // height: 48px;

    transition: 0.3s;
    &:hover {
      border-color: initial;
      cursor: pointer;
      box-shadow: 0px 5px 10px rgba(255, 255, 255, 0.5);
    }
  }
}

.footer {
  text-align: center;
  font-size: 24px;
  &__paragraph {
    margin: 0;
  }
}

@media all and (max-width: 1000px) {
  .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}

@media all and (max-width: 500px) {
  .page__title {
    font-size: 30px;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    &__input {
      margin: 0;
      margin-bottom: 10px;
    }
  }

  .footer {
    font-size: 16px;
  }
}

@media all and (max-height: 500px) {
  .logo {
    display: none;
  }
}
</style>
