import { Box, Stack } from '@mui/material'
import { FlexWrapper } from '../../../components/common/Flex'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import CustomButton from '../../../components/common/CustomButton'
import {
  requiredFileOptions,
  tabList,
  instructionsPostTypes,
  rolesForSuperAdmin,
  rolesForRegionAdmin,
  rolesForDistrictAdmin,
} from '../../../data/instructionsData'
import { Formik, Form } from 'formik'
import FormikInput from '@components/common/Formik/FormikInput'
import FormikDatePicker from '@components/common/Formik/FormikDatePicker'
import FormikSelect from '@components/common/Formik/FormikSelect'
import { getQuery, postMutation, putMutation } from '@services/requests/CommonRequests'
import { Text } from '@styles/globalStyle'
import { getUser } from '@utils/helper'
import { MainContext, MainContextType } from '@contexts/MainProvider'
import { useContext, useState } from 'react'
import { styled } from 'styled-components'
import FormikMultipleUploadFile from '@components/common/Formik/FormikMultipleUploadFile'
import Breadcrumb from '@components/common/Breadcrump'
import { imomSideBarItems } from '@components/Sidebar/imomSidebaritems'
import { MainLoading } from '@components/common/Loading'

const AddInstruction = () => {
  const [mosqueParams, setMosqueParams] = useState({})
  const [districtsParams, setDistrictsParams] = useState({})
  const {
    actions: { openSnackbar },
  } = useContext<MainContextType>(MainContext)

  const [searchParams] = useSearchParams()
  const typeQuery = +searchParams.get('type')
  const navigate = useNavigate()
  const { id } = useParams()

  const { pathname } = useLocation()

  const view = pathname?.split('/')?.includes('view')
  const isEdit = pathname?.split('/')?.includes('edit')

  const { data: detail, isLoading: isDetailLoading } = getQuery<any>(
    'orders/detail/' + id,
    undefined,
    {
      enabled: !!id,
    }
  )

  const { data: regions } = getQuery<any>('common/regions', undefined, undefined, {
    params: {
      limit: 14,
    },
  })

  const { data: districts } = getQuery<any>('common/districts', [districtsParams], undefined, {
    params: districtsParams,
  })

  const { data: mosques } = getQuery<any>('mosque/list/', [mosqueParams], undefined, {
    params: mosqueParams,
  })

  const { mutate, isPending } = postMutation('orders/create/', {
    onSuccess: () => {
      navigate('/instructions/list?type=' + typeQuery)
      openSnackbar({ message: "Muvaffaqiyatli qo'shildi", status: 'success' })
    },
    onError: (error) => {
      openSnackbar({ message: error?.message, status: 'error' })
    },
  })

  const { mutate: put, isPending: isEditing } = putMutation('orders/update/' + id, {
    onSuccess: () => {
      navigate('/instructions/list?type=' + typeQuery)
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
      to_region: values.to_region.map((item) => item.id),
      to_district:
        !values.to_role.includes('2') && values.to_region.length == 1
          ? values.to_district.map((item) => item.id)
          : null,
      to_employee:
        values.to_role.includes('4' || '5') &&
        values.to_region.length == 1 &&
        values.to_district.length == 1
          ? values.to_employee.map((item) => item.id)
          : null,
      required_to_region:
        values.to_district.length == 0 && values.to_employee.length == 0
          ? values.required_to_region.map((item) => item.id)
          : null,
      required_to_district:
        (values.to_region.length > 0
          ? values.to_region.length == 1 &&
            values.to_employee.length == 0 &&
            values.to_district.length > 0
          : true) && !values.to_role.includes('2')
          ? values.required_to_district.map((item) => item.id)
          : null,
      required_to_employee:
        (values.to_region.length > 0
          ? values.to_region.length == 1 &&
            values.to_district.length == 1 &&
            values.to_employee.length > 0
          : true) && values.to_role.includes('4' || '5')
          ? values.required_to_employee.map((item) => item.id)
          : null,
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
    to_region:
      regions?.results?.filter(
        (item) => item?.id == detail?.to_region?.find((reg) => reg?.id == item?.id)?.id
      ) || [],
    to_district: detail?.to_district || [],
    to_employee: detail?.to_employee || [],
    required_to_region: detail?.required_to_region || [],
    required_to_district: detail?.required_to_district || [],
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

  if (isDetailLoading) return <MainLoading />

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
                    {(
                      (getUser().role === '1' && rolesForSuperAdmin) ||
                      (getUser().role === '2' && rolesForRegionAdmin) ||
                      (getUser().role === '3' && rolesForDistrictAdmin)
                    ).map((item) => (
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
                    label="Viloyatlar"
                    multiple
                    disabled={view || isPending || isEditing || isEdit}
                    name="to_region"
                    options={regions?.results}
                    placeholder="Viloyatlar"
                    getOptionLabel={(opt) => opt.name}
                    onChange={(_, newValue) => {
                      setFieldValue('to_region', newValue)
                      setFieldValue('to_district', [])
                      setFieldValue('to_employee', [])
                      setFieldValue('required_to_region', [])
                      setFieldValue('required_to_district', [])
                      setFieldValue('required_to_employee', [])
                      if (newValue.length == 1) {
                        setMosqueParams((prev) => ({
                          region: newValue[0].id,
                        }))
                      }
                    }}
                  />

                  {!values.to_role.includes('2') && values.to_region.length == 1 && (
                    <FormikSelect
                      label="Tumanlar"
                      multiple
                      disabled={view || isPending || isEditing || isEdit}
                      name="to_district"
                      options={values.to_region.length == 1 ? values.to_region[0].district : []}
                      placeholder="Tumanlar"
                      getOptionLabel={(opt) => opt.name}
                      onChange={(_, newValue) => {
                        setFieldValue('to_district', newValue)
                        setFieldValue('to_employee', [])
                        setFieldValue('required_to_district', [])
                        setFieldValue('required_to_employee', [])
                        if (newValue.length == 1) {
                          setMosqueParams((prev) => ({
                            district: newValue[0].id,
                          }))
                        }
                      }}
                    />
                  )}

                  {values.to_role.includes('4' || '5') &&
                    values.to_region.length == 1 &&
                    values.to_district.length == 1 && (
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
                        onInputChange={(_, newInputValue) => {
                          setMosqueParams((prev) => ({ ...prev, search: newInputValue }))
                        }}
                        freeSolo
                        forcePopupIcon
                        filterOptions={(options) => {
                          if (options.length == 0) return [{ name: 'Topilmadi' }]
                          return options
                        }}
                        getOptionDisabled={(option) =>
                          option.name && option.name.toLowerCase() === 'topilmadi'
                        }
                      />
                    )}
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

                    {values.to_district.length == 0 && values.to_employee.length == 0 && (
                      <FormikSelect
                        label="Viloyat"
                        multiple
                        name="required_to_region"
                        options={values.to_region.length > 0 ? values.to_region : regions?.results}
                        getOptionLabel={(opt) => opt.name}
                        disabled={view || isPending || isEditing || isEdit}
                      />
                    )}

                    {(values.to_region.length > 0
                      ? values.to_region.length == 1 &&
                        values.to_employee.length == 0 &&
                        values.to_district.length > 0
                      : true) &&
                      !values.to_role.includes('2') && (
                        <FormikSelect
                          label="Tuman"
                          multiple
                          name="required_to_district"
                          options={
                            values.to_region.length > 0 ? values.to_district : districts?.results
                          }
                          getOptionLabel={(opt) => opt.name}
                          placeholder={values.to_region.length > 0 ? 'Tanlang' : 'Yozib qidiring'}
                          disabled={view || isPending || isEditing || isEdit}
                          onInputChange={(_, newInputValue) => {
                            if (values.to_region.length == 0) {
                              setDistrictsParams((prev) => ({ search: newInputValue }))
                            }
                          }}
                          freeSolo
                          forcePopupIcon
                          filterOptions={(options) => {
                            if (options.length == 0) return [{ name: 'Topilmadi' }]
                            return options
                          }}
                          getOptionDisabled={(option) =>
                            option.name && option.name.toLowerCase() === 'topilmadi'
                          }
                        />
                      )}

                    {(values.to_region.length > 0
                      ? values.to_region.length == 1 &&
                        values.to_district.length == 1 &&
                        values.to_employee.length > 0
                      : true) &&
                      values.to_role.includes('4' || '5') && (
                        <FormikSelect
                          label="Masjid"
                          multiple
                          name="required_to_employee"
                          options={
                            values.to_region.length > 0 ? values.to_employee : mosques?.results
                          }
                          getOptionLabel={(opt) =>
                            opt.district || opt.district__name
                              ? opt.name + ' | ' + (opt.district?.name || opt.district__name)
                              : opt.name
                          }
                          placeholder={values.to_region.length > 0 ? 'Tanlang' : 'Yozib qidiring'}
                          disabled={view || isPending || isEditing || isEdit}
                          onInputChange={(_, newInputValue) => {
                            if (values.to_region.length == 0) {
                              setMosqueParams((prev) => ({ search: newInputValue }))
                            }
                          }}
                          freeSolo
                          forcePopupIcon
                          filterOptions={(options) => {
                            if (options.length == 0) return [{ name: 'Topilmadi' }]
                            return options
                          }}
                          getOptionDisabled={(option) =>
                            option.name && option.name.toLowerCase() === 'topilmadi'
                          }
                        />
                      )}

                    <FormikMultipleUploadFile
                      label="Fayl"
                      name="file"
                      accept={'.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.pptx,.ppt'}
                      apiPath="orders/file/create"
                      mutationKey="instructions_multiple_upload"
                      disabled={view || isPending || isEditing}
                      id={id}
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

export default AddInstruction

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
