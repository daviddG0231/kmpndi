'use client'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Ticket, Clock, Car, User, Copy, Share2, X, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import PageHeader from '@/components/layout/PageHeader'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import QRCode from '@/components/ui/QRCode'
import { guestPasses } from '@/lib/mock-data'

export default function PassDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const pass = guestPasses.find(p => p.id === id) || guestPasses[0]
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const pct = pass.maxVisits > 0 ? (pass.usedVisits / pass.maxVisits) * 100 : 0

  const statusMap = {
    active: { variant: 'success' as const, label: 'Active' },
    expired: { variant: 'neutral' as const, label: 'Expired' },
    used: { variant: 'info' as const, label: 'Fully Used' },
    cancelled: { variant: 'danger' as const, label: 'Cancelled' },
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <PageHeader title="Guest Pass" backPath="/passes" />

      <div className="px-5 pb-8">
        {/* Pass Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`relative overflow-hidden rounded-2xl border mb-5 ${
            pass.status === 'active'
              ? 'bg-gradient-to-br from-navy-700 to-navy-800 border-forest/30'
              : 'bg-white border-sand-200'
          }`}
        >
          {pass.status === 'active' && (
            <div className="absolute top-0 right-0 w-40 h-40 bg-forest/10 rounded-full -translate-y-10 translate-x-10 pointer-events-none" />
          )}

          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  pass.status === 'active' ? 'bg-forest/20' : 'bg-slate-700/30'
                }`}>
                  <Ticket size={22} className={pass.status === 'active' ? 'text-forest' : 'text-sand-400'} />
                </div>
                <div>
                  <p className="text-xs text-sand-400 uppercase tracking-widest font-semibold">Guest Pass</p>
                  <p className="text-ink font-black text-base">{pass.qrCode}</p>
                </div>
              </div>
              <Badge
                label={statusMap[pass.status].label}
                variant={statusMap[pass.status].variant}
                dot
                size="md"
              />
            </div>

            {/* Guest info */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-1">
                <User size={14} className="text-sand-400" />
                <p className="text-sand-400 text-xs">Guest</p>
              </div>
              <p className="text-ink font-bold text-xl">{pass.guestName}</p>
              <p className="text-sand-400 text-sm mt-0.5">{pass.purpose}</p>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
                { label: 'Valid From', value: pass.validFrom },
                { label: 'Valid To', value: pass.validTo },
                { label: 'Max Visits', value: String(pass.maxVisits) },
                { label: 'Used', value: String(pass.usedVisits) },
              ].map(item => (
                <div key={item.label} className="bg-black/20 rounded-xl p-3">
                  <p className="text-sand-400 text-xs mb-0.5">{item.label}</p>
                  <p className="text-ink font-bold text-sm">{item.value}</p>
                </div>
              ))}
            </div>

            {/* Usage bar */}
            {pass.status === 'active' && (
              <div>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-sand-400">Visits used</span>
                  <span className="text-ink font-bold">{pass.usedVisits}/{pass.maxVisits}</span>
                </div>
                <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
                    className={`h-full rounded-full ${pct >= 80 ? 'bg-warning' : 'bg-forest'}`}
                  />
                </div>
              </div>
            )}

            {pass.vehicle && (
              <div className="flex items-center gap-2 mt-3 p-2 bg-black/20 rounded-xl">
                <Car size={14} className="text-sand-400" />
                <span className="text-sand-400 text-xs">Vehicle: </span>
                <span className="text-ink text-xs font-bold" dir="rtl">{pass.vehicle}</span>
              </div>
            )}
            {pass.notes && (
              <p className="text-sand-400 text-xs mt-2 italic">{pass.notes}</p>
            )}
          </div>

          {/* Dashed divider */}
          <div className="flex items-center px-6 my-1">
            <div className="flex-1 border-t border-dashed border-sand-200" />
            <div className="w-4 h-4 rounded-full bg-[#0F172A] mx-3 flex-shrink-0 border border-sand-200" />
            <div className="flex-1 border-t border-dashed border-sand-200" />
          </div>

          {/* QR code section */}
          <div className="p-6 flex flex-col items-center">
            {pass.status === 'active' ? (
              <>
                <p className="text-sand-400 text-xs mb-4 text-center">
                  Share this QR code with your guest — they'll scan it at the gate
                </p>
                <div className="shadow-card rounded-2xl">
                  <QRCode value={pass.qrCode} size={200} />
                </div>
                <p className="text-sand-400 text-xs mt-3 font-mono">{pass.qrCode}</p>
              </>
            ) : (
              <div className="flex flex-col items-center py-4">
                <X size={40} className="text-sand-300 mb-2" />
                <p className="text-sand-400 text-sm">Pass no longer active</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Actions */}
        {pass.status === 'active' && (
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="secondary"
                fullWidth
                onClick={handleCopy}
                icon={copied ? <CheckCircle size={16} /> : <Copy size={16} />}
              >
                {copied ? 'Copied!' : 'Copy Code'}
              </Button>
              <Button
                variant="secondary"
                fullWidth
                icon={<Share2 size={16} />}
              >
                Share Pass
              </Button>
            </div>
            <Button
              variant="danger"
              fullWidth
              size="lg"
              icon={<X size={16} />}
            >
              Cancel Pass
            </Button>
          </div>
        )}

        {pass.status === 'expired' && (
          <Button
            fullWidth
            size="lg"
            onClick={() => router.push('/passes/create')}
            icon={<Ticket size={16} />}
          >
            Create New Pass
          </Button>
        )}
      </div>
    </div>
  )
}
