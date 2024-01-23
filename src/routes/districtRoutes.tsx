import Layout from '@pages/Layout'
import { Outlet, RouteObject } from 'react-router-dom'
import InstructionsResults from '@pages/Admin/Instructions/Results'
// import ProfileInfo from '@pages/Admin/Profile/Info'
import Stats from '@pages/Admin/Stats'
import DistrictAdminInstructionsList from '@pages/DistrictAdmin/Instructions/List'
import DistrictAdminMosquesList from '@pages/DistrictAdmin/Mosques/List'
import DistrictAdminInstructionsAdd from '@pages/DistrictAdmin/Instructions/Add'
import { NotFound } from '@pages/NotFound'
import Profile from '@pages/Admin/Profile/Profile'
import DistrictAdminInstructionsView from '@pages/DistrictAdmin/Instructions/View'
import AddMosque from '@pages/Admin/Mosques/Add'
import ActivitiesList from '@pages/Imam/Activities'
import CharityEventsList from '@pages/Imam/CharityEvents/List'
import CharityActionsList from '@pages/Imam/CharityActions/List'

export default function privateDistrictRoutes(): RouteObject[] {
  return [
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: 'stats', element: <Stats /> },
        {
          path: 'instructions',
          element: <Outlet />,
          children: [
            {
              path: 'list',
              element: <DistrictAdminInstructionsList />,
            },
            {
              path: 'add',
              element: <DistrictAdminInstructionsAdd />,
            },
            {
              path: 'list/:id/results',
              element: <InstructionsResults />,
            },
            {
              path: 'edit/:id',
              element: <DistrictAdminInstructionsAdd />,
            },
            {
              path: 'view/:id',
              element: <DistrictAdminInstructionsAdd />,
            },
            {
              path: 'result/:id',
              element: <DistrictAdminInstructionsView />,
            },
          ],
        },
        { path: 'personal', element: <div>Test</div> },
        {
          path: 'mosques',
          element: <Outlet />,
          children: [
            { path: 'list', element: <DistrictAdminMosquesList /> },
            { path: 'view/:id', element: <AddMosque /> },
          ],
        },
        { path: 'settings', element: <div>Test</div> },
        {
          path: 'profile',
          element: <Outlet />,
          children: [
            { path: '', element: <Profile /> },
            { path: 'edit', element: <Profile /> },
          ],
        },
        {
          path: 'imam-activities',
          element: <Outlet />,
          children: [
            // {
            //   path: 'prayers/list',
            //   element: <PrayersList customTypeQuery={1} />,
            // },
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
        { path: '*', element: <NotFound /> },
      ],
    },
  ]
}
