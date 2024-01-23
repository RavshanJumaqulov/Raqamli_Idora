import { IconButton, Pagination } from '@mui/material'
import React from 'react'
import { FlexBetween, FlexWrapper } from './Flex'
import { Text } from '@styles/globalStyle'
import { PaginationContext, PaginationContextType } from '@contexts/PaginationProvider'
import { ChevronLeft } from '@mui/icons-material'

type T = { count: number }

const CommonPagination: React.FC<T> = ({ count }) => {
  const {
    state: { limit, offset },
    actions: { setOffset },
  } = React.useContext<PaginationContextType>(PaginationContext)

  return (
    <FlexBetween height="52px" mt="30px">
      {/* @ts-ignore */}
      <Text fs="14px">
        {(offset || 0) + 1}
        {' - '}
        {limit + (+offset || 0) > count ? count : limit + (+offset || 0)} | Jami: {count} ta
      </Text>

      <FlexWrapper
        gap="10px"
        sx={{
          '.MuiIconButton-root': {
            borderRadius: '12px',
          },
          '.MuiSvgIcon-root': {
            color: 'text.greyscale500',
            fontSize: 20,
          },
        }}
      >
        <IconButton onClick={offset >= limit ? () => setOffset(offset - limit) : () => null}>
          <ChevronLeft />
        </IconButton>
        <Pagination
          count={count % limit === 0 ? count / limit : Math.floor(count / limit) + 1}
          page={offset / limit + 1 || 1}
          onChange={(e, value) => setOffset((value - 1) * limit)}
          hideNextButton
          hidePrevButton
          sx={{
            ul: {
              width: 'max-content',
              button: {
                borderRadius: '12px',
                color: 'text.greyscale500',
                padding: '8px',
              },
              div: {
                color: 'text.greyscale500',
              },
            },
            color: 'text.greyscale500',
            '& .Mui-selected': {
              backgroundColor: 'bg.primary100',
              color: 'green.light',
              fontWeight: 600,
            },
          }}
        />
        <IconButton
          onClick={
            (count % limit === 0 ? count >= limit + (offset || 0) : count > limit + offset)
              ? () => setOffset(offset || 0 + limit)
              : () => null
          }
          sx={{ transform: 'rotate(180deg)' }}
        >
          <ChevronLeft />
        </IconButton>
      </FlexWrapper>
    </FlexBetween>
  )
}

export default CommonPagination
