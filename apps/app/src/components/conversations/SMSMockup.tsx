/**
 * iPhone SMS mockup component
 * Displays messages in an iOS Messages-style phone frame
 *
 * Note: Per DESIGN_SYSTEM.md, this component is an intentional exception
 * that uses iOS-specific hardcoded colors for authentic rendering.
 */

import { useEffect, useRef, useState } from 'react'

// Status bar icons - inline for self-contained component
function SignalIcon() {
  return (
    <svg width="17" height="10" viewBox="0 0 17 10" fill="none">
      <rect x="0" y="6" width="3" height="4" rx="1" fill="#111827" />
      <rect x="4.5" y="4" width="3" height="6" rx="1" fill="#111827" />
      <rect x="9" y="2" width="3" height="8" rx="1" fill="#111827" />
      <rect x="13.5" y="0" width="3" height="10" rx="1" fill="#111827" />
    </svg>
  )
}

function WifiIcon() {
  return (
    <svg width="15" height="12" viewBox="0 0 15 12" fill="none">
      <path d="M7.5 11.5a1 1 0 100-2 1 1 0 000 2z" fill="#111827" />
      <path
        d="M4.757 8.243a4 4 0 015.486 0"
        stroke="#111827"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2.636 6.121a6.5 6.5 0 019.728 0"
        stroke="#111827"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M0.515 4a9 9 0 0113.97 0" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
      <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="#111827" strokeOpacity="0.35" />
      <rect x="2" y="2" width="18" height="8" rx="1.5" fill="#111827" />
      <path d="M23 4v4a2 2 0 000-4z" fill="#111827" fillOpacity="0.4" />
    </svg>
  )
}

