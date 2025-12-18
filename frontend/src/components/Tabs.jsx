import { useState } from 'react'
import { cn } from '@/lib/utils'

export function Tabs({ defaultValue, children, className }) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <div className={cn('w-full', className)}>
      {children({ activeTab, setActiveTab })}
    </div>
  )
}

export function TabsList({ children, activeTab, setActiveTab, className }) {
  return (
    <div className={cn('inline-flex h-12 items-center justify-center rounded-lg bg-gray-100 p-1.5 border border-gray-200', className)}>
      {children.map((child) => {
        if (child.props.value) {
          return (
            <button
              key={child.props.value}
              onClick={() => setActiveTab(child.props.value)}
              className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-md px-6 py-2.5 text-sm font-semibold transition-all duration-200',
                activeTab === child.props.value
                  ? 'bg-black text-white shadow-sm transform scale-105'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
              )}
            >
              {child.props.children}
            </button>
          )
        }
        return child
      })}
    </div>
  )
}

export function TabsTrigger({ value, children }) {
  return <>{children}</>
}

export function TabsContent({ value, activeTab, children, className }) {
  if (value !== activeTab) return null
  return <div className={cn('mt-6 animate-in fade-in duration-300', className)}>{children}</div>
}
