<template>
  <footer class="footer">
    <p class="footer__paragraph">Made by MK&copy; 2022</p>
  </footer>
</template>

<style lang="scss">
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
  .footer {
    font-size: 16px;
  }
}
</style>
