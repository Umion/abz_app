interface CustomValidationComposition {
  phoneValidation: (value: string) => boolean
  emailValidation: (value: string) => boolean
  imageSizeValidation: (file: File) => boolean
  imagePropertiesValidation: (file: File) => Promise<unknown>
}

export function useValidate(): CustomValidationComposition {

  const phoneValidation = (value: string): boolean => {
    return /^[\+]{0,1}380([0-9]{9})$/.test(value) // eslint-disable-line
  }

  const emailValidation = (value: string): boolean => {
    return /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/.test(value)  // eslint-disable-line
  }

  const imageSizeValidation = (file: File): boolean => {
    const size = Math.round((file.size / 1024));
    return size < 5000
  }

  const imagePropertiesValidation = async (file: File): Promise<unknown> => {
    const img = new Image()
    const promise = new Promise((resolve, reject) => {
      img.onload = () => {
        resolve((img.width > 70 && img.height > 70));
      };
      img.onerror = reject;
    });
    img.src = window.URL.createObjectURL(file)

    return promise;
  }

  return {
    phoneValidation,
    emailValidation,
    imageSizeValidation,
    imagePropertiesValidation
  }
}