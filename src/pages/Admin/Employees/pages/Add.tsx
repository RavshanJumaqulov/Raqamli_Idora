import { adminSideBarItems } from '@components/Sidebar/adminSidebarItems'
import Breadcrumb from '@components/common/Breadcrump'
import CustomButton from '@components/common/CustomButton'
import { FlexWrapper } from '@components/common/Flex'
import {
  DatePicker,
  InputForm,
  MoneyInput,
  PhoneInput,
  SelectForm,
  UploadImage,
} from '@components/form'
import { useMainContext } from '@contexts/MainProvider'
import { Box, Grid, Stack } from '@mui/material'
import { getQuery, patchMutation, postMutation } from '@services/requests/CommonRequests'
import {
  ACADEMIC_DEGREE_OPTIONS,
  EDUCATION_OPTIONS,
  NATIONS_OPTIONS,
  SERVER_DATE_FORMAT,
} from '@src/constants'
import { Option } from '@src/types/types.common'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import {
  EmployeeBody,
  EmployeeForm,
  GetDepartments,
  IEmployee,
  PositionTypes,
} from '../employee.types'
import { MainLoading } from '@components/common/Loading'

const AddEmployee = () => {
  const navigate = useNavigate()
  const navigateToPrev = () => {
    navigate(`/employee/list?type=1`)
  }

  const { id } = useParams()
  const isEditing = !!id
  const { data: employeeById, isFetching } = getQuery<IEmployee>(`employee/employee/${id}`, [], {
    enabled: isEditing,
  })

  const {
    actions: { openSnackbar },
  } = useMainContext()
  const { control, setValue, handleSubmit, watch, reset } = useForm<EmployeeForm>()
  const { data: universities } = getQuery<Option[]>('employee/university', [], {})
  const { data: departments } = getQuery<GetDepartments[]>('employee/department', [], {})

  const { mutate: createEmployee, isPending: isCreatePending } = postMutation<EmployeeBody>(
    'employee/employee/create',
    {
      onSuccess: () => {
        openSnackbar({ message: "Muvaffaqiyatli qo'shildi", status: 'success' })
        navigateToPrev()
      },
      onError: (error) => {
        openSnackbar({ message: error?.message, status: 'error' })
      },
    }
  )
  const { mutate: editEmployee, isPending: isEditPending } = patchMutation<
    EmployeeBody & { id: string }
  >(`employee/employee/update/${id}`, {
    onSuccess: () => {
      openSnackbar({ message: "Muvaffaqiyatli o'zgartirildi", status: 'success' })
      navigateToPrev()
    },
    onError: (error) => {
      openSnackbar({ message: error?.message, status: 'error' })
    },
  })

  const submit = handleSubmit(async (values) => {
    const body: EmployeeBody = {
      birth_date: dayjs(values.birth_date, SERVER_DATE_FORMAT).format(SERVER_DATE_FORMAT),
      graduated_year: dayjs(values.graduated_year, SERVER_DATE_FORMAT).format(SERVER_DATE_FORMAT),
      department: values.department?.id,
      graduated_univer: values.graduated_univer?.id,
      education: values.education?.id,
      address: values.address,
      last_name: values.last_name,
      surname: values.surname,
      mosque: values.mosque?.id,
      name: values.name,
      academic_degree: values.academic_degree?.id,
      position: values.position?.id,
      nation: values.nation?.id,
      phone_number: `+${values.phone_number.replace(/ /g, '')}`,
      diploma_number: String(values.diploma_number),
      image: typeof values.image !== 'string' ? values.image : null,
    }
    isEditing ? editEmployee(body) : createEmployee(body)
  })

  useEffect(() => {
    if (isEditing && employeeById && universities && departments) {
      reset({
        ...employeeById,
        graduated_univer: employeeById.graduated_univer,
        nation: {
          id: employeeById.nation,
          name: '',
        },
        department: employeeById?.department,
        position: employeeById?.position,
        education: {
          id: employeeById?.education,
          name: '',
        },
        academic_degree: {
          id: employeeById?.academic_degree,
          name: '',
        },
        // achievement: {
        //   id: employeeById.achievement,
        //   name: '',
        // },
        mosque: employeeById.mosque,
        birth_date: dayjs(employeeById.birth_date, SERVER_DATE_FORMAT),
        graduated_year: dayjs(employeeById.graduated_year, SERVER_DATE_FORMAT),
      })
    }
  }, [isEditing, employeeById, universities, departments])

  const [mosqueParams, setMosqueParams] = useState<{
    has_imam: false | null
  }>({
    has_imam: false,
  })
  const hasMosqueFieldLabels = [PositionTypes.Imom, PositionTypes.Noib].includes(
    watch('position')?.name as PositionTypes
  )
  return (
    <Box>
      <Breadcrumb sidebarItems={adminSideBarItems} />

      {isFetching ? (
        <MainLoading />
      ) : (
        <StyledEmployeeBox className="">
          <form onSubmit={submit}>
            <Grid container spacing={4}>
              <Grid item md={4}>
                <div className="image-upload">
                  <UploadImage
                    name="image"
                    required={false}
                    control={control}
                    setValue={setValue}
                  />
                </div>
              </Grid>
              <Grid item md={8}>
                <div className="form-container ">
                  <div className="main-form">
                    <Stack gap="10px">
                      <InputForm label="Ismi" control={control} name="name" />
                      <InputForm label="Familiyasi" control={control} name="last_name" />
                      <InputForm label="Otasining ismi" control={control} name="surname" />
                      <DatePicker label="Tug`ilgan sanasi" control={control} name="birth_date" />
                      <SelectForm
                        label="Millati"
                        control={control}
                        name="nation"
                        required={false}
                        options={NATIONS_OPTIONS}
                      />
                      <InputForm label="Manzili" control={control} name="address" />
                      <PhoneInput label="Telefon raqami" control={control} name="phone_number" />
                    </Stack>
                    <Stack gap="10px">
                      <SelectForm
                        label="Bo'limi"
                        control={control}
                        name="department"
                        required={false}
                        options={departments}
                        onChange={() => {
                          setValue('position', { id: undefined, name: '' })
                        }}
                      />
                      <SelectForm
                        label="Lavozimi"
                        control={control}
                        name="position"
                        options={watch('department')?.position}
                        onChange={(option) => {
                          setValue('mosque', {
                            name: '',
                            id: undefined,
                          })
                          if (option.name === PositionTypes.Imom) {
                            setMosqueParams({ has_imam: false })
                          } else if (option.name === PositionTypes.Noib) {
                            setMosqueParams({ has_imam: null })
                          }
                        }}
                      />
                      <SelectForm
                        label="Ma'lumoti"
                        control={control}
                        name="education"
                        required={false}
                        options={EDUCATION_OPTIONS}
                      />
                      <SelectForm
                        label="Bitirgan ta'lim muassasasi"
                        control={control}
                        required={false}
                        options={universities}
                        name="graduated_univer"
                      />
                      <SelectForm
                        label="Ilmiy darajasi"
                        control={control}
                        name="academic_degree"
                        required={false}
                        options={ACADEMIC_DEGREE_OPTIONS}
                      />
                      {/* <SelectForm
                    label="Yutuqlar"
                    control={control}
                    name="achievement"
                    options={ACHIEVEMENTS_OPTIONS}
                  /> */}
                      <DatePicker
                        label="Bitirgan sanasi"
                        control={control}
                        name="graduated_year"
                        required={false}
                        maxDate={dayjs()}
                      />
                      <MoneyInput label="Diplomi raqami" control={control} name="diploma_number" />
                      {hasMosqueFieldLabels && (
                        <SelectForm
                          dataUrl="mosque/list"
                          control={control}
                          label="Masjidlar"
                          required={false}
                          name="mosque"
                          isMosque
                          params={mosqueParams}
                        />
                      )}
                    </Stack>
                  </div>
                </div>
              </Grid>
            </Grid>
            <FlexWrapper gap={3} justifyContent={'end'} mt={2}>
              <CustomButton
                onClick={() => {
                  navigateToPrev()
                }}
                value={'Bekor qilish'}
                type="button"
                bgColor="#F2F5F9"
                fw="500"
                color="#828D9C"
                disable={isEditPending || isCreatePending}
              />
              <CustomButton
                disable={isEditPending || isCreatePending}
                type="submit"
                value={isEditing ? "O'zgartirish" : 'Yaratish'}
                loading={isEditPending || isCreatePending}
              />
            </FlexWrapper>
          </form>
        </StyledEmployeeBox>
      )}
    </Box>
  )
}

const StyledEmployeeBox = styled.div`
  background-color: white;
  padding: 24px;
  border-radius: 16px;
  .image-upload {
    padding-top: 100px;
  }
  .form-container {
    border: 1px solid #cdd2d7;
    border-radius: 16px;
    padding: 16px;
  }
  .main-form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 100%;

    gap: 18px;
    & > div {
      display: flex;
      flex-direction: column;
    }
  }
  .submit-btn {
    margin-top: 2rem;
    display: flex;
    justify-content: end;
  }
`

export default AddEmployee
