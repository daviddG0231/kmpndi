'use client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Users, Bell, Shield, Settings, ChevronRight,
  Phone, Mail, Building2, UserPen, LogOut, Repeat, Home
} from 'lucide-react'
import BottomNav from '@/components/layout/BottomNav'
import { currentUser, userUnits, vehicles, guestPasses } from '@/lib/mock-data'

export default function ProfilePage() {
  const router = useRouter()
  const activePasses = guestPasses.filter(p => p.status === 'active').length
  const activeUnit = userUnits.find(u => u.id === currentUser.activeUnitId)!

  const menuSections = [
    {
      title: 'Properties',
      items: [
        { label: 'Switch Property', desc: `${userUnits.length} properties`, icon: Repeat, path: '/select-property', badge: userUnits.length },
        { label: 'My Units', desc: `Currently: Unit ${activeUnit.unit}`, icon: Home, path: '/select-property' },
      ]
    },
    {
      title: 'Manage',
      items: [
        { label: 'Family Members', desc: '3 members', icon: Users, path: '/profile/family', badge: 1 },
        { label: 'Notifications', desc: 'Alerts & preferences', icon: Bell, path: '/notifications' },
        { label: 'Security', desc: 'PIN, biometrics', icon: Shield, path: '/profile/settings' },
      ]
    },
    {
      title: 'Settings',
      items: [
        { label: 'App Settings', desc: 'Language, theme', icon: Settings, path: '/profile/settings' },
        { label: 'Edit Profile', desc: 'Name, email, phone', icon: UserPen, path: '/profile/settings' },
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-sand-50">
      <div className="px-5 pt-14 pb-2 flex items-end justify-between">
        <h1 className="text-xl font-bold text-ink">Profile</h1>
        <button
          onClick={() => router.push('/profile/settings')}
          className="w-10 h-10 rounded-xl bg-white border border-sand-200 flex items-center justify-center shadow-card"
        >
          <Settings size={18} className="text-ink" strokeWidth={1.6} />
        </button>
      </div>

      <div className="px-5 pt-4">
        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-sand-200 rounded-2xl p-5 shadow-card mb-4"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-forest flex items-center justify-center flex-shrink-0">
              <span className="text-white text-lg font-bold">
                {currentUser.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1">
              <h2 className="text-ink font-bold">{currentUser.name}</h2>
              <div className="flex items-center gap-1.5 mt-0.5">
                <Building2 size={11} className="text-sand-400" />
                <span className="text-xs text-sand-400">Unit {currentUser.unit} · {currentUser.building}</span>
              </div>
              <span className="text-[10px] font-semibold bg-gold-50 text-gold-dark px-2 py-0.5 rounded-full mt-1.5 inline-block">
                ★ Member since March 2022
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <Phone size={12} />
              <span>{currentUser.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-muted">
              <Mail size={12} />
              <span>{currentUser.email}</span>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {[
            { label: 'Vehicles', value: vehicles.length },
            { label: 'Active Passes', value: activePasses },
            { label: 'Family', value: 3 },
          ].map(s => (
            <div key={s.label} className="bg-white border border-sand-200 rounded-xl py-3 text-center shadow-card">
              <p className="text-lg font-bold font-mono text-ink">{s.value}</p>
              <p className="text-[10px] text-sand-400 font-medium uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Menu sections */}
        {menuSections.map(section => (
          <div key={section.title} className="mb-4">
            <p className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-2 px-1">
              {section.title}
            </p>
            <div className="bg-white border border-sand-200 rounded-2xl divide-y divide-sand-100 shadow-card overflow-hidden">
              {section.items.map(item => (
                <button
                  key={item.label}
                  onClick={() => router.push(item.path)}
                  className="w-full flex items-center gap-3.5 px-4 py-3.5 hover:bg-sand-50 transition-colors text-left"
                >
                  <div className="w-9 h-9 rounded-xl bg-sand-100 flex items-center justify-center flex-shrink-0">
                    <item.icon size={16} className="text-ink" strokeWidth={1.6} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink">{item.label}</p>
                    <p className="text-xs text-sand-400">{item.desc}</p>
                  </div>
                  {'badge' in item && item.badge && (
                    <span className="w-5 h-5 bg-forest text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight size={14} className="text-sand-300" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Sign out */}
        <button className="w-full flex items-center justify-center gap-2 py-3 text-status-danger text-sm font-semibold mb-32">
          <LogOut size={16} />
          Sign Out
        </button>

        <div className="text-center pb-4">
          <p className="text-[10px] text-sand-300 font-mono">Kmpndi v1.0.0 · {currentUser.compound}</p>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
