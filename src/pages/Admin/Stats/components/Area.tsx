import ReactApexChart from 'react-apexcharts'
import { ICustomApexChart } from '../stats.types'
import { ApexOptions } from 'apexcharts'

export default function Area({ options, ...props }: ICustomApexChart) {
  const series = [
    {
      name: 'series1',
      data: [31, 40, 35, 51, 42],
    },
  ]
  const defaultOptions: ApexOptions = {
    chart: {
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      width: 2,
    },
    xaxis: {
      type: 'datetime',
      categories: [
        '2018-09-19T00:00:00.000Z',
        '2018-09-19T01:30:00.000Z',
        '2018-09-19T02:30:00.000Z',
        '2018-09-19T03:30:00.000Z',
        '2018-09-19T04:30:00.000Z',
      ],
      labels: { show: false },
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      labels: { show: false },
    },
    tooltip: { enabled: false },
    legend: { show: false },
    grid: {
      show: false,
    },
    fill: {
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.1,
        opacityTo: 0.6,
      },
    },
    colors: ['#00A76F'],
    ...options,
  }
  return (
    <ReactApexChart options={defaultOptions} series={series} height={80} type="area" {...props} />
  )
}
