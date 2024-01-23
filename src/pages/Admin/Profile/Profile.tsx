import PageTab from '@components/common/PageTab'
import { Box, Stack, styled } from '@mui/material'
import banner from '@assets/images/header/banner-profile.jpeg'
import profileDefault from '@assets/images/header/profile.png'
import { tabs } from '../../../data/profileData'
import { putMutation } from '@services/requests/CommonRequests'
import { Text } from '@styles/globalStyle'
import { FlexWrapper } from '@components/common/Flex'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router-dom'
import { SERVER_DATE_FORMAT } from '@src/constants'
import dayjs from 'dayjs'
import { DatePicker, InputForm, UploadImage } from '@components/form'
import { ProfileForm } from './profile.types'
import { ReactNode, useEffect } from 'react'
import CustomButton from '@components/common/CustomButton'
import { useMainContext } from '@contexts/MainProvider'
import { MainLoading } from '@components/common/Loading'
import { SocialMedia } from './components/SocialMedia'

export const userRolesNames = ['Admin', 'Viloyat admin', 'Tuman admin', 'Imom', 'Noib']

export const InfoText = ({ label, children }: { label?: string; children?: ReactNode }) => {
  return (
    <Box>
      <Text fs="14px" ff="Public Sans" fw="600" c="var(--textColor)">
        {label}:
      </Text>
      <Text
        fs="16px"
        ff="Public Sans"
        fw="600"
        c="#212B36"
        sx={{
          wordBreak: 'break-all',
        }}
      >
        {children}
      </Text>
    </Box>
  )
}

