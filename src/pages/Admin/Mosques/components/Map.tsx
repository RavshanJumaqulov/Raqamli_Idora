import { useState, useEffect } from 'react'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { ErrorMessage, Field, FieldProps, useFormikContext } from 'formik'
import { styled } from 'styled-components'
const mapKey = import.meta.env.VITE_MAP_KEY

const Map = ({ disabled }) => {
  const { values } = useFormikContext<any>()
  const [currentLocation, setCurrentLocation] = useState(null)
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: mapKey,
  })

  useEffect(() => {
    // Fetch the user's current location using the Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        setCurrentLocation({ lat: latitude, lng: longitude })
      },
      (error) => {
        // console.error('Error getting current location:', error)
      }
    )
  }, [])

  const validate = () => {
    let err
    if (!values.lat || !values.long) {
      err = 'Lokatsiyani tanlash majburiy'
    }
    return err
  }

  return isLoaded ? (
    <>
      <Field name="location" validate={validate}>
        {({ form }: FieldProps) => (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={
              (form.values.lat &&
                form.values.long && { lat: +form.values.lat, lng: +form.values.long }) ||
              currentLocation || { lat: 41.31, lng: 69.28 }
            }
            zoom={13}
            onClick={
              !disabled
                ? (e) => {
                    const { latLng } = e
                    const lat = latLng.lat()
                    const lng = latLng.lng()
                    form.setFieldValue('lat', lat)
                    form.setFieldValue('long', lng)
                  }
                : undefined
            }
          >
            {form.values.lat && form.values.long && (
              <Marker position={{ lat: +form.values?.lat, lng: +form.values?.long }} />
            )}
          </GoogleMap>
        )}
      </Field>
      <ErrorMessage name="location" component={StyledError} />
    </>
  ) : (
    <></>
  )
}

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '8px',
}

const StyledError = styled.p`
  color: #e60019;
  font-size: 14px;
  font-weight: 500;
  margin-top: 4px;
`

export default Map
