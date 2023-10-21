import * as yup from 'yup'

const REGEX_PASSWORD= /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z_.\-@]{8,}$/
const REGEX_ONLY_NUMBER = /^\d+$/
const REGEX_PHONE_NUMBER = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/

yup.addMethod<yup.StringSchema>(yup.string, 'password', function (
  message,
) {
  return this.matches(REGEX_PASSWORD, {
    message,
    excludeEmptyString: true,
  })
})

yup.addMethod<yup.StringSchema>(yup.string, 'onlyNumber', function (
  message,
) {
  return this.matches(REGEX_ONLY_NUMBER, {
    message,
    excludeEmptyString: true,
  })
})

yup.addMethod<yup.StringSchema>(yup.string, 'phoneNumber', function (
  message,
) {
  return this.matches(REGEX_PHONE_NUMBER, {
    message,
    excludeEmptyString: true,
  })
})

export default yup