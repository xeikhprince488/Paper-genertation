'use client'

import { Home, LogOut, Key } from 'lucide-react'
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col h-full border-r bg-white">
      <div className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <Image
            src="/placeholder.svg"
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full bg-muted"
          />
          <div className="text-center">
            <h2 className="text-lg font-semibold">MRS. MUHAMMAD IRFAN AQEEL</h2>
            <p className="text-sm text-muted-foreground">Administrator</p>
          </div>
          <div className="w-full p-2 bg-green-600 text-white text-center rounded-md">
            <div className="text-sm">VALID TILL</div>
            <div className="font-semibold">03-NOV-2025</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          <Link
            href="/dashboard"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ${
              pathname === '/dashboard' ? 'bg-accent' : ''
            }`}
          >
            <Home className="h-4 w-4" />
            Dashboard
          </Link>
          <Link
            href="/change-password"
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ${
              pathname === '/change-password' ? 'bg-accent' : ''
            }`}
          >
            <Key className="h-4 w-4" />
            <span className="opacity-50 cursor-not-allowed">Change Password</span>
          </Link>
          <div
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
              pathname === '/logout' ? 'bg-accent' : ''
            }`}
          >
            <LogOut className="h-4 w-4" />
            <span className="opacity-50 cursor-not-allowed">Log Out</span>
          </div>
        </div>
      </nav>
    </div>
  )
}

