import { getQuery } from '@services/requests/CommonRequests'
import { toCapitalize } from '@utils/helper'
import { styled } from 'styled-components'
import Bar from '../Bar'

export default function GraduatedColleges() {
  const { data } = getQuery<any>('common/statistics/employee/university')

  const filteredData = data
    ? Object.entries(data)?.filter(([key, value]) => key?.toLowerCase() != 'count_all')
    : []
  const series = filteredData?.map((item) => +item?.[1] || 0)
  const categories = filteredData?.map((item) => toCapitalize(item?.[0]))

  return (
    <StyledBox className="box">
      <h2 className="title">Bitirgan ta’lim muassasasi</h2>
      <Bar
        series={[{ data: series }]}
        categories={categories}
        options={{ colors: ['#FFAB00'] }}
        height={'auto'}
      />
    </StyledBox>
  )
}

const StyledBox = styled.div`
  height: fit-content;
`
