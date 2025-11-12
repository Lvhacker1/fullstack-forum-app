export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  username: string
}

export interface AuthUser {
  id: string
  email: string
  username?: string
}