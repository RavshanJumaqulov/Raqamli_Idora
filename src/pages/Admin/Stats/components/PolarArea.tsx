import ReactApexChart from 'react-apexcharts'
import { ICustomApexChart } from '../stats.types'
import { ApexOptions } from 'apexcharts'

export default function PolarArea({ options, ...props }: ICustomApexChart) {
  const defaultOptions: ApexOptions = {
    colors: [
      '#00A76F',
      '#043c14',
      '#FFBB30',
      '#8E33FF',
      '#FF2626',
      '#006C9C',
      '#637381',
      '#E400BF',
      '#B76E00',
      '#4c8b76',
      '#00B8D9',
      '#123456',
      '#928374',
      '#091823',
    ],
    stroke: {
      width: 1,
      colors: ['white'],
    },
    legend: {
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
    fill: {
      opacity: 1,
    },

    responsive: [
      {
        breakpoint: 1024,
        options: {
          legend: {
            position: 'bottom',
          },
          chart: {
            height: '200%',
          },
        },
      },
    ],
    ...options,
  }
  return <ReactApexChart options={defaultOptions} type="polarArea" height={280} {...props} />
}
