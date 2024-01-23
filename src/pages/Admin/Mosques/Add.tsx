import { FlexWrapper } from '@components/common/Flex'
import FormikCheckbox from '@components/common/Formik/FormikCheckbox'
import FormikDatePicker from '@components/common/Formik/FormikDatePicker'
import FormikInput from '@components/common/Formik/FormikInput'
import FormikRadioGroup from '@components/common/Formik/FormikRadioGroup'
import FormikSelect from '@components/common/Formik/FormikSelect'
import FormikSwitch from '@components/common/Formik/FormikSwitch'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { getQuery, postMutation, putMutation } from '@services/requests/CommonRequests'
import { Text } from '@styles/globalStyle'
import { Formik, Form } from 'formik'
import styled from 'styled-components'
import {
  extraRoomsOptions,
  fireOptions,
  mosqueHeatingFuelOptions,
  mosqueHeatingTypeOptions,
  mosqueStatusOptions,
  multiStoreyOptions,
  typesOfMosque,
} from '../../../data/mosqueData'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { MainContext, MainContextType } from '@contexts/MainProvider'
import { useContext } from 'react'
import CustomButton from '@components/common/CustomButton'
import MultipleImgUploadMosques from './components/MultipleImgUploadMosques'
import Map from './components/Map'
import Breadcrumb from '@components/common/Breadcrump'
import { adminSideBarItems } from '@components/Sidebar/adminSidebarItems'
import { MainLoading } from '@components/common/Loading'

