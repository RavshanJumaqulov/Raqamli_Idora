import styled from 'styled-components'
import { Loading } from './Loading'
// import Loading from "../Loading";

type T = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
  color?: string
  width?: string
  bgColor?: string
  fs?: string
  type?: 'button' | 'reset' | 'submit'
  height?: string
  padding?: string
  fw?: string
  shadow?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (() => void) | ((e: any) => void)
  disable?: boolean
  loading?: boolean
  border?: string
  borderRadius?: string
  opacity?: string
  children?: JSX.Element
  cursor?: string
  lineHeight?: string
}

type buttonType = {
  $color?: string
  $width?: string
  $bgColor?: string
  $fs: string
  $height?: string
  $padding?: string
  $fw?: string
  $shadow?: string
  $border?: string
  $borderRadius?: string
  $opacity?: string
  $cursor?: string
  $lineHeight?: string
}

const Button = styled.button<buttonType>`
  color: ${({ $color }) => ($color ? $color : '#fff')};
  background-color: ${({ $bgColor }) => ($bgColor ? $bgColor : 'var(--primary)')};
  width: ${({ $width }) => ($width ? $width : 'fit-content')};
  min-width: ${({ $width }) => $width && $width};
  height: ${({ $height }) => $height && $height};
  outline: none;
  padding: ${({ $padding }) => ($padding ? $padding : '14px 24px')};
  font-weight: ${({ $fw }) => ($fw ? $fw : '500')};
  font-size: ${({ $fs }) => ($fs ? $fs : '16px')};
  :disabled {
    opacity: 0.6;
  }

  opacity: ${({ $opacity }) => $opacity && $opacity};

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;

  border-radius: ${({ $borderRadius }) => ($borderRadius ? $borderRadius : '8px')};
  transition: 0.1s;
  border: none;
  border: ${({ $border }) => $border && $border};

  cursor: ${({ $cursor }) => $cursor && $cursor};
  :active {
    transform: scale(0.98);
  }

  box-shadow: ${({ $shadow }) => $shadow && $shadow};
  font-family: 'Poppins', 'sans-serif';
`

const CustomButton = ({
  value,
  color,
  width,
  bgColor,
  fs,
  type,
  height,
  padding,
  fw,
  shadow,
  onClick,
  disable,
  loading,
  border,
  borderRadius,
  opacity,
  cursor,
  lineHeight,
}: T) => {

  return (
    <Button
      $color={color}
      $width={width}
      $bgColor={bgColor}
      $fs={fs}
      type={type}
      $height={height}
      $padding={padding}
      $fw={fw}
      $shadow={shadow}
      onClick={onClick}
      $border={border}
      $borderRadius={borderRadius}
      $opacity={opacity}
      $cursor={cursor}
      $lineHeight={lineHeight}
      disabled={disable}
    >
      {loading ? <Loading /> : value}
    </Button>
  )
}

export default CustomButton
