import { Control, Controller, FieldPath } from 'react-hook-form'
import { NumericFormat } from 'react-number-format'
import Label, { StyledInputLabel } from './Label.component'
import Error from './Error.component'
import { TRules } from '@src/types/types.common'
import { TextField } from '@mui/material'
interface IMoneyInput<FormNames extends Record<string, any>> {
  control?: Control<FormNames>
  name: FieldPath<FormNames>
  rules?: TRules<FormNames>
  label?: string
  placeholder?: string | number
  disabled?: boolean
  defaultValue?: any
  onChange?: (val: number | string) => void
}
function MoneyInput<FormNames extends Record<string, any>>({
  control,
  name,
  disabled,
  label,
  placeholder = '',
  rules = {
    required: {
      value: true,
      message: 'Kiriting!',
    },
  },
  onChange,
  defaultValue,
}: IMoneyInput<FormNames>) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => {
        return (
          <div style={{ position: 'relative' }}>
            {label && <StyledInputLabel>{label}</StyledInputLabel>}
            <NumericFormat
              value={field.value || ''}
              onBlur={field.onBlur}
              placeholder={String(placeholder)}
              disabled={disabled}
              name={field.name}
              allowLeadingZeros={true}
              thousandSeparator=" "
              allowNegative={true}
              sx={{
                '.hBKsXm': {
                  borderRadius: '8px',
                },
              }}
              inputProps={{
                style: {
                  width: '100%',
                },
              }}
              InputProps={{
                style: {
                  width: '100%',
                },
              }}
              style={{
                width: '100%',
              }}
              customInput={TextField}
              onValueChange={(val) => {
                field.onChange(val.floatValue || '')
                onChange?.(val.floatValue || '')
              }}
            />
            {fieldState.error && <Error>{fieldState.error.message}</Error>}
          </div>
        )
      }}
    />
  )
}

export default MoneyInput
