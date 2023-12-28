import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from 'vite-plugin-pwa'
import replace from '@rollup/plugin-replace'

const replaceOptions = {preventAssignment: true, __BUILD_TIMESTAMP__: new Date().toISOString()}


const pwaOptions = {
    // mode: 'development',
    // base: '/',
    // includeAssets: ['favicon.svg'],
    manifest: {
        name: 'ClickList',
        short_name: 'ClickList',
        theme_color: '#ffffff',
        icons: [
            {
                src: 'icon192.png', // <== don't add slash, for testing
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: 'icon512.png', // <== don't add slash, for testing
                sizes: '512x512',
                type: 'image/png'
            },
        ],
    },
    devOptions: {
        // enabled: process.env.SW_DEV === 'true',
        /* when using generateSW the PWA plugin will switch to classic */
        type: 'module',
        navigateFallback: 'index.html',
    },
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), VitePWA(pwaOptions), replace(replaceOptions)],
    base: '/clicklist/'
})

