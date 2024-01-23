import { styled } from 'styled-components'
import TopMosques from './TopMosques'
import MosquesByType from './MosquesByType'
import StatusMosques from './StatusMosques'
import MosquesByRegions from './MosquesByRegions'

export default function MosquesStats() {
  return (
    <StyledBox>
      <div className="grid">
        <TopMosques />
        <MosquesByType />
      </div>
      <div className="grid ">
        <StatusMosques />
        <MosquesByRegions />
      </div>
    </StyledBox>
  )
}

const StyledBox = styled.div`
  .grid {
    @media (min-width: 1440px) {
      grid-template-columns: 2fr 1fr !important;
    }
    &:nth-child(2) {
      @media (min-width: 1440px) {
        grid-template-columns: 1fr 2fr !important;
      }
    }

    margin-bottom: 16px;
  }
  .flex {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
    /* flex-wrap: wrap; */
  }
`
