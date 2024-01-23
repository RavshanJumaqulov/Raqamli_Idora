import useDebounce from '@hooks/useDebounce'
import { ExpandMore } from '@mui/icons-material'
import {
  Autocomplete,
  AutocompleteInputChangeReason,
  AutocompleteProps,
  Box,
  CircularProgress,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import * as React from 'react'
import { useEffect, useState } from 'react'
import CustomTextField from './CustomTextField'

type CustomAutoCompleteProps<T> = Omit<
  AutocompleteProps<T, false, false, false>,
  'renderInput' | 'options'
> & {
  label?: string
  name?: string
  queryFn: (data) => Promise<T[]>
  options?: unknown[]
  clearSearch?: boolean
  value?: unknown
  validationError?: boolean
  isTable?: boolean
  endAdornment?
  inputHeight?: string
  haveOverFlow?: boolean
  width?: string
}

const AsyncAutocomplete: React.FC<CustomAutoCompleteProps<unknown>> = ({
  clearSearch,
  queryFn,
  value,
  options,
  validationError,
  endAdornment,
  inputHeight,
  width,
  ...autocompleteProps
}) => {
  const [searchText, setSearchText] = useState('')
  const search = useDebounce(searchText, 500)
  const [autocompleteOpen, setAutocompleteOpen] = useState(false)

  const { data, isLoading } = useQuery({
    queryKey: [autocompleteProps?.label, 'options', search],
    queryFn: () => queryFn({ search }),
    enabled: autocompleteOpen,
    refetchOnWindowFocus: false,
  })

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    value: string,
    reason: AutocompleteInputChangeReason
  ) => {
    setSearchText(value)
    autocompleteProps?.onInputChange && autocompleteProps.onInputChange(event, value, reason)
  }

  useEffect(() => {
    if (clearSearch) setSearchText('')
  }, [clearSearch])

  const handleOpen = () => setAutocompleteOpen(true)
  const handleClose = () => setAutocompleteOpen(false)

  useEffect(() => {
    if (clearSearch) setSearchText('')
  }, [clearSearch])

  return (
    <Box width={autocompleteProps?.fullWidth ? '100%' : width}>
      <Autocomplete
        popupIcon={<ExpandMore />}
        options={[...(data || []), ...(options || [])]}
        value={value}
        loading={isLoading}
        onOpen={handleOpen}
        onClose={handleClose}
        {...autocompleteProps}
        renderInput={(params) => (
          <CustomTextField
            {...params}
            label={autocompleteProps.label}
            InputProps={{
              ...params.InputProps,

              endAdornment: endAdornment || (
                <>
                  {autocompleteProps.loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
            customHandleChange={autocompleteProps?.onChange}
            error={validationError}
            height={inputHeight}
            haveOverFlow={autocompleteProps?.multiple}
            // height={inputHeight}
            // sx={{ bgcolor: "salmon", color: "#fff" }}
          />
        )}
        ListboxProps={{
          style: { fontSize: '12px' },
        }}
        onInputChange={handleInputChange}
      />
    </Box>
  )
}

export default React.memo(AsyncAutocomplete)
