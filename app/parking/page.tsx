'use client'
import { useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import BottomNav from '@/components/layout/BottomNav'
import { parkingSpots } from '@/lib/mock-data'

export default function ParkingPage() {
  const floors = Array.from(new Set(parkingSpots.map(s => s.floor)))
  const [selectedFloor, setSelectedFloor] = useState(floors[0])

  const assignedSpots = parkingSpots.filter(s => s.type === 'assigned')
  const visitorSpots = parkingSpots.filter(s => s.type === 'visitor')
  const floorSpots = parkingSpots.filter(s => s.floor === selectedFloor)
  const occupiedSpots = parkingSpots.filter(s => s.isOccupied)

  return (
    <div className="phone-frame bg-bg min-h-screen safe-bottom">
      <PageHeader title="Parking" large />

      <div className="px-4 pb-6 space-y-5">
        {/* Summary */}
        <div>
          <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-1.5">Summary</p>
          <div className="bg-surface rounded-[12px] divide-y divide-sep">
            <div className="px-4 py-3.5 flex items-center justify-between">
              <span className="text-[15px] text-txt">Assigned Spots</span>
              <span className="font-mono text-[15px] text-txt font-medium">
                {assignedSpots.filter(s => s.isOccupied).length}/{assignedSpots.length}
              </span>
            </div>
            <div className="px-4 py-3.5 flex items-center justify-between">
              <span className="text-[15px] text-txt">Visitor Spots</span>
              <span className="font-mono text-[15px] text-txt font-medium">
                {visitorSpots.filter(s => s.isOccupied).length}/{visitorSpots.length}
              </span>
            </div>
          </div>
        </div>

        {/* Floor selector */}
        <div>
          <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-1.5">Floor Map</p>
          <div className="flex gap-2 mb-3">
            {floors.map(floor => (
              <button
                key={floor}
                onClick={() => setSelectedFloor(floor)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                  selectedFloor === floor
                    ? 'bg-accent text-white'
                    : 'bg-fill text-txt-secondary'
                }`}
              >
                {floor}
              </button>
            ))}
          </div>

          {/* Spot grid */}
          <div className="bg-surface rounded-[12px] p-4">
            <div className="grid grid-cols-5 gap-2">
              {floorSpots.map(spot => (
                <div
                  key={spot.id}
                  className="aspect-square rounded-[8px] flex flex-col items-center justify-center gap-1"
                  style={{
                    background: spot.isOccupied ? '#FF3B3015' : '#34C75915',
                  }}
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: spot.isOccupied ? '#FF3B30' : '#34C759' }}
                  />
                  <span className="text-[9px] font-mono text-txt-secondary text-center leading-tight">
                    {spot.number}
                  </span>
                </div>
              ))}
              {floorSpots.length === 0 && (
                <div className="col-span-5 text-center py-4">
                  <p className="text-[13px] text-txt-tertiary">No spots on this floor</p>
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-sep">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-sys-green" />
                <span className="text-[12px] text-txt-secondary">Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-sys-red" />
                <span className="text-[12px] text-txt-secondary">Occupied</span>
              </div>
            </div>
          </div>
        </div>

        {/* Occupied spots list */}
        {occupiedSpots.length > 0 && (
          <div>
            <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-1.5">Currently Occupied</p>
            <div className="bg-surface rounded-[12px] divide-y divide-sep">
              {occupiedSpots.map(spot => (
                <div key={spot.id} className="px-4 py-3.5 flex items-center justify-between">
                  <div>
                    <p className="text-[15px] font-mono font-semibold text-txt">{spot.number}</p>
                    <p className="text-[13px] text-txt-secondary">{spot.vehicle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[12px] text-txt-tertiary">{spot.floor}</p>
                    {spot.since && (
                      <p className="text-[12px] font-mono text-txt-secondary mt-0.5">{spot.since}</p>
                    )}
                  </div>
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
