<script setup lang="ts">
import type { UsersModel } from '@/api/users/model'

const props = defineProps<{
  user: UsersModel
}>()
</script>

<template lang="pug">
.card
  .card__img 
    img(:src="props.user.photo")
  .card__name {{ props.user.name }}
  .card__info
    .card__info-position {{ props.user.position }}
    .card__info-email {{ props.user.email }}
    .card__info-phone {{ props.user.phone }}
</template>

<style lang="scss">
.card {
  width: 370px;
  flex-shrink: 0;
  background: $white;
  border-radius: 10px;
  margin-bottom: 30px;
  padding: 20px;
  text-align: center;
  margin: 0 15px 30px;

  @media screen and (max-width: $size-xl) {
    width: 281px;
  }
  @media screen and (max-width: $size-lg) {
    width: 344px;
    margin: 0 8px 16px;
  }
  @media screen and (max-width: $size-md) {
    width: 328px;
    margin: 0 0 16px;
  }
  @media screen and (max-width: $size-md) {
    width: 100%;
    margin: 0 0 20px;
  }

  &__img {
    height: 70px;
    margin-bottom: 20px;

    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }

  &__name,
  &__info > div {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
