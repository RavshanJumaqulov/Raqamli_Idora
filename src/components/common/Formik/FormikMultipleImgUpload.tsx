import { styled } from 'styled-components'
import { postMutation } from '@services/requests/CommonRequests'
import { useFormikContext } from 'formik'
import { Box, SxProps } from '@mui/material'
import ImgUpload from '../ImgUpload'
import { Loading } from '../Loading'

interface IProps {
  name: string
  imgUrl?: string
  sx?: SxProps
  label?: string
}

export default function FormikMultipleImgUpload({ name, imgUrl, sx, label }: IProps) {
  const { values, setFieldValue } = useFormikContext()

  const { mutateAsync, isPending } = postMutation(imgUrl, { mutationKey: [name] })

  const handleFile = async (file: File) => {
    try {
      const data: any = await mutateAsync(file)
      if (data?.data) {
        setFieldValue(name, [...values[name], data?.data])
      }
    } catch (error) {}
  }

  return (
    <StyledBox sx={sx}>
      <ImgUpload label={label} handleFile={handleFile} />
      <div className="img-grid-box">
        {values[name].map((item, i) => (
          <div key={i} className="img-box">
            <img loading="lazy" className="img" key={item.id} src={item.image} alt="img" />
            <p
              onClick={() => {
                setFieldValue(
                  name,
                  values[name].filter((_, idx) => idx !== i)
                )
              }}
              className="remove-icon"
            >
              <span>x</span>
            </p>
          </div>
        ))}
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
