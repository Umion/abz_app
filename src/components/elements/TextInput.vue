<script setup lang="ts">
import type { Ref } from 'vue'

const props = defineProps<{
  value: string
  label: string
  prompt?: string
  errorMessage?: string | Ref<string> | boolean
}>()
const emit = defineEmits<{
  (e: 'update:value', target: string): void
}>()

const update = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  if (target) emit('update:value', target.value)
}
</script>

<template lang="pug">
.form(:class="{form__error: !!errorMessage}")
  .input
    input.input__field(
      placeholder=" "
      :value="value"
      @input="update($event)"
    )
    label.input__label {{ label }}
  .input__details(v-if="props.errorMessage || props.prompt") {{ props.errorMessage || props.prompt }}
</template>

<style lang="scss">
.form {
  width: 100%;
  max-width: 328px;
  margin-bottom: 50px;

  &__error .input {
    color: $error;
    border: 2px solid $error;
  }
  &__error .input__label,
  &__error .input__details {
    color: $error;
  }
}
.input {
  position: relative;
  border-radius: 4px;
  border: 1px solid $lightgrey;

  &__label {
    color: $darkgrey;
    font-size: 16px;
    line-height: 26px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    padding: 3px;
    background: $bg-color;
    transition: 0.2s ease all;
    -moz-transition: 0.2s ease all;
    -webkit-transition: 0.2s ease all;
  }

  &__field {
    font-size: 16px;
    line-height: 26px;
    display: block;
    width: 100%;
    padding: 14px 16px;
    background: $bg-color;
    color: #323840;
    border: 1px solid transparent;
    border-radius: 4px;
    box-sizing: border-box;

    &:focus {
      outline: none;

      & ~ .input__label {
        top: 0px;
        font-size: 12px;
        line-height: 14px;
      }
    }

    &:not(:placeholder-shown) ~ .input__label {
      top: -0px;
      font-size: 12px;
      line-height: 14px;
    }
  }

  &__details {
    position: absolute;
    top: 100%;
    left: 0;
    min-height: 15px;
    width: 100%;
    padding-left: 16px;
    font-size: 12px;
    line-height: 14px;
    color: $darkgrey;
  }
}
</style>
