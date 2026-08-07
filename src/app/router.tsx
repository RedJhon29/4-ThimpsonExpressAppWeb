import { createBrowserRouter } from 'react-router-dom'
import { SiteLayout } from './layouts/SiteLayout'
import { NotFound } from './NotFound'
import { HomePage } from '@/features/home/HomePage'
import { ServicesPage } from '@/features/services/ServicesPage'
import { ServiceDetailPage } from '@/features/services/ServiceDetailPage'
import { MarketplacePage } from '@/features/marketplace/MarketplacePage'
import { BusinessPage } from '@/features/marketplace/BusinessPage'
import { BusinessRegisterPage } from '@/features/marketplace/BusinessRegisterPage'
import { SubscribePage } from '@/features/auth/SubscribePage'
import { LoginPage } from '@/features/auth/LoginPage'
import { RecoverPage } from '@/features/auth/RecoverPage'
import { AboutPage } from '@/features/about/AboutPage'
import { GalleryPage } from '@/features/gallery/GalleryPage'
import { ContactPage } from '@/features/contact/ContactPage'
import { SubscriptionPlansPage } from '@/features/subscriptions/SubscriptionPlansPage'
import { CheckoutPage } from '@/features/subscriptions/CheckoutPage'
import { BillingPage } from '@/features/subscriptions/BillingPage'
import { TrackOrderPage } from '@/features/tracking/TrackOrderPage'

export const router = createBrowserRouter([
  {
    element: <SiteLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/servicios', element: <ServicesPage /> },
      { path: '/servicios/:slug', element: <ServiceDetailPage /> },
      { path: '/marketplace', element: <MarketplacePage /> },
      { path: '/marketplace/:slug', element: <BusinessPage /> },
      { path: '/marketplace/registro', element: <BusinessRegisterPage /> },
      { path: '/suscribir', element: <SubscribePage /> },
      { path: '/planes', element: <SubscriptionPlansPage /> },
      { path: '/planes/checkout/:planId', element: <CheckoutPage /> },
      { path: '/cuenta/facturacion', element: <BillingPage /> },
      { path: '/rastrear', element: <TrackOrderPage /> },
      { path: '/rastrear/:orderId', element: <TrackOrderPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/recuperar', element: <RecoverPage /> },
      { path: '/nosotros', element: <AboutPage /> },
      { path: '/galeria', element: <GalleryPage /> },
      { path: '/contacto', element: <ContactPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])