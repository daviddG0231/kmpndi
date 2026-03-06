'use client'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  icon?: React.ReactNode
}

const variants = {
  primary: 'bg-forest hover:bg-forest-light text-white',
  secondary: 'bg-white border border-sand-200 text-ink hover:bg-sand-50',
  ghost: 'bg-transparent text-ink-muted hover:text-ink hover:bg-sand-100',
  danger: 'bg-red-50 border border-red-200 text-status-danger hover:bg-red-100',
  success: 'bg-green-50 border border-green-200 text-status-active hover:bg-green-100',
}

const sizes = {
  sm: 'h-9 px-4 text-sm rounded-lg',
  md: 'h-12 px-5 text-sm rounded-xl',
  lg: 'h-13 px-6 text-base rounded-xl',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  fullWidth,
  onClick,
  type = 'button',
  className = '',
  icon,
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        flex items-center justify-center gap-2 font-semibold
        transition-all duration-150 select-none
        disabled:opacity-40 disabled:cursor-not-allowed
        ${variants[variant]} ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      style={size === 'lg' ? { height: 52 } : undefined}
    >
      {loading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : icon ? (
        <span>{icon}</span>
      ) : null}
      {children}
    </motion.button>
  )
}
