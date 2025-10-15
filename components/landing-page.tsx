import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { QrCode, Globe, BarChart3, Smartphone, Clock, Shield } from "lucide-react"
import Link from "next/link"

export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Zeki Menü</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#ozellikler" className="text-muted-foreground hover:text-foreground transition-colors">
              Özellikler
            </Link>
            <Link href="#fiyatlandirma" className="text-muted-foreground hover:text-foreground transition-colors">
              Fiyatlandırma
            </Link>
            <Link href="#iletisim" className="text-muted-foreground hover:text-foreground transition-colors">
              İletişim
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/admin">Giriş Yap</Link>
            </Button>
            <Button asChild>
              <Link href="/admin">Başlayın</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
            Restoranınızı Akıllı Dijital Menülerle Dönüştürün
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            QR kod menüler, çoklu dil desteği, anlık güncellemeler ve güçlü analizler. Restoranınızı modernleştirmek
            için ihtiyacınız olan her şey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/admin">Ücretsiz Deneyin</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#demo">Demo İzle</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="ozellikler" className="container mx-auto px-4 py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-foreground">İhtiyacınız Olan Her Şey</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Modern restoranlar için tasarlanmış güçlü özellikler
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <QrCode className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">QR Kod Menüler</h3>
              <p className="text-muted-foreground">Her masa için anında QR kod oluşturma ile temassız sipariş</p>
            </Card>
            <Card className="p-6">
              <Globe className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Çoklu Dil</h3>
              <p className="text-muted-foreground">Otomatik menü çevirisi ile uluslararası müşterilere hizmet verin</p>
            </Card>
            <Card className="p-6">
              <BarChart3 className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Gerçek Zamanlı Analizler</h3>
              <p className="text-muted-foreground">
                Popüler ürünleri, yoğun saatleri ve müşteri tercihlerini takip edin
              </p>
            </Card>
            <Card className="p-6">
              <Smartphone className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Mobil Uyumlu</h3>
              <p className="text-muted-foreground">Her cihazda mükemmel çalışan güzel menüler</p>
            </Card>
            <Card className="p-6">
              <Clock className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Anında Güncellemeler</h3>
              <p className="text-muted-foreground">
                Fiyatları ve stok durumunu tüm masalarda gerçek zamanlı güncelleyin
              </p>
            </Card>
            <Card className="p-6">
              <Shield className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">Güvenli ve Güvenilir</h3>
              <p className="text-muted-foreground">%99.9 çalışma süresi garantisi ile kurumsal düzeyde güvenlik</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center bg-primary text-primary-foreground rounded-2xl p-12">
          <h2 className="text-4xl font-bold mb-4 text-balance">Restoranınızı Modernleştirmeye Hazır mısınız?</h2>
          <p className="text-xl mb-8 text-pretty opacity-90">Zeki Menü kullanan yüzlerce restorana katılın</p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/admin">Ücretsiz Denemenizi Başlatın</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 Zeki Menü. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </div>
  )
}
