'use client'
import { useRouter } from 'next/navigation'
import BottomNav from '@/components/layout/BottomNav'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import {
  Bell, ArrowUpRight, ArrowDownLeft, Car, Ticket,
  ParkingCircle, Users, RefreshCw, ChevronRight, AlertCircle
} from 'lucide-react'
import { currentUser, vehicles, guestPasses, activityEntries, parkingSpots } from '@/lib/mock-data'

function formatTime(ts: string) {
  const d = new Date(ts)
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })
}

export default function HomePage() {
  const router = useRouter()
  const firstName = currentUser.name.split(' ')[0]
  const activeUnit = currentUser.units.find(u => u.id === currentUser.activeUnitId)!
  const activeVehicles = vehicles.filter(v => v.status === 'active').length
  const activePasses = guestPasses.filter(p => p.status === 'active').length
  const occupiedSpots = parkingSpots.filter(s => s.isOccupied).length

  const recentActivity = activityEntries.slice(0, 4)

  function activityIcon(type: string, status: string) {
    if (status === 'denied') return <AlertCircle size={16} className="text-sys-red" />
    if (type === 'entry') return <ArrowDownLeft size={16} className="text-sys-green" />
    if (type === 'exit') return <ArrowUpRight size={16} className="text-sys-orange" />
    return <Ticket size={16} className="text-sys-blue" />
  }

  return (
    <div className="phone-frame bg-bg min-h-screen safe-bottom">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-bg/80 backdrop-blur-xl px-4 pt-14 pb-2">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight text-txt">Hello, {firstName}</h1>
            <p className="text-[14px] text-txt-secondary mt-0.5">
              Unit {activeUnit.unit} · {activeUnit.building}
            </p>
          </div>
          <button
            onClick={() => router.push('/notifications')}
            className="mt-1 w-[38px] h-[38px] rounded-full bg-fill flex items-center justify-center relative"
          >
            <Bell size={20} className="text-txt-secondary" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sys-red rounded-full" />
          </button>
        </div>
      </div>

      <div className="px-4 pb-4 space-y-4">
        {/* Property card */}
        <div className="bg-accent rounded-[16px] p-4 text-white">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/60 mb-1">Active Property</p>
          <p className="text-[18px] font-bold">{activeUnit.compound}</p>
          <p className="text-[13px] text-white/70 mt-0.5">Unit {activeUnit.unit} · {activeUnit.building}</p>
          <button
            onClick={() => router.push('/select-property')}
            className="mt-3 flex items-center gap-1 text-[12px] text-white/80 font-medium"
          >
            <RefreshCw size={12} />
            Switch property
          </button>
        </div>

        {/* Stats */}
        <Card padding={false}>
          <div className="flex divide-x divide-sep">
            <div className="flex-1 py-4 flex flex-col items-center">
              <span className="text-[22px] font-mono font-bold text-txt">{activeVehicles}</span>
              <span className="text-[11px] text-txt-secondary mt-0.5">Vehicles</span>
            </div>
            <div className="flex-1 py-4 flex flex-col items-center">
              <span className="text-[22px] font-mono font-bold text-txt">{activePasses}</span>
              <span className="text-[11px] text-txt-secondary mt-0.5">Passes</span>
            </div>
            <div className="flex-1 py-4 flex flex-col items-center">
              <span className="text-[22px] font-mono font-bold text-txt">{occupiedSpots}</span>
              <span className="text-[11px] text-txt-secondary mt-0.5">Parking</span>
            </div>
          </div>
        </Card>

        {/* New Guest Pass */}
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={() => router.push('/passes/create')}
          icon={<Ticket size={18} />}
        >
          New Guest Pass
        </Button>

        {/* Quick actions */}
        <div>
          <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-1.5">Quick Actions</p>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: 'Visitor', icon: <Users size={22} className="text-accent" />, path: '/visitor' },
              { label: 'Parking', icon: <ParkingCircle size={22} className="text-accent" />, path: '/parking' },
              { label: 'Activity', icon: <ArrowDownLeft size={22} className="text-accent" />, path: '/activity' },
              { label: 'Family', icon: <Users size={22} className="text-accent" />, path: '/profile/family' },
            ].map(item => (
              <button
                key={item.label}
                onClick={() => router.push(item.path)}
                className="bg-surface rounded-[12px] p-3 flex flex-col items-center gap-1.5 active:bg-fill"
              >
                {item.icon}
                <span className="text-[11px] text-txt-secondary font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide">Recent Activity</p>
            <button onClick={() => router.push('/activity')} className="text-[13px] text-accent">See all</button>
          </div>
          <div className="bg-surface rounded-[12px] divide-y divide-sep">
            {recentActivity.map(entry => (
              <div key={entry.id} className="px-4 py-3.5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-fill flex items-center justify-center shrink-0">
                  {activityIcon(entry.type, entry.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] text-txt truncate">{entry.description}</p>
                  <p className="text-[12px] text-txt-tertiary">{entry.gate}</p>
                </div>
                <span className="text-[12px] font-mono text-txt-tertiary shrink-0">
                  {formatTime(entry.timestamp)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
