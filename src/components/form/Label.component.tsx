import React from 'react'
import styled from 'styled-components'

const Label = (
  props: React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>
) => {
  return (
    <StyledLabel {...props} className={'block mb-2 font-semibold text-base ' + props.className}>
      {props.children}
    </StyledLabel>
  )
}
const StyledLabel = styled.label`
  display: block;
  margin-top: 8px;
`

export default Label

export const StyledInputLabel = styled.label`
  margin-left: 10px;
  margin-bottom: 6px;
  font-size: 14px;
  font-weight: 600;
`
