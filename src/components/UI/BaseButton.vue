<template>
  <button :class="buttonClass">
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    type: { type: String, required: true },
    parent: { type: String, required: true },
    modificator: { type: String, required: false },
  },
  computed: {
    buttonClass(): string {
      return (
        this.parent +
        "__" +
        this.type +
        (this.modificator
          ? " " + this.parent + "__" + this.type + "--" + this.modificator
          : "")
      );
    },
  },
};
</script>

<style lang="scss">
.form {
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

    transition: 0.3s;
    &:hover {
      border-color: initial;
      cursor: pointer;
      box-shadow: 0px 5px 10px rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
