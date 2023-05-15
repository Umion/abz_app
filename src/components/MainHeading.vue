<script setup lang="ts">
const props = defineProps<{
  title: string
}>()
</script>

<template lang="pug">
h1 {{ props.title }}
</template>

<style lang="scss">
h1 {
  font-size: 40px;
  line-height: 40px;
  text-align: center;
  margin-bottom: $mb-sm;
}
</style>
