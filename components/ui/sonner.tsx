"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

export function Toaster(props: ToasterProps) {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="top-right"
      duration={4000}
      icons={{
        success: <CircleCheckIcon className="size-5 text-green-600" />,
        error: <OctagonXIcon className="size-5 text-red-600" />,
        warning: <TriangleAlertIcon className="size-5 text-yellow-600" />,
        info: <InfoIcon className="size-5 text-blue-600" />,
        loading: (
          <Loader2Icon className="size-5 animate-spin text-gray-600" />
        ),
      }}
      toastOptions={{
        classNames: {
          toast: `
            rounded-xl shadow-lg border px-4 py-3 font-medium
            flex items-center gap-3

            data-[type=success]:bg-green-50
            data-[type=success]:border-green-300
            data-[type=success]:text-green-900

            data-[type=error]:bg-red-50
            data-[type=error]:border-red-300
            data-[type=error]:text-red-900

            data-[type=warning]:bg-yellow-50
            data-[type=warning]:border-yellow-300
            data-[type=warning]:text-yellow-900

            data-[type=info]:bg-blue-50
            data-[type=info]:border-blue-300
            data-[type=info]:text-blue-900

            data-[type=loading]:bg-gray-100
            data-[type=loading]:border-gray-300
            data-[type=loading]:text-gray-700
          `,
        },
      }}
      {...props}
    />
  )
}
