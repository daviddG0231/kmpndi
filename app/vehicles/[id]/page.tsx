'use client'
import { useParams, useRouter } from 'next/navigation'
import PageHeader from '@/components/layout/PageHeader'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { vehicles } from '@/lib/mock-data'
import { Clock } from 'lucide-react'

function statusVariant(status: string): 'green' | 'orange' | 'red' | 'blue' | 'gray' {
  if (status === 'active') return 'green'
  if (status === 'flagged') return 'red'
  return 'gray'
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3.5 flex items-center justify-between">
      <span className="text-[15px] text-txt-secondary">{label}</span>
      <span className="text-[15px] text-txt font-medium">{value}</span>
    </div>
  )
}

export default function VehicleDetailPage() {
  const params = useParams()
  const router = useRouter()
  const vehicle = vehicles.find(v => v.id === params.id)

  if (!vehicle) {
    return (
      <div className="phone-frame bg-bg min-h-screen flex items-center justify-center">
        <p className="text-txt-secondary">Vehicle not found</p>
      </div>
    )
  }

  return (
    <div className="phone-frame bg-bg min-h-screen pb-10">
      <PageHeader
        title={vehicle.plate}
        backPath="/vehicles"
        rightAction={<Badge label={vehicle.status} variant={statusVariant(vehicle.status)} size="md" />}
      />

      <div className="px-4 space-y-4">
        {/* Details */}
        <div>
          <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-1.5">Details</p>
          <div className="bg-surface rounded-[12px] divide-y divide-sep">
            <DetailRow label="Make" value={vehicle.make} />
            <DetailRow label="Model" value={vehicle.model} />
            <DetailRow label="Color" value={vehicle.color} />
            <DetailRow label="Year" value={String(vehicle.year)} />
            <DetailRow label="Type" value={vehicle.type.charAt(0).toUpperCase() + vehicle.type.slice(1)} />
          </div>
        </div>

        {/* Sticker */}
        {vehicle.sticker && (
          <div>
            <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-1.5">Access Sticker</p>
            <div className="bg-surface rounded-[12px] divide-y divide-sep">
              <DetailRow label="Sticker ID" value={vehicle.sticker} />
            </div>
          </div>
        )}

        {/* Last seen */}
        {vehicle.lastSeen && (
          <div>
            <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-1.5">Last Seen</p>
            <div className="bg-surface rounded-[12px]">
              <div className="px-4 py-3.5 flex items-center gap-3">
                <Clock size={16} className="text-txt-tertiary" />
                <span className="text-[15px] text-txt">{vehicle.lastSeen}</span>
              </div>
            </div>
          </div>
        )}

        {/* Delete */}
        <div className="pt-2">
          <Button
            variant="danger"
            size="lg"
            fullWidth
            onClick={() => router.push('/vehicles')}
          >
            Remove Vehicle
          </Button>
        </div>
      </div>
    </div>
  )
}
