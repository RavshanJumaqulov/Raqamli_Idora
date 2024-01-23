import { ReactNode, createContext, useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useMainContext } from './MainProvider'

const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate()

  const { pathname, search } = useLocation()
const {actions: {
  getUser
}} = useMainContext()

  const isUserExists = useCallback(() => {
    const user = getUser()
    if (!user) navigate('/login')

    if (!user?.role) navigate('/login')

    if (!['1', '2', '3', '4', '5']?.includes(user?.role)) navigate('/login')
  }, [navigate])

  useEffect(() => {
    isUserExists()
  }, [pathname, search])
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
}
