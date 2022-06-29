<template>
  <section class="dialog">
    <slot />
  </section>
</template>

<style lang="scss">
.dialog {
  display: flex;
  flex-direction: column;
  width: 550px;
  margin: auto;
  &__timing {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}
</style>
