interface DefaultResponseModel {
  [key: string]: any
}

export interface UsersResponseModel extends DefaultResponseModel {
  data: UsersResponseDataModel
}

export interface UsersResponseDataModel {
  count: number
  links: UsersResponseLinksModel
  page: number
  success: boolean
  total_pages: number
  total_users: number
  users: UsersModel[]
}

export interface UsersResponseLinksModel {
  next_url: string | null
  prev_url: string | null
}

export interface UsersModel {
  email: string
  id: number
  name: string
  phone: string
  photo: string
  position: string
  position_id: number
  registration_timestamp: number
}

export interface PositionsResponseModel extends DefaultResponseModel {
  data: PositionsResponseDataModel
}

export interface PositionsResponseDataModel {
  success: boolean
  positions: PositionModel[]
}

export interface PositionModel {
  id: number
  name: string
}

export interface UserCreatedResponse {
  success: boolean
  user_id: number,
  message: string
}

export interface TokenResponseModel extends DefaultResponseModel {
  data: GetTokenResponse
}

export interface GetTokenResponse {
  success: boolean
  token: string
}


