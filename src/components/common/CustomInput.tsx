// import i18next from "i18next";
import React from 'react'
// import { useTranslation } from "react-i18next";
// import "react-phone-number-input/style.css";
import styled from 'styled-components'

const Wrapper = styled.div<{
  $fullWidth?: boolean
  $width?: string
  $height?: string
  $pl?: string
  $fs?: string
  $pr?: string
  $p?: string
  $bgColor?: string
  $color?: string
  $backDropFilter?: string
  $border?: string
  $opacity?: string
}>`
  width: ${({ $fullWidth }) => $fullWidth && '100%'};
  text-align: start;

  input {
    width: ${({ $width }) => $width && $width};
    width: ${({ $fullWidth }) => $fullWidth && '100%'};
    height: ${({ $height }) => $height && $height};
    padding: ${({ $p }) => ($p ? $p : '14px 21px')};
    padding-left: ${({ $pl }) => $pl && $pl};
    padding-right: ${({ $pr }) => $pr && $pr};
    border: ${({ $border }) => ($border ? $border : '1px solid #bebebe')};
    opacity: ${({ $opacity }) => $opacity && $opacity};

    border-radius: 6px;
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: ${({ $fs }) => ($fs ? $fs : '16px')};
    line-height: 19px;
    outline: none;
    background-color: ${({ $bgColor }) => ($bgColor ? $bgColor : '#fff')};
    color: ${({ $color }) => ($color ? $color : '#000')};
    backdrop-filter: ${({ $backDropFilter }) => $backDropFilter && `blur(${$backDropFilter})`};

    /* Chrome, Safari, Edge, Opera */
    ::-webkit-outer-spin-button,
    ::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    [type='number'] {
      -moz-appearance: textfield;
    }

    &::placeholder {
      /* Chrome, Firefox, Opera, Safari 10.1+ */
      color: #fff !important;
      opacity: 1 !important; /* Firefox */
    }
  }

  @media screen and (max-width: 540px) {
    input {
      font-size: 14px;
    }
  }
`

const Error = styled.div<{ errorFs?: string }>`
  color: #fff;
  margin-top: 5px;
  font-size: ${({ errorFs }) => (errorFs ? errorFs : '16px')};
`

type InputType = {
  value?: string | number
  name: string
  fullWidth?: boolean
  onChange?: (e: string | number, name: string) => void
  showError?: boolean
  errorText?: string
  type?: string
  width?: string
  height?: string
  pl?: string
  fs?: string
  placeholder?: string
  errorFs?: string
  pr?: string
  p?: string
  bgColor?: string
  color?: string
  backDropFilter?: string
  border?: string
  opacity?: string
  isPhone?: boolean
}

const CustomInput: React.FC<InputType> = ({
  value,
  name,
  fullWidth,
  onChange,
  showError,
  errorText,
  type,
  width,
  height,
  pl,
  pr,
  fs,
  placeholder,
  errorFs,
  p,
  bgColor,
  color,
  backDropFilter,
  border,
  opacity,
  // isPhone,
}) => {
  // const { t } = useTranslation();
  return (
    <Wrapper
      $fullWidth={fullWidth}
      $height={height}
      $pl={pl}
      $fs={fs}
      $pr={pr}
      $p={p}
      $width={width}
      $bgColor={bgColor}
      $color={color}
      $backDropFilter={backDropFilter}
      $border={border}
      $opacity={opacity}
    >
      {/* {isPhone ? (
        <Input
          style={{ width }}
          placeholder=""
          value={value ? String(value) : "+998"}
          defaultCountry="UZ"
          onChange={(e) => (onChange ? onChange(String(e), name) : null)}
        />
      ) : (
        <input
          value={value ? String(value) : ""}
          name={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange ? onChange(type === "number" ? +e.target.value : e.target.value, name) : null
          }
          type={type ? type : "text"}
          placeholder={placeholder}
        />
      )} */}

      <input
        value={value ? String(value) : ''}
        name={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange ? onChange(type === 'number' ? +e.target.value : e.target.value, name) : null
        }
        type={type ? type : 'text'}
        placeholder={placeholder}
      />
      {/* {showError && <Error errorFs={errorFs}>*{errorText ? errorText : t("validations.fill")}</Error>} */}
    </Wrapper>
  )
}

export default CustomInput
