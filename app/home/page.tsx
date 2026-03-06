'use client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Car, Ticket, Users, Clock, Bell, ChevronRight,
  ArrowUpRight, ArrowDownLeft, AlertCircle, Plus, ParkingSquare, Repeat
} from 'lucide-react'
import BottomNav from '@/components/layout/BottomNav'
import { currentUser, userUnits, vehicles, guestPasses, activityEntries, notifications } from '@/lib/mock-data'

const stagger = { animate: { transition: { staggerChildren: 0.06 } } }
const fadeUp = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
}

export default function HomePage() {
  const router = useRouter()
  const activeUnit = userUnits.find(u => u.id === currentUser.activeUnitId)!
  const sameCompoundUnits = userUnits.filter(u => u.compoundId === activeUnit.compoundId)
  const unread = notifications.filter(n => !n.read).length
  const activeVehicles = vehicles.filter(v => v.status === 'active').length
  const activePasses = guestPasses.filter(p => p.status === 'active').length
  const recent = activityEntries.slice(0, 4)

  const getActivityIcon = (type: string, status: string) => {
    if (status === 'denied') return <AlertCircle size={14} className="text-status-danger" />
    if (type === 'entry') return <ArrowDownLeft size={14} className="text-status-active" />
    if (type === 'exit') return <ArrowUpRight size={14} className="text-ink-muted" />
    return <Ticket size={14} className="text-forest" />
  }

  const formatTime = (ts: string) => {
    const d = new Date(ts)
    const now = new Date('2026-03-06T14:00:00')
    const diff = (now.getTime() - d.getTime()) / 60000
    if (diff < 60) return `${Math.round(diff)}m`
    if (diff < 1440) return `${Math.round(diff / 60)}h`
    return `${Math.round(diff / 1440)}d`
  }

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Header */}
      <div className="px-5 pt-14 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-ink-muted mb-0.5">Good afternoon</p>
            <h1 className="text-xl font-bold text-ink">
              {currentUser.name.split(' ')[0]}
            </h1>
            <p className="text-xs text-sand-400 mt-0.5 font-mono">
              {currentUser.building} · Unit {currentUser.unit}
            </p>
          </div>
          <button
            onClick={() => router.push('/notifications')}
            className="relative w-10 h-10 rounded-xl bg-white border border-sand-200 flex items-center justify-center shadow-card"
          >
            <Bell size={18} className="text-ink" strokeWidth={1.6} />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-status-danger rounded-full text-[9px] font-bold text-white flex items-center justify-center" style={{width:18,height:18}}>
                {unread}
              </span>
            )}
          </button>
        </div>
      </div>

      <motion.div
        variants={stagger}
        initial="initial"
        animate="animate"
        className="px-5 pt-4"
      >
        {/* Compound card */}
        <motion.div
          variants={fadeUp}
          className="bg-forest rounded-2xl p-5 mb-5"
        >
          <div className="flex items-center justify-between mb-1">
            <p className="text-white/60 text-xs font-medium uppercase tracking-wider">Your property</p>
            <button
              onClick={() => router.push('/select-property')}
              className="flex items-center gap-1 text-[10px] font-semibold bg-white/15 text-white px-2.5 py-1 rounded-full hover:bg-white/25 transition-colors"
            >
              <Repeat size={10} /> Switch
            </button>
          </div>
          <p className="text-white text-lg font-bold">{activeUnit.compound}</p>
          <p className="text-white/50 text-xs mb-4">
            Unit {activeUnit.unit} · {activeUnit.building}
            {sameCompoundUnits.length > 1 && (
              <span className="text-gold-light ml-1">
                (+{sameCompoundUnits.length - 1} more unit{sameCompoundUnits.length > 2 ? 's' : ''})
              </span>
            )}
          </p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'Vehicles', value: activeVehicles },
              { label: 'Passes', value: activePasses },
              { label: 'Parking', value: `${activeUnit.parkingUsed}/${activeUnit.parkingAllowance}` },
            ].map(s => (
              <div key={s.label} className="bg-white/10 rounded-xl px-3 py-2.5 text-center">
                <p className="text-white font-bold text-lg font-mono">{s.value}</p>
                <p className="text-white/50 text-[10px] font-medium uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Action — Guest Pass (prominent) */}
        <motion.div variants={fadeUp}>
          <button
            onClick={() => router.push('/passes/create')}
            className="w-full bg-gold-50 border-2 border-gold/30 rounded-2xl p-4 flex items-center gap-4 mb-5 hover:border-gold/50 transition-all active:scale-[0.99]"
          >
            <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center flex-shrink-0">
              <Plus size={22} className="text-gold-dark" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-ink font-bold text-sm">Create Guest Pass</p>
              <p className="text-ink-muted text-xs mt-0.5">Generate a QR code for visitors</p>
            </div>
            <ChevronRight size={16} className="text-gold-dark flex-shrink-0" />
          </button>
        </motion.div>

        {/* Grid actions */}
        <motion.div variants={fadeUp} className="grid grid-cols-4 gap-2.5 mb-6">
          {[
            { label: 'Vehicles', icon: Car, path: '/vehicles', count: activeVehicles },
            { label: 'Passes', icon: Ticket, path: '/passes', count: activePasses },
            { label: 'Parking', icon: ParkingSquare, path: '/parking', count: 2 },
            { label: 'Visitor', icon: Users, path: '/visitor', count: null },
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => router.push(item.path)}
              className="bg-white border border-sand-200 rounded-2xl p-3 flex flex-col items-center gap-2 shadow-card hover:shadow-card-hover hover:border-sand-300 transition-all active:scale-[0.97]"
            >
              <div className="w-10 h-10 rounded-xl bg-sand-100 flex items-center justify-center">
                <item.icon size={18} className="text-ink" strokeWidth={1.6} />
              </div>
              <p className="text-[11px] font-semibold text-ink">{item.label}</p>
              {item.count !== null && (
                <span className="text-[10px] font-mono font-bold text-forest bg-forest-50 px-2 py-0.5 rounded-full">
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Recent Activity */}
        <motion.div variants={fadeUp} className="mb-32">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold text-ink-muted uppercase tracking-wider">
              Recent activity
            </h2>
            <button
              onClick={() => router.push('/activity')}
              className="text-xs text-forest font-semibold"
            >
              See all →
            </button>
          </div>
          <div className="bg-white border border-sand-200 rounded-2xl divide-y divide-sand-100 shadow-card overflow-hidden">
            {recent.map((item) => (
              <button
                key={item.id}
                onClick={() => router.push('/activity')}
                className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-sand-50 transition-colors text-left"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  item.status === 'denied' ? 'bg-red-50' :
                  item.type === 'entry' ? 'bg-green-50' :
                  item.type === 'exit' ? 'bg-sand-100' : 'bg-forest-50'
                }`}>
                  {getActivityIcon(item.type, item.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-ink text-sm font-medium truncate">{item.description}</p>
                  <p className="text-sand-400 text-xs truncate">
                    {item.gate} · {item.vehicle || item.person || ''}
                  </p>
                </div>
                <span className="text-[11px] text-sand-400 font-mono flex-shrink-0">{formatTime(item.timestamp)}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <BottomNav />
    </div>
  )
}
