"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChefHat, AlertTriangle, Flame } from "lucide-react"
import { KitchenOrderCard } from "@/components/kitchen-order-card"

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

export function KitchenDisplay() {
  const [selectedStation, setSelectedStation] = useState<string>("tümü")

  const orders: KitchenOrder[] = [
    {
      id: "1",
      tableNumber: 5,
      orderNumber: "ORD-001",
      items: [
        { id: "1", name: "Margherita Pizza", quantity: 2, station: "grill", priority: "normal" },
        { id: "2", name: "Caesar Salad", quantity: 1, notes: "No croutons", station: "salad", priority: "normal" },
      ],
      status: "new",
      timeElapsed: 2,
      estimatedTime: 15,
    },
    {
      id: "2",
      tableNumber: 12,
      orderNumber: "ORD-002",
      items: [
        {
          id: "3",
          name: "Grilled Salmon",
          quantity: 1,
          notes: "Well done",
          station: "grill",
          priority: "urgent",
        },
        { id: "4", name: "Pasta Carbonara", quantity: 2, station: "grill", priority: "urgent" },
      ],
      status: "preparing",
      timeElapsed: 18,
      estimatedTime: 20,
    },
    {
      id: "3",
      tableNumber: 3,
      orderNumber: "ORD-003",
      items: [
        { id: "5", name: "Burger", quantity: 3, station: "grill", priority: "normal" },
        { id: "6", name: "Fries", quantity: 3, station: "fryer", priority: "normal" },
      ],
      status: "preparing",
      timeElapsed: 12,
      estimatedTime: 15,
    },
    {
      id: "4",
      tableNumber: 8,
      orderNumber: "ORD-004",
      items: [
        { id: "7", name: "Steak", quantity: 1, notes: "Medium rare", station: "grill", priority: "normal" },
        { id: "8", name: "Tiramisu", quantity: 1, station: "dessert", priority: "normal" },
      ],
      status: "ready",
      timeElapsed: 22,
      estimatedTime: 20,
    },
    {
      id: "5",
      tableNumber: 15,
      orderNumber: "ORD-005",
      items: [
        { id: "9", name: "Bruschetta", quantity: 2, station: "salad", priority: "normal" },
        { id: "10", name: "Lemonade", quantity: 2, station: "drinks", priority: "normal" },
      ],
      status: "new",
      timeElapsed: 1,
      estimatedTime: 10,
    },
  ]

  const newOrders = orders.filter((o) => o.status === "new")
  const preparingOrders = orders.filter((o) => o.status === "preparing")
  const readyOrders = orders.filter((o) => o.status === "ready")

  const urgentCount = orders.filter((o) => o.items.some((i) => i.priority === "urgent")).length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ChefHat className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-2xl font-bold text-foreground">Mutfak Ekranı</h1>
                <p className="text-sm text-muted-foreground">Demo Restoran</p>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{newOrders.length}</p>
                <p className="text-xs text-muted-foreground">Yeni</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">{preparingOrders.length}</p>
                <p className="text-xs text-muted-foreground">Hazırlanıyor</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{readyOrders.length}</p>
                <p className="text-xs text-muted-foreground">Hazır</p>
              </div>
              {urgentCount > 0 && (
                <Badge variant="destructive" className="gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {urgentCount} Acil
                </Badge>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Station Filter */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Button
            variant={selectedStation === "tümü" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStation("tümü")}
          >
            Tüm İstasyonlar
          </Button>
          <Button
            variant={selectedStation === "ızgara" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStation("ızgara")}
            className="gap-2"
          >
            <Flame className="h-4 w-4" />
            Izgara
          </Button>
          <Button
            variant={selectedStation === "fritöz" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStation("fritöz")}
          >
            Fritöz
          </Button>
          <Button
            variant={selectedStation === "salata" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStation("salata")}
          >
            Salata
          </Button>
          <Button
            variant={selectedStation === "tatlı" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStation("tatlı")}
          >
            Tatlı
          </Button>
          <Button
            variant={selectedStation === "içecek" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedStation("içecek")}
          >
            İçecek
          </Button>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">Tüm Siparişler ({orders.length})</TabsTrigger>
            <TabsTrigger value="new">Yeni ({newOrders.length})</TabsTrigger>
            <TabsTrigger value="preparing">Hazırlanıyor ({preparingOrders.length})</TabsTrigger>
            <TabsTrigger value="ready">Hazır ({readyOrders.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {orders
                .filter(
                  (order) => selectedStation === "tümü" || order.items.some((item) => item.station === selectedStation),
                )
                .map((order) => (
                  <KitchenOrderCard key={order.id} order={order} selectedStation={selectedStation} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="new" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {newOrders
                .filter(
                  (order) => selectedStation === "tümü" || order.items.some((item) => item.station === selectedStation),
                )
                .map((order) => (
                  <KitchenOrderCard key={order.id} order={order} selectedStation={selectedStation} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="preparing" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {preparingOrders
                .filter(
                  (order) => selectedStation === "tümü" || order.items.some((item) => item.station === selectedStation),
                )
                .map((order) => (
                  <KitchenOrderCard key={order.id} order={order} selectedStation={selectedStation} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="ready" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {readyOrders
                .filter(
                  (order) => selectedStation === "tümü" || order.items.some((item) => item.station === selectedStation),
                )
                .map((order) => (
                  <KitchenOrderCard key={order.id} order={order} selectedStation={selectedStation} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
