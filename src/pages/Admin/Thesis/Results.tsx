import CustomButton from '@components/common/CustomButton'
import { FlexBetween, FlexWrapper } from '@components/common/Flex'
import { PaginationContext, PaginationContextType } from '@contexts/PaginationProvider'
import { Box, Stack, Typography, styled } from '@mui/material'
import { getRequest } from '@services/requests/CommonRequests'
import { thesisResultCols } from '@data/colsData/Admin'
import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MainContext, MainContextType } from '@contexts/MainProvider'
import { MainLoading } from '@components/common/Loading'
import ImageSlider from '@components/common/ImageSlider'
import CustomModal from '@components/common/CustomModal'
import CustomTable from '@components/common/CustomTable/CustomTable'
import { FilterContext, FilterContextType } from '@contexts/FilterContext'
import CustomHandleSlider from '@components/common/CustomHandleSlider'
import { SwiperSlide } from 'swiper/react'
import ReactPlayer from 'react-player'
import { FileIcon } from '@components/icons/icons'

const ThesisResults = () => {
  const {
    state: { detailId, isDetailOpen },
    actions: { closeDetailModal },
  } = useContext<MainContextType>(MainContext)
  const {
    state: { limit, offset, search },
  } = useContext<PaginationContextType>(PaginationContext)

  const { filterData } = useContext<FilterContextType>(FilterContext)
  const { thesisResults } = filterData
  const { district, region, status, mosque } = thesisResults

  const navigate = useNavigate()
  const { id: InstructionResultID } = useParams()

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: [
      '/friday_tesis/seen/list',
      offset,
      limit,
      search,
      InstructionResultID,

      district,
      region,
      status,
      mosque,
    ],
    queryFn: () =>
      getRequest('friday_tesis/seen/list', {
        params: {
          limit,
          offset,
          search,
          tesis: InstructionResultID,

          ...(region && { imam__region: region?.id }),
          ...(district && { imam__district: district }),
          ...(mosque && { imam__profil__mosque: mosque?.id }),
          ...(+status && { state: +status }),
        },
      }),
  })

  const {
    data: user,
    isLoading: isLoadingDetail,
    isRefetching: isRefetchingDetail,
  } = useQuery({
    queryKey: ['friday_tesis/result/detail', detailId],
    queryFn: () => getRequest(`friday_tesis/result/detail/${detailId}`),
    enabled: !!detailId,
  })

  return (
    <Stack gap="16px">
      <FlexBetween pb="12px" borderBottom="1px solid #DDE3EC" mb="24px">
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: 500,
            color: 'text.black',
            textTransform: 'lowercase',
            '&:first-letter': {
              textTransform: 'uppercase',
            },
          }}
        >
          "{data?.results?.[0]?.tesis_title}" tezisi natijalari
        </Typography>

        <FlexWrapper gap="16px">
          <CustomButton
            onClick={() => {
              navigate(-1)
            }}
            value={'Orqaga qaytish'}
            bgColor="#F2F5F9"
            fw="500"
            color="#828D9C"
          />
        </FlexWrapper>
      </FlexBetween>

      <CustomTable
        cols={thesisResultCols}
        rows={data?.results}
        count={data?.count}
        loading={isLoading || isRefetching}
        filter="thesisResults"
      />

      <CustomModal closeModal={closeDetailModal} open={isDetailOpen}>
        <Stack
          borderRadius="5px"
          overflow="hidden"
          direction={'column'}
          gap={''}
          width="1300px"
          p={4}
          sx={{ background: 'white' }}
        >
          <Typography variant="h5" component={'h1'} fontWeight={'700'} gutterBottom>
            "{user?.tesis?.title}" tezisi natijasi
          </Typography>
          {isLoadingDetail || isRefetchingDetail ? (
            <MainLoading />
          ) : (
            <Stack direction={'row'} gap={'24px'}>
              <Stack direction={'column'} gap={'8px'} width={'50%'}>
                <StyledRow>
                  <StyledlabelPlaceholder>Kimdan</StyledlabelPlaceholder>
                  <StyledLabel>
                    {user?.imam?.name} ({+user?.imam?.role === 4 ? 'Imom' : 'Noib'})
                  </StyledLabel>
                </StyledRow>
                {/* <StyledRow>
                  <StyledlabelPlaceholder>Nomi</StyledlabelPlaceholder>
                  <StyledLabel>{user?.direction?.title}</StyledLabel>
                </StyledRow> */}
                <StyledRow>
                  <StyledlabelPlaceholder>Turi</StyledlabelPlaceholder>
                  <StyledLabel>{+user?.state === 1 ? 'Malumot uchun' : 'Ijro uchun'}</StyledLabel>
                </StyledRow>
                <StyledlabelPlaceholder>Rasmlar</StyledlabelPlaceholder>
                <Box width="450px">
                  {user?.images.length ? (
                    <ImageSlider data={user?.images} />
                  ) : (
                    <StyledLabel>Rasmlar mavjud emas.</StyledLabel>
                  )}
                </Box>
              </Stack>
              <Stack direction={'column'} gap={'8px'} width={'50%'}>
                <StyledRow>
                  <StyledlabelPlaceholder>Sana</StyledlabelPlaceholder>
                  <StyledLabel>{user?.created_at}</StyledLabel>
                </StyledRow>
                {/* <StyledRow>
                  <StyledlabelPlaceholder>Status</StyledlabelPlaceholder>
                  <StyledLabel>
                    {
                      ['Kutilmoqda', 'Qabul qilindi', 'Bajarildi', 'Bajarilmadi'][
                        +user?.direction?.types
                      ]
                    }
                  </StyledLabel>
                </StyledRow> */}
                <StyledRow>
                  <StyledlabelPlaceholder>Qayerdan</StyledlabelPlaceholder>
                  <StyledLabel>{user?.from}</StyledLabel>
                </StyledRow>
                <StyledRow>
                  <StyledlabelPlaceholder>Fayl</StyledlabelPlaceholder>
                  {user?.file ? (
                    <FilesBox>
                      <FileBox
                        href={user?.file}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="file"
                      >
                        <FileIcon />
                        {user?.file?.split('/').at(-1)}
                      </FileBox>
                    </FilesBox>
                  ) : (
                    <StyledLabel>Fayl mavjud emas.</StyledLabel>
                  )}
                </StyledRow>
                <StyledRow>
                  <StyledlabelPlaceholder>Videolar</StyledlabelPlaceholder>
                  {user?.videos?.length ? (
                    <Stack direction="row">
                      <CustomHandleSlider>
                        {user?.videos?.map((el: { id: number; video: string }) => (
                          <SwiperSlide key={el.id}>
                            <Box
                              sx={{
                                width: '550px',
                                background: '#000',
                              }}
                            >
                              <ReactPlayer
                                url={el.video}
                                height="350px"
                                width="100%"
                                controls={true}
                              />
                            </Box>
                          </SwiperSlide>
                        ))}
                      </CustomHandleSlider>
                    </Stack>
                  ) : (
                    <StyledLabel>Video mavjud emas.</StyledLabel>
                  )}
                </StyledRow>
                <StyledRow>
                  <StyledlabelPlaceholder>Izoh</StyledlabelPlaceholder>
                  <StyledLabel>
                    {user?.comment.length ? user?.comment : 'Izoh mavjud emas.'}
                  </StyledLabel>
                </StyledRow>
              </Stack>
            </Stack>
          )}
        </Stack>
      </CustomModal>
    </Stack>
  )
}

export default ThesisResults

const StyledRow = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  margin: '10px 0',
})

const StyledlabelPlaceholder = styled('label')({
  fontSize: '16px',
  color: '#00A76F',
  fontWeight: 600,
})

const StyledLabel = styled('p')({
  fontSize: '18px',
  color: '#040404',
  fontWeight: 400,
})

const FilesBox = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginTop: '10px',
})

const FileBox = styled('a')({
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
  padding: '3px',
  backgroundColor: '#ebf8f3',
  borderRadius: '4px',
  fontSize: '13px',
  fontWeight: '500',
  color: '#00a76f',
  textDecoration: 'none',
})
