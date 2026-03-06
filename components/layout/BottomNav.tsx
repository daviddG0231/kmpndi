'use client'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
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

  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(path + '/')

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 px-5 pb-5">
      <div className="glass rounded-2xl px-1.5 py-1.5 shadow-float">
        <div className="flex items-center">
          {tabs.map((tab) => {
            const active = isActive(tab.path)
            return (
              <button
                key={tab.path}
                onClick={() => router.push(tab.path)}
                className="relative flex-1 flex flex-col items-center gap-0.5 py-2.5 rounded-xl transition-all duration-200"
              >
                {active && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-forest rounded-xl"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <tab.icon
                  size={20}
                  className={`relative z-10 ${active ? 'text-white' : 'text-ink-muted'}`}
                  strokeWidth={active ? 2.2 : 1.6}
                />
                <span
                  className={`relative z-10 text-[10px] font-semibold ${
                    active ? 'text-white' : 'text-ink-muted'
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
