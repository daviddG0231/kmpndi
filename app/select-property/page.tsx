'use client'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Building2, MapPin, ChevronRight, Star, ParkingSquare, Home } from 'lucide-react'
import { currentUser, userUnits } from '@/lib/mock-data'
import type { Unit } from '@/lib/types'

export default function SelectPropertyPage() {
  const router = useRouter()

  // Group units by compound
  const compounds = useMemo(() => {
    const map = new Map<string, { name: string; units: Unit[] }>()
    for (const unit of userUnits) {
      if (!map.has(unit.compoundId)) {
        map.set(unit.compoundId, { name: unit.compound, units: [] })
      }
      map.get(unit.compoundId)!.units.push(unit)
    }
    return Array.from(map.entries())
  }, [])

  const handleSelect = (unit: Unit) => {
    // In real app this would set active unit in state/context
    router.push('/home')
  }

  return (
    <div className="min-h-screen bg-sand-50 px-5 pt-16 pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <p className="text-sm text-ink-muted mb-1">Welcome back,</p>
        <h1 className="text-2xl font-bold text-ink">{currentUser.name} 👋</h1>
        <p className="text-sm text-sand-400 mt-1">Select a property to manage</p>
      </motion.div>

      {/* Compound groups */}
      <div className="space-y-6">
        {compounds.map(([compoundId, { name, units }], ci) => (
          <motion.div
            key={compoundId}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.1 }}
          >
            {/* Compound header */}
            <div className="flex items-center gap-2 mb-3">
              <MapPin size={14} className="text-forest" />
              <h2 className="text-xs font-bold text-ink-muted uppercase tracking-wider">{name}</h2>
              <span className="text-[10px] text-sand-400 bg-sand-100 px-2 py-0.5 rounded-full font-medium">
                {units.length} {units.length === 1 ? 'unit' : 'units'}
              </span>
            </div>

            {/* Unit cards */}
            <div className="space-y-2.5">
              {units.map((unit, i) => (
                <motion.button
                  key={unit.id}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: ci * 0.1 + i * 0.05 }}
                  onClick={() => handleSelect(unit)}
                  className={`w-full bg-white border rounded-2xl p-4 text-left shadow-card hover:shadow-card-hover transition-all active:scale-[0.99] ${
                    unit.isDefault ? 'border-forest/30 ring-1 ring-forest/10' : 'border-sand-200 hover:border-sand-300'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    {/* Icon */}
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      unit.isDefault ? 'bg-forest' : 'bg-sand-100'
                    }`}>
                      <Home size={20} className={unit.isDefault ? 'text-white' : 'text-ink'} strokeWidth={1.6} />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-ink font-bold text-sm">
                          Unit {unit.unit}
                        </p>
                        {unit.isDefault && (
                          <span className="flex items-center gap-1 text-[10px] font-semibold bg-gold-50 text-gold-dark px-2 py-0.5 rounded-full">
                            <Star size={8} className="fill-gold-dark" />
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-sand-400">{unit.building}</p>

                      {/* Stats row */}
                      <div className="flex items-center gap-3 mt-2.5">
                        <div className="flex items-center gap-1.5 text-[11px] text-ink-muted">
                          <ParkingSquare size={12} />
                          <span className="font-mono font-bold">{unit.parkingUsed}/{unit.parkingAllowance}</span>
                          <span className="text-sand-400">parking</span>
                        </div>
                      </div>
                    </div>

                    <ChevronRight size={16} className="text-sand-300 mt-1 flex-shrink-0" />
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 text-center"
      >
        <p className="text-[11px] text-sand-400">
          You can switch properties anytime from your profile
        </p>
      </motion.div>
    </div>
  )
}
