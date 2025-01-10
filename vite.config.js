import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/',
    server: {
        open: true,
        fs: {
            allow: ['..'],
        },
    },
    build: {
        target: 'esnext', // Обеспечивает генерацию ES-модулей
        modulePreload: true, // Включает modulepreload
    },
})
