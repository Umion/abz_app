<script setup lang="ts">
const props = defineProps<{
  value: number | null
  label: string
  name: string
  checked: boolean
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', target: string): void
}>()

const update = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target) emit('update:modelValue', target.value)
}
</script>

<template lang="pug">
label.checkbox 
  input.checkbox__field(
    type="radio"
    :name="props.name"
    :value="props.value"
    :checked="checked"
    @change="update($event)"
  )
  .checkbox__icon
  .checkbox__label {{ label }}

</template>

<style lang="scss">
.checkbox {
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  &__field {
    display: none;

    &:checked + .checkbox__icon {
      border: 1px solid $secondary;

      &::before {
        display: block;
      }
    }
  }
  &__icon {
    position: relative;
    width: 20px;
    height: 20px;
    border-radius: 50px;
    border: 1px solid $lightgrey;
    margin-right: 12px;

    &::before {
      content: '';
      position: absolute;
      width: 10px;
      height: 10px;
      background: $secondary;
      border-radius: 50%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: none;
    }
  }
}
</style>
