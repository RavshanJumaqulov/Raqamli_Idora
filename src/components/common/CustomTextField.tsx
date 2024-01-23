import { forwardRef, useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Box, SxProps } from '@mui/material'
import TextField, { TextFieldProps } from '@mui/material/TextField'

import useDebounce from '@hooks/useDebounce'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { Text } from '@styles/globalStyle'

const CustomTextField = forwardRef(
  (
    props: TextFieldProps & {
      height?: string
      width?: string
      wrapperWidth?: string
      fontsize?: string
      labelFontSize?: string
      gap?: string
      border?: boolean
      fullWidth?: boolean
      table?: boolean
      onOpen?: () => void
      onChange?
      customHandleChange?
      borderRadius?: string
      haveOverFlow?: boolean
      sx?: SxProps
    },
    ref
  ) => {
    const {
      size = 'small',
      InputLabelProps,
      height,
      width,
      fontsize,
      labelFontSize,
      border = true,
      fullWidth,
      table,
      onOpen,
      gap,
      wrapperWidth,
      onChange,
      customHandleChange,
      borderRadius,
      sx,
      haveOverFlow,
      ...rest
    } = props

    const [showPassword, setShowPassword] = useState(false)

    const handleTogglePasswordVisibility = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword)
    }

    const [inputValue, setInputValue] = useState(props.value)
    const debouncedInputValue = useDebounce(inputValue, 500) // Adjust the delay as needed

    const handleChange = (event) => setInputValue(event.target.value)

    useEffect(() => {
      if (onChange) onChange({ ...rest, target: { name: props.name, value: debouncedInputValue } })
    }, [debouncedInputValue])

    return (
      <Box width={wrapperWidth || '100%'}>
        <Text fs={labelFontSize || '12px'} mb={gap || '5px'} fw="500">
          {rest.label}
        </Text>
        <TextField
          InputProps={{
            endAdornment: props.type === 'password' && (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? (
                    <VisibilityOffIcon fontSize="small" />
                  ) : (
                    <VisibilityIcon fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          size={size}
          inputRef={ref}
          SelectProps={{
            IconComponent: ExpandMoreIcon,
          }}
          fullWidth={fullWidth}
          onChange={customHandleChange || handleChange}
          value={
            customHandleChange || (!customHandleChange && !props.onChange)
              ? props.value
              : inputValue
          }
          sx={{
            '& .MuiInputBase-root': {
              height: height || '40px',
              fontSize: fontsize,
              width,
              fontFamily: 'Poppins, sans-serif',
              borderRadius: borderRadius || '8px',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                // borderColor: '#002E18',
              },
              overflow: haveOverFlow && 'auto',
            },
            '& .MuiInputLabel-root': {
              fontSize: labelFontSize,
              fontFamily: 'Poppins, sans-serif',
            },
            div: {
              border: !border && 'none !important',
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
              border: '1px solid',
              borderColor: 'green.light',
            },
            ...sx,
          }}
          InputLabelProps={{ shrink: true, ...InputLabelProps }}
          {...rest}
          type={
            showPassword || props.type !== 'password'
              ? props.type === 'time'
                ? 'time'
                : 'text'
              : 'password'
          }
          label={null}
        />
      </Box>
    )
  }
)

export default CustomTextField
