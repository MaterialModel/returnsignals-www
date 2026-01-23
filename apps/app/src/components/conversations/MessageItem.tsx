/**
 * Single message in a conversation thread
 * iOS Messages-style chat bubble
 */

import type { Message } from '@/types'
import { formatTime } from '@/utils/formatters'
import { MessageStatusIcon } from './MessageStatusIcon'
import { statusLabels } from './constants'

interface MessageItemProps {
  message: Message
}

export function MessageItem({ message }: MessageItemProps) {
  const isInbound = message.direction === 'inbound'
  const isBot = message.speaker === 'bot'

  return (
    <div className={`flex ${isInbound ? 'justify-start' : 'justify-end'}`}>
      {/* Message bubble - shrinks to fit content */}
      <div
        style={{
          maxWidth: '76%',
          padding: '8px 12px',
          borderRadius: '18px',
          boxShadow: '0 0.5px 1px rgba(0, 0, 0, 0.1)',
          backgroundColor: isInbound ? '#dcdcde' : isBot ? '#34c759' : '#007aff',
          color: isInbound ? '#000000' : '#ffffff',
        }}
      >
        <p
          style={{
            fontSize: '15px',
            lineHeight: '20px',
            letterSpacing: '-0.2px',
            margin: 0,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            color: isInbound ? '#000000' : '#ffffff',
          }}
        >
          {message.content}
        </p>

        {/* Media attachments */}
        {message.media_urls.length > 0 && (
          <div className="mt-1.5">
            {message.media_urls.map((url, index) => (
              <a
                key={index}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '11px',
                  color: isInbound ? '#007aff' : '#ffffff',
                  textDecoration: 'underline',
                }}
              >
                View attachment {index + 1}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Message receipt/status shown below the bubble
 */
export function MessageReceipt({ message }: { message: Message }) {
  const isInbound = message.direction === 'inbound'

  return (
    <div
      className={`flex items-center gap-1 mt-0.5 ${isInbound ? 'justify-start pl-1' : 'justify-end pr-1'}`}
    >
      <span style={{ fontSize: '11px', color: '#8e8e93', fontWeight: 400 }}>
        {formatTime(message.created_at)}
      </span>
      {!isInbound && (
        <>
          <span style={{ fontSize: '11px', color: '#8e8e93' }}>·</span>
          <MessageStatusIcon status={message.status} />
          <span style={{ fontSize: '11px', color: '#8e8e93', fontWeight: 400 }}>
            {statusLabels[message.status]}
          </span>
        </>
      )}
    </div>
  )
}
