'use client'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/layout/PageHeader'
import BottomNav from '@/components/layout/BottomNav'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { ChevronRight, Plus, Ticket } from 'lucide-react'
import { guestPasses, activityEntries } from '@/lib/mock-data'

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function VisitorPage() {
  const router = useRouter()

  // Active visitor passes
  const activePasses = guestPasses.filter(p => p.status === 'active')

  // Recent visitors from activity
  const recentVisitors = activityEntries
    .filter(e => e.type === 'visitor' || e.type === 'pass_used')
    .slice(0, 4)

  return (
    <div className="phone-frame bg-bg min-h-screen safe-bottom">
      <PageHeader title="Visitor" large />

      <div className="px-4 pb-6 space-y-5">
        {/* Create pass shortcut */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          icon={<Plus size={18} />}
          onClick={() => router.push('/passes/create')}
        >
          Create Guest Pass
        </Button>

        {/* Active passes */}
        {activePasses.length > 0 && (
          <div>
            <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-1.5">Active Passes</p>
            <div className="bg-surface rounded-[12px] divide-y divide-sep">
              {activePasses.map(pass => (
                <button
                  key={pass.id}
                  onClick={() => router.push(`/passes/${pass.id}`)}
                  className="w-full px-4 py-3.5 flex items-center text-left active:bg-fill transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-accent-light flex items-center justify-center shrink-0 mr-3">
                    <Ticket size={16} className="text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] font-semibold text-txt">{pass.guestName}</p>
                    <p className="text-[12px] text-txt-secondary font-mono">
                      Valid until {formatDate(pass.validTo)} · {pass.usedVisits}/{pass.maxVisits} visits
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-3">
                    <Badge label="Active" variant="green" />
                    <ChevronRight size={16} className="text-txt-tertiary" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Recent visitors */}
        {recentVisitors.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide">Recent Visitors</p>
              <button onClick={() => router.push('/activity')} className="text-[13px] text-accent">See all</button>
            </div>
            <div className="bg-surface rounded-[12px] divide-y divide-sep">
              {recentVisitors.map(entry => (
                <div key={entry.id} className="px-4 py-3.5 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] text-txt">{entry.person || 'Unknown'}</p>
                    <p className="text-[12px] text-txt-secondary mt-0.5">{entry.description}</p>
                  </div>
                  <p className="text-[12px] font-mono text-txt-tertiary shrink-0">
                    {new Date(entry.timestamp).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activePasses.length === 0 && recentVisitors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[15px] text-txt-secondary">No visitor activity yet</p>
            <p className="text-[13px] text-txt-tertiary mt-1">Create a guest pass to invite visitors</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
