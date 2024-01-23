import ReactApexChart from 'react-apexcharts'
import { ICustomApexChart } from '../stats.types'
import { ApexOptions } from 'apexcharts'

export default function Bar({
  options,
  categories,
  ...props
}: ICustomApexChart & { categories?: any }) {
  const defaultOptions: ApexOptions = {
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
        borderRadiusApplication: 'end',
        barHeight: 8,
      },
    },
    chart: {
      toolbar: { show: false },
    },
    colors: ['#00A76F'],
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: categories || {},
      labels: {
        style: {
          colors: '#637381',
          fontSize: '12px',
        },
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
        style: {
          colors: '#637381',
          fontSize: '12px',
        },
        maxWidth: 300,
      },
    },
    tooltip: {
      y: {
        title: {
          formatter(seriesName) {
            return ''
          },
        },
      },
    },

    ...options,
  }
  return <ReactApexChart options={defaultOptions} type="bar" height={450} {...props} />
}