const Profile = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const isEditing = pathname.includes('/edit')

  const {
    state: { fullProfile: data, isFetchingProfile: isFetching },
    actions: { openSnackbar, refetchProfile: refetch },
  } = useMainContext()

  const { control, setValue, handleSubmit, reset } = useForm<ProfileForm>()

  const { mutate, isPending } = putMutation(`auth/self_profile/update/${data?.[0]?.profil?.id}`, {
    onSuccess: (data) => {
      openSnackbar({ message: "Muvaffaqiyatli qo'shildi", status: 'success' })
      const pathnames = pathname?.split('/edit')
      navigate(pathnames[0])
      reset()
      refetch()
    },
    onError: (err) => {
      openSnackbar({ message: err?.message, status: 'error' })
    },
  })
  useEffect(() => {
    if (data && isEditing) {
      reset({
        address: data?.[0]?.profil?.address,
        birth_date: dayjs(data?.[0]?.profil?.birth_date) as any,
        email: data?.[0]?.email,
        last_name: data?.[0]?.profil?.last_name,
        name: data?.[0]?.profil?.name,
        phone_number: data?.[0]?.profil?.phone_number,
        surname: data?.[0]?.profil?.surname,
        image: data?.[0]?.profil?.image,
      })
    }
  }, [data, isEditing])

  const submit = handleSubmit(async (values) => {
    const body: any = {
      ...values,
      birth_date: dayjs(values?.birth_date, SERVER_DATE_FORMAT).format(SERVER_DATE_FORMAT),
      //   ...(typeof values?.image !== "string" && {image: values?.image})
      image: typeof values?.image == 'string' ? null : values?.image,
    }

    mutate(body)
    // isEditing ? editEmployee(body) : createEmployee(body)
  })

  return (
    <Stack bgcolor="#fff" p="16px 24px" gap="16px" direction={'column'}>
      <Box>
        <Box
          sx={{
            width: '100%',
            height: '180px',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          <img
            src={banner}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            alt="Banner"
          />
        </Box>
        <Stack
          sx={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            mt: '-85px',
          }}
          gap={'16px'}
          direction={'row'}
          alignItems={'flex-end'}
        >
          <img
            src={data?.[0]?.profil?.image ? data?.[0]?.profil?.image : profileDefault}
            alt=""
            style={{ borderRadius: '50%', height: '170px', width: '170px', objectFit: 'cover' }}
          />

          <Stack pb={1}>
            <Text fs="24px" fw="bold">
              {(data?.[0]?.profil?.name ?? '') + ' ' + (data?.[0]?.profil?.surname ?? '')}
            </Text>
            <Text fs="16px" c={'#637381'}>
              {userRolesNames?.[+(data?.[0]?.role ?? 0) - 1]}
            </Text>
          </Stack>
        </Stack>
      </Box>
      {isFetching ? (
        <MainLoading />
      ) : (
        <>
          <Stack alignItems={'stretch'} pt="40px" gap={2} direction={'row'}>
            {isEditing ? (
              <StyledBox
                sx={{
                  maxWidth: '350px',
                  px: 3,
                  pb: 3,
                }}
              >
                <UploadImage
                  style={{ border: '0px' }}
                  name="image"
                  control={control}
                  setValue={setValue}
                />
              </StyledBox>
            ) : (
              <StyledBox sx={{ maxWidth: '350px' }}>
                <SocialMedia profile={data?.[0] ?? null} />
              </StyledBox>
            )}
            <StyledBox>
              <form onSubmit={submit}>
                {isEditing ? (
                  <FlexWrapper justifyContent={'end'} gap={2} mb={2}>
                    <CustomButton
                      type="button"
                      bgColor="transparent"
                      border="2px solid #000"
                      color="#000"
                      value={'Bekor qilish'}
                      onClick={() => {
                        const pathnames = pathname?.split('/edit')
                        navigate(pathnames[0])
                      }}
                      disable={isPending}
                    />
                    <CustomButton
                      disable={isPending}
                      type="submit"
                      bgColor="#000"
                      loading={isPending}
                      value={'Saqlash'}
                    />
                  </FlexWrapper>
                ) : (
                  <FlexWrapper justifyContent={'end'} gap={2} mb={2}>
                    <CustomButton
                      type="button"
                      bgColor="#000"
                      value={'Tahrirlash'}
                      onClick={() => navigate(pathname + '/edit')}
                    />
                  </FlexWrapper>
                )}
                {isEditing && (
                  <Stack direction={'row'} gap={2}>
                    <Stack width={'50%'} flexGrow={1} gap={2}>
                      <InputForm label="Ismi" control={control} name="name" />
                      <InputForm label="Familiyasi" control={control} name="last_name" />
                      <InputForm label="Otasining ismi" control={control} name="surname" />
                      <InputForm label="Manzili" control={control} name="address" />
                      <DatePicker label="Tug`ilgan sanasi" control={control} name="birth_date" />
                    </Stack>
                    <Stack width={'50%'} flexGrow={1} gap={2}>
                      <InputForm label="Telefon raqam" control={control} name="phone_number" />
                      {/* <InputForm label="Elektron pochta" control={control} name="email" />
                  <InputForm label="Login" control={control} name="login" />
                  <InputForm label="Parol" control={control} name="password" /> */}
                    </Stack>
                  </Stack>
                )}
                {!isEditing && (
                  <Stack direction={'row'} gap={2}>
                    <Stack width={'50%'} flexGrow={1} gap={2}>
                      <InfoText label="Ismi">{data?.[0]?.profil?.name}</InfoText>
                      <InfoText label="Familiyasi">{data?.[0]?.profil?.last_name}</InfoText>
                      <InfoText label="Otasining ismi">{data?.[0]?.profil?.surname}</InfoText>
                      <InfoText label="Manzili">{data?.[0]?.profil?.address}</InfoText>
                      <InfoText label="Tug`ilgan sanasi">{data?.[0]?.profil?.birth_date}</InfoText>
                    </Stack>
                    <Stack width={'50%'} flexGrow={1} gap={2}>
                      <InfoText label="Telefon raqam">{data?.[0]?.profil?.phone_number}</InfoText>
                      <InfoText label="Elektron pochta">{data?.[0]?.email}</InfoText>
                      <InfoText label="Login">Login</InfoText>
                      <InfoText label="Parol">Password</InfoText>
                    </Stack>
                  </Stack>
                )}
              </form>
            </StyledBox>
          </Stack>
          <StyledBox sx={{ minHeight: '350px' }}>
            <PageTab tabs={tabs} />
          </StyledBox>
        </>
      )}
    </Stack>
  )
}

export default Profile

const StyledBox = styled(Box)`
  border: 1px solid #637381;
  width: 100%;
  border-radius: 16px;
  padding: 16px;
`
