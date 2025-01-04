'use client'

import { Button } from "@/components/ui/button"
import { Eye, Edit, Printer, FileText } from 'lucide-react'
import { cn } from "@/lib/utils"

interface PaperNavigationProps {
  currentView: string
  onViewChange: (view: string) => void
}

export function PaperNavigation({ currentView, onViewChange }: PaperNavigationProps) {
  const items = [
    { id: 'view', label: "Question's View", icon: Eye },
    { id: 'edit', label: 'Manual Editing', icon: Edit },
    { id: 'print-single', label: 'Print Paper Single', icon: Printer },
    { id: 'print-double', label: 'Print Paper Double', icon: Printer },
    { id: 'print-half', label: 'Print Paper Half', icon: Printer },
    { id: 'save', label: 'Save Paper', icon: FileText },
    { id: 'cancel', label: 'Cancel Paper', icon: FileText },
  ]

  return (
    <div className="w-64 border-r h-full bg-gray-50">
      <div className="space-y-1 p-4">
        {items.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2 text-sm",
              currentView === item.id && "bg-white"
            )}
            onClick={() => onViewChange(item.id)}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </div>
    </div>
  )
}

