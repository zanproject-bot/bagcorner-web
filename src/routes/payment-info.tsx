import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import { ArrowLeft } from 'lucide-react' // Tambahan: Import icon panah kiri

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
          <div className="text-lg md:text-xl font-bold tracking-tight">
            Bag Corner<span className="text-[#e07a3c]">.</span>
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
            
            {/* === KARTU B
