import { Autocomplete, AutocompleteProps, TextField } from '@mui/material'

interface CustomAutocompleteProps
  extends Partial<AutocompleteProps<any, boolean, boolean, boolean>> {}

interface IProps extends CustomAutocompleteProps {
  placeholder?: string
}

export default function StatsSelect({ options, placeholder, ...props }: IProps) {
  return (
    <Autocomplete
      options={options || []}
      renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
      getOptionKey={(opt) => opt.value}
      getOptionLabel={(opt) => opt.label}
      isOptionEqualToValue={(option, value) => option.value == value.value}
      {...props}
    />
  )
}
