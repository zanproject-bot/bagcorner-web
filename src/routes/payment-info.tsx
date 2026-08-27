import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { ArrowLeft } from 'lucide-react' // Tambahan: Import icon panah kiri
import logobag from '@/assets/logobag.svg'

// Definisi Route untuk TanStack Router File-Based
export const Route = createFileRoute('/payment-info')({
  component: PaymentInfoPage,
})

function PaymentInfoPage() {
  // State untuk mengecek rekening mana yang baru saja disalin
  const [copiedBank, setCopiedBank] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fungsi Copy to Clipboard
  const handleCopy = (text: string, bankName: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopiedBank(bankName)
        // Reset status setelah 2 detik
        setTimeout(() => setCopiedBank(null), 2000)
      })
      .catch((err) => {
        console.error('Gagal menyalin: ', err)
        alert('Gagal menyalin, mohon salin manual.')
      })
  }

  // useEffect untuk Animasi Partikel (Diambil dari tentang.tsx)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const particleColor = "#e07a3c"; // Warna partikel oranye

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

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0A0A0A] text-white overflow-hidden font-sans flex flex-col">
      
      {/* Styling Animasi Kustom */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim-fade-down {
          animation: fadeInDown 0.6s ease-out forwards;
        }
        .anim-fade-up {
          opacity: 0;
          animation: fadeInUp 0.6s ease-out forwards;
        }
        @keyframes logoFloat {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-5px) scale(1.05); }
          100% { transform: translateY(0px) scale(1); }
        }
        .anim-logo {
          animation: logoFloat 2.5s ease-in-out infinite;
        }
        button {
          touch-action: manipulation; /* Anti zoom saat double tap di HP Android */
        }
      `}</style>

      {/* Background Canvas Particles (Sama seperti tentang.tsx) */}
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />
      
      {/* Background Gradient Overlay (Sama seperti tentang.tsx) */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none" 
        style={{ background: "radial-gradient(circle at 50% 0%, rgba(224, 122, 60, 0.15) 0%, transparent 60%)" }}
      />

      {/* Konten Wrapper agar berada di atas partikel */}
      <div className="relative z-10 w-full flex flex-col flex-1">
        
        {/* HEADER DENGAN TOMBOL KEMBALI KE BERANDA */}
        <header className="w-full px-6 md:px-12 py-5 flex items-center justify-between border-b border-white/10 bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-50">
          <Link 
            to="/" 
            className="text-sm sm:text-base text-[#999] hover:text-[#e07a3c] transition flex items-center gap-2 font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Beranda
          </Link>
          <div className="text-lg md:text-xl font-bold tracking-tight flex items-center gap-2">
            <img src={logobag} alt="Bag Corner logo" className="inline-block w-6 h-6 md:w-7 md:h-7 object-contain" />
            <span>Bag Corner</span>
          </div>
        </header>

        {/* Konten Tengah (Kartu Pembayaran) */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 py-12 max-w-4xl mx-auto w-full">
          
          {/* Header Teks */}
          <div className="anim-fade-down text-center mb-10 sm:mb-12 w-full max-w-2xl px-4">
            <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3 tracking-wide">
              Informasi Pembayaran
            </h1>
            <p className="text-[#999] text-sm sm:text-base">
              Silakan transfer pembayaran ke salah satu rekening resmi di bawah ini. Klik nomor rekening untuk menyalin.
            </p>
          </div>

          {/* Grid Kartu Bank */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full px-2 sm:px-4">
            
            {/* === KARTU BCA === */}
            <div 
              className="group bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 anim-fade-up" 
              style={{ animationDelay: '0.2s' }}
            >
              <div className="relative p-4 sm:p-6 flex justify-between items-center gap-3 overflow-hidden bg-[#005FAB]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#004a82] to-[#005FAB] transform group-hover:scale-110 transition-transform duration-700"></div>
                <div className="relative z-10 text-white flex-1">
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest opacity-80">Bank BCA</p>
                  <h2 className="text-base sm:text-xl font-bold mt-1">Bank Central Asia</h2>
                </div>
                <div className="relative z-10 bg-white rounded-xl shadow-lg flex items-center justify-center h-14 w-32 sm:h-20 sm:w-56 flex-shrink-0 p-2">
                  <img 
                    src="https://z-cdn-media.chatglm.cn/files/6edcf023-9ee4-4554-a6fc-16751a0430aa.jpg?auth_key=1887210773-1d645aca65c34b0792cd9890c0c05ee3-0-de6a4e0b5c445d8d5707269c58667615" 
                    alt="Logo BCA" 
                    className="w-full h-full object-contain anim-logo" 
                  />
                </div>
              </div>

              <div className="p-5 sm:p-6 text-center bg-white">
                <p className="text-slate-500 text-sm font-medium mb-2">Nomor Rekening</p>
                <button 
                  onClick={() => handleCopy('2890613210', 'BCA')}
                  className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-wider hover:text-[#005FAB] transition-colors duration-300 cursor-pointer mb-4 block w-full py-3 select-none"
                >
                  289-061-3210
                </button>
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-slate-500 text-sm font-medium mb-1">Atas Nama</p>
                  <p className="text-base sm:text-lg font-semibold text-slate-900">Susanto Yusuf Immanuel</p>
                </div>
                
                {/* Indikator Copy BCA */}
                <div className="h-6 mt-4 flex items-center justify-center text-[#005FAB] text-sm font-medium transition-opacity duration-300">
                  {copiedBank === 'BCA' && (
                    <span className="flex items-center gap-1 opacity-100">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Rekening Disalin!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* === KARTU BRI === */}
            <div 
              className="group bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 anim-fade-up" 
              style={{ animationDelay: '0.4s' }}
            >
              <div className="relative p-4 sm:p-6 flex justify-between items-center gap-3 overflow-hidden bg-[#00529B]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#003d75] to-[#00529B] transform group-hover:scale-110 transition-transform duration-700"></div>
                <div className="relative z-10 text-white flex-1">
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest opacity-80">Bank BRI</p>
                  <h2 className="text-base sm:text-xl font-bold mt-1">Bank Rakyat Indonesia</h2>
                </div>
                <div className="relative z-10 bg-white rounded-xl shadow-lg flex items-center justify-center h-14 w-32 sm:h-20 sm:w-56 flex-shrink-0 p-2">
                  <img 
                    src="https://z-cdn-media.chatglm.cn/files/dc9abd82-3aa9-480f-aa69-d59e0c4b6894.png?auth_key=1887210773-4de567b26a1546b988a03336dbb46a8a-0-a10434914b45493b9c438e57596d2a80" 
                    alt="Logo BRI" 
                    className="w-full h-full object-contain anim-logo" 
                    style={{ animationDelay: '1.2s' }}
                  />
                </div>
              </div>

              <div className="p-5 sm:p-6 text-center bg-white">
                <p className="text-slate-500 text-sm font-medium mb-2">Nomor Rekening</p>
                <button 
                  onClick={() => handleCopy('220401005904502', 'BRI')}
                  className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-wider hover:text-[#00529B] transition-colors duration-300 cursor-pointer mb-4 block w-full py-3 select-none"
                >
                  2204-0100-5904-502
                </button>
                <div className="border-t border-slate-100 pt-4">
                  <p className="text-slate-500 text-sm font-medium mb-1">Atas Nama</p>
                  <p className="text-base sm:text-lg font-semibold text-slate-900">Susanto Yusuf Immanuel</p>
                </div>

                {/* Indikator Copy BRI */}
                <div className="h-6 mt-4 flex items-center justify-center text-[#00529B] text-sm font-medium transition-opacity duration-300">
                  {copiedBank === 'BRI' && (
                    <span className="flex items-center gap-1 opacity-100">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      Rekening Disalin!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Catatan */}
          <div 
            className="anim-fade-up mt-10 sm:mt-12 text-center text-[#999] text-xs sm:text-sm max-w-lg px-4" 
            style={{ animationDelay: '0.6s' }}
          >
            <p className="mb-2 font-semibold text-white">Penting:</p>
            <p>Pastikan transfer sesuai dengan nominal tagihan. Simpan bukti transfer dan konfirmasi pembayaran kepada admin kami di WA 081774977770 untuk proses verifikasi cepat.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
