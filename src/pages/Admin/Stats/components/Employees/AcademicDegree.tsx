import { styled } from 'styled-components'
import { getQuery } from '@services/requests/CommonRequests'
import PieChart from '../PieChart'
import { StatsContext } from '../StatsContext'
import { useContext } from 'react'

export default function AcademicDegree() {
  const {
    data: { start_date, finish_date },
  } = useContext(StatsContext)

  const { data } = getQuery<any>(
    'common/statistics/employee/academic',
    [start_date && finish_date],
    undefined,
    { params: { start_date, finish_date } }
  )
  const series = data
    ? Object.entries(data)
        .filter((item) => item?.[0]?.toLowerCase() !== 'all_count')
        .map((item: any) => item?.[1] || 0)
    : []

  const labels = ['Bakalavr', 'Magistr', 'Phd', 'DsC', "Yo'q"]
  const colors = ['#00A76F', '#FFBB30', '#006C9C', '#8E33FF', '#FF2626']
  return (
    <StyledBox className="box">
      <h2 className="title">Rollar</h2>
      <PieChart series={series} options={{ labels, colors }} />
    </StyledBox>
  )
}

const StyledBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 16px;
`
