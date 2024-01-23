import { mosqueHeatingFuelOptions, mosqueHeatingTypeOptions } from '@data/mosqueData'
import { ACADEMIC_DEGREE_OPTIONS, EDUCATION_OPTIONS } from '@src/constants'
import { districtT, regionT } from '@src/types'
import { filterLayoutT } from '@src/types/table'
import { Option } from '@src/types/types.common'

export const filters = {
  instructions: {
    defaultCount: 5,
    filters: [
      {
        height: '38px',
        width: '220px',
        label: 'Viloyat',
        name: 'region',
        optionName: 'name',
        url: 'common/regions',
      },
      {
        height: '38px',
        label: 'Tuman / shahar',
        name: 'district',
        width: '220px',
      },
      {
        label: 'Sana',
        name: 'date',
        double: true,
        date: true,
        width: '200px',
        height: '38px',
      },
      {
        label: 'Turi',
        name: 'type',
        width: '200px',
        height: '38px',
        options: [
          {
            id: 1,
            label: 'Malumot uchun',
          },
          {
            id: 2,
            label: 'Ijro uchun',
          },
        ],
      },
    ],
  } as filterLayoutT,
  // @ts-ignore
  thesis: {
    defaultCount: 4,
    filters: [
      {
        label: 'Sana',
        name: 'date',
        width: '200px',
        height: '38px',
        double: true,
        date: true,
      },
    ],
  } as filterLayoutT,
  imamThesis: {
    defaultCount: 5,
    filters: [
      {
        label: 'Sana',
        name: 'date',
        width: '200px',
        height: '38px',
        double: true,
        date: true,
      },
      {
        label: 'Status',
        name: 'status',
        width: '200px',
        height: '38px',
        options: [
          {
            id: 1,
            label: 'Kutilmoqda',
          },
          {
            id: 2,
            label: 'Qabul qilindi',
          },
          {
            id: 3,
            label: 'Bajarildi',
          },
          {
            id: 4,
            label: 'Bajarilmadi',
          },
        ],
      },
    ],
  } as filterLayoutT,
  employees: {
    defaultCount: 5,
    filters: [
      {
        height: '38px',
        width: '220px',
        label: 'Viloyat',
        name: 'region',
        optionName: 'name',
        url: 'common/regions',
      },
      {
        height: '38px',
        label: 'Tuman / shahar',
        name: 'district',
        width: '220px',
      },
      {
        label: 'Bitirgan yili',
        name: 'graduatedYear',
        height: '38px',
        width: '220px',
        year: true,
      },
      {
        label: 'Talim',
        name: 'education',
        width: '200px',
        height: '38px',
        options: EDUCATION_OPTIONS.map((item) => ({ id: item?.id, label: item?.name })),
      },
      {
        label: 'Darajasi',
        name: 'degree',
        width: '200px',
        height: '38px',
        options: ACADEMIC_DEGREE_OPTIONS.map((item) => ({ id: item?.id, label: item?.name })),
      },
      {
        label: 'Talim muassasi',
        name: 'graduated_univer',
        width: '200px',
        height: '38px',
        url: 'employee/university',
        optionName: 'name',
        noPagination: true,
      },
      {
        label: "Yoshi bo'yicha",
        name: 'age',
        height: '38px',
        width: '220px',
        double: true,
        number: true,
      },
    ],
  } as filterLayoutT,
  platformEmployees: {
    defaultCount: 5,
    filters: [
      {
        height: '38px',
        width: '220px',
        label: 'Viloyat',
        name: 'region',
        optionName: 'name',
        url: 'common/regions',
      },
      {
        height: '38px',
        label: 'Tuman / shahar',
        name: 'district',
        width: '220px',
      },
      {
        label: 'Roli',
        name: 'role',
        width: '200px',
        height: '38px',
        options: [
          {
            id: 2,
            label: 'Viloyat boshqarmasi',
          },
          {
            id: 3,
            label: 'Tuman boshqarmasi',
          },
          {
            id: 4,
            label: 'Imom',
          },
          {
            id: 5,
            label: 'Noib',
          },
        ],
      },
      {
        height: '38px',
        width: '220px',
        label: 'Masjid',
        name: 'mosque',
        optionName: 'name',
        url: 'mosque/list',
      },
    ],
  } as filterLayoutT,
  mosques: {
    defaultCount: 5,
    filters: [
      {
        height: '38px',
        width: '220px',
        label: 'Viloyat',
        name: 'region',
        optionName: 'name',
        url: 'common/regions',
      },
      {
        height: '38px',
        label: 'Tuman / shahar',
        name: 'district',
        width: '220px',
      },
      {
        label: 'Masjid turi',
        name: 'mosque_type',
        width: '200px',
        height: '38px',
        options: [
          {
            id: 1,
            label: 'Jome',
          },
          {
            id: 2,
            label: 'Mahalliy',
          },
        ],
      },
      {
        label: 'Masjid holati',
        name: 'mosque_status',
        width: '200px',
        height: '38px',
        options: [
          {
            id: 1,
            label: 'Yaxshi',
          },
          {
            id: 2,
            label: 'Tamir talab',
          },
          {
            id: 3,
            label: 'Qayta qurish kerak',
          },
        ],
      },
      {
        label: 'Masjid isitish tizimi',
        name: 'mosque_heating_type',
        width: '200px',
        height: '38px',
        options: mosqueHeatingTypeOptions,
      },
      {
        label: 'Masjid isitish tizimi turi',
        name: 'mosque_heating_fuel',
        width: '200px',
        height: '38px',
        options: mosqueHeatingFuelOptions,
      },
    ],
  } as filterLayoutT,
  // mosquesForRegion: {
  //   defaultCount: 5,
  //   filters: [
  //     // {
  //     //   height: '38px',
  //     //   width: '220px',
  //     //   label: 'Viloyat',
  //     //   name: 'region',
  //     //   optionName: 'name',
  //     //   url: 'common/regions',

  //     // },
  //     {
  //       height: '38px',
  //       label: 'Tuman / shahar',
  //       name: 'district',
  //       width: '220px',
  //       optionName: 'name',
  //       url: `common/districts`,
  //       notDisabled: true
  //     },
  //     {
  //       label: 'Masjid turi',
  //       name: 'mosque_type',
  //       width: '200px',
  //       height: '38px',
  //       options: [
  //         {
  //           id: 1,
  //           label: 'Mahalliy',
  //         },
  //         {
  //           id: 2,
  //           label: 'Jome',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Masjid holati',
  //       name: 'mosque_status',
  //       width: '200px',
  //       height: '38px',
  //       options: [
  //         {
  //           id: 1,
  //           label: 'Yaxshi',
  //         },
  //         {
  //           id: 2,
  //           label: 'Tamir talab',
  //         },
  //         {
  //           id: 3,
  //           label: 'Qayta qurish kerak',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Masjid isitish tizimi',
  //       name: 'mosque_heating_type',
  //       width: '200px',
  //       height: '38px',
  //       options: mosqueHeatingTypeOptions,
  //     },
  //     {
  //       label: 'Masjid isitish tizimi turi',
  //       name: 'mosque_heating_fuel',
  //       width: '200px',
  //       height: '38px',
  //       options: mosqueHeatingFuelOptions,
  //     },
  //   ],
  // } as filterLayoutT,
  mosquesForDistrict: {
    defaultCount: 5,
    filters: [
      // {
      //   height: '38px',
      //   width: '220px',
      //   label: 'Viloyat',
      //   name: 'region',
      //   optionName: 'name',
      //   url: 'common/regions',

      // },
      // {
      //   height: '38px',
      //   label: 'Tuman / shahar',
      //   name: 'district',
      //   width: '220px',
      //   optionName: 'name',
      //   url: `common/districts`,
      //   notDisabled: true
      // },
      {
        label: 'Masjid turi',
        name: 'mosque_type',
        width: '200px',
        height: '38px',
        options: [
          {
            id: 1,
            label: 'Mahalliy',
          },
          {
            id: 2,
            label: 'Jome',
          },
        ],
      },
      {
        label: 'Masjid holati',
        name: 'mosque_status',
        width: '200px',
        height: '38px',
        options: [
          {
            id: 1,
            label: 'Yaxshi',
          },
          {
            id: 2,
            label: 'Tamir talab',
          },
          {
            id: 3,
            label: 'Qayta qurish kerak',
          },
        ],
      },
      {
        label: 'Masjid isitish tizimi',
        name: 'mosque_heating_type',
        width: '200px',
        height: '38px',
        options: mosqueHeatingTypeOptions,
      },
      {
        label: 'Masjid isitish tizimi turi',
        name: 'mosque_heating_fuel',
        width: '200px',
        height: '38px',
        options: mosqueHeatingFuelOptions,
      },
    ],
  } as filterLayoutT,
  orderResults: {
    defaultCount: 5,
    filters: [
      {
        height: '38px',
        width: '220px',
        label: 'Viloyat',
        name: 'region',
        optionName: 'name',
        url: 'common/regions',
      },
      {
        height: '38px',
        label: 'Tuman / shahar',
        name: 'district',
        width: '220px',
      },
      {
        label: 'Status',
        name: 'status',
        width: '200px',
        height: '38px',
        options: [
          {
            id: 1,
            label: 'Kutilmoqda',
          },
          {
            id: 2,
            label: 'Qabul qilindi',
          },
          {
            id: 3,
            label: 'Bajarildi',
          },
          {
            id: 4,
            label: 'Bajarilmadi',
          },
        ],
      },
      {
        height: '38px',
        width: '220px',
        label: 'Masjid',
        name: 'mosque',
        optionName: 'name',
        url: 'mosque/list',
      },
    ],
  } as filterLayoutT,
  thesisResults: {
    defaultCount: 5,
    filters: [
      {
        height: '38px',
        width: '220px',
        label: 'Viloyat',
        name: 'region',
        optionName: 'name',
        url: 'common/regions',
      },
      {
        height: '38px',
        label: 'Tuman / shahar',
        name: 'district',
        width: '220px',
      },
      {
        label: 'Status',
        name: 'status',
        width: '200px',
        height: '38px',
        options: [
          {
            id: 1,
            label: 'Kutilmoqda',
          },
          {
            id: 2,
            label: 'Qabul qilindi',
          },
          {
            id: 3,
            label: 'Bajarildi',
          },
          {
            id: 4,
            label: 'Bajarilmadi',
          },
        ],
      },
      {
        height: '38px',
        width: '220px',
        label: 'Masjid',
        name: 'mosque',
        optionName: 'name',
        url: 'mosque/list',
      },
    ],
  } as filterLayoutT,

  // imam
  publicPrayers: {
    defaultCount: 1,
    filters: [
      {
        height: '38px',
        width: '220px',
        label: 'Imom',
        name: 'imam',
        optionName: 'name',
        isPerson: true,
        url: 'auth/accounts/?types=2&role=4',
      },
    ],
  } as filterLayoutT,
}

