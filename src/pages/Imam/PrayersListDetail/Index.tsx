import CustomDetail from "@components/common/CustomDetail/CustomDetail";
import { LeftChervonIcon } from "@components/icons/icons";
import { Box, ListItemButton, Stack, Typography } from "@mui/material";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import CustomButton from "@components/common/CustomButton";
import { getRequest, patchMutation } from "@services/requests/CommonRequests";
import { useQuery } from "@tanstack/react-query";
import { MainLoading } from "@components/common/Loading";
import { ImamFridayThesisInterface, ImamFridayThesisSeenInterface } from "@src/types/detailHeaderTypes";
import { MainContext, MainContextType } from "@contexts/MainProvider";
import { useContext } from "react";
import useVisiblity from "@hooks/useVisibility";
import Result from "./Result";
import { imamPrayersDetailLeftCols, imamPrayersDetailRightCols } from "@components/common/CustomDetail/DataHeaders";


export default function PrayersListDetail() {
  const { id } = useParams<{ id: string }>()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const {
    actions: { openSnackbar },
  } = useContext<MainContextType>(MainContext)
  const visible = useVisiblity()
  const { data, isLoading } = useQuery<ImamFridayThesisInterface>({
    queryKey: [`friday_tesis/detail/${id}`],
    queryFn: () =>
      getRequest(`friday_tesis/detail/${id}`),
  })

  const { data: seenData, isLoading: seenIsLoading, refetch, isSuccess: seenIsSuccess, } = useQuery<ImamFridayThesisSeenInterface>({
    queryKey: [`friday_tesis/seen/list?tesis=${id}`],
    queryFn: () =>
      getRequest(`friday_tesis/seen/list?tesis=${id}`),
  })

  const { mutate: patch, isPending: patchIsPending } = patchMutation(
    `friday_tesis/seen/update/${searchParams.get('seen')}`,
    {
      onSuccess: () => {
        refetch()
        openSnackbar({ message: 'Topshiriq muvafaqiyatli qabul qilindi!', status: 'success' })
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
              display: "inline-flex",
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
              Ortga
            </Typography>
          </ListItemButton>
          {
            seenIsSuccess ? <CustomButton
              onClick={() => seenData.results[0].state == '1' ?
                patch({ state: "2" }) :
                seenData.results[0].state == '2' ?
                  openSnackbar({ message: 'Topshiriq allaqachon qabul qilingan!', status: 'success' }) :
                  openSnackbar({ message: 'Topshiriq allaqachon bajarilgan!', status: 'success' })}
              color='#fff'
              opacity={seenData.results[0].state == '1' ? '1' : '0.6'}
              cursor={seenData.results[0].state == '1' ? 'pointer' : 'default'}
              value={seenData.results[0].state == '1' ? 'Qabul qilish' : seenData.results[0].state == '2' ? 'Qabul qilingan' : 'Bajarilgan'} /> : ""
          }
        </Stack>
        {
          (isLoading || seenIsLoading) ? <MainLoading /> :
            <>
              <Grid2 container spacing={3}>
                <Grid2 xs={12} md={6}>
                  <CustomDetail rows={1} data={data} header={imamPrayersDetailLeftCols} />
                </Grid2>
                <Grid2 xs={12} md={6}>
                  <CustomDetail rows={1} data={data} header={imamPrayersDetailRightCols} />
                </Grid2>
              </Grid2>
              {
                !visible.visiblity &&
                <Stack direction='row' sx={{ mt: 2.5, gap: 1.5, justifyContent: 'flex-end' }}>
                  <CustomButton
                    loading={patchIsPending}
                    type="button"
                    onClick={() => visible.show()}
                    padding="6px 12px"
                    color="#fff"
                    value={seenData.results[0].state == '3' ? "Natijani o'zgartirish" : "Natija yuborish"}
                    bgColor="#1E1E1E"
                    fs='14px'
                    lineHeight="24px"
                    fw='700'
                  />
                </Stack>
              }
            </>
        }
      </Stack>
      {
        visible.visiblity &&
        (isLoading ? <MainLoading /> :
          <Result data={data} seen={seenData} refetch={refetch} />)

      }
    </Box >
  )
}