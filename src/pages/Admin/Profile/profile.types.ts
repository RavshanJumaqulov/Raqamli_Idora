import { Dayjs } from 'dayjs'

export interface ProfileForm {
  name: string
  surname: string
  last_name: string
  phone_number: string
  address: string
  birth_date: Dayjs
  email: string
  login: string
  password: string
  image: string
}

export interface SocialForm {
  social_media: {id: number, name: string},
  link: string,
}

export interface ISocial {
  employee: number,
  id: number,
  link: string,
  social_media: string
}