'use client'

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface CheckboxTreeProps {
  items: {
    id: string
    title: string
    items?: {
      id: string
      title: string
    }[]
  }[]
  onSelectionChange?: (selectedItems: string[]) => void
}

export function CheckboxTree({ items, onSelectionChange }: CheckboxTreeProps) {
  const [selected, setSelected] = React.useState<string[]>([])

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = items.flatMap(item => [
        item.id,
        ...(item.items?.map(subItem => subItem.id) || [])
      ])
      setSelected(allIds)
      onSelectionChange?.(allIds)
    } else {
      setSelected([])
      onSelectionChange?.([])
    }
  }

  const handleParentSelect = (parentId: string, checked: boolean) => {
    const parent = items.find(item => item.id === parentId)
    if (!parent) return

    const childIds = parent.items?.map(item => item.id) || []
    const newSelected = checked
      ? [...selected, parentId, ...childIds]
      : selected.filter(id => id !== parentId && !childIds.includes(id))

    setSelected([...new Set(newSelected)])
    onSelectionChange?.([...new Set(newSelected)])
  }

  const handleChildSelect = (childId: string, checked: boolean) => {
    const newSelected = checked
      ? [...selected, childId]
      : selected.filter(id => id !== childId)

    setSelected(newSelected)
    onSelectionChange?.(newSelected)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Checkbox
          id="select-all"
          checked={selected.length === items.flatMap(item => [item.id, ...(item.items?.map(subItem => subItem.id) || [])]).length}
          onCheckedChange={handleSelectAll}
        />
        <Label htmlFor="select-all" className="text-sm font-medium text-red-500">
          SELECT ALL CHAPTERS
        </Label>
      </div>
      {items.map((item) => (
        <div key={item.id} className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id={item.id}
              checked={selected.includes(item.id) || (item.items?.every(subItem => selected.includes(subItem.id)) ?? false)}
              onCheckedChange={(checked) => handleParentSelect(item.id, checked as boolean)}
            />
            <Label htmlFor={item.id} className="text-sm font-medium">
              {item.title}
            </Label>
          </div>
          {item.items && (
            <div className="ml-6 space-y-2">
              {item.items.map((subItem) => (
                <div key={subItem.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={subItem.id}
                    checked={selected.includes(subItem.id)}
                    onCheckedChange={(checked) => handleChildSelect(subItem.id, checked as boolean)}
                  />
                  <Label htmlFor={subItem.id} className="text-sm">
                    {subItem.title}
                  </Label>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

