'use client'
import { useRouter } from 'next/navigation'
import PageHeader from '@/components/layout/PageHeader'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import { familyMembers } from '@/lib/mock-data'

export default function FamilyPage() {
  const router = useRouter()

  return (
    <div className="phone-frame bg-bg min-h-screen pb-10">
      <PageHeader
        title="Family"
        backPath="/profile"
        rightAction={
          <button
            className="w-[34px] h-[34px] rounded-full bg-accent flex items-center justify-center"
          >
            <Plus size={18} className="text-white" strokeWidth={2.5} />
          </button>
        }
      />

      <div className="px-4 pb-6 space-y-4">
        <p className="text-[13px] text-txt-secondary">
          Family members can share access to your compound unit.
        </p>

        <div>
          <p className="text-[13px] font-semibold text-txt-secondary uppercase tracking-wide mb-1.5">Members</p>
          <div className="bg-surface rounded-[12px] divide-y divide-sep">
            {familyMembers.map(member => {
              const initials = member.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
              return (
                <div key={member.id} className="px-4 py-3.5 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-accent-light flex items-center justify-center shrink-0">
                    <span className="text-[13px] font-semibold text-accent">{initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="text-[15px] font-semibold text-txt truncate">{member.name}</p>
                      <Badge
                        label={member.status}
                        variant={member.status === 'active' ? 'green' : 'orange'}
                      />
                    </div>
                    <p className="text-[13px] text-txt-secondary">{member.relation}</p>
                    <p className="text-[12px] font-mono text-txt-tertiary">{member.phone}</p>
                    <div className="flex gap-1.5 mt-1.5">
                      {member.canInviteGuests && (
                        <Badge label="Can invite guests" variant="blue" />
                      )}
                      {member.canAddVehicles && (
                        <Badge label="Can add vehicles" variant="blue" />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <Button variant="secondary" size="lg" fullWidth icon={<Plus size={16} />}>
          Add Family Member
        </Button>
      </div>
    </div>
  )
}
