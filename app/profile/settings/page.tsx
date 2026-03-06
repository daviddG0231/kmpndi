'use client'
import { useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'

function ToggleRow({ label, description, value, onChange }: {
  label: string
  description?: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="px-4 py-3.5 flex items-center justify-between gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-[15px] text-txt">{label}</p>
        {description && <p className="text-[12px] text-txt-secondary mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-[50px] h-[30px] rounded-full transition-colors shrink-0 ${value ? 'bg-accent' : 'bg-fill'}`}
      >
        <div
          className={`absolute top-[3px] w-6 h-6 bg-white rounded-full transition-transform ${value ? 'translate-x-[22px]' : 'translate-x-[3px]'}`}
        />
      </button>
    </div>
  )
}

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    entryAlerts: true,
    passAlerts: true,
    securityAlerts: true,
    biometric: false,
    analytics: false,
  })

  function toggle(key: keyof typeof settings) {
    return (v: boolean) => setSettings(s => ({ ...s, [key]: v }))
  }

  return (
    <div className="phone-frame bg-bg min-h-screen pb-10">
      <PageHeader title="Settings" backPath="/profile" />

      <div className="px-4 pb-6 space-y-5">
        {/* Notifications */}
        <div>
          <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-1.5">Notifications</p>
          <div className="bg-surface rounded-[12px] divide-y divide-sep">
            <ToggleRow
              label="Push Notifications"
              description="Receive alerts on this device"
              value={settings.pushNotifications}
              onChange={toggle('pushNotifications')}
            />
            <ToggleRow
              label="Entry & Exit Alerts"
              value={settings.entryAlerts}
              onChange={toggle('entryAlerts')}
            />
            <ToggleRow
              label="Guest Pass Alerts"
              value={settings.passAlerts}
              onChange={toggle('passAlerts')}
            />
            <ToggleRow
              label="Security Alerts"
              description="Flagged vehicles and unusual activity"
              value={settings.securityAlerts}
              onChange={toggle('securityAlerts')}
            />
          </div>
        </div>

        {/* Security */}
        <div>
          <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-1.5">Security</p>
          <div className="bg-surface rounded-[12px] divide-y divide-sep">
            <ToggleRow
              label="Biometric Login"
              description="Use Face ID or fingerprint"
              value={settings.biometric}
              onChange={toggle('biometric')}
            />
          </div>
        </div>

        {/* Preferences */}
        <div>
          <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-1.5">App</p>
          <div className="bg-surface rounded-[12px] divide-y divide-sep">
            <ToggleRow
              label="Usage Analytics"
              description="Help improve the app"
              value={settings.analytics}
              onChange={toggle('analytics')}
            />
          </div>
        </div>

        {/* Version */}
        <div className="pt-4 text-center">
          <p className="text-[12px] text-txt-tertiary">Kmpndi v1.0.0</p>
          <p className="text-[11px] text-txt-tertiary mt-0.5 font-mono">Build 2026.03.06</p>
        </div>
      </div>
    </div>
  )
}
