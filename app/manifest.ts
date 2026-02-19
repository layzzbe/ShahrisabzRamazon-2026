import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Shahrisabz Ramazon 2026',
        short_name: 'Ramazon',
        description: 'Shahrisabz shahri uchun aniq Ramazon taqvimi',
        start_url: '/',
        display: 'standalone',
        background_color: '#064e3b',
        theme_color: '#064e3b',
        icons: [
            {
                src: '/icon',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    }
}
