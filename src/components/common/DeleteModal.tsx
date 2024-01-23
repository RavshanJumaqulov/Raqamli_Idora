import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import { FlexWrapper } from './Flex'
import CustomButton from './CustomButton'
import { styled } from 'styled-components'
import { deleteMutation } from '@services/requests/CommonRequests'
import { MainContext, MainContextType } from '@contexts/MainProvider'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'

interface IProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  path: string
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<any, Error>>
  row: any
}

export default function DeleteModal({ open, setOpen, path, refetch, row }: IProps) {
  const {
    actions: { openSnackbar },
  } = React.useContext<MainContextType>(MainContext)
  const handleClose = () => {
    setOpen(false)
  }

  const { mutate, isPending } = deleteMutation(path, {
    onSuccess: () => {
      handleClose()
      openSnackbar({ message: "Muvaffaqiyatli o'chirildi", status: 'success' })
      refetch()
    },
    onError: (error) => {
      openSnackbar({ message: error?.message, status: 'error' })
    },
  })

  const handleDelete = () => {
    mutate(row.id)
  }

  return (
    <React.Fragment>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle fontWeight={'600'} sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          O'chirish
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography fontWeight={'600'} gutterBottom>
            <strong>"{row?.title || row?.name || row?.direction?.title}"</strong> ni o'chirishni
            tasdiqlaysizmi?
          </Typography>
        </DialogContent>
        <DialogActions>
          <FlexWrapper gap="16px" justifyContent={'flex-end'}>
            <CustomButton
              onClick={handleClose}
              value={'Bekor qilish'}
              bgColor="white"
              fw="700"
              color="#212B36"
              disable={isPending}
              borderRadius="8px"
              border="1px solid var(--Soft-blue, #D6E7EF)"
            />
            <CustomButton
              onClick={handleDelete}
              disable={isPending}
              loading={isPending}
              value={'Ha'}
              bgColor="red"
            />
          </FlexWrapper>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  )
}

const BootstrapDialog = styled(Dialog)`
  & .MuiDialogContent-root {
    padding: 16px;
  }
  & .MuiDialogActions-root {
    padding: 16px;
  }
`
