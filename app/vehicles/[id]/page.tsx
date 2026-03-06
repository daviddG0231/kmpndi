'use client'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Car, Bike, Star, Clock, Shield, Trash2, AlertCircle, Edit3 } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { vehicles } from '@/lib/mock-data'

export default function VehicleDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const vehicle = vehicles.find(v => v.id === id) || vehicles[0]

  const Icon = vehicle.type === 'motorcycle' ? Bike : Car

  const typeColors: Record<string, string> = {
    car: 'from-blue-600/30 to-blue-800/10',
    suv: 'from-purple-600/30 to-purple-800/10',
    motorcycle: 'from-orange-600/30 to-orange-800/10',
    truck: 'from-emerald-600/30 to-emerald-800/10',
  }

  const iconColors: Record<string, string> = {
    car: 'text-blue-400',
    suv: 'text-purple-400',
    motorcycle: 'text-orange-400',
    truck: 'text-emerald-400',
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <PageHeader
        title="Vehicle Details"
        backPath="/vehicles"
        rightAction={
          <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-sand-200">
            <Edit3 size={16} className="text-ink-muted" />
          </button>
        }
      />

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`mx-5 rounded-2xl bg-gradient-to-br ${typeColors[vehicle.type]} border border-sand-200 p-6 mb-5`}
      >
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-ink">
                {vehicle.make} {vehicle.model}
              </h2>
              {vehicle.isPrimary && (
                <Star size={16} className="text-status-warning fill-warning" />
              )}
            </div>
            <p className="text-sand-400 text-sm mt-1">{vehicle.color} · {vehicle.year}</p>
          </div>
          <Badge
            label={vehicle.status}
            variant={vehicle.status === 'active' ? 'success' : 'danger'}
            dot
          />
        </div>

        {/* Plate display */}
        <div className="bg-white/5 border border-sand-200 rounded-2xl p-4 mb-4 flex items-center justify-center">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🇪🇬</span>
            <p className="text-ink text-2xl font-black tracking-widest" dir="rtl">
              {vehicle.plate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Icon size={48} className={`${iconColors[vehicle.type]} opacity-80`} />
          <div className="w-px h-10 bg-white/10" />
          <div>
            <p className="text-sand-400 text-xs">Compound Sticker</p>
            <p className="text-ink font-bold text-lg">{vehicle.sticker || 'Not assigned'}</p>
          </div>
        </div>
      </motion.div>

      {/* Info grid */}
      <div className="px-5">
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[
            { label: 'Type', value: vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1) },
            { label: 'Year', value: String(vehicle.year) },
            { label: 'Color', value: vehicle.color },
            { label: 'Last Seen', value: vehicle.lastSeen || 'Unknown' },
          ].map(item => (
            <div key={item.label} className="bg-white border border-sand-200 rounded-2xl p-4">
              <p className="text-sand-400 text-xs mb-1">{item.label}</p>
              <p className="text-ink font-bold text-sm">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Access History Preview */}
        <div className="bg-white border border-sand-200 rounded-2xl p-5 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={16} className="text-forest" />
            <h3 className="text-sm font-bold text-ink">Recent Activity</h3>
          </div>
          {[
            { label: 'Entered Main Gate', time: '2h ago', type: 'entry' },
            { label: 'Exited Main Gate', time: '8h ago', type: 'exit' },
            { label: 'Entered Side Gate', time: 'Yesterday', type: 'entry' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                  item.type === 'entry' ? 'bg-status-active/15' : 'bg-slate-600/20'
                }`}>
                  <Shield size={12} className={item.type === 'entry' ? 'text-status-active' : 'text-sand-400'} />
                </div>
                <p className="text-ink-muted text-sm">{item.label}</p>
              </div>
              <span className="text-xs text-sand-400">{item.time}</span>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 pb-8">
          {!vehicle.isPrimary && (
            <Button variant="secondary" fullWidth size="lg">
              Set as Primary Vehicle
            </Button>
          )}
          <Button variant="danger" fullWidth size="lg" icon={<Trash2 size={16} />}>
            Remove Vehicle
          </Button>
          <Button variant="ghost" fullWidth onClick={() => router.push('/vehicles')}>
            Report Issue
          </Button>
        </div>
      </div>
    </div>
  )
}
