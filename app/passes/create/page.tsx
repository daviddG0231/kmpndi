'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { User, Calendar, Car, MessageSquare, Check, Ticket } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

const purposes = ['Family Visit', 'Social Visit', 'Contractor', 'Delivery', 'Regular Visitor', 'Other']

export default function CreatePassPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    guestName: '',
    purpose: '',
    validFrom: '',
    validTo: '',
    maxVisits: '5',
    vehicle: '',
    notes: '',
  })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const isValid = form.guestName && form.purpose && form.validFrom && form.validTo

  const handleCreate = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setDone(true)
    setTimeout(() => router.push('/passes'), 1800)
  }

  if (done) {
    return (
      <div className="min-h-screen bg-sand-50 flex flex-col items-center justify-center px-8">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="w-24 h-24 bg-forest/20 rounded-2xl flex items-center justify-center mb-6 shadow-card"
        >
          <Ticket size={48} className="text-forest" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-2xl font-black text-ink text-center mb-2">Pass Created! 🎉</h2>
          <p className="text-sand-400 text-center text-sm">
            QR code has been generated for {form.guestName}.<br />
            Share it directly or they can scan it at the gate.
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <PageHeader title="Create Guest Pass" backPath="/passes" />

      <div className="px-5 pb-8 space-y-4">
        {/* Guest name */}
        <Input
          label="Guest Name"
          placeholder="Full name"
          value={form.guestName}
          onChange={v => setForm(f => ({ ...f, guestName: v }))}
          icon={<User size={16} />}
        />

        {/* Purpose */}
        <div>
          <label className="text-sm font-medium text-ink-muted mb-2 block">Purpose</label>
          <div className="flex flex-wrap gap-2">
            {purposes.map(p => (
              <button
                key={p}
                onClick={() => setForm(f => ({ ...f, purpose: p }))}
                className={`px-3 py-2 rounded-xl text-sm font-semibold border transition-all duration-150 ${
                  form.purpose === p
                    ? 'border-forest bg-forest/15 text-forest'
                    : 'border-sand-200 bg-white text-sand-400 hover:border-sand-300'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Date range */}
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Valid From"
            type="date"
            value={form.validFrom}
            onChange={v => setForm(f => ({ ...f, validFrom: v }))}
          />
          <Input
            label="Valid To"
            type="date"
            value={form.validTo}
            onChange={v => setForm(f => ({ ...f, validTo: v }))}
          />
        </div>

        {/* Max visits */}
        <div>
          <label className="text-sm font-medium text-ink-muted mb-2 block">Max Visits</label>
          <div className="flex gap-2">
            {['1', '3', '5', '10', '20', '∞'].map(n => (
              <button
                key={n}
                onClick={() => setForm(f => ({ ...f, maxVisits: n }))}
                className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all ${
                  form.maxVisits === n
                    ? 'border-forest bg-forest/15 text-forest'
                    : 'border-sand-200 bg-white text-sand-400'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Vehicle (optional) */}
        <Input
          label="Guest's Vehicle Plate (Optional)"
          placeholder="e.g. أ ب ج 1234"
          value={form.vehicle}
          onChange={v => setForm(f => ({ ...f, vehicle: v }))}
          icon={<Car size={16} />}
        />

        {/* Notes */}
        <div>
          <label className="text-sm font-medium text-ink-muted mb-1.5 block">Notes (Optional)</label>
          <textarea
            value={form.notes}
            onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            placeholder="Any additional instructions for security..."
            className="w-full bg-white border border-sand-200 rounded-2xl p-4 text-ink text-sm font-medium placeholder:text-sand-300 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-forest/40 resize-none h-24"
          />
        </div>

        {/* Preview */}
        {isValid && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-forest/10 border border-forest/30 rounded-2xl p-4"
          >
            <p className="text-xs font-bold text-forest uppercase tracking-widest mb-2">Pass Preview</p>
            <div className="space-y-1">
              <p className="text-ink font-bold">{form.guestName}</p>
              <p className="text-sand-400 text-xs">{form.purpose} · {form.maxVisits === '∞' ? 'Unlimited' : form.maxVisits} visits</p>
              <p className="text-sand-400 text-xs">{form.validFrom} to {form.validTo}</p>
            </div>
          </motion.div>
        )}

        <Button
          fullWidth
          size="lg"
          loading={loading}
          disabled={!isValid}
          onClick={handleCreate}
          icon={<Ticket size={18} />}
        >
          Generate Pass & QR Code
        </Button>
      </div>
    </div>
  )
}
