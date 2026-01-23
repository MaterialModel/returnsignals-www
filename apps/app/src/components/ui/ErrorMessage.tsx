/**
 * Error message display component
 */

interface ErrorMessageProps {
  error: Error | string
  className?: string
}

export function ErrorMessage({ error, className = '' }: ErrorMessageProps) {
  const message = typeof error === 'string' ? error : error.message

  return (
    <div
      className={`rounded border border-accent-error-border bg-accent-error-bg p-4 ${className}`}
      role="alert"
    >
      <p className="text-sm text-accent-error-text">{message}</p>
    </div>
  )
}
