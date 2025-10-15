"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, Clock, XCircle } from "lucide-react"

interface OrderDetailsProps {
  orderId: string
  onClose: () => void
}

export function OrderDetails({ orderId, onClose }: OrderDetailsProps) {
  // Mock order data
  const order = {
    id: orderId,
    tableNumber: 1,
    items: [
      { name: "Margherita Pizza", quantity: 2, price: 18.99, status: "ready" },
      { name: "Caesar Salad", quantity: 1, price: 12.5, status: "ready" },
      { name: "Lemonade", quantity: 2, price: 4.5, status: "ready" },
    ],
    subtotal: 59.48,
    tax: 5.95,
    total: 65.43,
    status: "ready",
    time: "5 dk önce",
    notes: "Pizzada soğan olmasın",
  }

  const getItemStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle2 className="h-4 w-4 text-green-600" />
      case "preparing":
        return <Clock className="h-4 w-4 text-amber-600" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6 py-4">
      {/* Order Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Sipariş #{orderId}</h3>
          <p className="text-sm text-muted-foreground">
            Masa {order.tableNumber} • {order.time}
          </p>
        </div>
        <Badge className="bg-green-600">Servis Hazır</Badge>
      </div>

      {/* Order Items */}
      <div className="space-y-3">
        <h4 className="font-semibold text-foreground">Ürünler</h4>
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
            <div className="flex items-center gap-3 flex-1">
              {getItemStatusIcon(item.status)}
              <div>
                <p className="font-medium text-foreground">
                  {item.quantity}x {item.name}
                </p>
                <p className="text-sm text-muted-foreground">₺{item.price.toFixed(2)} adet</p>
              </div>
            </div>
            <p className="font-semibold text-foreground">₺{(item.quantity * item.price).toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Special Notes */}
      {order.notes && (
        <div className="p-3 bg-muted rounded-lg">
          <p className="text-sm font-medium text-foreground mb-1">Özel Talimatlar</p>
          <p className="text-sm text-muted-foreground">{order.notes}</p>
        </div>
      )}

      {/* Order Total */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Ara Toplam</span>
          <span className="text-foreground">₺{order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">KDV</span>
          <span className="text-foreground">₺{order.tax.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="font-semibold text-foreground">Toplam</span>
          <span className="text-xl font-bold text-foreground">₺{order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button className="flex-1" size="lg">
          Servis Edildi Olarak İşaretle
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent" size="lg" onClick={onClose}>
          Kapat
        </Button>
      </div>
    </div>
  )
}
