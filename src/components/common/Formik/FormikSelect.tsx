import { SxProps, styled, Autocomplete, TextField, AutocompleteProps } from '@mui/material'
import { Field, ErrorMessage } from 'formik'

interface CustomAutocompleteProps
  extends Partial<AutocompleteProps<any, boolean, boolean, boolean>> {}
interface IProps extends CustomAutocompleteProps {
  label?: string
  name: string
  sx?: SxProps
  required?: boolean
  iconRight?: JSX.Element
  iconLeft?: JSX.Element
  placeholder?: string
}

export default function FormikSelect({
  label,
  sx,
  name,
  required,
  iconRight,
  iconLeft,
  options,
  placeholder = 'Tanlang',
  ...props
}: IProps) {
  const validate = (val: string) => {
    let err: string = ''

    if (props.multiple && val && !val.length) {
      err = "Ushbu maydon to'ldirilishi shart"
    }

    if (!val) {
      err = "Ushbu maydon to'ldirilishi shart"
    }

    return err
  }

  return (
    <StyledLabel
      sx={{
        input: {
          pl: iconLeft ? '45px' : '',
        },
        ...sx,
      }} //sx dagi stillar !important bilan berilishi kerak
    >
      {label && <span className="span-label">{label}</span>}
      <StyledInputBox>
        {iconLeft && <StyledIcon sx={{ left: '15px' }}>{iconLeft}</StyledIcon>}
        <Field name={name} validate={required && validate}>
          {({ field, form }) => (
            <Autocomplete
              options={options || []}
              renderInput={(params) => <TextField {...params} placeholder={placeholder} />}
              getOptionKey={(opt) => opt.id}
              getOptionLabel={(opt) => opt.label}
              value={field.value}
              onChange={(_, newValue) => {
                form.setFieldValue(name, newValue)
              }}
              isOptionEqualToValue={(option, value) => option.id == value.id}
              noOptionsText="Topilmadi"
              {...props}
            />
          )}
        </Field>
        {iconRight && <StyledIcon sx={{ right: '15px' }}>{iconRight}</StyledIcon>}
      </StyledInputBox>
      {required && <ErrorMessage name={name} component={StyledError} />}
    </StyledLabel>
  )
}
const StyledLabel = styled('label', { shouldForwardProp: (prop) => prop !== 'sx' })({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  '& .MuiAutocomplete-root': {
    width: '100%',
  },
  '& .MuiInputBase-root': {
    width: '100%',
    minHeight: '47px',
    borderRadius: '8px',
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #0CAF60 !important',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      border: '1px solid grey',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      border: '1px solid #A0AEC0',
    },
  },
  '& .span-label': {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '6px',
    marginLeft: '10px',
  },
  '& .MuiChip-root': {
    textTransform: 'capitalize',
  },
  '& .MuiInputBase-input': {
    textTransform: 'capitalize',
  },
})

const StyledInputBox = styled('div', { shouldForwardProp: (prop) => prop !== 'sx' })({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
})

const StyledIcon = styled('span', { shouldForwardProp: (prop) => prop !== 'sx' })({
  display: 'grid',
  placeItems: 'center',
  position: 'absolute',
})

const StyledError = styled('p', { shouldForwardProp: (prop) => prop !== 'sx' })({
  color: '#E60019',
  fontSize: '14px',
  fontWeight: '500',
  marginTop: '4px',
})
