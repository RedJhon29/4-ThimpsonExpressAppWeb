import { createBrowserRouter } from 'react-router-dom'
import { SiteLayout } from './layouts/SiteLayout'
import { NotFound } from './NotFound'

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])