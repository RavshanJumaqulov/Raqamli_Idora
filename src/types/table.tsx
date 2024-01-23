export type filterDataT = {
  label: string
  name: string
  width: string
  height: string
  number?: boolean
  date?: boolean
  time?: boolean
  year?: boolean
  double?: {
    firstValue: string
    secondValue: string
  }
  url?: string
  optionName?: string
  options?: { id: number; label: string }[]
  isPerson?: boolean
  noPagination?: boolean
  notDisabled: boolean
}

export type filterLayoutT = {
  defaultCount: number
  filters: filterDataT[]
}

export type filterNameTypes =
  | 'instructions'
  | 'mosques'
  | 'thesis'
  | 'imamThesis'
  | 'employees'
  | 'platformEmployees'
  | 'mosques'
  | 'orderResults'
  | 'thesisResults'
  | 'mosquesForRegion'
  | 'mosquesForDistrict'
  | 'publicPrayers'

export type customActionsT = { view?: boolean; edit?: boolean; delete?: boolean; add?: boolean }
