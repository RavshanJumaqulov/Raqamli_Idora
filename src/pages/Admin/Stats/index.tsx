import PageTab from '@components/common/PageTab'
import { tabs } from './data'
import { styled } from 'styled-components'
import { useSearchParams } from 'react-router-dom'
import InstructionsStats from './components/Instructions'
import ThesisStats from './components/Thesis'
import MosquesStats from './components/Mosques'
import EmployeesStats from './components/Employees'
import StatsDatePicker from './components/StatsDatePicker'
import StatsProvider from './components/StatsContext'
import { getUser } from '@utils/helper'
import { useEffect } from 'react'

export default function Stats() {
  const [searchParams, setSearchParams] = useSearchParams()
  const typeQuery = +searchParams.get('type')
  const user = getUser()
  useEffect(() => {
    if (location.search === '') {
      setSearchParams('type=1')
    }
  }, [location.search])

  return (
    (user.role === '1' || user.role === '2' || user.role === '3') && (
      <StatsProvider>
        <StyledBox className="stats-box">
          <div className="stats-header">
            <PageTab tabs={tabs} />
            <div className="stats-header-filter">
              <label className="date-label">Sana</label>
              <StatsDatePicker name="start_date" />
              <StatsDatePicker name="finish_date" />
            </div>
          </div>
          <div className="stats-box-body">
            {typeQuery == 1 && <ThesisStats />}
            {typeQuery == 2 && <InstructionsStats />}
            {typeQuery == 3 && <EmployeesStats />}
            {typeQuery == 4 && <MosquesStats />}
          </div>
        </StyledBox>
      </StatsProvider>
    )
  )
}

const StyledBox = styled.div`
  .stats-header {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    flex-wrap: wrap;
    align-items: center;

    &-filter {
      display: flex;
      align-items: center;
      gap: 8px;

      .date-label {
        color: #212b36;
        font-size: 14px;
        font-weight: 600;
      }
    }
  }
  .stats-box-body {
    margin: 18px 0;
  }
  .grid {
    display: grid;
    gap: 18px;
    grid-template-columns: 1fr;
    @media (min-width: 1440px) {
      grid-template-columns: auto auto;
    }
  }
  .box {
    border-radius: var(--card-radius, 16px);
    border: 1px solid var(--Gray, #cdd2d7);
    background: var(--White, #fff);
    padding: 16px;
  }
  .title {
    color: #212b36;
    font-size: 18px;
    font-weight: 700;
    line-height: 28px;
  }
  .apexcharts-legend-text {
    font-size: 13px !important;
    font-weight: 500 !important;
    color: #212b36 !important;
  }
`
