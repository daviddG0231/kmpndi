'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Car, MapPin, Clock, ParkingCircle, Navigation } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import BottomNav from '@/components/layout/BottomNav'
import Badge from '@/components/ui/Badge'
import { parkingSpots } from '@/lib/mock-data'

const floors = ['B3', 'B2', 'B1', 'Ground']

export default function ParkingPage() {
  const [selectedFloor, setSelectedFloor] = useState('B3')
  const spots = parkingSpots.filter(s => s.floor === selectedFloor)

  const mySpotsAll = parkingSpots.filter(s => s.type === 'assigned')
  const visitorSpots = parkingSpots.filter(s => s.type === 'visitor')
  const freeVisitor = visitorSpots.filter(s => !s.isOccupied).length

  return (
    <div className="min-h-screen bg-sand-50">
      <PageHeader title="Parking" subtitle="Compound parking status" />

      <div className="px-5 pb-32">
        {/* My spots */}
        <div className="mb-5">
          <h2 className="text-xs font-bold text-sand-400 uppercase tracking-widest mb-3">My Assigned Spots</h2>
          <div className="flex gap-3">
            {mySpotsAll.map(spot => (
              <motion.div
                key={spot.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`flex-1 rounded-2xl border p-4 ${
                  spot.isOccupied
                    ? 'bg-forest/10 border-forest/30'
                    : 'bg-status-active/10 border-success/30'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                    spot.isOccupied ? 'bg-forest/20' : 'bg-status-active/20'
                  }`}>
                    <ParkingCircle size={20} className={spot.isOccupied ? 'text-forest' : 'text-status-active'} />
                  </div>
                  <Badge
                    label={spot.isOccupied ? 'Occupied' : 'Free'}
                    variant={spot.isOccupied ? 'info' : 'success'}
                    dot
                  />
                </div>
                <p className="text-ink font-black text-xl">{spot.number}</p>
                <p className="text-sand-400 text-xs">{spot.floor} Level</p>
                {spot.isOccupied && spot.vehicle && (
                  <div className="mt-2 flex items-center gap-1">
                    <Car size={11} className="text-forest-light" />
                    <span className="text-forest-light text-xs font-semibold" dir="rtl">{spot.vehicle}</span>
                  </div>
                )}
                {spot.isOccupied && spot.since && (
                  <div className="flex items-center gap-1 mt-1">
                    <Clock size={11} className="text-sand-400" />
                    <span className="text-sand-400 text-xs">Since {spot.since}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Visitor stats */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: 'Visitor Spots', value: visitorSpots.length, color: 'text-ink' },
            { label: 'Occupied', value: visitorSpots.filter(s => s.isOccupied).length, color: 'text-status-warning' },
            { label: 'Available', value: freeVisitor, color: 'text-status-active' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-sand-200 rounded-2xl p-3 text-center">
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
              <p className="text-xs text-sand-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Floor selector */}
        <h2 className="text-xs font-bold text-sand-400 uppercase tracking-widest mb-3">Floor Map</h2>
        <div className="flex gap-2 mb-4">
          {floors.map(f => (
            <button
              key={f}
              onClick={() => setSelectedFloor(f)}
              className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                selectedFloor === f
                  ? 'bg-forest border-forest text-ink'
                  : 'bg-white border-sand-200 text-sand-400 hover:border-sand-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Spot grid visual */}
        <div className="bg-white border border-sand-200 rounded-2xl p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-ink font-bold text-sm">{selectedFloor} Level</p>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-status-active/40 border border-success/60" />
                <span className="text-sand-400">Free</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-forest/40 border border-forest/60" />
                <span className="text-sand-400">Mine</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-red-500/40 border border-red-500/60" />
                <span className="text-sand-400">Taken</span>
              </span>
            </div>
          </div>

          {/* Visual parking lot */}
          <div className="grid grid-cols-6 gap-2">
            {Array.from({ length: 24 }, (_, i) => {
              const spot = spots[i] || null
              const isMine = spot?.type === 'assigned'
              const isOccupied = spot?.isOccupied

              let bg = 'bg-sand-100 border-white/5'
              if (!spot) bg = 'bg-sand-100/30 border-white/3'
              else if (isMine && isOccupied) bg = 'bg-forest/30 border-forest/50'
              else if (isMine && !isOccupied) bg = 'bg-status-active/20 border-success/40'
              else if (isOccupied) bg = 'bg-red-500/20 border-red-500/30'
              else bg = 'bg-status-active/10 border-success/20'

              return (
                <div
                  key={i}
                  className={`aspect-square rounded-lg border flex items-center justify-center ${bg} transition-colors`}
                >
                  {spot && (
                    <Car size={12} className={
                      isMine && isOccupied ? 'text-forest' :
                      isOccupied ? 'text-red-400' :
                      'text-status-active/50'
                    } />
                  )}
                </div>
              )
            })}
          </div>

          {spots.length === 0 && (
            <p className="text-sand-400 text-sm text-center py-4">No spots on this level</p>
          )}
        </div>

        {/* Visitor spots list */}
        {selectedFloor === 'Ground' && (
          <div>
            <h3 className="text-xs font-bold text-sand-400 uppercase tracking-widest mb-3">Visitor Spots</h3>
            <div className="flex flex-col gap-2">
              {visitorSpots.map(spot => (
                <div
                  key={spot.id}
                  className="bg-white border border-sand-200 rounded-2xl p-4 flex items-center gap-3"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    spot.isOccupied ? 'bg-red-500/15' : 'bg-status-active/15'
                  }`}>
                    <ParkingCircle size={18} className={spot.isOccupied ? 'text-red-400' : 'text-status-active'} />
                  </div>
                  <div className="flex-1">
                    <p className="text-ink font-bold text-sm">Spot {spot.number}</p>
                    {spot.vehicle ? (
                      <p className="text-sand-400 text-xs">{spot.vehicle} · since {spot.since}</p>
                    ) : (
                      <p className="text-status-active text-xs font-semibold">Available</p>
                    )}
                  </div>
                  <Badge
                    label={spot.isOccupied ? 'Occupied' : 'Free'}
                    variant={spot.isOccupied ? 'danger' : 'success'}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}
