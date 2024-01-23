import Layout from '@pages/Layout'
import { Outlet, RouteObject } from 'react-router-dom'
import InstructionList from '@pages/Imam/Instructions/List'
import PrayersList from '@pages/Imam/Prayers/List'
import PrayersListDetail from '@pages/Imam/PrayersListDetail/Index'
import ActivitiesList from '@pages/Imam/Activities'
import CharityEventsList from '@pages/Imam/CharityEvents/List'
import CharityActionsList from '@pages/Imam/CharityActions/List'
import InstructionDetail from '@pages/Imam/InstructionDetail/Index'
// import ProfileInfo from '@pages/Admin/Profile/Info'
import Profile from '@pages/Admin/Profile/Profile'
import { NotFound } from '@pages/NotFound'
import { AddActivities } from '@pages/Imam/Activities/Add'
import PromotionsNeighborhoodList from '@pages/Imam/Promotions/Neighborhood/List'
import PromotionsNeighborhoodAdd from '@pages/Imam/Promotions/Neighborhood/Add'

export default function privateImamRoutes(): RouteObject[] {
  return [
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: 'stats', element: '' },
        {
          path: 'prayers',
          element: <Outlet />,
          children: [
            {
              path: 'list',
              element: <PrayersList />,
            },
            {
              path: 'view/:id',
              element: <PrayersListDetail />,
            },
          ],
        },
        {
          path: 'instructions',
          element: <Outlet />,
          children: [
            {
              path: 'list',
              element: <InstructionList />,
            },
            {
              path: 'view/:id',
              element: <InstructionDetail />,
            },
          ],
        },
        {
          path: 'activities',
          element: <Outlet />,
          children: [
            {
              path: 'list',
              element: <ActivitiesList />,
            },
            {
              path: 'add',
              element: <AddActivities />,
            },
            {
              path: 'edit/:id',
              element: <AddActivities />,
            },
            {
              path: 'view/:id',
              element: <AddActivities />,
            },
            // {
            //   path: 'view/:id',
            //   element: <PrayersListDetail />,
            // },
          ],
        },
        {
          path: 'promotions',
          element: <Outlet />,
          children: [
            {
              path: 'neighborhood',
              element: <Outlet />,
              children: [
                {
                  path: 'list',
                  element: <PromotionsNeighborhoodList />,
                },
                {
                  path: 'add',
                  element: <PromotionsNeighborhoodAdd />,
                },
                {
                  path: 'edit/:id',
                  element: <PromotionsNeighborhoodAdd />,
                },
                {
                  path: 'view/:id',
                  element: <PromotionsNeighborhoodAdd />,
                },
              ],
            },
          ],
        },
        // {
        //   path: 'employee',
        //   element: <EmployeePages />,
        //   children: [
        //     {
        //       path: 'list',
        //       element: <ListEmployee />,
        //     },
        //     // {
        //     //   path: 'add',
        //     //   element: <AddInstruction />,
        //     // },
        //   ],
        // },
        { path: 'personal', element: <div>Test</div> },
        {
          path: 'charity-events',
          element: <CharityEventsList />,
        },
        {
          path: 'charity-actions',
          element: <CharityActionsList />,
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
