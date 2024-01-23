import CustomButton from '@components/common/CustomButton'
import { colType } from '@components/common/CustomTable/Table'
import StatusButton from '@components/common/StatusButton'

import {
  actions_participation,
  charity_from_who,
  charity_help_type,
  charity_types,
} from '../static.data'
import { ImamInstructionInterface } from '@src/types/detailHeaderTypes'
import { fromImamFn } from '@utils/helper'

export const imamThesisCols: colType[] = [
  {
    field: 'tesis_title',
    headerName: 'Mavzu',
    minWidth: 150,
    width: 150,
  },
  {
    field: 'created_at',
    headerName: 'Sana',
    minWidth: 150,
    width: 150,
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 150,
    width: 150,

    renderCell: (item) => <StatusButton status={item?.state} />,
  },
]

const publicPrayers = [
  { name: 'dawn', label: 'Bomdod' },
  { name: 'midday', label: 'Peshin' },
  { name: 'afternoon', label: 'Asr' },
  { name: 'sunset', label: 'Shom' },
  { name: 'night', label: 'Xufton' },
]

export const imamPublicCols: colType[] = [
  {
    field: 'created_at',
    headerName: 'Sana',
    minWidth: 150,
    width: 150,
  },
  ...publicPrayers?.map(({ label, name }) => ({
    field: name,
    headerName: label,
    minWidth: 150,
    width: 150,

    renderCell: (item) => {
      const statusId = item?.prayer?.find((item) => item?.name === name) ? 1 : 2

      return (
        <CustomButton
          height="30px"
          value={['Qatnashdi', 'Qatnashmadi'][statusId - 1]}
          bgColor={
            [
              'var(--transparent-success-16, rgba(34, 197, 94, 0.16))',
              ' var(--Light-error, #FFE4DE)',
            ][statusId - 1]
          }
          color={['#118D57', '#B71D18'][statusId - 1]}
        />
      )
    },
  })),
]

export const imamInstructionCols: colType[] = [
  {
    field: 'title',
    headerName: 'Mavzu',
    minWidth: 200,
    width: 200,
    renderCell: (item: ImamInstructionInterface) => item.direction.title ?? '',
  },
  {
    field: 'from',
    headerName: 'Qayerdan',
    minWidth: 200,
    width: 200,
    renderCell: (item) => fromImamFn(item),
  },
  {
    field: 'to',
    headerName: 'Turi',
    minWidth: 200,
    width: 200,
    renderCell: (item: ImamInstructionInterface) =>
      item.direction.types == '1'
        ? "Ma'lumot uchun"
        : item.direction.types == '2'
          ? 'Ijro uchun'
          : '' ?? '',
  },
  {
    field: 'data',
    headerName: 'Muddati',
    minWidth: 200,
    width: 200,
    renderCell: (item: ImamInstructionInterface) => item.direction.from_date,
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 200,
    width: 200,

    renderCell: (item: ImamInstructionInterface) => <StatusButton status={item.state} />,
  },
]

export const imamPrayersCols = [
  {
    field: 'direction_title',
    headerName: 'Mavzu',
    minWidth: 200,
    width: 200,
    renderCell: (item: ImamInstructionInterface) => item?.direction?.title ?? '',
  },
  {
    field: 'date_to',
    headerName: 'Sanasi',
    minWidth: 200,
    width: 200,
    renderCell: (item: ImamInstructionInterface) => item?.direction?.title ?? '',
  },
  {
    field: 'status',
    headerName: 'Statusi',
    minWidth: 200,
    width: 200,
    renderCell: (item: ImamInstructionInterface) => item.direction?.title ?? '',
  },
]

export const imamActivitiesNikohCols = [
  {
    field: 'title',
    headerName: 'Mahr',
    minWidth: 200,
    width: 200,
    renderCell: (item) => item?.mahr ?? '',
  },
  {
    field: 'date',
    headerName: 'Sana',
    minWidth: 200,
    width: 200,
    renderCell: (item) => item?.date ?? '',
  },
]

