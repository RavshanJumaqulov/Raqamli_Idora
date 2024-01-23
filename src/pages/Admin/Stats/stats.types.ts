import { ApexOptions } from 'apexcharts'

export interface ICustomApexChart {
  options?: ApexOptions
  series?: ApexAxisChartSeries | ApexNonAxisChartSeries
  width?: string | number
  height?: string | number
}
