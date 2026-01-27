/**
 * Main application layout with navbar and sidebar
 */

import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-vh-fix bg-surface-base flex flex-col overflow-hidden">
      <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} showMenuButton />

      <div className="flex flex-1 min-h-0">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main className="flex-1 min-w-0 min-h-0 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
