import { Box, Stack } from '@mui/material'
import { FlexWrapper } from '../../../components/common/Flex'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import CustomButton from '../../../components/common/CustomButton'
import {
  requiredFileOptions,
  tabList,
  instructionsPostTypes,
  rolesForDistrictAdmin,
} from '@data/instructionsData'
import { Formik, Form } from 'formik'
import FormikInput from '@components/common/Formik/FormikInput'
import FormikDatePicker from '@components/common/Formik/FormikDatePicker'
import FormikSelect from '@components/common/Formik/FormikSelect'
import { getQuery, postMutation, putMutation } from '@services/requests/CommonRequests'
import { Text } from '@styles/globalStyle'
import { getUser } from '@utils/helper'
import { MainContext, MainContextType } from '@contexts/MainProvider'
import { useContext } from 'react'
import { styled } from 'styled-components'
import FormikMultipleUploadFile from '@components/common/Formik/FormikMultipleUploadFile'
import Breadcrumb from '@components/common/Breadcrump'
import { imomSideBarItems } from '@components/Sidebar/imomSidebaritems'

const DistrictAdminInstructionsAdd = () => {
  const {
    actions: { openSnackbar },
    state: { fullProfile: user },
  } = useContext<MainContextType>(MainContext)
  const userRegionId = user?.[0]?.region
  const userDistrictId = user?.[0]?.district

  const [searchParams] = useSearchParams()

  const typeQuery = +searchParams.get('type')
  const navigate = useNavigate()
  const { id } = useParams()

  const { pathname } = useLocation()

  const view = pathname?.split('/')?.includes('view')
  const isEdit = pathname?.split('/')?.includes('edit')

  const { data: detail } = getQuery<any>('orders/detail/' + id, undefined, {
    enabled: !!id,
  })

  const { data: mosques } = getQuery<any>(
    'mosque/list/',
    undefined,
    { enabled: !!userDistrictId },
    {
      params: {
        limit: 100,
        district: userDistrictId,
      },
    }
  )

  const { mutate, isPending } = postMutation('orders/create/', {
    onSuccess: () => {
      navigate('/instructions/list?type=' + typeQuery + '&activeTab=2')
      openSnackbar({ message: "Muvaffaqiyatli qo'shildi", status: 'success' })
    },
    onError: (error) => {
      openSnackbar({ message: error?.message, status: 'error' })
    },
  })

  const { mutate: put, isPending: isEditing } = putMutation('orders/update/' + id, {
    onSuccess: () => {
      navigate('/instructions/list?type=' + typeQuery + '&activeTab=2')
      openSnackbar({ message: 'Muvaffaqiyatli tahrir qilindi', status: 'success' })
    },
    onError: (error) => {
      openSnackbar({ message: error?.message, status: 'error' })
    },
  })

  const handleSubmit = (values) => {
    const requiredItems = values.requiredItems.map((item) => item.id)
    const data = {
      ...values,
      creator: getUser().id,
      file: values.file.map((item) => item.id),
      types: values.types.id,
      direction_type: typeQuery,
      from_role: getUser().role,
      from_date: String(
        new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60 * 1000)
          .toISOString()
          .split('T')[0]
      ),
      to_date: values.types.id != 1 ? values.to_date : null,
      image: requiredItems.includes(2 || '2'),
      video: requiredItems.includes(3 || '3'),
      comment: requiredItems.includes(4 || '4'),
      file_bool: requiredItems.includes(5 || '5'),
      to_region: [userRegionId],
      to_district: [userDistrictId],
      to_employee: values.to_employee.map((item) => item.id),
      required_to_employee: values.required_to_employee.map((item) => item.id),
      requiredItems: null,
    }

    if (!id) {
      mutate(data)
    }
    if (id) {
      put(data)
    }
  }

  const initialValues = {
    to_role: detail?.to_role || [],
    title: detail?.title || '',
    types: instructionsPostTypes.find((item) => item.id == detail?.types) || null,
    from_date: detail?.from_date || '',
    to_date: detail?.to_date || '',
    to_employee: detail?.to_employee || [],
    required_to_employee: detail?.required_to_employee || [],
    requiredItems: requiredFileOptions.filter((item) => detail?.[item.key]) || [],
    file: detail?.file || [],
    comments: detail?.comments || '',
  }

  const validate = (vals) => {
    const errors: any = {}
    if (vals.to_role.length == 0) {
      errors.to_role = 'Bir yoki bir nechtasini tanlang'
    }
    return errors
  }

  return (
    <>
      <Breadcrumb
        sidebarItems={imomSideBarItems}
        // itemName={employeeById?.name + ' ' + employeeById?.last_name}
      />

      <StyledBox>
        <h3 className="title">
          {view && `${tabList[typeQuery - 1]}ni ko'rish`}
          {id && !view && `${tabList[typeQuery - 1]}ni tahrirlash`}
          {!id && !view && `Yangi ${tabList[typeQuery - 1]} qo'shish`}
        </h3>

        <Formik
          validate={validate}
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, errors }) => (
            <Form>
              <div className="role-box">
                <label>Kim uchun:</label>
                <div>
                  <div className="tab-box">
                    {rolesForDistrictAdmin.map((item) => (
                      <span
                        onClick={
                          !id
                            ? () => {
                                if (values.to_role.includes(String(item.id))) {
                                  setFieldValue(
                                    'to_role',
                                    values.to_role.filter((id) => id != item.id)
                                  )
                                } else {
                                  setFieldValue('to_role', [...values.to_role, String(item.id)])
                                }
                              }
                            : undefined
                        }
                        className={`${
                          values.to_role.includes(String(item.id)) ? 'active-tab' : ''
                        } tab`}
                        key={item.id}
                      >
                        {item.label}
                      </span>
                    ))}
                  </div>
                  {errors.to_role && typeof errors.to_role === 'string' && (
                    <p className="error">{errors.to_role}</p>
                  )}
                </div>
              </div>
              <Box
                sx={{ gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, mb: '20px' }}
                display={'grid'}
                rowGap={'16px'}
                columnGap={'32px'}
              >
                <Stack rowGap={'24px'}>
                  <FormikInput
                    disabled={view || isPending || isEditing}
                    label="Nomi"
                    name="title"
                    placeholder="Title"
                    required
                  />
                  <FormikSelect
                    label="Turi"
                    options={instructionsPostTypes}
                    name="types"
                    required
                    placeholder="Turi"
                    disableClearable
                    disabled={view || isPending || isEditing}
                  />
                  {/* {values.types?.id !== 1 && (
                  <FormikDatePicker required label="Sanadan" name="from_date" />
                )} */}
                  {values.types?.id != 1 && (
                    <FormikDatePicker
                      disabled={view || isPending || isEditing}
                      label="Sanagacha"
                      name="to_date"
                    />
                  )}

                  <FormikSelect
                    label="Masjid"
                    disabled={view || isPending || isEditing || isEdit}
                    multiple
                    name="to_employee"
                    options={mosques?.results}
                    getOptionLabel={(opt) =>
                      opt.district || opt.district__name
                        ? opt.name + ' | ' + (opt.district?.name || opt.district__name)
                        : opt.name
                    }
                    onChange={(_, newValue) => {
                      setFieldValue('to_employee', newValue)
                      setFieldValue('required_to_employee', [])
                    }}
                  />
                </Stack>

                <Stack rowGap={'24px'}>
                  <Stack
                    gap={'24px'}
                    p={'16px'}
                    border={'1px solid rgba(145, 158, 171, 0.20)'}
                    borderRadius={'8px'}
                  >
                    <Text fs="18px" fw="600" c="black">
                      Majburiyatlar
                    </Text>

                    <FormikSelect
                      label="Majburiyatlar"
                      multiple
                      name="requiredItems"
                      options={requiredFileOptions}
                      disabled={view || isPending || isEditing}
                    />

                    <FormikSelect
                      label="Masjid"
                      multiple
                      name="required_to_employee"
                      options={
                        values.to_employee.length > 0 ? values.to_employee : mosques?.results
                      }
                      getOptionLabel={(opt) =>
                        opt.district || opt.district__name
                          ? opt.name + ' | ' + (opt.district?.name || opt.district__name)
                          : opt.name
                      }
                      disabled={view || isPending || isEditing || isEdit}
                    />

                    <FormikMultipleUploadFile
                      label="Fayl"
                      name="file"
                      accept={'.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.pptx,.ppt'}
                      apiPath="orders/file/create"
                      mutationKey="instructions_multiple_upload"
                      disabled={view || isPending || isEditing}
                    />

                    <FormikInput
                      disabled={view || isPending || isEditing}
                      name="comments"
                      component={'textarea'}
                      label="Fayl uchun izoh"
                    />
                  </Stack>
                </Stack>
              </Box>

              {!view && (
                <FlexWrapper gap="16px" justifyContent={'flex-end'}>
                  <CustomButton
                    onClick={() => {
                      navigate(-1)
                    }}
                    value={'Bekor qilish'}
                    bgColor="#F2F5F9"
                    fw="500"
                    color="#828D9C"
                    disable={isPending || isEditing}
                  />
                  <CustomButton
                    disable={isPending || isEditing}
                    loading={isPending || isEditing}
                    type="submit"
                    value={'Saqlash'}
                  />
                </FlexWrapper>
              )}
            </Form>
          )}
        </Formik>
      </StyledBox>
    </>
  )
}

export default DistrictAdminInstructionsAdd

const StyledBox = styled(Box)`
  padding: 12px 24px;
  background-color: white;

  .title {
    font-size: 24px;
    font-weight: 700;
    color: #212b36;
    text-transform: lowercase;
    &::first-letter {
      text-transform: uppercase;
    }
    margin-bottom: 20px;
  }

  .role-box {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;

    label {
      font-size: 14px;
      color: #637381;
      font-weight: 700;
    }

    .tab-box {
      display: flex;
      padding: 4px;
      justify-content: center;
      align-items: center;
      border-radius: 6px;
      border: 1px solid var(--Gray, #cdd2d7);
      gap: 5px;

      .tab {
        color: var(--Gray, #cdd2d7);
        font-size: 14px;
        font-weight: 700;
        padding: 6px 12px;
        cursor: pointer;
      }
      .active-tab {
        border-radius: 6px;
        background: var(--Light-Green, #ebf8f3);
        color: var(--Green, #00a76f);
      }
    }
    .error {
      color: #e60019;
      font-size: 14px;
      font-weight: 500;
      margin-top: 4px;
    }
  }
`
