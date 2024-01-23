import { ChangeEvent, useCallback } from 'react'
import { Control, Controller, ControllerRenderProps, Path } from 'react-hook-form'
import Error from './Error.component'
import Label from './Label.component'
import { TRules } from '@src/types/types.common'
import { TextField } from '@mui/material'

interface PassportInputProps<FormNames extends Record<string, any>> {
  label?: string

  control: Control<FormNames>
  name: Path<FormNames>
}

function PassportInput<FormNames extends Record<string, any>>({
  control,
  name,
  label = 'Passport raqami / PINFL',
}: PassportInputProps<FormNames>) {
  const rules: TRules<any> = {
    required: 'Passport malumotlarini kiriting!',
    pattern: {
      value: /^(?:[A-Z]{2}\d{7}|\d{14})$/,
      message: "Passport malumotini to'g'ri kiriting! (AA1234567 yoki 14-raqamlik PINFL)",
    },
  }

  const _onChange = useCallback(
    (
      field: ControllerRenderProps<FormNames, Path<FormNames>>,
      e: ChangeEvent<HTMLInputElement>
    ) => {
      let newValue = e.target.value.toLocaleUpperCase()
      if (!/^[A-Z0-9|]+$/.test(newValue)) {
        newValue = newValue.slice(0, -1)
      }
      field.onChange({
        target: {
          value: newValue,
        },
      })
    },
    []
  )

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState, formState }) => (
        <span>
          <Label>{label}</Label>
          <span className="relative">
            <TextField
              onChange={_onChange.bind(null, field)}
              value={field.value}
              disabled={formState.disabled}
              placeholder="AA1234567 / PINFL"
              inputProps={{
                // @ts-ignore
                maxLength: 14,
              }}
            />
          </span>
          {fieldState.error && <Error>{fieldState.error?.message}</Error>}
        </span>
      )}
      rules={rules}
    />
  )
}

export default PassportInput
