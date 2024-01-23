import { Box, IconButton, Stack, Typography } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DATE_FORMAT } from '@src/constants'
import dayjs, { Dayjs } from 'dayjs'
import { Control, Controller, FieldPath } from 'react-hook-form'
import Error from './Error.component'
import { StyledInputLabel } from './Label.component'
import { CloseIcon } from '@components/icons/icons'

interface IDatePicker<FormNames extends Record<string, any>> {
  control: Control<FormNames>
  name: FieldPath<FormNames>
  required?: boolean
  label?: string
  minDate?: Dayjs
  maxDate?: Dayjs
  onlyTime?: boolean
  disabled?: boolean
  disableBorder?: boolean
  defaultLabel?: string
}

function DateInput<FormNames extends Record<string, any>>({
  control,
  name,
  minDate,
  maxDate,
  disableBorder,
  required = true,
  label,
  disabled = false,
  defaultLabel
}: IDatePicker<FormNames>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: {
          value: required,
          message: 'Majburiy qator',
        },
        validate: minDate ? (valDate: Dayjs) => valDate.isAfter(minDate) : undefined,
      }}
      render={({ field, fieldState: { error }, formState }) => {
        const value = field.value && dayjs(field.value, DATE_FORMAT)
        return (
          <Box sx={{ position: 'relative' }}>
            {
              label &&
              <StyledInputLabel htmlFor={name}>{label}</StyledInputLabel>
            }
            {
              defaultLabel && <Stack direction={'row'} alignItems={'center'}>
                <Typography variant='subtitle2' sx={{ fontSize: 16, fontWeight: 600, lineHeight: '36px' }}>
                  {defaultLabel}
                </Typography> {
                  required && <>
                    <Typography variant='subtitle2' sx={{ fontSize: 16, fontWeight: 600, lineHeight: '36px' }}>
                      &nbsp;(
                    </Typography>
                    <Typography variant='subtitle2' sx={{ fontSize: 16, fontWeight: 600, lineHeight: '36px', color: 'error.main' }}>
                      majburiy
                    </Typography>
                    <Typography variant='subtitle2' sx={{ fontSize: 16, fontWeight: 600, lineHeight: '36px' }}>
                      )
                    </Typography>
                  </>
                }
              </Stack>
            }
            {
              (field.value && !disabled) && <IconButton
                onClick={() => field.onChange('')}
                sx={{
                  position: 'absolute',
                  right: 35,
                  bottom: 13,
                  width: 30,
                  height: 30,
                  zIndex: 1,
                  '& svg': {
                    fontSize: 20
                  }
                }}
              >
                <CloseIcon />
              </IconButton>
            }
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                onChange={field.onChange}
                value={value}
                format={DATE_FORMAT}
                ampm={false}
                views={['year', 'month', 'day']}
                minDate={minDate ? minDate : null}
                maxDate={maxDate ? maxDate : null}
                disabled={formState.disabled || disabled}
                sx={{
                  width: '100%',
                  '& fieldset': {
                    borderRadius: 2,
                    borderColor: 'rgba(0, 0, 0, 0.23) !important',
                  },
                  '& input': {
                    p: 2,
                  },
                  '.fwPlAn': {
                    borderWidth: disableBorder ? '0px !important' : '1px',
                  },
                  "& > input:disabled": {
                    color: "#000"
                  },
                  '&:hover': {
                    '& fieldset': {
                      borderColor: '#000 !important'
                    }
                  }
                }}
                className="MuiOutlinedInput-input"
                slotProps={{
                  inputAdornment: {
                    className: 'p-[1px!important]',
                  },
                  field: {
                    id: name,
                    className: 'p-[1px!important]',
                  },
                  textField: {
                    id: name,
                    className: 'p-[1px!important]',
                  },
                }}
              />
              {error && <Error>{error.message}</Error>}
            </LocalizationProvider>
          </Box>
        )
      }}
    />
  )
}
export default DateInput
