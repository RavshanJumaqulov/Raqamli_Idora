import { Box, Stack } from '@mui/material'
import { FlexWrapper } from '../../../components/common/Flex'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import CustomButton from '../../../components/common/CustomButton'
import { requiredFileOptions, tabList } from '../../../data/thesisData'
import { Formik, Form } from 'formik'
import FormikInput from '@components/common/Formik/FormikInput'
import FormikDatePicker from '@components/common/Formik/FormikDatePicker'
import FormikSelect from '@components/common/Formik/FormikSelect'
import FormikUploadFile from '@components/common/Formik/FormikUploadFile'
import { getQuery, putMutation, postMutation } from '@services/requests/CommonRequests'
import { MainContext, MainContextType } from '@contexts/MainProvider'
import { useContext, useState } from 'react'
import { styled } from 'styled-components'
import { Text } from '@styles/globalStyle'
import Breadcrumb from '@components/common/Breadcrump'
import { adminSideBarItems } from '@components/Sidebar/adminSidebarItems'
import { MainLoading } from '@components/common/Loading'

const AddThesis = () => {
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
    'friday_tesis/detail/' + id,
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

  const { mutate, isPending } = postMutation('friday_tesis/create/', {
    onSuccess: () => {
      navigate('/friday-thesis/list?type=' + typeQuery)
      openSnackbar({ message: "Muvaffaqiyatli qo'shildi", status: 'success' })
    },
    onError: (error) => {
      openSnackbar({ message: error?.message, status: 'error' })
    },
  })

  const { mutate: edit, isPending: isEditing } = putMutation('friday_tesis/update/' + id + '/', {
    onSuccess: () => {
      navigate('/friday-thesis/list?type=' + typeQuery)
      openSnackbar({ message: 'Muvaffaqiyatli tahrir qilindi', status: 'success' })
    },
    onError: (error) => {
      openSnackbar({ message: error?.message, status: 'error' })
    },
  })

  const handleSubmit = (vals) => {
    const requiredItems = vals.requiredItems.map((item) => item.id)
    const data = {
      ...vals,
      types: typeQuery,
      file: typeof vals.file !== 'string' ? vals.file : null,
      attachment: vals.attachment && typeof vals.attachment !== 'string' ? vals.attachment : null,
      //   voice: requiredItems.includes(0 || '0'),
      image: requiredItems.includes(1 || '1'),
      video: requiredItems.includes(2 || '2'),
      comment: requiredItems.includes(3 || '3'),
      fileBool: requiredItems.includes(4 || '4'),
      requiredItems: null,
      to_region: vals.to_region.map((item) => item.id),
      to_district: vals.to_district.map((item) => item.id),
      to_mosque: vals.to_mosque.map((item) => item.id),
    }
    if (!id) {
      mutate(data)
    }
    if (id) {
      edit(data)
    }
  }

  const initialValues = {
    title: detail?.title || '',
    date: detail?.date || '',
    to_region: detail?.to_region || [],
    to_district: detail?.to_district || [],
    to_mosque: detail?.to_mosque || [],
    requiredItems: requiredFileOptions.filter((item) => detail?.[item.key]) || [],
    file: detail?.file || null,
    file_comment: detail?.file_comment || '',
    attachment: detail?.attachment || null,
    attachment_comment: detail?.attachment_comment || '',
  }

  if (isDetailLoading) return <MainLoading />

  return (
    <>
      <Breadcrumb sidebarItems={adminSideBarItems} />
      <StyledBox>
        <h3 className="title">
          {view && `${tabList[typeQuery - 1]}ni ko'rish`}
          {id && !view && `${tabList[typeQuery - 1]}ni tahrirlash`}
          {!id && !view && `Yangi ${tabList[typeQuery - 1]} qo'shish`}
        </h3>

        <Formik
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          {({}) => (
            <Form>
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

                  <FormikDatePicker
                    disabled={view || isPending || isEditing}
                    label="Sana"
                    name="date"
                    required
                  />

                  <Text mt={'20px'} fs="18px" fw="600" c="black">
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
                    label="Viloyatlar"
                    multiple
                    required
                    name="to_region"
                    options={regions?.results}
                    placeholder="Bir yoki bir nechtasini tanlang"
                    getOptionLabel={(opt) => opt.name}
                    disabled={view || isPending || isEditing || isEdit}
                  />

                  <FormikSelect
                    label="Tuman"
                    multiple
                    name="to_district"
                    options={districts?.results}
                    getOptionLabel={(opt) => opt.name}
                    placeholder={'Yozib qidiring'}
                    onInputChange={(_, newInputValue) => {
                      setDistrictsParams((prev) => ({ search: newInputValue }))
                    }}
                    disabled={view || isPending || isEditing || isEdit}
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

                  <FormikSelect
                    label="Masjid"
                    multiple
                    name="to_mosque"
                    options={mosques?.results}
                    getOptionLabel={(opt) =>
                      opt.district || opt.district__name
                        ? opt.name + ' | ' + (opt.district?.name || opt.district__name)
                        : opt.name
                    }
                    placeholder={'Yozib qidiring'}
                    onInputChange={(_, newInputValue) => {
                      setMosqueParams((prev) => ({ search: newInputValue }))
                    }}
                    disabled={view || isPending || isEditing || isEdit}
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
                </Stack>

                <Stack rowGap={'24px'}>
                  <FormikUploadFile
                    label="Fayl"
                    name="file"
                    accept={'.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.pptx,.ppt'}
                    disabled={view || isPending || isEditing}
                    id={id}
                  />

                  <FormikInput
                    disabled={view || isPending || isEditing}
                    name="file_comment"
                    component={'textarea'}
                    label="Fayl uchun izoh"
                  />

                  <FormikUploadFile
                    label="Ilova"
                    name="attachment"
                    accept={'.pdf,.doc,.docx,.xls,.xlsx,.txt,.zip,.pptx,.ppt'}
                    disabled={view || isPending || isEditing}
                    id={id}
                  />

                  <FormikInput
                    name="attachment_comment"
                    component={'textarea'}
                    label="Ilova uchun izoh"
                    disabled={view || isPending || isEditing}
                  />
                </Stack>
              </Box>

              {!view && (
                <FlexWrapper gap="16px" justifyContent={'flex-end'}>
                  <CustomButton
                    onClick={() => {
                      navigate('/friday-thesis/list?type=' + typeQuery)
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

export default AddThesis

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
`
