import { Checkbox, Menu, MenuItem } from '@mui/material'
import { getQuery, postMutation, putMutation } from '@services/requests/CommonRequests'
import { prayerT, prayerItemT } from '../data'
import { useMainContext } from '@contexts/MainProvider'
import { FlexWrapper } from '@components/common/Flex'
import { Text } from '@styles/globalStyle'
import { useEffect, useState } from 'react'
import CustomButton from '@components/common/CustomButton'
import { MainLoading } from '@components/common/Loading'

type prayerItemsResult = {
  results: prayerItemT[]
  count: number
}

type prayerListResult = {
  count: number
  results: prayerT[]
}

export const PrayersMenu = ({ open, anchorEl, handleClose, refetchList }) => {
  const {
    actions: { openSnackbar },
    state: { user },
  } = useMainContext()

  const [checkeds, setCheckeds] = useState([])
  const [currentPrayer, setCurrentPrayer] = useState(null)

  const { data: prayerItems, refetch } = getQuery<prayerItemsResult>(
    'public_prayers/prayer_times/list',
    ['public_prayers/prayer_times/list']
  )

  const today = new Date().toISOString()?.split('T')[0]
  const { data: prayersList, isFetching } = getQuery<prayerListResult>(
    'public_prayers/list',
    [open],
    {},
    {
      params: {
        created_at: today,
      },
    }
  )

  const { mutate: post, isPending: isCreatePending } = postMutation('public_prayers/create', {
    onSuccess: () => {
      openSnackbar({ message: "Muvaffaqiyatli qo'shildi", status: 'success' })
      handleClose()
      refetch()
      refetchList()
    },
    onError: (err) => {
      openSnackbar({ message: err?.message, status: 'error' })
    },
  })

  const { mutate: put, isPending: isEditPending } = putMutation(
    `public_prayers/update/${currentPrayer?.id}/`,
    {
      onSuccess: () => {
        openSnackbar({ message: "Muvaffaqiyatli qo'shildi", status: 'success' })
        handleClose()
        refetch()
        refetchList()
      },
      onError: (err) => {
        openSnackbar({ message: err?.message, status: 'error' })
      },
    }
  )

  useEffect(() => {
    if (prayersList && open) {
      if (prayersList?.results?.length) {
        setCheckeds(prayersList?.results?.[0]?.prayer?.map((el) => el?.id) ?? [])
        setCurrentPrayer(prayersList?.results?.[0])
      }
    }
  }, [prayersList, open])

  const handleSubmit = () => {
    const body = {
      imam: user?.id,
      prayer: checkeds,
    }
    currentPrayer ? put(body) : post(body)
  }

  return (
    <Menu
      sx={{
        '.MuiList-padding': {
          padding: '8px !important',
          minWidth: '200px',
        },
      }}
      anchorOrigin={{
        horizontal: 'left',
        vertical: 'bottom',
      }}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
    >
      {isFetching ? (
        <MainLoading />
      ) : (
        prayerItems?.results
          ?.sort((a, b) => a.id - b.id)
          ?.map((el, i) => {
            const isChecked = checkeds?.includes(el?.id)

            return (
              <MenuItem
                key={i}
                onClick={() => {
                  setCheckeds((prev) =>
                    isChecked ? prev?.filter((item) => item != el?.id) : [...prev, el.id]
                  )
                }}
                sx={{
                  px: 1,
                  py: '6px',
                  borderRadius: '6px',
                  background: isChecked ? '#EBF8F3' : '',
                  width: '100%',
                }}
              >
                <FlexWrapper gap={2}>
                  <Checkbox checked={isChecked} />
                  <Text
                    fw="500"
                    fs="14px"
                    ff="Public Sans"
                    textTransform={'capitalize'}
                    c={isChecked ? 'var(--primary)' : 'var(--textColor)'}
                  >
                    {el.label}
                  </Text>
                </FlexWrapper>
              </MenuItem>
            )
          })
      )}
      <MenuItem>
        <FlexWrapper gap={2}>
          <CustomButton
            onClick={() => {
              handleClose(), setCheckeds([])
            }}
            fs="14px"
            lineHeight="24px"
            padding="10px 12px"
            border="1px solid #000"
            bgColor="transparent"
            color="#000"
            value={'Bekor qilish'}
            disable={isCreatePending || isEditPending}
          />
          <CustomButton
            onClick={handleSubmit}
            fs="14px"
            lineHeight="24px"
            padding="10px 12px"
            bgColor="#000"
            color="#fff"
            value={'Saqlash'}
            loading={isCreatePending || isEditPending}
            disable={isCreatePending || isEditPending}
          />
        </FlexWrapper>
      </MenuItem>
    </Menu>
  )
}
