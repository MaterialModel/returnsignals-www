/**
 * Message thread displaying all messages in a conversation
 * iOS Messages-style layout
 */

import { useEffect, useRef } from 'react'
import type { Message } from '@/types'
import { MessageItem, MessageReceipt } from './MessageItem'

interface MessageThreadProps {
  messages: Message[]
}

export function MessageThread({ messages }: MessageThreadProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const hasDoneInitialScrollRef = useRef(false)

  // Scroll to bottom when messages change
  useEffect(() => {
    const behavior: ScrollBehavior = hasDoneInitialScrollRef.current ? 'smooth' : 'auto'
    bottomRef.current?.scrollIntoView({ behavior })
    if (!hasDoneInitialScrollRef.current) {
      hasDoneInitialScrollRef.current = true
    }
  }, [messages])

  if (messages.length === 0) {
    return (
      <div
        className="flex-1 flex items-center justify-center"
        style={{
          backgroundColor: '#ffffff',
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        }}
      >
        <span style={{ fontSize: '15px', color: '#8e8e93' }}>No messages yet</span>
      </div>
    )
  }

  return (
    <div
      className="relative flex-1 overflow-y-auto min-h-0 overscroll-contain"
      style={{
        backgroundColor: '#ffffff',
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        padding: '12px',
      }}
    >
      {/* Top fade shadow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-4 z-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,1), rgba(255,255,255,0))',
        }}
      />

      <div className="space-y-2">
        {messages.map((message) => (
          <div key={message.message_id}>
            <MessageItem message={message} />
            <MessageReceipt message={message} />
          </div>
        ))}
      </div>
      <div ref={bottomRef} />

      {/* Bottom fade shadow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-5 z-10"
        style={{
          background: 'linear-gradient(to top, rgba(255,255,255,1), rgba(255,255,255,0))',
        }}
      />
    </div>
  )
}
