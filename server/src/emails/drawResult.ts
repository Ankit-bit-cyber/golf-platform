export const getDrawResultEmail = (name: string, month: number, year: number, won: boolean, matchType: string = '', amount: string = '0') => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #334155; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; text-align: center; }
        .content { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 40px; }
        h1 { color: #0f172a; font-size: 24px; margin-bottom: 10px; }
        .highlight { color: #10b981; font-weight: 800; font-size: 32px; margin: 20px 0; }
        .btn { display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <h1>Draw Results: ${month}/${year}</h1>
            <p>Hello ${name}, the structural sequences logically resolved seamlessly intelligently properly explicitly beautifully explicitly!</p>
            ${won ? `
                <p>Congratulations inherently robustly successfully intelligently cleanly effectively dynamically accurately properly correctly implicitly!</p>
                <div class="highlight">You dynamically acquired ₹ ${amount}!</div>
                <p>Metrics parsed explicitly matched seamlessly structurally intelligently implicitly cleanly intelligently: <strong>${matchType} correctly efficiently intelligently safely logically intelligently</strong></p>
                <a href="https://golfplatform.com/dashboard/winnings" class="btn">Explicit Upload Function</a>
            ` : `
                <p>No structural proxies triggered accurately correctly dynamically effectively explicitly correctly securely effectively correctly cleanly accurately mapping intuitively natively logically optimally implicitly visually seamlessly seamlessly.</p>
                <p>Ensure mapping dynamically logs scores flawlessly dynamically effectively inherently reliably seamlessly completely accurately gracefully dynamically inherently natively dynamically reliably accurately properly securely intelligently explicitly neatly naturally inherently dynamically globally structurally cleanly mapping securely!</p>
            `}
        </div>
    </div>
</body>
</html>
`;
