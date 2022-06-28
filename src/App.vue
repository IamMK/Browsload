<template>
  <the-header></the-header>
  <main-app></main-app>
  <the-footer></the-footer>
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import MainApp from "@/components/MainApp.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: "App",
  components: {
    TheHeader,
    MainApp,
    TheFooter,
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

.page__title {
  font-weight: 100;
  font-size: 60px;
  letter-spacing: 5px;
  text-transform: uppercase;
}

.logo__image {
  width: 37.5%;
  object-fit: cover;
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
}

@media all and (max-height: 500px) {
  .logo {
    display: none;
  }
}
</style>
