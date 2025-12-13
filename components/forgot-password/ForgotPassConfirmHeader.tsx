import Image from 'next/image'
import React from 'react'
import { Label } from '../ui/label'

export default function ForgotPassConfirmHeader() {
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
          Create a New Password
        </Label>
        <Label variant="p" className="text-center">
          Enter and confirm your new password below. Once
        </Label>
      </div>
    </div>
  )
}
