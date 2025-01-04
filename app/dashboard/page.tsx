import { Sidebar } from "@/components/sidebar"
import { DashboardCards } from "@/components/dashboard-cards"
import { Alerts } from "@/components/alerts"

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 fixed inset-y-0">
        <Sidebar />
      </aside>
      <main className="flex-1 ml-64">
        <div className="p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <header className="mb-8">
                <h1 className="text-2xl font-bold">LAVI ACADEMY</h1>
                <p className="text-sm text-muted-foreground mt-1">VERSION 8.0</p>
                <p className="text-sm text-muted-foreground">GARHAMOR TEHSIL MAILSI, DISTRICT VEHARI</p>
              </header>
              <DashboardCards />
            </div>
            <div className="w-full lg:w-80">
              <Alerts />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

