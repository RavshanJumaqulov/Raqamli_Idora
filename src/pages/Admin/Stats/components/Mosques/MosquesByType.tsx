import { styled } from 'styled-components'
import RadialBar from '../RadialBar'
import { ApexOptions } from 'apexcharts'
import { getQuery } from '@services/requests/CommonRequests'
import { StatsContext } from '../StatsContext'
import { useContext } from 'react'

export default function MosquesByType() {
  const {
    data: { start_date, finish_date },
  } = useContext(StatsContext)

  const { data } = getQuery<any>(
    'common/statistics/mosque/type',
    [start_date && finish_date],
    undefined,
    { params: { start_date, finish_date } }
  )

  const values = data ? [data?.jome || 0, data?.neighborhood || 0] : [0, 0]
  const total = values.reduce((acc, cur) => acc + cur, 0)

  const percents = values.map((val) => +((val * 100) / total).toFixed(2))
  const colors = ['#00A76F', '#FFBB30']

  const options: ApexOptions = {
    plotOptions: {
      radialBar: {
        startAngle: 0,
        endAngle: 360,
        hollow: {
          margin: 0,
          size: '55%',
        },
        track: {
          background: '#F6F7F8',
        },
        dataLabels: {
          total: {
            show: true,
            label: 'Umumiy',
            formatter(opts) {
              return total.toString()
            },
            color: '#637381',
            fontSize: '14px',
            fontWeight: 600,
          },
          value: {
            color: '#212B36',
            fontSize: '32px',
            show: true,
            fontWeight: 700,
          },
        },
      },
    },
    labels: ['Jome', 'Mahalliy'],
    legend: {
      show: true,
      position: 'bottom',
      formatter: (legendName, opts) => {
        return (
          legendName + ' - ' + ((opts.w.config.series[opts.seriesIndex] * total) / 100).toFixed()
        )
      },
    },
  }
  return (
    <StyledBox className="box">
      <h2 className="title">Masjidlar</h2>

      {data && <RadialBar options={options} series={percents} colors={colors} height={350} />}
    </StyledBox>
  )
}

const StyledBox = styled.div`
  height: fit-content;
`
