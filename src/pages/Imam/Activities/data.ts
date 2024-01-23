import {
  imamActivitiesCeremonyCols,
  imamActivitiesJanozaCols,
  imamActivitiesMavludCols,
  imamActivitiesNikohCols,
  imamActivitiesWeddingCols,
} from '@data/colsData/Imam'

export let URLs = [
  {
    id: 1,
    label: 'nikoh',
    url: 'marriage/list/',
    cols: imamActivitiesNikohCols,
  },
  {
    id: 2,
    label: 'janoza',
    url: 'death/list/',
    cols: imamActivitiesJanozaCols,
  },
  {
    id: 3,
    label: "to'y",
    url: 'wedding/list/',
    cols: imamActivitiesWeddingCols,
  },
  {
    id: 4,
    label: 'marosim',
    url: 'ceremony/list/',
    cols: imamActivitiesCeremonyCols,
  },
  {
    id: 5,
    label: 'mavlud',
    url: 'mavlud/list/',
    cols: imamActivitiesMavludCols,
  },
]

export const tabs = [
  { label: 'Nikoh', path: 'type', id: 1 },
  { label: 'Janoza', path: 'type', id: 2 },
  { label: "To'y", path: 'type', id: 3 },
  { label: 'Marosim', path: 'type', id: 4 },
  { label: 'Mavlud', path: 'type', id: 5 },
]
