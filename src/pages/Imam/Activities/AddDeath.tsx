import { imomSideBarItems } from '@components/Sidebar/imomSidebaritems'
import CustomButton from '@components/common/CustomButton'
import CustomFileInput from '@components/form/CustomFileInput'
import CustomTextArea from '@components/form/CustomTextArea'
import DateInput from '@components/form/DatePicker.component'
import { LeftChervonIcon } from '@components/icons/icons'
import { Box, ListItemButton, Stack, Typography } from '@mui/material'
import { SidebarItemsTypes } from '@src/types/SidebarTypes'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { SERVER_DATE_FORMAT } from '@src/constants'
import { getRequest, patchMutation, postMutation } from '@services/requests/CommonRequests'
import { MainContext, MainContextType } from '@contexts/MainProvider'
import { useContext, useEffect } from 'react'
import { UserInterface } from '@src/types/userTypes'
import { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Masonry } from '@mui/lab'
import { URLs } from './data'
import { DeathDetailInterface } from '@src/types/detailHeaderTypes'
import { MainLoading } from '@components/common/Loading'

interface IFormInput {
    comment: string
    image: File | null
    file: File | null
    date: string
    imam?: number
}

export const AddDeath = () => {
    const { pathname } = useLocation()
    const { id } = useParams()
    const [params] = useSearchParams()
    const typeQuery = params.get('type')
    const user: UserInterface = JSON.parse(window.localStorage.getItem('user'))
    const {
        actions: { openSnackbar },
    } = useContext<MainContextType>(MainContext)
    const isEdit = pathname.includes('edit')
    const isView = pathname.includes('view')
    const isAdd = pathname.includes('add')
    const { control, reset, handleSubmit } = useForm<IFormInput>({
        defaultValues: {
            date: '',
            comment: '',
            image: null,
            file: null,
            imam: user.id
        },
    })

    let link = URLs.find((o) => +o.id === +typeQuery)
    const { data: detailData, isLoading, isSuccess } = useQuery<DeathDetailInterface>({
        queryKey: [`${link.url.replace('list', 'detail')}/${id}`, typeQuery],
        queryFn: () =>
            getRequest(link.url.replace('list', 'detail') + id),
    })

    const handleFileUrlChange = async (fileUrl: string) => {
        try {
            const response = await fetch(fileUrl, { mode: 'no-cors' })
            const blob = await response.blob()
            const fileName = fileUrl.split('/').pop().split('_').join(' ') || 'defaultFileName'
            const file = new File([blob], fileName, { type: blob.type })
            return file
        } catch (error) {
            openSnackbar({ message: 'Topshiriqni qayta yuklab bo\'lmadi', status: 'error' })
        }
    }

    const handleReset = () => {
        reset({
            date: '',
            comment: '',
            image: null,
            file: null,
            imam: user.id
        })
    }

    useEffect(() => {
        if (!isLoading && isSuccess) {
            async function setValue() {
                reset({
                    date: `${detailData.date.slice(8)}-${detailData.date.slice(5, 7)}-${detailData.date.slice(0, 4)}`,
                    comment: detailData.comment,
                    image: await handleFileUrlChange(detailData.image),
                    file: await handleFileUrlChange(detailData.file),
                })
            }
            setValue()
        }
    }, [isLoading])

    const { mutate, isPending } = postMutation<IFormInput>('death/create', {
        onSuccess: () => {
            openSnackbar({ message: "Muvaffaqiyatli qo'shildi", status: 'success' })
        },
        onError: (error: AxiosError) => {
            openSnackbar({ message: error.message, status: 'error' })
        },
    })

    const { mutate: patch, isPending: patchIsPending } = patchMutation(
        `death/update/${id}`,
        {
            onSuccess: () => {
                openSnackbar({ message: 'Muvaffaqiyatli tahrir qilindi!', status: 'success' })
            },
            onError: (error) => {
                openSnackbar({ message: error?.message, status: 'error' })
            },
        }
    )

    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        if (!isEdit && !isView) {
            mutate({
                ...data,
                imam: user.id,
                date: dayjs(data.date, SERVER_DATE_FORMAT).format(SERVER_DATE_FORMAT),
            })
        }
        else if (isEdit) {
            const body = {
                imam: user.id,
                date: data.date == `${detailData.date.slice(8)}-${detailData.date.slice(5, 7)}-${detailData.date.slice(0, 4)}` ?
                    `${data.date.slice(6)}-${data.date.slice(3, 5)}-${data.date.slice(0, 2)}` :
                    dayjs(data.date, SERVER_DATE_FORMAT).format(SERVER_DATE_FORMAT),
                comment: data.comment,
            }
            if (data.image !== null && detailData.image.split('/').pop().split('_').join(' ') !== data.image.name) {
                body['image'] = data.image
            }
            if (data.file !== null && detailData.file.split('/').pop().split('_').join(' ') !== data.file.name) {
                body['file'] = data.file
            }
            patch(body)
        }
    }


    return (
        <Box
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                alignSelf: 'stretch',
                borderRadius: 4,
                border: '1px solid #EFEFEF',
                background: '#fff',
            }}
        >
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
                                .find((el: SidebarItemsTypes) => pathname.includes(el.key))
                                .child.find((el) => el.key.includes(typeQuery)).label
                        }
                    </Typography>
                </ListItemButton>
                <Box />
            </Stack>
            {
                (((isEdit || isView) && !isLoading) || isAdd) ?
                    <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
                        <CustomFileInput
                            disabled={isView}
                            control={control}
                            name="image"
                            defaultLabel="O'lim guvohnomasi surati"
                            accept=".jpg,.jpeg,.png,.svg"
                            required={true}
                        />
                        <DateInput
                            disabled={isView}
                            control={control}
                            name="date"
                            defaultLabel="Vaqti"
                            required={true}
                            maxDate={dayjs()}
                        />
                        <CustomTextArea
                            control={control}
                            name="comment"
                            defaultLabel="Izoh"
                            disabled={isView}
                        />
                        <CustomFileInput
                            disabled={isView}
                            control={control}
                            name="file"
                            defaultLabel="O'lim guvohnomasi"
                            accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.pptx,.ppt"
                        />
                    </Masonry>
                    :
                    <MainLoading />
            }
            {
                !isView &&
                <Stack direction="row" sx={{ width: '100%', mt: 2.5, gap: 1.5, justifyContent: 'flex-end' }}>
                    <CustomButton
                        onClick={() => handleReset()}
                        type='button'
                        color="#212B36"
                        value="Bekor qilish"
                        bgColor="transparent"
                        border="1px solid #D6E7EF"
                    />
                    <CustomButton
                        color="#fff"
                        value={isEdit ? "O'zgartirish" : "Qo'shish"}
                        bgColor="#00A76F"
                        type="submit"
                        loading={isPending || patchIsPending}
                    />
                </Stack>
            }
        </Box>
    )
}
