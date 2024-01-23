import { Box, SxProps } from '@mui/material'
import { DatePicker, LocalizationProvider, DatePickerProps } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import { Field, ErrorMessage } from 'formik'
import { styled } from 'styled-components'

interface IProps extends DatePickerProps<Dayjs> {
  label?: string
  name: string
  sx?: SxProps
  required?: boolean
  iconRight?: JSX.Element
  iconLeft?: JSX.Element
  format?: string
}

export default function FormikDatePicker({
  label,
  sx,
  name,
  required,
  iconRight,
  iconLeft,
  format = 'YYYY-MM-DD',
  ...props
}: IProps) {
  const validate = (val: string) => {
    let err: string = ''

    if (!val) {
      err = "Ushbu maydon to'ldirilishi shart"
    }

    return err
  }

  const formatDate = (date: Dayjs) => {
    return date ? date.format('YYYY-MM-DD') : ''
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledBox
        sx={{
          input: {
            pl: iconLeft ? '45px' : '',
          },
          ...sx,
        }} //sx dagi stillar !important bilan berilishi kerak
      >
        {label && <span className="span-label">{label}</span>}
        <StyledInputBox>
          {iconLeft && <StyledIcon sx={{ left: '15px' }}>{iconLeft}</StyledIcon>}
          <Field name={name} validate={required && validate}>
            {({ field, form }) => (
              <DatePicker
                value={field.value ? dayjs(new Date(field.value)) : null}
                onChange={(value) => {
                  form.setFieldValue(name, formatDate(value))
                }}
                format={format}
                {...props}
              />
            )}
          </Field>
          {iconRight && <StyledIcon sx={{ right: '15px' }}>{iconRight}</StyledIcon>}
        </StyledInputBox>
        {required && <ErrorMessage name={name} component={StyledError} />}
      </StyledBox>
    </LocalizationProvider>
  )
}

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;

  .MuiTextField-root {
    width: 100%;

    .MuiOutlinedInput-root {
      border: 1px solid #a0aec0;
      height: 54px;
      border-radius: 8px;
      &:hover {
        border: 1px solid grey;
      }
    }

    .Mui-focused.MuiOutlinedInput-root {
      border: 1px solid #0caf60;
    }

    .Mui-error .MuiOutlinedInput-notchedOutline {
      border: 1px solid transparent;
    }

    .MuiOutlinedInput-notchedOutline {
      border: none;
    }
  }

  .span-label {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
    margin-left: 10px;
  }
`

const StyledInputBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

const StyledIcon = styled(Box)`
  display: grid;
  place-items: center;
  position: absolute;
`

const StyledError = styled.p`
  color: #e60019;
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
`
