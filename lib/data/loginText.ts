import type { LoginPageText } from '@/lib/types/loginText'
import { ROUTES } from '@/lib/constants/routes'

export const loginText: LoginPageText = {
  title: 'Login',
  emailLabel: 'Email',
  passwordLabel: 'Password',
  submitButton: 'Login',
  loading: 'Loading...',
  alternativeText: "Don't have an account?",
  alternativeLink: ROUTES.REGISTER,
  alternativeLinkText: 'Register',
}