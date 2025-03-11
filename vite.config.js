import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/api': 'http://localhost:3000',
            '/login': 'http://localhost:3000',
            '/register': 'http://localhost:3000',
            '/logout': 'http://localhost:3000'
        }
    }
});
