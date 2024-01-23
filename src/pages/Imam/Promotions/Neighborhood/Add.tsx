import CustomButton from '@components/common/CustomButton'
import { FlexWrapper } from '@components/common/Flex'
import { DatePicker, InputForm, SelectForm } from '@components/form'
import { useMainContext } from '@contexts/MainProvider'
import { ChevronLeft } from '@mui/icons-material'
import { Box, ButtonBase, Stack } from '@mui/material'
import { getQuery, postMutation, putMutation } from '@services/requests/CommonRequests'
import { SERVER_DATE_FORMAT } from '@src/constants'
import { getUser } from '@utils/helper'
import dayjs, { Dayjs } from 'dayjs'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { styled } from 'styled-components'
import { PARTICIPANTS_OPTIONS, TYPES_OPTIONS } from './data'
import { useEffect } from 'react'
import { MainLoading } from '@components/common/Loading'

interface IForm {
  participants: { name: string; id: number } | null
  types: { name: string; id: number } | null
  date: Dayjs
  comment: string
}

interface IPayload {
  imam: number
  participants: string
  types: string
  date: string
  comment?: string
}

interface IDetail {
  id: number
  imam: { id: number; name: string }
  comment: string
  participants: string
  types: string
  date: string
  updated_at: string
  created_at: string
}

export default function PromotionsNeighborhoodAdd() {
  const view = location.pathname?.split('/')?.includes('view')
  const { id } = useParams()
  const user = getUser()
  const {
    actions: { openSnackbar },
  } = useMainContext()
  const navigate = useNavigate()
  const prevPage = '/promotions/neighborhood/list'
  const navigateToPrev = () => {
    navigate(prevPage)
  }

  const { data: detail, isLoading: isDetailLoading } = getQuery<IDetail>(
    'neighborhood/detail/' + id,
    undefined,
    {
      enabled: !!id,
    }
  )

  const { control, handleSubmit, reset } = useForm<IForm>({
    defaultValues: {
      date: '',
      comment: '',
      participants: null,
      types: null,
    },
  })

  const { mutate: create, isPending: isCreating } = postMutation('neighborhood/create', {
    onSuccess: () => {
      openSnackbar({ message: "Muvaffaqiyatli qo'shildi", status: 'success' })
      navigateToPrev()
    },
    onError: (error) => {
      openSnackbar({ message: error?.message, status: 'error' })
    },
  })
  const { mutate: edit, isPending: isEditing } = putMutation('neighborhood/update/' + id + '/', {
    onSuccess: () => {
      openSnackbar({ message: 'Muvaffaqiyatli tahrir qilindi', status: 'success' })
      navigateToPrev()
    },
    onError: (error) => {
      openSnackbar({ message: error?.message, status: 'error' })
    },
  })

  const onSubmit = handleSubmit((vals) => {
    const { participants, types, date } = vals
    const payload: IPayload = {
      ...vals,
      imam: user.id,
      participants: participants.id.toString(),
      types: types.id.toString(),
      date: date.format(SERVER_DATE_FORMAT),
    }

    id ? edit(payload) : create(payload)
  })

  useEffect(() => {
    if (detail) {
      reset({
        ...detail,
        participants: PARTICIPANTS_OPTIONS.find((item) => item.id == +detail?.participants),
        types: TYPES_OPTIONS.find((item) => item.id == +detail?.types),
        date: dayjs(detail?.date),
      })
    }
  }, [detail])

  if (isDetailLoading) return <MainLoading />

  return (
    <StyledBox component={'form'} onSubmit={onSubmit}>
      <ButtonBase className="btn-back" onClick={navigateToPrev}>
        <ChevronLeft />
        Mahallalar
      </ButtonBase>

      <Box
        sx={{ gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, my: '20px' }}
        display={'grid'}
        rowGap={'16px'}
        columnGap={'32px'}
      >
        <Stack gap={'16px'}>
          <SelectForm
            disabled={view || isCreating || isEditing}
            label="Ishtirokchilar"
            control={control}
            name="participants"
            options={PARTICIPANTS_OPTIONS}
          />
          <SelectForm
            disabled={view || isCreating || isEditing}
            label="Turi"
            control={control}
            name="types"
            options={TYPES_OPTIONS}
          />
        </Stack>

        <Stack gap={'16px'}>
          <DatePicker
            disabled={view || isCreating || isEditing}
            label="Sana"
            control={control}
            name="date"
          />
          <InputForm
            disabled={view || isCreating || isEditing}
            label="Izoh"
            control={control}
            name="comment"
            multiline
            rows={4}
          />
        </Stack>
      </Box>

      {!view && (
        <FlexWrapper gap="16px" justifyContent={'flex-end'}>
          <CustomButton
            onClick={navigateToPrev}
            value={'Bekor qilish'}
            bgColor="#F2F5F9"
            fw="500"
            color="#828D9C"
            disable={isCreating || isEditing}
          />
          <CustomButton
            disable={isCreating || isEditing}
            loading={isCreating || isEditing}
            type="submit"
            value={'Saqlash'}
          />
        </FlexWrapper>
      )}
    </StyledBox>
  )
}

const StyledBox = styled(Box)`
  padding: 12px 24px;
  background-color: white;
`
