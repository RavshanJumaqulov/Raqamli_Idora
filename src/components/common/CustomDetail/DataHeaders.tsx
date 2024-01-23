import {
  AdminPublicPrayerPrayerInterface,
  ImamFridayThesisInterface,
  ImamInstructionDetailType,
  ImomInstructionDetailInterface,
} from '@src/types/detailHeaderTypes'
import CustomButton from '../CustomButton'

export const imamInstructionDetailCols: ImamInstructionDetailType[] = [
  {
    field: 'title',
    headerName: 'Mavzu:',
    renderCell: (item: ImomInstructionDetailInterface) => item.title ?? '',
  },
  {
    field: 'type',
    headerName: 'Turi:',
    renderCell: (item: ImomInstructionDetailInterface) =>
      item.types == '1' ? "Ma'lumot uchun" : item.types == '2' ? 'Ijro uchun' : '' ?? '',
  },

  {
    field: 'date',
    headerName: 'Muddati',
    renderCell: (item: ImomInstructionDetailInterface) => item.from_date ?? '',
  },
  {
    field: 'data',
    headerName: 'Holati',
    renderCell: (item: ImomInstructionDetailInterface) => item.from_date ?? '',
  },
  {
    field: 'izoh',
    headerName: 'Izoh:',
    type: 'izoh',
    renderCell: (item: ImomInstructionDetailInterface) => item.comments ?? '',
  },
  {
    field: 'file',
    headerName: "Qo'llanma:",
    type: 'link',
    renderCell: (item: ImomInstructionDetailInterface) => item?.file?.[0]?.file ?? '',
  },
]

export const imamPrayersDetailLeftCols: ImamInstructionDetailType[] = [
  {
    field: 'title',
    headerName: 'Mavzu:',
    renderCell: (item: ImamFridayThesisInterface) => item.title ?? '',
  },
  {
    field: 'file',
    headerName: "Qo'llanma:",
    renderCell: (item: ImamFridayThesisInterface) => item.file ?? '',
    type: 'link',
  },
  {
    field: 'comments',
    headerName: 'Izoh:',
    renderCell: (item: ImamFridayThesisInterface) => item.file_comment ?? '',
    type: 'izoh',
  },
]

export const imamPrayersDetailRightCols: ImamInstructionDetailType[] = [
  {
    field: 'ilova',
    headerName: 'Ilova:',
    renderCell: (item: ImamFridayThesisInterface) => item.attachment ?? '',
    type: 'link',
  },
  {
    field: 'com',
    headerName: 'Izoh:',
    renderCell: (item: ImamFridayThesisInterface) => item.attachment_comment ?? '',
    type: 'izoh',
  },
]

export const adminPublicPrayersCols: ImamInstructionDetailType[] = [
  {
    field: "dawn",
    headerName: 'Bomdod:',
    renderCell: (item: AdminPublicPrayerPrayerInterface[]) => {
      return (
        <CustomButton
          height="30px"
          value={['Qatnashmadi', 'Qatnashdi'][item.filter(el => el.name == 'dawn').length]}
          bgColor={
            [
              ' var(--Light-error, #FFE4DE)',
              'var(--transparent-success-16, rgba(34, 197, 94, 0.16))',
            ][item.filter(el => el.name == 'dawn').length]
          }
          color={['#B71D18', '#118D57'][item.filter(el => el.name == 'dawn').length]}
        /> ?? ''
      )
    },
  },
  {
    field: 'midday',
    headerName: 'Peshin:',
    renderCell: (item: AdminPublicPrayerPrayerInterface[]) => {
      return (
        <CustomButton
          height="30px"
          value={['Qatnashmadi', 'Qatnashdi'][item.filter(el => el.name == 'midday').length]}
          bgColor={
            [
              ' var(--Light-error, #FFE4DE)',
              'var(--transparent-success-16, rgba(34, 197, 94, 0.16))',
            ][item.filter(el => el.name == 'midday').length]
          }
          color={['#B71D18', '#118D57'][item.filter(el => el.name == 'midday').length]}
        /> ?? ''
      )
    },
  },
  {
    field: 'afternoon',
    headerName: 'Asr:',
    renderCell: (item: AdminPublicPrayerPrayerInterface[]) => {
      return (
        <CustomButton
          height="30px"
          value={['Qatnashmadi', 'Qatnashdi'][item.filter(el => el.name == 'afternoon').length]}
          bgColor={
            [
              ' var(--Light-error, #FFE4DE)',
              'var(--transparent-success-16, rgba(34, 197, 94, 0.16))',
            ][item.filter(el => el.name == 'afternoon').length]
          }
          color={['#B71D18', '#118D57'][item.filter(el => el.name == 'afternoon').length]}
        /> ?? ''
      )
    },
  },
  {
    field: 'sunset',
    headerName: 'Shom:',
    renderCell: (item: AdminPublicPrayerPrayerInterface[]) => {
      return (
        <CustomButton
          height="30px"
          value={['Qatnashmadi', 'Qatnashdi'][item.filter(el => el.name == 'sunset').length]}
          bgColor={
            [
              ' var(--Light-error, #FFE4DE)',
              'var(--transparent-success-16, rgba(34, 197, 94, 0.16))',
            ][item.filter(el => el.name == 'sunset').length]
          }
          color={['#B71D18', '#118D57'][item.filter(el => el.name == 'sunset').length]}
        /> ?? ''
      )
    }
  },
  {
    field: "night",
    headerName: 'Xufton:',
    renderCell: (item: AdminPublicPrayerPrayerInterface[]) => {
      return (
        <CustomButton
          height="30px"
          value={['Qatnashmadi', 'Qatnashdi'][item.filter(el => el.name == 'night').length]}
          bgColor={
            [
              ' var(--Light-error, #FFE4DE)',
              'var(--transparent-success-16, rgba(34, 197, 94, 0.16))',
            ][item.filter(el => el.name == 'night').length]
          }
          color={['#B71D18', '#118D57'][item.filter(el => el.name == 'night').length]}
        /> ?? ''
      )
    }
  },

]
