/**
 * AI settings form for voice tone and answer length
 */

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui'
import type { VoiceTone, AnswerLength, AISettingsResponse } from '@/types'

interface AISettingsFormProps {
  settings: AISettingsResponse | null
  isSaving: boolean
  onSave: (updates: { voice_tone?: VoiceTone; answer_length?: AnswerLength }) => Promise<void>
  canEdit: boolean
}

const voiceTones: { value: VoiceTone; label: string; description: string; example: string }[] = [
  {
    value: 'friendly',
    label: 'Friendly & Helpful',
    description: 'Warm, approachable tone that builds rapport',
    example: "Hi Jacky! Quick check-in—how's the new wrap dress fitting so far?",
  },
  {
    value: 'professional',
    label: 'Professional',
    description: 'Formal, business-like communication style',
    example: 'Hello Jacky. We are following up regarding your recent order. How is the fit?',
  },
  {
    value: 'casual',
    label: 'Casual',
    description: 'Relaxed, conversational approach',
    example: "Hey Jacky! Just checking in on that wrap dress. How's it working out?",
  },
]

const answerLengths: { value: AnswerLength; label: string; description: string }[] = [
  { value: 'concise', label: 'Concise', description: 'Brief, to-the-point responses' },
  { value: 'standard', label: 'Standard', description: 'Balanced detail and brevity' },
  { value: 'detailed', label: 'Detailed', description: 'Comprehensive explanations' },
]

export function AISettingsForm({ settings, isSaving, onSave, canEdit }: AISettingsFormProps) {
  const [voiceTone, setVoiceTone] = useState<VoiceTone>('friendly')
  const [answerLength, setAnswerLength] = useState<AnswerLength>('standard')
  const [hasChanges, setHasChanges] = useState(false)

  // Sync with settings when loaded
  useEffect(() => {
    if (settings) {
      setVoiceTone(settings.voice_tone)
      setAnswerLength(settings.answer_length)
      setHasChanges(false)
    }
  }, [settings])

  // Track changes
  useEffect(() => {
    if (settings) {
      setHasChanges(voiceTone !== settings.voice_tone || answerLength !== settings.answer_length)
    }
  }, [voiceTone, answerLength, settings])

  const handleSave = async () => {
    await onSave({ voice_tone: voiceTone, answer_length: answerLength })
  }

  return (
    <div className="space-y-8">
      {/* Voice & Tone */}
      <div>
        <h3 className="text-lg font-medium text-primary mb-4">Voice & Tone</h3>
        <div className="space-y-3">
          {voiceTones.map((tone) => (
            <label
              key={tone.value}
              className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                voiceTone === tone.value
                  ? 'border-2 border-accent-primary bg-accent-primary/5'
                  : 'border-border hover:border-accent-primary/50'
              } ${!canEdit ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="radio"
                  name="voiceTone"
                  value={tone.value}
                  checked={voiceTone === tone.value}
                  onChange={(e) => canEdit && setVoiceTone(e.target.value as VoiceTone)}
                  disabled={!canEdit}
                  className="mt-1 accent-accent-primary"
                />
                <div className="flex-1">
                  <div className="font-medium text-primary">{tone.label}</div>
                  <div className="text-sm text-secondary mt-0.5">{tone.description}</div>
                  <div className="text-sm text-tertiary mt-2 italic">"{tone.example}"</div>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Answer Length */}
      <div>
        <h3 className="text-lg font-medium text-primary mb-4">Answer Length</h3>
        <div className="flex gap-2">
          {answerLengths.map((length) => (
            <button
              key={length.value}
              onClick={() => canEdit && setAnswerLength(length.value)}
              disabled={!canEdit}
              className={`flex-1 p-3 rounded-lg border text-center transition-colors ${
                answerLength === length.value
                  ? 'border-2 border-accent-primary bg-accent-primary/5'
                  : 'border-border hover:border-accent-primary/50'
              } ${!canEdit ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <div className="font-medium text-primary">{length.label}</div>
              <div className="text-xs text-secondary mt-1">{length.description}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Save button */}
      {canEdit && (
        <div className="flex justify-end">
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={!hasChanges || isSaving}
            isLoading={isSaving}
          >
            Save Changes
          </Button>
        </div>
      )}

      {!canEdit && (
        <div className="text-sm text-secondary bg-surface-subtle p-3 rounded">
          You need manager permissions or higher to edit AI settings.
        </div>
      )}
    </div>
  )
}