export const imamActivitiesJanozaCols = [
  {
    field: 'title',
    headerName: 'Sana',
    minWidth: 200,
    width: 200,
    renderCell: (item) => item?.date ?? '',
  },
]

export const imamActivitiesWeddingCols = [
  {
    field: 'title',
    headerName: 'Sarlavha',
    minWidth: 200,
    width: 200,
    renderCell: (item) => item?.title ?? '',
  },
  {
    field: 'types',
    headerName: 'Turi',
    minWidth: 200,
    width: 200,
    renderCell: (item) => item?.types == 1 ? 'Nikoh' : item?.types == 2 ? 'Aqiqa - Sunnat' : 'Shukrona' ?? '',
  },
  {
    field: 'date',
    headerName: 'Sana',
    minWidth: 200,
    width: 200,
    renderCell: (item) => item?.date ?? '',
  },
]

export const imamActivitiesCeremonyCols = [
  {
    field: 'title',
    headerName: 'Sarlavha',
    minWidth: 200,
    width: 200,
    renderCell: (item) => item?.title ?? '',
  },
  {
    field: 'types',
    headerName: 'Turi',
    minWidth: 200,
    width: 200,
    renderCell: (item) => item?.types == '1' ? "Janoza" : 'Azaga oid' ?? '',
  },
  {
    field: 'date', 
    headerName: 'Sana',
    minWidth: 200,
    width: 200,
    renderCell: (item) => item?.date ?? '',
  },
]

export const imamActivitiesMavludCols = [
  {
    field: 'title',
    headerName: 'Sarlavha',
    minWidth: 200,
    width: 200,
    renderCell: (item) => item?.title ?? '',
  },
  {
    field: 'date',
    headerName: 'Sana',
    minWidth: 200,
    width: 200,
    renderCell: (item) => item?.date ?? '',
  },
]

export const imamCharityCols = [
  {
    field: 'summa',
    headerName: 'Summa',
    minWidth: 200,
    width: 200,
    renderCell: (item) => item?.summa ?? '',
  },
  {
    field: 'types',
    headerName: 'Turi',
    minWidth: 200,
    width: 200,
    renderCell: (item) => {
      let x = charity_types.find((g) => g.id == item?.types)

      return x?.label || ''
    },
  },
  {
    field: 'help_type',
    headerName: 'Yordam Turi',
    minWidth: 200,
    width: 200,
    renderCell: (item) => {
      let x = charity_help_type.find((g) => g.id == item?.help_type)

      return x?.label || ''
    },
  },
  {
    field: 'from_who',
    headerName: 'Kimdan',
    minWidth: 200,
    width: 200,
    renderCell: (item) => {
      let x = charity_from_who.find((g) => g.id == item?.from_who)

      return x?.label || ''
    },
  },
  {
    field: 'date',
    headerName: 'Sana',
    minWidth: 200,
    width: 200,
    renderCell: (item) => item?.date ?? '',
  },
]

export const imamCharityActionsCols = [
  {
    field: 'types',
    headerName: 'Turi',
    minWidth: 200,
    width: 200,
    renderCell: (item) => {
      let x = actions_participation.find((g) => g.id == item?.types)

      return x?.label || ''
    },
  },
  {
    field: '',
    headerName: 'Ishtirok',
    minWidth: 200,
    width: 200,
    renderCell: (item) => {
      let x = actions_participation.find((g) => g.id == item?.participant)

      return x?.label || ''
    },
  },
  {
    field: 'help_type',
    headerName: 'Yordam Turi',
    minWidth: 200,
    width: 200,
    renderCell: (item) => {
      let x = charity_help_type.find((g) => g.id == item?.help_type)

      return x?.label || ''
    },
  },
  {
    field: 'from_who',
    headerName: 'Kimdan',
    minWidth: 200,
    width: 200,
    renderCell: (item) => {
      let x = charity_from_who.find((g) => g.id == item?.from_who)

      return x?.label || ''
    },
  },
  {
    field: 'date',
    headerName: 'Sana',
    minWidth: 200,
    width: 200,
    renderCell: (item) => item?.date ?? '',
  },
]
