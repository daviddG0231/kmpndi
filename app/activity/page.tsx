'use client'
import PageHeader from '@/components/layout/PageHeader'
import BottomNav from '@/components/layout/BottomNav'
import { activityEntries } from '@/lib/mock-data'
import { ArrowDownLeft, ArrowUpRight, Ticket, AlertCircle, Users } from 'lucide-react'

function formatDate(ts: string) {
  const d = new Date(ts)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  if (d.toDateString() === today.toDateString()) return 'Today'
  if (d.toDateString() === yesterday.toDateString()) return 'Yesterday'
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })
}

function formatTime(ts: string) {
  return new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
}

function ActivityIcon({ type, status }: { type: string; status: string }) {
  if (status === 'denied') return <AlertCircle size={18} className="text-sys-red" />
  if (type === 'entry') return <ArrowDownLeft size={18} className="text-sys-green" />
  if (type === 'exit') return <ArrowUpRight size={18} className="text-sys-orange" />
  if (type === 'pass_used') return <Ticket size={18} className="text-sys-blue" />
  if (type === 'visitor') return <Users size={18} className="text-sys-blue" />
  return <AlertCircle size={18} className="text-txt-tertiary" />
}

export default function ActivityPage() {
  // Group by date
  const grouped = activityEntries.reduce<Record<string, typeof activityEntries>>((acc, entry) => {
    const label = formatDate(entry.timestamp)
    if (!acc[label]) acc[label] = []
    acc[label].push(entry)
    return acc
  }, {})

  return (
    <div className="phone-frame bg-bg min-h-screen safe-bottom">
      <PageHeader title="Activity" large />

      <div className="px-4 pb-6 space-y-5">
        {Object.entries(grouped).map(([date, entries]) => (
          <div key={date}>
            <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-1.5">{date}</p>
            <div className="bg-surface rounded-[12px] divide-y divide-sep">
              {entries.map(entry => (
                <div key={entry.id} className="px-4 py-3.5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-fill flex items-center justify-center shrink-0 mt-0.5">
                    <ActivityIcon type={entry.type} status={entry.status} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-txt">{entry.description}</p>
                    {(entry.vehicle || entry.person) && (
                      <p className="text-[12px] text-txt-secondary font-mono mt-0.5">
                        {entry.vehicle || entry.person}
                      </p>
                    )}
                    <p className="text-[12px] text-txt-tertiary mt-0.5">{entry.gate}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5 shrink-0">
                    <span className="text-[12px] font-mono text-txt-tertiary">{formatTime(entry.timestamp)}</span>
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: entry.status === 'success' ? '#34C759' : entry.status === 'denied' ? '#FF3B30' : '#FF9500',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <BottomNav />
    </div>
  )
}
