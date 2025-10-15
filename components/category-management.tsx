"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Grid3x3, List, Sparkles, Check } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Category {
  id: string
  name: string
  nameEn?: string
  nameDe?: string
  nameAr?: string
  itemCount: number
  active: boolean
}

export function CategoryManagement() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isTranslating, setIsTranslating] = useState(false)
  const [categoryName, setCategoryName] = useState("")
  const [translations, setTranslations] = useState({
    tr: "",
    en: "",
    de: "",
    ar: "",
  })

  const categories: Category[] = [
    {
      id: "1",
      name: "Başlangıçlar",
      nameEn: "Appetizers",
      nameDe: "Vorspeisen",
      nameAr: "المقبلات",
      itemCount: 12,
      active: true,
    },
    {
      id: "2",
      name: "Ana Yemek",
      nameEn: "Main Course",
      nameDe: "Hauptgericht",
      nameAr: "الطبق الرئيسي",
      itemCount: 24,
      active: true,
    },
    {
      id: "3",
      name: "Tatlılar",
      nameEn: "Desserts",
      nameDe: "Desserts",
      nameAr: "الحلويات",
      itemCount: 8,
      active: true,
    },
    {
      id: "4",
      name: "İçecekler",
      nameEn: "Beverages",
      nameDe: "Getränke",
      nameAr: "المشروبات",
      itemCount: 15,
      active: true,
    },
    { id: "5", name: "Salatalar", nameEn: "Salads", nameDe: "Salate", nameAr: "السلطات", itemCount: 6, active: true },
  ]

  const handleAITranslate = async () => {
    if (!categoryName) return

    setIsTranslating(true)
    // Gerçek uygulamada burada AI SDK kullanılacak
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Örnek çeviriler
    setTranslations({
      tr: categoryName,
      en: categoryName === "Çorbalar" ? "Soups" : "Category",
      de: categoryName === "Çorbalar" ? "Suppen" : "Kategorie",
      ar: categoryName === "Çorbalar" ? "الحساء" : "فئة",
    })

    setIsTranslating(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Kategori Yönetimi</h2>
          <p className="text-muted-foreground">Menü kategorilerinizi düzenleyin</p>
        </div>
        <div className="flex items-center gap-3">
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as "grid" | "list")}>
            <TabsList>
              <TabsTrigger value="grid" className="gap-2">
                <Grid3x3 className="h-4 w-4" />
                Izgara
              </TabsTrigger>
              <TabsTrigger value="list" className="gap-2">
                <List className="h-4 w-4" />
                Liste
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Kategori Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Yeni Kategori Ekle</DialogTitle>
                <DialogDescription>Menünüz için yeni bir kategori oluşturun</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="category-name">Kategori Adı (Türkçe)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="category-name"
                      placeholder="örn., Çorbalar"
                      value={categoryName}
                      onChange={(e) => setCategoryName(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      className="gap-2 whitespace-nowrap bg-transparent"
                      onClick={handleAITranslate}
                      disabled={!categoryName || isTranslating}
                    >
                      <Sparkles className="h-4 w-4" />
                      {isTranslating ? "Çevriliyor..." : "YZ ile Çevir"}
                    </Button>
                  </div>
                </div>

                {translations.en && (
                  <div className="space-y-3 p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-green-500" />
                      Çeviriler oluşturuldu
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="name-en">İngilizce</Label>
                        <Input
                          id="name-en"
                          value={translations.en}
                          onChange={(e) => setTranslations({ ...translations, en: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name-de">Almanca</Label>
                        <Input
                          id="name-de"
                          value={translations.de}
                          onChange={(e) => setTranslations({ ...translations, de: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name-ar">Arapça</Label>
                        <Input
                          id="name-ar"
                          value={translations.ar}
                          onChange={(e) => setTranslations({ ...translations, ar: e.target.value })}
                          dir="rtl"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="active" className="rounded" defaultChecked />
                  <Label htmlFor="active" className="cursor-pointer">
                    Kategoriyi aktif et
                  </Label>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  İptal
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Kategori Ekle</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {viewMode === "grid" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card key={category.id} className="p-6">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground text-lg">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.itemCount} ürün</p>
                  </div>
                  <Badge variant={category.active ? "secondary" : "outline"}>
                    {category.active ? "Aktif" : "Pasif"}
                  </Badge>
                </div>

                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>🇬🇧 {category.nameEn}</p>
                  <p>🇩🇪 {category.nameDe}</p>
                  <p>🇸🇦 {category.nameAr}</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    <Edit className="h-4 w-4 mr-2" />
                    Düzenle
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {viewMode === "list" && (
        <Card>
          <div className="divide-y divide-border">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-foreground">{category.name}</h3>
                    <Badge variant={category.active ? "secondary" : "outline"} className="text-xs">
                      {category.active ? "Aktif" : "Pasif"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{category.itemCount} ürün</span>
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <span>🇬🇧 {category.nameEn}</span>
                    <span>🇩🇪 {category.nameDe}</span>
                    <span>🇸🇦 {category.nameAr}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
