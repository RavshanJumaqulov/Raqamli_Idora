import { Control, Controller, Path } from 'react-hook-form'
import InputMask from 'react-input-mask'
import Error from './Error.component'
import Label from './Label.component'

interface CardLifetimeInputProps<FormNames extends Record<string, any>> {
	control: Control<FormNames>
	name: Path<FormNames>
	label?: string
	required?: boolean
}

function CardLifetimeInput<FormNames extends Record<string, any>>({
	control,
	name,
	label = 'Muddati',
	required = true,
}: CardLifetimeInputProps<FormNames>) {
	return (
		<Controller
			name={name}
			control={control}
			// @ts-ignore
			defaultValue={''}
			rules={{
				pattern: {
					value: /^(0[1-9]|1[0-2])\/(1[89]|2[0-9]|3[0-5])$/,
					message: "Karta muddatini to'g'ri kiriting! (MM/YY)",
				},
				required: {
					value: required,
					message: 'Karta muddatini kiriting!',
				},
			}}
			render={({ field, fieldState, formState }) => (
				<span>
					<Label htmlFor={name}>{label}</Label>
					<InputMask
						mask="99/99"
						placeholder="MM/YY"
						maskChar={null}
						
						alwaysShowMask={true}
						type="text"
						disabled={formState.disabled}
						
						className="py-3 px-4 outline-none bg-light-gray rounded-lg border  text-base border-gray-200 w-full"
						onChange={field.onChange}
						value={field.value}
					/>
					{fieldState.error && <Error>{fieldState.error?.message}</Error>}
				</span>
			)}
		/>
	)
}

export default CardLifetimeInput
