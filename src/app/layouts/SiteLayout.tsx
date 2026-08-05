import { Outlet } from 'react-router-dom'
import { Header } from '@/components/features/Header'
import { Footer } from '@/components/features/Footer'
import { BackToTop } from '@/components/features/BackToTop'
import { ChatLauncher } from '@/components/features/ChatLauncher'
import { WhatsAppFab } from '@/components/features/WhatsAppFab'

export function SiteLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTop />
      <ChatLauncher />
      <WhatsAppFab />
    </div>
  )
}