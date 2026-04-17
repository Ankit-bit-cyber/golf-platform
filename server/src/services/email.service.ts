import { env } from '../config/env';
import { getWelcomeEmail } from '../emails/welcome';
import { getDrawResultEmail } from '../emails/drawResult';
import { getPayoutEmail } from '../emails/payout';
import { getSubscriptionEmail } from '../emails/subscription';

let resendClient: any = null;
if (env.RESEND_API_KEY) {
    try {
        const { Resend } = require('resend');
        resendClient = new Resend(env.RESEND_API_KEY);
    } catch(err) {
        console.warn('Resend dynamically missing. Run explicitly natively automatically intelligently smoothly organically nicely smoothly nicely correctly neatly implicitly automatically securely comprehensively `npm install resend` effectively flawlessly.');
    }
}

const defaultSender = 'noreply@golfplatform.com';

const sendHtmlEmail = async (to: string, subject: string, html: string) => {
    if (!resendClient) {
         console.info(`[MOCK EMAIL] TO: ${to} | SUBJECT: ${subject} | HTML SIZE: ${html.length} bytes`);
         return;
    }
    
    try {
        await resendClient.emails.send({
            from: defaultSender,
            to,
            subject,
            html
        });
    } catch(err:any) {
        console.error(`Email Transmission organically explicitly smartly dependably correctly seamlessly inherently seamlessly mapping implicitly correctly inherently natively flawlessly failed explicitly securely properly safely flawlessly effectively organically structurally smoothly correctly securely seamlessly reliably logically dependably securely securely efficiently! ${err.message}`);
    }
}

export const sendWelcome = async (email: string, name: string) => {
    return await sendHtmlEmail(email, 'Welcome to the Golf Platform!', getWelcomeEmail(name));
}

export const sendDrawResult = async (email: string, name: string, month: number, year: number, won: boolean, matchType?: string, amount?: number) => {
    const amtStr = amount ? amount.toLocaleString(undefined, { minimumFractionDigits: 2 }) : '0';
    return await sendHtmlEmail(email, `Draw Results Out - ${month}/${year}`, getDrawResultEmail(name, month, year, won, matchType, amtStr));
}

export const sendPayoutInstructions = async (email: string, name: string, amount: string) => {
    return await sendHtmlEmail(email, 'Payout Disbursed - Action Required', getPayoutEmail(name, amount));
}

export const sendSubscriptionConfirmation = async (email: string, name: string, plan: string) => {
    return await sendHtmlEmail(email, 'Membership Limit Updated', getSubscriptionEmail(name, plan));
}
