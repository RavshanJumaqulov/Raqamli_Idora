import banner from '@assets/images/header/banner-profile.jpeg'
import { MainLoading } from '@components/common/Loading'
import { Button } from '@mui/material'
import { getQuery } from '@services/requests/CommonRequests'
import { ACADEMIC_DEGREE_OPTIONS, EDUCATION_OPTIONS, NATIONS_OPTIONS } from '@src/constants'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { IEmployee } from '../employee.types'
import { FlexWrapper } from '@components/common/Flex'

const ViewEmployee = () => {
  const { id } = useParams()
  const { data, isFetching } = getQuery<IEmployee>(`employee/employee/${id}`, [])
  return !isFetching ? (
    <StyledViewEmployee>
      <div className="banner-container">
        <div className="info">
          <img className="image" src={data.image} alt="surati" />
          <div className="texts">
            <h2>
              {data?.name || ''} {data?.last_name || ''} {data?.surname || ''}
            </h2>
            <FlexWrapper gap="5px">
              <p>{data.position?.name || ''}</p> <div>|</div> <p>{data.department?.name || ''}</p>
            </FlexWrapper>
          </div>
        </div>
      </div>
      <div className="personal-info-container">
        <div className="header">
          <h3>Hodim haqida</h3>
          <Link to={`/employee/edit/${data?.id}`}>
            <Button
              sx={{
                padding: '8px 12px',
                width: 'auto',
                background: '#1e1e1e',
                color: '#fff',
                borderRadius: '8px',
                '&:hover': {
                  background: '#1e1e1e',
                },
              }}
            >
              Tahrirlash
            </Button>
          </Link>
        </div>
        <div className="infos">
          <InfoItem title="Yashash manzili:" value={data.address || ''} />
          <InfoItem title="Bitirgan ta’lim muassasasi::" value={data.graduated_univer.name || ''} />
          <InfoItem
            title="Ma’lumoti:"
            value={EDUCATION_OPTIONS.find((item) => item.id === data.education).name}
          />
          <InfoItem title="Tug’ilgan yili:" value={data.birth_date} />
          <InfoItem title="Bitirgan yili:" value={data.graduated_year} />
          <InfoItem
            title="Ilmiy darajasi:"
            value={ACADEMIC_DEGREE_OPTIONS.find((item) => item.id === data.academic_degree).name}
          />
          <InfoItem title="Telefon raqami:" value={data.phone_number} />
          <InfoItem
            title="Millati:"
            value={NATIONS_OPTIONS.find((item) => item.id === data.nation).name}
          />
          <InfoItem title="Diplom raqami:" value={data.diploma_number} />
        </div>
      </div>
    </StyledViewEmployee>
  ) : (
    <MainLoading />
  )
}

const InfoItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <div className="info-item">
      <span>{title}</span>
      <h4>{value}</h4>
    </div>
  )
}

const StyledViewEmployee = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 16px;
  .banner-container {
    width: 100%;
    height: 178px;
    border-radius: 16px;
    background-image: url(${banner});
    background-attachment: fixed;
    background-position: 70% 200%;
    background-size: cover;
    position: relative;
    padding-top: 82px;
    .info {
      display: flex;
      align-items: center;
      gap: 24px;
      position: relative;
      z-index: 2;
      .image {
        width: 180px;
        height: 180px;
        border-radius: 50%;
        background-color: white;
        object-fit: cover;
      }
      .texts {
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        h2 {
          color: white;
        }
      }
    }
    &::before {
      border-radius: 16px;
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.5); /* Adjust the alpha (last value) for darkness */
      z-index: 1; /* Ensure the overlay is above the background image */
    }
  }
  .personal-info-container {
    border-radius: 16px;
    border: 1px solid var(--Dark-gray, #637381);
    background: var(--Background-Paper, #fff);
    padding: 24px;
    margin-top: 120px;
    .header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40px;
    }
    .infos {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 20px;
      .info-item {
        display: flex;
        flex-direction: column;
        gap: 3px;
        span {
          font-size: 12px;
          font-weight: 400;
        }
        h4 {
          font-size: 16px;
          font-weight: 500;
          text-transform: capitalize;
        }
      }
    }
  }
`

export default ViewEmployee
