import {
  FormControlLabel,
  Radio,
  RadioGroup,
  SxProps,
  RadioGroupProps,
  Typography,
  Box,
} from '@mui/material'
import { ErrorMessage, Field } from 'formik'
import { styled } from 'styled-components'

interface IProps extends RadioGroupProps {
  name: string
  sx?: SxProps
  required?: boolean
  label?: string
  options: { value: string | number; label?: string }[],
  disabled?: boolean
}

export default function FormikRadioGroup({ name, sx, required, label, options, ...props }: IProps) {
  const validate = (val) => {
    let err = ''
    if (!val) {
      err = 'Tanlash shart'
    }
    return err
  }
  return (
    <StyledBox sx={sx}>
      {label && <label className="label">{label}</label>}
      <Field name={name} validate={required && validate}>
        {({ form, field }) => (
          <RadioGroup
            value={field.value}
            onChange={(e) => {
              form.setFieldValue(name, e.target.value)
            }}
            {...props}
          >
            {options.map((opt) => (
              <FormControlLabel
                key={opt.value}
                value={opt.value}
                control={<Radio />}
                label={opt.label}
                disabled={props?.disabled}
              />
            ))}
          </RadioGroup>
        )}
      </Field>

      {required && <ErrorMessage name={name} component={StyledError} />}
    </StyledBox>
  )
}

const StyledBox = styled(Box)`
  & .label {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 12px;
  }
  & .MuiFormGroup-root {
    display: flex;
    column-gap: 20px;
    flex-wrap: wrap;
    flex-direction: row;

    & svg {
      fill: #637381;
    }
  }
`
const StyledError = styled.p`
  color: #e60019;
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
`
