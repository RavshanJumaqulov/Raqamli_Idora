import { ROLES_OPTIONS } from '@data/employeesData'
import { Option } from '@src/types/types.common'
import { Dayjs } from 'dayjs'

export interface EmployeeForm {
  name: string
  surname: string
  last_name: string
  phone_number: string
  address: string
  image: File | string
  birth_date: Dayjs // '2024-01-06'
  graduated_year: Dayjs // '2024-01-06'
  education: Option // '1'
  graduated_univer: Option // '1'
  diploma_number: string
  academic_degree: Option // '1'
  mosque: Option
  // achievement: Option //  '1'
  nation: Option
  position: Option
  department: GetDepartments
}
export interface EmployeeBody {
  name: string
  surname: string
  last_name: string
  phone_number: string
  address: string
  image: File
  birth_date: string // '2024-01-06'
  education: string // '1'
  graduated_univer: string // '1'
  graduated_year: string // '2024-01-06'
  diploma_number: string
  academic_degree: string // '1'
  mosque: number
  // achievement: string //  '1'
  nation: string
  position: string
  department: string
}

export interface IEmployee {
  id: number
  name: string
  surname: string
  last_name: string
  phone_number: string
  address: string
  image: string
  gender: string
  position: Option
  nation: string
  birth_date: string
  education: string
  graduated_univer: Option
  graduated_year: string
  diploma_number: string
  academic_degree: string
  mosque: Option & {
    address: string
  }
  achievement: string
  socialmedia: []
  department: GetDepartments
}
export type GetDepartments = Option & {
  position: Option[]
}

export interface AccountForm {
  username: string
  email: string
  role: Option<(typeof ROLES_OPTIONS)[number]['id'], (typeof ROLES_OPTIONS)[number]['name']>
  region: Option
  district: Option
  profil: Option
  password: string
  password2: string
}
export interface AddAccountBody {
  username: string // 'string'
  email: string // 'user@example.com'
  role: string // '1'
  region: number
  district: number
  profil: number
  password: string // 'string'
  password2: string // 'string'
}

export interface IGetAccountById {
  id: number
  username: string
  role: string
  email: string
  profil: {
    id: number
    uuid: string
    name: string
    surname: string
    last_name: string
    phone_number: string
    address: string
    image: string
    birth_date: string
    gender: string
    education: string
    nation: string
    graduated_year: string
    diploma_number: string
    academic_degree: string
    achievement: string
    position: number
    graduated_univer: number
    mosque: number
  }
  region: {
    id: number
    name: string
  }
  district: {
    id: number
    name: string
    region: number
  }
}
export enum PositionTypes {
  Imom = 'Imom',
  Noib = 'Noib',
}