function ChevronLeftSmallIcon() {
  return (
    <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
      <path
        d="M7 1L1 7l6 6"
        stroke="#007AFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ChevronRightSmallIcon() {
  return (
    <svg width="5" height="8" viewBox="0 0 5 8" fill="none">
      <path
        d="M1 1l3 3-3 3"
        stroke="#8E8E93"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function VideoCallIcon() {
  return (
    <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
      <rect x="1" y="2" width="14" height="12" rx="2" stroke="#007AFF" strokeWidth="1.5" />
      <path d="M15 7l5-3v8l-5-3V7z" stroke="#007AFF" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

function MicrophoneIcon() {
  return (
    <svg width="12" height="18" viewBox="0 0 12 18" fill="none">
      <rect x="3" y="1" width="6" height="10" rx="3" stroke="#9CA3AF" strokeWidth="1.5" />
      <path d="M1 8a5 5 0 0010 0" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6 14v3" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export interface SMSMockupMessage {
  type: 'incoming' | 'outgoing'
  text: string
}

interface SMSMockupProps {
  messages: SMSMockupMessage[]
  contactName?: string
  className?: string
}

export function SMSMockup({ messages, contactName = 'Brand', className = '' }: SMSMockupProps) {
  const messagesRef = useRef<HTMLDivElement>(null)
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date()
    return `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`
  })
  const [unreadCount] = useState(() => Math.floor(Math.random() * 201) + 100)

  // Update time display
  useEffect(() => {
    const now = new Date()
    setCurrentTime(`${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`)
  }, [])

  // Scroll to bottom on mount
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div
      className={`mx-auto inline-flex flex-col items-center ${className}`}
      role="img"
      aria-label={`SMS conversation with ${contactName}`}
      style={{
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'",
      }}
    >
      {/* Phone frame */}
      <div
        className="relative rounded-[28px] border-[6px] border-black bg-white shadow-2xl overflow-hidden flex flex-col w-[264px] sm:w-[288px]"
        style={{
          aspectRatio: '390/676',
          WebkitMaskImage: '-webkit-radial-gradient(white, black)',
        }}
      >
        {/* Dynamic Island */}
        <div
          className="absolute top-1 left-1/2 -translate-x-1/2 h-5 w-24 bg-black rounded-full z-20"
          aria-hidden="true"
        />

        {/* Status Bar */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 pt-2 pb-1">
          <span className="text-[10px] font-semibold" style={{ color: '#111827' }}>
            {currentTime}
          </span>
          <div className="flex items-center gap-1">
            <SignalIcon />
            <WifiIcon />
            <BatteryIcon />
          </div>
        </div>

        {/* Header overlay */}
        <div className="absolute left-0 right-0 z-10" style={{ top: '28px' }}>
          <div className="relative py-1.5">
            <div className="w-full flex items-start justify-between px-3">
              <div
                className="rounded-full flex items-center gap-1 px-2 py-1 border"
                style={{
                  backgroundColor: 'rgba(250, 250, 250, 0.9)',
                  backdropFilter: 'blur(12px)',
                  borderColor: 'white',
                  color: '#007AFF',
                }}
              >
                <ChevronLeftSmallIcon />
                <span
                  className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: 'black', color: 'white' }}
                >
                  {unreadCount}
                </span>
              </div>
              <div
                className="rounded-full p-1.5 border"
                style={{
                  backgroundColor: 'rgba(250, 250, 250, 0.9)',
                  backdropFilter: 'blur(12px)',
                  borderColor: 'white',
                }}
              >
                <VideoCallIcon />
              </div>
            </div>
            <div className="absolute left-1/2 top-0 -translate-x-1/2 flex flex-col items-center gap-1 mt-2">
              <div className="h-7 w-7 rounded-full overflow-hidden">
                <img src="/bimi.svg" alt="Brand" className="w-full h-full" />
              </div>
              <div
                className="rounded-full px-3 py-1 flex items-center gap-1 border"
                style={{
                  backgroundColor: 'rgba(250, 250, 250, 0.9)',
                  backdropFilter: 'blur(12px)',
                  borderColor: 'white',
                }}
              >
                <span className="text-[13px] font-semibold" style={{ color: 'black' }}>
                  {contactName}
                </span>
                <ChevronRightSmallIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Top fade */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: '110px',
            zIndex: 5,
            background:
              'linear-gradient(to bottom, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Messages Container */}
        <div
          ref={messagesRef}
          className="absolute inset-0 overflow-y-auto px-3 space-y-2"
          style={{
            backgroundColor: '#ECEDEF',
            paddingTop: '110px',
            paddingBottom: '55px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {messages.map((msg, i) => {
            const isOutgoing = msg.type === 'outgoing'
            return (
              <div key={i} className={`flex ${isOutgoing ? 'justify-end' : 'justify-start'}`}>
                <div
                  className="relative px-3 py-2 rounded-[18px]"
                  style={{
                    maxWidth: '76%',
                    backgroundColor: isOutgoing ? '#007aff' : '#dcdcde',
                    boxShadow: '0 0.5px 1px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <p
                    style={{
                      fontSize: '15px',
                      lineHeight: '20px',
                      letterSpacing: '-0.2px',
                      margin: 0,
                      color: isOutgoing ? '#ffffff' : '#000000',
                    }}
                  >
                    {msg.text}
                  </p>
                </div>
              </div>
            )
          })}
          {/* Find last outgoing message and show "Delivered" */}
          {messages.some((m) => m.type === 'outgoing') && (
            <div
              className="text-right pr-2"
              style={{
                fontSize: '11px',
                color: '#8e8e93',
                fontWeight: 400,
              }}
            >
              Delivered
            </div>
          )}
        </div>

        {/* Bottom Input Bar */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 flex items-center gap-2 px-2 py-2"
          style={{ backgroundColor: 'transparent' }}
        >
          <button
            className="rounded-2xl w-7 h-7 flex items-center justify-center border"
            style={{
              backgroundColor: 'rgba(250, 250, 250, 0.9)',
              backdropFilter: 'blur(12px)',
              borderColor: 'white',
            }}
            aria-label="Add attachment"
          >
            <span
              className="text-lg font-light"
              style={{ color: 'black', lineHeight: 1, marginTop: '-1px' }}
            >
              +
            </span>
          </button>
          <div
            className="flex-1 rounded-full px-3 py-1 flex items-center justify-between border"
            style={{
              backgroundColor: '#FAFAFA',
              backdropFilter: 'blur(12px)',
              borderColor: 'white',
            }}
          >
            <span style={{ fontSize: '15px', color: '#8E8E93' }}>iMessage</span>
            <button aria-label="Voice message">
              <MicrophoneIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
