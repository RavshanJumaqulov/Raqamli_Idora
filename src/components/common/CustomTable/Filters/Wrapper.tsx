import { FlexBetween } from '@components/common/Flex'

const Wrapper = ({ children, rowHeader }) => {
  if (rowHeader) return <FlexBetween gap="40px">{children}</FlexBetween>
  return <>{children}</>
}

export default Wrapper
