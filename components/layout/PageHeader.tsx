'use client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  backPath?: string
  rightAction?: React.ReactNode
  transparent?: boolean
}

export default function PageHeader({
  title,
  subtitle,
  backPath,
  rightAction,
  transparent = false,
}: PageHeaderProps) {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`sticky top-0 z-40 px-5 pt-14 pb-4 ${
        transparent
          ? 'bg-transparent'
          : 'bg-sand-50/95 backdrop-blur-xl border-b border-sand-200'
      }`}
    >
      <div className="flex items-center gap-3">
        {backPath && (
          <button
            onClick={() => router.push(backPath)}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-sand-200 hover:bg-sand-100 transition-colors shadow-card"
          >
            <ArrowLeft size={18} className="text-ink" />
          </button>
        )}
        <div className="flex-1">
          <h1 className="text-lg font-bold text-ink">{title}</h1>
          {subtitle && (
            <p className="text-xs text-sand-400 mt-0.5">{subtitle}</p>
          )}
        </div>
        {rightAction && <div>{rightAction}</div>}
      </div>
    </motion.div>
  )
}
