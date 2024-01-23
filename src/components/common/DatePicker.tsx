import { Stack } from '@mui/material'
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker as MUIDatePicker } from '@mui/x-date-pickers/DatePicker'
import { Text } from '@styles/globalStyle'
import { Dayjs } from 'dayjs'

type T = {
  value: Dayjs | null
  onChangePicker?: (value: Dayjs | null, key: string) => void
  label?: string
  keyPicker: string
  width?: string
  labelFontSize?: string
  mb?: string
  noWrapper?: boolean
  disabled?: boolean
  timePicker?: boolean
  views?
}

const DatePicker: React.FC<T> = ({
  value,
  onChangePicker,
  label,
  keyPicker,
  width,
  labelFontSize,
  mb,
  noWrapper = false,
  disabled,
  timePicker,
  views,
}) => {
  if (noWrapper)
    return (
      <Stack>
        <Text fs={labelFontSize || '12px'} color="textPrimary" mb={mb || '0px'}>
          {label}
        </Text>
        <MUIDatePicker
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          value={value}
          onChange={(e) => onChangePicker(e, keyPicker)}
          sx={{
            input: {
              //   padding: `5px 0 5px ${pl ? pl : "10px"}`,
              padding: '10px 15px',
              fontSize: '13px',
              fontWeight: '600',
              opacity: '0.6',
              color: 'var(--primary)',
              borderRadius: '20px',
            },
            '& .MuiInputBase-root': {
              borderRadius: '20px',
            },
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px',
            },
            height: '35px',
            width: width || '100%',
          }}
          disabled={disabled}
        />
      </Stack>
    )
  else
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack>
          <Text fs={labelFontSize || '12px'} color="textPrimary" mb={mb || '0px'}>
            {label}
          </Text>
          {timePicker ? (
            <TimePicker
              value={value}
              onChange={(e) => onChangePicker(e, keyPicker)}
              sx={{
                input: {
                  padding: '10px 15px',
                  fontSize: '13px',
                  fontWeight: '600',
                  opacity: '0.6',
                  color: 'var(--primary)',
                },
                height: '35px',
                width: width || '100%',
              }}
              disabled={disabled}
            />
          ) : (
            <MUIDatePicker
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              value={value}
              onChange={(e) => onChangePicker(e, keyPicker)}
              sx={{
                input: {
                  //   padding: `5px 0 5px ${pl ? pl : "10px"}`,
                  padding: '10px 15px',
                  fontSize: '13px',
                  fontWeight: '600',
                  opacity: '0.6',
                  color: 'var(--primary)',
                },
                height: '35px',
                width: width || '100%',
              }}
              disabled={disabled}
              views={views}
            />
          )}
        </Stack>
      </LocalizationProvider>
    )
}

export default DatePicker
