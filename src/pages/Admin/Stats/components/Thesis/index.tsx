import { styled } from 'styled-components'
import Status from './Status'
import PublicAge from './PublicAge'

export default function ThesisStats() {
  return (
    <StyledBox>
      <div className="grid">
        <Status />
        <PublicAge />
      </div>
    </StyledBox>
  )
}

const StyledBox = styled.div``
