import { Label } from '@/components/ui/label'
import Image from 'next/image'
import React from 'react'

export default function InviteHeader() {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Image
        width={400}
        height={400}
        alt="logo"
        className="w-25"
        src={"/logo.png"}
      ></Image>
      <div className="w-full flex flex-col my-4 items-center justify-center">
        <Label variant="h1" className="text-center">
          You're invited!
        </Label>
        <Label variant="p">Enter your email to get started</Label>
      </div>
    </div>
  )
}
