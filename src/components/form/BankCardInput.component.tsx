import { Control, Controller, Path } from 'react-hook-form'
import InputMask from 'react-input-mask'
import Error from './Error.component'
import Label from './Label.component'

interface BankCardInputProps<FormNames extends Record<string, any>> {
	control: Control<FormNames>
	name: Path<FormNames>
	label?: string
}

function BankCardInput<FormNames extends Record<string, any>>({
	control,
	name,
	label = 'Karta raqami',
}: BankCardInputProps<FormNames>) {
	return (
		<Controller
			name={name}
			control={control}
			defaultValue={undefined}
			rules={{
				required: 'Kartani kiriting!',
				pattern: {
					value: /^\d{4} \d{4} \d{4} \d{4}$/,
					message: "Karta raqamini to'g'ri kiriting! (9999 9999 9999 9999)",
				},
			}}
			render={({ field, fieldState, formState }) => {
				return (
					<span>
						<Label htmlFor={name}>{label}</Label>
						<InputMask
							mask="9999 9999 9999 9999"
							placeholder="8600 0000 **** **34"
							
							maskChar={null} 
							alwaysShowMask={true}
							disabled={formState.disabled}
							type="text"
							
							className="py-3 px-4 outline-none bg-light-gray rounded-lg border  text-base border-gray-200 !disabled:border-gray-200 w-full"
							onChange={field.onChange}
							
							
							value={field.value}
						/>
						{fieldState.error && <Error>{fieldState.error.message}</Error>}
					</span>
				)
			}}
		/>
	)
}

export default BankCardInput
