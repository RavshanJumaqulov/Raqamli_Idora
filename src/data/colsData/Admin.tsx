import { colType } from '@components/common/CustomTable/Table'
import { fromFn, toCapitalize, toFn, toRoleFn } from '@utils/helper'
import { ACADEMIC_DEGREE_OPTIONS, Education, GRADUATION_OPTIONS } from '../employeesData'

import StatusButton from '@components/common/StatusButton'
import { AdminPublicPrayerInterface } from '@src/types/detailHeaderTypes'

export const orderCols: colType[] = [
  {
    field: 'title',
    headerName: 'Nomi',
    minWidth: 240,
    width: 240,
  },
  {
    field: 'from',
    headerName: 'Qayerdan',
    minWidth: 230,
    width: 230,
    renderCell: (item) => fromFn(item),
  },
  {
    field: 'toRole',
    headerName: 'Kimlarga',
    minWidth: 200,
    width: 200,
    renderCell: (item) => toRoleFn(item),
  },
  {
    field: 'title',
    headerName: 'Qayerga',
    minWidth: 220,
    width: 220,
    renderCell: (item) => toFn(item),
  },
  {
    field: 'type',
    headerName: 'Turi',
    minWidth: 200,
    width: 200,
    renderCell: (item) =>
      item.types == '1' ? "Ma'lumot uchun" : item.types == '2' ? 'Ijro uchun' : '',
  },
  {
    field: 'data',
    headerName: 'Sanasi',
    minWidth: 250,
    width: 250,
    renderCell: (item) =>
      item?.to_date
        ? `${item?.created_at?.slice(0, 10)} - ${item?.to_date}`
        : item?.created_at?.slice(0, 10) ?? '',
  },
]

export const orderResultCols: colType[] = [
  {
    field: 'employee',
    headerName: 'Xodim',
    minWidth: 200,
    width: 200,
    renderCell: (item) => (item?.employee_last_name || '') + ' ' + (item?.employee_name || ''),
  },
  {
    field: 'created_at',
    headerName: 'Sana',
    minWidth: 180,
    width: 180,
  },
  {
    field: 'region',
    headerName: 'Viloyat',
    minWidth: 150,
    width: 150,
    renderCell: (item) => toCapitalize(item?.region),
  },
  {
    field: 'district',
    headerName: 'Tuman / shahar',
    minWidth: 150,
    width: 150,
    renderCell: (item) => toCapitalize(item?.district),
  },
  {
    field: 'mosque',
    headerName: 'Masjid',
    minWidth: 150,
    width: 150,
    renderCell: (item) => toCapitalize(item?.mosque),
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 150,
    width: 150,

    renderCell: (item) => <StatusButton status={item?.state} />,
  },
]

export const fridayThesisCols: colType[] = [
  {
    field: 'title',
    headerName: 'Mavzu',
    minWidth: 200,
    width: 200,
  },
  // {
  //   field: 'to_region',
  //   headerName: 'Hudud',
  //   minWidth: 200,
  //   width: 200,
  //   renderCell: (item) =>
  //     item.to_region.length > 1
  //       ? `${item.to_region[0]?.name} + ${item.to_region.length - 1}`
  //       : item.to_region[0]?.name || '',
  // },
  {
    field: 'data',
    headerName: 'Sanasi',
    minWidth: 200,
    width: 200,
    renderCell: (item) => item.created_at,
  },
  // {
  //   field: 'type',
  //   headerName: 'Turi',
  //   minWidth: 200,
  //   width: 200,
  //   renderCell: (item) =>
  //     item.types == '1' ? 'Juma uchun tezis' : item.types == '2' ? 'Hayit uchun uchun' : '',
  // },
]

export const thesisResultCols: colType[] = [
  {
    field: 'imam_name',
    headerName: 'Xodim',
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
    field: 'region',
    headerName: 'Viloyat',
    minWidth: 150,
    width: 150,
    renderCell: (item) => toCapitalize(item?.region),
  },
  {
    field: 'district',
    headerName: 'Tuman / shahar',
    minWidth: 150,
    width: 150,
    renderCell: (item) => toCapitalize(item?.district),
  },
  {
    field: 'mosque',
    headerName: 'Masjid',
    minWidth: 150,
    width: 150,
    renderCell: (item) => toCapitalize(item?.mosque),
  },
  {
    field: 'status',
    headerName: 'Status',
    minWidth: 150,
    width: 150,

    renderCell: (item) => <StatusButton status={item?.state} />,
  },
]

