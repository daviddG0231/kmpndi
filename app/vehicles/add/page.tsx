'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Car, Bike, Truck, Check } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

const vehicleTypes = [
  { type: 'car', label: 'Car', icon: Car },
  { type: 'suv', label: 'SUV', icon: Car },
  { type: 'motorcycle', label: 'Moto', icon: Bike },
  { type: 'truck', label: 'Truck', icon: Truck },
]

const makes = ['Toyota', 'Hyundai', 'Kia', 'Honda', 'Nissan', 'BMW', 'Mercedes', 'Chevrolet', 'Ford', 'Jeep']
const colors = ['White', 'Black', 'Silver', 'Gray', 'Red', 'Blue', 'Green', 'Brown', 'Gold', 'Orange']

export default function AddVehiclePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    plate: '',
    make: '',
    model: '',
    color: '',
    year: '',
    type: 'car',
  })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setDone(true)
    setTimeout(() => router.push('/vehicles'), 1500)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-sand-50 flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6"
        >
          <Check size={48} className="text-status-active" />
        </motion.div>
        <h2 className="text-2xl font-black text-ink mb-2">Vehicle Added!</h2>
        <p className="text-ink-muted text-center text-sm">
          Your vehicle has been registered. A compound sticker will be issued within 24 hours.
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <PageHeader title="Add Vehicle" backPath="/vehicles" />

      {/* Progress */}
      <div className="px-5 mb-4">
        <div className="flex gap-1.5">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-colors duration-300 ${
                s <= step ? 'bg-forest' : 'bg-sand-200'
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-sand-400 mt-1.5">Step {step} of 3</p>
      </div>

      <div className="px-5 pb-8">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-lg font-bold text-ink mb-1">Vehicle Type</h2>
            <p className="text-ink-muted text-sm mb-5">Select the type of your vehicle</p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {vehicleTypes.map(({ type, label, icon: Icon }) => (
                <motion.button
                  key={type}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setForm(f => ({ ...f, type }))}
                  className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all duration-150 ${
                    form.type === type
                      ? 'border-forest bg-forest-50'
                      : 'border-sand-200 bg-white hover:border-sand-300'
                  }`}
                >
                  <Icon size={32} className={form.type === type ? 'text-forest' : 'text-sand-400'} />
                  <span className={`text-sm font-bold ${form.type === type ? 'text-forest' : 'text-ink-muted'}`}>
                    {label}
                  </span>
                </motion.button>
              ))}
            </div>

            <Button fullWidth size="lg" onClick={() => setStep(2)}>
              Continue
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-lg font-bold text-ink mb-1">License Plate</h2>
            <p className="text-ink-muted text-sm mb-5">Enter your Egyptian plate number</p>

            <div className="bg-white border-2 border-forest/20 rounded-2xl p-4 mb-5 shadow-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-forest-50 rounded-lg px-3 py-1.5">
                  <span className="text-forest text-xs font-bold">🇪🇬 EGY</span>
                </div>
                <p className="text-sand-400 text-xs">Egyptian License Plate</p>
              </div>
              <input
                type="text"
                value={form.plate}
                onChange={e => setForm(f => ({ ...f, plate: e.target.value }))}
                placeholder="أ ب ج 1234"
                className="w-full bg-transparent text-ink text-2xl font-black text-center focus:outline-none placeholder:text-sand-300 placeholder:text-xl"
                dir="rtl"
              />
            </div>

            <Input
              label="Make"
              placeholder="e.g. Toyota"
              value={form.make}
              onChange={v => setForm(f => ({ ...f, make: v }))}
              className="mb-3"
            />

            <div className="flex flex-wrap gap-2 mb-4">
              {makes.slice(0, 5).map(m => (
                <button
                  key={m}
                  onClick={() => setForm(f => ({ ...f, make: m }))}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    form.make === m
                      ? 'border-forest bg-forest-50 text-forest'
                      : 'border-sand-200 bg-white text-ink-muted'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <Input
              label="Model"
              placeholder="e.g. Camry"
              value={form.model}
              onChange={v => setForm(f => ({ ...f, model: v }))}
              className="mb-5"
            />

            <div className="flex gap-3">
              <Button variant="secondary" size="lg" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button
                size="lg"
                onClick={() => setStep(3)}
                disabled={!form.plate || !form.make || !form.model}
                className="flex-[2]"
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <h2 className="text-lg font-bold text-ink mb-1">Details</h2>
            <p className="text-ink-muted text-sm mb-5">Year and color</p>

            <Input
              label="Year"
              placeholder="e.g. 2022"
              value={form.year}
              onChange={v => setForm(f => ({ ...f, year: v }))}
              type="number"
              className="mb-4"
            />

            <p className="text-sm font-medium text-ink-muted mb-2">Color</p>
            <div className="grid grid-cols-5 gap-2 mb-4">
              {colors.map(color => {
                const colorMap: Record<string, string> = {
                  White: '#F8FAFC', Black: '#1A1A1A', Silver: '#94A3B8',
                  Gray: '#64748B', Red: '#EF4444', Blue: '#3B82F6',
                  Green: '#22C55E', Brown: '#92400E', Gold: '#D4A853', Orange: '#F97316'
                }
                return (
                  <button
                    key={color}
                    onClick={() => setForm(f => ({ ...f, color }))}
                    className={`aspect-square rounded-xl border-2 transition-all shadow-card ${
                      form.color === color ? 'border-forest scale-110 shadow-card-hover' : 'border-sand-200'
                    }`}
                    style={{ backgroundColor: colorMap[color] }}
                    title={color}
                  />
                )
              })}
            </div>
            {form.color && (
              <p className="text-ink-muted text-sm mb-4 text-center">{form.color}</p>
            )}

            {/* Summary */}
            <div className="bg-white border border-sand-200 rounded-2xl p-4 mb-5 shadow-card">
              <p className="text-xs text-sand-400 uppercase tracking-wider font-semibold mb-2">Summary</p>
              {[
                { label: 'Plate', value: form.plate || '—' },
                { label: 'Vehicle', value: `${form.make} ${form.model}`.trim() || '—' },
                { label: 'Year', value: form.year || '—' },
                { label: 'Color', value: form.color || '—' },
                { label: 'Type', value: vehicleTypes.find(t => t.type === form.type)?.label || '—' },
              ].map(row => (
                <div key={row.label} className="flex justify-between py-1.5 border-b border-sand-100 last:border-0">
                  <span className="text-sand-400 text-sm">{row.label}</span>
                  <span className="text-ink text-sm font-semibold">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button variant="secondary" size="lg" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button
                size="lg"
                loading={loading}
                onClick={handleSubmit}
                disabled={!form.year || !form.color}
                className="flex-[2]"
              >
                Register Vehicle
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
