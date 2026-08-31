/**
 * SEO Schema Markup Generator
 * Menghasilkan structured data untuk Google Search & Maps
 */

export const generateLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://bagcorner-web.vercel.app',
    name: 'Bag Corner',
    description: 'Toko perbaikan dan layanan tas serta koper di Ponorogo',
    url: 'https://bagcorner-web.vercel.app',
    telephone: '+62-817-749-7770',
    image: 'https://bagcorner-web.vercel.app/logo.jpg',
    priceRange: 'Rp50000 - Rp500000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Ponorogo', // Sesuaikan dengan alamat lengkap Anda
      addressLocality: 'Ponorogo',
      addressRegion: 'Jawa Timur',
      postalCode: '63412', // Sesuaikan dengan kode pos Anda
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -7.8738, // Koordinat Ponorogo
      longitude: 111.4613,
    },
    sameAs: [
      'https://www.tiktok.com/@bagcornerponorogo',
      'https://www.instagram.com/bagcorner', // Sesuaikan
    ],
    areaServed: [
      {
        '@type': 'City',
        name: 'Ponorogo',
      },
      {
        '@type': 'City',
        name: 'Madiun',
      },
      {
        '@type': 'City',
        name: 'Pacitan',
      },
      {
        '@type': 'City',
        name: 'Ngawi',
      },
      {
        '@type': 'City',
        name: 'Tulungagung',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '2000',
    },
  };
};

export const generateServiceSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://bagcorner-web.vercel.app',
    name: 'Bag Corner',
    hasOfferingDescription: {
      '@type': 'OfferingDescription',
      description: 'Layanan perbaikan tas dan koper profesional',
      offers: [
        {
          '@type': 'Offer',
          name: 'Perbaikan Resleting Tas',
          description: 'Layanan perbaikan dan penggantian resleting tas',
          areaServed: 'Ponorogo dan sekitarnya',
        },
        {
          '@type': 'Offer',
          name: 'Perbaikan Aksesoris Tas',
          description: 'Perbaikan tali, handle, dan aksesoris tas lainnya',
          areaServed: 'Ponorogo dan sekitarnya',
        },
        {
          '@type': 'Offer',
          name: 'Ganti Roda Koper',
          description: 'Layanan penggantian roda koper yang rusak atau aus',
          areaServed: 'Ponorogo dan sekitarnya',
        },
        {
          '@type': 'Offer',
          name: 'Perbaikan/Ganti Troly Koper',
          description: 'Perbaikan dan penggantian troly/handle koper',
          areaServed: 'Ponorogo dan sekitarnya',
        },
        {
          '@type': 'Offer',
          name: 'Ganti Kunci Koper',
          description: 'Layanan penggantian kunci koper yang hilang atau rusak',
          areaServed: 'Ponorogo dan sekitarnya',
        },
        {
          '@type': 'Offer',
          name: 'Ganti Kepala Resleting Koper',
          description: 'Penggantian kepala/slider resleting koper',
          areaServed: 'Ponorogo dan sekitarnya',
        },
      ],
    },
  };
};

export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Bag Corner',
    url: 'https://bagcorner-web.vercel.app',
    logo: 'https://bagcorner-web.vercel.app/logobag.svg',
    sameAs: [
      'https://www.tiktok.com/@bagcornerponorogo',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+62-817-749-7770',
      email: 'bagcorner@example.com', // Ganti dengan email bisnis Anda
    },
  };
};
