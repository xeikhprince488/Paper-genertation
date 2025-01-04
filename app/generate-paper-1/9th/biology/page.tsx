'use client'

import { Sidebar } from "@/components/sidebar"
import { CheckboxTree } from "@/components/ui/checkbox-tree"
import { Button } from "@/components/ui/button"
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const chapters = [
  {
    id: "chap-1",
    title: "CHAP 1 Introduction to Biology",
    items: [
      { id: "1.1", title: "1.1 Introduction to Biology" },
      { id: "1.2", title: "1.2 The Levels of Organization" }
    ]
  },
  {
    id: "chap-2",
    title: "CHAP 2 Solving a Biological Problem",
    items: [
      { id: "2.1", title: "2.1 Biological Method" },
      { id: "2.2", title: "2.2 Data Organization and Analysis" },
      { id: "2.3", title: "2.3 Mathematics as Integral Part of Scientific Process" }
    ]
  },
  {
    id: "chap-3",
    title: "CHAP 3 Biodiversity",
    items: [
      { id: "3.1", title: "3.1 Biodiversity" },
      { id: "3.2", title: "3.2 Aims and Principles of Classification" },
      { id: "3.3", title: "3.3 History of Classification Systems" },
      { id: "3.4", title: "3.4 The Five Kingdoms" },
      { id: "3.5", title: "3.5 Binomial Nomenclature" },
      { id: "3.6", title: "3.6 Conservation of Biodiversity" }
    ]
  },
  {
    id: "chap-4",
    title: "CHAP 4 Cells and Tissues",
    items: [
      { id: "4.1", title: "4.1 Microscopy and the Emergence of Cell Theory" },
      { id: "4.2", title: "4.2 Cellular Structures and Functions" },
      { id: "4.3", title: "4.3 Cell Size and Surface Area to Volume Ratio" },
      { id: "4.4", title: "4.4 Passage of Molecules into and out of Cells" },
      { id: "4.5", title: "4.5 Animal and Plant Tissues" }
    ]
  },
  {
    id: "chap-5",
    title: "CHAP 5 Cell Cycle",
    items: [
      { id: "5.1", title: "5.1 Cell Cycle" },
      { id: "5.2", title: "5.2 Mitosis" },
      { id: "5.3", title: "5.3 Meiosis" },
      { id: "5.4", title: "5.4 Apoptosis and Necrosis" }
    ]
  },
  {
    id: "chap-6",
    title: "CHAP 6 Enzymes",
    items: [
      { id: "6.1", title: "6.1 Characteristics of Enzymes" },
      { id: "6.2", title: "6.2 Mechanism of Enzymes action" },
      { id: "6.3", title: "6.3 Specificity of Enzymes" }
    ]
  },
  {
    id: "chap-7",
    title: "CHAP 7 Bioenergetics",
    items: [
      { id: "7.1", title: "7.1 Bioenergetics and the Role of ATP" },
      { id: "7.2", title: "7.2 Photosynthesis" },
      { id: "7.3", title: "7.3 Respiration" }
    ]
  },
  {
    id: "chap-8",
    title: "CHAP 8 Nutrition",
    items: [
      { id: "8.1", title: "8.1 Mineral Nutrition in Plants" },
      { id: "8.2", title: "8.2 Components of Human Food" },
      { id: "8.3", title: "8.3 Digestion in Human" },
      { id: "8.4", title: "8.4 Disorders of Gut" }
    ]
  },
  {
    id: "chap-9",
    title: "CHAP 9 Transport",
    items: [
      { id: "9.1", title: "9.1 Transport in Plants" },
      { id: "9.2", title: "9.2 Transport in Human" },
      { id: "9.3", title: "9.3 Cardiovascular Disorder" }
    ]
  }
]

export default function BiologyChaptersPage() {
  const router = useRouter()
  const handleSelectionChange = (selectedItems: string[]) => {
    console.log('Selected items:', selectedItems)
  }

  const handleNext = () => {
    router.push('/generate-paper-1/9th/biology/configure')
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 fixed inset-y-0">
        <Sidebar />
      </aside>
      <main className="flex-1 ml-64">
        <div className="p-8">
          <div className="max-w-4xl mx-auto">
            <header className="mb-8">
              <h1 className="text-2xl font-bold">Select Chapters - Biology (9th)</h1>
            </header>
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <CheckboxTree items={chapters} onSelectionChange={handleSelectionChange} />
              <div className="mt-6 flex justify-end">
                <Button 
                  className="bg-blue-500 hover:bg-blue-600"
                  onClick={handleNext}
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

