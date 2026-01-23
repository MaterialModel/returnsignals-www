/**
 * Organization members management page
 */

import { useParams, Navigate } from 'react-router-dom'
import { useMembers, useInvitations, useAuth } from '@/hooks'
import { SettingsNav, MemberList, InviteForm, InvitationList } from '@/components/settings'

export default function MembersPage() {
  const { orgId } = useParams<{ orgId: string }>()
  const { user } = useAuth()
  const {
    members,
    isLoading: membersLoading,
    error: membersError,
    changeRole,
    removeMember,
  } = useMembers(orgId)
  const { invitations, isLoading: invitationsLoading, invite } = useInvitations(orgId)

  // Check if user has admin+ role
  const membership = user?.memberships.find((m) => m.organization_id === orgId)
  const canManage = membership?.role === 'admin' || membership?.role === 'owner'

  if (!canManage && !membersLoading) {
    return <Navigate to={`/org/${orgId}/conversations`} replace />
  }

  const handleInvite = async (data: {
    email: string
    role?: 'owner' | 'admin' | 'manager' | 'viewer'
  }) => {
    await invite(data)
  }

  return (
    <div className="p-6">
      <SettingsNav />

      <div className="space-y-8 max-w-3xl">
        {/* Invite section */}
        <section>
          <h3 className="text-lg font-medium text-primary mb-4">Invite team members</h3>
          <InviteForm onInvite={handleInvite} />
        </section>

        {/* Pending invitations */}
        {!invitationsLoading && invitations.length > 0 && (
          <section>
            <h3 className="text-lg font-medium text-primary mb-4">
              Pending invitations ({invitations.length})
            </h3>
            <InvitationList invitations={invitations} />
          </section>
        )}

        {/* Current members */}
        <section>
          <h3 className="text-lg font-medium text-primary mb-4">Members ({members.length})</h3>
          <MemberList
            members={members}
            isLoading={membersLoading}
            error={membersError}
            onChangeRole={changeRole}
            onRemove={removeMember}
            canManage={canManage}
          />
        </section>
      </div>
    </div>
  )
}
