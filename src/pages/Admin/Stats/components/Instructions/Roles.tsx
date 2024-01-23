import { styled } from 'styled-components'
import { getQuery } from '@services/requests/CommonRequests'
import PieChart from '../PieChart'
import { StatsContext } from '../StatsContext'
import { useContext } from 'react'

interface IData {
  [key: number]: { count: number; protsent: number }
  count_all: number
}

export default function Roles() {
  const {
    data: { start_date, finish_date },
  } = useContext(StatsContext)

  const { data } = getQuery<IData>(
    'common/statistics/order/role',
    [start_date && finish_date],
    undefined,
    { params: { start_date, finish_date } }
  )
  const series = data
    ? Object.entries(data)
        .filter((item) => item?.[0]?.toLowerCase() !== 'count_all')
        .map((item: any) => item?.[1]?.count || 0)
    : []

  const labels = ['Viloyat boshqarmasi', 'Tuman boshqarmasi', 'Imom', 'Noib']

  return (
    <StyledBox className="box">
      <h2 className="title">Rollar</h2>
      <PieChart series={series} options={{ labels }} />
    </StyledBox>
  )
}

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
