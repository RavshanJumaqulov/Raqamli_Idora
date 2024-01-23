import { Box, Divider, Drawer, MenuItem, Stack } from '@mui/material'
import { FlexBetween, FlexWrapper } from '../../Flex'
import CustomTextField from '../../CustomTextField'
import AsyncAutocomplete from '../../AsyncAutocomplete'
import { getRequest } from '@services/requests/CommonRequests'
import { useContext } from 'react'
import { filterLayoutT, filterNameTypes } from '@src/types/table'
import { FilterContext, FilterContextType } from '@contexts/FilterContext'
import { filters } from './data'
import Wrapper from './Wrapper'
import { Text } from '@styles/globalStyle'
import DatePicker from '@components/common/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { getDayJsDay } from '@utils/helper'
import { personT } from '@src/types'
import CustomButton from '@components/common/CustomButton'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'

type T = {
  filter: filterNameTypes
  rowHeader?: boolean
  isOpenFilter: boolean
  toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void
}

export const Filters: React.FC<T> = ({ filter, rowHeader, isOpenFilter, toggleDrawer }) => {
  const { filterData, setFilterData, emptyFilterData } =
    useContext<FilterContextType>(FilterContext)

  const customFiltersData = filters[filter] as filterLayoutT

  const customData = filterData[filter]

  const changeFilter = (name: string, value, double?: object, activeKey?: string) => {
    if (double)
      setFilterData({
        ...filterData,
        [filter]: { ...customData, [name]: { ...double, [activeKey]: value } },
      })
    else setFilterData({ ...filterData, [filter]: { ...customData, [name]: value } })
  }

  const changeDateFilter = (
    value: Dayjs | null,
    keyPicker: string,
    double?: object,
    activeKey?: string
  ) => {
    if (double)
      setFilterData({
        ...filterData,
        [filter]: { ...customData, [keyPicker]: { ...double, [activeKey]: getDayJsDay(value) } },
      })
    else
      setFilterData({ ...filterData, [filter]: { ...customData, [keyPicker]: getDayJsDay(value) } })
  }


  return (
    <>
      <Drawer anchor="right" open={isOpenFilter} onClose={toggleDrawer(false)}>
        <Stack width="400px" p="44px" gap="50px">
          <Text fs="24px" c="#212B36">
            Filterlar
          </Text>
          <Stack gap="16px" width="100%">
            {customFiltersData.filters?.map((filter) => {
              if (filter?.double)
                return (
                  <Stack key={filter.name}>
                    <Text fs="12px" c="var(--primary)">
                      {filter.label}
                    </Text>

                    <Stack gap="15px">
                      {filter?.date ? (
                        <>
                          <DatePicker
                            keyPicker={filter.name}
                            value={
                              customData[filter.name]['from']
                                ? dayjs(new Date(customData[filter.name]['from']))
                                : null
                            }
                            onChangePicker={(value: Dayjs | null, keyPicker: string) =>
                              changeDateFilter(value, keyPicker, customData[filter.name], 'from')
                            }
                          />

                          {/* <Text fs="20px" c="var(--primary)">
                            -
                          </Text> */}
                          <DatePicker
                            keyPicker={filter.name}
                            value={
                              customData[filter.name]['to']
                                ? dayjs(new Date(customData[filter.name]['to']))
                                : null
                            }
                            onChangePicker={(value: Dayjs | null, keyPicker: string) =>
                              changeDateFilter(value, keyPicker, customData[filter.name], 'to')
                            }
                          />
                        </>
                      ) : filter?.time ? (
                        <>
                          <CustomTextField
                            height="38px"
                            width={filter.width}
                            type="time"
                            value={customData[filter.name]['from']}
                            onChange={(e) =>
                              changeFilter(
                                filter.name,
                                e.target.value,
                                customData[filter.name],
                                'from'
                              )
                            }
                          />
                          <Text fs="20px" c="var(--primary)">
                            -
                          </Text>
                          <CustomTextField
                            height="38px"
                            width={filter.width}
                            type="time"
                            value={customData[filter.name]['to']}
                            onChange={(e) =>
                              changeFilter(
                                filter.name,
                                e.target.value,
                                customData[filter.name],
                                'to'
                              )
                            }
                          />
                        </>
                      ) : (
                        <>
                          <CustomTextField
                            name={'from'}
                            value={customData[filter.name]['from']}
                            customHandleChange={(e) =>
                              changeFilter(
                                filter.name,
                                e.target.value,
                                customData[filter.name],
                                'from'
                              )
                            }
                            height={filter.height}
                            type={filter.number ? 'number' : 'text'}
                            fullWidth
                          />
                          {/* <Text fs="20px" c="var(--primary)">
                            -
                          </Text> */}
                          <CustomTextField
                            name="to"
                            value={customData[filter.name]['to']}
                            customHandleChange={(e) =>
                              changeFilter(
                                filter.name,
                                e.target.value,
                                customData[filter.name],
                                'to'
                              )
                            }
                            height={filter.height}
                            type={filter.number ? 'number' : 'text'}
                            fullWidth
                          />
                        </>
                      )}
                    </Stack>
                  </Stack>
                )
              else if (filter?.year)
                return (
                  <DatePicker
                    label={filter.label}
                    key={filter.name}
                    keyPicker={filter.name}
                    value={
                      customData[filter.name] ? dayjs(new Date(customData[filter.name])) : null
                    }
                    onChangePicker={(value: Dayjs | null, keyPicker: string) =>
                      changeFilter(filter.name, getDayJsDay(value))
                    }
                    mb="1px"
                    views={['year']}
                  />
                )
              else
                return filter?.url ? (
                  <AsyncAutocomplete
                    key={filter.name}
                    fullWidth
                    label={filter.label}
                    value={customData[filter.name] ? customData[filter.name] : null}
                    getOptionLabel={(option) =>
                      filter?.isPerson
                        ? `${(option as personT)?.name} ${(option as personT)?.last_name}`
                        : option?.[filter.optionName]
                    }
                    onChange={(_, value) => changeFilter(filter.name, value)}
                    queryFn={async (props) =>
                      filter?.noPagination
                        ? await getRequest(filter?.url || '', {
                          params: { ...props, limit: 14 },
                        })
                        : (
                          await getRequest(filter?.url || '', {
                            params: { ...props, limit: 14 },
                          })
                        )?.results
                    }
                  />
                ) : (
                  <CustomTextField
                    label={filter.label}
                    name={filter.name}
                    value={customData[filter.name] ? customData[filter.name] : '0'}
                    onChange={(e) => changeFilter(filter.name, e.target.value)}
                    select
                    height={filter.height}
                    key={filter.name}
                    disabled={!filter?.notDisabled && (filter.name === 'district' && !customData?.region)}
                    fullWidth
                  >
                    <MenuItem value="0">
                      <Text>Tanlang</Text>
                    </MenuItem>

                    {(filter.name === 'district'
                      ? customData?.region?.district?.map((item) => ({
                        id: item?.id,
                        label: item?.name,
                      }))
                      : filter?.options
                    )?.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>
                )
            })}
          </Stack>

          <FlexBetween gap="10px">
            <CustomButton
              onClick={toggleDrawer(false)}
              value={'Yopish'}
              bgColor="var(--Greyscale-50, #FAFAFA)"
              color="var(--textColor)"
              padding="10px 16px"
              fs="14px"
              fw="600"
              width="150px"
            />
            <CustomButton
              onClick={emptyFilterData}
              value={'Tozalash'}
              bgColor="#1E1E1E"
              color="#fff"
              padding="10px 16px"
              fs="14px"
              fw="600"
              width="150px"
            />
          </FlexBetween>
        </Stack>
      </Drawer>
      <Stack width="100%">
        <Wrapper rowHeader={rowHeader}>
          <>
            {/* <Text fs="15px" fw="500">
            Filterlar
          </Text> */}
            <FlexWrapper columnGap="20px" rowGap="10px" width="100%" flexWrap="wrap">
              {customFiltersData.filters?.slice(0, customFiltersData.defaultCount).map((filter) => {
                if (filter?.double)
                  return (
                    <Stack key={filter.name}>
                      <Text fs="12px" c="var(--primary)" fw="500">
                        {filter.label}
                      </Text>

                      <FlexWrapper gap="10px">
                        {filter?.date ? (
                          <>
                            <DatePicker
                              keyPicker={filter.name}
                              value={
                                customData[filter.name]['from']
                                  ? dayjs(new Date(customData[filter.name]['from']))
                                  : null
                              }
                              onChangePicker={(value: Dayjs | null, keyPicker: string) =>
                                changeDateFilter(value, keyPicker, customData[filter.name], 'from')
                              }
                            />
                            <Text fs="20px" c="var(--primary)">
                              -
                            </Text>
                            <DatePicker
                              keyPicker={filter.name}
                              value={
                                customData[filter.name]['to']
                                  ? dayjs(new Date(customData[filter.name]['to']))
                                  : null
                              }
                              onChangePicker={(value: Dayjs | null, keyPicker: string) =>
                                changeDateFilter(value, keyPicker, customData[filter.name], 'to')
                              }
                            />
                          </>
                        ) : filter?.time ? (
                          <>
                            <>
                              <CustomTextField
                                height="38px"
                                width={filter.width}
                                type="time"
                                value={customData[filter.name]['from']}
                                onChange={(e) =>
                                  changeFilter(
                                    filter.name,
                                    e.target.value,
                                    customData[filter.name],
                                    'from'
                                  )
                                }
                              />
                              <Text fs="20px" c="var(--primary)">
                                -
                              </Text>
                              <CustomTextField
                                height="38px"
                                width={filter.width}
                                type="time"
                                value={customData[filter.name]['to']}
                                onChange={(e) =>
                                  changeFilter(
                                    filter.name,
                                    e.target.value,
                                    customData[filter.name],
                                    'to'
                                  )
                                }
                              />
                            </>
                          </>
                        ) : (
                          <>
                            <CustomTextField
                              name="from"
                              value={customData[filter.name]['from']}
                              onChange={(e) =>
                                changeFilter(
                                  filter.name,
                                  e.target.value,
                                  customData[filter.name],
                                  'from'
                                )
                              }
                              width={filter.width}
                              height={filter.height}
                              type={filter.number ? 'number' : 'text'}
                            />
                            <Text fs="20px" c="var(--primary)">
                              -
                            </Text>
                            <CustomTextField
                              name="to"
                              value={customData[filter.name]['to']}
                              onChange={(e) =>
                                changeFilter(
                                  filter.name,
                                  e.target.value,
                                  customData[filter.name],
                                  'to'
                                )
                              }
                              width={filter.width}
                              height={filter.height}
                              type={filter.number ? 'number' : 'text'}
                            />
                          </>
                        )}
                      </FlexWrapper>
                    </Stack>
                  )
                else if (filter?.year)
                  return (
                    <DatePicker
                      label={filter.label}
                      key={filter.name}
                      keyPicker={filter.name}
                      value={
                        customData[filter.name] ? dayjs(new Date(customData[filter.name])) : null
                      }
                      onChangePicker={(value: Dayjs | null, keyPicker: string) =>
                        // changeDateFilter(value, keyPicker, customData[filter.name], 'from')
                        changeFilter(filter.name, getDayJsDay(value))
                      }
                      mb="1px"
                      views={['year']}
                    />
                  )
                else
                  return filter?.url ? (
                    <AsyncAutocomplete
                      key={filter.name}
                      width={filter.width}
                      label={filter.label}
                      value={customData[filter.name] ? customData[filter.name] : null}
                      getOptionLabel={(option) =>
                        filter?.isPerson
                          ? `${(option as personT)?.name} ${(option as personT)?.last_name}`
                          : option?.[filter.optionName]
                      }
                      onChange={(_, value) => changeFilter(filter.name, value)}
                      queryFn={async (props) =>
                        (
                          await getRequest(filter?.url || '', {
                            params: { ...props, limit: 14 },
                          })
                        )?.results
                      }
                    />
                  ) : (
                    <div style={{ width: filter.width }} key={filter.name}>
                      <CustomTextField
                        label={filter.label}
                        name={filter.name}
                        value={customData[filter.name] ? customData[filter.name] : '0'}
                        onChange={(e) => changeFilter(filter.name, e.target.value)}
                        select
                        width={filter.width}
                        sx={{ width: filter.width }}
                        height={filter.height}
                        key={filter.name}
                        disabled={filter.name === 'district' && !customData?.region}
                      >
                        <MenuItem value="0">
                          <Text>Tanlang</Text>
                        </MenuItem>

                        {(filter.name === 'district'
                          ? customData?.region?.district?.map((item) => ({
                            id: item?.id,
                            label: item?.name,
                          }))
                          : filter?.options
                        )?.map((item) => (
                          <MenuItem key={item.id} value={item.id}>
                            {item.label}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    </div>
                  )
              })}
              <Box mt="auto" mb="3px">
                <CustomButton
                  value={<HighlightOffIcon sx={{ color: 'rgb(107, 107, 107)' }} fontSize="large" />}
                  height="30px"
                  bgColor="transparent"
                  padding="5px 10px"
                  onClick={emptyFilterData}
                />
              </Box>
            </FlexWrapper>
          </>
        </Wrapper>
        <Divider
          sx={{ bgcolor: '#d4d8dd', margin: '0 -22px', marginBottom: '20px', marginTop: '20px' }}
        />
      </Stack>
    </>
  )
}
