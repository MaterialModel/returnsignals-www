/**
 * Message delivery status icon
 * iOS Messages-style status indicators
 */

import type { MessageStatus } from '@/types'

interface MessageStatusIconProps {
  status: MessageStatus
}

const statusLabels: Record<MessageStatus, string> = {
  pending: 'Sending',
  sent: 'Sent',
  delivered: 'Delivered',
  failed: 'Failed',
  read: 'Read',
}

// iOS-style colors
const colors = {
  gray: '#8e8e93',
  green: '#34c759',
  red: '#ff3b30',
  blue: '#007aff',
}

export function MessageStatusIcon({ status }: MessageStatusIconProps) {
  const size = { width: 12, height: 12 }

  switch (status) {
    case 'pending':
      return (
        <svg
          style={{ ...size, color: colors.gray }}
          className="animate-pulse"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      )
    case 'sent':
      return (
        <svg
          style={{ ...size, color: colors.gray }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      )
    case 'delivered':
      return (
        <svg
          style={{ ...size, color: colors.gray }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      )
    case 'failed':
      return (
        <svg
          style={{ ...size, color: colors.red }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      )
    case 'read':
      return (
        <svg
          style={{ ...size, color: colors.blue }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
        </svg>
      )
    default:
      return null
  }
}

export { statusLabels }
