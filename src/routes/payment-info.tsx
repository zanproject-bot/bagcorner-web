import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

// Definisi Route untuk TanStack Router File-Based
export const Route = createFileRoute('/payment-info')({
  component: PaymentInfoPage,
})

function PaymentInfoPage() {
  // State untuk mengecek rekening mana yang baru saja disalin
  const [copiedBank, setCopiedBank] = useState<string | null>(null)

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4 sm:p-6 py-12">
      
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
          touch-action: manipulation;
        }
      `}</style>

      {/* Header */}
      <div className="anim-fade-down text-center mb-10 sm:mb-12 w-full max-w-2xl px-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-white mb-3 tracking-wide">
          Informasi Pembayaran
        </h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Silakan transfer pembayaran ke salah satu rekening resmi di bawah ini. Klik nomor rekening untuk menyalin.
        </p>
      </div>

      {/* Grid Kartu Bank */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-4xl px-2 sm:px-4 z-10">
        
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
        className="anim-fade-up mt-10 sm:mt-12 text-center text-slate-500 text-xs sm:text-sm max-w-lg px-4 z-10" 
        style={{ animationDelay: '0.6s' }}
      >
        <p className="mb-2 font-semibold text-slate-400">Penting:</p>
        <p>Pastikan transfer sesuai dengan nominal tagihan. Simpan bukti transfer dan konfirmasi pembayaran kepada admin kami untuk proses verifikasi cepat.</p>
      </div>
    </div>
  )
}