export type regionT = {
  id: number
  name: string
  district: districtT[]
}

export type districtT = {
  id: number
  name: string
  region: number
}
export type personT = any