export const defaultFilterData = {
  instructions: {
    region: null as regionT,
    date: {
      from: '',
      to: '',
    },
    type: null,
    district: null as districtT,
  },
  thesis: {
    date: {
      from: '',
      to: '',
    },
  },
  employees: {
    region: null as regionT,
    district: null as districtT,
    education: null as Option,
    degree: null as Option,
    graduatedYear: null,
    age: {
      from: null,
      to: null,
    },
    graduated_univer: null,
  },
  platformEmployees: {
    region: null as regionT,
    district: null as districtT,
    role: null as Option,
    mosque: null,
  },
  mosques: {
    region: null as regionT,
    district: null as districtT,
    mosque_type: null as Option,
    mosque_status: null as Option,
    mosque_heating_type: null as Option,
    mosque_heating_fuel: null as Option,
  },
  // mosquesForRegion: {
  //   // region: null as regionT,
  //   district: null as districtT,
  //   mosque_type: null as Option,
  //   mosque_status: null as Option,
  //   mosque_heating_type: null as Option,
  //   mosque_heating_fuel: null as Option,
  // },
  mosquesForDistrict: {
    // region: null as regionT,
    // district: null as districtT,
    mosque_type: null as Option,
    mosque_status: null as Option,
    mosque_heating_type: null as Option,
    mosque_heating_fuel: null as Option,
  },
  orderResults: {
    region: null as regionT,
    district: null as districtT,
    status: null as Option,
    mosque: null,
  },
  thesisResults: {
    region: null as regionT,
    district: null as districtT,
    status: null as Option,
    mosque: null,
  },
  imamThesis: {
    status: null as Option,
    date: {
      from: '',
      to: '',
    },
  },
  publicPrayers: {
    imam: null,
  },
}
