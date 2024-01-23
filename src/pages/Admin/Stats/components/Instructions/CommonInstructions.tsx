import { styled } from 'styled-components'
import Area from '../Area'

export default function CommonInstructions() {
  const series = [12, 23, 123, 23, 57, 98, 45, 39, 10, 84, 84, 89]
  const labels = [
    'Yanvar',
    'Fevral',
    'Mart',
    'Aprel',
    'May',
    'Iyun',
    'Iyul',
    'Avgust',
    'Sentyabr',
    'Oktyabr',
    'Noyabr',
    'Dekabr',
  ]

  return (
    <StyledBox className="box">
      <h2 className="title">Umumiy ko'rsatmalar</h2>

      <Area
        height={400}
        series={[{ data: series, name: "Ko'rsatmalar" }]}
        options={{
          labels,
          xaxis: {},
          yaxis: {},
          tooltip: {},
        }}
      />
    </StyledBox>
  )
}

const StyledBox = styled.div``
