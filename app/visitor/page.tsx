'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Phone, Car, Clock, Check, Ticket, QrCode, Share2 } from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import QRCode from '@/components/ui/QRCode'

export default function VisitorPassPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    vehicle: '',
    duration: '1 day',
  })
  const [step, setStep] = useState<'form' | 'preview' | 'qr'>('form')
  const [loading, setLoading] = useState(false)

  const passCode = `KMP-VIS-${Date.now().toString(36).toUpperCase()}`

  const durations = ['2 hours', '4 hours', '1 day', '3 days', '1 week']

  const handleGenerate = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    setStep('qr')
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <PageHeader title="Visitor Pass" backPath="/home" subtitle="One-time gate access" />

      <div className="px-5 pb-8">
        <AnimatePresence mode="wait">
          {step === 'form' && (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              <div className="bg-forest/10 border border-forest/25 rounded-2xl p-4 mb-2">
                <p className="text-forest-light text-sm font-medium">
                  🚪 Create a quick pass for a visitor arriving today. They'll use the QR code at the gate.
                </p>
              </div>

              <Input
                label="Visitor Name"
                placeholder="Full name"
                value={form.name}
                onChange={v => setForm(f => ({ ...f, name: v }))}
                icon={<User size={16} />}
              />

              <Input
                label="Phone Number (Optional)"
                placeholder="+20 100 000 0000"
                value={form.phone}
                onChange={v => setForm(f => ({ ...f, phone: v }))}
                icon={<Phone size={16} />}
                type="tel"
              />

              <Input
                label="Vehicle Plate (Optional)"
                placeholder="أ ب ج 1234"
                value={form.vehicle}
                onChange={v => setForm(f => ({ ...f, vehicle: v }))}
                icon={<Car size={16} />}
              />

              <div>
                <label className="text-sm font-medium text-ink-muted mb-2 block">
                  <Clock size={14} className="inline mr-1.5" />
                  Duration
                </label>
                <div className="flex gap-2 flex-wrap">
                  {durations.map(d => (
                    <button
                      key={d}
                      onClick={() => setForm(f => ({ ...f, duration: d }))}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                        form.duration === d
                          ? 'bg-forest border-forest text-ink'
                          : 'bg-white border-sand-200 text-sand-400 hover:border-sand-300'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                fullWidth
                size="lg"
                disabled={!form.name}
                onClick={() => setStep('preview')}
                icon={<QrCode size={18} />}
              >
                Preview Pass
              </Button>
            </motion.div>
          )}

          {step === 'preview' && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="bg-white border border-sand-200 rounded-2xl p-6 mb-5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-full bg-forest/20 flex items-center justify-center">
                    <User size={28} className="text-forest" />
                  </div>
                  <div>
                    <p className="text-ink font-black text-lg">{form.name}</p>
                    {form.phone && <p className="text-sand-400 text-sm">{form.phone}</p>}
                  </div>
                </div>

                <div className="space-y-2 mb-5">
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-sand-400 text-sm">Access Type</span>
                    <span className="text-ink text-sm font-semibold">Single Visit</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-sand-400 text-sm">Duration</span>
                    <span className="text-ink text-sm font-semibold">{form.duration}</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/5">
                    <span className="text-sand-400 text-sm">Date</span>
                    <span className="text-ink text-sm font-semibold">Today, Mar 6 2026</span>
                  </div>
                  {form.vehicle && (
                    <div className="flex justify-between py-2">
                      <span className="text-sand-400 text-sm">Vehicle</span>
                      <span className="text-ink text-sm font-semibold" dir="rtl">{form.vehicle}</span>
                    </div>
                  )}
                </div>

                <div className="bg-warning/10 border border-warning/25 rounded-xl p-3">
                  <p className="text-status-warning text-xs font-medium text-center">
                    ⚠️ This pass will be valid for {form.duration} from time of generation
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  fullWidth
                  size="lg"
                  loading={loading}
                  onClick={handleGenerate}
                  icon={<Ticket size={18} />}
                >
                  Generate Pass
                </Button>
                <Button
                  variant="ghost"
                  fullWidth
                  onClick={() => setStep('form')}
                >
                  ← Edit Details
                </Button>
              </div>
            </motion.div>
          )}

          {step === 'qr' && (
            <motion.div
              key="qr"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.1 }}
                className="w-16 h-16 bg-status-active/20 rounded-full flex items-center justify-center mb-4"
              >
                <Check size={32} className="text-status-active" />
              </motion.div>

              <h2 className="text-xl font-black text-ink mb-1">Pass Ready! 🎉</h2>
              <p className="text-sand-400 text-sm mb-6 text-center">
                Share this QR code with {form.name}
              </p>

              {/* QR Card */}
              <div className="bg-white border border-sand-200 rounded-2xl p-6 w-full mb-5">
                <div className="flex flex-col items-center">
                  <QRCode value={passCode} size={220} />
                  <p className="text-sand-400 text-xs mt-3 font-mono">{passCode}</p>
                </div>

                <div className="mt-4 pt-4 border-t border-sand-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-sand-400">Guest</span>
                    <span className="text-ink font-bold">{form.name}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1.5">
                    <span className="text-sand-400">Valid For</span>
                    <span className="text-ink font-bold">{form.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1.5">
                    <span className="text-sand-400">Date</span>
                    <span className="text-ink font-bold">Mar 6, 2026</span>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col gap-3">
                <Button
                  fullWidth
                  size="lg"
                  icon={<Share2 size={18} />}
                >
                  Share with Visitor
                </Button>
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => router.push('/home')}
                >
                  Back to Home
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
