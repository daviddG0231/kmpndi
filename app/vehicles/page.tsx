'use client'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/layout/PageHeader'
import BottomNav from '@/components/layout/BottomNav'
import Badge from '@/components/ui/Badge'
import { Plus, ChevronRight } from 'lucide-react'
import { vehicles } from '@/lib/mock-data'

function statusVariant(status: string): 'green' | 'orange' | 'red' | 'blue' | 'gray' {
  if (status === 'active') return 'green'
  if (status === 'flagged') return 'red'
  return 'gray'
}

export default function VehiclesPage() {
  const router = useRouter()
  const activeCount = vehicles.filter(v => v.status === 'active').length

  return (
    <div className="phone-frame bg-bg min-h-screen safe-bottom">
      <PageHeader
        title="Vehicles"
        subtitle={`${activeCount} active · ${vehicles.length} total`}
        large
        rightAction={
          <button
            onClick={() => router.push('/vehicles/add')}
            className="w-[34px] h-[34px] rounded-full bg-accent flex items-center justify-center"
          >
            <Plus size={18} className="text-white" strokeWidth={2.5} />
          </button>
        }
      />

      <div className="px-4 pb-6">
        {/* Summary */}
        <div className="mb-4">
          <p className="text-[13px] text-txt-secondary">
            <span className="font-mono text-txt font-semibold">{activeCount}</span> active ·{' '}
            <span className="font-mono text-txt font-semibold">{vehicles.length}</span> total
          </p>
        </div>

        {/* Vehicle list */}
        <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-1.5">Registered Vehicles</p>
        <div className="bg-surface rounded-[12px] divide-y divide-sep">
          {vehicles.map(vehicle => (
            <button
              key={vehicle.id}
              onClick={() => router.push(`/vehicles/${vehicle.id}`)}
              className="w-full px-4 py-3.5 flex items-center text-left active:bg-fill transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[15px] font-mono font-bold text-txt">{vehicle.plate}</span>
                  {vehicle.isPrimary && <Badge label="Primary" variant="blue" />}
                </div>
                <p className="text-[13px] text-txt-secondary">{vehicle.make} {vehicle.model} · {vehicle.color}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-3">
                <Badge label={vehicle.status} variant={statusVariant(vehicle.status)} />
                <ChevronRight size={16} className="text-txt-tertiary" />
              </div>
            </button>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
