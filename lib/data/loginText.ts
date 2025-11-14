import type { LoginPageText } from '@/lib/types/loginText'
import { ROUTES } from '@/lib/constants/routes'

export const loginText: LoginPageText = {
  title: 'LOGIN',
  emailLabel: 'Email:',
  emailPlaceholder: 'Enter your email',
  passwordLabel: 'Password:',
  passwordPlaceholder: 'Enter your password',
  submitButton: 'Login',
  loading: 'Loading...',
  alternativeText: "Don't have an account?",
  alternativeLink: ROUTES.REGISTER,
  alternativeLinkText: 'Register',
}