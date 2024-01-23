import PageTab from '@components/common/PageTab'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter'
import FmdGoodIcon from '@mui/icons-material/FmdGood'
import MailIcon from '@mui/icons-material/Mail'
import { Box, Button, Stack, Typography, styled } from '@mui/material'
import browserStorage from '@services/browserStorage'
import { Link } from 'react-router-dom'
import banner from '@assets/images/header/banner-profile.jpeg'
import profileImage from '@assets/images/header/profile-image.png'
import { socialMedia, tabs } from '../../../data/profileData'
import { useQuery } from '@tanstack/react-query'
import { getRequest, postMutation } from '@services/requests/CommonRequests'
import { MainContext, MainContextType } from '@contexts/MainProvider'
import { Fragment, useContext } from 'react'
import CustomModal from '@components/common/CustomModal'
import { Form, Formik } from 'formik'
import FormikSelect from '@components/common/Formik/FormikSelect'
import FormikInput from '@components/common/Formik/FormikInput'
import { getUser } from '@utils/helper'

export const userRolesNames = ['Admin', 'Viloyat admin', 'Tuman admin', 'Imom', 'Noib']

const ProfileInfo = () => {
  const {
    state: { isDetailOpen },
    actions: { closeDetailModal, openDetailModal, openSnackbar },
  } = useContext<MainContextType>(MainContext)

  const { data } = useQuery({
    queryFn: () => getRequest('auth/self_profile'),
    queryKey: ['self_profile'],
  })

  const user = getUser()

  const handleSubmit = (values) => {
    let obj = {
      employee: user.id,
      social_media: values.social.id,
      link: values.link,
    }

    post(obj)
  }

  const { mutate: post } = postMutation('employee/socialmedia', {
    onSuccess: () => {
      closeDetailModal()
      openSnackbar({ message: "Muvaffaqiyatli qo'shildi", status: 'success' })
    },
    onError: (error) => {
      openSnackbar({ message: error?.message, status: 'error' })
    },
  })

  return (
    <Fragment>
      <Stack bgcolor="#fff" p="16px 24px" gap="16px" position={'relative'} direction={'column'}>
        <Box
          width="1300px"
          height={'178px'}
          overflow={'hidden'}
          borderRadius={'16px'}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img src={banner} alt="Banner" />
        </Box>
        <Box
          width={'1300px'}
          // bgcolor={'#aaa'}
          height={'200px'}
          top={'80px'}
          position={'absolute'}
          sx={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            padding: '10px 0px',
          }}
        >
          <Stack gap={'16px'} direction={'row'} alignItems={'flex-end'}>
            <img
              src={data ? data?.[0]?.profil?.image : profileImage}
              alt=""
              style={{ borderRadius: '50%', height: '200px', width: '200px' }}
            />

            <Stack justifyContent={'flex-end'} alignItems={'start'}>
              <Typography variant={'h5'} component={'h1'} fontWeight={600} color={'#00A76F'}>
                {data?.[0]?.profil?.name}
              </Typography>
              <Typography variant={'body1'} component={'h3'} color={'#637381'}>
                {data?.[0]?.profil?.last_name}
              </Typography>
            </Stack>
          </Stack>
          <Button
            variant="outlined"
            onClick={() => {
              openDetailModal(1)
            }}
            sx={{
              borderRadius: '8px',
              border: '1px solid #637381',
              color: '#00A76F',
              fontWeight: 600,
            }}
          >
            Xodimning ijtimoiy tarmoqdagi faoliyati
          </Button>
        </Box>
        <Stack pt="100px" direction={'row'} justifyContent={'space-between'}>
          <Stack gap={'16px'}>
            <Stack border={'1px solid #637381'} p={'24px'} borderRadius={'16px'}>
              <Typography variant="h6" fontWeight={600} color="#212B36" gutterBottom>
                Hodim haqida
              </Typography>
              <Stack gap={'12px'}>
                <StyledLI>
                  <FmdGoodIcon></FmdGoodIcon>
                  <Typography
                    fontWeight={400}
                    variant="body1"
                    ml={'20px'}
                    textTransform={'capitalize'}
                  >
                    {data?.[0]?.region?.name || ''} {data?.[0]?.district?.name || ''}
                  </Typography>
                </StyledLI>
                <StyledLI>
                  <MailIcon></MailIcon>
                  <Typography fontWeight={400} variant="body1" ml={'20px'}>
                    {data?.[0]?.email || 'Email mavjud emas!'}
                  </Typography>
                </StyledLI>
                <StyledLI>
                  <BusinessCenterIcon></BusinessCenterIcon>
                  <Typography fontWeight={400} variant="body1" ml={'20px'}>
                    {userRolesNames[(data?.[0]?.role ?? 1) - 1]}
                  </Typography>
                </StyledLI>
                <StyledLI>
                  <BusinessCenterIcon></BusinessCenterIcon>
                  <Typography fontWeight={400} variant="body1" ml={'20px'}>
                    PhD
                  </Typography>
                </StyledLI>
              </Stack>
            </Stack>
            <Link to={`/employee/edit/${browserStorage.get('user')?.id}`}>
              <Button
                sx={{
                  padding: '8px 12px',
                  width: 'auto',
                  background: '#1e1e1e',
                  color: '#fff',
                  borderRadius: '8px',
                }}
              >
                Tahrirlash
              </Button>
            </Link>
          </Stack>
          <Stack
            width={'calc(100% - 500px)'}
            border={'1px solid #637381'}
            borderRadius={'16px'}
            padding={'16px'}
          >
            <PageTab tabs={tabs} />
          </Stack>
        </Stack>
      </Stack>
      <CustomModal closeModal={closeDetailModal} open={isDetailOpen}>
        <Box width={'600px'} p={4} bgcolor={'#fff'}>
          <Stack>
            <Typography variant="h5" component="h1" fontWeight={600}>
              Ijtimoiy Tarmoq Qo'shish
            </Typography>
            <Formik
              enableReinitialize
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={handleSubmit}
              initialValues={{ social: null, link: '' }}
            >
              {({ values }) => (
                <Fragment>
                  <Form>
                    <StyledInpBox>
                      <StyledTextLabel>Ijtimoiy Tarmoq Tanlang</StyledTextLabel>
                      <FormikSelect
                        required
                        label=""
                        name="social"
                        options={socialMedia}
                        placeholder="Ijtimoiy Tarmoq tanlang"
                        getOptionLabel={(opt) => opt.label}
                        // onChange={(_, newValue) => {
                        //   setFieldValue('region', newValue)
                        //   setFieldValue('district', null)
                        // }}
                      />
                    </StyledInpBox>
                    <StyledInpBox>
                      <StyledTextLabel>Linkni kiriting</StyledTextLabel>
                      <FormikInput
                        // disabled={view}
                        required
                        name="link"
                        label=""
                        placeholder="https://"
                      />
                    </StyledInpBox>
                    <Stack
                      direction={'row'}
                      gap={'16px'}
                      margin={'10px 0'}
                      display={'flex'}
                      alignItems={'center'}
                    >
                      <StyledButton
                        style={{ border: '1px solid #000', background: '#fff' }}
                        onClick={closeDetailModal}
                      >
                        Bekor Qilish
                      </StyledButton>
                      <StyledButton
                        style={{ backgroundColor: '#000', color: '#fff' }}
                        type="submit"
                      >
                        Saqlash
                      </StyledButton>
                    </Stack>
                  </Form>
                </Fragment>
              )}
            </Formik>
          </Stack>
        </Box>
      </CustomModal>
    </Fragment>
  )
}

export default ProfileInfo

const StyledLI = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
})

const StyledInpBox = styled('div')({
  width: '100%',
  padding: '8px 0',
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  justifyContent: 'center',
})

const StyledTextLabel = styled('div')({
  padding: '10px 0',
  fontWeight: '400',
  fontSize: '14px',
})

const StyledButton = styled('button')({
  padding: '20px',
  fontWeight: '600',
  fontSize: '16px',
  borderRadius: '8px',
  border: 'none',
})
