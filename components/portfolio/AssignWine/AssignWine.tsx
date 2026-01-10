'use client'
import { Label } from '@/components/ui/label'
import { CartItemT } from '@/lib/types'
import React from 'react'

export default function AssignWine({data} : {data: CartItemT}) {
  return (
    <div>
      <Label>Assign to Wine Cellar</Label>
    </div>
  )
}
