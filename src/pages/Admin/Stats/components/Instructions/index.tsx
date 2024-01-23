import Status from './Status'
import Cards from './Cards'
import CommonInstructions from './CommonInstructions'
import Regions from './Regions'
import Roles from './Roles'
import { styled } from 'styled-components'

export default function InstructionsStats() {
  return (
    <StyledBox>
      <Cards />

      <div className="grid">
        <CommonInstructions />
        <Status />
        <Regions />
        <Roles />
      </div>
    </StyledBox>
  )
}

const StyledBox = styled.div`
  .grid {
    margin-top: 18px;
  }
`
