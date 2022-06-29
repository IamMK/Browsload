<script setup lang="ts">
import { defineProps, computed } from "vue";

const props = defineProps({
  type: { type: String, required: true },
  parent: { type: String, required: true },
  modificator: { type: String, required: false },
});

const buttonClass = computed(() => {
  return `${props.parent}__${props.type}${
    props.modificator
      ? " " + props.parent + "__" + props.type + "--" + props.modificator
      : ""
  }`;
});
</script>

<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>

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
