import { Box } from '@mui/material'
import { DatePicker, LocalizationProvider, DatePickerProps } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Dayjs } from 'dayjs'
import { useContext } from 'react'
import { styled } from 'styled-components'
import { StatsContext } from './StatsContext'

interface IProps extends DatePickerProps<Dayjs> {}

export default function StatsDatePicker({ name, ...props }: IProps) {
  const { setData } = useContext(StatsContext)

  const formatDate = (date: Dayjs) => {
    return date ? date.format('YYYY-MM-DD') : ''
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledBox>
        <DatePicker
          onChange={(val) => {
            setData((prev) => ({ ...prev, [name]: formatDate(val) }))
          }}
          slotProps={{ field: { clearable: true } }}
          format="DD-MM-YYYY"
          {...props}
        />
      </StyledBox>
    </LocalizationProvider>
  )
}

export const StyledBox = styled(Box)`
  .MuiTextField-root {
    width: 200px;

    .MuiOutlinedInput-root {
      color: #637381;
      font-size: 14px;
      height: 54px;
      border-radius: 8px;
      border: 1px solid rgba(145, 158, 171, 0.2);
    }

    .Mui-focused .MuiOutlinedInput-notchedOutline {
      border: 1px solid #0caf60;
    }

    .MuiOutlinedInput-notchedOutline {
      border: none;
    }
  }
`
