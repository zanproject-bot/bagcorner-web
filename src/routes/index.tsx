import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ArrowRight, Play, Search, MessageCircle, MapPin, Phone, Clock } from "lucide-react";
import { CylindricalCarousel } from "@/components/CylindricalCarousel";
import { Rotating3DBag } from "@/components/Rotating3DBag";
import { VapourTextEffect } from "@/components/VapourTextEffect";
import { LiveChatWidget } from "@/components/LiveChatWidget";
import { Particles } from "@/components/ui/particles";
import bagYellow from "@/assets/bag-yellow.jpg";
import bagRed from "@/assets/bag-red.jpg";
import bagBlack from "@/assets/bag-black.jpg";
import logobag from "@/assets/logobag.svg";

export const Route = createFileRoute("/")({ 
  component: Home,
  head: () => ({
    meta: [
      { name: "title", content: "Bag Corner — Toko Tas Terlengkap, koper, Jasa Perbaikan Tas & Koper Ponorogo" },
      { name: "description", content: "Toko Tas Bag Corner segala macam tas ransel,tas pesta, tas sekolah anak, tas korea, tas pesta, dompet, koper dan jasa perbaikan tas dan koper profesional di Ponorogo." },
      { name: "og:title", content: "Bag Corner — Toko Tas Terlengkap, koper, Jasa Perbaikan Tas & Koper Ponorogo" },
      { name: "og:description", content: "Toko Tas Bag Corner segala macam tas ransel,tas pesta, tas sekolah anak, tas korea, tas pesta, dompet, koper. Ganti roda, resleting, kunci koper dengan cepat dan terpercaya." },
    ],
  }),
});

