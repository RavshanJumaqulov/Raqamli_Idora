export const tabList = ['Masjid']

export const tabs = [
  { id: 1, label: 'Masjidlar', path: 'mosques' },
  { id: 2, label: "Imomi yo'q Masjidlar", path: 'mosques-without-imam' },
]

export const typesOfMosque = [
  { value: '1', label: 'Jome' },
  { value: '2', label: 'Mahalla' },
]

export const mosqueStatusOptions = [
  { label: 'Yaxshi', value: '1' },
  { label: "Ta'mir talab", value: '2' },
  { label: 'Qayta qurish kerak', value: '3' },
]
export const multiStoreyOptions = [
  { name: 'second_floor', label: '2 qavatli' },
  { name: 'third_floor', label: '3 qavatli' },
]

export const extraRoomsOptions = [
  { name: 'imam_room', label: 'Imomxona' },
  { name: 'sub_imam_room', label: 'Noibxona' },
  { name: 'mosque_library', label: 'Kutubxona' },
  { name: 'casher_room', label: 'Kassa' },
  { name: 'guard_room', label: 'Qorovulxona' },
  { name: 'other_room', label: 'Boshqa xonalar' },
]

export const mosqueHeatingTypeOptions = [
  { id: '1', label: 'Markazlashgan' },
  { id: '2', label: 'Mahalliy' },
]

export const mosqueHeatingFuelOptions = [
  { id: '1', label: 'Gaz' },
  { id: '2', label: "Suyuq yoqilg'i" },
  { id: '3', label: "Qattiq yoqilg'i" },
]

export const fireOptions = [
  {
    name: 'evacuation_road',
    label: 'Evakuatsiya chizmasi',
    type: '1',
    imgField: 'evacuation_road_image',
  },
  {
    name: 'fire_safety',
    label: "Yong'in xavfsizligi jihozlari",
    type: '2',
    imgField: 'fire_safe_image',
  },
  {
    name: 'fire_closet',
    label: "Yong'in xavfsizligi shkafi",
    type: '3',
    imgField: 'fire_closet_image',
  },
  {
    name: 'fire_signal',
    label: "Yong'indan xabardor qilish tizimi",
    type: '4',
    imgField: 'fire_signal_image',
  },
  {
    name: 'auto_fire_extinguisher',
    label: 'Avtomatik yong’in o’chirish qurilmasi',
    type: '5',
    imgField: 'auto_fire_extinguisher_image',
  },
  {
    name: 'emergency_exit_door',
    label: 'Favqulodda chiqish eshigi',
    type: '6',
    imgField: 'emergency_exit_door_image',
  },
]
