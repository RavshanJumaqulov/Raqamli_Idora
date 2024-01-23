import { Checkbox, CheckboxProps, SxProps } from '@mui/material'
import { Field } from 'formik'
import { styled } from 'styled-components'

interface Iprops extends CheckboxProps {
  name: string
  label?: string
  sx?: SxProps
}

export default function FormikCheckbox({ name, label, sx, ...props }: Iprops) {
  return (
    <StyledBox sx={sx}>
      <Field name={name}>
        {({ form, field }) => (
          <Checkbox
            checked={field.value}
            onChange={(e) => {
              form.setFieldValue(name, e.target.checked)
            }}
            // inputProps={{ 'aria-label': 'controlled' }}
            {...props}
          />
        )}
      </Field>
      {label && <label className="checkbox-label">{label}</label>}
    </StyledBox>
  )
}

const StyledBox = styled.label`
  display: flex;
  align-items: center;

  & .label {
    font-size: 14px;
    color: '#212B36';
  }
  & svg {
    fill: #637381;
  }
`
