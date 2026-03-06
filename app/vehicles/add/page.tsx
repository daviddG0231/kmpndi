'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/layout/PageHeader'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

const vehicleTypes = ['car', 'suv', 'motorcycle', 'truck']

export default function AddVehiclePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    plate: '',
    make: '',
    model: '',
    color: '',
    year: '',
    type: 'car',
  })

  function set(key: string) {
    return (val: string) => setForm(f => ({ ...f, [key]: val }))
  }

  const isValid = form.plate && form.make && form.model && form.color && form.year

  return (
    <div className="phone-frame bg-bg min-h-screen pb-10">
      <PageHeader title="Add Vehicle" backPath="/vehicles" />

      <div className="px-4 space-y-4">
        <div>
          <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-3">Vehicle Info</p>
          <div className="space-y-3">
            <Input
              label="Plate Number"
              placeholder="أ ب ج 1234"
              value={form.plate}
              onChange={set('plate')}
            />
            <Input
              label="Make"
              placeholder="Toyota"
              value={form.make}
              onChange={set('make')}
            />
            <Input
              label="Model"
              placeholder="Camry"
              value={form.model}
              onChange={set('model')}
            />
            <Input
              label="Color"
              placeholder="White"
              value={form.color}
              onChange={set('color')}
            />
            <Input
              label="Year"
              placeholder="2024"
              type="number"
              value={form.year}
              onChange={set('year')}
            />
          </div>
        </div>

        <div>
          <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-1.5">Vehicle Type</p>
          <div className="bg-surface rounded-[12px] divide-y divide-sep">
            {vehicleTypes.map(type => (
              <button
                key={type}
                onClick={() => setForm(f => ({ ...f, type }))}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left active:bg-fill"
              >
                <span className="text-[15px] text-txt capitalize">{type}</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${form.type === type ? 'border-accent bg-accent' : 'border-sep-opaque'}`}>
                  {form.type === type && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <Button
            variant="primary"
            size="lg"
            fullWidth
            disabled={!isValid}
            onClick={() => router.push('/vehicles')}
          >
            Add Vehicle
          </Button>
        </div>
      </div>
    </div>
  )
}
