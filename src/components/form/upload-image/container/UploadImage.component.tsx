import useUploadImage from '@hooks/useUploadImage'
import defaultImg from '@src/assets/images/employee/account.png'
import { isBlob } from '@utils/helper'
import { useEffect, useRef, useState } from 'react'
import { Control, Path, UseFormSetValue, useController } from 'react-hook-form'
import CloseIcon from '@mui/icons-material/Close'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import Error from '../../Error.component'
import Label from '../../Label.component'
import { Box, IconButton } from '@mui/material'
interface IUploadImage<FormNames extends Record<string, any>> {
  setValue: UseFormSetValue<FormNames>
  control: Control<FormNames>
  name: Path<FormNames>
  label?: string
  disabled?: boolean
  required?: boolean
  upload?: boolean
  style?: any
}

function UploadImage<FormNames extends Record<string, any>>({
  label,
  setValue,
  name,
  control,
  disabled,
  upload = false,
  required = true,
  style,
}: IUploadImage<FormNames>) {
  const inputRef = useRef<HTMLInputElement>(null)
  const inputContainer = useRef<HTMLDivElement>(null)
  const { uploadImage, isUploading, setImage } = useUploadImage((image) => {
    setValue(name, image as any)
  })
  const { field, fieldState, formState } = useController({
    name: name,
    control,
    rules: {
      required: {
        value: required,
        message: 'Rasm yuklang!',
      },
    },
  })

  const onSetImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files?.[0]

    const isImage = ['.jpg', '.png', '.jpeg'].some(
      (ext) => img?.name?.toLocaleLowerCase?.().endsWith?.(ext)
    )

    if (!isImage) {
      toast.error('Faqat rasm yuklashingiz mumkin')
      return
    }

    if (upload) {
      uploadImage({
        id: name,
        imageFile: img,
      })
    } else {
      setValue(name, img as any)
    }
  }
  const [imageDataUrl, setImageDataUrl] = useState(null)

  useEffect(() => {
    if (field.value && isBlob(field.value)) {
      // Read the contents of the image file and set the data URL
      const reader = new FileReader()
      reader.onload = (e) => {
        setImageDataUrl(e.target.result)
      }
      reader.readAsDataURL(field.value)
    } else if (typeof field.value === 'string') {
      setImageDataUrl(field.value)
    } else {
      // Reset the image data URL when no file is selected
      setImageDataUrl(null)
    }
  }, [field.value])

  const removeImage = () => {
    setImageDataUrl(null)
    setImage(undefined)
    setValue(name, undefined)
  }

  return (
    <StyledUploadImage style={style} hasValue={!!field.value}>
      <Label>{label}</Label>{' '}
      {field.value && !formState.disabled && !disabled && (
        <div aria-disabled={formState.disabled} className="remove">
          <IconButton onClick={removeImage}>
            <CloseIcon />
          </IconButton>
        </div>
      )}
      <div
        className="_container"
        ref={inputContainer}
        onClick={(e: any) => {
          inputRef.current.click()
        }}
      >
        <input
          type="file"
          id={name}
          accept="image/*"
          ref={inputRef}
          disabled={formState.disabled || disabled}
          onChange={onSetImage}
        />
        <img
          src={imageDataUrl || defaultImg}
          style={{ backgroundColor: '#fff', color: 'red' }}
          onClick={(e: any) => {
            inputRef.current.click()
          }}
        />
      </div>
      {/* {!field.value && (
        <div className="_info">Allowed *.jpeg, *.jpg, *.png, *.gif Max size of 3.1 MB</div>
      )} */}
      {isUploading && 'Loading'}
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        {fieldState.error && <Error>{fieldState.error?.message?.toString() || ''}</Error>}
      </Box>
    </StyledUploadImage>
  )
}

const StyledUploadImage = styled.div<{ hasValue: boolean }>`
  border: 1px solid var(--primary);
  max-width: 300px;
  margin: auto;
  border-radius: 16px;
  padding: 60px 25px;
  position: relative;
  .remove {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  ._info {
    text-align: center;
    width: 170px;
    margin: auto;
    margin-top: 24px;
  }
  ._container {
    position: relative;
    display: flex;
    justify-content: center;
    input {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 1px solid gray;
      position: relative;
      &::after {
        content: '';
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        right: 0;
      }
    }
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      object-fit: cover;
      left: 0;
      right: 0;
      text-align: center;
      display: block;
    }
    &::before {
      content: 'Rasm yuklang';
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      height: 150px;
      width: 150px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.237);
      color: white;
      font-size: medium;
      display: ${({ hasValue }) => (hasValue ? 'none' : 'flex')};

      z-index: 1000;
      position: absolute;
      margin-left: auto;
      margin-right: auto;
      left: 0;
      right: 0;
      text-align: center;
    }
  }
`

export default UploadImage
