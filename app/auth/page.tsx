'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Lock, ShieldCheck } from 'lucide-react'

export default function AuthPage() {
  const [step, setStep] = useState<'login' | 'otp'>('login')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSendOTP = async () => {
    if (phone.length < 10) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setStep('otp')
  }

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    const next = [...otp]
    next[index] = value.slice(-1)
    setOtp(next)
    if (value && index < 5) {
      const el = document.getElementById(`otp-${index + 1}`)
      el?.focus()
    }
  }

  const handleOtpKey = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const el = document.getElementById(`otp-${index - 1}`)
      el?.focus()
    }
  }

  const handleVerify = async () => {
    if (otp.join('').length < 6) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    router.push('/select-property')
  }

  return (
    <div className="min-h-screen bg-sand-50 px-5 pt-16 pb-8 flex flex-col">
      {/* Logo — compact */}
      <div className="flex flex-col items-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-14 h-14 rounded-2xl bg-forest flex items-center justify-center mb-4"
        >
          <ShieldCheck size={28} className="text-white" strokeWidth={1.8} />
        </motion.div>
        <h1 className="text-2xl font-black text-ink">Kmpndi</h1>
        <p className="text-ink-muted text-sm mt-0.5">Community access, simplified</p>
      </div>

      {/* Form */}
      <div className="bg-white border border-sand-200 rounded-2xl p-5 shadow-card">
        <AnimatePresence mode="wait">
          {step === 'login' ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
            >
              <h2 className="text-lg font-bold text-ink mb-0.5">Sign in</h2>
              <p className="text-ink-muted text-sm mb-5">Enter your registered phone number</p>

              <label className="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-2 block">
                Phone
              </label>
              <div className="relative mb-5">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 border-r border-sand-200 pr-2.5">
                  <span className="text-sm">🇪🇬</span>
                  <span className="text-xs font-semibold text-ink-muted">+20</span>
                </div>
                <input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="100 123 4567"
                  className="w-full h-12 bg-sand-50 border border-sand-200 rounded-xl pl-24 pr-4 text-ink text-sm font-medium placeholder:text-sand-400 focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest transition-all"
                  maxLength={11}
                />
              </div>

              <button
                onClick={handleSendOTP}
                disabled={phone.length < 10 || loading}
                className="w-full h-12 bg-forest hover:bg-forest-light disabled:opacity-40 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Continue <ArrowRight size={16} /></>
                )}
              </button>

              <p className="text-center text-[11px] text-sand-400 mt-4">
                By continuing you agree to our{' '}
                <span className="text-forest font-medium">Terms</span> &{' '}
                <span className="text-forest font-medium">Privacy</span>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
            >
              <button
                onClick={() => setStep('login')}
                className="text-forest text-sm font-medium mb-3"
              >
                ← Back
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-forest-50 flex items-center justify-center flex-shrink-0">
                  <Lock size={16} className="text-forest" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-ink">Verify code</h2>
                  <p className="text-[11px] text-ink-muted">Sent to +20 {phone}</p>
                </div>
              </div>

              {/* OTP — use min-w-0 and flex to prevent overflow */}
              <div className="flex gap-2 mb-5">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={e => handleOtpChange(i, e.target.value)}
                    onKeyDown={e => handleOtpKey(i, e)}
                    maxLength={1}
                    className={`
                      min-w-0 flex-1 h-12 text-center text-lg font-bold rounded-xl
                      bg-sand-50 border transition-all duration-150
                      text-ink focus:outline-none focus:ring-2 focus:ring-forest/20 focus:border-forest
                      ${digit ? 'border-forest bg-forest-50' : 'border-sand-200'}
                    `}
                  />
                ))}
              </div>

              <button
                onClick={handleVerify}
                disabled={otp.join('').length < 6 || loading}
                className="w-full h-12 bg-forest hover:bg-forest-light disabled:opacity-40 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : 'Verify & enter'}
              </button>

              <div className="flex items-center justify-center gap-1 mt-3">
                <span className="text-sand-400 text-xs">No code?</span>
                <button className="text-forest text-xs font-semibold">Resend</button>
              </div>

              <div className="mt-3 p-2.5 bg-gold-50 border border-gold/20 rounded-lg">
                <p className="text-[11px] text-gold-dark text-center font-medium">
                  Demo — enter any 6 digits
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-auto pt-6 text-center">
        <p className="text-[10px] text-sand-300 font-mono">KMPNDI v1.0</p>
      </div>
    </div>
  )
}
