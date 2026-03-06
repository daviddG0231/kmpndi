'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/layout/PageHeader'
import BottomNav from '@/components/layout/BottomNav'
import Badge from '@/components/ui/Badge'
import { Plus, ChevronRight } from 'lucide-react'
import { guestPasses } from '@/lib/mock-data'

function statusVariant(status: string): 'green' | 'orange' | 'red' | 'blue' | 'gray' {
  if (status === 'active') return 'green'
  if (status === 'expired' || status === 'cancelled') return 'gray'
  if (status === 'used') return 'orange'
  return 'gray'
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function PassesPage() {
  const router = useRouter()
  const [tab, setTab] = useState<'active' | 'expired'>('active')

  const filtered = guestPasses.filter(p =>
    tab === 'active' ? p.status === 'active' : p.status !== 'active'
  )

  return (
    <div className="phone-frame bg-bg min-h-screen safe-bottom">
      <PageHeader
        title="Guest Passes"
        subtitle={`${guestPasses.filter(p => p.status === 'active').length} active`}
        large
        rightAction={
          <button
            onClick={() => router.push('/passes/create')}
            className="w-[34px] h-[34px] rounded-full bg-accent flex items-center justify-center"
          >
            <Plus size={18} className="text-white" strokeWidth={2.5} />
          </button>
        }
      />

      <div className="px-4 pb-6">
        {/* Tabs */}
        <div className="flex mb-4 border-b border-sep">
          {(['active', 'expired'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 pb-2.5 text-[14px] font-medium capitalize transition-colors ${
                tab === t
                  ? 'text-accent border-b-2 border-accent -mb-px'
                  : 'text-txt-secondary'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Pass list */}
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[15px] text-txt-secondary">No {tab} passes</p>
          </div>
        ) : (
          <div className="bg-surface rounded-[12px] divide-y divide-sep">
            {filtered.map(pass => (
              <button
                key={pass.id}
                onClick={() => router.push(`/passes/${pass.id}`)}
                className="w-full px-4 py-3.5 flex items-center text-left active:bg-fill transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[15px] font-semibold text-txt">{pass.guestName}</span>
                    <Badge label={pass.status} variant={statusVariant(pass.status)} />
                  </div>
                  <p className="text-[13px] text-txt-secondary mb-0.5">{pass.purpose}</p>
                  <p className="text-[12px] text-txt-tertiary font-mono">
                    {formatDate(pass.validFrom)} – {formatDate(pass.validTo)}
                  </p>
                </div>
                <div className="text-right shrink-0 ml-3 flex flex-col items-end gap-1">
                  <span className="text-[12px] font-mono text-txt-secondary">
                    {pass.usedVisits}/{pass.maxVisits}
                  </span>
                  <ChevronRight size={16} className="text-txt-tertiary" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
