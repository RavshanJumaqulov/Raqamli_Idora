import { Control, Controller, Path } from 'react-hook-form'
import Error from './Error.component'
import { StyledInputLabel } from './Label.component'
// import Icons from '@/assets/svg-icons'
import { Box, TextField, BaseTextFieldProps } from '@mui/material'
import { TRules } from '@src/types/types.common'
interface IInputProps<FormNames extends Record<string, any>> {
  rules?: TRules<FormNames>
  control: Control<FormNames>
  name: Path<FormNames>
  label?: string
  disabled?: boolean
  required?: boolean
  className?: string
  placeholder?: string
  type?: React.InputHTMLAttributes<unknown>['type']
  defaultLabel?: string
  variant?: string
  min?: number
  defaultValue?: number | string
  disableBorder?: boolean
}

function InputForm<FormNames extends Record<string, any>>({
  label = '',
  disabled = false,
  placeholder = '',
  className = '',
  control,
  name,
  required,
  type = 'text',
  defaultLabel,
  variant = 'outlined',
  min,
  defaultValue,
  disableBorder = false,
  rules = {},
  ...props
}: IInputProps<FormNames> & BaseTextFieldProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: {
          value: required,
          message: 'Kiriting!',
        },
        ...rules,
      }}
      render={({ field, fieldState: { error }, formState }) => (
        <Box sx={{ position: 'relative' }}>
          {label && <StyledInputLabel htmlFor={name}>{label}</StyledInputLabel>}
          <div className="relative">
            <TextField
              variant="outlined"
              // label={!!defaultLabel && defaultLabel}
              {...field}
              placeholder={placeholder}
              disabled={disabled || formState.disabled}
              id={name}
              autoComplete="false"
              required={required}
              defaultValue={defaultValue}
              type={type}
              error={!!error}
              className={className}
              sx={{
                width: '100%',
                '.hBKsXm': { borderRadius: '8px' },
                '.kbgbtg': {
                  height: '18.5px',
                },
                '.fwPlAn': {
                  borderWidth: disableBorder ? '0px' : '1px',
                },
                '.MuiOutlinedInput-notchedOutline': {
                  borderWidth: disableBorder ? '0px !important' : '1px',
                },
                '.jmGRjH': {
                  padding: '13.5px 14px',
                },
                '.jPqOlm': {
                  borderRadius: '8px',
                },
              }}
              {...props}
            />
          </div>
          {!!error && <Error>{error.message}</Error>}
        </Box>
      )}
    />
  )
}

export default InputForm
