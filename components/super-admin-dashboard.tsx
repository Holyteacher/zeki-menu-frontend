"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LayoutDashboard, Building2, Users, CreditCard, Settings, TrendingUp, DollarSign, Shield } from "lucide-react"
import { RestaurantsList } from "@/components/restaurants-list"
import { SubscriptionsManager } from "@/components/subscriptions-manager"
import { PlatformAnalytics } from "@/components/platform-analytics"
import { PlatformSettings } from "@/components/platform-settings"

export function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("genel-bakis")

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-foreground">Süper Admin</h1>
                <p className="text-sm text-muted-foreground">Zeki Menü Platformu</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary">Platform Yöneticisi</Badge>
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
          <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
            <TabsTrigger value="genel-bakis" className="gap-2">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden sm:inline">Genel Bakış</span>
            </TabsTrigger>
            <TabsTrigger value="restoranlar" className="gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Restoranlar</span>
            </TabsTrigger>
            <TabsTrigger value="abonelikler" className="gap-2">
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Abonelikler</span>
            </TabsTrigger>
            <TabsTrigger value="analitik" className="gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Analitik</span>
            </TabsTrigger>
            <TabsTrigger value="ayarlar" className="gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Ayarlar</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="genel-bakis" className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">Platform Genel Bakış</h2>
              <p className="text-muted-foreground">Tüm SaaS platform performansınızı izleyin</p>
            </div>

            {/* Platform Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-muted-foreground">Toplam Restoran</p>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">248</p>
                  <Badge variant="secondary" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    12%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Bu ay +28</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-muted-foreground">Aylık Gelir</p>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">₺48.2K</p>
                  <Badge variant="secondary" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    18%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Geçen aydan +₺7.2K</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-muted-foreground">Aktif Abonelikler</p>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">186</p>
                  <Badge variant="secondary">75%</Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">62 deneme sürümünde</p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-muted-foreground">Toplam Kullanıcı</p>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-foreground">1.842</p>
                  <Badge variant="secondary" className="gap-1">
                    <TrendingUp className="h-3 w-3" />
                    24%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-2">Tüm restoranlarda</p>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Son Kayıtlar</h3>
                <div className="space-y-4">
                  {[
                    {
                      name: "Bella Italia",
                      location: "İstanbul, TR",
                      plan: "Profesyonel",
                      date: "2 saat önce",
                    },
                    {
                      name: "Sushi Master",
                      location: "Ankara, TR",
                      plan: "İşletme",
                      date: "5 saat önce",
                    },
                    {
                      name: "Burger House",
                      location: "İzmir, TR",
                      plan: "Başlangıç",
                      date: "1 gün önce",
                    },
                    {
                      name: "Taco Fiesta",
                      location: "Antalya, TR",
                      plan: "Profesyonel",
                      date: "1 gün önce",
                    },
                  ].map((restaurant, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{restaurant.name}</p>
                        <p className="text-sm text-muted-foreground">{restaurant.location}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{restaurant.plan}</Badge>
                        <p className="text-xs text-muted-foreground mt-1">{restaurant.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Abonelik Değişiklikleri</h3>
                <div className="space-y-4">
                  {[
                    {
                      name: "Ocean View Restaurant",
                      action: "Yükseltildi",
                      from: "Başlangıç",
                      to: "Profesyonel",
                      date: "1 saat önce",
                    },
                    {
                      name: "Pizza Palace",
                      action: "Yükseltildi",
                      from: "Profesyonel",
                      to: "İşletme",
                      date: "3 saat önce",
                    },
                    {
                      name: "Cafe Mocha",
                      action: "Yenilendi",
                      from: "Profesyonel",
                      to: "Profesyonel",
                      date: "6 saat önce",
                    },
                    {
                      name: "Steakhouse Prime",
                      action: "Düşürüldü",
                      from: "İşletme",
                      to: "Profesyonel",
                      date: "1 gün önce",
                    },
                  ].map((change, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">{change.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {change.from} → {change.to}
                        </p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            change.action === "Yükseltildi"
                              ? "default"
                              : change.action === "Yenilendi"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {change.action}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">{change.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="restoranlar">
            <RestaurantsList />
          </TabsContent>

          <TabsContent value="abonelikler">
            <SubscriptionsManager />
          </TabsContent>

          <TabsContent value="analitik">
            <PlatformAnalytics />
          </TabsContent>

          <TabsContent value="ayarlar">
            <PlatformSettings />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
