// import img from '@assets/images/backgrounds/login-backgroud.jpg'
import CustomButton from '@components/common/CustomButton'
import CustomTextField from '@components/common/CustomTextField'
import { FlexWrapper } from '@components/common/Flex'
import { MainContext, MainContextType } from '@contexts/MainProvider'
import LoginIcon from '@mui/icons-material/Login'
import { Stack } from '@mui/material'
import { Text } from '../styles/globalStyle'
import { useContext, useState } from 'react'
import { postRequest } from '@services/requests/CommonRequests'
import logo from '@assets/images/logo/Logo.svg'
import { homePageUrl } from '@utils/helper'
import img from '@assets/images/login.jpg'

const Login = () => {
  const {
    actions: { openSnackbar },
  } = useContext<MainContextType>(MainContext)
  const [form, setForm] = useState({ username: '', password: '' })
  const [checkErrors, setCheckErrors] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleInputChange(e: any) {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const { username, password } = form

    if (!username || !password) {
      setCheckErrors(true)
      return
    }

    setLoading(true)

    try {
      const res = await postRequest('auth/login/', form, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (+res?.status === 200) {
        openSnackbar({ message: 'Muvaffaqiyatli login qildingiz.', status: 'success' })
        localStorage.setItem('dOToken', res?.data?.access)
        localStorage.setItem('dORefreshToken', res?.data?.refresh)
        const { first_name, last_name, username, role, id } = res.data
        localStorage.setItem('user', JSON.stringify({ first_name, last_name, username, role, id }))
        window.location.assign(homePageUrl)
      } else {
        handleErrorResponse(res)
      }
    } catch (error) {
      handleErrorResponse(error?.response)
    }
    setLoading(false)
  }

  function handleErrorResponse(response) {
    const status = response?.status

    if (status === 401) {
      openSnackbar({ message: 'Login yoki parol xato.', status: 'error' })
    } else {
      openSnackbar({ message: 'Xatolik', status: 'error' })
    }
  }

  return (
    <FlexWrapper height="100vh">
      {/* <FlexWrapper bgcolor="#F3F4F4" justifyContent={'center'}> */}
      <img src={img} alt="" style={{ objectFit: 'fill', height: '100%', width: '65%' }} />
      {/* </FlexWrapper> */}

      <FlexWrapper justifyContent="center" width={'35%'} padding={'0 30px'}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack gap="20px">
            <FlexWrapper gap="10px" justifyContent="center">
              <img src={logo} alt="" style={{ width: '70%' }} />
              {/* <Text fs="28px" fw="700" c="var(--primary)">
                Raqamli idora
              </Text> */}
            </FlexWrapper>
            <CustomTextField
              height="38px"
              label="Login"
              placeholder="Username kiriting"
              name="username"
              fullWidth
              value={form?.username || ''}
              customHandleChange={handleInputChange}
              error={checkErrors && !form?.username}
              labelFontSize="14px"
              gap="4px"
              disabled={loading}
            />
            <CustomTextField
              gap="4px"
              height="38px"
              label="Parol"
              placeholder="Parolni kiriting"
              name="password"
              type="password"
              fullWidth
              value={form?.password || ''}
              customHandleChange={handleInputChange}
              sx={{ mb: '5px' }}
              error={checkErrors && !form?.password}
              labelFontSize="14px"
              disabled={loading}
            />

            <CustomButton
              value={
                <FlexWrapper gap="10px">
                  <LoginIcon />
                  <Text fs="15px" fw="500" c="#fff">
                    Kirish
                  </Text>
                </FlexWrapper>
              }
              bgColor="var(--primary)"
              width="100%"
              height="38px"
              disable={loading}
              loading={loading}
            />
          </Stack>
        </form>
      </FlexWrapper>
    </FlexWrapper>
  )
}

export default Login
