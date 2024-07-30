import * as Yup from 'yup'

const PasswordSchema = Yup.object().shape({
    passwordLength: Yup.number()
      .min(4, 'Password must be at least 4 characters')
      .max(16, 'Password must be less than 16 characters')
      .required('Password Length is required'),
})

export default PasswordSchema