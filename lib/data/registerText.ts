import type { RegisterPageText } from '@/lib/types/registerText'
import { ROUTES } from '@/lib/constants/routes'

export const registerText: RegisterPageText = {
  title: 'REGISTER',
  usernameLabel: 'Username:',
  usernamePlaceholder: 'Choose a username',
  emailLabel: 'Email:',
  emailPlaceholder: 'Enter your email',
  passwordLabel: 'Password:',
  passwordPlaceholder: 'Create a password',
  submitButton: 'Register',
  loading: 'Loading...',
  alternativeText: 'Already have an account?',
  alternativeLink: ROUTES.LOGIN,
  alternativeLinkText: 'Login',
}