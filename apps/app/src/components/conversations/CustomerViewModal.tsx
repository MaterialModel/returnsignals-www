/**
 * Modal dialog showing conversation in iPhone SMS mockup style
 */

import { Modal } from '@/components/ui/Modal'
import { SMSMockup, type SMSMockupMessage } from './SMSMockup'
import type { Message } from '@/types'

interface CustomerViewModalProps {
  isOpen: boolean
  onClose: () => void
  messages: Message[]
  brandName?: string
}

export function CustomerViewModal({
  isOpen,
  onClose,
  messages,
  brandName = 'Brand',
}: CustomerViewModalProps) {
  // Transform Message[] to SMSMockupMessage[]
  // From customer's perspective: their messages (inbound to business) appear as outgoing (blue, right)
  // Brand messages (outbound from business) appear as incoming (gray, left)
  const mockupMessages: SMSMockupMessage[] = messages.map((msg) => ({
    type: msg.direction === 'inbound' ? 'outgoing' : 'incoming',
    text: msg.content,
  }))

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Customer View" maxWidth="xl">
      <div className="flex justify-center py-4">
        <SMSMockup messages={mockupMessages} contactName={brandName} />
      </div>
    </Modal>
  )
}
