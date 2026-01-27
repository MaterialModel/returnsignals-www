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

  // Scroll to bottom when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
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
      className="flex-1 overflow-y-auto"
      style={{
        backgroundColor: '#ffffff',
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        padding: '12px',
      }}
    >
      <div className="space-y-2">
        {messages.map((message) => (
          <div key={message.message_id}>
            <MessageItem message={message} />
            <MessageReceipt message={message} />
          </div>
        ))}
      </div>
      <div ref={bottomRef} />
    </div>
  )
}
