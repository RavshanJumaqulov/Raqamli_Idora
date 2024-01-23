import { SxProps, styled } from '@mui/material'
import { Field, FieldAttributes, FieldProps, ErrorMessage } from 'formik'

interface IProps extends FieldAttributes<any> {
  label?: string
  name: string
  sx?: SxProps
  required?: boolean
  iconRight?: JSX.Element
  iconLeft?: JSX.Element
  component?: string | React.ComponentType<FieldProps>
}

export default function FormikInput({
  label,
  sx,
  name,
  required,
  iconRight,
  iconLeft,
  component,
  ...props
}: IProps) {
  const validate = (val: string) => {
    let err: string = ''

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
        <Field  name={name} validate={required && validate} component={component} {...props} />
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
  '& input, textarea, select': {
    width: '100%',
    border: '1px solid #A0AEC0',
    borderRadius: '8px',
    '&:hover': {
      borderColor: 'grey',
    },
    '&:focus': {
      borderColor: '#0CAF60',
    },
    outline: 'none',
    height: '54px',
    padding: '15px',
    caretColor: '#0CAF60',
    transition: 'all 0.15s',
    fontSize: '16px',
    '&::placeholder': {
      color: '#A0AEC0',
    },
  },
  '& textarea': {
    height: '120px',
    resize: 'none',
  },
  '& .span-label': {
    fontSize: '14px',
    fontWeight: '600',
    marginBottom: '6px',
    marginLeft: '10px',
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
