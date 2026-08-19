<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tentang Kami - Bag Corner Ponorogo</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary-color: #2C3E50; /* Warna elegan, melambangkan evergreen/classic */
            --accent-color: #C0392B; /* Warna merah bata, melambangkan semangat & fashion */
            --bg-color: #F9F9F9;
            --text-color: #333333;
            --light-text: #666666;
            --white: #FFFFFF;
            --shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            scroll-behavior: smooth;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background-color: var(--bg-color);
            color: var(--text-color);
            line-height: 1.6;
            overflow-x: hidden;
        }

        h1, h2, h3 {
            font-family: 'Playfair Display', serif;
            color: var(--primary-color);
        }

        /* Navbar Sederhana */
        header {
            background-color: var(--white);
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            padding: 20px 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary-color);
        }

        nav a {
            text-decoration: none;
            color: var(--text-color);
            margin-left: 20px;
            font-weight: 500;
            transition: color 0.3s;
        }

        nav a:hover {
            color: var(--accent-color);
        }

        /* Hero Section */
        .hero {
            min-height: 60vh;
            display: flex;
            justify-content: center;
            align-items: center;
            text-align: center;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            padding: 80px 20px;
            position: relative;
        }

        .hero-content h1 {
            font-size: 3rem;
            margin-bottom: 15px;
            opacity: 0;
            transform: translateY(-20px);
            animation: fadeDown 1s ease forwards;
        }

        .hero-content p {
            font-size: 1.2rem;
            color: var(--light-text);
            max-width: 700px;
            margin: 0 auto;
            opacity: 0;
            transform: translateY(20px);
            animation: fadeUp 1s ease 0.5s forwards;
        }

        /* Container Umum */
        .container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 80px 20px;
        }

        /* Section Title */
        .section-title {
            text-align: center;
            margin-bottom: 50px;
        }

        .section-title h2 {
            font-size: 2.2rem;
            margin-bottom: 10px;
        }

        .section-title p {
            color: var(--light-text);
        }

        /* Sejarah Section dengan Animasi Garis Waktu (Melambangkan perjalanan) */
        .history-wrapper {
            position: relative;
            padding: 50px 0;
        }

        .history-line {
            position: absolute;
            left: 50%;
            top: 0;
            width: 4px;
            height: 0;
            background-color: var(--accent-color);
            transform: translateX(-50%);
            transition: height 1.5s ease-in-out;
        }

        .history-wrapper.in-view .history-line {
            height: 100%;
        }

        .history-text {
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
            font-size: 1.1rem;
        }

        .history-highlight {
            font-weight: 600;
            color: var(--accent-color);
        }

        /* Cards Section untuk Koleksi & Solusi */
        .cards-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }

        .card {
            background: var(--white);
            padding: 40px 30px;
            border-radius: 15px;
            box-shadow: var(--shadow);
            transition: transform 0.4s ease, box-shadow 0.4s ease;
            opacity: 0;
            transform: translateY(40px);
        }

        .card.in-view {
            opacity: 1;
            transform: translateY(0);
        }

        .card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .card-icon {
            font-size: 2.5rem;
            margin-bottom: 20px;
            display: block;
        }

        .card h3 {
            margin-bottom: 15px;
            font-size: 1.5rem;
        }

        .card ul {
            list-style-position: inside;
            color: var(--light-text);
        }

        /* Why Choose Us Section */
        .why-us {
            background-color: var(--primary-color);
            color: var(--white);
        }

        .why-us .section-title h2,
        .why-us .section-title p {
            color: var(--white);
        }

        .why-us-content {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 40px;
            text-align: center;
        }

        .why-item {
            flex: 1;
            min-width: 250px;
            max-width: 300px;
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.6s ease;
        }

        .why-item.in-view {
            opacity: 1;
            transform: scale(1);
        }

        .why-item h3 {
            color: var(--accent-color);
            margin-bottom: 10px;
        }

        /* Komitmen Section */
        .commitment {
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
        }

        .commitment p {
            font-size: 1.1rem;
            margin-bottom: 20px;
            color: var(--light-text);
        }

        .commitment-highlight {
            font-family: 'Playfair Display', serif;
            font-size: 1.4rem;
            color: var(--primary-color);
            font-style: italic;
        }

        /* Footer */
        footer {
            background-color: #222;
            color: #aaa;
            text-align: center;
            padding: 30px 20px;
            margin-top: 40px;
        }

        /* Animasi Keyframes */
        @keyframes fadeDown {
            to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeUp {
            to { opacity: 1; transform: translateY(0); }
        }

        /* Responsive */
        @media (max-width: 768px) {
            header {
                padding: 15px 20px;
                flex-direction: column;
            }
            nav a {
                margin: 5px 10px 0 0;
            }
            .hero-content h1 {
                font-size: 2.2rem;
            }
            .history-line {
                left: 20px; /* Pindah garis ke kiri di mobile */
            }
        }
    </style>
</head>
<body>

    <header>
        <div class="logo">Bag Corner Ponorogo</div>
        <nav>
            <a href="#">Beranda</a>
            <a href="#" style="color: var(--accent-color);">Tentang</a>
            <a href="#">Produk</a>
            <a href="#">Kontak</a>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-content">
            <h1>Tentang Bag Corner Ponorogo</h1>
            <p>Menemani setiap langkah aktivitas Anda dengan tas berkualitas tinggi yang modis dan fana sejak Mei 2010.</p>
        </div>
    </section>

    <!-- Sejarah & Visi Section -->
    <div class="container">
        <div class="history-wrapper reveal">
            <div class="history-line"></div>
            <div class="section-title">
                <h2>Awal Mula Perjalanan Kami</h2>
            </div>
            <div class="history-text">
                <p>Berdiri sejak <span class="history-highlight">Mei 2010</span>, Bag Corner Ponorogo hadir dari sebuah komitmen sederhana: memastikan setiap warga mendapatkan akses terhadap tas berkualitas tinggi yang modis dan fana dalam setiap langkah aktivitas mereka.</p>
                <br>
                <p>Kami percaya bahwa tas bukan sekadar wadah bawaan, melainkan <strong>bagian dari identitas gaya hidup</strong>. Oleh karena itu, target utama kami adalah menemani kaum muda hingga dewasa yang dinamis dan berjiwa fashionable.</p>
            </div>
        </div>
    </div>

    <!-- Koleksi & Solusi Section -->
    <div class="container">
        <div class="section-title reveal">
            <h2>Koleksi & Solusi Lengkap untuk Anda</h2>
            <p>Bag Corner Ponorogo menghadirkan kurasi produk terlengkap untuk berbagai kebutuhan.</p>
        </div>
        <div class="cards-grid">
            <div class="card reveal" style="transition-delay: 0.1s;">
                <span class="card-icon">🧳</span>
                <h3>Pilihan Gaya & Perjalanan</h3>
                <p>Mulai dari ransel sekolah anak hingga dewasa, tas traveling yang praktis, hingga koper dan troli anak dengan berbagai ukuran.</p>
            </div>
            <div class="card reveal" style="transition-delay: 0.3s;">
                <span class="card-icon">🛠️</span>
                <h3>Pusat Reparasi Spesialis</h3>
                <p>Tidak sekadar menjual, kami memberikan solusi tuntas untuk tas dan koper kesayangan Anda yang mengalami kerusakan pada roda, resleting, troli, hingga sistem kunci.</p>
            </div>
        </div>
    </div>

    <!-- Mengapa Memilih Section -->
    <section class="why-us">
        <div class="container">
            <div class="section-title reveal">
                <h2>Mengapa Memilih Bag Corner Ponorogo?</h2>
                <p>Di tengah perputaran tren fashion yang bergerak sangat cepat serta dinamika masyarakat Ponorogo yang unik, kami terus beradaptasi tanpa meninggalkan akar pelayanan kami.</p>
            </div>
            <div class="why-us-content">
                <div class="why-item reveal" style="transition-delay: 0.2s;">
                    <h3>Tren & Evergreen</h3>
                    <p>Koleksi bukan sekadar produk musiman, melainkan model pilihan terbaru, gaya kekinian yang siap menjadi tren, hingga model everlasting (klasik sepanjang masa).</p>
                </div>
                <div class="why-item reveal" style="transition-delay: 0.4s;">
                    <h3>Pengalaman Berbelanja</h3>
                    <p>Pengalaman berbelanja yang ramah, nyaman, serta saran jujur demi kepuasan Anda.</p>
                </div>
                <div class="why-item reveal" style="transition-delay: 0.6s;">
                    <h3>Berorientasi Solusi</h3>
                    <p>Kami siap menjadi solusi untuk kebutuhan gaya maupun perbaikan tas dan koper Anda.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Komitmen Section -->
    <div class="container">
        <div class="commitment reveal">
            <div class="section-title">
                <h2>Komitmen & Prinsip Kami</h2>
            </div>
            <p>Bagi kami, bisnis bukan sekadar transaksi, melainkan tentang melayani dengan hati. Sebagai wujud tanggung jawab dan kepercayaan yang telah Anda bangun bersama kami selama belasan tahun, kami selalu memberikan yang terbaik—termasuk dukungan layanan tambahan berupa garansi servis untuk produk-produk tertentu.</p>
            <br>
            <p class="commitment-highlight">"Terima kasih telah menjadikan Bag Corner Ponorogo sebagai bagian dari perjalanan dan gaya hidup Anda."</p>
        </div>
    </div>

    <footer>
        <p>&copy; 2024 Bag Corner Ponorogo. All Rights Reserved.</p>
    </footer>

    <script>
        // JavaScript untuk Animasi Scroll Reveal
        const observerOptions = {
            threshold: 0.2 // Animasi berjalan saat 20% elemen terlihat di layar
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    // Hentikan observasi setelah animasi berjalan agar tidak berulang
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Pilih semua elemen dengan kelas 'reveal'
        const revealElements = document.querySelectorAll('.reveal, .history-wrapper');
        revealElements.forEach(el => {
            observer.observe(el);
        });
    </script>
</body>
</html>
