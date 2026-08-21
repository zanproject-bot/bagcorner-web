import { useEffect } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import './tentang.css'; // Pastikan file CSS berada di folder yang sama

// 1. Daftarkan Route TanStack Router
export const Route = createFileRoute('/tentang')({
  component: TentangPage,
});

// 2. Komponen Utama
function TentangPage() {
  // 3. Logic untuk Animasi Scroll (Intersection Observer)
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target); // Berhenti mengamati setelah animasi jalan
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .history-wrapper');
    revealElements.forEach((el) => observer.observe(el));

    // Cleanup function
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <header>
        <div className="logo">Bag Corner Ponorogo</div>
        <nav>
          {/* Menggunakan Link dari TanStack Router agar pindah halaman tanpa reload */}
          <Link to="/">Beranda</Link>
          <Link to="/tentang" style={{ color: 'var(--accent-color)' }}>Tentang</Link>
          <Link to="/produk">Produk</Link>
          <Link to="/kontak">Kontak</Link>
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
              Kami percaya bahwa tas bukan sekadar wadah bawaan, melainkan <strong>bagian dari identitas gay
