import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import logobag from "@/assets/logobag.svg";

export const Route = createFileRoute("/tentang")({
  component: TentangPage,
});

function TentangPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const particleColor = "#e07a3c"; // Warna partikel dari x.txt

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.1;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
      }
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.globalAlpha = this.opacity;
        ctx.shadowBlur = 10;
        ctx.shadowColor = particleColor;
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      let particleCount = Math.min(150, Math.floor(window.innerWidth / 10));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animateParticles = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animateParticles);
    };

    initParticles();
    animateParticles();

    // Intersection Observer untuk Reveal Animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const revealElements = document.querySelectorAll(".reveal-item");
    revealElements.forEach((el) => observer.observe(el));

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", setCanvasSize);
      observer.disconnect();
    };
  }, []);

  // Data Array untuk Cards
  const cardsData = [
    {
      icon: "🧳",
      title: "Pilihan Gaya & Perjalanan",
      desc: "Mulai dari ransel sekolah anak hingga dewasa, tas traveling yang praktis, hingga koper dan troli anak dengan berbagai ukuran.",
    },
    {
      icon: "🛠️",
      title: "Pusat Reparasi Spesialis",
      desc: "Tidak sekadar menjual, kami memberikan solusi tuntas untuk tas dan koper kesayangan Anda yang mengalami kerusakan pada roda, resleting, troli, hingga sistem kunci.",
    },
  ];

  const whyUsData = [
    {
      title: "Tren & Evergreen",
      desc: "Koleksi bukan sekadar produk musiman, melainkan model pilihan terbaru, gaya kekinian yang siap menjadi tren, hingga model everlasting (klasik sepanjang masa).",
    },
    {
      title: "Pengalaman Berbelanja",
      desc: "Pengalaman berbelanja yang ramah, nyaman, serta saran jujur demi kepuasan Anda.",
    },
    {
      title: "Berorientasi Solusi",
      desc: "Kami siap menjadi solusi untuk kebutuhan gaya maupun perbaikan tas dan koper Anda.",
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white overflow-hidden font-sans">
      {/* Inject custom keyframes & base styles */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 0% center; }
          50% { background-position: 100% center; }
          100% { background-position: 0% center; }
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(224, 122, 60, 0.4); }
          50% { transform: scale(1.2); box-shadow: 0 0 0 10px transparent; }
        }
        .reveal-item { opacity: 0; transform: translateY(40px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-item.in-view { opacity: 1; transform: translateY(0); }
        .reveal-text { opacity: 0; transform: translateY(30px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-item.in-view .reveal-text { opacity: 1; transform: translateY(0); }
      `}</style>

      {/* Background Canvas Particles */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
      
      {/* Background Gradient Overlay */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none" 
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(224, 122, 60, 0.15) 0%, transparent 60%)" }}
      />

      {/* Content Wrapper */}
      <div className="relative z-10">
        {/* Header / Navbar */}
        <header className="bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50 px-6 md:px-12 py-5 flex justify-between items-center">
          <Link to="/" className="text-xl md:text-2xl font-bold tracking-tight cursor-pointer flex items-center gap-2">
            <img src={logobag} alt="Bag Corner logo" className="inline-block w-9 h-9 md:w-10 md:h-10 object-contain" />
            <span>Bag Corner</span>
          </Link>
          <nav className="hidden md:flex gap-8 text-sm text-[#999] font-medium">
            <Link to="/" className="hover:text-[#e07a3c] transition">BERANDA</Link>
            <Link to="/tentang" className="text-[#e07a3c]">TENTANG</Link>
            {/* Menu Produk dan Kontak dihapus di sini */}
            <Link to="/payment-info" className="hover:text-[#e07a3c] transition">INFO-PAYMENT</Link>
          </nav>
        </header>

        {/* Hero Section */}
        <section className="min-h-[60vh] flex flex-col justify-center items-center text-center pt-32 pb-16 px-5">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm mb-8 text-[10px] tracking-[2px] uppercase text-[#999]">
            <div className="w-1.5 h-1.5 rounded-full bg-[#e07a3c] animate-[pulse-glow_2s_infinite_ease-in-out]"></div>
            <span>EST. MEI 2010</span>
          </div>
          <h1 
            className="text-4xl md:text-6xl font-bold leading-tight mb-5 text-white font-['Playfair_Display',serif]"
            style={{ textShadow: "0 0 10px rgba(255,255,255,0.8), 0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(224,122,60,0.4)" }}
          >
            Tentang Bag Corner<br />Ponorogo
          </h1>
          <p className="text-lg text-[#999] max-w-2xl">
            Menemani setiap langkah aktivitas Anda dengan tas berkualitas tinggi yang modis dan fana sejak Mei 2010.
          </p>
        </section>

        {/* History Section */}
        <div className="max-w-6xl mx-auto px-5 py-20">
          <div className="reveal-item bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-3xl p-8 md:p-16 text-center shadow-2xl">
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Playfair_Display',serif] bg-[linear-gradient(90deg,#999_0%,#e07a3c_50%,#999_100%)] bg-[length:200%_auto] animate-[shimmer_4s_ease-in-out_infinite] bg-clip-text text-transparent">
                Awal Mula Perjalanan Kami
              </h2>
            </div>
            <p className="reveal-text text-lg text-gray-300 mb-6 max-w-3xl mx-auto">
              Bag Corner Ponorogo hadir dari sebuah komitmen sederhana: memastikan setiap warga mendapatkan akses terhadap tas berkualitas tinggi yang modis dan fana dalam setiap langkah aktivitas mereka, sejak{" "}
              <span className="text-[#e07a3c] font-semibold">Mei 2010</span>.
            </p>
            <p className="reveal-text text-lg text-gray-300 max-w-3xl mx-auto" style={{ transitionDelay: "0.3s" }}>
              Kami percaya bahwa tas bukan sekadar wadah bawaan, melainkan bagian dari identitas gaya hidup. Oleh karena itu, target utama kami adalah menemani kaum muda hingga dewasa yang dinamis dan berjiwa fashionable.
            </p>
          </div>
        </div>

        {/* Collection & Repair Cards */}
        <div className="max-w-6xl mx-auto px-5 pb-20">
          <div className="reveal-item text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Playfair_Display',serif] bg-[linear-gradient(90deg,#999_0%,#e07a3c_50%,#999_100%)] bg-[length:200%_auto] animate-[shimmer_4s_ease-in-out_infinite] bg-clip-text text-transparent">
              Koleksi & Solusi Lengkap
            </h2>
            <p className="text-[#999] max-w-xl mx-auto">
              Bag Corner Ponorogo menghadirkan kurasi produk terlengkap untuk berbagai kebutuhan.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {cardsData.map((card, i) => (
              <div 
                key={i} 
                className="reveal-item p-8 md:p-10 bg-white/[0.03] border border-white/10 backdrop-blur-md rounded-2xl transition-all duration-400 hover:border-[#e07a3c] hover:bg-[#e07a3c]/5 hover:-translate-y-2 hover:shadow-xl"
                style={{ transitionDelay: `${i * 0.2}s` }}
              >
                <span className="text-3xl block mb-5">{card.icon}</span>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 font-['Playfair_Display',serif]">{card.title}</h3>
                <p className="text-[#999] text-sm md:text-base">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="max-w-6xl mx-auto px-5 pb-20">
          <div className="reveal-item text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Playfair_Display',serif] bg-[linear-gradient(90deg,#999_0%,#e07a3c_50%,#999_100%)] bg-[length:200%_auto] animate-[shimmer_4s_ease-in-out_infinite] bg-clip-text text-transparent">
              Mengapa Memilih Kami?
            </h2>
            <p className="text-[#999] max-w-xl mx-auto">
              Di tengah perputaran tren fashion yang bergerak sangat cepat serta dinamika masyarakat Ponorogo yang unik, kami terus beradaptasi tanpa meninggalkan akar pelayanan kami.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-10 text-center">
            {whyUsData.map((item, i) => (
              <div 
                key={i} 
                className="reveal-item flex-1 min-w-[250px] max-w-[300px] p-5"
                style={{ transitionDelay: `${i * 0.2}s` }}
              >
                <h3 className="text-xl font-bold text-white mb-3 font-['Playfair_Display',serif]">{item.title}</h3>
                <p className="text-[#999] text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Commitment Section */}
        <div className="max-w-4xl mx-auto px-5 pb-24 text-center">
          <div className="reveal-item">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 font-['Playfair_Display',serif] bg-[linear-gradient(90deg,#999_0%,#e07a3c_50%,#999_100%)] bg-[length:200%_auto] animate-[shimmer_4s_ease-in-out_infinite] bg-clip-text text-transparent">
              Komitmen & Prinsip Kami
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Bagi kami, bisnis bukan sekadar transaksi, melainkan tentang melayani dengan hati. Sebagai wujud tanggung jawab dan kepercayaan yang telah Anda bangun bersama kami selama belasan tahun, kami selalu memberikan yang terbaik—termasuk dukungan layanan tambahan berupa garansi servis untuk produk-produk tertentu.
            </p>
            <div 
              className="font-['Playfair_Display',serif] text-xl md:text-2xl text-[#e07a3c] italic inline-block py-5"
              style={{ textShadow: "0 0 20px rgba(224,122,60,0.4)" }}
            >
              "Terima kasih telah menjadikan Bag Corner Ponorogo sebagai bagian dari perjalanan dan gaya hidup Anda."
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-[#050505] border-t border-white/10 text-center py-10 text-[#999] text-sm relative z-10">
          <p>&copy; {new Date().getFullYear()} Bag Corner Ponorogo. Semua hak dilindungi.</p>
        </footer>
      </div>
    </div>
  );
}
