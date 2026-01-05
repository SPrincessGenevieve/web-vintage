'use client'
import { usePortfolio } from '@/context/PortfolioContext'
import React from 'react'

export default function Portfolio() {
  const {portfolio} = usePortfolio()
  console.log("PORFOLIO: ", portfolio)
  return (
    <div>
      
    </div>
  )
}
