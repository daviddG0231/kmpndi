'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Plus, Phone, Mail, Check, X,
  CircleUserRound, UserPlus, Trash2, Ticket, Users
} from 'lucide-react'
import PageHeader from '@/components/layout/PageHeader'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { familyMembers as initialFamilyMembers } from '@/lib/mock-data'
import type { FamilyMember } from '@/lib/types'

function FamilyMemberCard({ member, onRemove }: { member: FamilyMember; onRemove: (id: string) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-sand-200 rounded-2xl p-4 flex items-center gap-4"
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
        member.status === 'active' ? 'bg-forest/15' : 'bg-warning/15'
      }`}>
        <CircleUserRound size={28} className={member.status === 'active' ? 'text-forest' : 'text-status-warning'} />
      </div>
      <div className="flex-1">
        <p className="text-ink font-bold text-base">{member.name}</p>
        <p className="text-sand-400 text-xs mt-0.5">{member.relation}</p>
        <div className="flex items-center gap-1.5 mt-1">
          <Badge
            label={member.status === 'active' ? 'Active' : 'Pending'}
            variant={member.status === 'active' ? 'success' : 'warning'}
            dot
            size="sm"
          />
          <span className="text-sand-400 text-xs">{member.phone}</span>
        </div>
      </div>
      <button
        onClick={() => onRemove(member.id)}
        className="w-10 h-10 flex items-center justify-center rounded-2xl bg-sand-100 hover:bg-status-danger/20 transition-colors"
      >
        <Trash2 size={18} className="text-sand-400 hover:text-status-danger" />
      </button>
    </motion.div>
  )
}

export default function FamilyPage() {
  const router = useRouter()
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>(initialFamilyMembers)
  const [showAddMember, setShowAddMember] = useState(false)
  const [newMember, setNewMember] = useState({
    name: '',
    relation: '',
    phone: '',
    canInviteGuests: false,
    canAddVehicles: false,
  })
  const [loading, setLoading] = useState(false)

  const handleAddMember = async () => {
    if (!newMember.name || !newMember.relation || !newMember.phone) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    const id = `fm${familyMembers.length + 1}`
    setFamilyMembers(prev => [
      ...prev,
      { ...newMember, id, status: 'pending' }
    ])
    setLoading(false)
    setNewMember({
      name: '', relation: '', phone: '',
      canInviteGuests: false, canAddVehicles: false,
    })
    setShowAddMember(false)
  }

  const handleRemoveMember = (id: string) => {
    setFamilyMembers(prev => prev.filter(member => member.id !== id))
  }

  return (
    <div className="min-h-screen bg-sand-50">
      <PageHeader
        title="Family Members"
        backPath="/profile"
        subtitle={`Manage ${familyMembers.length} members`}
        rightAction={
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => setShowAddMember(true)}
            className="w-10 h-10 bg-forest rounded-2xl flex items-center justify-center shadow-card"
          >
            <Plus size={20} className="text-ink" />
          </motion.button>
        }
      />

      <div className="px-5 pb-8">
        <AnimatePresence mode="wait">
          {showAddMember ? (
            <motion.div
              key="add-member"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white border border-sand-200 rounded-2xl p-5 mb-5"
            >
              <h2 className="text-lg font-bold text-ink mb-4">Add New Family Member</h2>
              <Input
                label="Full Name"
                placeholder="e.g. Sara Ahmed"
                value={newMember.name}
                onChange={v => setNewMember(f => ({ ...f, name: v }))}
                icon={<User size={16} />}
                className="mb-3"
              />
              <Input
                label="Relation"
                placeholder="e.g. Spouse, Son, Daughter"
                value={newMember.relation}
                onChange={v => setNewMember(f => ({ ...f, relation: v }))}
                icon={<CircleUserRound size={16} />}
                className="mb-3"
              />
              <Input
                label="Phone Number"
                placeholder="+20 100 000 0000"
                value={newMember.phone}
                onChange={v => setNewMember(f => ({ ...f, phone: v }))}
                icon={<Phone size={16} />}
                type="tel"
                className="mb-5"
              />

              <div className="mb-5">
                <p className="text-sm font-medium text-ink-muted mb-2">Permissions</p>
                <label className="flex items-center gap-3 py-2">
                  <input
                    type="checkbox"
                    checked={newMember.canInviteGuests}
                    onChange={e => setNewMember(f => ({ ...f, canInviteGuests: e.target.checked }))}
                    className="w-5 h-5 rounded border-sand-300 bg-sand-100 text-forest focus:ring-accent focus:ring-offset-navy-900"
                  />
                  <Ticket size={16} className="text-forest flex-shrink-0" />
                  <span className="text-ink text-sm">Can Invite Guests</span>
                </label>
                <label className="flex items-center gap-3 py-2 mt-2">
                  <input
                    type="checkbox"
                    checked={newMember.canAddVehicles}
                    onChange={e => setNewMember(f => ({ ...f, canAddVehicles: e.target.checked }))}
                    className="w-5 h-5 rounded border-sand-300 bg-sand-100 text-forest focus:ring-accent focus:ring-offset-navy-900"
                  />
                  <UserPlus size={16} className="text-forest flex-shrink-0" />
                  <span className="text-ink text-sm">Can Add Vehicles</span>
                </label>
              </div>

              <Button
                fullWidth
                size="lg"
                loading={loading}
                onClick={handleAddMember}
                disabled={!newMember.name || !newMember.relation || !newMember.phone}
                icon={<Plus size={18} />}
              >
                Add Member
              </Button>
              <Button variant="ghost" fullWidth onClick={() => setShowAddMember(false)} className="mt-2">
                Cancel
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="member-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex flex-col gap-3 mb-5"
            >
              {familyMembers.length > 0 ? (
                familyMembers.map(member => (
                  <FamilyMemberCard
                    key={member.id}
                    member={member}
                    onRemove={handleRemoveMember}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-16 gap-3">
                  <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-2">
                    <Users size={28} className="text-sand-300" />
                  </div>
                  <p className="text-sand-400 font-semibold">No family members added</p>
                  <button
                    onClick={() => setShowAddMember(true)}
                    className="text-forest-light text-sm font-semibold"
                  >
                    Add your first family member →
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {!showAddMember && familyMembers.length > 0 && (
          <Button
            variant="secondary"
            fullWidth
            onClick={() => setShowAddMember(true)}
            icon={<Plus size={16} />}
          >
            Add Another Member
          </Button>
        )}
      </div>
    </div>
  )
}
