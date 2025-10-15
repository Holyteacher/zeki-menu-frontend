"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, DollarSign, ShoppingBag, Clock } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Analitik</h2>
          <p className="text-muted-foreground">Restoran performansınızı takip edin</p>
        </div>
        <Select defaultValue="7gun">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bugun">Bugün</SelectItem>
            <SelectItem value="7gun">Son 7 gün</SelectItem>
            <SelectItem value="30gun">Son 30 gün</SelectItem>
            <SelectItem value="90gun">Son 90 gün</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Toplam Gelir</p>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-foreground">₺24.580</p>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-medium">+12.5%</span>
              <span className="text-muted-foreground">geçen haftaya göre</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Toplam Sipariş</p>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-foreground">1.248</p>
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-medium">+8.2%</span>
              <span className="text-muted-foreground">geçen haftaya göre</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Ort. Sipariş Tutarı</p>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-foreground">₺19.68</p>
            <div className="flex items-center gap-1 text-sm">
              <TrendingDown className="h-4 w-4 text-red-600" />
              <span className="text-red-600 font-medium">-2.1%</span>
              <span className="text-muted-foreground">geçen haftaya göre</span>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Ort. Bekleme Süresi</p>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <p className="text-3xl font-bold text-foreground">18 dk</p>
            <div className="flex items-center gap-1 text-sm">
              <TrendingDown className="h-4 w-4 text-green-600" />
              <span className="text-green-600 font-medium">-15%</span>
              <span className="text-muted-foreground">geçen haftaya göre</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Popular Items */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">En Çok Satan Ürünler</h3>
        <div className="space-y-4">
          {[
            { name: "Margherita Pizza", orders: 156, revenue: "₺2.964", trend: "+12%" },
            { name: "Izgara Somon", orders: 142, revenue: "₺3.976", trend: "+8%" },
            { name: "Caesar Salata", orders: 128, revenue: "₺1.600", trend: "+15%" },
            { name: "Pasta Carbonara", orders: 98, revenue: "₺2.156", trend: "+5%" },
            { name: "Tiramisu", orders: 87, revenue: "₺826", trend: "-3%" },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary font-bold">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{item.orders} sipariş</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">{item.revenue}</p>
                <Badge variant={item.trend.startsWith("+") ? "secondary" : "outline"}>{item.trend}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Peak Hours */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Yoğun Saatler</h3>
        <div className="space-y-3">
          {[
            { time: "12:00 - 13:00", orders: 89, percentage: 100 },
            { time: "13:00 - 14:00", orders: 76, percentage: 85 },
            { time: "19:00 - 20:00", orders: 82, percentage: 92 },
            { time: "20:00 - 21:00", orders: 68, percentage: 76 },
          ].map((hour, i) => (
            <div key={i} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground font-medium">{hour.time}</span>
                <span className="text-muted-foreground">{hour.orders} sipariş</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${hour.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
