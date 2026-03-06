interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  padding?: boolean
}

export default function Card({ children, className = '', onClick, padding = true }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-surface rounded-[12px] ${padding ? 'p-4' : ''} ${onClick ? 'cursor-pointer active:bg-fill transition-colors' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
