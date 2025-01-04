import { Sidebar } from "@/components/sidebar"
import { SyllabusCard } from "@/components/syllabus-card"

const syllabusOptions = [

  { grade: "9TH", href: "/generate-paper-1/9th" },
  // { grade: "10TH", href: "/generate-paper-1/10th" },
  { grade: "10TH", href: "#" },
  // { grade: "INTER-I", href: "/generate-paper-1/inter-1" },
  { grade: "INTER-I", href: "#" },
  // { grade: "INTER-II", href: "/generate-paper-1/inter-2" },
  { grade: "INTER-II", href: "#" },
]

export default function GeneratePaperPage() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 fixed inset-y-0">
        <Sidebar />
      </aside>
      <main className="flex-1 ml-64">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <header className="mb-8">
              <h1 className="text-2xl font-bold">Select Syllabus</h1>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {syllabusOptions.map((option) => (
                <SyllabusCard
                  key={option.grade}
                  grade={option.grade}
                  href={option.href}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

