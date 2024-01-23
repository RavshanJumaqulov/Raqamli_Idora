import { styled } from 'styled-components'
import { getQuery } from '@services/requests/CommonRequests'
import Donut from '../Donut'
import { StatsContext } from '../StatsContext'
import { useContext } from 'react'

interface IData {
  [key: number]: { count: number; protsent: number }
  count_all: number
}

export default function Status() {
  const {
    data: { start_date, finish_date },
  } = useContext(StatsContext)

  const { data } = getQuery<IData>(
    'common/statistics/order/state',
    [start_date && finish_date],
    undefined,
    { params: { start_date, finish_date } }
  )
  const series = data
    ? Object.entries(data)
        .filter((item) => item?.[0]?.toLowerCase() !== 'count_all')
        .map((item: any) => item?.[1]?.count || 0)
    : []

  const labels = [
    'Kutilmoqda',
    'Qabul qilindi',
    'Bajarildi',
    // 'Bajarilmadi'
  ]

  return (
    <StyledBox className="box">
      <h2 className="title">Status</h2>
      <Donut series={series} options={{ labels }} />
    </StyledBox>
  )
}

const StyledBox = styled.div`
  .title {
    margin-bottom: 10px;
  }
`
