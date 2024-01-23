import { CloseIcon } from '@components/icons/icons'
import { FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Control, Path, useController } from 'react-hook-form'

interface SelectType<FormNames extends Record<string, any>> {
    label?: string
    defaultLabel?: string
    control: Control<FormNames>
    name: Path<FormNames>
    required?: boolean
    accept?: string
    options?: OptionsInterface[]
    disabled?: boolean
}

interface OptionsInterface {
    label: string
    id: number
}

function CustomSelect<FormNames extends Record<string, any>>({
    label,
    defaultLabel,
    name,
    control,
    required = false,
    options,
    disabled = false
}: SelectType<FormNames>) {
    const { field, fieldState } = useController({
        name: name,
        control,
        rules: {
            required: {
                value: required,
                message: 'Ma\'lumotlardan birini tanlang!',
            },
        },
    })
    return (
        <>
            <FormControl fullWidth>
                {
                    defaultLabel && <Typography variant='subtitle2' sx={{ fontSize: 16, fontWeight: 600, lineHeight: '36px' }}>
                        {defaultLabel}
                    </Typography>
                }
                {
                    label && <InputLabel >{label}</InputLabel>
                }
                {
                    (field.value && !disabled) && <IconButton
                        onClick={() => field.onChange('')}
                        sx={{
                            position: 'absolute',
                            right: 35,
                            bottom: 13,
                            width: 30,
                            height: 30,
                            zIndex: 1,
                            '& svg': {
                                fontSize: 20
                            }
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                }
                <Select
                    label={!!label ? label : null}
                    sx={{ borderRadius: 2 }}
                    disabled={disabled}
                    value={field.value}
                    placeholder='Tanlang'
                >

                    {
                        options && options.map((el: OptionsInterface) => <MenuItem onClick={() => field.onChange(el.id)} key={el.id} value={el.id}>{el.label}</MenuItem>)
                    }
                </Select>
            </FormControl>
            {
                fieldState.error && <Typography color='error.main'>
                    {fieldState.error.message}
                </Typography>
            }
        </>
    )
}

export default CustomSelect