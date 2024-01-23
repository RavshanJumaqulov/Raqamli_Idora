import { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { ICustomApexChart } from '../stats.types'

export default function Donut({ options, ...props }: ICustomApexChart) {
  const customOptions: ApexOptions = {
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
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 2,
    },
    plotOptions: {
      pie: {
        donut: {
          size: '85%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Umumiy',
              fontSize: '14px',
              color: '#637381',
              fontWeight: 600,
            },
            value: {
              fontSize: '32px',
              fontWeight: 700,
              color: '#212B36',
            },
          },
        },
      },
    },
    colors: ['#006C9C', '#FFBB30', '#00A76F', '#FF2626'],
    ...options,
  }
  return <ReactApexChart options={customOptions} height={300} type="donut" {...props} />
}
