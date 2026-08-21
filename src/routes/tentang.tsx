// src/routes/About.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import './About.css' // Import CSS yang sudah dibuat di atas

// Komponen Halaman About
function AboutPage() {
  // Menggantikan script IntersectionObserver biasa dengan React useEffect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target); // Hentikan observasi setelah animasi berjalan
        }
      });
    }, observerOptions);

    // Pilih semua elemen dengan kelas 'reveal' atau 'history-wrapper'
    const revealElements = document.querySelectorAll('.reveal, .history-wrapper');
    revealElements.forEach((el) => {
      observer.observe(el);
    });

    // Cleanup function saat komponen unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <header>
        <div className="logo">Bag Corner Ponorogo</div>
        <nav>
          <a href="#">Beranda</a>
          <a href="#" style={{ color: 'var(--accent-color)' }}>Tentang</a>
          <a href="#">Produk</a>
          <a href="#">Kontak</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Tentang Bag Corner Ponorogo</h1>
          <p>Menemani setiap langkah aktivitas Anda dengan tas berkualitas tinggi yang modis dan fana sejak Mei 2010.</p>
        </div>
      </section>

      {/* Sejarah & Visi Section */}
      <div className="container">
        <div className="history-wrapper reveal">
          <div className="history-line"></div>
          <div className="section-title">
            <h2>Awal Mula Perjalanan Kami</h2>
          </div>
          <div className="history-text">
            <p>
              Berdiri sejak <span className="history-highlight">Mei 2010</span>, Bag Corner Ponorogo hadir dari sebuah komitmen sederhana: memastikan setiap warga mendapatkan akses terhadap tas berkualitas tinggi yang modis dan fana dalam setiap langkah aktivitas mereka.
            </p>
            <br />
            <p>
              Kami percaya bahwa tas bukan sekadar wadah bawaan, melainkan <strong>bagian dari identitas gaya hidup</strong>. Oleh karena itu, target utama kami adalah menemani kaum muda hingga dewasa yang dinamis dan berjiwa fashionable.
            </p>
          </div>
        </div>
      </div>

      {/* Koleksi & Solusi Section */}
      <div className="container">
        <div className="section-title reveal">
          <h2>Koleksi & Solusi Lengkap untuk Anda</h2>
          <p>Bag Corner Ponorogo menghadirkan kurasi produk terlengkap untuk berbagai kebutuhan.</p>
        </div>
        <div className="cards-grid">
          <div className="card reveal" style={{ transitionDelay: '0.1s' }}>
            <span className="card-icon">🧳</span>
            <h3>Pilihan Gaya & Perjalanan</h3>
            <p>Mulai dari ransel sekolah anak hingga dewasa, tas traveling yang praktis, hingga koper dan troli anak dengan berbagai ukuran.</p>
          </div>
          <div className="card reveal" style={{ transitionDelay: '0.3s' }}>
            <span className="card-icon">🛠️</span>
            <h3>Pusat Reparasi Spesialis</h3>
            <p>Tidak sekadar menjual, kami memberikan solusi tuntas untuk tas dan koper kesayangan Anda yang mengalami kerusakan pada roda, resleting, troli, hingga sistem kunci.</p>
          </div>
        </div>
      </div>

      {/* Mengapa Memilih Section */}
      <section className="why-us">
        <div className="container">
          <div className="section-title reveal">
            <h2>Mengapa Memilih Bag Corner Ponorogo?</h2>
            <p>Di tengah perputaran tren fashion yang bergerak sangat cepat serta dinamika masyarakat Ponorogo yang unik, kami terus beradaptasi tanpa meninggalkan akar pelayanan kami.</p>
          </div>
          <div className="why-us-content">
            <div className="why-item reveal" style={{ transitionDelay: '0.2s' }}>
              <h3>Tren & Evergreen</h3>
              <p>Koleksi bukan sekadar produk musiman, melainkan model pilihan terbaru, gaya kekinian yang siap menjadi tren, hingga model everlasting (klasik sepanjang masa).</p>
            </div>
            <div className="why-item reveal" style={{ transitionDelay: '0.4s' }}>
              <h3>Pengalaman Berbelanja</h3>
              <p>Pengalaman berbelanja yang ramah, nyaman, serta saran jujur demi kepuasan Anda.</p>
            </div>
            <div className="why-item reveal" style={{ transitionDelay: '0.6s' }}>
              <h3>Berorientasi Solusi</h3>
              <p>Kami siap menjadi solusi untuk kebutuhan gaya maupun perbaikan tas dan koper Anda.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Komitmen Section */}
      <div className="container">
        <div className="commitment reveal">
          <div className="section-title">
            <h2>Komitmen & Prinsip Kami</h2>
          </div>
          <p>
            Bagi kami, bisnis bukan sekadar transaksi, melainkan tentang melayani dengan hati. Sebagai wujud tanggung jawab dan kepercayaan yang telah Anda bangun bersama kami selama belasan tahun, kami selalu memberikan yang terbaik—termasuk dukungan layanan tambahan berupa garansi servis untuk produk-produk tertentu.
          </p>
          <br />
          <p className="commitment-highlight">
            "Terima kasih telah menjadikan Bag Corner Ponorogo sebagai bagian dari perjalanan dan gaya hidup Anda."
          </p>
        </div>
      </div>

      <footer>
        <p>&copy; 2024 Bag Corner Ponorogo. All Rights Reserved.</p>
      </footer>
    </>
  );
}

// Mendaftarkan route menggunakan TanStack Router
export const Route = createFileRoute('/about')({
  component: AboutPage,
});

// Default export untuk komponennya
export default AboutPage;
