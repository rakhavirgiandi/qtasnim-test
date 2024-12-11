import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./resources/js", import.meta.url)),
            // "@/Components": fileURLToPath(new URL("@/Components", import.meta.url)),
            // "@/Layouts": fileURLToPath(new URL("@/Layouts", import.meta.url)),
            // "@/components/ui": fileURLToPath(new URL("./components/ui", import.meta.url)),
            // "@/lib": fileURLToPath(new URL("./lib", import.meta.url)),
        },
      },
});
