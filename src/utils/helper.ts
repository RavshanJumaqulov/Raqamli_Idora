import { Dayjs } from 'dayjs'

export const baseUrl = import.meta.env.VITE_BASE_URL.replace('/api/v1', '')

export const homePageUrl = '/stats'

export const getDayJsDay = (value: Dayjs) => {
  // const date = `${
  //   value.month()! + 1 > 9 ? value.month()! + 1 : '0' + (value?.month() + 1)
  // }/${value?.date()}/${value?.year()}`
  const date = `${value?.year()}-${
    value.month()! + 1 > 9 ? value.month()! + 1 : '0' + (value?.month() + 1)
  }-${value?.date()}`

  return date
}

interface IUser {
  id: number
  username: string
  first_name: string
  last_name: string
  role: string
}
export const getUser = (): IUser => JSON.parse(localStorage.getItem('user'))

export const extractFileNameFromUrl = (url: string) => {
  const pathSegments = url.split('/')
  return pathSegments[pathSegments.length - 1]
}

export function isBlob(value) {
  return value instanceof Blob
}

export function convertImageSourceToFileObject(
  imageSource: string,
  fileName: string
): Promise<File | null> {
  return new Promise((resolve) => {
    // Create an Image object
    const img = new Image()

    // Set the source of the image
    img.src = imageSource

    // Create a canvas element
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // Wait for the image to load
    img.onload = function () {
      // Set the canvas dimensions to match the image
      canvas.width = img.width
      canvas.height = img.height

      // Draw the image on the canvas
      ctx.drawImage(img, 0, 0)

      // Convert the canvas content to a Blob
      canvas.toBlob(function (blob) {
        if (blob) {
          // Create a File object
          const file = new File([blob], fileName, { type: 'image/png' })

          // Now 'file' is a JavaScript File object
          resolve(file)
        } else {
          resolve(null)
        }
      }, 'image/png')
    }
  })
}

export const toCapitalize = (str: string) =>
  str?.length > 0 ? str.charAt(0).toUpperCase() + str.slice(1) : ''

export const fromImamFn = (item) => {
  const roleId = +item?.direction?.from_role
  // const from = [item?.from_region, item?.from_district][roleId - 2]
  const place = ['Bosh boshqarma', 'Viloyat', 'Tuman / shahar'][roleId - 1] || ''

  return place
}

export const fromFn = (item) => {
  const roleId = +item.from_role
  const from = [item?.from_region, item?.from_district][roleId - 2]
  const place = ['Bosh boshqarma', 'Viloyat', 'Tuman / shahar'][roleId - 1] || ''

  return place + (place ? (roleId === 1 ? '' : ` (${toCapitalize(from || '')})`) : '')
}

export const toFn = (item) => {
  const hasRegion = item?.to_region?.length > 0
  const hasDistrict = item?.to_district?.length > 0

  // const text = hasRegion
  //   ? 'Viloyat ' + `(${item?.to_region?.map((item) => toCapitalize(item?.name))?.join(', ')})`
  //   : hasDistrict
  //     ? 'Tuman ' + `(${item?.to_district?.map((item) => toCapitalize(item?.name))?.join(', ')})`
  //     : ''

  const text2 = hasDistrict
    ? 'Tuman ' + `(${item?.to_district?.map((item) => toCapitalize(item?.name))?.join(', ')})`
    : hasRegion
      ? 'Viloyat ' + `(${item?.to_region?.map((item) => toCapitalize(item?.name))?.join(', ')})`
      : ''

  return !hasRegion && !hasDistrict ? 'Kiritilmagan' : text2
}

export const toRoleFn = (item) => {
  const arr = ['Viloyat', 'Tuman/shahar', 'Imom', 'Noib']
  return item?.to_role?.map((item) => arr[+item - 2]).join(', ')
}
