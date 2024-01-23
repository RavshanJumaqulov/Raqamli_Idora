import { colType } from '@components/common/CustomTable/Table'

export const PARTICIPANTS_OPTIONS = [
  { name: 'Yoshlar', id: 1 },
  { name: 'Xotin-qizlar', id: 2 },
  { name: 'Erkaklar', id: 3 },
  { name: 'Qariyalar', id: 4 },
  { name: 'Aralash', id: 5 },
]

export const TYPES_OPTIONS = [
  { name: "Ijtimoiy ma'naviy muhit", id: 1 },
  { name: 'Jinoyatchilikni oldini olish', id: 2 },
  { name: "O'z joniga qasd qilishni oldini olish", id: 3 },
  { name: 'Tarbiyaviy axloqiy', id: 4 },
  { name: 'Boshqa', id: 5 },
]

export const COLS: colType[] = [
  {
    field: 'imam',
    headerName: 'Imom',
    renderCell: (row) => row?.imam?.name,
  },
  {
    field: 'participants',
    headerName: 'Ishtirokchilar',
    renderCell: (row) => PARTICIPANTS_OPTIONS.find((item) => item.id == row?.participants).name,
  },
  {
    field: 'types',
    headerName: 'Turi',
    renderCell: (row) => TYPES_OPTIONS.find((item) => item.id == row?.types).name,
  },
  {
    field: 'date',
    headerName: 'Muddati',
  },
]
