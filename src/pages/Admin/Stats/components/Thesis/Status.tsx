import { styled } from 'styled-components'
import { getQuery } from '@services/requests/CommonRequests'
import Donut from '../Donut'
import { useContext } from 'react'
import { StatsContext } from '../StatsContext'

interface IData {
  [key: number]: { count: number; protsent: number }
  count_all: number
}

export default function Status() {
  const {
    data: { start_date, finish_date },
  } = useContext(StatsContext)

  const { data } = getQuery<IData>(
    'common/statistics/thesis/state',
    [start_date && finish_date],
    undefined,
    {
      params: {
        start_date,
        finish_date,
      },
    }
  )

  const series = data
    ? Object.entries(data)
        .filter((item) => item?.[0]?.toLowerCase() !== 'count_all')
        .map((item) => +item?.[1])
    : []

  const labels = [
    'Kutilmoqda',
    'Qabul qilindi',
    'Bajarildi',
    // 'Bajarilmadi'
  ]

  return (
    <StyledBox>
      <h2 className="title">Status</h2>
      <div className="box">
        <Donut series={series} options={{ labels }} height="350px" />

        {/* <div className="line"></div> */}
      </div>
    </StyledBox>
  )
}

const StyledBox = styled.div`
  .title {
    margin: 0 0 8px 16px;
  }
  .box {
    position: relative;
  }

  .box .line {
    width: 100%;
    position: absolute;
    bottom: 75px;
    left: 0;
    border-top: 1px dashed silver;
  }
`
