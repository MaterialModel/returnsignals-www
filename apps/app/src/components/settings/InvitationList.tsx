/**
 * List of pending invitations
 */

import type { Invitation } from '@/api'
import { formatDateTime } from '@/utils/formatters'

interface InvitationListProps {
  invitations: Invitation[]
}

const roleLabels = {
  owner: 'Owner',
  admin: 'Admin',
  manager: 'Manager',
  viewer: 'Viewer',
}

export function InvitationList({ invitations }: InvitationListProps) {
  if (invitations.length === 0) {
    return <p className="text-sm text-secondary py-4">No pending invitations.</p>
  }

  return (
    <div className="border border-border rounded-lg divide-y divide-border">
      {invitations.map((invitation) => (
        <div key={invitation.invitation_id} className="flex items-center justify-between p-4">
          <div>
            <p className="text-sm font-medium text-primary">{invitation.email}</p>
            <p className="text-xs text-secondary">
              Invited as {roleLabels[invitation.role]} • Expires{' '}
              {formatDateTime(invitation.expires_at)}
            </p>
          </div>
          <span className="text-xs text-tertiary bg-surface-subtle px-2 py-1 rounded">Pending</span>
        </div>
      ))}
    </div>
  )
}
