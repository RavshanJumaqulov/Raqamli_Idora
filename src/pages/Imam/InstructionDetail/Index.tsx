import CustomDetail from '@components/common/CustomDetail/CustomDetail'
import { LeftChervonIcon } from '@components/icons/icons'
import { Box, ListItemButton, Stack, Typography } from '@mui/material'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import CustomButton from '@components/common/CustomButton'
import { getRequest, patchMutation } from '@services/requests/CommonRequests'
import { useQuery } from '@tanstack/react-query'
import { MainLoading } from '@components/common/Loading'
import {
  ImamInstructionListType,
  ImomInstructionDetailInterface,
} from '@src/types/detailHeaderTypes'
import { useMainContext } from '@contexts/MainProvider'
import Results from './components/Results'
import useVisiblity from '@hooks/useVisibility'
import { imomSideBarItems } from '@components/Sidebar/imomSidebaritems'
import { SidebarItemsTypes } from '@src/types/SidebarTypes'
import { imamInstructionDetailCols } from '@components/common/CustomDetail/DataHeaders'

export default function InstructionDetail() {
  const { id } = useParams<{ id: string }>()
  const user = JSON.parse(window.localStorage.getItem('user'))
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const visible = useVisiblity()
  const {
    state: {
      notifications: { directionsRefetch },
    },
    actions: { openSnackbar },
  } = useMainContext()

  const { data, isLoading } = useQuery<ImomInstructionDetailInterface>({
    queryKey: [`orders/detail/${id}`],
    queryFn: () => getRequest(`orders/detail/${id}`),
  })

  const {
    data: seenData,
    refetch,
    isLoading: seenIsLoading,
    isSuccess: seenIsSuccess,
  } = useQuery<ImamInstructionListType>({
    queryKey: [`orders/seen/list?direction=${id}&employee=${user.id}`],
    queryFn: () => getRequest(`orders/seen/list?direction=${id}&employee=${user.id}`),
  })

  const { mutate: patch, isPending: patchIsPending } = patchMutation(
    `orders/seen/update/${searchParams.get('seen')}`,
    {
      onSuccess: () => {
        refetch()
        openSnackbar({ message: 'Topshiriq muvafaqiyatli qabul qilindi!', status: 'success' })
        directionsRefetch()
      },
      onError: (error) => {
        openSnackbar({ message: error?.message, status: 'error' })
      },
    }
  )

  return (
    <Box>
      <Stack bgcolor="#fff" p="16px 24px" gap="16px" sx={{ borderRadius: 4 }}>
        <Stack direction={'row'} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <ListItemButton
            component={Link}
            to={`/${location.pathname.split('/')[1]}/list${location.search}`}
            sx={{
              minHeight: 20,
              width: 100,
              maxWidth: 120,
              display: 'inline-flex',
              px: 0,
              borderRadius: '8px',
              cursor: 'default',
              '&:hover': {
                background: 'none',
              },
            }}
          >
            <LeftChervonIcon />
            <Typography variant="subtitle2">
              {
                imomSideBarItems
                  .find((el: SidebarItemsTypes) => location.pathname.includes(el.key))
                  .child.find((el) => el.key.includes(searchParams.get('type'))).label
              }
            </Typography>
          </ListItemButton>
          {seenIsSuccess ? (
            <CustomButton
              onClick={() =>
                seenData.results[0].state == '1'
                  ? patch({ state: '2' })
                  : seenData.results[0].state == '2'
                    ? openSnackbar({
                        message: 'Topshiriq allaqachon qabul qilingan!',
                        status: 'success',
                      })
                    : openSnackbar({
                        message: 'Topshiriq allaqachon bajarilgan!',
                        status: 'success',
                      })
              }
              color="#fff"
              opacity={seenData.results?.[0]?.state == '1' ? '1' : '0.6'}
              cursor={seenData.results?.[0]?.state == '1' ? 'pointer' : 'default'}
              value={
                seenData.results[0].state == '1'
                  ? 'Qabul qilish'
                  : seenData.results[0].state == '2'
                    ? 'Qabul qilingan'
                    : 'Bajarilgan'
              }
              disable={patchIsPending}
              loading={patchIsPending}
            />
          ) : (
            ''
          )}
        </Stack>
        {isLoading || seenIsLoading ? (
          <MainLoading />
        ) : (
          <>
            <CustomDetail rows={2} data={data} header={imamInstructionDetailCols} />
            {!visible.visiblity && seenData.results[0].direction.types == '2' && (
              <Stack direction="row" sx={{ mt: 2.5, gap: 1.5, justifyContent: 'flex-end' }}>
                <CustomButton
                  type="button"
                  onClick={() => visible.show()}
                  padding="6px 12px"
                  color="#fff"
                  value={
                    seenData.results[0].state == '3' ? "Natijani o'zgartirish" : 'Natija yuborish'
                  }
                  bgColor="#1E1E1E"
                  fs="14px"
                  lineHeight="24px"
                  fw="700"
                />
              </Stack>
            )}
          </>
        )}
      </Stack>
      {visible.visiblity &&
        (isLoading || seenIsLoading ? (
          <MainLoading />
        ) : (
          seenData.results[0].direction.types == '2' && (
            <Results data={data} seen={seenData} refetch={refetch} visible={visible} />
          )
        ))}
    </Box>
  )
}
