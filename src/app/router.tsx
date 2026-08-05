import { createBrowserRouter } from 'react-router-dom'
import { SiteLayout } from './layouts/SiteLayout'
import { NotFound } from './NotFound'
import { HomePage } from '@/features/home/HomePage'

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])