import { getQuery } from '@services/requests/CommonRequests'
import { styled } from 'styled-components'
import Bar from '../Bar'
import { StatsContext } from '../StatsContext'
import { useContext } from 'react'

export default function ByEducation() {
  const {
    data: { start_date, finish_date },
  } = useContext(StatsContext)

  const { data } = getQuery<any>(
    'common/statistics/employee/education',
    [start_date && finish_date],
    undefined,
    { params: { start_date, finish_date } }
  )

  const filteredData = data
    ? Object.entries(data)?.filter(([key, value]) => key?.toLowerCase() != 'all_count')
    : []
  const series = filteredData?.map((item) => +item?.[1] || 0)
  const labels = ["O'rta maxsus", 'Oliy', "O'rta"]
  return (
    <StyledBox className="box">
      <h2 className="title">Ma'lumotiga ko'ra</h2>
      <Bar
        series={[{ data: series }]}
        options={{
          colors: ['#00A76F', '#A7DCF4', '#006C9C'],
          labels,
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 4,
              borderRadiusApplication: 'end',
              barHeight: 8,
              columnWidth: 36,
              distributed: true,
            },
          },
          xaxis: {
            labels: {
              show: false,
            },
            axisBorder: {
              show: false,
            },
            axisTicks: {
              show: false,
            },
          },
          yaxis: {
            labels: {
              show: false,
            },
          },
          legend: {
            show: true,
            showForNullSeries: true,
            showForSingleSeries: true,
            showForZeroSeries: true,
            position: 'left',
            markers: {
              radius: 50,
              offsetX: -5,
              offsetY: 2,
            },
            fontSize: '13px',
            fontWeight: 500,
            labels: {
              colors: '#212B36',
            },
            offsetY: 70,
            formatter: (legendName, opts) => {
              return legendName + ' - ' + opts.w.config.series[0].data[opts.seriesIndex]
            },
          },
        }}
        height={'auto'}
      />
    </StyledBox>
  )
}

const StyledBox = styled.div``
