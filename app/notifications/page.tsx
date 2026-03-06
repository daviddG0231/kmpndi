'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowDownLeft, ArrowUpRight, Ticket, Shield, Bell,
  Check, CheckCheck, Trash2
} from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import BottomNav from '@/components/layout/BottomNav'
import { notifications as initialNotifs } from '@/lib/mock-data'
import type { Notification } from '@/lib/types'

const typeConfig = {
  entry: { icon: ArrowDownLeft, bg: 'bg-status-active/15', color: 'text-status-active' },
  exit: { icon: ArrowUpRight, bg: 'bg-slate-500/15', color: 'text-sand-400' },
  pass: { icon: Ticket, bg: 'bg-forest/15', color: 'text-forest-light' },
  security: { icon: Shield, bg: 'bg-status-danger/15', color: 'text-status-danger' },
  system: { icon: Bell, bg: 'bg-warning/15', color: 'text-status-warning' },
}

function formatTime(ts: string) {
  const d = new Date(ts)
  const now = new Date('2026-03-06T14:00:00')
  const diff = (now.getTime() - d.getTime()) / 60000
  if (diff < 60) return `${Math.round(diff)}m ago`
  if (diff < 1440) return `${Math.round(diff / 60)}h ago`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifs)

  const markAllRead = () => setNotifs(ns => ns.map(n => ({ ...n, read: true })))
  const dismiss = (id: string) => setNotifs(ns => ns.filter(n => n.id !== id))
  const markRead = (id: string) => setNotifs(ns => ns.map(n => n.id === id ? { ...n, read: true } : n))

  const unread = notifs.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-sand-50">
      <PageHeader
        title="Notifications"
        subtitle={unread > 0 ? `${unread} unread` : 'All caught up'}
        rightAction={
          unread > 0 ? (
            <button
              onClick={markAllRead}
              className="flex items-center gap-1.5 text-xs text-forest-light font-semibold bg-forest/10 border border-forest/20 rounded-xl px-3 py-2"
            >
              <CheckCheck size={14} />
              Mark all read
            </button>
          ) : null
        }
      />

      <div className="px-5 pb-32">
        {/* Unread section */}
        {unread > 0 && (
          <div className="mb-5">
            <p className="text-xs font-bold text-sand-400 uppercase tracking-widest mb-3">
              New · {unread}
            </p>
            <div className="flex flex-col gap-2">
              <AnimatePresence>
                {notifs.filter(n => !n.read).map(notif => {
                  const { icon: Icon, bg, color } = typeConfig[notif.type]
                  return (
                    <motion.div
                      key={notif.id}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, height: 0, margin: 0 }}
                      onClick={() => markRead(notif.id)}
                      className="relative bg-white border border-forest/20 rounded-2xl p-4 flex items-start gap-3 cursor-pointer"
                    >
                      <div className="absolute top-3 right-3 w-2 h-2 bg-forest rounded-full" />
                      <div className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 ${bg}`}>
                        <Icon size={20} className={color} />
                      </div>
                      <div className="flex-1 min-w-0 pr-4">
                        <p className="text-ink font-bold text-sm leading-tight">{notif.title}</p>
                        <p className="text-sand-400 text-xs mt-1 leading-relaxed">{notif.body}</p>
                        <p className="text-sand-300 text-xs mt-1.5">{formatTime(notif.timestamp)}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* Read section */}
        <div>
          <p className="text-xs font-bold text-sand-400 uppercase tracking-widest mb-3">Earlier</p>
          <div className="flex flex-col gap-2">
            <AnimatePresence>
              {notifs.filter(n => n.read).map(notif => {
                const { icon: Icon, bg, color } = typeConfig[notif.type]
                return (
                  <motion.div
                    key={notif.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0, margin: 0 }}
                    className="bg-white/60 border border-white/5 rounded-2xl p-4 flex items-start gap-3"
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 opacity-60 ${bg}`}>
                      <Icon size={18} className={color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-ink-muted font-semibold text-sm">{notif.title}</p>
                      <p className="text-sand-400 text-xs mt-0.5 leading-relaxed">{notif.body}</p>
                      <p className="text-sand-300 text-xs mt-1.5">{formatTime(notif.timestamp)}</p>
                    </div>
                    <button
                      onClick={() => dismiss(notif.id)}
                      className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/5 transition-colors flex-shrink-0"
                    >
                      <Trash2 size={13} className="text-sand-300 hover:text-status-danger transition-colors" />
                    </button>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        {notifs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-20 gap-3"
          >
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-2">
              <Bell size={36} className="text-sand-300" />
            </div>
            <p className="text-sand-400 font-bold text-lg">No notifications</p>
            <p className="text-sand-300 text-sm">You're all caught up!</p>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
