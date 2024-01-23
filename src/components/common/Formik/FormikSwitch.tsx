import { Field } from 'formik'
import { IOSSwitch } from '../IosSwitch'
import { SwitchProps } from '@mui/material'

interface IProps extends SwitchProps {
  name: string
}

export default function FormikSwitch({ name, ...props }: IProps) {
  return (
    <Field name={name}>
      {({ field, form }) => (
        <IOSSwitch
          checked={field.value}
          onChange={(e) => {
            form.setFieldValue(name, e.target.checked)
          }}
          {...props}
        />
      )}
    </Field>
  )
}
