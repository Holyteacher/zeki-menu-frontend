"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, AlertTriangle, CheckCircle2, Flame } from "lucide-react"

interface KitchenOrder {
  id: string
  tableNumber: number
  orderNumber: string
  items: {
    id: string
    name: string
    quantity: number
    notes?: string
    station: "grill" | "fryer" | "salad" | "dessert" | "drinks"
    priority: "normal" | "urgent"
  }[]
  status: "new" | "preparing" | "ready"
  timeElapsed: number
  estimatedTime: number
}

interface KitchenOrderCardProps {
  order: KitchenOrder
  selectedStation: string
}

export function KitchenOrderCard({ order, selectedStation }: KitchenOrderCardProps) {
  const isOverdue = order.timeElapsed > order.estimatedTime
  const isUrgent = order.items.some((item) => item.priority === "urgent")

  const getStatusColor = () => {
    if (order.status === "ready") return "border-green-500 bg-green-500/5"
    if (isOverdue || isUrgent) return "border-red-500 bg-red-500/5"
    if (order.status === "preparing") return "border-accent bg-accent/5"
    return "border-border"
  }

  const getStatusBadge = () => {
    switch (order.status) {
      case "new":
        return <Badge variant="outline">Yeni Sipariş</Badge>
      case "preparing":
        return <Badge variant="secondary">Hazırlanıyor</Badge>
      case "ready":
        return <Badge className="bg-green-600">Hazır</Badge>
    }
  }

  const getStationBadge = (station: string) => {
    const colors: Record<string, string> = {
      grill: "bg-red-500/10 text-red-700 dark:text-red-400",
      fryer: "bg-amber-500/10 text-amber-700 dark:text-amber-400",
      salad: "bg-green-500/10 text-green-700 dark:text-green-400",
      dessert: "bg-pink-500/10 text-pink-700 dark:text-pink-400",
      drinks: "bg-blue-500/10 text-blue-700 dark:text-blue-400",
    }
    return colors[station] || ""
  }

  const filteredItems =
    selectedStation === "tümü" ? order.items : order.items.filter((item) => item.station === selectedStation)

  return (
    <Card className={`p-4 border-2 ${getStatusColor()}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold text-foreground">Masa {order.tableNumber}</h3>
              {isUrgent && (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  Acil
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{order.orderNumber}</p>
          </div>
          {getStatusBadge()}
        </div>

        {/* Timer */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className={`h-5 w-5 ${isOverdue ? "text-red-600" : "text-muted-foreground"}`} />
            <div>
              <p className={`text-lg font-bold ${isOverdue ? "text-red-600" : "text-foreground"}`}>
                {order.timeElapsed} dk
              </p>
              <p className="text-xs text-muted-foreground">Tahmini {order.estimatedTime} dk</p>
            </div>
          </div>
          {isOverdue && (
            <Badge variant="destructive" className="gap-1">
              <AlertTriangle className="h-3 w-3" />
              Gecikmiş
            </Badge>
          )}
        </div>

        {/* Items */}
        <div className="space-y-2">
          {filteredItems.map((item) => (
            <div key={item.id} className="p-3 border border-border rounded-lg space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-foreground">
                      {item.quantity}x {item.name}
                    </p>
                    {item.station === "grill" && <Flame className="h-4 w-4 text-red-500" />}
                  </div>
                  {item.notes && (
                    <div className="flex items-start gap-2 mt-2 p-2 bg-amber-500/10 rounded">
                      <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-700 dark:text-amber-400">{item.notes}</p>
                    </div>
                  )}
                </div>
                <Badge variant="outline" className={getStationBadge(item.station)}>
                  {item.station}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {order.status === "new" && (
            <Button className="flex-1 gap-2">
              <Clock className="h-4 w-4" />
              Hazırlamaya Başla
            </Button>
          )}
          {order.status === "preparing" && (
            <Button className="flex-1 gap-2 bg-green-600 hover:bg-green-700">
              <CheckCircle2 className="h-4 w-4" />
              Hazır Olarak İşaretle
            </Button>
          )}
          {order.status === "ready" && (
            <Button className="flex-1 gap-2 bg-transparent" variant="outline">
              <CheckCircle2 className="h-4 w-4" />
              Servis Edildi
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}
