import Layout from '@pages/Layout'
import { Outlet, RouteObject } from 'react-router-dom'
import InstructionsResults from '@pages/Admin/Instructions/Results'
// import ProfileInfo from '@pages/Admin/Profile/Info'
import Stats from '@pages/Admin/Stats'
import RegionAdminInstructionsList from '@pages/RegionAdmin/Instructions/List'
import RegionAdminMosquesList from '@pages/RegionAdmin/Mosques/List'
import RegionAdminInstructionsAdd from '@pages/RegionAdmin/Instructions/Add'
import { NotFound } from '@pages/NotFound'
import Profile from '@pages/Admin/Profile/Profile'
import RegionAdminInstructionsView from '@pages/RegionAdmin/Instructions/View'
import AddMosque from '@pages/Admin/Mosques/Add'

export default function privateRegionRoutes(): RouteObject[] {
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
              element: <RegionAdminInstructionsList />,
            },
            {
              path: 'add',
              element: <RegionAdminInstructionsAdd />,
            },
            {
              path: 'list/:id/results',
              element: <InstructionsResults />,
            },
            {
              path: 'edit/:id',
              element: <RegionAdminInstructionsAdd />,
            },
            {
              path: 'view/:id',
              element: <RegionAdminInstructionsAdd />,
            },
            {
              path: 'result/:id',
              element: <RegionAdminInstructionsView />,
            },
          ],
        },
        { path: 'personal', element: <div>Test</div> },
        {
          path: 'mosques',
          element: <Outlet />,
          children: [
            { path: 'list', element: <RegionAdminMosquesList /> },
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
        { path: '*', element: <NotFound /> },
      ],
    },
  ]
}
