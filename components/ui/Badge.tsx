interface BadgeProps {
  label: string
  variant?: 'green' | 'orange' | 'red' | 'blue' | 'gray'
  size?: 'sm' | 'md'
}

const styles: Record<string, string> = {
  green: 'bg-[#34C75920] text-sys-green',
  orange: 'bg-[#FF950020] text-sys-orange',
  red: 'bg-[#FF3B3020] text-sys-red',
  blue: 'bg-[#007AFF20] text-sys-blue',
  gray: 'bg-fill text-txt-secondary',
}

export default function Badge({ label, variant = 'gray', size = 'sm' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center font-medium rounded-full ${styles[variant]} ${size === 'sm' ? 'text-[11px] px-2 py-[2px]' : 'text-[13px] px-2.5 py-[3px]'}`}>
      {label}
    </span>
  )
}
