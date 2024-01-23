import { styled } from 'styled-components'
import Bar from '../Bar'
import { getQuery } from '@services/requests/CommonRequests'
import { toCapitalize } from '@utils/helper'
import { StatsContext } from '../StatsContext'
import { useContext } from 'react'

export default function TopMosques() {
  const {
    data: { start_date, finish_date },
  } = useContext(StatsContext)

  const { data } = getQuery<any>(
    'common/statistics/mosque/top',
    [start_date && finish_date],
    undefined,
    { params: { start_date, finish_date } }
  )
  const series = data ? data?.map((item) => item?.capacity) : []
  const categories = data ? data?.map((item) => toCapitalize(item?.name)) : []

  return (
    <StyledBox className="box">
      <h2 className="title">Top masjidlar</h2>
      <p className="under-title">Jamoat soni bo’yicha</p>
      <Bar series={[{ data: series }]} categories={categories} />
    </StyledBox>
  )
}

const StyledBox = styled.div`
  .under-title {
    color: var(--Dark-gray, #637381);
    font-size: 14px;
    line-height: 22px;
  }
`
