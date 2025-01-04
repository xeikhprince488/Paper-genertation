import { Bell } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function Alerts() {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center gap-2 pb-2">
        <Bell className="h-5 w-5 text-rose-500" />
        <CardTitle className="text-lg">New Alerts</CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4 text-right" style={{ direction: 'rtl' }}>
          <p className="text-sm">اردو فونٹ ڈاؤن لوڈ کرنے کے لئے کلک کریں۔</p>
          <p className="text-sm flex items-center gap-2">
            <span className="text-green-500">✓</span>
            بورڈ کی طے شدہ کتب میں سے تمام سوالات لازمی کر دیا گیا ہے۔
          </p>
          <p className="text-sm flex items-center gap-2">
            <span className="text-green-500">✓</span>
            بورڈ کی طے شدہ کتب پاکستان میں سے تمام سوالات لازمی کر دیا گیا ہے۔
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

