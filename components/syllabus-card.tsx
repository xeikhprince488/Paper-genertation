import { ArrowRight } from 'lucide-react'
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface SyllabusCardProps {
  grade: string
  href: string
}

export function SyllabusCard({ grade, href }: SyllabusCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full hover:bg-accent/50 transition-colors">
        <CardContent className="flex items-center justify-between p-6">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-red-500 mb-1">{grade}</h3>
            <p className="text-sm text-muted-foreground">PTB</p>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  )
}

