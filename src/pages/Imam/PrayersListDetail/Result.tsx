import { Box, Stack, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { SwiperSlide } from 'swiper/react'
import CustomHandleSlider from '@components/common/CustomHandleSlider'
import CustomButton from '@components/common/CustomButton'
import { getRequest, patchMutation, postMutation } from '@services/requests/CommonRequests'
import { useQuery } from '@tanstack/react-query'
import {
  GetFridayTesisResultInterface,
  ImamFridayThesisInterface,
  ImamFridayThesisSeenInterface,
} from '@src/types/detailHeaderTypes'
import { SubmitHandler, useForm } from 'react-hook-form'
import CustomFileInput from '@components/form/CustomFileInput'
import CustomTextArea from '@components/form/CustomTextArea'
import { useContext, useEffect, useState } from 'react'
import { AxiosError, AxiosResponse } from 'axios'
import { MainContext, MainContextType } from '@contexts/MainProvider'
import { UserInterface } from '@src/types/userTypes'
import { useParams } from 'react-router-dom'
import ImgItem from '../InstructionDetail/components/UploadFileItem'
import { Masonry } from '@mui/lab'
import { MainLoading } from '@components/common/Loading'
import CustomTextInput from '@components/form/CustomTextInput'

interface IFormInput {
  comment: string
  child: string
  man: string
  old_man: string
  old: string
  file?: File | string | Promise<File>
  images?: { id: number; image: string }[]
  videos?: { id: number; video: string }[]
}

export default function Result({
  data,
  seen,
  refetch,
}: {
  data: ImamFridayThesisInterface
  seen: ImamFridayThesisSeenInterface
  refetch?
}) {
  const { id } = useParams<{ id: string }>()
  const [image, setImage] = useState<{ id: number; image: string }[]>([])
  const [video, setVideo] = useState<{ id: number; video: string }[]>([])
  const [comment, setComment] = useState<string>('')
  const user: UserInterface = JSON.parse(window.localStorage.getItem('user'))

  const {
    actions: { openSnackbar },
  } = useContext<MainContextType>(MainContext)

  const deleteVideo = (url: string) => {
    setVideo(video.filter((el) => el.video !== url))
  }

  const deleteImage = (url: string) => {
    setImage(image.filter((el) => el.image !== url))
  }

  const {
    data: resultsData,
    isLoading: resultsLoading,
    isSuccess: resultsIsSuccess,
  } = useQuery<GetFridayTesisResultInterface>({
    queryKey: [`friday_tesis/result/detail/${seen.results[0].result_id}`],
    queryFn: () => getRequest(`friday_tesis/result/detail/${seen.results[0].result_id}`),
  })

  const { mutate, isPending } = postMutation('friday_tesis/result/create', {
    onSuccess: (
      data: AxiosResponse<{ id: number; image: string; non_field_errors?: string[] }>
    ) => {
      if (data.status == 201) {
        refetch()
        openSnackbar({ message: "Muvaffaqiyatli qo'shildi!", status: 'success' })
      } else {
        openSnackbar({ message: data?.data?.non_field_errors[0], status: 'error' })
      }
    },
    onError: (error: AxiosError<{ non_field_errors?: string[] }, any>) => {
      openSnackbar({ message: error?.response?.data.non_field_errors[0], status: 'error' })
    },
  })

  const handleFileUrlChange = async (fileUrl: string) => {
    try {
      const response = await fetch(fileUrl, { mode: 'no-cors' })
      const blob = await response.blob()
      const fileName = fileUrl.split('/').pop() || 'defaultFileName'
      const file = new File([blob], fileName, { type: blob.type })
      return file
    } catch (error) {
      openSnackbar({ message: 'Topshiriqni qayta yuklashda muammo', status: 'error' })
    }
  }

  const { control, handleSubmit, reset } = useForm<IFormInput>({
    defaultValues: {
      child: '',
      man: '',
      old_man: '',
      old: '',
      comment: '',
      videos: [],
      images: [],
      file: null,
    },
  })

  const { mutate: patch, isPending: patchIsPending } = patchMutation(
    'friday_tesis/result/update/' + seen.results[0].result_id,
    {
      onSuccess: () => {
        openSnackbar({ message: 'Muvaffaqiyatli tahrir qilindi', status: 'success' })
      },
      onError: (error) => {
        openSnackbar({ message: error?.message, status: 'error' })
      },
    }
  )

  useEffect(() => {
    if (resultsIsSuccess) {
      if (seen.results[0].state == '3') {
        async function setValue() {
          reset({
            videos: resultsData.videos,
            images: resultsData.images,
            comment: resultsData.comment,
            child: `${resultsData.child}`,
            man: `${resultsData.man}`,
            old_man: `${resultsData.old_man}`,
            old: `${resultsData.old}`,
            file: await handleFileUrlChange(resultsData.file),
          })
        }
        setValue()
        setVideo(resultsData.videos)
        setImage(resultsData.images)
        setComment(resultsData.comment)
      } else {
        setVideo([])
        setImage([])
        setComment('')
      }
    }
  }, [resultsData])

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const body = {
      tesis: parseInt(id),
      imam: user.id,
      child: +data.child,
      man: +data.man,
      old_man: +data.old_man,
      old: +data.old,
    }
    if (data.file) {
      body['file'] = data.file
    }
    if (video.length !== 0) {
      body['videos'] = video.map((el) => el.id)
    }
    if (image.length !== 0) {
      body['images'] = image.map((el) => el.id)
    }
    if (data.comment.length !== 0) {
      body['comment'] = data.comment
    }

    if (seen.results[0].state == '1' || seen.results[0].state == '2') {
      mutate(body)
    } else if (seen.results[0].state == '3') {
      patch(body)
    }
  }

  return (
    <Stack
      component={'form'}
      onSubmit={handleSubmit(onSubmit)}
      bgcolor="#fff"
      p="16px 24px"
      gap="16px"
      sx={{ borderRadius: 4, mt: 2 }}
    >
      {resultsLoading ? (
        <MainLoading />
      ) : (
        <Box>
          <Masonry spacing={3} columns={{ xs: 1, md: 2 }}>
            <Stack sx={{ mt: 1 }}>
              <Stack direction={'row'} sx={{ mb: 0.4 }}>
                <Typography variant="detailLabel" sx={{ color: '#212B36', fontWeight: 600 }}>
                  Qatnashuvchilar:
                </Typography>
                <Typography variant="detailLabel" sx={{ color: 'error.main', fontWeight: 600 }}>
                  (majburiy)
                </Typography>
              </Stack>
              <Grid2 container spacing={2}>
                <Grid2 xs={12} md={6}>
                  <CustomTextInput
                    name="child"
                    label="18 yoshgacha"
                    control={control}
                    required={true}
                    type="number"
                    min={0}
                  />
                </Grid2>
                <Grid2 xs={12} md={6}>
                  <CustomTextInput
                    name="man"
                    label="18 dan - 30 gacha"
                    control={control}
                    required={true}
                    type="number"
                    min={0}
                  />
                </Grid2>
                <Grid2 xs={12} md={6}>
                  <CustomTextInput
                    name="old_man"
                    label="30 dan - 60 gacha"
                    control={control}
                    required={true}
                    type="number"
                    min={0}
                  />
                </Grid2>
                <Grid2 xs={12} md={6}>
                  <CustomTextInput
                    name="old"
                    label="60 dan katta"
                    control={control}
                    required={true}
                    type="number"
                    min={0}
                  />
                </Grid2>
              </Grid2>
            </Stack>
            <Stack sx={{ mt: 1 }}>
              <Stack direction={'row'}>
                <Typography variant="detailLabel" sx={{ color: '#212B36', fontWeight: 600 }}>
                  Rasmlar:
                </Typography>
                {data.image && (
                  <Typography variant="detailLabel" sx={{ color: 'error.main', fontWeight: 600 }}>
                    (majburiy)
                  </Typography>
                )}
              </Stack>
              <CustomFileInput
                control={control}
                required={data.image}
                name="images"
                accept=".jpg,.jpeg,.png,.svg"
                url="friday_tesis/result/image/create"
                state={image}
                setState={setImage}
              />
              {image.length ? (
                <Stack direction="row">
                  <CustomHandleSlider>
                    {image.map((el: { id: number; image: string }) => (
                      <SwiperSlide key={el.id}>
                        {' '}
                        <ImgItem url={el.image} type="img" event={deleteImage} />{' '}
                      </SwiperSlide>
                    ))}
                  </CustomHandleSlider>
                </Stack>
              ) : (
                ''
              )}
            </Stack>
            <Stack sx={{ mt: 1 }}>
              <Stack direction={'row'}>
                <Typography variant="detailLabel" sx={{ color: '#212B36', fontWeight: 600 }}>
                  Videolar:
                </Typography>
                {data.video && (
                  <Typography variant="detailLabel" sx={{ color: 'error.main', fontWeight: 600 }}>
                    (majburiy)
                  </Typography>
                )}
              </Stack>
              <CustomFileInput
                control={control}
                required={data.video}
                name="videos"
                accept=".mp4,.mpeg,.mpeg-4,.m4v."
                url="friday_tesis/result/video/create"
                state={video}
                setState={setVideo}
                type="video"
              />
              {video.length ? (
                <Stack direction="row">
                  <CustomHandleSlider>
                    {video.map((el: { id: number; video: string }) => (
                      <SwiperSlide key={el.id}>
                        <ImgItem url={el.video} type="video" event={deleteVideo} />{' '}
                      </SwiperSlide>
                    ))}
                  </CustomHandleSlider>
                </Stack>
              ) : (
                ''
              )}
            </Stack>
            <Stack sx={{ mt: 1 }}>
              <Stack direction={'row'}>
                <Typography variant="detailLabel" sx={{ color: '#212B36', fontWeight: 600 }}>
                  Fayl:
                </Typography>
                {data.file_bool && (
                  <Typography variant="detailLabel" sx={{ color: 'error.main', fontWeight: 600 }}>
                    (majburiy)
                  </Typography>
                )}
              </Stack>
              <CustomFileInput
                control={control}
                required={data.file_bool}
                name="file"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.pptx,.ppt"
                type="file"
              />
            </Stack>
            <Stack sx={{ mt: 1 }}>
              <Stack direction={'row'}>
                <Typography variant="detailLabel" sx={{ color: '#212B36', fontWeight: 600 }}>
                  Izoh :
                </Typography>
                {data.comment && (
                  <Typography variant="detailLabel" sx={{ color: 'error.main', fontWeight: 600 }}>
                    (majburiy)
                  </Typography>
                )}
              </Stack>
              <CustomTextArea
                name="comment"
                control={control}
                required={data.comment}
                defaultValue={comment}
              />
            </Stack>
          </Masonry>
          <Stack direction="row" sx={{ mt: 2.5, gap: 1.5, justifyContent: 'flex-end' }}>
            {seen.results[0].state !== '3' && (
              <CustomButton
                color="#212B36"
                value="Bekor qilish"
                bgColor="transparent"
                border="1px solid #D6E7EF"
              />
            )}
            <CustomButton
              color="#fff"
              value={
                seen.results[0].state == '1'
                  ? "Qo'shish"
                  : seen.results[0].state == '2'
                    ? "Qo'shish"
                    : "O'zgartirish"
              }
              bgColor="#00A76F"
              type="submit"
              loading={isPending || patchIsPending}
            />
          </Stack>
        </Box>
      )}
    </Stack>
  )
}
