'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/layout/PageHeader'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

export default function CreatePassPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    guestName: '',
    purpose: '',
    validFrom: '',
    validTo: '',
    maxVisits: '1',
    vehicle: '',
    notes: '',
  })

  function set(key: string) {
    return (val: string) => setForm(f => ({ ...f, [key]: val }))
  }

  const isValid = form.guestName && form.purpose && form.validFrom && form.validTo && form.maxVisits

  return (
    <div className="phone-frame bg-bg min-h-screen pb-10">
      <PageHeader title="New Guest Pass" backPath="/passes" />

      <div className="px-4 space-y-4">
        <div>
          <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-3">Guest Info</p>
          <div className="space-y-3">
            <Input
              label="Guest Name"
              placeholder="Full name"
              value={form.guestName}
              onChange={set('guestName')}
            />
            <Input
              label="Purpose"
              placeholder="Family visit, contractor..."
              value={form.purpose}
              onChange={set('purpose')}
            />
          </div>
        </div>

        <div>
          <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-3">Validity</p>
          <div className="space-y-3">
            <Input
              label="Valid From"
              type="date"
              value={form.validFrom}
              onChange={set('validFrom')}
            />
            <Input
              label="Valid To"
              type="date"
              value={form.validTo}
              onChange={set('validTo')}
            />
            <Input
              label="Max Visits"
              type="number"
              placeholder="1"
              value={form.maxVisits}
              onChange={set('maxVisits')}
            />
          </div>
        </div>

        <div>
          <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-3">Optional</p>
          <div className="space-y-3">
            <Input
              label="Guest Vehicle Plate"
              placeholder="Leave blank if unknown"
              value={form.vehicle}
              onChange={set('vehicle')}
            />
            <Input
              label="Notes"
              placeholder="Any additional notes..."
              value={form.notes}
              onChange={set('notes')}
            />
          </div>
        </div>

        <div className="pt-2">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            disabled={!isValid}
            onClick={() => router.push('/passes')}
          >
            Create Pass
          </Button>
        </div>
      </div>
    </div>
  )
}
