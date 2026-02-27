import { Resend } from "resend";
import { env } from "@/lib/env";
import { createAdminClient } from "@/lib/supabase/admin";
import type { Database } from "@/types/supabase";

export type EmailTemplate = "welcome" | "password_reset" | "payment_confirmation";

type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
  from?: string;
  userId?: string | null;
  template?: EmailTemplate;
  maxAttempts?: number;
};

type SendEmailResult =
  | {
      success: true;
      id: string;
    }
  | {
      success: false;
      error: string;
    };

const resend = env.RESEND_API_KEY ? new Resend(env.RESEND_API_KEY) : null;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function logEmailEvent({
  userId,
  template,
  recipient,
  subject,
  status,
  attempts,
  providerMessageId,
  errorMessage,
}: {
  userId: string | null;
  template: EmailTemplate;
  recipient: string;
  subject: string;
  status: Database["public"]["Enums"]["email_status"];
  attempts: number;
  providerMessageId?: string;
  errorMessage?: string;
}) {
  try {
    const admin = createAdminClient();
    await admin.from("email_logs").insert({
      user_id: userId,
      template,
      recipient,
      subject,
      status,
      attempts,
      provider_message_id: providerMessageId ?? null,
      error_message: errorMessage ?? null,
    });
  } catch {
    // Logging must never crash auth/payment flows.
  }
}

export async function sendEmail({
  to,
  subject,
  html,
  from = env.RESEND_FROM_EMAIL ?? "AinzStack <noreply@ainzstack.com>",
  userId = null,
  template = "welcome",
  maxAttempts = 3,
}: SendEmailOptions): Promise<SendEmailResult> {
  if (!resend) {
    const error = "Resend is not configured.";
    await logEmailEvent({
      userId,
      template,
      recipient: to,
      subject,
      status: "failed",
      attempts: 1,
      errorMessage: error,
    });
    return { success: false, error };
  }

  let attempts = 0;
  let lastError = "Failed to send email.";

  while (attempts < maxAttempts) {
    attempts += 1;

    try {
      const { data, error } = await resend.emails.send({
        from,
        to,
        subject,
        html,
      });

      if (error) {
        lastError = error.message;
      } else {
        const id = data?.id ?? crypto.randomUUID();
        await logEmailEvent({
          userId,
          template,
          recipient: to,
          subject,
          status: "sent",
          attempts,
          providerMessageId: id,
        });

        return { success: true, id };
      }
    } catch (error) {
      lastError =
        error instanceof Error ? error.message : "Unexpected email provider error.";
    }

    if (attempts < maxAttempts) {
      await sleep(300 * attempts);
    }
  }

  await logEmailEvent({
    userId,
    template,
    recipient: to,
    subject,
    status: "failed",
    attempts,
    errorMessage: lastError,
  });

  return { success: false, error: lastError };
}

export const emailTemplates = {
  welcome: ({ name }: { name: string }) => `
    <div style="font-family: 'Helvetica Neue', Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px;">
      <h1 style="font-size: 20px; font-weight: 600; margin: 0 0 16px;">Welcome to AinzStack!</h1>
      <p style="font-size: 14px; color: #666; line-height: 1.6; margin: 0 0 24px;">
        Hey ${name}, thanks for signing up. You're all set to start building your SaaS.
      </p>
      <a href="${env.NEXT_PUBLIC_APP_URL}/dashboard"
         style="display: inline-block; background: #000; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">
        Go to Dashboard
      </a>
      <p style="font-size: 12px; color: #999; margin-top: 32px;">
        The AinzStack Team
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
        If you did not request this, ignore this email.
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
      <h1 style="font-size: 20px; font-weight: 600; margin: 0 0 16px;">Payment confirmed</h1>
      <p style="font-size: 14px; color: #666; line-height: 1.6; margin: 0 0 24px;">
        Your payment of <strong>${amount}</strong> for the <strong>${planName}</strong> plan has been processed.
      </p>
      <a href="${env.NEXT_PUBLIC_APP_URL}/dashboard/billing"
         style="display: inline-block; background: #000; color: #fff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 14px; font-weight: 500;">
        View Billing
      </a>
      <p style="font-size: 12px; color: #999; margin-top: 32px;">
        The AinzStack Team
      </p>
    </div>
  `,
};
