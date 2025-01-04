import { Sidebar } from "@/components/sidebar"
import { SubjectCard } from "@/components/subject-card"

const subjects = [
  {
    title: "Biology",
    grade: "9TH",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "/generate-paper-1/9th/biology"
  },
  {
    title: "Computer",
    grade: "2020",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "#"
  },
  {
    title: "Chemistry",
    grade: "9TH",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "#"
  },
  {
    title: "Physics",
    grade: "9TH",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "#"
  },
  {
    title: "Mathematics",
    grade: "9TH",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "#"
  },
  {
    title: "English",
    grade: "9TH",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "#"
  },
  {
    title: "General Science",
    grade: "9TH",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "#"
  },
  {
    title: "Urdu",
    titleUrdu: "اردو لازمی",
    grade: "9TH",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "#"
  },
  {
    title: "Islamiat",
    titleUrdu: "اسلامیات لازمی",
    grade: "SNC-2022",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "#"
  },
  {
    title: "Ethics",
    titleUrdu: "اخلاقیات",
    grade: "PTB",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "#"
  },
  {
    title: "History",
    titleUrdu: "تاریخ",
    grade: "9TH",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "#"
  },
  {
    title: "Geography",
    titleUrdu: "جغرافیہ",
    grade: "9TH",
    imageUrl: "/placeholder.svg?height=100&width=80",
    href: "#"
  }
]

export default function NinthGradeSubjectsPage() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 fixed inset-y-0">
        <Sidebar />
      </aside>
      <main className="flex-1 ml-64">
        <div className="p-8">
          <div className="max-w-6xl mx-auto">
            <header className="mb-8">
              <h1 className="text-2xl font-bold">Select Subject - 9th Grade</h1>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjects.map((subject) => (
                <SubjectCard
                  key={subject.title}
                  {...subject}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

