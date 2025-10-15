"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { QrCode, Download, Plus, Eye, Copy, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface QRCodeItem {
  id: string
  tableName: string
  tableNumber: number
  url: string
  scans: number
  lastScanned?: string
}

export function QRCodeManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const qrCodes: QRCodeItem[] = [
    {
      id: "1",
      tableName: "Masa 1",
      tableNumber: 1,
      url: "https://menu.zeki.app/demo/table-1",
      scans: 142,
      lastScanned: "2 saat önce",
    },
    {
      id: "2",
      tableName: "Masa 2",
      tableNumber: 2,
      url: "https://menu.zeki.app/demo/table-2",
      scans: 98,
      lastScanned: "5 saat önce",
    },
    {
      id: "3",
      tableName: "Masa 3",
      tableNumber: 3,
      url: "https://menu.zeki.app/demo/table-3",
      scans: 156,
      lastScanned: "1 saat önce",
    },
  ]

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">QR Kod Yönetimi</h2>
          <p className="text-muted-foreground">Masalarınız için QR kodları oluşturun ve yönetin</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              QR Kod Oluştur
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Yeni QR Kod Oluştur</DialogTitle>
              <DialogDescription>Bir masa veya konum için QR kod oluşturun</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="table-name">Masa Adı</Label>
                <Input id="table-name" placeholder="örn., Masa 1, Bahçe A" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="table-number">Masa Numarası</Label>
                <Input id="table-number" type="number" placeholder="1" />
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                İptal
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>QR Kod Oluştur</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Bulk Actions */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-foreground">Toplu İşlemler</h3>
            <p className="text-sm text-muted-foreground">Aynı anda birden fazla QR kod oluşturun</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-transparent">
              <Plus className="h-4 w-4" />
              10 Kod Oluştur
            </Button>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Tümünü İndir
            </Button>
          </div>
        </div>
      </Card>

      {/* QR Codes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {qrCodes.map((qr) => (
          <Card key={qr.id} className="p-6">
            <div className="space-y-4">
              {/* QR Code Preview */}
              <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                <QrCode className="h-32 w-32 text-muted-foreground" />
              </div>

              {/* Table Info */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{qr.tableName}</h3>
                  <Badge variant="secondary">Aktif</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">Masa #{qr.tableNumber}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{qr.scans} tarama</span>
                  {qr.lastScanned && <span>Son: {qr.lastScanned}</span>}
                </div>
              </div>

              {/* URL */}
              <div className="space-y-2">
                <Label className="text-xs">Menü URL</Label>
                <div className="flex gap-2">
                  <Input value={qr.url} readOnly className="text-xs" />
                  <Button size="sm" variant="outline" onClick={() => copyToClipboard(qr.url, qr.id)}>
                    {copiedId === qr.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                  <Eye className="h-4 w-4" />
                  Önizle
                </Button>
                <Button variant="outline" className="flex-1 gap-2 bg-transparent">
                  <Download className="h-4 w-4" />
                  İndir
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
