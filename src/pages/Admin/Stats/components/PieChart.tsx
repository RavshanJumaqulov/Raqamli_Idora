import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { ICustomApexChart } from '../stats.types'

export default function PieChart({ options, ...props }: ICustomApexChart) {
  const defaultOptions: ApexOptions = {
    chart: {
      type: 'donut',
    },
    legend: {
      position: 'bottom',
      itemMargin: {
        vertical: 5,
        horizontal: 10,
      },
      markers: {
        width: 12,
        height: 12,
        offsetX: -5,
        offsetY: 1,
      },
      // horizontalAlign: 'left',
    },
    stroke: {
      width: 1,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '85%',
        },
      },
    },
    colors: ['#00A76F', '#8E33FF', '#FFBB30', '#FF2626'],
    dataLabels: {
      style: {
        fontSize: '12px',
        fontWeight: 400,
        colors: ['white'],
      },
    },
    ...options,
  }
  return <ReactApexChart options={defaultOptions} type="pie" height={340} {...props} />
}
