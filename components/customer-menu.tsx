"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Search, Plus, Minus, X, Globe, Leaf, Flame, Fish, Milk, Wheat, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image?: string
  allergens?: string[]
  dietary?: string[]
  spicyLevel?: number
  active: boolean
}

interface CartItem extends MenuItem {
  quantity: number
}

export function CustomerMenu({ restaurantSlug }: { restaurantSlug: string }) {
  const [selectedCategory, setSelectedCategory] = useState("tümü")
  const [searchQuery, setSearchQuery] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [language, setLanguage] = useState("tr")
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [orderingEnabled, setOrderingEnabled] = useState(true)
  const [locationAllowed, setLocationAllowed] = useState(true)
  const [checkingLocation, setCheckingLocation] = useState(false)

  useEffect(() => {
    const browserLang = navigator.language.split("-")[0]
    const supportedLangs = ["tr", "en", "de", "ar"]
    if (supportedLangs.includes(browserLang)) {
      setLanguage(browserLang)
    }
  }, [])

  useEffect(() => {
    if (orderingEnabled && "geolocation" in navigator) {
      setCheckingLocation(true)
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const restaurantLat = 41.0082
          const restaurantLng = 28.9784
          const userLat = position.coords.latitude
          const userLng = position.coords.longitude

          const distance = calculateDistance(restaurantLat, restaurantLng, userLat, userLng)
          const maxDistance = 5

          setLocationAllowed(distance <= maxDistance)
          setCheckingLocation(false)
        },
        () => {
          setCheckingLocation(false)
          setLocationAllowed(false)
        },
      )
    }
  }, [orderingEnabled])

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const categories = ["Tümü", "Başlangıçlar", "Ana Yemek", "Tatlılar", "İçecekler", "Salatalar"]

  const menuItems: MenuItem[] = [
    {
      id: "1",
      name: "Margherita Pizza",
      description: "Domates sosu, mozzarella ve taze fesleğen ile klasik pizza",
      price: 18.99,
      category: "Ana Yemek",
      allergens: ["gluten", "süt"],
      dietary: ["vejetaryen"],
      active: true,
    },
    {
      id: "2",
      name: "Sezar Salata",
      description: "Marul, parmesan, kruton ve Sezar sosu",
      price: 12.5,
      category: "Salatalar",
      allergens: ["gluten", "süt", "yumurta"],
      active: true,
    },
    {
      id: "3",
      name: "Izgara Somon",
      description: "Limonlu tereyağı sosu ve sebzeler ile taze Atlantik somonu",
      price: 28.0,
      category: "Ana Yemek",
      allergens: ["balık"],
      dietary: ["glutensiz"],
      active: true,
    },
    {
      id: "4",
      name: "Tiramisu",
      description: "Kahve emdirilmiş kedi dili ile klasik İtalyan tatlısı",
      price: 9.5,
      category: "Tatlılar",
      allergens: ["gluten", "süt", "yumurta"],
      active: false,
    },
  ]

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "tümü" || item.category.toLowerCase() === selectedCategory
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return item.active && matchesCategory && matchesSearch
  })

  const addToCart = (item: MenuItem) => {
    if (!orderingEnabled || !locationAllowed) return

    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === itemId)
      if (existing && existing.quantity > 1) {
        return prev.map((i) => (i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i))
      }
      return prev.filter((i) => i.id !== itemId)
    })
  }

  const deleteFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId))
  }

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const getAllergenIcon = (allergen: string) => {
    switch (allergen) {
      case "gluten":
        return <Wheat className="h-3 w-3" />
      case "süt":
        return <Milk className="h-3 w-3" />
      case "balık":
        return <Fish className="h-3 w-3" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Demo Restoran</h1>
              <p className="text-sm text-muted-foreground">{restaurantSlug}</p>
            </div>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tr">Türkçe</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {!locationAllowed && orderingEnabled && !checkingLocation && (
            <Alert variant="destructive" className="mb-3">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                Konumunuz restoran teslimat alanı dışında. Sadece menüyü görüntüleyebilirsiniz.
              </AlertDescription>
            </Alert>
          )}

          {!orderingEnabled && (
            <Alert className="mb-3">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>Şu anda sadece menü görüntüleme modu aktif. Sipariş veremezsiniz.</AlertDescription>
            </Alert>
          )}

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Menüde ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </header>

      {/* Categories */}
      <div className="sticky top-[180px] z-30 bg-background border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat.toLowerCase() ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.toLowerCase())}
                className="whitespace-nowrap"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="flex gap-4 p-4">
                <div className="flex-1 space-y-2">
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-foreground text-lg">{item.name}</h3>
                      {item.spicyLevel && (
                        <div className="flex gap-0.5">
                          {Array.from({ length: item.spicyLevel }).map((_, i) => (
                            <Flame key={i} className="h-4 w-4 text-red-500 fill-red-500" />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  </div>

                  {/* Dietary & Allergen Info */}
                  <div className="flex flex-wrap gap-2">
                    {item.dietary?.map((diet) => (
                      <Badge key={diet} variant="secondary" className="gap-1 text-xs">
                        <Leaf className="h-3 w-3" />
                        {diet}
                      </Badge>
                    ))}
                    {item.allergens?.map((allergen) => (
                      <Badge key={allergen} variant="outline" className="gap-1 text-xs">
                        {getAllergenIcon(allergen)}
                        {allergen}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xl font-bold text-foreground">₺{item.price.toFixed(2)}</p>
                    <Button
                      size="sm"
                      onClick={() => addToCart(item)}
                      className="gap-2"
                      disabled={!orderingEnabled || !locationAllowed}
                    >
                      <Plus className="h-4 w-4" />
                      Ekle
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Aramanızla eşleşen ürün bulunamadı.</p>
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      {orderingEnabled && locationAllowed && (
        <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
          <SheetTrigger asChild>
            <Button
              size="lg"
              className="fixed bottom-6 right-6 rounded-full h-16 w-16 shadow-lg"
              disabled={cartItemCount === 0}
            >
              <div className="relative">
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </div>
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Siparişiniz</SheetTitle>
              <SheetDescription>Sipariş vermeden önce ürünlerinizi gözden geçirin</SheetDescription>
            </SheetHeader>

            <div className="flex flex-col h-full pt-6">
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto space-y-4 pb-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">₺{item.price.toFixed(2)} adet</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => removeFromCart(item.id)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <Button size="sm" variant="outline" onClick={() => addToCart(item)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => deleteFromCart(item.id)}>
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {cart.length === 0 && (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Sepetiniz boş</p>
                  </div>
                )}
              </div>

              {/* Cart Summary */}
              {cart.length > 0 && (
                <div className="border-t border-border pt-4 space-y-4">
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-semibold text-foreground">Toplam</span>
                    <span className="font-bold text-foreground">₺{cartTotal.toFixed(2)}</span>
                  </div>
                  <Button size="lg" className="w-full" onClick={() => setIsCartOpen(false)}>
                    Sipariş Ver
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  )
}
