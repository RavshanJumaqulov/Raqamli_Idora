import { Navigate, RouteObject } from 'react-router-dom'
import Login from '@pages/Login'
import { NotFound } from '@pages/NotFound'

export default function publicRoutes(): RouteObject[] {
  return [
    { path: '/login', element: <Login /> },
    { path: '*', element:  <NotFound url='/login' /> },
  ]
}
