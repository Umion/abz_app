<script setup lang="ts">
import { ref } from 'vue'
import TheHeader from '@/components/Application/TheHeader.vue'
import MainHeading from '@/components/MainHeading.vue'
import UserCard from '@/components/UserCard.vue'
import CustomButton from '@/components/elements/CustomButton.vue'
import TextInput from '@/components/elements/TextInput.vue'
import RadioButton from '@/components/elements/RadioButton.vue'
import FileInput from '@/components/elements/FileInput.vue'
import CustomLoader from '@/assets/images/svg/CustomLoader.vue'
import SuccessImage from '@/assets/images/svg/SuccessImage.vue'
import { useRules } from '@/composable/useRules'
import { useVuelidate } from '@vuelidate/core'

import { onMounted, computed } from 'vue'
import { usersStore } from '@/stores/users'
import { authStore } from '@/stores/auth'
import { apiCreateUser } from './api/users'

const isRegistered = ref<boolean>(false)
const isLoading = ref<boolean>(false)

const store = usersStore()
const auth = authStore()
const rules = useRules()
const v$ = useVuelidate(rules.registrationRules, store.getForm)

const submit = () => {
  v$.value.$validate()
  if (!v$.value.$errors.length && store.getForm.position && store.getForm.avatar) {
    isLoading.value = true
    const formData = new FormData()
    formData.append('name', store.getForm.name)
    formData.append('email', store.getForm.email)
    formData.append('phone', store.getForm.phone)
    formData.append('position_id', store.getForm.position.toString())
    formData.append('photo', store.getForm.avatar)

    apiCreateUser(formData)
      .then(() => {
        isRegistered.value = true
        store.loadUsers()
      })
      .catch((error) => {
        if (error.response.data.message) alert(error.response.data.message)
      })
      .finally(() => {
        isLoading.value = false
      })
  }
}

const isDisabled = computed(() => {
  return !store.getForm.email || !store.getForm.name || !store.getForm.phone
})

onMounted(() => {
  auth.init()
  store.init()
})
</script>

<template lang="pug">
the-header
.content
  .content__main
    .content__main-info
      main-heading(
        title="Test assignment for front-end developer"
        style="margin-bottom: 20px;"  
      )
      p What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving.
      custom-button(
        label="Sign up"
      )
  .container
    
    main-heading(title="Working with GET request")
    .content__list
      user-card(
        v-for="user in store.getUsers"
        :key="user.id"
        :user="user"
      )
    .content__btn
      custom-button(
        v-if="store.getLinks.next_url"
        label="Show more"
        @submit="store.loadUsers(store.getLinks.next_url)"
      )
    .content__form(v-if="!isRegistered")
      main-heading(title="Working with POST request")
      form.registration
        text-input(
          v-model:value="store.getForm.name"
          label="Your name"
          :error-message="v$.name.$error && v$.name.$errors[0].$message"
        )
        text-input(
          v-model:value="store.getForm.email"
          label="Email"
          :error-message="v$.email.$error && v$.email.$errors[0].$message"
        )
        text-input(
          v-model:value="store.getForm.phone"
          label="Phone"
          prompt="+38(XXX)XXX-XX-XX"
          :error-message="v$.phone.$error && v$.phone.$errors[0].$message"
        )
        .registration__position
          radio-button(
            v-for="position in store.getPositions"
            :key="position.id"
            v-model="store.getForm.position"
            :value="position.id"
            :label="position.name"
            :checked="position.id === store.getForm.position"
            name="position"
          )
        .registration__file
          file-input(
            v-model="store.getForm.avatar"
            :error="v$.avatar.$error && v$.avatar.$errors[0]"
          )

        .registration__btn 
          custom-loader(v-if="isLoading")
            
          custom-button(
            v-else
            label="Sign up"
            :disabled="isDisabled"
            @submit="submit"
          )
    .content__form-success(v-else)
      main-heading(title="User successfully registered")
      success-image

</template>

<style lang="scss" scoped>
.content {
  padding: 0 0 100px;

  &__main {
    display: none;
    padding-top: 60px;
    height: 710px;
    background: url('@/assets/images/background.jpg') no-repeat;
    background-size: cover;
    margin-bottom: $mb-lg;
    display: flex;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: $size-lg) {
      height: 560px;
    }

    &-info {
      width: 380px;
      color: $white;
      text-align: center;

      p {
        margin-bottom: 32px;
      }
      .button {
        color: $black;
      }
    }
  }

  &__list {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -15px 50px;

    @media screen and (max-width: $size-md) {
      margin: 0 0 50px;
    }
  }
  &__btn {
    margin-bottom: 140px;
    text-align: center;
  }
  &__form-success {
    text-align: center;
  }
}
.registration {
  width: 100%;
  max-width: 328px;
  margin: 0 auto;

  &__position,
  &__file {
    margin-bottom: 50px;
  }

  &__btn {
    text-align: center;
  }
}
</style>
