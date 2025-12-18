import { cn } from '@/lib/utils'

export function Button({ className, children, variant = 'default', size = 'md', ...props }) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-400',
        'disabled:pointer-events-none disabled:opacity-50',
        variant === 'default' && 'bg-black text-white hover:bg-gray-800 shadow-sm hover:shadow-md',
        variant === 'outline' && 'border-2 border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400 text-gray-700',
        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-4 py-2 text-base',
        size === 'lg' && 'px-6 py-3 text-lg',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
