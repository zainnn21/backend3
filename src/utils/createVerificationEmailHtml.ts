export const createVerificationEmailHtml = (verificationLink: string) => {
  return `
    <!DOCTYPE html>
    <html lang="id">
    <head>
      <meta charset="UTF-M">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          margin: 0;
          padding: 0;
        }
        .container {
          width: 90%;
          max-width: 600px;
          margin: 20px auto;
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
        }
        .header {
          background-color: #007bff;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 30px;
        }
        .content p {
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          padding: 12px 25px;
          font-size: 16px;
          font-weight: bold;
          color: white;
          background-color: #007bff;
          text-decoration: none;
          border-radius: 5px;
        }
        .footer {
          background-color: #f9f9f9;
          color: #777;
          padding: 20px;
          text-align: center;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Verifikasi Akun Anda</h1>
        </div>
        <div class="content">
          <p>Halo,</p>
          <p>Terima kasih telah mendaftar. Silakan klik tombol di bawah untuk memverifikasi alamat email Anda:</p>
          
          <a href="${verificationLink}" class="button">Verifikasi Email Saya</a>
          
          <p style="margin-top: 20px;">
            Jika tombol di atas tidak berfungsi, salin dan tempel URL berikut di browser Anda:
          </p>
          <p style="word-break: break-all;">${verificationLink}</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} EduCourse. Semua hak cipta dilindungi.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
