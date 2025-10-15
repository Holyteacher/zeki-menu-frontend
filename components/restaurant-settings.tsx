"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, MapPin, Globe } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export function RestaurantSettings() {
  const [selectedLanguages, setSelectedLanguages] = useState(["tr", "en"])
  const [orderingEnabled, setOrderingEnabled] = useState(true)
  const [deliveryRadius, setDeliveryRadius] = useState("5")
  const [restaurantLocation, setRestaurantLocation] = useState({
    lat: 41.0082,
    lng: 28.9784,
    address: "Atatürk Caddesi No:123, İstanbul",
  })

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      if (selectedLanguages.length > 1) {
        setSelectedLanguages(selectedLanguages.filter((l) => l !== lang))
      }
    } else {
      setSelectedLanguages([...selectedLanguages, lang])
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground">Restoran Ayarları</h2>
        <p className="text-muted-foreground">Restoran bilgilerinizi ve tercihlerinizi yönetin</p>
      </div>

      {/* Basic Information */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Temel Bilgiler</h3>
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="restaurant-name">Restoran Adı</Label>
              <Input id="restaurant-name" defaultValue="Demo Restoran" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cuisine-type">Mutfak Türü</Label>
              <Select defaultValue="italyan">
                <SelectTrigger id="cuisine-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="italyan">İtalyan</SelectItem>
                  <SelectItem value="turk">Türk</SelectItem>
                  <SelectItem value="asya">Asya</SelectItem>
                  <SelectItem value="meksika">Meksika</SelectItem>
                  <SelectItem value="diger">Diğer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Açıklama</Label>
            <Textarea
              id="description"
              rows={3}
              defaultValue="Modern dokunuşlarla otantik İtalyan mutfağı sunan samimi bir restoran."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone">Telefon Numarası</Label>
              <Input id="phone" type="tel" defaultValue="+90 (555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <Input id="email" type="email" defaultValue="info@demo-restoran.com" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Adres</Label>
            <Input id="address" defaultValue="Atatürk Caddesi No:123, İstanbul" />
          </div>
        </div>
      </Card>

      {/* Dil Ayarları */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Globe className="h-5 w-5" />
          Dil Ayarları
        </h3>
        <div className="space-y-4">
          <div>
            <Label className="mb-3 block">Menüde Desteklenen Diller</Label>
            <p className="text-sm text-muted-foreground mb-3">
              Müşterilerinizin menüyü görüntüleyebileceği dilleri seçin
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lang-tr"
                  checked={selectedLanguages.includes("tr")}
                  onCheckedChange={() => toggleLanguage("tr")}
                  disabled={selectedLanguages.length === 1 && selectedLanguages.includes("tr")}
                />
                <Label htmlFor="lang-tr" className="cursor-pointer flex items-center gap-2">
                  🇹🇷 Türkçe
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lang-en"
                  checked={selectedLanguages.includes("en")}
                  onCheckedChange={() => toggleLanguage("en")}
                />
                <Label htmlFor="lang-en" className="cursor-pointer flex items-center gap-2">
                  🇬🇧 İngilizce
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lang-de"
                  checked={selectedLanguages.includes("de")}
                  onCheckedChange={() => toggleLanguage("de")}
                />
                <Label htmlFor="lang-de" className="cursor-pointer flex items-center gap-2">
                  🇩🇪 Almanca
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lang-ar"
                  checked={selectedLanguages.includes("ar")}
                  onCheckedChange={() => toggleLanguage("ar")}
                />
                <Label htmlFor="lang-ar" className="cursor-pointer flex items-center gap-2">
                  🇸🇦 Arapça
                </Label>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Konum ve Teslimat Ayarları */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Konum ve Teslimat Ayarları
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="location">Restoran Konumu</Label>
            <div className="space-y-2">
              <Input
                id="location"
                value={restaurantLocation.address}
                onChange={(e) => setRestaurantLocation({ ...restaurantLocation, address: e.target.value })}
                placeholder="Restoran adresinizi girin"
              />
              <div className="h-64 bg-muted rounded-lg flex items-center justify-center border-2 border-border">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">Google Maps Entegrasyonu</p>
                  <p className="text-xs text-muted-foreground">
                    Lat: {restaurantLocation.lat.toFixed(4)}, Lng: {restaurantLocation.lng.toFixed(4)}
                  </p>
                  <Button variant="outline" size="sm" className="mt-3 bg-transparent">
                    Haritada Konum Seç
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="delivery-radius">Teslimat Yarıçapı (km)</Label>
            <div className="flex items-center gap-4">
              <Input
                id="delivery-radius"
                type="number"
                min="1"
                max="50"
                value={deliveryRadius}
                onChange={(e) => setDeliveryRadius(e.target.value)}
                className="w-32"
              />
              <span className="text-sm text-muted-foreground">
                Restoranınızdan {deliveryRadius} km uzaklıktaki müşteriler sipariş verebilir
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="space-y-0.5">
              <Label>Konum Doğrulaması</Label>
              <p className="text-sm text-muted-foreground">
                Müşterilerin belirlenen mesafe dışından sipariş vermesini engelle
              </p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Menu Settings */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Menü Ayarları</h3>
        <div className="space-y-4">
          {/* Sipariş aktif/pasif butonu */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="space-y-0.5">
              <Label>QR Menü ile Sipariş</Label>
              <p className="text-sm text-muted-foreground">
                {orderingEnabled
                  ? "Müşteriler QR menüden sipariş verebilir"
                  : "Sadece menü görüntüleme aktif, sipariş kapalı"}
              </p>
            </div>
            <Switch checked={orderingEnabled} onCheckedChange={setOrderingEnabled} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Çoklu Dil Desteği</Label>
              <p className="text-sm text-muted-foreground">
                Müşterilerin menüyü farklı dillerde görüntülemesine izin ver
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Alerjen Bilgisi Göster</Label>
              <p className="text-sm text-muted-foreground">Menü ürünlerinde alerjen uyarılarını göster</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Besin Değeri Göster</Label>
              <p className="text-sm text-muted-foreground">Kalori ve besin değeri bilgilerini göster</p>
            </div>
            <Switch />
          </div>
          <div className="space-y-2">
            <Label htmlFor="currency">Para Birimi</Label>
            <Select defaultValue="try">
              <SelectTrigger id="currency" className="w-full sm:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="try">TRY (₺)</SelectItem>
                <SelectItem value="usd">USD ($)</SelectItem>
                <SelectItem value="eur">EUR (€)</SelectItem>
                <SelectItem value="gbp">GBP (£)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Operating Hours */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Çalışma Saatleri</h3>
        <div className="space-y-3">
          {["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"].map((day) => (
            <div key={day} className="flex items-center gap-4">
              <div className="w-28">
                <Label>{day}</Label>
              </div>
              <div className="flex items-center gap-2 flex-1">
                <Input type="time" defaultValue="11:00" className="w-32" />
                <span className="text-muted-foreground">-</span>
                <Input type="time" defaultValue="22:00" className="w-32" />
              </div>
              <Switch defaultChecked />
            </div>
          ))}
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Bildirimler</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>E-posta Bildirimleri</Label>
              <p className="text-sm text-muted-foreground">Yeni siparişler için e-posta uyarıları al</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Bildirimleri</Label>
              <p className="text-sm text-muted-foreground">Acil güncellemeler için SMS uyarıları al</p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Günlük Raporlar</Label>
              <p className="text-sm text-muted-foreground">Sipariş ve gelir günlük özetini al</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg" className="gap-2">
          <Save className="h-4 w-4" />
          Değişiklikleri Kaydet
        </Button>
      </div>
    </div>
  )
}
