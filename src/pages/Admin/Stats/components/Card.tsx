import { styled } from 'styled-components'
import Area from './Area'
import { DashboardCardChartSvg, StaticIcon } from '@components/icons/icons'

interface ICardProps {
  item: {
    label: string
    data?: {
      count: number
      protsent: number
    }
    color: string
  }
}

export default function Card({ item }: ICardProps) {
  return (
    <StyledCard $color={item.color} className="card">
      <div>
        <p className="label">{item.label}</p>
        <p className="value">{item.data?.count}</p>
        <p className="percent">{item.data?.protsent}%</p>
      </div>

      {/* <Area options={{ colors: [item.color] }} /> */}
      <DashboardCardChartSvg color={item.color} />
    </StyledCard>
  )
}

const StyledCard = styled.div<{ $color?: string }>`
  display: flex;
  justify-content: space-between;
  padding: 24px;
  align-items: center;
  border-radius: 16px;
  border: 1px solid #00a76f;
  border-color: ${(props) => props.$color || '#CDD2D7'};
  background: #fff;
  color: #212b36;
  line-height: 22px;

  .label {
    font-size: 14px;
    font-weight: 600;
  }
  .value {
    font-size: 32px;
    font-weight: 700;
    line-height: 48px;
    margin-bottom: 16px;
  }
`
