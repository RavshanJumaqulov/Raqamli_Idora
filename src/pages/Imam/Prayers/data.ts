import { imamPublicCols, imamThesisCols } from '@data/colsData/Imam'

export const prayersData = [
  {
    id: 1,
    url: 'public_prayers/list/',
    cols: imamPublicCols,
  },
  {
    id: 2,
    url: 'friday_tesis/seen/list',
    cols: imamThesisCols,
  },
  {
    id: 3,
    url: 'friday_tesis/seen/list',
    cols: imamThesisCols,
  },
]

export type prayerItemT = {
  label: string
  id: number
  name: string
}

export type prayerT = {
  id: number
  imam: {
    id: number
    name: string
  }
  prayer: prayerItemT[]
  created_at: string
}
