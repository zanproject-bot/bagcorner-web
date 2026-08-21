import { useEffect } from 'react';
import { createFileRoute } from '@tanstack/react-router';
import './tentang.css'; // Pastikan nama file CSS sesuai

function TentangPage() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .history-wrapper');
    revealElements.forEach((el) => {
      observer.observe(el);
    });

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
          <div className
