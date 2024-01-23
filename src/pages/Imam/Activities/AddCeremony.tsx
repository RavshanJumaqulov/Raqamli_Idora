import { imomSideBarItems } from '@components/Sidebar/imomSidebaritems'
import CustomButton from '@components/common/CustomButton'
import CustomTextArea from '@components/form/CustomTextArea'
import CustomTextInput from '@components/form/CustomTextInput'
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
import { CeremonyDetailInterface } from '@src/types/detailHeaderTypes'
import { MainLoading } from '@components/common/Loading'
import CustomSelect from '@components/form/CustomSelect'

interface IFormInput {
    title: string
    comment: string
    types: string
    date: string
    imam?: number
}

const options = [
    {
        id: 1,
        label: 'Janoza',
    },
    {
        id: 2,
        label: 'Azaga oid'
    }
]

export const AddCeremony = () => {
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
            title: '',
            comment: '',
            types: '',
            date: '',
            imam: user.id
        },
    })

    let link = URLs.find((o) => +o.id === +typeQuery)
    const { data, isLoading, isSuccess } = useQuery<CeremonyDetailInterface>({
        queryKey: [`${link.url.replace('list', 'detail')}/${id}`, typeQuery],
        queryFn: () =>
            getRequest(link.url.replace('list', 'detail') + id),
    })

    const handleReset = () => {
        reset({
            types: '',
            comment: '',
            title: '',
            date: '',
            imam: user.id
        })
    }

    useEffect(() => {
        if (!isLoading && isSuccess) {
            async function setValue() {
                reset({
                    date: `${data.date.slice(8)}-${data.date.slice(5, 7)}-${data.date.slice(0, 4)}`,
                    title: `${data.title}`,
                    comment: data.comment,
                    types: data.types
                })
            }
            setValue()
        }
    }, [isLoading])




    const { mutate, isPending } = postMutation<IFormInput>('ceremony/create', {
        onSuccess: (data) => {
            openSnackbar({ message: "Muvaffaqiyatli qo'shildi", status: 'success' })
        },
        onError: (error: AxiosError) => {
            openSnackbar({ message: error.message, status: 'error' })
        },
    })

    const { mutate: patch, isPending: patchIsPending } = patchMutation(
        `ceremony/update/${id}`,
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
                date: `${data.date.slice(6)}-${data.date.slice(3, 5)}-${data.date.slice(0, 2)}`,
                comment: data.comment,
                title: data.title,
                types: data.types
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
                        <CustomTextInput
                            disabled={isView}
                            control={control}
                            name="title"
                            defaultLabel="Ma'ruza mavzusi"
                            required={true}
                            placeholder="Ma'ruza mavzusi"
                        />
                        <DateInput
                            disabled={isView}
                            control={control}
                            name="date"
                            defaultLabel="Vaqti"
                            required={true}
                            maxDate={dayjs()}
                        />
                        <CustomSelect
                            defaultLabel='Turi'
                            name='types'
                            control={control}
                            options={options}
                            disabled={isView}
                        />
                        <CustomTextArea
                            control={control}
                            name="comment"
                            defaultLabel="Izoh"
                            disabled={isView}
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
