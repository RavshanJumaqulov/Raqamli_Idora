import {
  ActivitiesIcon,
  ActivityIcon,
  CharityActionsIcon,
  CharityEventsIcon,
  IbodatlarIcon,
  InitiativesIcon,
  InstructionsIcon,
  PromotionalIcon,
  StaticIcon,
} from '@components/icons/icons'
import { SidebarItemsTypes } from '@src/types/SidebarTypes'

export const imomSideBarItems: SidebarItemsTypes[] = [
  {
    label: 'Statistika',
    icon: <StaticIcon />,
    link: 'stats',
    key: '/stats',
  },
  {
    label: 'Ibodatlar',
    icon: <IbodatlarIcon />,
    link: 'prayers/list?type=1',
    key: '/prayers',
    child: [
      {
        label: 'Jamoat namozi',
        link: 'prayers/list?type=1',
        key: '?type=3',
      },
      {
        label: 'Juma namozi',
        link: 'prayers/list?type=2',
        key: '?type=2',
      },
      {
        label: 'Hayit namozi',
        link: 'prayers/list?type=3',
        key: '?type=3',
      },
    ],
  },
  {
    label: "Ko'rsatmalar",
    icon: <InstructionsIcon />,
    link: 'instructions/list?type=1',
    key: '/instructions/',
    child: [
      {
        label: 'Qarorlar',
        link: 'instructions/list?type=1',
        key: '?type=1',
      },
      {
        label: 'Buyruqlar',
        link: 'instructions/list?type=2',
        key: '?type=2',
      },
      {
        label: 'Dasturlar',
        link: 'instructions/list?type=3',
        key: '?type=3',
      },
      {
        label: 'Xatlar',
        link: 'instructions/list?type=4',
        key: '?type=4',
      },
      {
        label: 'Topshiriqlar',
        link: 'instructions/list?type=5',
        key: '?type=5',
      },
    ],
  },
  {
    label: 'Diniy tadbirlar',
    icon: <ActivitiesIcon />,
    link: 'activities/list?type=1',
    key: '/activities',
    child: [
      {
        label: 'Nikoh',
        link: 'activities/list?type=1',
        key: '?type=1',
      },
      {
        label: 'Janoza',
        link: 'activities/list?type=2',
        key: '?type=2',
      },
      {
        label: "To'y",
        link: 'activities/list?type=3',
        key: '?type=3',
      },
      {
        label: 'Marosim',
        link: 'activities/list?type=4',
        key: '?type=4',
      },
      {
        label: 'Mavlud',
        link: 'activities/list?type=5',
        key: '?type=5',
      },
    ],
  },
  {
    label: "Targ'ibot tadbirlari",
    // label: "Ma'naviy-marifiy targ'ibot tadbirlari",
    icon: <PromotionalIcon />,
    link: 'promotions/neighborhood/list',
    key: '/promotions',
    child: [
      {
        label: 'Mahallalar',
        link: 'promotions/neighborhood/list',
        key: 'neighborhood',
      },
      {
        label: 'Tashkilotlar',
        link: 'promotions/organizations/list',
        key: 'organizations',
      },
      {
        label: 'Yakka tartibdagi',
        // label: 'Yakka tartibdagi suhbatlar',
        link: 'promotions/conversations/list',
        key: 'conversations',
      },
      {
        label: 'Oilaviy nizolar',
        link: 'promotions/family-conflicts/list',
        key: 'family-conflicts',
      },
      {
        label: 'Diniy masalalar',
        // label: "Diniy masalalar bo'yicha maslahatlar",
        link: 'promotions/advice/list',
        key: 'advice',
      },
      {
        label: 'Jamoat tadbirlari',
        link: 'promotions/public-events/list',
        key: 'public-events',
      },
    ],
  },
  {
    label: 'Ilmiy ijodiy faoliyat',
    icon: <ActivityIcon />,
    link: 'activity/list?type=1',
    key: '/activity',
    child: [
      {
        label: 'Maqola',
        link: 'activity/list?type=1',
        key: '?type=1',
      },
      {
        label: 'Kitob',
        link: 'activity/list?type=2',
        key: '?type=2',
      },
    ],
  },
  {
    label: 'Xayriya tadbirlari',
    icon: <CharityEventsIcon />,
    link: 'charity-events',
    key: '/charity-events',
  },
  {
    label: 'Xayriya aksiyalari',
    icon: <CharityActionsIcon />,
    link: 'charity-actions',
    key: '/charity-actions',
  },
  {
    label: 'Tashabbuslar',
    icon: <InitiativesIcon />,
    link: 'initiatives',
    key: '/initiatives',
  },
]
