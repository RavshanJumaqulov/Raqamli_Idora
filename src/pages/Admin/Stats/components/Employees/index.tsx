import { styled } from 'styled-components'
import GraduatedColleges from './GraduatedColleges'
import AcademicDegree from './AcademicDegree'
import ByEducation from './ByEducation'

export default function EmployeesStats() {
  return (
    <StyledBox>
      <div className="grid">
        <GraduatedColleges />
        <div>
          <ByEducation />
          <AcademicDegree />
        </div>
      </div>
    </StyledBox>
  )
}

const StyledBox = styled.div`
  .grid {
    @media (min-width: 1440px) {
      grid-template-columns: 2fr 1fr !important;
    }
  }
`
