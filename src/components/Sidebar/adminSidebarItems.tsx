import {
  EmployeeIcon,
  FridayThesisIcon,
  InitiativesIcon,
  InstructionsIcon,
  MosqueIcon,
  SettingsIcon,
  StaticIcon,
} from '@components/icons/icons'
import { SidebarItemsTypes } from '@src/types/SidebarTypes'

export const adminSideBarItems: SidebarItemsTypes[] = [
  {
    label: 'Statistika',
    icon: <StaticIcon />,
    link: 'stats',
    key: '/stats',
  },
  {
    label: 'Juma tezislari',
    icon: <FridayThesisIcon />,
    link: 'friday-thesis/list?type=1',
    key: '/friday-thesis/',
  },
  {
    label: "Ko'rsatmalar",
    icon: <InstructionsIcon />,
    link: 'instructions/list?type=1',
    key: '/instructions/',
  },
  {
    label: 'Xodimlar',
    icon: <EmployeeIcon />,
    link: 'employee/list?type=1',
    key: '/employee/',
  },
  {
    label: 'Masjidlar',
    icon: <MosqueIcon />,
    link: 'mosques/list?type=1',
    key: '/mosques/',
  },
  {
    label: 'Sozlamalar',
    icon: <SettingsIcon />,
    link: 'settings',
    key: '/settings',
  },
  {
    label: 'Imomlar faoliyati',
    icon: <InitiativesIcon />,
    link: 'imam-activities',
    key: '/imam-activities',
    child: [
      {
        label: 'Ibodatlar',
        link: 'imam-activities/prayers/list',
        key: '',
      },
      {
        label: 'Diniy tadbirlar',
        link: 'imam-activities/activities/list?type=1',
        key: '?type=1',
      },
      // {
      //   label: "Targ'ibot tadbirlari",
      //   link: '',
      //   key: '',
      // },
      // {
      //   label: 'Ilmiy ijodiy faoliyat',
      //   link: '',
      //   key: '',
      // },
      {
        label: 'Xayriya tadbirlari',
        link: 'imam-activities/charity/list',
        key: '',
      },
      {
        label: 'Xayriya aksiyalari',
        link: 'imam-activities/charity-actions/list',
        key: '',
      },
      // {
      //   label: 'Tashabbuslar',
      //   link: '',
      //   key: '',
      // },
    ],
  },
]