export default function AddMosque() {
  const {
    actions: { openSnackbar },
  } = useContext<MainContextType>(MainContext)
  const [searchParams] = useSearchParams()
  const typeQuery = +searchParams.get('type')
  const navigate = useNavigate()
  const { id } = useParams()

  const { pathname } = useLocation()

  const view = pathname?.split('/')?.includes('view')

  const { data: detail, isLoading: isDetailLoading } = getQuery<any>(
    'mosque/detail/' + id,
    undefined,
    {
      enabled: !!id,
    }
  )
  const imom = detail?.employee?.find((item) => item?.profile__role == 4)
  const noiblar = detail?.employee?.filter((item) => item?.profile__role == 5)

  const { mutate: put, isPending: patchIsPending } = putMutation('mosque/update/' + id, {
    onSuccess: () => {
      navigate('/mosques/list?type=' + typeQuery)
      openSnackbar({ message: 'Muvaffaqiyatli tahrir qilindi', status: 'success' })
    },
    onError: (error) => {
      openSnackbar({ message: error?.message, status: 'error' })
    },
  })

  const { mutate, isPending } = postMutation('mosque/create/', {
    onSuccess: () => {
      navigate('/mosques/list?type=' + typeQuery)
      openSnackbar({ message: "Muvaffaqiyatli qo'shildi", status: 'success' })
    },
    onError: (error) => {
      openSnackbar({ message: error?.message, status: 'error' })
    },
  })

  const { data: regions } = getQuery<any>('common/regions/', undefined, undefined, {
    params: {
      limit: 14,
    },
  })

  const handleSubmit = (vals) => {
    const data = {
      ...vals,
      region: vals.region.id,
      district: vals.district.id,
      location: vals.lat + ',' + vals.long,
      second_floor: vals.multiStorey && vals.second_floor,
      third_floor: vals.multiStorey && vals.third_floor,
      parking_capacity: vals.parking ? vals.parking_capacity : null,
      ...(vals.extraRooms &&
        Object.fromEntries(extraRoomsOptions.map(({ name }) => [name, vals[name]]))),
      other_room_amount: vals.extraRooms ? (vals.other_room ? vals.other_room_amount : null) : null,
      mosque_heating_type: vals.mosque_heating_type?.id,
      mosque_heating_fuel: vals.mosque_heating_type?.id == 2 ? vals.mosque_heating_fuel?.id : null,
      fire_images: fireOptions
        .map((item) => (vals[item.name] ? vals[item.imgField].map((item) => item.id) : []))
        .flat(),
    }

    if (!id) {
      mutate(data)
    }
    if (id) {
      put(data)
    }
  }

  if (isDetailLoading) return <MainLoading />

  return (
    <Formik
      enableReinitialize
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        name: detail?.name ?? '',
        address: detail?.address ?? '',
        built_at: detail?.built_at ?? '',
        registered_at: detail?.registered_at || '',
        region: detail?.region || null,
        district: detail?.district || null,
        lat: detail?.location.split(',')[0] || '',
        long: detail?.location.split(',')[1] || '',
        location: detail?.location || '',
        capacity: detail?.capacity || '',
        cultural_heritage: detail?.cultural_heritage || false,
        mosque_type: detail?.mosque_type || typesOfMosque.find((item) => item.value == '1').value,
        mosque_status:
          detail?.mosque_status || mosqueStatusOptions.find((item) => item.value == '1').value,
        multiStorey: detail?.second_floor || detail?.third_floor || false,
        second_floor: detail?.second_floor || false,
        third_floor: detail?.third_floor || false,
        basement: detail?.basement || false,
        parking: detail?.parking || false,
        parking_capacity: detail?.parking_capacity || '',
        extraRooms:
          detail?.imam_room ||
          detail?.imam_room ||
          detail?.mosque_library ||
          detail?.casher_room ||
          detail?.guard_room ||
          detail?.other_room ||
          false,
        imam_room: detail?.imam_room || false,
        sub_imam_room: detail?.imam_room || false,
        mosque_library: detail?.mosque_library || false,
        casher_room: detail?.casher_room || false,
        guard_room: detail?.guard_room || false,
        other_room: detail?.other_room || false,
        other_room_amount: detail?.other_room_amount || '',
        shrine: detail?.shrine || false,
        graveyard: detail?.graveyard || false,
        shop: detail?.shop || false,
        mosque_heating_type:
          mosqueHeatingTypeOptions.find((item) => item.id == detail?.mosque_heating_type) || null,
        mosque_heating_fuel:
          mosqueHeatingFuelOptions.find((item) => item.id == detail?.mosque_heating_fuel) || null,
        evacuation_road: detail?.evacuation_road || false,
        fire_safety: detail?.fire_safety || false,
        fire_closet: detail?.fire_closet || false,
        fire_signal: detail?.fire_signal || false,
        auto_fire_extinguisher: detail?.auto_fire_extinguisher || false,
        emergency_exit_door: detail?.emergency_exit_door || false,
        evacuation_road_image: detail?.evacuation_road_image || [],
        fire_safe_image: detail?.fire_safe_image || [],
        fire_closet_image: detail?.fire_closet_image || [],
        fire_signal_image: detail?.fire_signal_image || [],
        auto_fire_extinguisher_image: detail?.auto_fire_extinguisher_image || [],
        emergency_exit_door_image: detail?.emergency_exit_door_image || [],
        fire_images: detail?.fire_images || [],
      }}
      onSubmit={handleSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <Breadcrumb sidebarItems={adminSideBarItems} />
          <ParentBox>
            <Box className="first-part part">
              <Text fs="24px" c="#212B36" fw="700" lineHeight="36px" mb={'20px'}>
                {view && `Masjidni ko'rish`}
                {id && !view && `Masjidni tahrirlash`}
                {!id && !view && `Yangi masjid qo'shish`}
              </Text>

              <Box className="grid">
                <Stack gap={'24px'}>
                  <FormikInput
                    disabled={view}
                    required
                    name="name"
                    label="Nomi"
                    placeholder="Yozing"
                  />

                  <FormikInput
                    disabled={view}
                    required
                    name="address"
                    label="Manzili"
                    placeholder="Yozing"
                  />

                  <FormikSelect
                    disabled={view}
                    required
                    label="Viloyat"
                    name="region"
                    options={regions?.results}
                    placeholder="Viloyat/shahar"
                    getOptionLabel={(opt) => opt.name}
                    onChange={(_, newValue) => {
                      setFieldValue('region', newValue)
                      setFieldValue('district', null)
                    }}
                  />

                  <FormikSelect
                    disabled={view}
                    required
                    label="Tuman / shahar"
                    name="district"
                    options={values.region?.district}
                    placeholder="Tuman"
                    getOptionLabel={(opt) => opt.name}
                  />

                  <FormikDatePicker
                    disabled={view}
                    required
                    name="built_at"
                    label="Qurilgan yili"
                    views={['year']}
                    openTo="year"
                    format="YYYY"
                  />

                  <FormikDatePicker
                    disabled={view}
                    required
                    name="registered_at"
                    label="Ro’yxatdan o’tgan sana"
                  />

                  <FormikInput
                    disabled={view}
                    name="capacity"
                    label="Sig'imi"
                    type="number"
                    placeholder="Yozing"
                  />
                </Stack>

                <Stack gap={'24px'}>
                  <Box className="location-box">
                    <p className="label input-label">Lokatsiya</p>
                    <div className="inputs-box">
                      <FormikInput disabled={view} name="lat" placeholder="Latitude" />
                      <FormikInput disabled={view} name="long" placeholder="Longitude" />
                    </div>
                    <Map disabled={view} />
                  </Box>
                </Stack>
              </Box>
            </Box>
            {/*  */}
            <Box className="second-part part">
              <div className="grid">
                <Stack gap={'24px'}>
                  <p className="title">Boshqa detallar</p>

                  <FlexWrapper gap={'20px'}>
                    <p className="label">Madaniy merosga kiritilganmi</p>
                    <FormikSwitch disabled={view} name="cultural_heritage" />
                  </FlexWrapper>

                  <FormikRadioGroup
                    disabled={view}
                    label="Turi"
                    name="mosque_type"
                    options={typesOfMosque}
                  />

                  <FormikRadioGroup
                    disabled={view}
                    label="Bino holati"
                    name="mosque_status"
                    options={mosqueStatusOptions}
                  />

                  <div>
                    <FlexWrapper gap={'20px'}>
                      <p className="label">Ko'p qavatli</p>
                      <FormikSwitch disabled={view} name="multiStorey" />
                    </FlexWrapper>

                    {values.multiStorey && (
                      <FlexWrapper columnGap={'20px'} flexWrap={'wrap'}>
                        {multiStoreyOptions.map((item) => (
                          <FormikCheckbox
                            disabled={view}
                            key={item.name}
                            name={item.name}
                            label={item.label}
                          />
                        ))}
                      </FlexWrapper>
                    )}
                  </div>

                  <FlexWrapper gap={'20px'}>
                    <p className="label">Yerto'la</p>
                    <FormikSwitch disabled={view} name="basement" />
                  </FlexWrapper>

                  <div>
                    <FlexWrapper gap={'20px'} marginBottom={'12px'}>
                      <p className="label">Avtoturargoh</p>
                      <FormikSwitch disabled={view} name="parking" />
                    </FlexWrapper>

                    {values.parking && (
                      <FormikInput
                        disabled={view}
                        type="number"
                        name="parking_capacity"
                        placeholder="Sig'imini kiriting"
                      />
                    )}
                  </div>

                  <div>
                    <FlexWrapper gap={'20px'} marginBottom={'12px'}>
                      <p className="label">Qo'shimcha xonalar</p>
                      <FormikSwitch disabled={view} name="extraRooms" />
                    </FlexWrapper>
                    <div>
                      {values.extraRooms && (
                        <>
                          <FlexWrapper mb={'10px'} columnGap={'20px'} flexWrap={'wrap'}>
                            {extraRoomsOptions.map((item) => (
                              <FormikCheckbox key={item.name} name={item.name} label={item.label} />
                            ))}
                          </FlexWrapper>
                          {values.other_room && (
                            <FormikInput
                              name="other_room_amount"
                              type="number"
                              placeholder="Boshqa xonalar sonini kiriting"
                            />
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  <FlexWrapper gap={'20px'}>
                    <p className="label">Ziyoratgoh</p>
                    <FormikSwitch disabled={view} name="shrine" />
                  </FlexWrapper>

                  <FlexWrapper gap={'20px'}>
                    <p className="label">Qabriston</p>
                    <FormikSwitch disabled={view} name="graveyard" />
                  </FlexWrapper>

                  <FlexWrapper gap={'20px'}>
                    <p className="label">Bozor</p>
                    <FormikSwitch disabled={view} name="shop" />
                  </FlexWrapper>
                </Stack>

                <Stack gap={'24px'}>
                  <p className="title">Xavfsizlik</p>

                  <FormikSelect
                    disabled={view}
                    name="mosque_heating_type"
                    label="Isitish tizimi"
                    options={mosqueHeatingTypeOptions}
                  />
                  {values.mosque_heating_type?.id == 2 && (
                    <FormikSelect
                      disabled={view}
                      name="mosque_heating_fuel"
                      label="Isitish turi"
                      options={mosqueHeatingFuelOptions}
                    />
                  )}

                  {fireOptions.map((item) => (
                    <div key={item.type}>
                      <FlexWrapper gap={'20px'} marginBottom={'12px'}>
                        <p className="label">{item.label}</p>
                        <FormikSwitch disabled={view} name={item.name} />
                      </FlexWrapper>

                      {values[item.name] && (
                        <MultipleImgUploadMosques name={item.imgField} option={item} />
                      )}
                    </div>
                  ))}
                </Stack>
              </div>

              {view && (
                <>
                  <Divider sx={{ my: '20px' }} />

                  <div>
                    <h2 className="title">Xodimlar</h2>

                    <Typography sx={{ my: '5px' }} className="label">
                      Imom:{' '}
                      <span className="employee">
                        {imom?.name} {imom?.last_name}
                      </span>
                    </Typography>

                    <Typography className="label">Noiblar:</Typography>
                    {noiblar?.map((noib) => (
                      <p className="employee">
                        &nbsp; - {noib?.name} {noib?.last_name}
                      </p>
                    ))}
                  </div>
                </>
              )}

              {!view && (
                <FlexWrapper gap={'16px'} justifyContent={'flex-end'} mt={'20px'}>
                  <CustomButton
                    onClick={() => {
                      navigate('/mosques/list?type=' + typeQuery)
                    }}
                    value={'Bekor qilish'}
                    bgColor="#F2F5F9"
                    fw="500"
                    color="#828D9C"
                    disable={isPending || patchIsPending}
                  />
                  <CustomButton
                    value="Saqlash"
                    disable={isPending || patchIsPending}
                    loading={isPending || patchIsPending}
                    type="submit"
                  />
                </FlexWrapper>
              )}
            </Box>
          </ParentBox>
        </Form>
      )}
    </Formik>
  )
}

const ParentBox = styled.div`
  & .part {
    background-color: white;
    padding: 24px;
    border-radius: 10px;
    & .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 32px;
    }
  }
  & .first-part {
    margin-bottom: 24px;
    & .location-box {
      & .inputs-box {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 12px;
        margin-bottom: 20px;
      }
    }
  }
  & .second-part {
    & .title {
      font-size: 18px;
      font-weight: 700;
    }
  }
  & .label {
    font-size: 14px;
    font-weight: 600;
  }
  & .input-label {
    margin-bottom: 6px;
  }
  .employee {
    font-size: 16px;
    font-weight: 400;
    text-transform: capitalize;
  }
`
