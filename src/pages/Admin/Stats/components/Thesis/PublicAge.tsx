import { Typography } from '@mui/material'
import { styled } from 'styled-components'
import RadialBar from '../RadialBar'
import { getQuery } from '@services/requests/CommonRequests'
import { useContext } from 'react'
import { StatsContext } from '../StatsContext'

const labels = [
  {
    label: '18 yoshgacha',
    color: '#FFBB30',
  },
  {
    label: '18-30 yoshgacha',
    color: '#00A76F',
  },
  {
    label: '30 dan - 60 yoshgacha',
    color: '#9660D9',
  },
  {
    label: '60 yoshdan kattalar',
    color: '#006C9C',
  },
]

export default function PublicAge() {
  const {
    data: { start_date, finish_date },
  } = useContext(StatsContext)

  const { data } = getQuery<any>(
    'common/statistics/thesis/age',
    [start_date && finish_date],
    undefined,
    { params: { start_date, finish_date } }
  )
  const series = data
    ? Object.entries(data)
        .filter((item) => item?.[0]?.toLowerCase() !== 'count_all')
        .map((item: any) => item?.[1] || 0)
    : []

  const percents = series.map((item) => ((item * 100) / data?.count_all).toFixed(2))
  return (
    <StyledBox>
      <h2 className="title">Jamoat soni</h2>
      <div className="age-grid">
        {labels.map((item, i) => (
          <div key={i} className="age-box">
            <RadialBar series={[+percents[i] || 0]} colors={[item.color]} />
            <div>
              <Typography fontSize={'24px'} fontWeight={700} lineHeight={'36px'}>
                {series[i]}
              </Typography>
              <Typography fontSize={'14px'} lineHeight={'24px'} color={'#637381'}>
                {item.label}
              </Typography>
            </div>
          </div>
        ))}
      </div>
    </StyledBox>
  )
}

const StyledBox = styled.div`
  .title {
    margin: 0 0 8px 16px;
  }
  .age-grid {
    border: 1px solid #cdd2d7;
    border-radius: 16px;
    display: grid;
    grid-template-columns: 1fr;
    @media (min-width: 600px) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    }

    .age-box {
      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-content: center;
      align-items: center;
      padding: 23px;

      &:nth-child(-n + 3) {
        border-bottom: 1px dashed #cdd2d7;
      }
      @media (min-width: 600px) {
        &:nth-child(odd) {
          border-right: 1px dashed #cdd2d7;
        }
        &:nth-child(-n + 2) {
          border-bottom: 1px dashed #cdd2d7;
        }
      }
    }
  }
`
