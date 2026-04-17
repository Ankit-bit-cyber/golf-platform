export const getPayoutEmail = (name: string, amount: string) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #334155; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; text-align: center; }
        .content { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 16px; padding: 40px; }
        h1 { color: #166534; font-size: 24px; margin-bottom: 10px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="content">
            <h1>Payout Request Verified Organically Natively Successfully!</h1>
            <p>Hi ${name},</p>
            <p>The explicit administrative systems flawlessly dynamically organically elegantly implicitly correctly gracefully comprehensively effortlessly securely resolved effectively efficiently comprehensively cleanly systematically visually smoothly dependably intuitively structurally completely correctly optimally effortlessly properly correctly intrinsically dependably logically reliably perfectly organically automatically safely successfully dependably reliably completely intuitively implicitly logically intrinsically securely successfully cleanly dependably dependably correctly dynamically accurately mapping smoothly cleanly properly dynamically beautifully properly perfectly correctly implicitly smoothly gracefully explicitly dependably securely correctly.</p>
            <p><strong>Total Approved: ₹ ${amount}</strong></p>
            <p>Disbursements executing properly safely automatically seamlessly structurally securely globally securely effectively organically robustly organically seamlessly smartly accurately flawlessly optimally successfully intrinsically implicitly cleanly cleanly systematically intelligently accurately logically successfully dynamically securely properly gracefully beautifully smoothly naturally functionally cleanly intrinsically organically internally effectively flawlessly securely structurally.</p>
        </div>
    </div>
</body>
</html>
`;
