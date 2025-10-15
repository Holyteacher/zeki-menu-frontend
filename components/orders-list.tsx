"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, AlertCircle } from "lucide-react"

interface Order {
  id: string
  tableNumber: number
  items: string[]
  total: number
  status: "pending" | "preparing" | "ready" | "served"
  time: string
  priority: "normal" | "urgent"
}

interface OrdersListProps {
  onSelectOrder: (orderId: string) => void
}

export function OrdersList({ onSelectOrder }: OrdersListProps) {
  const orders: Order[] = [
    {
      id: "ORD-001",
      tableNumber: 1,
      items: ["2x Margherita Pizza", "1x Caesar Salata", "2x Limonata"],
      total: 85.5,
      status: "ready",
      time: "5 dk önce",
      priority: "normal",
    },
    {
      id: "ORD-002",
      tableNumber: 3,
      items: ["1x Izgara Somon", "1x Pasta Carbonara"],
      total: 42.0,
      status: "ready",
      time: "8 dk önce",
      priority: "urgent",
    },
    {
      id: "ORD-003",
      tableNumber: 4,
      items: ["3x Burger", "3x Patates", "3x Kola"],
      total: 68.0,
      status: "preparing",
      time: "12 dk önce",
      priority: "normal",
    },
    {
      id: "ORD-004",
      tableNumber: 7,
      items: ["2x Bruschetta", "2x Şarap"],
      total: 54.5,
      status: "preparing",
      time: "15 dk önce",
      priority: "normal",
    },
    {
      id: "ORD-005",
      tableNumber: 9,
      items: ["1x Biftek", "1x Tiramisu"],
      total: 95.0,
      status: "pending",
      time: "2 dk önce",
      priority: "normal",
    },
  ]

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Bekliyor</Badge>
      case "preparing":
        return <Badge variant="secondary">Hazırlanıyor</Badge>
      case "ready":
        return <Badge className="bg-green-600">Hazır</Badge>
      case "served":
        return <Badge variant="outline">Servis Edildi</Badge>
    }
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">Masa {order.tableNumber}</h3>
                {getStatusBadge(order.status)}
                {order.priority === "urgent" && (
                  <Badge variant="destructive" className="gap-1">
                    <AlertCircle className="h-3 w-3" />
                    Acil
                  </Badge>
                )}
              </div>

              <div className="space-y-1">
                {order.items.map((item, i) => (
                  <p key={i} className="text-sm text-muted-foreground">
                    {item}
                  </p>
                ))}
              </div>

              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {order.time}
                </span>
                <span className="font-semibold text-foreground">₺{order.total.toFixed(2)}</span>
              </div>
            </div>

            <Button onClick={() => onSelectOrder(order.id)}>Detayları Gör</Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
