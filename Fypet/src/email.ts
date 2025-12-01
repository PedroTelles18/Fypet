/**
 * Email service for sending verification emails
 * This is a mock implementation. In production, integrate with SendGrid, Mailgun, or similar
 */

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // Mock implementation - in production, use a real email service
    console.log(`[EMAIL] Sending email to ${options.to}`);
    console.log(`[EMAIL] Subject: ${options.subject}`);
    console.log(`[EMAIL] HTML: ${options.html}`);
    
    // Simulate email sending
    return true;
  } catch (error) {
    console.error("[EMAIL] Failed to send email:", error);
    return false;
  }
}

export function generateVerificationEmailHTML(verificationUrl: string, userName: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #1a7a4a; color: white; padding: 20px; border-radius: 5px 5px 0 0; text-align: center; }
          .content { background-color: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
          .button { display: inline-block; background-color: #1a7a4a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .footer { font-size: 12px; color: #666; margin-top: 20px; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>FyPet - Verificação de Email</h1>
          </div>
          <div class="content">
            <p>Olá ${userName},</p>
            <p>Obrigado por se cadastrar no FyPet! Para ativar sua conta, clique no botão abaixo para verificar seu email:</p>
            <a href="${verificationUrl}" class="button">Verificar Email</a>
            <p>Ou copie e cole este link no seu navegador:</p>
            <p style="word-break: break-all; color: #666; font-size: 12px;">${verificationUrl}</p>
            <p>Este link expira em 24 horas.</p>
            <p>Se você não se cadastrou no FyPet, ignore este email.</p>
          </div>
          <div class="footer">
            <p>&copy; 2025 FyPet. Todos os direitos reservados.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function generateVerificationCode(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
