import ReactApexChart from 'react-apexcharts'
import { ICustomApexChart } from '../stats.types'
import { ApexOptions } from 'apexcharts'

export default function RadialBar({
  options,
  colors,
  ...props
}: ICustomApexChart & { colors?: string[] }) {
  const customOptions: ApexOptions = {
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
          name: {
            show: false,
          },
          value: {
            color: '#212B36',
            fontSize: '14px',
            show: true,
            fontWeight: 600,
            offsetY: 0,
          },
        },
      },
    },
    fill: {
      colors,
    },
    stroke: {
      lineCap: 'round',
    },
    colors,
    ...options,
  }
  return <ReactApexChart options={customOptions} type="radialBar" height={150} {...props} />
}
