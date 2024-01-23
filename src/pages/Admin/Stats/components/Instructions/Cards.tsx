import { Box } from '@mui/material'
import { styled } from 'styled-components'
import { getQuery } from '@services/requests/CommonRequests'
import Card from '../Card'
import { instructionsCardsData } from '../../data'
interface IData {
  [key: number]: { count: number; protsent: number }
}
export default function Cards() {
  const { data } = getQuery<IData>('common/statistics/order/direction_type')
  const customData = instructionsCardsData.map((item) => ({
    ...item,
    data: data?.[item.id],
  }))
  return (
    <StyledBox>
      {customData.map((item, i) => (
        <Card key={i} item={item} />
      ))}
    </StyledBox>
  )
}

const StyledBox = styled(Box)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, auto));
  gap: 16px;
  margin-top: 20px;
`
