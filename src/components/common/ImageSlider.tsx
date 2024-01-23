import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styled from 'styled-components'

const Slide = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  max-height: 500px;
`

type SliderProps = {
  data: any
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return (
    <div
      className={className}
      style={{
        ...style,
      }}
      onClick={onClick}
    />
  )
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return <div className={className} style={{ ...style }} onClick={onClick} />
}

const ImageSlider: React.FC<SliderProps> = ({ data }) => {
  const settings: Settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  return (
    <Slider {...settings}>
      {data?.map((elem, idx) => (
        <Slide key={idx}>
          <div
            style={{
              minHeight: '450px',
              background: '#eee',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={elem.image}
              alt={elem.id}
              style={{ width: 'auto', maxWidth: '450px', height: 'auto', maxHeight: '450px' }}
            />
          </div>
        </Slide>
      ))}
    </Slider>
  )
}

export default ImageSlider
