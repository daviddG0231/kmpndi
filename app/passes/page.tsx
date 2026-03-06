'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, ChevronRight, Clock, User } from 'lucide-react'
import BottomNav from '@/components/layout/BottomNav'
import { guestPasses } from '@/lib/mock-data'

type Tab = 'active' | 'expired'

export default function PassesPage() {
  const [tab, setTab] = useState<Tab>('active')
  const router = useRouter()

  const active = guestPasses.filter(p => p.status === 'active')
  const expired = guestPasses.filter(p => p.status === 'expired')
  const shown = tab === 'active' ? active : expired

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Header */}
      <div className="px-5 pt-14 pb-2 flex items-end justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink">Guest Passes</h1>
          <p className="text-xs text-sand-400 mt-0.5">{active.length} active</p>
        </div>
        <button
          onClick={() => router.push('/passes/create')}
          className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center shadow-card"
        >
          <Plus size={20} className="text-white" />
        </button>
      </div>

      <div className="px-5 pt-4">
        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-sand-100 rounded-xl mb-5">
          {(['active', 'expired'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                tab === t
                  ? 'bg-white text-ink shadow-card'
                  : 'text-sand-400 hover:text-ink-muted'
              }`}
            >
              {t === 'active' ? `Active (${active.length})` : `Expired (${expired.length})`}
            </button>
          ))}
        </div>

        {/* Pass list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="space-y-3 mb-32"
          >
            {shown.map((pass, i) => {
              const usedPct = pass.maxVisits ? Math.round((pass.usedVisits / pass.maxVisits) * 100) : 0
              return (
                <motion.button
                  key={pass.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => router.push(`/passes/${pass.id}`)}
                  className="w-full bg-white border border-sand-200 rounded-2xl p-4 text-left shadow-card hover:shadow-card-hover hover:border-sand-300 transition-all active:scale-[0.99]"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-sand-100 flex items-center justify-center flex-shrink-0">
                      <User size={18} className="text-ink" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-ink font-bold text-sm">{pass.guestName}</p>
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                          pass.status === 'active'
                            ? 'bg-green-50 text-status-active'
                            : 'bg-sand-100 text-sand-400'
                        }`}>
                          ● {pass.status === 'active' ? 'Active' : 'Expired'}
                        </span>
                      </div>
                      <p className="text-xs text-sand-400 mt-0.5">{pass.purpose}</p>

                      {/* Usage bar */}
                      {pass.maxVisits && (
                        <div className="mt-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] text-sand-400">{pass.usedVisits} of {pass.maxVisits} visits</span>
                            <span className="text-[10px] font-mono font-bold text-ink">{usedPct}%</span>
                          </div>
                          <div className="h-1.5 bg-sand-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-forest rounded-full transition-all"
                              style={{ width: `${usedPct}%` }}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-3 mt-3">
                        <div className="flex items-center gap-1 text-[10px] text-sand-400">
                          <Clock size={10} />
                          <span className="font-mono">{pass.validFrom} → {pass.validTo}</span>
                        </div>
                        {pass.vehicle && (
                          <span className="text-[10px] font-mono font-bold text-forest bg-forest-50 px-2 py-0.5 rounded-full">
                            🇪🇬 {pass.vehicle}
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight size={14} className="text-sand-300 flex-shrink-0 mt-1" />
                  </div>
                </motion.button>
              )
            })}

            {shown.length === 0 && (
              <div className="bg-white border border-sand-200 rounded-2xl p-12 text-center shadow-card">
                <p className="text-sand-400 text-sm">No {tab} passes</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <BottomNav />
    </div>
  )
}
