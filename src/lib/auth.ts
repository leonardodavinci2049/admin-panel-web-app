import prisma from "@/lib/prisma";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { envs } from "@/core/config";
import { Resend } from "resend";
import TemplateVerifyEmail from "@/components/emails/TemplateVerifyEmail.tsx";
import TemplateForgotPasswordEmail from "@/components/emails/TemplateForgotPasswordEmail";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mysql",
  }),

  socialProviders: {
    google: {
      clientId: envs.GOOGLE_CLIENT_ID,
      clientSecret: envs.GOOGLE_CLIENT_SECRET,
    },
  },
    emailAndPassword: {
        enabled: true,
        sendResetPassword: async ({ user, url }) => {
            resend.emails.send({
                from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
                to: user.email,
                subject: "Reset your password",
                react: TemplateForgotPasswordEmail({ userName: user.name, resetUrl: url, userEmail: user.email }),
            });
        },
        requireEmailVerification: true
    },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      resend.emails.send({
        from: `${process.env.EMAIL_SENDER_NAME} <${process.env.EMAIL_SENDER_ADDRESS}>`,
        to: user.email,
        subject: "Verify your email",
        react: TemplateVerifyEmail({ userEmail: user.name, resetLink: url }),
      });
    },
    sendOnSignUp: true,
  },

  plugins: [nextCookies()],
});
