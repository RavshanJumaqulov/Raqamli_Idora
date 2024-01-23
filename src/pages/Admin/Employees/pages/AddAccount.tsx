import { adminSideBarItems } from '@components/Sidebar/adminSidebarItems'
import Breadcrumb from '@components/common/Breadcrump'
import CustomButton from '@components/common/CustomButton'
import { FlexBetween, FlexWrapper } from '@components/common/Flex'
import { InputForm, SelectForm } from '@components/form'
import { useMainContext } from '@contexts/MainProvider'
import { ROLES_OPTIONS } from '@data/employeesData'
import { Box, Stack } from '@mui/material'
import { getQuery, postMutation, putMutation } from '@services/requests/CommonRequests'
import { regionT } from '@src/types'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { AccountForm, AddAccountBody, IGetAccountById } from '../employee.types'
import { MainLoading } from '@components/common/Loading'

const AddEditAccount = () => {
  const {
    actions: { openSnackbar },
  } = useMainContext()
  const navigate = useNavigate()

  const { control, handleSubmit, reset, setValue, watch } = useForm<AccountForm>()
  const [districts, setDistricts] = useState([])
  const { id } = useParams()
  const isEditing = !!id
  const { data: accountById, isFetching } = getQuery<IGetAccountById>(`auth/accounts/${id}`, [], {
    enabled: isEditing,
  })

  const { data: regions } = getQuery<{ results: regionT[] }>(
    'common/regions',
    [],
    {},
    { params: { limit: 50 } }
  )
  const { mutate: createEmployee, isPending: isCreatePending } = postMutation<AddAccountBody>(
    'auth/register/',
    {
      onSuccess: () => {
        openSnackbar({ message: "Muvaffaqiyatli qo'shildi", status: 'success' })
        navigate(-1)
        // navigate(`/employee/list?type=2`)
      },
      onError: (error: any) => {
        if (error?.response?.data?.password?.includes('This password is too common.'))
          openSnackbar({ message: 'Parol juda sodda', status: 'error' })
        else openSnackbar({ message: error?.message, status: 'error' })
        // const errObj = error?.response?.data
        // const firstKey = Object.keys(errObj)?.[0]
        // if (errObj[firstKey]) {
        //   openSnackbar({
        //     message: errObj[firstKey],
        //     status: 'error',
        //   })
        // }
      },
    }
  )
  const { mutate: editEmployee, isPending: isEditPending } = putMutation(`auth/update/${id}`, {
    onSuccess: () => {
      openSnackbar({ message: "Muvaffaqiyatli o'zgartirildi", status: 'success' })
      navigate(`/employee/list?type=2`)
    },
    onError: (error) => {
      // @ts-ignore
      if (error?.response?.data?.password?.includes('This password is too common.'))
        openSnackbar({ message: 'Parol juda sodda', status: 'error' })
      else openSnackbar({ message: error?.message, status: 'error' })
    },
  })

  const submit = handleSubmit((values) => {
    const body = {
      ...values,
      region: values?.region?.id,
      district: [1, 2].includes(+values?.role?.id) ? null : values?.district?.id,
      profil: values.profil.id,
      role: values?.role?.id,
      id,
    }
    isEditing ? editEmployee(body) : createEmployee(body)
  })

  useEffect(() => {
    if (accountById) {
      reset({
        district: accountById.district,
        email: accountById.email,
        profil: {
          id: accountById.profil.id,
          name: accountById.profil.name,
        },
        region: accountById.region,
        role: {
          id: accountById.role as any,
          name: '' as any,
        },
        username: accountById.username,
      })
    }
  }, [accountById])
  return (
    <div>
      <Breadcrumb
        backLink={'employee/list?type=2'}
        innerPageName="Platforma xodimi"
        sidebarItems={adminSideBarItems}
      />
      {isFetching ? (
        <MainLoading />
      ) : (
        <Box p="16px" component="form" onSubmit={submit} bgcolor="#fff" borderRadius="3px">
          <FlexWrapper
            gap="15px"
            sx={{ alignItems: 'flex-start !important' }}
            p="16px"
            border="1px solid var(--Gray, #CDD2D7)"
            borderRadius="15px"
          >
            <Stack gap="10px" width="100%">
              <SelectForm
                label="Xodim"
                control={control}
                name="profil"
                // options={employees?.results || []}
                dataUrl={'employee/employee/list'}
                // disabled={view}
                isPerson
                params={{
                  has_account: false,
                }}
              />

              <SelectForm label="Roli" control={control} name="role" options={ROLES_OPTIONS} />
              <SelectForm
                label="Viloyati"
                control={control}
                name="region"
                options={regions?.results}
                // disabled={view}
                onChange={(val: regionT) => {
                  setDistricts(val.district)
                  setValue('district', undefined)
                }}
              />
              {!(
                watch('role')?.name === 'Super Admin' || watch('role')?.name === 'Viloyat admin'
              ) && (
                <SelectForm
                  label="Tuman"
                  control={control}
                  name="district"
                  options={districts}
                  disabled={districts?.length === 0}
                />
              )}
            </Stack>
            <Stack gap="10px" width="100%">
              <InputForm label="Login" control={control} name="username" />
              <InputForm label="Email" control={control} name="email" type="email" />
              <InputForm
                label="Parol"
                control={control}
                name="password"
                rules={{ required: !isEditPending }}
              />
              <InputForm
                label="Parol tasdiqlash"
                control={control}
                name="password2"
                rules={{ required: !isEditPending }}
              />
            </Stack>
          </FlexWrapper>

          <FlexBetween>
            <div></div>
            <FlexWrapper gap="20px" mt="20px">
              <CustomButton
                value="Bekor qilish"
                bgColor="#fff"
                type="button"
                border="1px solid var(--textColor)"
                color="var(--textColor)"
              />
              <CustomButton
                loading={isCreatePending || isEditPending}
                type="submit"
                value="Saqlash"
              />
            </FlexWrapper>
          </FlexBetween>
        </Box>
      )}
    </div>
  )
}

export default AddEditAccount
