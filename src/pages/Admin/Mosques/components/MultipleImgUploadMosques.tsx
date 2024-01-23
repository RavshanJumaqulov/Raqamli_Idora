import { styled } from 'styled-components'
import { postMutation } from '@services/requests/CommonRequests'
import { useFormikContext } from 'formik'
import { Box } from '@mui/material'
import ImgUpload from '@components/common/ImgUpload'
import { Loading } from '@components/common/Loading'
import { baseUrl } from '@utils/helper'

interface IProps {
  name: string
  option: { name: string; label: string; type: string }
}

export default function MultipleImgUploadMosques({ name, option }: IProps) {
  const { values, setFieldValue } = useFormikContext<any>()

  const { mutate, isPending } = postMutation<any, any>('mosque/fire_image/create', {
    mutationKey: [name],
  })

  return (
    <StyledBox>
      <ImgUpload
        handleFile={(file) => {
          mutate(
            {
              image: file,
              type: option.type,
            },
            {
              onSuccess: (data) => {
                setFieldValue(name, [...values[name], data?.data])
                setFieldValue('fire_images', [...values.fire_images, +data?.data?.id])
              },
            }
          )
        }}
      />
      <div className="img-grid-box">
        {values[name].map((item, i) => {
          return (
            <div key={i} className="img-box">
              <img
                loading="lazy"
                className="img"
                key={item.id}
                src={item.image.includes('http') ? item.image : baseUrl + '/media/' + item.image}
                alt="img"
              />
              <p
                onClick={() => {
                  setFieldValue(
                    name,
                    values[name].filter((img) => img.id !== item.id)
                  )
                  setFieldValue(
                    'fire_images',
                    values.fire_images.filter((id) => id !== item.id)
                  )
                }}
                className="remove-icon"
              >
                <span>x</span>
              </p>
            </div>
          )
        })}
        {isPending && (
          <div className="img-box">
            <Loading color="dark" />
          </div>
        )}
      </div>
    </StyledBox>
  )
}

const StyledBox = styled(Box)`
  & .img-grid-box {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(72px, 100px));
    margin-top: 20px;
    gap: 10px;
    & .img-box {
      position: relative;
      display: grid;
      place-items: center;

      & .img {
        height: 72px;
        object-fit: contain;
        border-radius: 8px;
        width: 100%;
      }

      & .remove-icon {
        position: absolute;
        right: 5px;
        top: 5px;
        color: white;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 50%;
        width: 18px;
        height: 18px;
        display: grid;
        place-items: center;
        cursor: pointer;
        vertical-align: middle;
        line-height: 1;
      }
    }
  }
`
