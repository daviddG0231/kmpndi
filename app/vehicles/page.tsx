'use client'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Car, Plus, ChevronRight, Star } from 'lucide-react'
import BottomNav from '@/components/layout/BottomNav'
import { vehicles } from '@/lib/mock-data'

export default function VehiclesPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Header */}
      <div className="px-5 pt-14 pb-2 flex items-end justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink">My Vehicles</h1>
          <p className="text-xs text-sand-400 mt-0.5">{vehicles.length} registered</p>
        </div>
        <button
          onClick={() => router.push('/vehicles/add')}
          className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center shadow-card"
        >
          <Plus size={20} className="text-white" />
        </button>
      </div>

      <div className="px-5 pt-4">
        {/* Stats row */}
        <div className="flex gap-2 mb-5">
          {[
            { label: 'Total', value: vehicles.length },
            { label: 'Active', value: vehicles.filter(v => v.status === 'active').length },
            { label: 'Passes', value: vehicles.length },
          ].map(s => (
            <div key={s.label} className="flex-1 bg-white border border-sand-200 rounded-xl px-3 py-3 text-center shadow-card">
              <p className="text-lg font-bold font-mono text-ink">{s.value}</p>
              <p className="text-[10px] text-sand-400 font-medium uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Vehicle list */}
        <div className="space-y-3 mb-32">
          {vehicles.map((vehicle, i) => (
            <motion.button
              key={vehicle.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => router.push(`/vehicles/${vehicle.id}`)}
              className="w-full bg-white border border-sand-200 rounded-2xl p-4 flex items-center gap-4 shadow-card hover:shadow-card-hover hover:border-sand-300 transition-all active:scale-[0.99] text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-sand-100 flex items-center justify-center flex-shrink-0">
                <Car size={20} className="text-ink" strokeWidth={1.5} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-ink font-bold text-sm">{vehicle.make} {vehicle.model}</p>
                  {i === 0 && <Star size={12} className="text-gold fill-gold" />}
                </div>
                <p className="font-mono text-xs text-forest font-bold mt-0.5">{vehicle.plate}</p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    vehicle.status === 'active'
                      ? 'bg-green-50 text-status-active'
                      : 'bg-sand-100 text-sand-400'
                  }`}>
                    ● {vehicle.status === 'active' ? 'Active' : 'Inactive'}
                  </span>
                  <span className="text-[10px] text-sand-400">{vehicle.color} · {vehicle.year}</span>
                </div>
              </div>
              <ChevronRight size={16} className="text-sand-300 flex-shrink-0" />
            </motion.button>
          ))}

          {/* Add another */}
          <button
            onClick={() => router.push('/vehicles/add')}
            className="w-full border-2 border-dashed border-sand-200 rounded-2xl p-4 flex items-center justify-center gap-2 text-ink-muted hover:border-forest hover:text-forest transition-all"
          >
            <Plus size={18} />
            <span className="text-sm font-semibold">Add Vehicle</span>
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
