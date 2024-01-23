import { Control, Controller, Path } from 'react-hook-form'
import Error from './Error.component'
import OTPInput from 'react-otp-input'
interface IOTPForm<FormNames extends Record<string, any>> {
  name: Path<FormNames>
  control: Control<FormNames>
  numInputs?: number
}
const OTPForm = <FormNames extends Record<string, any>>({
  name,
  control,
  numInputs = 6,
}: IOTPForm<FormNames>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: {
          value: true,
          message: 'Bir martalik kodni kiriting',
        },
        minLength: {
          value: numInputs,
          message: 'Bir martalik kodni to`liq kiriting',
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <span className="_tw-otp-input">
          <OTPInput
            numInputs={numInputs}
            renderSeparator={<span> </span>}
            inputType="number"
            renderInput={(props) => (
              <input
                {...props}
                className="w-[80px!important] h-12 py-2 px-4 font-semibold outline-none text-[20px!important] bg-light-gray border transition-all border-gray-200  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block no-number-inner-spin"
              />
            )}
            {...field}
            shouldAutoFocus
          />
          {!!error && <Error>{error.message}</Error>}
        </span>
      )}
    />
  )
}

export default OTPForm
