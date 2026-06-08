import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Loads all vars (incl. RESEND_API_KEY) from .env / .env.local during dev.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        // Mirrors the Vercel /api/contact function so the form can be tested
        // with `npm run dev` (Vercel functions don't run under plain Vite).
        name: 'dev-contact-api',
        configureServer(server) {
          server.middlewares.use('/api/contact', (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }

            let raw = '';
            req.on('data', (chunk) => (raw += chunk));
            req.on('end', async () => {
              let payload = {};
              try {
                payload = JSON.parse(raw || '{}');
              } catch {
                // leave payload empty -> validation error below
              }

              // ssrLoadModule transpiles the shared .ts module via Vite.
              const mod = await server.ssrLoadModule('/api/sendContactEmail.ts');
              const result = await mod.sendContactEmail(payload, env.RESEND_API_KEY);

              res.statusCode = result.status;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify(result.body));
            });
          });
        },
      },
    ],
  };
});
