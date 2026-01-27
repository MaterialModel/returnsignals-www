/**
 * Analytics Configuration tab - AI settings and integrations
 */

import { useParams } from 'react-router-dom'
import { useAuth, useAISettings } from '@/hooks'
import { LoadingSpinner, ErrorMessage, ChatIcon } from '@/components/ui'
import { AISettingsForm } from '@/components/analytics'

export default function AnalyticsConfiguration() {
  const { orgId } = useParams<{ orgId: string }>()
  const { user } = useAuth()
  const { settings, isLoading, error, isSaving, updateSettings } = useAISettings(orgId)

  // Check permissions
  const membership = user?.memberships.find((m) => m.organization_id === orgId)
  const canEditSettings =
    membership?.role === 'manager' || membership?.role === 'admin' || membership?.role === 'owner'

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4">
        <ErrorMessage message={error.message} />
      </div>
    )
  }

  const handleSave = async (updates: Parameters<typeof updateSettings>[0]) => {
    try {
      await updateSettings(updates)
    } catch {
      // Error is handled by the hook
    }
  }

  return (
    <div className="p-4 space-y-6">
      {/* AI Settings */}
      <div className="bg-surface-base border border-border rounded-lg p-6">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-primary">AI Behavior Settings</h2>
          <p className="text-sm text-secondary mt-1">
            Configure how the AI assistant communicates with customers
          </p>
        </div>
        <AISettingsForm
          settings={settings}
          isSaving={isSaving}
          onSave={handleSave}
          canEdit={canEditSettings}
        />
      </div>

      {/* Preview section */}
      <div className="bg-surface-base border border-border rounded-lg p-6">
        <h2 className="text-lg font-medium text-primary mb-4">Response Preview</h2>
        <div className="bg-surface-subtle rounded-lg p-4">
          <div className="space-y-3">
            {/* Sample AI response */}
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-accent-primary/10 flex items-center justify-center flex-shrink-0">
                <ChatIcon className="w-4 h-4 text-accent-primary" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-secondary mb-1">AI Assistant</div>
                <div className="text-sm text-primary bg-surface-base rounded-lg p-3 border border-border">
                  {settings?.voice_tone === 'friendly' &&
                    "Hi! Quick check-in—how's the new item fitting? I'm here to help if anything needs adjusting!"}
                  {settings?.voice_tone === 'professional' &&
                    'Hello. We are following up regarding your recent purchase. Please let us know if you have any concerns about the fit.'}
                  {settings?.voice_tone === 'casual' &&
                    "Hey! Just checking in on your order. How's everything working out?"}
                  {!settings &&
                    "Hi! Quick check-in—how's the new item fitting? Let me know if I can help!"}
                </div>
              </div>
            </div>

            {/* Tone indicator */}
            <div className="flex items-center gap-2 text-xs text-secondary">
              <span className="px-2 py-1 bg-accent-primary/10 text-accent-primary rounded">
                {settings?.voice_tone || 'friendly'}
              </span>
              <span>•</span>
              <span className="px-2 py-1 bg-surface-elevated rounded">
                {settings?.answer_length || 'standard'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
