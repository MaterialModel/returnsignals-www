/**
 * Main application component with routing
 */

import { Routes, Route, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/components/auth'
import { AppLayout } from '@/components/layout'

// Route pages
import Home from '@/routes/Home'
import LoginPage from '@/routes/Login'
import RegisterPage from '@/routes/Register'
import VerifyEmailPage from '@/routes/VerifyEmail'
import ConversationsPage from '@/routes/org/ConversationsPage'
import ConversationDetailPage from '@/routes/org/ConversationDetailPage'
import ConversationEmptyState from '@/routes/org/ConversationEmptyState'
import SettingsPage from '@/routes/org/SettingsPage'
import MembersPage from '@/routes/org/MembersPage'

// Analytics pages
import AnalyticsPage from '@/routes/org/AnalyticsPage'
import AnalyticsOverview from '@/routes/org/AnalyticsOverview'
import AnalyticsInterventions from '@/routes/org/AnalyticsInterventions'
import AnalyticsProducts from '@/routes/org/AnalyticsProducts'
import AnalyticsProductDetail from '@/routes/org/AnalyticsProductDetail'
import AnalyticsConfiguration from '@/routes/org/AnalyticsConfiguration'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        {/* Root redirect */}
        <Route path="/" element={<Home />} />

        {/* Organization-scoped routes */}
        <Route path="/org/:orgId" element={<AppLayout />}>
          {/* Redirect /org/:orgId to /org/:orgId/conversations */}
          <Route index element={<Navigate to="conversations" replace />} />

          {/* Conversations with nested detail route */}
          <Route path="conversations" element={<ConversationsPage />}>
            <Route index element={<ConversationEmptyState />} />
            <Route path=":convId" element={<ConversationDetailPage />} />
          </Route>

          {/* Settings (admin+ only) */}
          <Route path="settings" element={<SettingsPage />} />
          <Route path="settings/members" element={<MembersPage />} />

          {/* Analytics */}
          <Route path="analytics" element={<AnalyticsPage />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<AnalyticsOverview />} />
            <Route path="interventions" element={<AnalyticsInterventions />} />
            <Route path="products" element={<AnalyticsProducts />} />
            <Route path="products/:productId" element={<AnalyticsProductDetail />} />
            <Route path="configuration" element={<AnalyticsConfiguration />} />
          </Route>
        </Route>
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
