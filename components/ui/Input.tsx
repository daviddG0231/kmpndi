'use client'

interface InputProps {
  label?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  type?: string
  icon?: React.ReactNode
  error?: string
  hint?: string
  maxLength?: number
  disabled?: boolean
  autoFocus?: boolean
  className?: string
}

export default function Input({
  label,
  placeholder,
  value,
  onChange,
  type = 'text',
  icon,
  error,
  hint,
  maxLength,
  disabled,
  autoFocus,
  className = '',
}: InputProps) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-ink-muted">{label}</label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-sand-400">
            {icon}
          </div>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          autoFocus={autoFocus}
          className={`
            w-full rounded-xl
            bg-sand-50 border transition-colors duration-150
            text-ink placeholder:text-sand-400
            focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest
            disabled:opacity-50
            ${icon ? 'pl-12 pr-4' : 'px-4'}
            py-3.5 text-sm font-medium
            ${error ? 'border-status-danger' : 'border-sand-200 hover:border-sand-300'}
          `}
          style={{ height: '52px' }}
        />
      </div>
      {error && <p className="text-xs text-status-danger">{error}</p>}
      {hint && !error && <p className="text-xs text-sand-400">{hint}</p>}
    </div>
  )
}
