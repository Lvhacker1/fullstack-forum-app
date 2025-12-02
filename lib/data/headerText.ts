import type { HeaderText } from '@/lib/types/headerText'
import { ROUTES } from '@/lib/constants/routes'

export const headerText: HeaderText = {
  title: 'Community Forum',
  loginText: 'Login',
  loginLink: ROUTES.LOGIN,
  registerText: 'Register',
  registerLink: ROUTES.REGISTER,
  welcomeMessage: 'Welcome',
  logOutText: 'Log Out',
}