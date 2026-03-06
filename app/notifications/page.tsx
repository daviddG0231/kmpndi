'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/layout/PageHeader'
import { notifications as initialNotifications } from '@/lib/mock-data'
import { ArrowDownLeft, ArrowUpRight, Ticket, Shield, Bell } from 'lucide-react'

function NotifIcon({ type }: { type: string }) {
  const cls = "text-white"
  const size = 16
  if (type === 'entry') return <ArrowDownLeft size={size} className={cls} />
  if (type === 'exit') return <ArrowUpRight size={size} className={cls} />
  if (type === 'pass') return <Ticket size={size} className={cls} />
  if (type === 'security') return <Shield size={size} className={cls} />
  return <Bell size={size} className={cls} />
}

function iconBg(type: string) {
  if (type === 'entry') return 'bg-sys-green'
  if (type === 'exit') return 'bg-sys-orange'
  if (type === 'pass') return 'bg-sys-blue'
  if (type === 'security') return 'bg-sys-red'
  return 'bg-txt-tertiary'
}

function formatTime(ts: string) {
  const d = new Date(ts)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const hours = Math.floor(diff / 3600000)
  if (hours < 1) return 'Just now'
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days === 1) return 'Yesterday'
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export default function NotificationsPage() {
  const router = useRouter()
  const [notifs, setNotifs] = useState(initialNotifications)
  const unreadCount = notifs.filter(n => !n.read).length

  function markAllRead() {
    setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  }

  return (
    <div className="phone-frame bg-bg min-h-screen pb-10">
      <PageHeader
        title="Notifications"
        backPath="/home"
        rightAction={
          unreadCount > 0 ? (
            <button onClick={markAllRead} className="text-[13px] text-accent font-medium">
              Mark all read
            </button>
          ) : undefined
        }
      />

      <div className="px-4 pb-6">
        {unreadCount > 0 && (
          <p className="text-[13px] text-txt-secondary mb-3">
            <span className="font-mono font-semibold text-txt">{unreadCount}</span> unread
          </p>
        )}

        <div className="bg-surface rounded-[12px] divide-y divide-sep overflow-hidden">
          {notifs.map(notif => (
            <div
              key={notif.id}
              className={`px-4 py-3.5 flex items-start gap-3 ${!notif.read ? 'bg-accent-light' : ''}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${iconBg(notif.type)}`}>
                <NotifIcon type={notif.type} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className={`text-[14px] text-txt ${!notif.read ? 'font-semibold' : ''}`}>{notif.title}</p>
                  <span className="text-[11px] font-mono text-txt-tertiary shrink-0 mt-0.5">
                    {formatTime(notif.timestamp)}
                  </span>
                </div>
                <p className="text-[13px] text-txt-secondary mt-0.5 line-clamp-2">{notif.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
