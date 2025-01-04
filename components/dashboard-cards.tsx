import { FileText, Users, History, Settings, Bell, ClipboardList } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export function DashboardCards() {
  const cards = [
    {
      title: "Generate Paper",
      description: "Method 1",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      link: "/generate-paper-1",
    },
    {
      title: "Generate Paper",
      description: "Method 2 (Coming Soon)",
      icon: <FileText className="h-6 w-6 text-cyan-500" />,
      link: "/generate-paper-2",
      disabled: true,
    },
    {
      title: "Saved Papers",
      description: "Download / Print Papers",
      count: "24",
      icon: <ClipboardList className="h-6 w-6 text-green-500" />,
      link: "/saved-papers",
    },
    {
      title: "Sub Users",
      description: "Create Subusers Accounts",
      count: "0",
      icon: <Users className="h-6 w-6 text-amber-500" />,
      link: "/sub-users",
    },
    {
      title: "Past Papers",
      description: "Previous Boards Papers",
      icon: <History className="h-6 w-6 text-blue-500" />,
      link: "/past-papers",
    },
    {
      title: "Account Settings",
      description: "Update Account Settings",
      icon: <Settings className="h-6 w-6 text-rose-500" />,
      link: "/settings",
    },
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {cards.map((card) => (
        <Link
          key={card.title + card.description}
          href={card.link}
          className={`block ${card.disabled ? 'cursor-not-allowed opacity-70' : ''}`}
        >
          <Card className="h-full hover:bg-accent/50 transition-colors">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-full p-2 bg-background shadow-sm">{card.icon}</div>
              <div>
                <h3 className="font-semibold">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
                {card.count && (
                  <p className="text-sm font-medium mt-1">{card.count}</p>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

