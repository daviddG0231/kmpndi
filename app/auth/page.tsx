'use client'
import { useState, useRef, KeyboardEvent, ClipboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

export default function AuthPage() {
  const router = useRouter()
  const [step, setStep] = useState<'phone' | 'otp'>('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const otpRefs = useRef<(HTMLInputElement | null)[]>([])

  function handlePhoneContinue() {
    if (phone.trim().length >= 7) setStep('otp')
  }

  function handleOtpChange(index: number, val: string) {
    if (!/^\d?$/.test(val)) return
    const next = [...otp]
    next[index] = val
    setOtp(next)
    if (val && index < 5) otpRefs.current[index + 1]?.focus()
    if (next.every(d => d !== '')) {
      setTimeout(() => router.push('/select-property'), 100)
    }
  }

  function handleOtpKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus()
    }
  }

  function handleOtpPaste(e: ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const text = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const next = [...otp]
    for (let i = 0; i < text.length; i++) next[i] = text[i]
    setOtp(next)
    const focusIdx = Math.min(text.length, 5)
    otpRefs.current[focusIdx]?.focus()
    if (next.every(d => d !== '')) {
      setTimeout(() => router.push('/select-property'), 100)
    }
  }

  return (
    <div className="phone-frame bg-bg min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col justify-center px-6 pb-10">
        {/* Branding */}
        <div className="mb-10">
          <div className="w-12 h-12 rounded-[14px] bg-accent flex items-center justify-center mb-4">
            <span className="text-white text-[18px] font-bold">K</span>
          </div>
          <h1 className="text-[26px] font-bold text-txt tracking-tight">Kmpndi</h1>
          <p className="text-[14px] text-txt-secondary mt-1">Community access management</p>
        </div>

        {step === 'phone' ? (
          <div>
            <h2 className="text-[22px] font-semibold text-txt mb-1">Enter your number</h2>
            <p className="text-[14px] text-txt-secondary mb-8">We will send you a verification code</p>

            <div className="mb-6">
              <label className="text-[13px] font-medium text-txt-secondary pl-1 block mb-1">Mobile number</label>
              <div className="flex items-center gap-2">
                <div className="h-[44px] px-3.5 rounded-[10px] bg-fill flex items-center shrink-0">
                  <span className="text-[15px] text-txt font-mono">+20</span>
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/\D/g, ''))}
                  placeholder="100 123 4567"
                  maxLength={11}
                  autoFocus
                  className="flex-1 h-[44px] rounded-[10px] bg-fill text-txt placeholder:text-txt-tertiary text-[15px] px-3.5 focus:outline-none focus:ring-2 focus:ring-accent/20 font-mono"
                />
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handlePhoneContinue}
              disabled={phone.trim().length < 7}
            >
              Continue
            </Button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setStep('phone')}
              className="text-[14px] text-accent mb-6 -ml-0.5"
            >
              ← Change number
            </button>
            <h2 className="text-[22px] font-semibold text-txt mb-1">Verify your number</h2>
            <p className="text-[14px] text-txt-secondary mb-8">
              Enter the 6-digit code sent to +20 {phone}
            </p>

            <div className="flex gap-2.5 mb-8">
              {otp.map((digit, i) => (
                <input
                  key={i}
                  ref={el => { otpRefs.current[i] = el }}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleOtpChange(i, e.target.value)}
                  onKeyDown={e => handleOtpKeyDown(i, e)}
                  onPaste={i === 0 ? handleOtpPaste : undefined}
                  autoFocus={i === 0}
                  className="flex-1 aspect-square max-w-[52px] rounded-[10px] bg-fill text-txt text-[20px] font-mono text-center focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              ))}
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={() => router.push('/select-property')}
              disabled={otp.some(d => d === '')}
            >
              Verify
            </Button>

            <button className="w-full text-center text-[14px] text-accent mt-4">
              Resend code
            </button>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 text-center">
        <p className="text-[11px] text-txt-tertiary">v1.0.0 · Demo Mode</p>
      </div>
    </div>
  )
}
