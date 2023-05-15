import { defHttp } from '@/utils/axios'
import { PositionsResponseModel, TokenResponseModel, UserCreatedResponse, UsersResponseModel } from './model'

enum Api {
  GET_TOKEN = '/api/v1/token',
  GET_USERS = '/api/v1/users',
  GET_POSITIONS = '/api/v1/positions'
}

export const apiGetToken = (): Promise<TokenResponseModel> => {
  return defHttp.get(Api.GET_TOKEN)
}

export const apiGetUsers = (link?: string | null): Promise<UsersResponseModel> => {
  return defHttp.get(link ? link : Api.GET_USERS)
}

export const apiCreateUser = (data: FormData): Promise<UserCreatedResponse> => {
  return defHttp.post(Api.GET_USERS, data, { headers: { 'Content-Type': 'multipart/form-data' } })
}

export const apiGetPositions = (): Promise<PositionsResponseModel> => {
  return defHttp.get(Api.GET_POSITIONS)
}