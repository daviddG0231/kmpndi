'use client'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/layout/PageHeader'
import BottomNav from '@/components/layout/BottomNav'
import Badge from '@/components/ui/Badge'
import {
  ChevronRight, Users, Bell, Shield, Settings, Edit3,
  Building2, Home
} from 'lucide-react'
import { currentUser } from '@/lib/mock-data'

function MenuRow({
  icon, label, badge, onPress,
}: {
  icon: React.ReactNode
  label: string
  badge?: string
  onPress: () => void
}) {
  return (
    <button
      onClick={onPress}
      className="w-full px-4 py-3.5 flex items-center gap-3 text-left active:bg-fill transition-colors"
    >
      <div className="w-8 h-8 rounded-[8px] bg-accent-light flex items-center justify-center shrink-0">
        {icon}
      </div>
      <span className="flex-1 text-[15px] text-txt">{label}</span>
      {badge && <Badge label={badge} variant="red" />}
      <ChevronRight size={16} className="text-txt-tertiary shrink-0" />
    </button>
  )
}

export default function ProfilePage() {
  const router = useRouter()
  const user = currentUser
  const initials = user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
  const memberSince = new Date(user.memberSince).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
  const activeUnit = user.units.find(u => u.id === user.activeUnitId)!

  return (
    <div className="phone-frame bg-bg min-h-screen safe-bottom">
      <PageHeader title={user.name} large />

      <div className="px-4 pb-6 space-y-5">
        {/* Avatar + Info */}
        <div className="bg-surface rounded-[12px] p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shrink-0">
            <span className="text-[22px] font-bold text-white">{initials}</span>
          </div>
          <div className="min-w-0">
            <p className="text-[17px] font-semibold text-txt truncate">{user.name}</p>
            <p className="text-[13px] text-txt-secondary font-mono">{user.phone}</p>
            <p className="text-[13px] text-txt-secondary truncate">{user.email}</p>
            <p className="text-[12px] text-txt-tertiary mt-0.5">Member since {memberSince}</p>
          </div>
        </div>

        {/* Properties */}
        <div>
          <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-1.5">Properties</p>
          <div className="bg-surface rounded-[12px] divide-y divide-sep">
            {user.units.map(unit => (
              <div
                key={unit.id}
                className={`px-4 py-3.5 flex items-center gap-3 ${unit.id === user.activeUnitId ? 'bg-accent-light' : ''}`}
              >
                <div className={`w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 ${unit.id === user.activeUnitId ? 'bg-accent' : 'bg-fill'}`}>
                  <Home size={16} className={unit.id === user.activeUnitId ? 'text-white' : 'text-txt-tertiary'} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium text-txt">Unit {unit.unit} · {unit.building}</p>
                  <p className="text-[12px] text-txt-secondary">{unit.compound}</p>
                </div>
                {unit.id === user.activeUnitId && <Badge label="Active" variant="green" />}
                {unit.isDefault && unit.id !== user.activeUnitId && <Badge label="Default" variant="blue" />}
              </div>
            ))}
          </div>
        </div>

        {/* Menu sections */}
        <div>
          <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-1.5">Account</p>
          <div className="bg-surface rounded-[12px] divide-y divide-sep">
            <MenuRow
              icon={<Edit3 size={16} className="text-accent" />}
              label="Edit Profile"
              onPress={() => {}}
            />
            <MenuRow
              icon={<Building2 size={16} className="text-accent" />}
              label="Manage Properties"
              onPress={() => router.push('/select-property')}
            />
          </div>
        </div>

        <div>
          <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-1.5">Household</p>
          <div className="bg-surface rounded-[12px] divide-y divide-sep">
            <MenuRow
              icon={<Users size={16} className="text-accent" />}
              label="Family Members"
              onPress={() => router.push('/profile/family')}
            />
          </div>
        </div>

        <div>
          <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-1.5">Preferences</p>
          <div className="bg-surface rounded-[12px] divide-y divide-sep">
            <MenuRow
              icon={<Bell size={16} className="text-accent" />}
              label="Notifications"
              onPress={() => router.push('/notifications')}
            />
            <MenuRow
              icon={<Shield size={16} className="text-accent" />}
              label="Security"
              onPress={() => {}}
            />
            <MenuRow
              icon={<Settings size={16} className="text-accent" />}
              label="App Settings"
              onPress={() => router.push('/profile/settings')}
            />
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
