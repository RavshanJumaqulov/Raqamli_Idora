import { styled } from 'styled-components'
import { getQuery } from '@services/requests/CommonRequests'
import { toCapitalize } from '@utils/helper'
import PolarArea from '../PolarArea'
import { StatsContext } from '../StatsContext'
import { useContext } from 'react'

export default function Regions() {
  const {
    data: { start_date, finish_date },
  } = useContext(StatsContext)

  const { data } = getQuery<any>(
    'common/statistics/order/region',
    [start_date && finish_date],
    undefined,
    { params: { start_date, finish_date } }
  )
  const filteredData = data
    ? Object.entries(data)?.filter(([key, value]) => key?.toLowerCase() != 'count_all')
    : []
  const labels = filteredData.map((item) => toCapitalize(item?.[0]))
  const series = filteredData.map((item: any) => item?.[1]?.count)
  return (
    <StyledBox>
      <div className="body">
        <h2 className="title">Viloyatlar</h2>
        <PolarArea series={series} options={{ labels }} />
      </div>

      <div className="foot">
        <div className="child">
          <p className=" label">Hududlar</p>
          <h3>14</h3>
        </div>
        <div className="child right">
          <p className="label">Umumiy ko'rsatmalar</p>
          <h3>{data?.count_all}</h3>
        </div>
      </div>
    </StyledBox>
  )
}

const StyledBox = styled.div`
  border-radius: var(--card-radius, 16px);
  border: 1px solid var(--Gray, #cdd2d7);
  background: var(--White, #fff);

  .title {
    margin-bottom: 10px;
  }

  .body {
    padding: 16px;
  }

  .foot {
    display: flex;
    border-top: 1px dashed #cdd2d7;
    width: 100%;
    background: white;
    text-align: center;
    border-radius: 0 0 16px 16px;

    .child {
      padding: 8px 24px;
      width: 100%;
    }

    .right {
      border-left: 1px dashed #cdd2d7;
    }
    .label {
      color: #637381;
      font-size: 14px;
      font-style: normal;
      line-height: 22px;
    }
  }
  line,
  circle {
    stroke: rgba(145, 158, 171, 0.2);
  }
  .apexcharts-legend {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .apexcharts-text {
    visibility: hidden;
  }
`
