import { Stack, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2/Grid2'
import { SwiperSlide } from 'swiper/react'
import CustomHandleSlider from '@components/common/CustomHandleSlider'
import CustomButton from '@components/common/CustomButton'
import { getRequest, patchMutation, postMutation } from '@services/requests/CommonRequests'
import { useQuery } from '@tanstack/react-query'
import {
  GetResultsInterface,
  ImamInstructionListType,
  ImomInstructionDetailInterface,
} from '@src/types/detailHeaderTypes'
import { SubmitHandler, useForm } from 'react-hook-form'
import CustomFileInput from '@components/form/CustomFileInput'
import CustomTextArea from '@components/form/CustomTextArea'
import { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { useMainContext } from '@contexts/MainProvider'
import { UserInterface } from '@src/types/userTypes'
import { useParams } from 'react-router-dom'
import ImgItem from '@pages/Imam/InstructionDetail/components/UploadFileItem'

interface IFormInput {
  status: OptionsInterface
  comment: string
  images?: { id: number; image: string }[]
  videos?: { id: number; video: string }[]
  files?: { id: number; file: string }[]
}

interface OptionsInterface {
  value: number
  label: string
}
export default function Results({
  data,
  seen,
  refetch,
  visible,
}: {
  data: ImomInstructionDetailInterface
  seen: ImamInstructionListType
  refetch?
  visible: { visiblity: boolean; show: () => void; hide: () => void; toggle: () => void }
}) {
  const { id } = useParams<{ id: string }>()
  const [image, setImage] = useState<{ id: number; image: string }[]>([])
  const [video, setVideo] = useState<{ id: number; video: string }[]>([])
  const [file, setFile] = useState<{ id: number; file: string }[]>([])
  const [comment, setComment] = useState<string>('')
  const user: UserInterface = JSON.parse(window.localStorage.getItem('user'))

  const {
    actions: { openSnackbar },
  } = useMainContext()

  const deleteVideo = (url: string) => {
    setVideo(video.filter((el) => el.video !== url))
  }

  const deleteImage = (url: string) => {
    setImage(image.filter((el) => el.image !== url))
  }

  const deleteFile = (url: string) => {
    setFile(file.filter((el) => el.file !== url))
  }
  const { mutate, isPending } = postMutation('orders/result/create', {
    onSuccess: (data: AxiosResponse<{ id: number; image: string }>) => {
      refetch()
      visible.hide()
      openSnackbar({ message: "Muvaffaqiyatli qo'shildi", status: 'success' })
    },
    onError: (error) => {
      openSnackbar({
        message: "Xatolik sodir bo'ldi",
        status: 'error',
      })
    },
  })

  const { control, reset, handleSubmit } = useForm<IFormInput, OptionsInterface[]>({
    defaultValues: {
      comment: '',
    },
  })

  const resetHandle = () => {
    reset()
    setImage([])
    setFile([])
    setVideo([])
    setComment('')
  }

  const { data: resultsData, isSuccess: resultsIsSuccess } = useQuery<GetResultsInterface>({
    queryKey: [`orders/result/detail/${seen.results[0].result_id}`],
    queryFn: () => getRequest(`orders/result/detail/${seen.results[0].result_id}`),
  })

  const { mutate: patch, isPending: patchIsPending } = patchMutation(
    'orders/result/update/' + seen.results[0].result_id,
    {
      onSuccess: () => {
        visible.hide()
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
        setVideo(resultsData.videos)
        setImage(resultsData.images)
        setFile(resultsData.files)
        setComment(resultsData.comment)
      } else {
        setVideo([])
        setImage([])
        setFile([])
        setComment('')
      }
    }
  }, [resultsData])

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const body = {
      direction: parseInt(id),
      employee: user.id,
    }
    if (file.length !== 0) {
      body['files'] = file.map((el) => el.id)
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
      const body = {
        direction: parseInt(id),
        employee: user.id,
        files: file.length ? file.map((el) => el.id) : null,
        videos: video.length ? video.map((el) => el.id) : null,
        images: image.length ? image.map((el) => el.id) : null,
        comment: data.comment,
      }
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
      <Grid2 container spacing={3}>
        <Grid2 xs={12} md={6}>
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
              url="orders/result/image/create"
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
        </Grid2>
        <Grid2 xs={12} md={6}>
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
              url="orders/result/video/create"
              state={video}
              setState={setVideo}
              type="video"
            />
            {video.length ? (
              <Stack direction="row">
                <CustomHandleSlider>
                  {video.map((el: { id: number; video: string }) => (
                    <SwiperSlide key={el.id}>
                      {' '}
                      <ImgItem url={el.video} type="video" event={deleteVideo} />{' '}
                    </SwiperSlide>
                  ))}
                </CustomHandleSlider>
              </Stack>
            ) : (
              ''
            )}
          </Stack>
        </Grid2>
        <Grid2 xs={12} md={6}>
          <Stack sx={{ mt: 1 }}>
            <Stack direction={'row'}>
              <Typography variant="detailLabel" sx={{ color: '#212B36', fontWeight: 600 }}>
                Fayllar:
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
              name="files"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.pptx,.ppt"
              url="orders/result/file/create"
              state={file}
              setState={setFile}
              type="file"
            />
            <Stack direction="row">
              <CustomHandleSlider>
                {file.length ? (
                  <Stack direction="row">
                    <CustomHandleSlider>
                      {file.map((el: { id: number; file: string }) => (
                        <SwiperSlide key={el.id}>
                          <ImgItem url={el.file} type="file" event={deleteFile} />
                        </SwiperSlide>
                      ))}
                    </CustomHandleSlider>
                  </Stack>
                ) : (
                  ''
                )}
              </CustomHandleSlider>
            </Stack>
          </Stack>
        </Grid2>
        <Grid2 xs={12} md={6}>
          <Stack sx={{ mt: 1, gap: '5px' }}>
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
        </Grid2>
      </Grid2>
      <Stack direction="row" sx={{ mt: 2.5, gap: 1.5, justifyContent: 'flex-end' }}>
        {seen.results[0].state !== '3' && (
          <CustomButton
            onClick={() => resetHandle()}
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
          disable={isPending || patchIsPending}
        />
      </Stack>
    </Stack>
  )
}
