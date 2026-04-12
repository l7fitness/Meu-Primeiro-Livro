import express from 'express';
import { Resend } from 'resend';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());

// Serve arquivos estáticos do build do Vite
app.use(express.static(path.join(__dirname, 'dist')));

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev';
const PDF_URL = 'https://res.cloudinary.com/dfvyj8vy5/image/upload/v1774622038/THE-MELTED-CROSS_-_FEITO_NO_GAMMA_erkygy.pdf';

app.post('/api/send-email', async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: 'Email é obrigatório' });
  }

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: '🔓 Acesso Concedido — Seu Dossiê Confidencial',
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <title>The Melted Cross — Dossiê Confidencial</title>
        </head>
        <body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Georgia',serif;color:#e0e0e0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#121212;border:1px solid #2a2a2a;">
                  
                  <!-- Header Golden Bar -->
                  <tr>
                    <td style="height:4px;background:linear-gradient(90deg,#d4af37,#b8960c,#d4af37);"></td>
                  </tr>

                  <!-- Header -->
                  <tr>
                    <td align="center" style="padding:40px 40px 20px;">
                      <p style="margin:0 0 8px;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#d4af37;">Arquivo Confidencial</p>
                      <h1 style="margin:0;font-size:32px;font-weight:900;letter-spacing:6px;text-transform:uppercase;color:#ffffff;">THE MELTED CROSS</h1>
                      <p style="margin:8px 0 0;font-size:13px;color:#666;letter-spacing:2px;text-transform:uppercase;">Manchester, Inverno de 1919</p>
                    </td>
                  </tr>

                  <!-- Divider -->
                  <tr>
                    <td style="padding:0 40px;">
                      <div style="height:1px;background:linear-gradient(90deg,transparent,#d4af37,transparent);"></div>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:40px;">
                      <p style="margin:0 0 20px;font-size:15px;line-height:1.8;color:#aaa;">
                        Seu acesso foi <strong style="color:#d4af37;">concedido</strong>. Os arquivos que pediu estão prontos para download.
                      </p>
                      <p style="margin:0 0 32px;font-size:15px;line-height:1.8;color:#aaa;">
                        Abaixo você encontra o <strong style="color:#fff;">Dossiê Visual</strong> — o primeiro olhar dentro do universo sombrio de Manchester e do Exército Fantasma de Alec Ashford.
                      </p>

                      <!-- CTA Button -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding:20px 0;">
                            <a href="${PDF_URL}" target="_blank"
                              style="display:inline-block;background-color:#d4af37;color:#000000;text-decoration:none;font-size:11px;font-weight:900;letter-spacing:4px;text-transform:uppercase;padding:18px 40px;">
                              ↓ Baixar Dossiê Visual (PDF)
                            </a>
                          </td>
                        </tr>
                      </table>

                      <!-- Quote -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                        <tr>
                          <td style="border-left:3px solid #d4af37;padding:16px 20px;background-color:#0a0a0a;">
                            <p style="margin:0;font-style:italic;font-size:14px;line-height:1.8;color:#888;">
                              "Onde o carvão mancha a alma e o destino é escrito em ouro e sangue."
                            </p>
                          </td>
                        </tr>
                      </table>

                      <!-- Coupon -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:40px;border:1px dashed #333;">
                        <tr>
                          <td align="center" style="padding:24px 24px 16px;">
                            <p style="margin:0 0 8px;font-size:10px;letter-spacing:4px;text-transform:uppercase;color:#666;">Seu Cupom Exclusivo — 20% OFF no Livro Digital</p>
                            <p style="margin:0 0 4px;font-size:28px;font-weight:900;letter-spacing:8px;color:#ffffff;font-family:monospace;">FANTASMA20</p>
                            <p style="margin:0 0 20px;font-size:12px;color:#666;">De R$ 29,90 por apenas <strong style="color:#d4af37;">R$&nbsp;23,92</strong></p>

                            <!-- Botão Digital -->
                            <a href="https://loja.infinitepay.io/l7fitness/dwn6535-livro---the-melted-cross"
                              target="_blank"
                              style="display:block;background-color:#d4af37;color:#000000;text-decoration:none;font-size:10px;font-weight:900;letter-spacing:3px;text-transform:uppercase;padding:14px 24px;margin-bottom:10px;">
                              📖 Comprar Livro Digital — R$ 23,92
                            </a>

                            <!-- Botão Físico -->
                            <a href="https://loja.infinitepay.io/l7fitness/pny7214-livro---the-melted-cross"
                              target="_blank"
                              style="display:block;background-color:transparent;color:#aaaaaa;text-decoration:none;font-size:10px;font-weight:700;letter-spacing:3px;text-transform:uppercase;padding:14px 24px;border:1px solid #333;">
                              📦 Comprar Edição Física — R$ 29,90
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- Bottom Divider -->
                  <tr>
                    <td style="padding:0 40px;">
                      <div style="height:1px;background:linear-gradient(90deg,transparent,#2a2a2a,transparent);"></div>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td align="center" style="padding:24px 40px 40px;">
                      <p style="margin:0;font-size:11px;color:#444;letter-spacing:2px;text-transform:uppercase;">
                        © 2026 The Melted Cross. Todos os direitos reservados.
                      </p>
                    </td>
                  </tr>

                  <!-- Bottom Golden Bar -->
                  <tr>
                    <td style="height:4px;background:linear-gradient(90deg,#d4af37,#b8960c,#d4af37);"></td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    if (error) throw error;

    res.json({ success: true });
  } catch (err) {
    console.error('Resend error:', err);
    res.status(500).json({ error: 'Falha ao enviar email' });
  }
});

// Fallback: todas as rotas não-API retornam o index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || process.env.API_PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
