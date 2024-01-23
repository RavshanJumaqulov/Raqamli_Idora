import AddEditEmployee from '@pages/Admin/Employees/pages/Add'
import AddEditAccount from '@pages/Admin/Employees/pages/AddAccount'
import EmployeeList from '@pages/Admin/Employees/pages/List'
import ViewEmployee from '@pages/Admin/Employees/pages/View'
import AddInstruction from '@pages/Admin/Instructions/Add'
import InstructionsList from '@pages/Admin/Instructions/List'
import InstructionsResults from '@pages/Admin/Instructions/Results'
import AddMosque from '@pages/Admin/Mosques/Add'
import MosquesList from '@pages/Admin/Mosques/List'
import PublicPrayersList from '@pages/Admin/Prayers/List'
// import ProfileInfo from '@pages/Admin/Profile/Info'
import Profile from '@pages/Admin/Profile/Profile'
import Stats from '@pages/Admin/Stats'
import AddThesis from '@pages/Admin/Thesis/Add'
import ThesisList from '@pages/Admin/Thesis/List'
import ThesisResults from '@pages/Admin/Thesis/Results'
import ActivitiesList from '@pages/Imam/Activities'
import CharityActionsList from '@pages/Imam/CharityActions/List'
import CharityEventsList from '@pages/Imam/CharityEvents/List'
import Layout from '@pages/Layout'
import { NotFound } from '@pages/NotFound'
import { Outlet, RouteObject } from 'react-router-dom'

export default function privateAdminRoutes(): RouteObject[] {
  return [
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: 'stats', element: <Stats /> },
        {
          path: 'friday-thesis',

          element: <Outlet />,
          children: [
            {
              path: 'list',
              element: <ThesisList />,
            },
            {
              path: 'add',
              element: <AddThesis />,
            },
            {
              path: 'edit/:id',
              element: <AddThesis />,
            },
            {
              path: 'view/:id',
              element: <AddThesis />,
            },
            {
              path: 'list/:id/results',
              element: <ThesisResults />,
            },
          ],
        },
        {
          path: 'instructions',
          element: <Outlet />,
          children: [
            {
              path: 'list',
              element: <InstructionsList />,
            },
            {
              path: 'add',
              element: <AddInstruction />,
            },
            {
              path: 'list/:id/results',
              element: <InstructionsResults />,
            },
            {
              path: 'edit/:id',
              element: <AddInstruction />,
            },
            {
              path: 'view/:id',
              element: <AddInstruction />,
            },
          ],
        },
        {
          path: 'employee',
          element: <Outlet />,
          children: [
            {
              path: 'list',
              element: <EmployeeList />,
            },
            {
              path: 'add',
              element: <AddEditEmployee />,
            },
            {
              path: 'add-account',
              element: <AddEditAccount />,
            },
            {
              path: 'edit-account/:id',
              element: <AddEditAccount />,
            },
            {
              path: 'edit/:id',
              element: <AddEditEmployee />,
            },
            {
              path: 'view/:id',
              element: <ViewEmployee />,
            },
          ],
        },
        { path: 'personal', element: <div>Test</div> },
        {
          path: 'mosques',
          element: <Outlet />,
          children: [
            { path: 'list', element: <MosquesList /> },
            { path: 'add', element: <AddMosque /> },
            {
              path: 'edit/:id',
              element: <AddMosque />,
            },
            {
              path: 'view/:id',
              element: <AddMosque />,
            },
          ],
        },
        { path: 'settings', element: <div style={{ fontSize: '20px' }}>Sozlamalar</div> },
        {
          path: 'imam-activities',
          element: <Outlet />,
          children: [
            {
              path: 'prayers/list',
              element: <PublicPrayersList />,
            },
            {
              path: 'activities/list',
              element: <ActivitiesList />,
            },
            {
              path: 'charity/list',
              element: <CharityEventsList />,
            },
            {
              path: 'charity-actions/list',
              element: <CharityActionsList />,
            },
          ],
        },
        {
          path: 'profile',
          element: <Outlet />,
          children: [
            { path: '', element: <Profile /> },
            { path: 'edit', element: <Profile /> },
          ],
        },
        { path: '*', element: <NotFound /> },
      ],
    },
  ]
}
