/**
 * Single message in a conversation thread
 * iOS Messages-style chat bubble with inline media
 */

import { useState, useCallback } from 'react'
import type { Message } from '@/types'
import { formatTime } from '@/utils/formatters'
import { MessageStatusIcon } from './MessageStatusIcon'
import { statusLabels } from './constants'
import { SignedImage, ImageLightbox } from '@/components/ui'

interface MessageItemProps {
  message: Message
}

export function MessageItem({ message }: MessageItemProps) {
  const isInbound = message.direction === 'inbound'
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  const handleImageClick = useCallback((url: string) => {
    setLightboxImage(url)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxImage(null)
  }, [])

  return (
    <>
      <div className={`flex ${isInbound ? 'justify-start' : 'justify-end'}`}>
        {/* Message bubble - shrinks to fit content */}
        <div
          style={{
            maxWidth: '76%',
            padding: '8px 12px',
            borderRadius: '18px',
            boxShadow: '0 0.5px 1px rgba(0, 0, 0, 0.1)',
            backgroundColor: isInbound ? '#dcdcde' : '#007aff',
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

          {/* Inline media attachments */}
          {message.media_urls.length > 0 && (
            <div className="mt-2 space-y-2">
              {message.media_urls.map((url, index) => (
                <SignedImage
                  key={index}
                  src={url}
                  alt={`Attachment ${index + 1}`}
                  className="max-w-full rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                  fallback="placeholder"
                  onClick={() => handleImageClick(url)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox for full-size image viewing */}
      {lightboxImage && (
        <ImageLightbox src={lightboxImage} alt="Attachment" isOpen={true} onClose={closeLightbox} />
      )}
    </>
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
