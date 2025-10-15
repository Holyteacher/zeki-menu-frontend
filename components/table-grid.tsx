"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Users, Clock, DollarSign } from "lucide-react"

interface Table {
  id: string
  number: number
  status: "available" | "occupied" | "reserved" | "needs-attention"
  guests?: number
  waiter?: string
  orderTotal?: number
  duration?: string
  orderId?: string
}

interface TableGridProps {
  viewMode: "grid" | "list"
  onSelectOrder: (orderId: string) => void
}

export function TableGrid({ viewMode, onSelectOrder }: TableGridProps) {
  const tables: Table[] = [
    {
      id: "1",
      number: 1,
      status: "occupied",
      guests: 4,
      waiter: "Siz",
      orderTotal: 85.5,
      duration: "25 dk",
      orderId: "ORD-001",
    },
    {
      id: "2",
      number: 2,
      status: "available",
    },
    {
      id: "3",
      number: 3,
      status: "needs-attention",
      guests: 2,
      waiter: "Siz",
      orderTotal: 42.0,
      duration: "45 dk",
      orderId: "ORD-002",
    },
    {
      id: "4",
      number: 4,
      status: "occupied",
      guests: 3,
      waiter: "Ayşe",
      orderTotal: 68.0,
      duration: "15 dk",
      orderId: "ORD-003",
    },
    {
      id: "5",
      number: 5,
      status: "reserved",
      guests: 6,
    },
    {
      id: "6",
      number: 6,
      status: "available",
    },
    {
      id: "7",
      number: 7,
      status: "occupied",
      guests: 2,
      waiter: "Siz",
      orderTotal: 54.5,
      duration: "30 dk",
      orderId: "ORD-004",
    },
    {
      id: "8",
      number: 8,
      status: "available",
    },
  ]

  const getStatusColor = (status: Table["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400"
      case "occupied":
        return "bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400"
      case "reserved":
        return "bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400"
      case "needs-attention":
        return "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400"
    }
  }

  const getStatusBadge = (status: Table["status"]) => {
    switch (status) {
      case "available":
        return <Badge variant="outline">Müsait</Badge>
      case "occupied":
        return <Badge variant="secondary">Dolu</Badge>
      case "reserved":
        return <Badge variant="outline">Rezerve</Badge>
      case "needs-attention":
        return <Badge variant="destructive">Dikkat Gerekli</Badge>
    }
  }

  if (viewMode === "list") {
    return (
      <div className="space-y-3">
        {tables.map((table) => (
          <Card key={table.id} className={`p-4 border-2 ${getStatusColor(table.status)}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-background font-bold text-lg">
                  {table.number}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-foreground">Masa {table.number}</h3>
                    {getStatusBadge(table.status)}
                  </div>
                  {table.guests && (
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {table.guests} kişi
                      </span>
                      {table.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {table.duration}
                        </span>
                      )}
                      {table.orderTotal && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />₺{table.orderTotal.toFixed(2)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              {table.orderId && <Button onClick={() => onSelectOrder(table.orderId!)}>Siparişi Gör</Button>}
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tables.map((table) => (
        <Card
          key={table.id}
          className={`p-6 border-2 cursor-pointer transition-all hover:shadow-lg ${getStatusColor(table.status)}`}
          onClick={() => table.orderId && onSelectOrder(table.orderId)}
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold text-foreground">M{table.number}</h3>
              {getStatusBadge(table.status)}
            </div>

            {table.guests && (
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{table.guests} kişi</span>
                </div>
                {table.duration && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{table.duration}</span>
                  </div>
                )}
                {table.orderTotal && (
                  <div className="flex items-center gap-2 font-semibold text-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>₺{table.orderTotal.toFixed(2)}</span>
                  </div>
                )}
              </div>
            )}

            {table.waiter && (
              <div className="pt-2 border-t border-border">
                <p className="text-xs text-muted-foreground">Garson: {table.waiter}</p>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
