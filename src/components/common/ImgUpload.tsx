import { UploadIcon } from '@components/icons/icons'
import { Box, Stack, Typography } from '@mui/material'
import { styled } from 'styled-components'

interface IProps {
  handleFile: (att: File) => void
  label?: string
}

export default function ImgUpload({ handleFile, label }: IProps) {
  const handleChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      handleFile(file)
    }
  }
  return (
    <StyledBox>
      {label && <p className="label">{label}</p>}
      <label className="upload-area">
        <input type="file" onChange={handleChange} accept=".jpg,.jpeg,.png" />
        <Stack alignItems={'center'}>
          <UploadIcon />
          <Typography sx={{ fontSize: '14px', color: '#919EAB' }}>Rasm yuklang</Typography>
        </Stack>
      </label>
    </StyledBox>
  )
}

const StyledBox = styled(Box)`
  .label {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 6px;
    margin-left: 10px;
  }
  input {
    display: none;
  }
  .upload-area {
    width: 100%;
    padding: 25px;
    display: block;
    background-color: rgba(145, 158, 171, 0.08);
    border-radius: 12px;
    cursor: pointer;
  }
`
