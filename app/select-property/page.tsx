'use client'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/layout/PageHeader'
import Badge from '@/components/ui/Badge'
import { userUnits } from '@/lib/mock-data'

export default function SelectPropertyPage() {
  const router = useRouter()

  // Group units by compound
  const grouped = userUnits.reduce<Record<string, typeof userUnits>>((acc, unit) => {
    if (!acc[unit.compound]) acc[unit.compound] = []
    acc[unit.compound].push(unit)
    return acc
  }, {})

  return (
    <div className="phone-frame bg-bg min-h-screen safe-bottom">
      <PageHeader title="Your Properties" large />

      <div className="px-4 pb-6">
        {Object.entries(grouped).map(([compound, units]) => (
          <div key={compound} className="mb-6">
            <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide px-0 mb-1.5">
              {compound}
            </p>
            <div className="bg-surface rounded-[12px] divide-y divide-sep">
              {units.map((unit) => (
                <button
                  key={unit.id}
                  onClick={() => router.push('/home')}
                  className="w-full px-4 py-3.5 flex items-center text-left active:bg-fill transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-[15px] font-semibold text-txt">Unit {unit.unit}</span>
                      {unit.isDefault && <Badge label="Default" variant="blue" />}
                    </div>
                    <p className="text-[13px] text-txt-secondary">{unit.building}</p>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <p className="text-[12px] text-txt-tertiary mb-0.5">Parking</p>
                    <span className="text-[13px] font-mono text-txt-secondary">
                      {unit.parkingUsed}/{unit.parkingAllowance}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
