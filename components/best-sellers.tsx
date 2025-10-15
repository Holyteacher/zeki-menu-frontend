"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, Grid3x3, List, DollarSign, ShoppingBag } from "lucide-react"

interface BestSellerItem {
  id: string
  name: string
  category: string
  sales: number
  revenue: number
  trend: number
}

export function BestSellers() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [timePeriod, setTimePeriod] = useState<"today" | "week" | "month">("today")

  const bestSellers: Record<string, BestSellerItem[]> = {
    today: [
      { id: "1", name: "Margherita Pizza", category: "Ana Yemek", sales: 24, revenue: 455.76, trend: 12 },
      { id: "2", name: "Izgara Somon", category: "Ana Yemek", sales: 18, revenue: 504.0, trend: 8 },
      { id: "3", name: "Sezar Salata", category: "Salatalar", sales: 16, revenue: 200.0, trend: -3 },
      { id: "4", name: "Tiramisu", category: "Tatlılar", sales: 14, revenue: 133.0, trend: 15 },
      { id: "5", name: "Karbonar Makarna", category: "Ana Yemek", sales: 12, revenue: 264.0, trend: 5 },
    ],
    week: [
      { id: "1", name: "Margherita Pizza", category: "Ana Yemek", sales: 156, revenue: 2960.44, trend: 18 },
      { id: "2", name: "Izgara Somon", category: "Ana Yemek", sales: 142, revenue: 3976.0, trend: 12 },
      { id: "3", name: "Karbonar Makarna", category: "Ana Yemek", sales: 128, revenue: 2816.0, trend: 22 },
      { id: "4", name: "Sezar Salata", category: "Salatalar", sales: 98, revenue: 1225.0, trend: 8 },
      { id: "5", name: "Tiramisu", category: "Tatlılar", sales: 87, revenue: 826.5, trend: 14 },
    ],
    month: [
      { id: "1", name: "Margherita Pizza", category: "Ana Yemek", sales: 642, revenue: 12193.58, trend: 15 },
      { id: "2", name: "Izgara Somon", category: "Ana Yemek", sales: 589, revenue: 16492.0, trend: 10 },
      { id: "3", name: "Karbonar Makarna", category: "Ana Yemek", sales: 512, revenue: 11264.0, trend: 25 },
      { id: "4", name: "Sezar Salata", category: "Salatalar", sales: 445, revenue: 5562.5, trend: 5 },
      { id: "5", name: "Bruschetta", category: "Başlangıçlar", sales: 398, revenue: 3578.02, trend: 18 },
    ],
  }

  const currentData = bestSellers[timePeriod]

  const getPeriodLabel = () => {
    switch (timePeriod) {
      case "today":
        return "Bugün"
      case "week":
        return "Bu Hafta"
      case "month":
        return "Bu Ay"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">En Çok Satanlar</h2>
          <p className="text-muted-foreground">En popüler menü ürünlerinizi görüntüleyin</p>
        </div>
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "list")}>
          <TabsList>
            <TabsTrigger value="grid" className="gap-2">
              <Grid3x3 className="h-4 w-4" />
              Izgara
            </TabsTrigger>
            <TabsTrigger value="list" className="gap-2">
              <List className="h-4 w-4" />
              Liste
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Time Period Selector */}
      <Card className="p-4">
        <Tabs value={timePeriod} onValueChange={(v) => setTimePeriod(v as "today" | "week" | "month")}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="today">Bugün</TabsTrigger>
            <TabsTrigger value="week">Bu Hafta</TabsTrigger>
            <TabsTrigger value="month">Bu Ay</TabsTrigger>
          </TabsList>
        </Tabs>
      </Card>

      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Toplam Satış</p>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold text-foreground">{currentData.reduce((sum, item) => sum + item.sales, 0)}</p>
          <p className="text-xs text-muted-foreground mt-2">{getPeriodLabel()} için</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Toplam Gelir</p>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold text-foreground">
            ₺{currentData.reduce((sum, item) => sum + item.revenue, 0).toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground mt-2">{getPeriodLabel()} için</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-muted-foreground">Ortalama Trend</p>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold text-foreground">
            +{Math.round(currentData.reduce((sum, item) => sum + item.trend, 0) / currentData.length)}%
          </p>
          <p className="text-xs text-muted-foreground mt-2">Önceki döneme göre</p>
        </Card>
      </div>

      {/* Grid View */}
      {viewMode === "grid" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {currentData.map((item, index) => (
            <Card key={item.id} className="p-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm">
                      #{index + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.name}</h3>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                  </div>
                  <Badge variant={item.trend > 0 ? "secondary" : "outline"} className="gap-1">
                    <TrendingUp className={`h-3 w-3 ${item.trend < 0 ? "rotate-180" : ""}`} />
                    {Math.abs(item.trend)}%
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground">Satış</p>
                    <p className="text-lg font-bold text-foreground">{item.sales}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Gelir</p>
                    <p className="text-lg font-bold text-foreground">₺{item.revenue.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === "list" && (
        <Card>
          <div className="divide-y divide-border">
            {currentData.map((item, index) => (
              <div key={item.id} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-primary-foreground font-bold">
                    #{index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Satış</p>
                    <p className="text-lg font-bold text-foreground">{item.sales}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Gelir</p>
                    <p className="text-lg font-bold text-foreground">₺{item.revenue.toFixed(2)}</p>
                  </div>
                  <Badge variant={item.trend > 0 ? "secondary" : "outline"} className="gap-1 w-20">
                    <TrendingUp className={`h-3 w-3 ${item.trend < 0 ? "rotate-180" : ""}`} />
                    {Math.abs(item.trend)}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
