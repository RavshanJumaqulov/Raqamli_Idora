import { ReactNode, useState } from 'react'
import { Control, Controller, Path } from 'react-hook-form'
import ReactSelect, { FormatOptionLabelMeta } from 'react-select'

import { ITableData, Option } from '@src/types/types.common'
import styled from 'styled-components'
import Error from './Error.component'
import { StyledInputLabel } from './Label.component'
import { getQuery } from '@services/requests/CommonRequests'
import useDebounce from '@hooks/useDebounce'
import { toCapitalize } from '@utils/helper'
interface ISelect<FormNames extends Record<string, any>, TOption> {
  control: Control<FormNames>
  name: Path<FormNames>
  placeholder?: string
  options?: readonly Option<TOption>[]
  label?: string
  required?: boolean
  className?: string
  disabled?: boolean
  onChange?: (option: Option) => void
  renderOption?: (data: Option, formatOptionLabelMeta: FormatOptionLabelMeta<Option>) => ReactNode
  dataUrl?: string
  params?: Record<string, any>
  isPerson?: boolean
  isMosque?: boolean
}
function Select<FormNames extends Record<string, any>, TOption>({
  name,
  placeholder = 'Tanlang...',
  control,
  options,
  label,
  required = true,
  className = '',
  onChange,
  disabled = false,
  dataUrl,
  params = {},
  isPerson,
  isMosque,
}: ISelect<FormNames, TOption>) {
  const [searchVal, setSearchVal] = useState<string>('')
  const debVal = useDebounce(searchVal, 500)
  const { data: searchedOptions, isFetching } = getQuery<ITableData>(
    dataUrl,
    [debVal, params],
    {
      enabled: !!dataUrl,
    },
    {
      params: { search: debVal, limit: 10, ...params },
    }
  )
  const selectOptions = searchedOptions?.results || options
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: {
          value: required,
          message: 'Tanlang!',
        },
        validate: (val: Option) => {
          return !!val.id
        },
      }}
      render={({ field, fieldState, formState }) => {
        if (!field?.value?.name && field?.value?.id && options?.length) {
          const findingOption = options.find((option) => option.id === field.value?.id)?.name
          field.value = {
            ...field.value,
            name: findingOption,
          }
        }
        if (!field?.value?.id) {
          field.value = {
            ...field.value,
            id: undefined,
            value: undefined,
          }
        }
        return (
          <StyledReactSelect>
            <StyledInputLabel>{label}</StyledInputLabel>
            <ReactSelect
              isMulti={false}
              options={selectOptions}
              placeholder={placeholder}
              getOptionLabel={(option: any) =>
                (isPerson
                  ? `${option?.name || ''} ${option?.last_name || ''}`
                  : isMosque
                    ? `${option?.name + (option?.name ? ' | ' : '') || ''}  ${toCapitalize(
                        option?.district?.name
                      )}`
                    : option.name) || ''
              }
              getOptionValue={(option) => option.id}
              isLoading={isFetching}
              className={className}
              isDisabled={formState.disabled || disabled}
              onInputChange={(newVal) => {
                setSearchVal(newVal)
              }}
              {...field}
              onChange={(newVal) => {
                field.onChange(newVal as Option)
                onChange?.(newVal as Option)
              }}
              classNames={{
                control: () => 'control',
              }}
              components={{
                IndicatorSeparator: null,
              }}
            />
            {fieldState.error && <Error>{fieldState.error.message}</Error>}
          </StyledReactSelect>
        )
      }}
    />
  )
}

const StyledReactSelect = styled.span`
  .control {
    padding: 6px 8px;
    border-radius: 8px;
    box-shadow: none !important;
  }
  .css-t3ipsp-control:hover {
    border-color: var(--primary) !important;
  }
  .css-t3ipsp-control {
    border-color: var(--primary) !important;
  }
`

export default Select
