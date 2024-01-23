import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { getRequest } from '@services/requests/CommonRequests'
import { URLs } from './data'
import { useQuery } from '@tanstack/react-query'
import { AddMarriage } from './AddMarriage'
import { AddDeath } from './AddDeath'
import { AddWedding } from './AddWedding'
import { AddCeremony } from './AddCeremony'
import { AddMavlud } from './AddMavlud'

interface IFormInput {
  mahr: string
  comment: string
  marriage_image: File | null
  marriage_document: File | null
  fhdyo_image: File | null
  fhdyo_document: File | null
  date: string
  imam?: number
}

export const AddActivities = () => {
  const [params] = useSearchParams()
  const typeQuery = params.get('type')



  if (typeQuery === '1') {
    return <AddMarriage />
  }
  if (typeQuery === '2') {
    return <AddDeath />
  }
  if (typeQuery === '3') {
    return <AddWedding />
  }
  if (typeQuery === '4') {
    return <AddCeremony />
  }
  if (typeQuery === '5') {
    return <AddMavlud />
  }
}
