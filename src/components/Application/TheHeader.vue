<script setup lang="ts">
import LogoIcon from '@/assets/images/svg/LogoIcon.vue'
import CustomButton from '@/components/elements/CustomButton.vue'
</script>

<template lang="pug">
.header
  .container
    .header__content
      LogoIcon
      .header__links
        custom-button(label="Users")
        custom-button(label="Sign up")
</template>

<style lang="scss">
.header {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  background: #fff;
  box-shadow: 0 0px 15px -4px rgb(0 0 0 / 15%);
  z-index: 100;

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 13px 0;
  }

  &__links {
    display: flex;
    align-items: center;
    font-size: 14px;

    & div:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>
