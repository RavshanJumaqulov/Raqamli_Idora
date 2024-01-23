import { FileIcon, RemoveCircleIcon, UploadIcon } from '@components/icons/icons'
import { Box, Stack, SxProps, Typography } from '@mui/material'
import { extractFileNameFromUrl } from '@utils/helper'
import { FieldAttributes, ErrorMessage, Field } from 'formik'
import { styled } from 'styled-components'
import { useState } from 'react'
import { Loading } from '../Loading'

interface IProps extends FieldAttributes<any> {
  label?: string
  name: string
  sx?: SxProps
  required?: boolean
  accept?: string
  id?: string
}

const FormikUploadFile = ({
  label,
  sx,
  required,
  iconRight,
  iconLeft,
  name,
  accept,
  id,
  ...props
}: IProps) => {
  const [loading, setLoading] = useState(false)
  const validate = (val) => {
    let err: string = ''
    if (!val) {
      err = 'Siz fayl yuklamadingiz'
    }
    // if (file?.size > 2_100_000) {
    //   err = 'Fayl hajmi 2 MB dan oshmaasligi zarur'
    // }

    return err
  }

  return (
    <Field validate={required && validate} name={name}>
      {({ form, field }) => (
        <StyledBox sx={sx}>
          {label && <p className="label">{label}</p>}
          <label className="upload-area">
            <input
              id={name}
              type="file"
              onChange={async (e) => {
                const file = e.target.files[0]

                try {
                  setLoading(true)
                  await new Promise((resolve) => setTimeout(resolve, 500))
                  form.setFieldValue(name, file)
                } catch (error) {
                } finally {
                  setLoading(false)
                }
              }}
              accept={accept}
              {...props}
            />
            <Stack alignItems={'center'}>
              <UploadIcon />
              <Typography sx={{ fontSize: '14px', color: '#919EAB' }}>Fayl yuklang</Typography>
            </Stack>
          </label>

          {field.value && (
            <div className="files-box">
              {id ? (
                <a
                  href={field.value}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="file"
                >
                  <FileIcon />
                  <p className="file-name truncate">
                    {field.value?.name || extractFileNameFromUrl(field.value)}
                  </p>
                  <span
                    onClick={() => {
                      form.setFieldValue(name, null)
                    }}
                  >
                    <RemoveCircleIcon />
                  </span>
                </a>
              ) : (
                <div className="file">
                  <FileIcon />
                  <p className="file-name truncate">
                    {field.value?.name || extractFileNameFromUrl(field.value)}
                  </p>
                  <span
                    onClick={() => {
                      form.setFieldValue(name, null)
                    }}
                  >
                    <RemoveCircleIcon />
                  </span>
                </div>
              )}

              {loading && (
                <div className="file">
                  <Loading color="dark" />
                </div>
              )}
            </div>
          )}

          {required && <ErrorMessage name={name} component={StyledError} />}

          {!props?.disabled && (
            <div className="btn-box">
              <label className="add-btn" htmlFor={name}>
                <UploadIcon />
                Yuklash
              </label>
            </div>
          )}
        </StyledBox>
      )}
    </Field>
  )
}

export default FormikUploadFile

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
  .files-box {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 16px;
  }
  .file {
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 3px;
    background-color: #ebf8f3;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
    color: #00a76f;

    .file-name {
      width: 100px;
    }

    span {
      display: grid;
      place-items: center;
      cursor: pointer;
    }
  }
  .btn-box {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    .add-btn {
      cursor: pointer;
      border-radius: 8px;
      background-color: #00a76f;
      padding: 6px 12px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      font-weight: 700;
      color: white;
      svg {
        width: 20px;
        height: 20px;
        path {
          fill: white;
        }
      }
    }
  }
`
const StyledError = styled.p`
  color: #e60019;
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
`
