'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bell, Globe, Moon, Shield, Smartphone, Vibrate,
  ChevronRight, Check
} from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'

interface ToggleProps {
  checked: boolean
  onChange: (v: boolean) => void
}

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
        checked ? 'bg-forest' : 'bg-sand-100'
      }`}
    >
      <motion.div
        animate={{ x: checked ? 24 : 2 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow"
      />
    </button>
  )
}

interface SettingRowProps {
  icon: React.ElementType
  label: string
  sublabel?: string
  toggle?: boolean
  checked?: boolean
  onToggle?: (v: boolean) => void
  value?: string
  onClick?: () => void
  iconColor?: string
}

function SettingRow({ icon: Icon, label, sublabel, toggle, checked, onToggle, value, onClick, iconColor = 'text-forest' }: SettingRowProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 py-4 border-b border-white/5 last:border-0 ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0">
        <Icon size={18} className={iconColor} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-ink">{label}</p>
        {sublabel && <p className="text-xs text-sand-400 mt-0.5">{sublabel}</p>}
      </div>
      {toggle && onToggle !== undefined && (
        <Toggle checked={!!checked} onChange={onToggle} />
      )}
      {value && (
        <div className="flex items-center gap-1.5">
          <span className="text-sand-400 text-sm">{value}</span>
          {onClick && <ChevronRight size={14} className="text-sand-300" />}
        </div>
      )}
    </div>
  )
}

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    pushEntry: true,
    pushExit: true,
    pushPass: true,
    pushSecurity: true,
    sound: true,
    vibration: true,
    biometric: false,
    darkMode: true,
    language: 'English',
    twoFactor: false,
  })

  const set = (key: keyof typeof settings) => (val: boolean) =>
    setSettings(s => ({ ...s, [key]: val }))

  return (
    <div className="min-h-screen bg-sand-50">
      <PageHeader title="Settings" backPath="/profile" />

      <div className="px-5 pb-8 space-y-5">
        {/* Notifications */}
        <section>
          <p className="text-xs font-bold text-sand-400 uppercase tracking-widest mb-2">Notifications</p>
          <div className="bg-white border border-sand-200 rounded-2xl px-5">
            <SettingRow icon={Bell} label="Entry Alerts" sublabel="When your vehicle enters" toggle checked={settings.pushEntry} onToggle={set('pushEntry')} iconColor="text-status-active" />
            <SettingRow icon={Bell} label="Exit Alerts" sublabel="When your vehicle exits" toggle checked={settings.pushExit} onToggle={set('pushExit')} iconColor="text-sand-400" />
            <SettingRow icon={Bell} label="Pass Used" sublabel="When a guest pass is scanned" toggle checked={settings.pushPass} onToggle={set('pushPass')} iconColor="text-forest-light" />
            <SettingRow icon={Shield} label="Security Alerts" sublabel="Denied entries & flagged vehicles" toggle checked={settings.pushSecurity} onToggle={set('pushSecurity')} iconColor="text-status-danger" />
          </div>
        </section>

        {/* Sound & Haptics */}
        <section>
          <p className="text-xs font-bold text-sand-400 uppercase tracking-widest mb-2">Sound & Haptics</p>
          <div className="bg-white border border-sand-200 rounded-2xl px-5">
            <SettingRow icon={Smartphone} label="Notification Sound" toggle checked={settings.sound} onToggle={set('sound')} />
            <SettingRow icon={Vibrate} label="Vibration" toggle checked={settings.vibration} onToggle={set('vibration')} />
          </div>
        </section>

        {/* Security */}
        <section>
          <p className="text-xs font-bold text-sand-400 uppercase tracking-widest mb-2">Security</p>
          <div className="bg-white border border-sand-200 rounded-2xl px-5">
            <SettingRow icon={Shield} label="Biometric Login" sublabel="Face ID / Fingerprint" toggle checked={settings.biometric} onToggle={set('biometric')} iconColor="text-status-active" />
            <SettingRow icon={Shield} label="Two-Factor Auth" sublabel="Extra SMS verification" toggle checked={settings.twoFactor} onToggle={set('twoFactor')} iconColor="text-status-warning" />
          </div>
        </section>

        {/* Appearance */}
        <section>
          <p className="text-xs font-bold text-sand-400 uppercase tracking-widest mb-2">Appearance</p>
          <div className="bg-white border border-sand-200 rounded-2xl px-5">
            <SettingRow
              icon={Moon}
              label="Dark Mode"
              sublabel="Optimized for outdoor use"
              toggle
              checked={settings.darkMode}
              onToggle={set('darkMode')}
              iconColor="text-sand-400"
            />
            <SettingRow
              icon={Globe}
              label="Language"
              value={settings.language}
              onClick={() => {}}
              iconColor="text-blue-400"
            />
          </div>
        </section>

        {/* Language picker */}
        <section>
          <p className="text-xs font-bold text-sand-400 uppercase tracking-widest mb-2">Language</p>
          <div className="bg-white border border-sand-200 rounded-2xl px-5">
            {['English', 'العربية'].map(lang => (
              <button
                key={lang}
                onClick={() => setSettings(s => ({ ...s, language: lang }))}
                className="w-full flex items-center justify-between py-4 border-b border-white/5 last:border-0"
              >
                <span className="text-sm font-semibold text-ink">{lang}</span>
                {settings.language === lang && (
                  <Check size={18} className="text-forest" />
                )}
              </button>
            ))}
          </div>
        </section>

        {/* About */}
        <section>
          <p className="text-xs font-bold text-sand-400 uppercase tracking-widest mb-2">About</p>
          <div className="bg-white border border-sand-200 rounded-2xl px-5">
            <SettingRow icon={Smartphone} label="Version" value="1.0.0" iconColor="text-sand-400" />
          </div>
        </section>
      </div>
    </div>
  )
}
