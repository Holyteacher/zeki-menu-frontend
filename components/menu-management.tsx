"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Trash2, Search, ImageIcon, Grid3x3, List, Sparkles, Check, X } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  available: boolean
  image?: string
  allergens?: string[]
}

const COMMON_ALLERGENS = [
  "Gluten",
  "Süt Ürünleri",
  "Yumurta",
  "Balık",
  "Kabuklu Deniz Ürünleri",
  "Fındık",
  "Fıstık",
  "Soya",
  "Susam",
  "Hardal",
  "Kereviz",
  "Kükürt Dioksit",
]

export function MenuManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("tümü")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isTranslating, setIsTranslating] = useState(false)
  const [itemName, setItemName] = useState("")
  const [itemDescription, setItemDescription] = useState("")
  const [translations, setTranslations] = useState({
    tr: { name: "", description: "" },
    en: { name: "", description: "" },
    de: { name: "", description: "" },
    ar: { name: "", description: "" },
  })
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([])
  const [allergenInput, setAllergenInput] = useState("")
  const [allergenSuggestions, setAllergenSuggestions] = useState<string[]>([])

  const categories = ["Tümü", "Başlangıçlar", "Ana Yemek", "Tatlılar", "İçecekler", "Salatalar"]

  const menuItems: MenuItem[] = [
    {
      id: "1",
      name: "Margherita Pizza",
      description: "Domates sosu, mozzarella ve taze fesleğen ile klasik pizza",
      price: 18.99,
      category: "Ana Yemek",
      available: true,
      allergens: ["Gluten", "Süt Ürünleri"],
    },
    {
      id: "2",
      name: "Caesar Salad",
      description: "Marul, parmesan, kruton ve Caesar sosu",
      price: 12.5,
      category: "Salatalar",
      available: true,
      allergens: ["Yumurta", "Balık", "Süt Ürünleri"],
    },
    {
      id: "3",
      name: "Izgara Somon",
      description: "Taze Atlantik somonu, limonlu tereyağı sosu ve sebzeler",
      price: 28.0,
      category: "Ana Yemek",
      available: true,
      allergens: ["Balık"],
    },
    {
      id: "4",
      name: "Tiramisu",
      description: "Kahve emdirilmiş kedi dili ile klasik İtalyan tatlısı",
      price: 9.5,
      category: "Tatlılar",
      available: false,
      allergens: ["Gluten", "Yumurta", "Süt Ürünleri"],
    },
  ]

  const handleAITranslate = async () => {
    if (!itemName || !itemDescription) return

    setIsTranslating(true)
    // Gerçek uygulamada burada AI SDK kullanılacak
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Örnek çeviriler
    setTranslations({
      tr: { name: itemName, description: itemDescription },
      en: {
        name: itemName === "Izgara Tavuk" ? "Grilled Chicken" : "Menu Item",
        description:
          itemDescription === "Baharatlarla marine edilmiş tavuk" ? "Chicken marinated with spices" : "Description",
      },
      de: {
        name: itemName === "Izgara Tavuk" ? "Gegrilltes Hähnchen" : "Menüpunkt",
        description:
          itemDescription === "Baharatlarla marine edilmiş tavuk"
            ? "Mit Gewürzen mariniertes Hähnchen"
            : "Beschreibung",
      },
      ar: {
        name: itemName === "Izgara Tavuk" ? "دجاج مشوي" : "عنصر القائمة",
        description: itemDescription === "Baharatlarla marine edilmiş tavuk" ? "دجاج متبل بالتوابل" : "وصف",
      },
    })

    setIsTranslating(false)
  }

  const handleAllergenInputChange = (value: string) => {
    setAllergenInput(value)
    if (value.length > 0) {
      const filtered = COMMON_ALLERGENS.filter(
        (allergen) => allergen.toLowerCase().includes(value.toLowerCase()) && !selectedAllergens.includes(allergen),
      )
      setAllergenSuggestions(filtered)
    } else {
      setAllergenSuggestions([])
    }
  }

  const addAllergen = (allergen: string) => {
    if (!selectedAllergens.includes(allergen)) {
      setSelectedAllergens([...selectedAllergens, allergen])
    }
    setAllergenInput("")
    setAllergenSuggestions([])
  }

  const removeAllergen = (allergen: string) => {
    setSelectedAllergens(selectedAllergens.filter((a) => a !== allergen))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Menü Yönetimi</h2>
          <p className="text-muted-foreground">Restoran menü ürünlerinizi yönetin</p>
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
                Menü Ürünü Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Yeni Menü Ürünü Ekle</DialogTitle>
                <DialogDescription>Restoran menünüz için yeni bir ürün oluşturun</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Ürün Adı (Türkçe)</Label>
                  <Input
                    id="name"
                    placeholder="örn., Izgara Tavuk"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Açıklama (Türkçe)</Label>
                  <Textarea
                    id="description"
                    placeholder="Menü ürününüzü açıklayın..."
                    rows={3}
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                  />
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full gap-2 bg-transparent"
                  onClick={handleAITranslate}
                  disabled={!itemName || !itemDescription || isTranslating}
                >
                  <Sparkles className="h-4 w-4" />
                  {isTranslating ? "Çevriliyor..." : "YZ ile Çevir"}
                </Button>

                {translations.en.name && (
                  <div className="space-y-3 p-4 bg-muted rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-green-500" />
                      Çeviriler oluşturuldu
                    </div>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name-en">İngilizce</Label>
                        <Input
                          id="name-en"
                          value={translations.en.name}
                          onChange={(e) =>
                            setTranslations({
                              ...translations,
                              en: { ...translations.en, name: e.target.value },
                            })
                          }
                        />
                        <Textarea
                          value={translations.en.description}
                          onChange={(e) =>
                            setTranslations({
                              ...translations,
                              en: { ...translations.en, description: e.target.value },
                            })
                          }
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name-de">Almanca</Label>
                        <Input
                          id="name-de"
                          value={translations.de.name}
                          onChange={(e) =>
                            setTranslations({
                              ...translations,
                              de: { ...translations.de, name: e.target.value },
                            })
                          }
                        />
                        <Textarea
                          value={translations.de.description}
                          onChange={(e) =>
                            setTranslations({
                              ...translations,
                              de: { ...translations.de, description: e.target.value },
                            })
                          }
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="name-ar">Arapça</Label>
                        <Input
                          id="name-ar"
                          value={translations.ar.name}
                          onChange={(e) =>
                            setTranslations({
                              ...translations,
                              ar: { ...translations.ar, name: e.target.value },
                            })
                          }
                          dir="rtl"
                        />
                        <Textarea
                          value={translations.ar.description}
                          onChange={(e) =>
                            setTranslations({
                              ...translations,
                              ar: { ...translations.ar, description: e.target.value },
                            })
                          }
                          rows={2}
                          dir="rtl"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">Kategori</Label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Kategori seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories
                          .filter((c) => c !== "Tümü")
                          .map((cat) => (
                            <SelectItem key={cat} value={cat.toLowerCase()}>
                              {cat}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Fiyat (₺)</Label>
                    <Input id="price" type="number" step="0.01" placeholder="0.00" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="allergens">Alerjenler</Label>
                  <div className="relative">
                    <Input
                      id="allergens"
                      placeholder="Alerjen eklemek için yazın..."
                      value={allergenInput}
                      onChange={(e) => handleAllergenInputChange(e.target.value)}
                    />
                    {allergenSuggestions.length > 0 && (
                      <div className="absolute z-10 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-48 overflow-y-auto">
                        {allergenSuggestions.map((allergen) => (
                          <button
                            key={allergen}
                            type="button"
                            className="w-full px-4 py-2 text-left hover:bg-muted transition-colors"
                            onClick={() => addAllergen(allergen)}
                          >
                            {allergen}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {selectedAllergens.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedAllergens.map((allergen) => (
                        <Badge key={allergen} variant="secondary" className="gap-1">
                          {allergen}
                          <button
                            type="button"
                            onClick={() => removeAllergen(allergen)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Yaygın alerjenler: {COMMON_ALLERGENS.slice(0, 5).join(", ")}...
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Görsel</Label>
                  <Input id="image" type="file" accept="image/*" />
                </div>

                <div className="flex items-center gap-2">
                  <Switch id="available" defaultChecked />
                  <Label htmlFor="available" className="cursor-pointer">
                    Sipariş için müsait
                  </Label>
                </div>
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  İptal
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>Ürün Ekle</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Menü ürünlerinde ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat.toLowerCase()}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Card>

      {viewMode === "grid" && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    {item.allergens && item.allergens.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.allergens.map((allergen) => (
                          <Badge key={allergen} variant="outline" className="text-xs">
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <Switch checked={item.available} />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-foreground">₺{item.price.toFixed(2)}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {viewMode === "list" && (
        <Card>
          <div className="divide-y divide-border">
            {menuItems.map((item) => (
              <div key={item.id} className="p-4 flex items-center gap-4 hover:bg-muted/50 transition-colors">
                <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-semibold text-foreground">{item.name}</h3>
                    <Switch checked={item.available} />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1 mb-2">{item.description}</p>
                  {item.allergens && item.allergens.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {item.allergens.map((allergen) => (
                        <Badge key={allergen} variant="outline" className="text-xs">
                          {allergen}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-xl font-bold text-foreground whitespace-nowrap">₺{item.price.toFixed(2)}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
