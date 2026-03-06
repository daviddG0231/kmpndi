interface BadgeProps {
  label: string
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral'
  dot?: boolean
  size?: 'sm' | 'md'
}

const variants = {
  success: 'bg-status-active/15 text-status-active border-success/30',
  warning: 'bg-warning/15 text-status-warning border-warning/30',
  danger: 'bg-status-danger/15 text-status-danger border-danger/30',
  info: 'bg-forest/15 text-forest-light border-forest/30',
  neutral: 'bg-white/10 text-sand-400 border-sand-300',
}

const dotColors = {
  success: 'bg-status-active',
  warning: 'bg-warning',
  danger: 'bg-status-danger',
  info: 'bg-forest',
  neutral: 'bg-slate-400',
}

export default function Badge({ label, variant = 'neutral', dot = false, size = 'sm' }: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 border rounded-full font-semibold
        ${variants[variant]}
        ${size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1'}
      `}
    >
      {dot && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />
      )}
      {label}
    </span>
  )
}
