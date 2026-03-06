'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDownLeft, ArrowUpRight, Ticket, Users, AlertCircle,
  Filter, Calendar
} from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import BottomNav from '@/components/layout/BottomNav'
import Badge from '@/components/ui/Badge'
import { activityEntries } from '@/lib/mock-data'

const filters = ['All', 'Entry', 'Exit', 'Pass', 'Alert']

function getIcon(type: string, status: string) {
  if (status === 'denied') return { icon: AlertCircle, bg: 'bg-status-danger/15', color: 'text-status-danger' }
  if (type === 'entry') return { icon: ArrowDownLeft, bg: 'bg-status-active/15', color: 'text-status-active' }
  if (type === 'exit') return { icon: ArrowUpRight, bg: 'bg-slate-500/15', color: 'text-sand-400' }
  if (type === 'pass_used') return { icon: Ticket, bg: 'bg-forest/15', color: 'text-forest' }
  return { icon: Users, bg: 'bg-warning/15', color: 'text-status-warning' }
}

function groupByDate(entries: typeof activityEntries) {
  const groups: Record<string, typeof activityEntries> = {}
  entries.forEach(e => {
    const date = new Date(e.timestamp).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric'
    })
    if (!groups[date]) groups[date] = []
    groups[date].push(e)
  })
  return groups
}

export default function ActivityPage() {
  const [filter, setFilter] = useState('All')

  const filtered = activityEntries.filter(e => {
    if (filter === 'All') return true
    if (filter === 'Entry') return e.type === 'entry'
    if (filter === 'Exit') return e.type === 'exit'
    if (filter === 'Pass') return e.type === 'pass_used'
    if (filter === 'Alert') return e.status === 'denied' || e.type === 'vehicle_flagged'
    return true
  })

  const grouped = groupByDate(filtered)

  const formatTime = (ts: string) =>
    new Date(ts).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="min-h-screen bg-sand-50">
      <PageHeader
        title="Activity History"
        subtitle="All gate events"
      />

      {/* Stats row */}
      <div className="px-5 mb-4">
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Total', value: activityEntries.length, color: 'text-ink' },
            { label: 'Entry', value: activityEntries.filter(e => e.type === 'entry').length, color: 'text-status-active' },
            { label: 'Exit', value: activityEntries.filter(e => e.type === 'exit').length, color: 'text-sand-400' },
            { label: 'Alerts', value: activityEntries.filter(e => e.status === 'denied').length, color: 'text-status-danger' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-sand-200 rounded-2xl p-3 text-center">
              <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-[10px] text-sand-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="px-5 mb-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap border transition-all flex-shrink-0 ${
                filter === f
                  ? 'bg-forest border-forest text-ink'
                  : 'bg-white border-sand-200 text-sand-400 hover:border-sand-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Activity list */}
      <div className="px-5 pb-32">
        {Object.entries(grouped).map(([date, entries]) => (
          <div key={date} className="mb-5">
            <div className="flex items-center gap-2 mb-2.5">
              <Calendar size={12} className="text-sand-400" />
              <p className="text-xs font-bold text-sand-400 uppercase tracking-wide">{date}</p>
            </div>
            <div className="flex flex-col gap-2">
              {entries.map((entry, i) => {
                const { icon: Icon, bg, color } = getIcon(entry.type, entry.status)
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="bg-white border border-sand-200 rounded-2xl p-4 flex items-start gap-3"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${bg}`}>
                      <Icon size={18} className={color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-ink text-sm font-semibold leading-tight">
                          {entry.description}
                        </p>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span className="text-xs text-sand-400">{formatTime(entry.timestamp)}</span>
                          {entry.status === 'denied' && (
                            <Badge label="Denied" variant="danger" size="sm" />
                          )}
                        </div>
                      </div>
                      <p className="text-sand-400 text-xs mt-1">{entry.gate}</p>
                      {(entry.vehicle || entry.person) && (
                        <p className="text-sand-400 text-xs mt-0.5 font-medium">
                          {entry.vehicle || entry.person}
                        </p>
                      )}
                      {entry.details && (
                        <p className="text-sand-300 text-xs mt-0.5 italic">{entry.details}</p>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
              <Filter size={24} className="text-sand-300" />
            </div>
            <p className="text-sand-400 font-semibold">No {filter.toLowerCase()} events</p>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
