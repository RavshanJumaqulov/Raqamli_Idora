export interface UserInterface {
  id: number
  username: string
  first_name: string
  last_name: string
  email: string
  role: string
  refresh: string
  access: string
}

export interface IProfile {
  id: 8
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

export interface IUserDetail {
  id: number
  username: string
  role: string | number
  email: string
  profil: IProfile
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
