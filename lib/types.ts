export interface Vehicle {
  id: string
  plate: string
  make: string
  model: string
  color: string
  year: number
  type: 'car' | 'motorcycle' | 'truck' | 'suv'
  isPrimary: boolean
  sticker?: string
  lastSeen?: string
  status: 'active' | 'flagged' | 'pending'
}

export interface GuestPass {
  id: string
  guestName: string
  purpose: string
  validFrom: string
  validTo: string
  maxVisits: number
  usedVisits: number
  status: 'active' | 'expired' | 'used' | 'cancelled'
  qrCode: string
  vehicle?: string
  createdAt: string
  notes?: string
}

export interface ActivityEntry {
  id: string
  type: 'entry' | 'exit' | 'pass_used' | 'vehicle_flagged' | 'visitor'
  description: string
  timestamp: string
  gate: string
  vehicle?: string
  person?: string
  status: 'success' | 'denied' | 'warning'
  details?: string
}

export interface Notification {
  id: string
  title: string
  body: string
  type: 'entry' | 'exit' | 'pass' | 'security' | 'system'
  read: boolean
  timestamp: string
  icon?: string
}

export interface FamilyMember {
  id: string
  name: string
  relation: string
  phone: string
  photo?: string
  canInviteGuests: boolean
  canAddVehicles: boolean
  status: 'active' | 'pending'
}

export interface ParkingSpot {
  id: string
  number: string
  floor: string
  type: 'assigned' | 'visitor' | 'handicap'
  isOccupied: boolean
  vehicle?: string
  since?: string
}

export interface Unit {
  id: string
  unit: string
  building: string
  compound: string
  compoundId: string
  isDefault: boolean
  parkingAllowance: number
  parkingUsed: number
}

export interface User {
  id: string
  name: string
  phone: string
  email: string
  unit: string
  building: string
  compound: string
  photo?: string
  memberSince: string
  units: Unit[]
  activeUnitId: string
}