export const MasjidCols: colType[] = [
  {
    field: 'title',
    headerName: 'Nomi',
    minWidth: 220,
    width: 220,
    renderCell: (item) => item.name
  },
  {
    field: 'title',
    headerName: 'Manzil',
    minWidth: 260,
    width: 260,
    renderCell: (item) =>
      `${toCapitalize(item?.region?.name)}, ${toCapitalize(item?.district?.name)}`,
  },

  {
    field: 'mosque_type',
    headerName: 'Turi',
    minWidth: 100,
    width: 100,
    renderCell: (item) =>
      item.mosque_type == '1' ? 'Jome' : item.mosque_type == '2' ? 'Mahalliy' : '',
  },
  {
    field: 'mosque_status',
    headerName: 'Masjid holati',
    minWidth: 100,
    width: 200,
    renderCell: (item) =>
      item.mosque_type == '1'
        ? 'Yaxshi'
        : item.mosque_type == '2'
          ? 'Tamir talab'
          : item.mosque_type == '3'
            ? 'Qayta qurish kerak'
            : '',
  },
  {
    field: 'built_at',
    headerName: 'Qurilgan vaqt',
    minWidth: 100,
    width: 200,
  },
  {
    field: 'registered_at',
    headerName: "Ro'yxatdan o'tgan vaqt",
    minWidth: 150,
    width: 150,
  },
]

export const EmployeeCols: colType[] = [
  {
    field: 'title',
    headerName: 'Familya/Ism',
    minWidth: 200,
    width: 200,
    renderCell: (item: any) => `${item.last_name} ${item.name}`,
  },
  {
    field: '',
    headerName: "Ma'lumoti",
    minWidth: 100,
    width: 100,
    renderCell: (item) => {
      let education = Education.find((g) => g.id == item.education)

      if (education?.label) {
        return education?.label
      }
      return ''
    },
  },
  {
    field: 'title',
    headerName: 'Tugatgan muassasa',
    minWidth: 100,
    width: 220,
    renderCell: (item) => {
      let graduate = GRADUATION_OPTIONS.find((g) => g.id == item.graduated_univer)

      if (graduate?.label) {
        return graduate?.label
      }
      return ''
    },
  },
  {
    field: 'mosque_status',
    headerName: 'Akademik darajasi',
    minWidth: 100,
    width: 150,
    renderCell: (item) => {
      let academic_degree = ACADEMIC_DEGREE_OPTIONS.find((g) => g.id == item.academic_degree)

      if (academic_degree?.label) {
        return academic_degree?.label
      }
      return ''
    },
  },
  {
    field: 'title',
    headerName: 'Masjid nomi',
    minWidth: 150,
    width: 150,
    renderCell: (item) => toCapitalize(item?.mosque_name) || '-',
  },
]

export const platformEmployeeCols: colType[] = [
  {
    field: 'title',
    headerName: 'Familya/Ism',
    minWidth: 200,
    width: 200,
    renderCell: (item: any) => `${toCapitalize(item.last_name)} ${toCapitalize(item.name)}`,
  },
  {
    field: 'username',
    headerName: 'Login',
    minWidth: 100,
    width: 100,
  },
  {
    field: 'title',
    headerName: 'Masjid nomi',
    minWidth: 180,
    width: 180,
    renderCell: (item) => toCapitalize(item?.mosque) || '-',
  },
  {
    field: 'region_name',
    headerName: 'Viloyat',
    minWidth: 150,
    width: 150,
    renderCell: (item) => toCapitalize(item?.region_name),
  },
  {
    field: 'district_name',
    headerName: 'Tuman / shahar',
    minWidth: 150,
    width: 150,
    renderCell: (item) => toCapitalize(item?.district_name),
  },
  {
    field: 'role',
    headerName: 'Roli',
    minWidth: 180,
    width: 180,
    renderCell: (item: any) =>
      ['Viloyat boshqarmasi', 'Tuman / shahar boshqarmasi', 'Imom', 'Noib'][+item?.role - 2],
  },
]

export const publicPrayersCols: colType[] = [
  {
    field: 'title',
    headerName: 'Ismi',
    width: '70%',
    minWidth: 200,
    renderCell: (item: AdminPublicPrayerInterface) => item.imam.name
  },
  {
    field: 'sana',
    headerName: 'Sana',
    width: 100,
    minWidth: 200,
    renderCell: (item: AdminPublicPrayerInterface) => item.created_at.slice(0, 11)
  },

]