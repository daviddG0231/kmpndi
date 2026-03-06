'use client'
import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hover?: boolean
  glow?: boolean
  padding?: boolean
}

export default function Card({
  children,
  className = '',
  onClick,
  hover = false,
  glow = false,
  padding = true,
}: CardProps) {
  const base = `
    bg-white border border-sand-200 rounded-2xl
    ${padding ? 'p-5' : ''}
    ${hover ? 'cursor-pointer hover:border-sand-300 hover:bg-sand-100 transition-all duration-200' : ''}
    ${glow ? 'border-forest/30 shadow-card' : ''}
    ${className}
  `

  if (onClick) {
    return (
      <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={base}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={base}>{children}</div>
}
