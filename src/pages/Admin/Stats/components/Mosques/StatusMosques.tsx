import { styled } from 'styled-components'
import { getQuery } from '@services/requests/CommonRequests'
import PieChart from '../PieChart'
import { StatsContext } from '../StatsContext'
import { useContext } from 'react'

export default function StatusMosques() {
  const {
    data: { start_date, finish_date },
  } = useContext(StatsContext)
  const { data } = getQuery<any>(
    'common/statistics/mosque/status',
    [start_date && finish_date],
    undefined,
    { params: { start_date, finish_date } }
  )
  const series = data
    ? Object.entries(data)
        .filter((item) => item?.[0]?.toLowerCase() !== 'all_count')
        .map((item: any) => item?.[1] || 0)
    : []

  const labels = ['Yaxshi', "Ta'mir talab", 'Qayta qurish kerak']

  return (
    <StyledBox className="box">
      <h2 className="title">Masjidlar holati</h2>
      {data && <PieChart series={series} options={{ labels }} />}
    </StyledBox>
  )
}

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
