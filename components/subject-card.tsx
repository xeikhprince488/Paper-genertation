import { ArrowRight } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

interface SubjectCardProps {
  title: string
  titleUrdu?: string
  grade: string
  href: string
  imageUrl: string
  year?: string
}

export function SubjectCard({ title, titleUrdu, grade, href, imageUrl, year }: SubjectCardProps) {
  return (
    <Link href={href}>
      <Card className="h-full hover:bg-accent/50 transition-colors">
        <CardContent className="flex items-center gap-4 p-6">
          <Image
            src={imageUrl}
            alt={title}
            width={80}
            height={100}
            className="object-cover rounded-sm"
          />
          <div className="flex-1">
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-red-500">
                {title}
              </h3>
              {titleUrdu && (
                <p className="text-lg text-red-500" style={{ direction: 'rtl' }}>
                  {titleUrdu}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                {year || grade}
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-muted-foreground" />
        </CardContent>
      </Card>
    </Link>
  )
}

