import type { IUser } from './models'

export interface ICredentials {
  email: string
  password: string
}

export interface ILoginResponse {
  user: IUser
  token: string
}

export interface IBaseErrorResponse {
  message: string
}

export interface IAuthToken {
  user: IUser
  exp: number
  iat: number
}
