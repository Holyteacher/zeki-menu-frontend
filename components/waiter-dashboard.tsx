"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LayoutGrid, List, Bell, User, CheckCircle2, Clock, AlertCircle, ChefHat } from "lucide-react"
import { TableGrid } from "@/components/table-grid"
import { OrdersList } from "@/components/orders-list"
import { OrderDetails } from "@/components/order-details"

export function WaiterDashboard() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)
  const [notifications, setNotifications] = useState(3)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ChefHat className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Garson İstasyonu</h1>
                <p className="text-sm text-muted-foreground">Demo Restoran</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="relative bg-transparent">
                <Bell className="h-4 w-4" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {notifications}
                  </Badge>
                )}
              </Button>
              <Avatar>
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Aktif Masalar</p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <LayoutGrid className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Bekleyen Siparişler</p>
                <p className="text-2xl font-bold text-foreground">8</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-accent" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Servis Hazır</p>
                <p className="text-2xl font-bold text-foreground">5</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Acil</p>
                <p className="text-2xl font-bold text-foreground">2</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="tables" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="tables">Masalar</TabsTrigger>
              <TabsTrigger value="orders">Siparişler</TabsTrigger>
            </TabsList>

            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="tables">
            <TableGrid viewMode={viewMode} onSelectOrder={setSelectedOrder} />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersList onSelectOrder={setSelectedOrder} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Order Details Dialog */}
      {selectedOrder && (
        <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Sipariş Detayları</DialogTitle>
              <DialogDescription>Sipariş durumunu ve ürünleri yönetin</DialogDescription>
            </DialogHeader>
            <OrderDetails orderId={selectedOrder} onClose={() => setSelectedOrder(null)} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
