/**
 * Email Helper — Transactional Emails
 *
 * Prerequisites:
 * 1. Install: `pnpm add resend`
 * 2. Set RESEND_API_KEY in `.env.local`
 *
 * Usage:
 * ```ts
 * import { sendEmail, emailTemplates } from "@/lib/email";
 * await sendEmail({
 *   to: "user@example.com",
 *   subject: "Welcome to AinzStack!",
 *   html: emailTemplates.welcome({ name: "Jane" }),
 * });
 * ```
 */

// import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);

type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
  from?: string;
};

export async function sendEmail({
  to,
  subject,
  html,
  from = "AinzStack <noreply@ainzstack.com>",
}: SendEmailOptions) {
  // TODO: Uncomment when Resend is configured
  // try {
  //   const { data, error } = await resend.emails.send({
  //     from,
  //     to,
  //     subject,
  //     html,
  //   });
  //
  //   if (error) {
  //     console.error("[Email] Send failed:", error);
  //     return { success: false, error: error.message };
  //   }
  //
  //   return { success: true, id: data?.id };
  // } catch (err) {
  //   console.error("[Email] Unexpected error:", err);
  //   return { success: false, error: "Failed to send email" };
  // }

  console.log(`[Email] Would send "${subject}" to ${to}`);
  return { success: true, id: "placeholder" };
}

/**
 * Email Templates
 *
 * Minimal inline HTML templates for transactional emails.
 * Replace with React Email or MJML for production use.
 */
export const emailTemplates = {
  welcome: ({ name }: { name: string }) => `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px;">
      <h1 style="font-size: 20px; font-weight: 600; margin: 0 0 16px;">Welcome to AinzStack!</h1>
      <p style="font-size: 14px; color: #666; line-height: 1.6; margin: 0 0 24px;">
        Hey ${name}, thanks for signing up. You're all set to start building your SaaS.
      </p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
         style="display: inline-block; background: #000; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">
        Go to Dashboard
      </a>
      <p style="font-size: 12px; color: #999; margin-top: 32px;">
        — The AinzStack Team
      </p>
    </div>
  `,

  passwordReset: ({ resetUrl }: { resetUrl: string }) => `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px;">
      <h1 style="font-size: 20px; font-weight: 600; margin: 0 0 16px;">Reset your password</h1>
      <p style="font-size: 14px; color: #666; line-height: 1.6; margin: 0 0 24px;">
        Click the button below to reset your password. This link expires in 1 hour.
      </p>
      <a href="${resetUrl}"
         style="display: inline-block; background: #000; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">
        Reset Password
      </a>
      <p style="font-size: 12px; color: #999; margin-top: 32px;">
        If you didn't request this, ignore this email.
      </p>
    </div>
  `,

  paymentConfirmation: ({
    planName,
    amount,
  }: {
    planName: string;
    amount: string;
  }) => `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px;">
      <h1 style="font-size: 20px; font-weight: 600; margin: 0 0 16px;">Payment confirmed ✓</h1>
      <p style="font-size: 14px; color: #666; line-height: 1.6; margin: 0 0 24px;">
        Your payment of <strong>${amount}</strong> for the <strong>${planName}</strong> plan has been processed.
      </p>
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing"
         style="display: inline-block; background: #000; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">
        View Receipt
      </a>
      <p style="font-size: 12px; color: #999; margin-top: 32px;">
        — The AinzStack Team
      </p>
    </div>
  `,
};
