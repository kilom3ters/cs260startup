import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        proxy: {
            '/api': 'http://localhost:4000',
            '/login': 'http://localhost:4000',
            '/register': 'http://localhost:4000',
            '/logout': 'http://localhost:4000'
        }
    }
});