const WA_NUMBER = "6281774977770";
const waLink = (product: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Halo Bag Corner, saya tertarik dengan ${product}. Mohon info lebih lanjut.`)}`;

// Data layanan dengan kata kunci SEO
const SERVICES = [
  {
    id: "1",
    name: "Perbaikan Resleting Tas",
    description: "Perbaikan dan penggantian resleting tas yang rusak atau macet",
    icon: "🪝",
  },
  {
    id: "2",
    name: "Perbaikan Aksesoris Tas",
    description: "Perbaikan tali, handle, dan aksesori tas lainnya",
    icon: "🎀",
  },
  {
    id: "3",
    name: "Ganti Roda Koper",
    description: "Penggantian roda koper yang aus atau rusak dengan roda berkualitas",
    icon: "🛞",
  },
  {
    id: "4",
    name: "Perbaikan/Ganti Troly Koper",
    description: "Perbaikan dan penggantian troly (handle) koper yang bermasalah",
    icon: "🔧",
  },
  {
    id: "5",
    name: "Ganti Kunci Koper",
    description: "Penggantian kunci koper yang hilang , rusak , reset pin",
    icon: "🔐",
  },
  {
    id: "6",
    name: "Ganti Kepala Resleting Koper",
    description: "Penggantian kepala/slider resleting koper",
    icon: "⚙️",
  },
];

// Google Maps embed link - Updated
const GOOGLE_MAPS_LINK = "https://maps.app.goo.gl/jffJ6wykwn2nfo3T6";
export const GOOGLE_MAPS_EMBED = 
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.128795092928!2d111.46467007575306!3d-7.881622378381832!2m3!1f0!2f0!3f0!3m2!1i1024!2i708!4f13.1!3m3!1m2!1s0x2e799fdd4c8f334b%3A0xb35a0fb7ffed4cb8!2sBAG%20CORNER%20PONOROGO!5e0!3m2!1sid!2sid!4v1710000000000!5m2!1sid!2sid";

const carouselItems = [
  { id: "1", name: "Ransel Sunrise", color: "Kuning", tag: "Best Seller", tagColor: "bg-amber-500/20 text-amber-300 border-amber-500/20", image: bagYellow },
  { id: "2", name: "Ransel Ember", color: "Merah", tag: "New Arrival", tagColor: "bg-rose-500/20 text-rose-300 border-rose-500/20", image: bagRed },
  { id: "3", name: "Ransel Onyx", color: "Hitam", tag: "Premium", tagColor: "bg-slate-500/20 text-slate-300 border-slate-500/20", image: bagBlack },
  { id: "4", name: "Ransel Sunrise", color: "Kuning", tag: "Limited Edition", tagColor: "bg-violet-500/20 text-violet-300 border-violet-500/20", image: bagYellow },
  { id: "5", name: "Ransel Ember", color: "Merah", tag: "Trending", tagColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/20", image: bagRed },
  { id: "6", name: "Ransel Onyx", color: "Hitam", tag: "Classic", tagColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/20", image: bagBlack },
];

function Home() {
  const [animationKey, SetAnimationKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      SetAnimationKey((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen text-foreground overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-tile-1 via-background to-tile-2/60" />
        <Particles
          className="absolute inset-0 h-full w-full"
          color="#e07a3c"
          particleCount={6000}
          particleSize={22}
          animate={false}
        />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="sticky top-0 z-50 max-w-7xl mx-auto px-6 lg:px-10 pt-6 lg:pt-8 pb-4 flex items-center justify-between bg-transparent backdrop-blur-sm">
          <Link to="/" className="text-2xl lg:text-3xl font-display font-semibold tracking-tight flex items-center gap-2">
            <img src={logobag} alt="Bag Corner logo" className="inline-block w-6 h-6 lg:w-8 lg:h-8 object-contain" />
            <span>Bag Corner</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a href="#layanan" className="hover:text-primary transition">LAYANAN</a>
            <Link to="/tentang" className="hover:text-primary transition">TENTANG</Link>
            <Link to="/payment-info" className="hover:text-primary transition">INFO-PAYMENT</Link>
            <a href="#kontak" className="hover:text-primary transition">KONTAK</a>
          </nav>
          <button aria-label="Cari" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition">
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">CARI</span>
          </button>
        </header>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 lg:pt-16 grid lg:grid-cols-2 gap-10 items-center">
          <div key={animationKey} className="flex flex-col gap-0">
            <VapourTextEffect
              text="SHOW YOUR"
              className="w-full max-w-lg h-[100px] flex items-start justify-start pt-4 pb-8 !text-white [text-shadow:0_0_10px_#fff,0_0_20px_#fff]"
            />
            <VapourTextEffect
              text="STYLE"
              className="w-full max-w-lg h-[100px] flex items-start justify-start pt-4 pb-8 !text-white [text-shadow:0_0_10px_#fff,0_0_20px_#fff]"
            />
            <p className="mt-6 text-base lg:text-lg text-muted-foreground max-w-md leading-relaxed">
              Toko Tas Bag Corner hadirkan koleksi pilihan tas dan koper yang berkualitas untuk melengkapi gaya hidupmu setiap hari.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href={waLink("layanan perbaikan tas dan koper")}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full bg-primary text-primary-foreground font-medium hover:opacity-95 transition"
              >
                Konsultasi Gratis via WhatsApp
                <span className="w-9 h-9 rounded-full bg-white/20 grid place-items-center group-hover:translate-x-0.5 transition">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </a>
              <button className="inline-flex items-center gap-2 pl-2 pr-6 py-2 rounded-full border border-foreground/80 font-medium hover:bg-foreground hover:text-background transition">
                <span className="w-9 h-9 rounded-full border border-foreground/80 grid place-items-center">
                  <Play className="w-3.5 h-3.5 fill-current" />
                </span>
                Lihat Promo
              </button>
            </div>
          </div>

          <div className="relative">
            <Rotating3DBag />
            <p className="text-center text-xs text-muted-foreground mt-2 italic">
              Gerakkan kursor untuk memutar tas
            </p>
          </div>
        </section>

        {/* Layanan Section - SEO IMPROVED */}
        <section id="layanan" className="max-w-7xl mx-auto px-6 lg:px-10 mt-16 lg:mt-24 pb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-secondary/50 backdrop-blur-sm mb-4">
              <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase">
                Layanan Profesional
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold mb-4 tracking-tight">
              <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_4s_ease-in-out_infinite]">
                Jasa Perbaikan Tas & Koper
              </span>
            </h2>
            <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed">
              Kami menyediakan berbagai layanan perbaikan tas dan koper dengan profesional dan pengalaman melayani pelanggan di Ponorogo dan sekitarnya.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <div key={service.id} className="p-6 rounded-2xl bg-secondary/30 border border-border/40 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <div className="text-4xl mb-3">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <a
                  href={waLink(service.name)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition font-medium"
                >
                  <MessageCircle className="w-4 h-4" />
                  Tanya Admin
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Koleksi Section */}
        <section id="koleksi" className="max-w-7xl mx-auto px-6 lg:px-10 mt-16 lg:mt-24 pb-16">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
            {/* Left Column — Carousel (30%) */}
            <div className="w-full lg:w-[30%] lg:min-w-[30%] flex flex-col items-center text-center">
              <div className="mb-4 md:mb-6 w-full">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-secondary/50 backdrop-blur-sm mb-3">
                  <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase">
                    3D Experience
                  </span>
                </div>
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-semibold mb-2 tracking-tight">
                  <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_4s_ease-in-out_infinite]">
                    Koleksi Kami
                  </span>
                </h2>
                <p className="text-muted-foreground text-xs md:text-sm max-w-sm mx-auto leading-relaxed">
                  Geser untuk menjelajahi koleksi tas premium kami.
                </p>
              </div>
              <CylindricalCarousel items={carouselItems} className="w-full" />
            </div>

            {/* Right Column — Rating & Ulasan (70%) */}
            <div className="w-full lg:w-[70%] space-y-6 lg:space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/50 bg-secondary/30 backdrop-blur-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium text-muted-foreground tracking-widest uppercase">
                  Testimonial
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-semibold tracking-tight leading-[1.1]">
                Rating Kepuasan Pelanggan
              </h2>

              <div className="flex items-center gap-4">
                <div className="text-5xl lg:text-6xl font-display font-semibold tracking-tight">
                  4.8<span className="text-2xl lg:text-3xl text-muted-foreground font-normal">/5</span>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 lg:w-6 lg:h-6 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54[[...]" />
                    </svg>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 rounded-full bg-tile-4 border-2 border-background" />
                  <div className="w-10 h-10 rounded-full bg-tile-2 border-2 border-background" />
                  <div className="w-10 h-10 rounded-full bg-foreground text-background border-2 border-background grid place-items-center text-xs font-semibold">
                    +
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Dari <strong className="text-foreground">2.000+</strong> ulasan pelanggan
                </p>
              </div>

              <div className="w-16 h-0.5 bg-primary/30 rounded-full" />

              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-semibold tracking-tight">
                  Ulasan Pelanggan
                </h3>

                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-secondary/30 border border-border/40 backdrop-blur-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/40 to-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                          A
                        </div>
                        <div>
                          <p className="text-sm font-medium">Andi Pratama</p>
                          <p className="text-[11px] text-muted-foreground">Pembeli Ransel Sunrise</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688[...]" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "Tasnya bagus banget! Kualitas bahan premium, jahitan rapi, dan pengiriman cepat. 
                      Warnanya sesuai dengan foto. Pasti bakal repeat order lagi!"
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-secondary/30 border border-border/40 backdrop-blur-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400/40 to-blue-400/10 flex items-center justify-center text-sm font-semibold text-blue-400">
                          S
                        </div>
                        <div>
                          <p className="text-sm font-medium">Siti Rahma</p>
                          <p className="text-[11px] text-muted-foreground">Pembeli Ransel Ember</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688[...]" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "Recommended banget! Tasnya nyaman dipakai sehari-hari, desainnya stylish dan 
                      banyak kantongnya. Sudah beli 3 kali untuk keluarga."
                    </p>
                  </div>
                </div>

                <a
                  href={waLink("Ransel Bag Corner")}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all duration-200"
                >
                  <MessageCircle className="w-4 h-4" />
                  Tulis Ulasan Kamu
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Google Maps & Lokasi Section - BARU */}
        <section id="kontak" className="max-w-7xl mx-auto px-6 lg:px-10 mt-16 lg:mt-24 pb-16">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Maps Embed */}
            <div className="w-full">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-secondary/50 backdrop-blur-sm mb-4">
                <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase">
                  Lokasi Kami
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold mb-6 tracking-tight">
                Kunjungi Kami Langsung
              </h2>
              
              <div className="w-full h-[400px] rounded-2xl overflow-hidden border border-border/40 mb-6 shadow-lg">
                <iframe
                  src={GOOGLE_MAPS_EMBED}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Bag Corner di Google Maps"
                ></iframe>
              </div>
              
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/20 border border-primary/50 text-primary hover:bg-primary/30 transition font-medium"
              >
                <MapPin className="w-4 h-4" />
                Buka di Google Maps
              </a>
            </div>

            {/* Kontak Info */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-secondary/50 backdrop-blur-sm mb-4">
                <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase">
                  Hubungi Kami
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-semibold tracking-tight">
                Informasi Kontak
              </h2>

              <div className="space-y-4">
                {/* Alamat Lengkap - UPDATED */}
                <div className="p-6 rounded-2xl bg-secondary/30 border border-border/40 backdrop-blur-sm hover:border-primary/50 transition-all">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Alamat Toko</h3>
                      <p className="text-muted-foreground text-sm">
                        Jalan Urip Sumoharjo 66<br />
                        Kelurahan Mangkujaya<br />
                        Kecamatan Ponorogo<br />
                        Kota Ponorogo, Jawa Timur 63412<br />
                        Indonesia
                      </p>
                    </div>
                  </div>
                </div>

                {/* Telepon */}
                <div className="p-6 rounded-2xl bg-secondary/30 border border-border/40 backdrop-blur-sm hover:border-primary/50 transition-all">
                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Hubungi via WhatsApp</h3>
                      <a 
                        href={waLink("informasi")}
                        target="_blank"
                        rel="noreferrer"
                        className="text-primary hover:underline text-sm font-medium"
                      >
                        +62 817-749-7770
                      </a>
                    </div>
                  </div>
                </div>

                {/* Jam Operasional */}
                <div className="p-6 rounded-2xl bg-secondary/30 border border-border/40 backdrop-blur-sm hover:border-primary/50 transition-all">
                  <div className="flex items-start gap-4">
                    <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Jam Operasional</h3>
                      <p className="text-muted-foreground text-sm">
                        Senin - Minggu: 08:00 - 21:00<br />
                        Minggu: Buka Normal
                      </p>
                    </div>
                  </div>
                </div>

                {/* Media Sosial */}
                <div className="p-6 rounded-2xl bg-secondary/30 border border-border/40 backdrop-blur-sm hover:border-primary/50 transition-all">
                  <h3 className="font-semibold text-lg mb-3">Ikuti Kami</h3>
                  <div className="flex gap-3">
                    <a 
                      href="https://www.tiktok.com/@bagcornerponorogo"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition text-sm font-medium"
                    >
                      TikTok
                    </a>
                    <a 
                      href="https://www.instagram.com/bagcorner"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-full bg-primary/20 text-primary hover:bg-primary/30 transition text-sm font-medium"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t bg-background text-foreground mt-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-2xl font-display font-semibold">Bag Corner<span className="text-primary">.</span></div>
              <p className="mt-3 text-sm text-muted-foreground max-w-xs">
                Jasa perbaikan tas dan koper profesional di Ponorogo. Layanan berkualitas dengan harga terjangkau untuk semua kebutuhan Anda.
              </p>
            </div>
            <div className="text-sm">
              <div className="font-semibold mb-3">Menu</div>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#layanan" className="hover:text-foreground transition">Layanan</a></li>
                <li><Link to="/tentang" className="hover:text-foreground transition">Tentang</Link></li>
                <li><Link to="/payment-info" className="hover:text-foreground transition">Info-Payment</Link></li>
              </ul>
            </div>
            <div className="text-sm">
              <div className="font-semibold mb-3">Kontak</div>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a href={waLink("informasi")} target="_blank" rel="noreferrer" className="hover:text-foreground transition">
                    WhatsApp: +62 817-749-7770
                  </a>
                </li>
                <li><a href="https://www.tiktok.com/@bagcornerponorogo" target="_blank" rel="noreferrer" className="hover:text-foreground transition">TikTok: @bagcornerponorogo</a></li>
                <li>Ponorogo, Jawa Timur, Indonesia</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-xs text-muted-foreground pb-6">© {new Date().getFullYear()} Bag Corner. Semua hak dilindungi.</div>
        </footer>

        <LiveChatWidget />
      </div>
    </div>
  );
}
