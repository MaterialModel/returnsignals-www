/**
 * Member list with role management
 */

import { useState } from 'react'
import type { Member } from '@/api'
import type { OrgRole } from '@/types'
import { Button, LoadingSpinner, ErrorMessage, EmptyState } from '@/components/ui'
import { useAuth } from '@/hooks'

interface MemberListProps {
  members: Member[]
  isLoading: boolean
  error: Error | null
  onChangeRole: (userId: string, role: OrgRole) => Promise<Member>
  onRemove: (userId: string) => Promise<void>
  canManage: boolean
}

const roleLabels: Record<OrgRole, string> = {
  owner: 'Owner',
  admin: 'Admin',
  manager: 'Manager',
  viewer: 'Viewer',
}

const roleOptions: OrgRole[] = ['owner', 'admin', 'manager', 'viewer']

export function MemberList({
  members,
  isLoading,
  error,
  onChangeRole,
  onRemove,
  canManage,
}: MemberListProps) {
  const { user } = useAuth()
  const [changingRole, setChangingRole] = useState<string | null>(null)
  const [removing, setRemoving] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  const handleRoleChange = async (userId: string, newRole: OrgRole) => {
    setActionError(null)
    setChangingRole(userId)
    try {
      await onChangeRole(userId, newRole)
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to change role')
    } finally {
      setChangingRole(null)
    }
  }

  const handleRemove = async (userId: string) => {
    if (!confirm('Are you sure you want to remove this member?')) {
      return
    }

    setActionError(null)
    setRemoving(userId)
    try {
      await onRemove(userId)
    } catch (err) {
      setActionError(err instanceof Error ? err.message : 'Failed to remove member')
    } finally {
      setRemoving(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <ErrorMessage error={error} />
  }

  if (members.length === 0) {
    return <EmptyState title="No members" description="This organization has no members yet." />
  }

  return (
    <div className="space-y-4">
      {actionError && <ErrorMessage error={actionError} />}

      <div className="border border-border rounded-lg divide-y divide-border">
        {members.map((member) => {
          const displayName = member.first_name
            ? `${member.first_name} ${member.last_name || ''}`.trim()
            : member.email
          const isCurrentUser = member.user_id === user?.user_id
          const isOwner = member.role === 'owner'

          return (
            <div key={member.user_id} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full bg-surface-dark text-inverse flex items-center justify-center text-sm font-medium flex-shrink-0">
                  {(member.first_name?.[0] || member.email[0]).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-primary truncate">
                    {displayName}
                    {isCurrentUser && <span className="text-tertiary ml-1">(you)</span>}
                  </p>
                  <p className="text-xs text-secondary truncate">{member.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {canManage && !isCurrentUser && !isOwner ? (
                  <select
                    value={member.role}
                    onChange={(e) => handleRoleChange(member.user_id, e.target.value as OrgRole)}
                    disabled={changingRole === member.user_id}
                    className="text-sm border border-border rounded px-2 py-1 bg-surface-base text-primary focus:outline-none focus:ring-2 focus:ring-accent-primary"
                  >
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {roleLabels[role]}
                      </option>
                    ))}
                  </select>
                ) : (
                  <span className="text-sm text-secondary px-2 py-1">
                    {roleLabels[member.role]}
                  </span>
                )}

                {canManage && !isCurrentUser && !isOwner && (
                  <Button
                    variant="text"
                    size="sm"
                    onClick={() => handleRemove(member.user_id)}
                    disabled={removing === member.user_id}
                    className="text-accent-error hover:text-accent-error-text"
                  >
                    {removing === member.user_id ? 'Removing...' : 'Remove'}
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
