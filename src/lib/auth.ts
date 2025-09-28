import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { organization } from "better-auth/plugins"

import prisma from "@/lib/prisma";


import { envs } from "@/core/config";
import { Resend } from "resend";

import TemplateVerifyEmail from "@/components/emails/TemplateVerifyEmail.tsx";
import TemplateForgotPasswordEmail from "@/components/emails/TemplateForgotPasswordEmail";

const resend = new Resend(envs.RESEND_API_KEY);

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
      try {
        //    console.log(`🔄 Enviando email de reset de senha para: ${user.email}`);

        await resend.emails.send({
          from: `${envs.EMAIL_SENDER_NAME} <${envs.EMAIL_SENDER_ADDRESS}>`,
          to: user.email,
          subject: "Reset your password",
          react: TemplateForgotPasswordEmail({
            userName: user.name || user.email,
            resetUrl: url,
            userEmail: user.email,
          }),
        });

        // console.log(`✅ Email de reset enviado com sucesso:`, result);
      } catch (error) {
        console.error(`❌ Erro ao enviar email de reset de senha:`, error);
        throw error;
      }
    },
    requireEmailVerification: true, // Ativar verificação de email
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      try {
        //  console.log(`🔄 Enviando email de verificação para: ${user.email}`);

        const result = await resend.emails.send({
          from: `${envs.EMAIL_SENDER_NAME} <${envs.EMAIL_SENDER_ADDRESS}>`,
          to: user.email,
          subject: "Verify your email",
          react: TemplateVerifyEmail({
            userName: user.name || user.email,
            verifyUrl: url,
          }),
        });

        console.log(`✅ Email de verificação enviado com sucesso:`, result);
      } catch (error) {
        console.error(`❌ Erro ao enviar email de verificação:`, error);
        throw error;
      }
    },
    sendOnSignUp: false, // Temporariamente desabilitado
  },

  plugins: [ organization(), nextCookies(),],
});
