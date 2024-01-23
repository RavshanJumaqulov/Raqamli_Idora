import { Control, Controller, Path } from 'react-hook-form'
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import Error from './Error.component'
import Label, { StyledInputLabel } from './Label.component'
import { TRules } from '@src/types/types.common'
import styled from 'styled-components'

interface IPhoneInputProps<FormNames extends Record<string, any>> {
  label?: string
  className?: string
  rules?: TRules<FormNames>
  control: Control<FormNames>
  name: Path<FormNames>
  disabled?: boolean
}

function PhoneInput<FormNames extends Record<string, any>>({
  name,
  label = 'Telefon raqam',
  className = '',
  rules,
  control,
  disabled = false,
}: IPhoneInputProps<FormNames>) {
  const mergedRules: TRules<FormNames> = {
    minLength: {
      value: 12,
      message: "Raqamni to'liq kiriting!",
    },
    ...rules,
  }
  return (
    <>
      <Controller
        name={name}
        rules={mergedRules}
        control={control}
        // @ts-ignore
        defaultValue={'+998'}
        render={({ field, fieldState, formState }) => {
          return (
            <StypedPhoneInput style={{ position: 'relative' }}>
              {label && <StyledInputLabel htmlFor={name}>{label}</StyledInputLabel>}
              <span className="relative">
                <ReactPhoneInput
                  onlyCountries={['uz']}
                  onChange={field.onChange}
                  value={field.value}
                  disabled={formState.disabled || disabled}
                  countryCodeEditable={false}
                  inputProps={{
                    id: name,
                    style: {
                      width: '100%',
                    },
                    className:
                      className +
                      ' py-3 px-4 outline-none !disabled:cursor-default bg-light-gray rounded-lg border  text-base border-gray-200 w-[20%] w-full ',
                  }}
                />
              </span>
              {fieldState.error && <Error>{fieldState.error.message}</Error>}
            </StypedPhoneInput>
          )
        }}
      />
    </>
  )
}
const StypedPhoneInput = styled.span`
  width: 100%;
  .react-tel-input {
    input {
      padding: 16.5px 14px !important;
      border-radius: 8px;
      border: rgba(0, 0, 0, 0.23) 1px solid;
      outline: none;
      font-size: 16px;
      &:hover {
        border-color: black;
      }
      &:focus {
        border-color: #0caf60;
      }
    }
    .flag-dropdown {
      visibility: hidden;
    }
  }
`

export default PhoneInput
