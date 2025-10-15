"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  UtensilsCrossed,
  QrCode,
  Settings,
  BarChart3,
  Plus,
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  FolderTree,
  Palette,
} from "lucide-react"
import { MenuManagement } from "@/components/menu-management"
import { QRCodeManagement } from "@/components/qr-code-management"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { RestaurantSettings } from "@/components/restaurant-settings"
import { CategoryManagement } from "@/components/category-management"
import { BestSellers } from "@/components/best-sellers"
import { DesignCustomization } from "@/components/design-customization"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <QrCode className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Zeki Menü</h1>
                <p className="text-sm text-muted-foreground">Restoran Yönetimi</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">Demo Restoran</Badge>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Profil
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 lg:w-auto lg:inline-grid">
            <TabsTrigger value="overview" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Genel Bakış</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="gap-2">
              <FolderTree className="h-4 w-4" />
              <span className="hidden sm:inline">Kategoriler</span>
            </TabsTrigger>
            <TabsTrigger value="menu" className="gap-2">
              <UtensilsCrossed className="h-4 w-4" />
              <span className="hidden sm:inline">Menü</span>
            </TabsTrigger>
            <TabsTrigger value="best-sellers" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">En Çok Satanlar</span>
            </TabsTrigger>
            <TabsTrigger value="qr-codes" className="gap-2">
              <QrCode className="h-4 w-4" />
              <span className="hidden sm:inline">QR Kodlar</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Analizler</span>
            </TabsTrigger>
            <TabsTrigger value="design" className="gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">Tasarım</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Ayarlar</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Genel Bakış</h2>
              <p className="text-muted-foreground">Tekrar hoş geldiniz! Bugün neler oluyor.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-muted-foreground">Toplam Sipariş</p>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">142</p>
                  <Badge variant="secondary" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    12%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Dünden +18</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-muted-foreground">Gelir</p>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">₺3.248</p>
                  <Badge variant="secondary" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    8%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Dünden +₺420</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-muted-foreground">Aktif Masalar</p>
                  <QrCode className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">18/24</p>
                  <Badge variant="secondary">75%</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">6 masa müsait</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-muted-foreground">Menü Ürünleri</p>
                  <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">87</p>
                  <Badge variant="outline">Aktif</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">8 kategoride</p>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Hızlı İşlemler</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <Button className="justify-start gap-2" onClick={() => setActiveTab("menu")}>
                  <Plus className="h-4 w-4" />
                  Menü Ürünü Ekle
                </Button>
                <Button
                  variant="outline"
                  className="justify-start gap-2 bg-transparent"
                  onClick={() => setActiveTab("qr-codes")}
                >
                  <QrCode className="h-4 w-4" />
                  QR Kod Oluştur
                </Button>
                <Button
                  variant="outline"
                  className="justify-start gap-2 bg-transparent"
                  onClick={() => setActiveTab("analytics")}
                >
                  <BarChart3 className="h-4 w-4" />
                  Raporları Görüntüle
                </Button>
                <Button
                  variant="outline"
                  className="justify-start gap-2 bg-transparent"
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="h-4 w-4" />
                  Restoran Ayarları
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Son Siparişler</h3>
              <div className="space-y-4">
                {[
                  {
                    table: "Masa 5",
                    items: "2x Margherita Pizza, 1x Sezar Salata",
                    total: "₺42.50",
                    time: "2 dk önce",
                    status: "hazirlaniyor",
                  },
                  {
                    table: "Masa 12",
                    items: "1x Izgara Somon, 2x Karbonar Makarna",
                    total: "₺68.00",
                    time: "5 dk önce",
                    status: "hazirlaniyor",
                  },
                  {
                    table: "Masa 3",
                    items: "3x Burger, 3x Patates, 3x Kola",
                    total: "₺54.00",
                    time: "12 dk önce",
                    status: "hazir",
                  },
                  {
                    table: "Masa 8",
                    items: "1x Biftek, 1x Şarap",
                    total: "₺85.00",
                    time: "18 dk önce",
                    status: "teslim-edildi",
                  },
                ].map((order, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-foreground">{order.table}</p>
                        <Badge
                          variant={
                            order.status === "hazirlaniyor"
                              ? "default"
                              : order.status === "hazir"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {order.status === "hazirlaniyor"
                            ? "Hazırlanıyor"
                            : order.status === "hazir"
                              ? "Hazır"
                              : "Teslim Edildi"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{order.items}</p>
                      <p className="text-xs text-muted-foreground mt-1">{order.time}</p>
                    </div>
                    <p className="text-lg font-bold text-foreground">{order.total}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="categories">
            <CategoryManagement />
          </TabsContent>

          <TabsContent value="menu">
            <MenuManagement />
          </TabsContent>

          <TabsContent value="best-sellers">
            <BestSellers />
          </TabsContent>

          <TabsContent value="qr-codes">
            <QRCodeManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="design">
            <DesignCustomization />
          </TabsContent>

          <TabsContent value="settings">
            <RestaurantSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
