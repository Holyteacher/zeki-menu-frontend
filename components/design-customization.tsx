"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Palette, Eye, RotateCcw, Upload, X } from "lucide-react"

export function DesignCustomization() {
  const [colors, setColors] = useState({
    primary: "#16a34a",
    secondary: "#84cc16",
    background: "#ffffff",
    foreground: "#0a0a0a",
    card: "#f9fafb",
    accent: "#f59e0b",
  })

  const [menuStyle, setMenuStyle] = useState("modern")
  const [fontFamily, setFontFamily] = useState("inter")
  const [logo, setLogo] = useState<string | null>(null)

  const handleColorChange = (key: string, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }))
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogo(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeLogo = () => {
    setLogo(null)
  }

  const resetToDefaults = () => {
    setColors({
      primary: "#16a34a",
      secondary: "#84cc16",
      background: "#ffffff",
      foreground: "#0a0a0a",
      card: "#f9fafb",
      accent: "#f59e0b",
    })
    setMenuStyle("modern")
    setFontFamily("inter")
    setLogo(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Tasarım Özelleştirme</h2>
          <p className="text-muted-foreground">Restoranınızın renklerini ve menü tasarımını özelleştirin</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={resetToDefaults} className="gap-2 bg-transparent">
            <RotateCcw className="h-4 w-4" />
            Sıfırla
          </Button>
          <Button className="gap-2">
            <Save className="h-4 w-4" />
            Değişiklikleri Kaydet
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Customization Panel */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Restoran Logosu
            </h3>
            <div className="space-y-4">
              {logo ? (
                <div className="relative">
                  <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={logo || "/placeholder.svg"}
                      alt="Restoran Logosu"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <Button size="sm" variant="destructive" className="absolute top-2 right-2" onClick={removeLogo}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-3">Logo yüklemek için tıklayın veya sürükleyin</p>
                  <Label htmlFor="logo-upload" className="cursor-pointer">
                    <Button type="button" variant="outline" asChild>
                      <span>Logo Seç</span>
                    </Button>
                  </Label>
                  <Input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                </div>
              )}
              <p className="text-xs text-muted-foreground">Önerilen boyut: 200x200px, PNG veya SVG formatı</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Renk Paleti
            </h3>
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="primary-color">Ana Renk</Label>
                  <div className="flex gap-2">
                    <Input
                      id="primary-color"
                      type="color"
                      value={colors.primary}
                      onChange={(e) => handleColorChange("primary", e.target.value)}
                      className="w-16 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={colors.primary}
                      onChange={(e) => handleColorChange("primary", e.target.value)}
                      className="flex-1 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="secondary-color">İkincil Renk</Label>
                  <div className="flex gap-2">
                    <Input
                      id="secondary-color"
                      type="color"
                      value={colors.secondary}
                      onChange={(e) => handleColorChange("secondary", e.target.value)}
                      className="w-16 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={colors.secondary}
                      onChange={(e) => handleColorChange("secondary", e.target.value)}
                      className="flex-1 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="background-color">Arka Plan Rengi</Label>
                  <div className="flex gap-2">
                    <Input
                      id="background-color"
                      type="color"
                      value={colors.background}
                      onChange={(e) => handleColorChange("background", e.target.value)}
                      className="w-16 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={colors.background}
                      onChange={(e) => handleColorChange("background", e.target.value)}
                      className="flex-1 font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accent-color">Vurgu Rengi</Label>
                  <div className="flex gap-2">
                    <Input
                      id="accent-color"
                      type="color"
                      value={colors.accent}
                      onChange={(e) => handleColorChange("accent", e.target.value)}
                      className="w-16 h-10 p-1 cursor-pointer"
                    />
                    <Input
                      type="text"
                      value={colors.accent}
                      onChange={(e) => handleColorChange("accent", e.target.value)}
                      className="flex-1 font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Menü Stili</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="menu-style">Tasarım Şablonu</Label>
                <Select value={menuStyle} onValueChange={setMenuStyle}>
                  <SelectTrigger id="menu-style">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="classic">Klasik</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="elegant">Zarif</SelectItem>
                    <SelectItem value="bold">Cesur</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-family">Yazı Tipi</Label>
                <Select value={fontFamily} onValueChange={setFontFamily}>
                  <SelectTrigger id="font-family">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter (Modern)</SelectItem>
                    <SelectItem value="playfair">Playfair Display (Zarif)</SelectItem>
                    <SelectItem value="roboto">Roboto (Klasik)</SelectItem>
                    <SelectItem value="montserrat">Montserrat (Cesur)</SelectItem>
                    <SelectItem value="lato">Lato (Temiz)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Renk Önizlemesi</h3>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(colors).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="h-16 rounded-lg border-2 border-border" style={{ backgroundColor: value }} />
                  <p className="text-xs text-muted-foreground text-center capitalize">{key}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="h-5 w-5" />
              <h3 className="text-lg font-semibold text-foreground">Canlı Önizleme</h3>
            </div>

            {/* Menu Preview */}
            <div
              className="border-2 border-border rounded-lg overflow-hidden"
              style={{ backgroundColor: colors.background }}
            >
              {/* Header */}
              <div className="p-4 border-b" style={{ backgroundColor: colors.primary }}>
                <div className="flex items-center gap-3 mb-2">
                  {logo && (
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src={logo || "/placeholder.svg"}
                        alt="Logo"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  )}
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: colors.background }}>
                      Demo Restoran
                    </h2>
                    <p className="text-sm opacity-90" style={{ color: colors.background }}>
                      Menümüze Hoş Geldiniz
                    </p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="p-4 space-y-3">
                <div
                  className="p-4 rounded-lg border"
                  style={{ backgroundColor: colors.card, borderColor: colors.primary + "20" }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold" style={{ color: colors.foreground }}>
                      Margherita Pizza
                    </h3>
                    <span
                      className="px-2 py-1 rounded text-xs font-semibold"
                      style={{ backgroundColor: colors.primary, color: colors.background }}
                    >
                      Popüler
                    </span>
                  </div>
                  <p className="text-sm mb-2" style={{ color: colors.foreground, opacity: 0.7 }}>
                    Domates sosu, mozzarella ve taze fesleğen
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold" style={{ color: colors.foreground }}>
                      ₺18.99
                    </span>
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-semibold"
                      style={{ backgroundColor: colors.primary, color: colors.background }}
                    >
                      Ekle
                    </button>
                  </div>
                </div>

                <div
                  className="p-4 rounded-lg border"
                  style={{ backgroundColor: colors.card, borderColor: colors.primary + "20" }}
                >
                  <h3 className="font-semibold mb-2" style={{ color: colors.foreground }}>
                    Izgara Somon
                  </h3>
                  <p className="text-sm mb-2" style={{ color: colors.foreground, opacity: 0.7 }}>
                    Limonlu tereyağı sosu ve sebzeler
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold" style={{ color: colors.foreground }}>
                      ₺28.00
                    </span>
                    <button
                      className="px-4 py-2 rounded-lg text-sm font-semibold border"
                      style={{
                        borderColor: colors.primary,
                        color: colors.primary,
                        backgroundColor: colors.background,
                      }}
                    >
                      Ekle
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t" style={{ borderColor: colors.primary + "20" }}>
                <button
                  className="w-full py-3 rounded-lg font-semibold"
                  style={{ backgroundColor: colors.accent, color: colors.background }}
                >
                  Sepeti Görüntüle (2 ürün)
                </button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Tasarım İpuçları</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Ana renginiz markanızı temsil etmeli ve dikkat çekici olmalı</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Arka plan ve metin renkleri arasında yeterli kontrast olduğundan emin olun</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Vurgu rengini önemli butonlar ve bildirimler için kullanın</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary">•</span>
                <span>Yazı tipi seçiminiz restoranınızın atmosferini yansıtmalı</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  )
}
