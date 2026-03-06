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
  label, placeholder, value, onChange, type = 'text',
  icon, error, hint, maxLength, disabled, autoFocus, className = '',
}: InputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && <label className="text-[13px] font-medium text-txt-secondary pl-1">{label}</label>}
      <div className="relative">
        {icon && <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-txt-tertiary">{icon}</div>}
        <input
          type={type} value={value} onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder} maxLength={maxLength} disabled={disabled} autoFocus={autoFocus}
          className={`w-full h-[44px] rounded-[10px] bg-fill text-txt placeholder:text-txt-tertiary text-[15px] focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:opacity-50 ${icon ? 'pl-11' : 'px-3.5'} ${error ? 'ring-2 ring-sys-red/30' : ''}`}
        />
      </div>
      {error && <p className="text-[12px] text-sys-red pl-1">{error}</p>}
      {hint && !error && <p className="text-[12px] text-txt-tertiary pl-1">{hint}</p>}
    </div>
  )
}
