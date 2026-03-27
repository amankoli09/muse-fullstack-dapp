import React, { Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { NotificationProvider } from '@/contexts/NotificationContext'
import { ToastNotifications } from '@/components/Notifications/ToastNotifications'
import { Navigation } from '@/components/composite/Navigation'

// Dynamically import pages (Handling named exports)
const HomePage = React.lazy(() => import('@/pages/HomePage').then(module => ({ default: module.HomePage })))
const ExplorePage = React.lazy(() => import('@/pages/ExplorePage').then(module => ({ default: module.ExplorePage })))
const MintPage = React.lazy(() => import('@/pages/MintPage').then(module => ({ default: module.MintPage })))
const ProfilePage = React.lazy(() => import('@/pages/ProfilePage').then(module => ({ default: module.ProfilePage })))
const UserSettingsPage = React.lazy(() => import('@/pages/UserSettingsPage').then(module => ({ default: module.UserSettingsPage })))

// Loading fallback component
const PageLoader = () => (
    <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>
)

function App() {
    return (
        <NotificationProvider>
            <Router>
                <div className="min-h-screen bg-gray-50">
                    <Navigation />
                    <main>
                        {/* Wrap Routes in Suspense to handle the lazy loading states */}
                        <Suspense fallback={<PageLoader />}>
                            <Routes>
                                <Route path="/" element={<HomePage />} />
                                <Route path="/explore" element={<ExplorePage />} />
                                <Route path="/mint" element={<MintPage />} />
                                <Route path="/profile" element={<ProfilePage />} />
                                <Route path="/settings" element={<UserSettingsPage />} />
                            </Routes>
                        </Suspense>
                    </main>
                    <ToastNotifications />
                </div>
            </Router>
        </NotificationProvider>
    )
}

export default App