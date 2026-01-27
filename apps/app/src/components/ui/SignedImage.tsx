/**
 * Image component with error handling for signed URLs
 * Handles 60-minute GCS signed URL expiration gracefully
 */

import { useState, useCallback } from 'react'
import { ImagePlaceholderIcon } from './icons'

interface SignedImageProps {
  src: string | null
  alt: string
  className?: string
  fallback?: 'placeholder' | 'hide'
  onClick?: () => void
  onError?: () => void
}

export function SignedImage({
  src,
  alt,
  className = '',
  fallback = 'placeholder',
  onClick,
  onError,
}: SignedImageProps) {
  const [hasError, setHasError] = useState(false)

  const handleError = useCallback(() => {
    setHasError(true)
    onError?.()
  }, [onError])

  // No source provided
  if (!src) {
    if (fallback === 'hide') {
      return null
    }
    return <ImagePlaceholder className={className} />
  }

  // Image failed to load (expired URL or other error)
  if (hasError) {
    if (fallback === 'hide') {
      return null
    }
    return <ImagePlaceholder className={className} />
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={handleError}
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : undefined}
    />
  )
}

/**
 * Placeholder shown when image is missing or fails to load
 */
function ImagePlaceholder({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-surface-subtle text-tertiary ${className}`}
    >
      <ImagePlaceholderIcon className="w-6 h-6" />
    </div>
  )
}
