import { ErrorMessage, Field } from 'formik'
import UploadFile from '../UploadFile'
import { Box, SxProps } from '@mui/material'
import { styled } from 'styled-components'
import { FileIcon, RemoveCircleIcon, UploadIcon } from '@components/icons/icons'
import { postMutation } from '@services/requests/CommonRequests'
import { Loading } from '../Loading'
import { extractFileNameFromUrl } from '@utils/helper'

interface IProps {
  name: string
  label?: string
  sx?: SxProps
  required?: boolean
  accept?: string
  apiPath: string
  mutationKey?: string
  disabled?: boolean
  id?: string
}

export default function FormikMultipleUploadFile({
  name,
  label,
  sx,
  required,
  accept,
  apiPath,
  mutationKey,
  disabled = false,
  id,
}: IProps) {
  const validate = (val) => {
    let err = ''
    if (val.length == 0) {
      err = 'fayl tanlash majburiy'
    }
    return err
  }

  const { mutate, isPending } = postMutation<any, any>(apiPath, {
    mutationKey: [mutationKey || apiPath],
  })

  return (
    <Field name={name} validate={required && validate}>
      {({ form, field }) => (
        <StyledBox sx={sx}>
          <div>
            <UploadFile
              handleFile={(file: File) => {
                mutate(
                  { file: file },
                  {
                    onSuccess: (data) => {
                      form.setFieldValue(name, [...field.value, data?.data])
                    },
                  }
                )
              }}
              label={label}
              accept={accept}
              disabled={disabled}
              id={name}
              placeholder="Bir yoki bir nechta fayl tanlang"
            />
            {field.value.length > 0 && (
              <div className="files-box">
                {field.value.map((file, i: number) =>
                  id ? (
                    <a
                      href={file?.file}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                      key={i}
                      className="file"
                    >
                      <span>
                        <FileIcon />
                      </span>
                      <p className="truncate file-name">{extractFileNameFromUrl(file?.file)}</p>
                      <span
                        onClick={() => {
                          form.setFieldValue(
                            name,
                            field.value.filter((_, idx) => idx !== i)
                          )
                        }}
                      >
                        <RemoveCircleIcon />
                      </span>
                    </a>
                  ) : (
                    <div key={i} className="file">
                      <span>
                        <FileIcon />
                      </span>
                      <p className="truncate file-name">{extractFileNameFromUrl(file?.file)}</p>
                      <span
                        onClick={() => {
                          form.setFieldValue(
                            name,
                            field.value.filter((_, idx) => idx !== i)
                          )
                        }}
                      >
                        <RemoveCircleIcon />
                      </span>
                    </div>
                  )
                )}
                {isPending && (
                  <div className="loading">
                    <Loading color="dark" />
                  </div>
                )}
              </div>
            )}
          </div>

          {required && <ErrorMessage name={name} component={StyledError} />}

          <div className="btn-box">
            {field.value.length > 0 && (
              <button
                className="btn clear-btn"
                type="button"
                onClick={() => {
                  form.setFieldValue(name, [])
                }}
              >
                Barchasini o'chirish
              </button>
            )}
            {!disabled && (
              <label className="btn add-btn" htmlFor={name}>
                <UploadIcon />
                Yuklash
              </label>
            )}
          </div>
        </StyledBox>
      )}
    </Field>
  )
}

const StyledBox = styled(Box)`
  .files-box {
    /* display: grid; */
    /* grid-template-columns: repeat(auto-fill, minmax(100px, auto)); */
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 16px;
    flex-wrap: wrap;
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
  .loading {
    display: grid;
    place-items: center;
  }
  .btn-box {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    gap: 12px;
    .btn {
      cursor: pointer;
      border-radius: 8px;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 700;
      font-size: 14px;
      padding: 6px 12px;
    }
    .add-btn {
      background-color: #00a76f;
      color: white;
      svg {
        width: 20px;
        height: 20px;
        path {
          fill: white;
        }
      }
    }
    .clear-btn {
      border: 1px solid #d6e7ef;
      background-color: white;
    }
  }
`

const StyledError = styled.p`
  color: #e60019;
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
`
