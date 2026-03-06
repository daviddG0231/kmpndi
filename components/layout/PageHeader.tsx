'use client'
import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  backPath?: string
  rightAction?: React.ReactNode
  large?: boolean
}

export default function PageHeader({ title, subtitle, backPath, rightAction, large }: PageHeaderProps) {
  const router = useRouter()

  return (
    <div className="sticky top-0 z-40 bg-bg/80 backdrop-blur-xl">
      <div className="px-4 pt-14 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 min-w-0">
            {backPath && (
              <button onClick={() => router.push(backPath)} className="-ml-2 p-2 text-accent">
                <ChevronLeft size={24} strokeWidth={2.5} />
              </button>
            )}
            <div className="min-w-0">
              <h1 className={`font-semibold text-txt truncate ${large ? 'text-[28px] tracking-tight' : 'text-[17px]'}`}>
                {title}
              </h1>
              {subtitle && <p className="text-[13px] text-txt-secondary">{subtitle}</p>}
            </div>
          </div>
          {rightAction && <div className="shrink-0 ml-3">{rightAction}</div>}
        </div>
      </div>
    </div>
  )
}
