import { required, minLength, maxLength, helpers } from '@vuelidate/validators'
import { useValidate } from '@/composable/useValidate'

export function useRules() {
  const validations = useValidate()

  const registrationRules = {
    name: { required, minLength: minLength(2), maxLength: maxLength(60) },
    phone: {
      required,
      phoneValidation: helpers.withMessage(
        'Phone format must be: +38 (XXX)XXX-XX-XX',
        validations.phoneValidation
      )
    },
    email: {
      required,
      minLength: minLength(2),
      maxLength: maxLength(60),
      emailValidation: helpers.withMessage(
        'Type valid email',
        validations.emailValidation
      )

    },
    avatar: {
      required,
      imageSizeValidation: helpers.withMessage(
        'The photo size must not be greater than 5 Mb',
        validations.imageSizeValidation
      ),
      imagePropertiesValidation: helpers.withMessage(
        'Minimum size of photo 70x70px.',
        helpers.withAsync(validations.imagePropertiesValidation)
      )
    }
  }

  return {
    registrationRules,
  }
}