'use client'
import { useParams, useRouter } from 'next/navigation'
import PageHeader from '@/components/layout/PageHeader'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import QRCode from '@/components/ui/QRCode'
import { guestPasses } from '@/lib/mock-data'
import { Share2, XCircle } from 'lucide-react'

function statusVariant(status: string): 'green' | 'orange' | 'red' | 'blue' | 'gray' {
  if (status === 'active') return 'green'
  if (status === 'cancelled') return 'red'
  if (status === 'used') return 'orange'
  return 'gray'
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="px-4 py-3.5 flex items-start justify-between gap-3">
      <span className="text-[15px] text-txt-secondary shrink-0">{label}</span>
      <span className="text-[15px] text-txt font-medium text-right">{value}</span>
    </div>
  )
}

export default function PassDetailPage() {
  const params = useParams()
  const router = useRouter()
  const pass = guestPasses.find(p => p.id === params.id)

  if (!pass) {
    return (
      <div className="phone-frame bg-bg min-h-screen flex items-center justify-center">
        <p className="text-txt-secondary">Pass not found</p>
      </div>
    )
  }

  return (
    <div className="phone-frame bg-bg min-h-screen pb-10">
      <PageHeader title={pass.guestName} backPath="/passes" />

      <div className="px-4 space-y-4">
        {/* Status */}
        <div className="flex justify-center">
          <Badge label={pass.status.toUpperCase()} variant={statusVariant(pass.status)} size="md" />
        </div>

        {/* QR Code */}
        {pass.status === 'active' && (
          <div className="bg-surface rounded-[12px] p-6 flex items-center justify-center">
            <QRCode value={pass.qrCode} size={220} />
          </div>
        )}

        {/* Info */}
        <div>
          <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-1.5">Pass Details</p>
          <div className="bg-surface rounded-[12px] divide-y divide-sep">
            <InfoRow label="Purpose" value={pass.purpose} />
            <InfoRow label="Valid from" value={formatDate(pass.validFrom)} />
            <InfoRow label="Valid to" value={formatDate(pass.validTo)} />
            <InfoRow label="Visits" value={`${pass.usedVisits} of ${pass.maxVisits} used`} />
            {pass.vehicle && <InfoRow label="Vehicle" value={pass.vehicle} />}
            {pass.notes && <InfoRow label="Notes" value={pass.notes} />}
            <InfoRow label="Pass code" value={pass.qrCode} />
          </div>
        </div>

        {/* Actions */}
        {pass.status === 'active' && (
          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="lg"
              fullWidth
              icon={<Share2 size={16} />}
            >
              Share Pass
            </Button>
            <Button
              variant="danger"
              size="lg"
              fullWidth
              icon={<XCircle size={16} />}
              onClick={() => router.push('/passes')}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
