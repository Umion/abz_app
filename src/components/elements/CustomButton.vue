<script setup lang="ts">
const props = defineProps<{
  label: string
  disabled?: boolean
}>()
const emit = defineEmits<{
  (e: 'submit'): void
}>()

const update = () => {
  if (!props.disabled) emit('submit')
}
</script>

<template lang="pug">
.button(
  :class="{disabled}"
  @click="update"
  ) {{ props.label }}
</template>

<style lang="scss">
.button {
  display: inline-block;
  font-size: 16px;
  line-height: 26px;
  min-width: 100px;
  padding: 4px 15px;
  background: $primary;
  transition: 0.3s;
  border-radius: 80px;
  cursor: pointer;
  text-align: center;

  &.disabled {
    background: $grey;
    color: $white;
    cursor: default;
  }

  &:not(.disabled):hover {
    background: $yellow;
  }
}
</style>
