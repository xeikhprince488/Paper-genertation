import Image from "next/image"
import { cn } from "@/lib/utils"

interface PaperLayoutProps {
  children: React.ReactNode
  className?: string
}

export function PaperLayout({ children, className }: PaperLayoutProps) {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center gap-4">
          <Image
            src="/placeholder.svg"
            alt="School Logo"
            width={60}
            height={60}
            className="rounded-full"
          />
          <div>
            <h1 className="text-xl font-bold">LAVI ACADEMY</h1>
            <p className="text-sm text-muted-foreground">VERSION 8.0</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{new Date().toLocaleDateString()}</p>
          <p className="text-sm text-muted-foreground">THE SCHOLARS EDUCATIONAL COMPLEX</p>
          <p className="text-sm text-muted-foreground">GARHAMOR TEHSIL MAILSI, DISTRICT VEHARI</p>
        </div>
      </header>

      {/* Watermark */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] flex items-center justify-center">
        <div className="w-[800px] h-[800px] relative">
          <Image
            src="/placeholder.svg"
            alt="Watermark"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Content */}
      <div className={cn("relative z-10", className)}>
        {children}
      </div>
    </div>
  )
}

