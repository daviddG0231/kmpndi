'use client'
import { Loader2 } from 'lucide-react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  icon?: React.ReactNode
}

export default function Button({
  children, variant = 'primary', size = 'md', loading, disabled,
  fullWidth, onClick, type = 'button', className = '', icon,
}: ButtonProps) {
  const v = {
    primary: 'bg-accent text-white active:opacity-80',
    secondary: 'bg-fill text-accent active:bg-sep',
    ghost: 'text-accent active:opacity-60',
    danger: 'bg-[#FF3B3020] text-sys-red active:bg-[#FF3B3030]',
  }[variant]

  const s = {
    sm: 'h-[34px] px-4 text-[13px] rounded-[8px]',
    md: 'h-[44px] px-5 text-[15px] rounded-[10px]',
    lg: 'h-[50px] px-6 text-[15px] rounded-[12px]',
  }[size]

  return (
    <button
      type={type} onClick={onClick} disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 font-semibold select-none transition-opacity disabled:opacity-40 ${v} ${s} ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      {loading ? <Loader2 size={18} className="animate-spin" /> : icon ? <span>{icon}</span> : null}
      {children}
    </button>
  )
}
