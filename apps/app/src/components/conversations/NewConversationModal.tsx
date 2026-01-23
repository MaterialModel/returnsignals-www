/**
 * Modal for creating a new conversation (proactive outreach)
 */

import { useState } from 'react'
import { Modal, Button, Input } from '@/components/ui'

interface NewConversationModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: {
    customer_phone: string
    order_id?: string
    initial_message?: string
  }) => Promise<void>
}

export function NewConversationModal({ isOpen, onClose, onSubmit }: NewConversationModalProps) {
  const [phone, setPhone] = useState('')
  const [orderId, setOrderId] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Basic validation
    if (!phone.trim()) {
      setError('Phone number is required')
      return
    }

    // Format phone: ensure it starts with + for E.164
    let formattedPhone = phone.trim()
    if (!formattedPhone.startsWith('+')) {
      // Assume US number if no country code
      formattedPhone = formattedPhone.replace(/\D/g, '')
      if (formattedPhone.length === 10) {
        formattedPhone = '+1' + formattedPhone
      } else if (formattedPhone.length === 11 && formattedPhone.startsWith('1')) {
        formattedPhone = '+' + formattedPhone
      } else {
        formattedPhone = '+' + formattedPhone
      }
    }

    setIsSubmitting(true)
    try {
      await onSubmit({
        customer_phone: formattedPhone,
        order_id: orderId.trim() || undefined,
        initial_message: message.trim() || undefined,
      })
      // Reset form and close on success
      setPhone('')
      setOrderId('')
      setMessage('')
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create conversation')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    if (!isSubmitting) {
      setPhone('')
      setOrderId('')
      setMessage('')
      setError(null)
      onClose()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="New Conversation" maxWidth="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Customer Phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          disabled={isSubmitting}
        />

        <Input
          label="Order ID (optional)"
          type="text"
          placeholder="ORD-12345"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          disabled={isSubmitting}
        />

        <div className="space-y-1">
          <label className="block text-sm font-medium text-primary">
            Initial Message (optional)
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded bg-surface-base text-primary placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent resize-none"
            rows={3}
            placeholder="Hi! We noticed you recently made a purchase..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting}
            maxLength={1600}
          />
          <p className="text-xs text-tertiary text-right">{message.length}/1600</p>
        </div>

        {error && (
          <div className="p-3 bg-accent-error-bg text-accent-error text-sm rounded">{error}</div>
        )}

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Conversation'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
