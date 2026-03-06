'use client'
import { usePathname, useRouter } from 'next/navigation'
import { Home, Car, Ticket, User } from 'lucide-react'

const tabs = [
  { label: 'Home', icon: Home, path: '/home' },
  { label: 'Vehicles', icon: Car, path: '/vehicles' },
  { label: 'Passes', icon: Ticket, path: '/passes' },
  { label: 'Profile', icon: User, path: '/profile' },
]

export default function BottomNav() {
  const pathname = usePathname()
  const router = useRouter()
  const isActive = (p: string) => pathname === p || pathname.startsWith(p + '/')

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-surface/80 backdrop-blur-xl border-t border-sep">
      <div className="flex">
        {tabs.map((tab) => {
          const active = isActive(tab.path)
          return (
            <button
              key={tab.path}
              onClick={() => router.push(tab.path)}
              className="flex-1 flex flex-col items-center pt-2 pb-1"
            >
              <tab.icon
                size={22}
                className={active ? 'text-accent' : 'text-txt-tertiary'}
                strokeWidth={active ? 2 : 1.5}
              />
              <span className={`text-[10px] mt-0.5 ${active ? 'text-accent font-semibold' : 'text-txt-tertiary'}`}>
                {tab.label}
              </span>
            </button>
          )
        })}
      </div>
      <div className="h-[env(safe-area-inset-bottom,0px)]" />
    </nav>
  )
}
