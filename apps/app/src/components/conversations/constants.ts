/**
 * Constants for conversation components
 */

import type { MessageStatus } from '@/types'

export const statusLabels: Record<MessageStatus, string> = {
  pending: 'Sending',
  sent: 'Sent',
  delivered: 'Delivered',
  failed: 'Failed',
  read: 'Read',
}
