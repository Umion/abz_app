<script setup lang="ts">
import type { ErrorObject } from '@vuelidate/core'
import { ref } from 'vue'

const props = defineProps<{
  error?: ErrorObject
}>()
const emit = defineEmits<{
  (e: 'update:modelValue', target: File): void
}>()

const file = ref<File | null>(null)

const update = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target && target.files?.length) {
    file.value = target.files[0]
    emit('update:modelValue', target.files[0])
  }
}
</script>

<template lang="pug">
label.fileinput(:class="{fileinput__error: !!error}")
  input.fileinput__field(
    type="file"
    accept="image/jpeg, image/jpg"
    @change="update($event)"
  )
  .fileinput__btn Upload
  .fileinput__name(:class="{active: !!file?.name}") {{ file?.name || 'Upload your photo' }}
  .fileinput__details(v-if="props.error") {{ props.error.$message }}

</template>

<style lang="scss">
.fileinput {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  cursor: pointer;

  &__field {
    display: none;
  }

  &__error .fileinput__btn,
  &__error .fileinput__name {
    border: 2px solid $error;
  }
  &__error .fileinput__name {
    border-left: none;
  }
  &__error .fileinput__details {
    color: $error;
  }

  &__btn {
    padding: 14px 15px;
    border: 1px solid $black;
    border-radius: 4px 0 0 4px;
  }
  &__name {
    color: $darkgrey;
    flex-grow: 1;
    padding: 14px 15px;
    border: 1px solid $lightgrey;
    border-left: none;
    border-radius: 0 4px 4px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &.active {
      color: $black;
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
