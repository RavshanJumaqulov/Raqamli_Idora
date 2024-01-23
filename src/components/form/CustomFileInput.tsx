import { Loading } from '@components/common/Loading'
import { UploadIcon } from '@components/icons/icons'
import { MainContext, MainContextType } from '@contexts/MainProvider'
import { Box, Stack, Typography } from '@mui/material'
import ImgItem from '@pages/Imam/InstructionDetail/components/UploadFileItem'
import { postMutation } from '@services/requests/CommonRequests'
import { AxiosResponse } from 'axios'
import React, { useContext, useEffect } from 'react'
import { Control, Path, useController } from 'react-hook-form'

interface StateItem {
  id: number
  image?: string
  video?: string
  file?: string
}

interface FileType<FormNames extends Record<string, any>> {
  control: Control<FormNames>
  name: Path<FormNames>
  required?: boolean
  accept?: string
  url?: string
  state?: StateItem[]
  setState?
  type?: 'image' | 'video' | 'file'
  defaultLabel?: string
  disabled?: boolean
}

function CustomFileInput<FormNames extends Record<string, any>>({
  name,
  control,
  required = false,
  accept,
  url,
  state,
  setState,
  type = 'image',
  defaultLabel,
  disabled=false
}: FileType<FormNames>) {
  const {
    actions: { openSnackbar },
  } = useContext<MainContextType>(MainContext)
  const { field, fieldState } = useController({
    name: name,
    control,
    rules: {
      required: {
        value: required,
        message: 'Fayl yuklashingiz kerak!',
      },
    },
  })

  useEffect(() => {
    if (type == 'file') {
      field.onChange({ file: state })
    }
    if (type == 'image') {
      field.onChange({ image: state })
    }
    if (type == 'video') {
      field.onChange({ video: state })
    }
  }, [state])

  const { mutate, isPending, isError } = postMutation(url, {
    onSuccess: (
      data: AxiosResponse<{ id: number; image?: string; file?: string; video?: string }>
    ) => {
      setState((state) => [...state, data.data])
      openSnackbar({ message: "Muvaffaqiyatli qo'shildi", status: 'success' })
    },
    onError: (error) => {
      openSnackbar({ message: "Xatolik! File hajmi katta bo'lishi mumkin", status: 'error' })
    },
  })
  const uploadFile = async (files: FileList) => {
    if (!!url) {
      if (type == 'file') {
        mutate({ file: files[0] })
        field.onChange({ file: files[0] })
      }
      if (type == 'image') {
        mutate({ image: files[0] })
        field.onChange({ image: files[0] })
      }
      if (type == 'video') {
        mutate({ video: files[0] })
        field.onChange({ video: files[0] })
      }
    } else {
      field.onChange(files[0])
    }
  }
  useEffect(() => {
    if (!!state) {
      if (state.length == 0) {
        field.onChange()
      }
      if (state.length == 0 && isError) {
        field.onChange()
      }
    }
  }, [state, isError])

  const deleteFile = () => {
    if(!disabled){
      field.onChange(null)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      {defaultLabel && (
        <Stack direction={'row'} alignItems={'center'}>
          <Typography
            variant="subtitle2"
            sx={{ fontSize: 16, fontWeight: 600, lineHeight: '36px' }}
          >
            {defaultLabel}
          </Typography>{' '}
          {required && (
            <>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: 16, fontWeight: 600, lineHeight: '36px' }}
              >
                &nbsp;(
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: 16, fontWeight: 600, lineHeight: '36px', color: 'error.main' }}
              >
                majburiy
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ fontSize: 16, fontWeight: 600, lineHeight: '36px' }}
              >
                )
              </Typography>
            </>
          )}
        </Stack>
      )}
      <Box
        component={'label'}
        sx={{
          my: 0.5,
          p: 3,
          width: '100%',
          minWidth: '100%',
          backgroundColor: 'rgba(145, 158, 171, 0.08)',
          borderRadius: 3,
          cursor: 'pointer',
          display: 'block',
          '& input': {
            display: 'none',
          },
        }}
      >
        <input
          type="file"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => uploadFile(e.target.files)}
          accept={accept}
          disabled={disabled}
        />
        <Stack alignItems={'center'}>
          <UploadIcon />
          <Typography sx={{ fontSize: '14px', color: '#919EAB' }}>Fayl yuklang</Typography>
        </Stack>
      </Box>
      {fieldState.error && <Typography color="error.main">{fieldState.error.message}</Typography>}

      {isPending && <Loading color="red" />}
      {!!field.value && !!field.value.name ? (
        <ImgItem url={field.value.name} type="file" event={deleteFile} />
      ) : (
        ''
      )}
    </Box>
  )
}

export default CustomFileInput
