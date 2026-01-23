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
import ConversationsPage from '@/routes/org/ConversationsPage'
import ConversationDetailPage from '@/routes/org/ConversationDetailPage'
import ConversationEmptyState from '@/routes/org/ConversationEmptyState'
import SettingsPage from '@/routes/org/SettingsPage'
import MembersPage from '@/routes/org/MembersPage'

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

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
        </Route>
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
