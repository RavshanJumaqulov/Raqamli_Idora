import CustomModal from '@components/common/CustomModal'
import { Box, IconButton, Stack } from '@mui/material'
import { Text } from '@styles/globalStyle'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ISocial, SocialForm } from '../profile.types'
import { getQuery, postMutation, putMutation } from '@services/requests/CommonRequests'
import { InputForm, SelectForm } from '@components/form'
import { FlexBetween, FlexWrapper } from '@components/common/Flex'
import CustomButton from '@components/common/CustomButton'
import AddIcon from '@mui/icons-material/Add'
import instagram from '@assets/images/socials/instagram.png'
import telegram from '@assets/images/socials/telegram.svg'
import whatsapp from '@assets/images/socials/whatsapp.png'
import tiktok from '@assets/images/socials/tik-tok.png'
import twitter from '@assets/images/socials/twitter.png'
import youtube from '@assets/images/socials/youtube.svg'
import facebook from '@assets/images/socials/facebook.svg'
import { useMainContext } from '@contexts/MainProvider'
import { IUserDetail } from '@src/types/userTypes'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import DeleteModal from '@components/common/DeleteModal'

export const socials = [
  { id: 1, icon: telegram, name: 'Telegram' },
  { id: 2, icon: instagram, name: 'Instagram' },
  { id: 3, icon: facebook, name: 'Facebook' },
  { id: 4, icon: tiktok, name: 'Tiktok' },
  { id: 5, icon: twitter, name: 'Twitter' },
  { id: 6, icon: youtube, name: 'Youtube' },
  { id: 7, icon: whatsapp, name: 'Whatsapp' },
]

export const SocialMedia = ({ profile }: { profile: IUserDetail }) => {
  const { control, handleSubmit, reset } = useForm<SocialForm>()

  const {
    actions: { openSnackbar },
  } = useMainContext()

  const [open, setOpen] = useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState<ISocial | null>(null)

  const handleClose = () => {
    reset()
    setSelected(null)
    setOpen(false)
  }
  const { data: socialData, refetch } = getQuery<ISocial[]>(
    'employee/socialmedia',
    [profile?.id],
    {
      enabled: !!profile?.profil?.id,
    },
    {
      params: {
        employee: profile?.profil?.id,
      },
    }
  )

  const { mutate: post, isPending: isCreatePending } = postMutation('employee/socialmedia', {
    onSuccess: () => {
      // closeDetailModal()
      handleClose()
      refetch()
      openSnackbar({ message: "Muvaffaqiyatli qo'shildi", status: 'success' })
    },
    onError: (error) => {
      openSnackbar({ message: error?.message, status: 'error' })
    },
  })
  const { mutate: put, isPending: isEditPending } = putMutation(
    `employee/socialmedia/${selected?.id}`,
    {
      onSuccess: () => {
        handleClose()
        refetch()
        openSnackbar({ message: "Muvaffaqiyatli qo'shildi", status: 'success' })
      },
      onError: (error) => {
        openSnackbar({ message: error?.message, status: 'error' })
      },
    }
  )

  useEffect(() => {
    if (open && selected) {
      reset({
        link: selected?.link,
        social_media: socials[+selected?.social_media - 1],
      })
    }
  }, [selected])

  const submit = handleSubmit(async (values) => {
    const body: any = {
      ...values,
      social_media: '' + values?.social_media?.id,
      employee: profile?.profil?.id,
    }

    !selected ? post(body) : put(body)
  })

  return (
    <Box>
      <CustomModal closeModal={handleClose} open={open}>
        <Box width={'600px'} p={4} bgcolor={'#fff'}>
          <Stack>
            <Text fs={'24px'} mb={2} fw={'600'} c={'unset'}>
              Ijtimoiy Tarmoq {selected ? "O'zgartirish" : "Qo'shish"}
            </Text>
            <form onSubmit={submit}>
              <Stack spacing={2}>
                <SelectForm
                  control={control}
                  name="social_media"
                  options={socials}
                  label="Ijtimoiy tarmoq tanlang"
                />
                <InputForm label="Link" name="link" control={control} />
                <FlexWrapper gap={2}>
                  <CustomButton
                    type="button"
                    bgColor="transparent"
                    border="2px solid #000"
                    color="#000"
                    value={'Bekor qilish'}
                    onClick={() => {
                      setOpen(false)
                      setSelected(null)
                    }}
                    disable={isCreatePending || isEditPending}
                  />
                  <CustomButton
                    disable={isCreatePending || isEditPending}
                    type="submit"
                    bgColor="#000"
                    loading={isCreatePending || isEditPending}
                    value={'Saqlash'}
                  />
                </FlexWrapper>
              </Stack>
            </form>
          </Stack>
        </Box>
      </CustomModal>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <FlexBetween>
          <Text fs="20px" fw="600" c="#212B36">
            Xodim ijtimoiy tarmoqlari
          </Text>
          <IconButton
            onClick={() => {
              setOpen(true)
              setSelected(null)
            }}
          >
            <AddIcon />
          </IconButton>
        </FlexBetween>
        <Stack
          sx={{
            height: '310px',
            overflowX: 'auto',
          }}
          gap={'12px'}
        >
          {socialData?.map((el, i) => (
            <FlexWrapper key={i} gap={2}>
              <img
                src={socials[+el?.social_media - 1]?.icon}
                alt={el?.link}
                style={{ width: '24px', height: '24px', objectFit: 'contain' }}
                className=""
              />
              <Box
                sx={{ cursor: 'pointer' }}
                flexGrow={1}
                onClick={() => {
                  window.open(el.link, '_blank')
                }}
              >
                <Text ff="Public Sans" c="unset" fs="12px" fw="600">
                  {socials[+el?.social_media - 1]?.name}:
                </Text>
                <Text ff="Public Sans" c="unset" fs="12px" fw="400">
                  {el?.link}
                </Text>
              </Box>
              <FlexWrapper>
                <IconButton
                  size="small"
                  onClick={() => {
                    setSelected(el)
                    setOpen(true)
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => {
                    setSelected(el)
                    setDeleteOpen(true)
                  }}
                >
                  <DeleteIcon color="error" fontSize="small" />
                </IconButton>
              </FlexWrapper>
            </FlexWrapper>
          ))}
        </Stack>
      </Box>
      <DeleteModal
        refetch={refetch}
        setOpen={setDeleteOpen}
        row={{ title: socials[+selected?.social_media - 1]?.name, id: selected?.id }}
        open={deleteOpen}
        path={`employee/socialmedia/`}
      />
    </Box>
  )
}
