import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Control, Path, useController } from 'react-hook-form'

interface FileType<FormNames extends Record<string, any>> {
    control: Control<FormNames>
    name: Path<FormNames>
    required?: boolean
    defaultLabel?: string
    disabled?: boolean
}

function CustomTextArea<FormNames extends Record<string, any>>({
    name,
    control,
    required = false,
    defaultLabel,
    disabled = false,
}: FileType<FormNames>) {
    const { field, fieldState } = useController({
        name: name,
        control,
        rules: {
            required: {
                value: required,
                message: 'Faylni yuklashingiz kerak kiriting!',
            },
        },
    })
    return (
        <Box
            sx={{
                position: "relative",
                "& textarea": {
                    p: 1,
                    width: "calc(100%)",
                    border: "1px solid #0000003f !important",
                    borderRadius: 3,
                    fontSize: 16,
                    fontFamily: "Ubuntu, sans-serif",
                    transition: "0.3s all",
                    background: (theme) =>
                        theme.palette.mode === "light" ? "#fff" : "#09090d3f",
                    color: "text.primary",
                    "&:hover": {
                        border: "1px solid transparent",
                    },
                    "&:focus": {
                        outline: "2px solid #0CAF60",
                        border: "none",
                    },
                    "&:focus-visible": {
                        outline: "2px solid #0CAF60",
                        border: "none",
                    },

                    "&::-webkit-resizer": {
                        display: "none",
                    },
                },
            }}
        >
            {
                defaultLabel && <Typography variant='subtitle2' sx={{ fontSize: 16, fontWeight: 600, lineHeight: '36px' }}>
                    {defaultLabel}
                </Typography>
            }
            <textarea
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                placeholder="Xabar qoldirish..."
                rows={4}
                disabled={disabled}
            />
            {
                fieldState.error && <Typography color='error.main'>
                    {fieldState.error.message}
                </Typography>
            }
        </Box>
    )
}

export default CustomTextArea