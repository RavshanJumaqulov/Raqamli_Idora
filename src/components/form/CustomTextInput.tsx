import { Box, IconButton, Stack, TextField, TextFieldVariants, Typography } from '@mui/material'
import { Control, Path, useController } from 'react-hook-form'
import Error from './Error.component'
import { CloseIcon } from '@components/icons/icons'


interface FileType<FormNames extends Record<string, any>> {
    control: Control<FormNames>
    name: Path<FormNames>
    required?: boolean
    defaultValue?: string
    label?: string
    placeholder?: string
    disabled?: boolean
    type?: string
    className?: string
    variant?: TextFieldVariants
    min?: number
    max?: number
    defaultLabel?: string
}

export default function CustomTextInput<FormNames extends Record<string, any>>({
    name,
    control,
    required = false,
    defaultValue = '',
    label,
    placeholder,
    disabled = false,
    type = 'text',
    className,
    variant = 'outlined',
    min,
    max,
    defaultLabel
}: FileType<FormNames>) {
    const { field, fieldState } = useController({
        name: name,
        control,
        rules: {
            required: {
                value: required,
                message: 'Maydonni to\'ldiring',
            },
        },
    })
    return (
        <Box sx={{ '& div': { p: '0px !important' }, position: 'relative' }}>{
            defaultLabel && <Stack direction={'row'} alignItems={'center'}>
                <Typography variant='subtitle2' sx={{ fontSize: 16, fontWeight: 600, lineHeight: '36px' }}>
                    {defaultLabel}
                </Typography> {
                    required && <>
                        <Typography variant='subtitle2' sx={{ fontSize: 16, fontWeight: 600, lineHeight: '36px' }}>
                            &nbsp;(
                        </Typography>
                        <Typography variant='subtitle2' sx={{ fontSize: 16, fontWeight: 600, lineHeight: '36px', color: 'error.main' }}>
                            majburiy
                        </Typography>
                        <Typography variant='subtitle2' sx={{ fontSize: 16, fontWeight: 600, lineHeight: '36px' }}>
                            )
                        </Typography>
                    </>
                }
            </Stack>
        }
            {
                (field.value && !disabled) && <IconButton
                    onClick={() => field.onChange('')}
                    sx={{
                        position: 'absolute',
                        right: type == 'number' ? 35 : 7,
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
            <TextField
                variant={variant}
                label={label}
                placeholder={placeholder}
                disabled={disabled}
                id={name}
                autoComplete="false"
                defaultValue={defaultValue}
                type={type}
                error={!!fieldState.error}
                className={className}
                inputProps={{ min: min, max: max, }}
                sx={{ width: '100%', py: 1.825, px: 1.825, '& fieldset': { borderRadius: 2 }, m: 0 }}
                {...field}
            />
            {!!fieldState.error && <Error>{fieldState.error.message}</Error>}
        </Box>
    )
}
