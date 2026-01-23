/**
 * Form input component with label and error support
 */

import { forwardRef, type InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const inputId = id || props.name

    return (
      <div className="space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-primary">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-3 py-2
            border border-border rounded
            bg-surface-base text-primary
            placeholder:text-tertiary
            focus:outline-none focus:ring-2 focus:ring-accent-primary focus:border-transparent
            disabled:bg-surface-subtle disabled:text-tertiary disabled:cursor-not-allowed
            ${error ? 'border-accent-error focus:ring-accent-error' : ''}
            ${className}
          `}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-accent-error">
            {error}
          </p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
