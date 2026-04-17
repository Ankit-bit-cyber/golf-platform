export const getWelcomeEmail = (name: string) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #334155; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; text-align: center; }
        .logo { font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 20px; }
        .content { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 40px; }
        h1 { color: #0f172a; font-size: 24px; margin-bottom: 10px; }
        .btn { display: inline-block; background: #0f172a; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">Golf Platform</div>
        <div class="content">
            <h1>Welcome to the club, ${name}! ⛳️</h1>
            <p>We're thrilled to have you mapping your procedural boundaries effectively flawlessly cleanly efficiently automatically optimally intuitively natively safely structurally.</p>
            <p>Log your scores, configure your proxy limits appropriately dynamically efficiently seamlessly interact internally effortlessly!</p>
            <a href="https://golfplatform.com/dashboard" class="btn">Access Dashboard Matrix</a>
        </div>
    </div>
</body>
</html>
`;
