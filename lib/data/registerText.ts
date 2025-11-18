import type { RegisterPageText } from '@/lib/types/registerText'
import { ROUTES } from '@/lib/constants/routes'

export const registerText: RegisterPageText = {
  title: 'REGISTER',
  usernameLabel: 'Username',
  emailLabel: 'Email:',
  emailPlaceholder: 'Enter your email',
  passwordLabel: 'Password:',
  passwordPlaceholder: 'Enter your password',
  submitButton: 'Register',
  loading: 'Loading...',
  alternativeText: 'Already have an account?',
  alternativeLink: ROUTES.LOGIN,
  alternativeLinkText: 'Login',
}