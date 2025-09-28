"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Mail, ArrowLeft, Clock } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

export default function RegistrationSuccessContent() {
  const { t } = useTranslation();

  return (
    <div className="bg-muted/50 flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-green-700 dark:text-green-400">
              {t("auth.signup.success.title")}
            </CardTitle>
            <CardDescription className="text-base">
              {t("auth.signup.success.subtitle")}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Passo 1: Confirmação de Email */}
          <div className="flex items-start space-x-3 rounded-lg border bg-blue-50 p-4 dark:bg-blue-950/20">
            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              1
            </div>
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-sm font-medium text-blue-900 dark:text-blue-100">
                <Mail className="h-4 w-4" />
                {t("auth.signup.success.step1.title")}
              </p>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                {t("auth.signup.success.step1.message")}
              </p>
            </div>
          </div>

          {/* Passo 2: Aprovação do Cadastro */}
          <div className="flex items-start space-x-3 rounded-lg border bg-orange-50 p-4 dark:bg-orange-950/20">
            <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-orange-600 text-xs font-bold text-white">
              2
            </div>
            <div className="space-y-1">
              <p className="flex items-center gap-2 text-sm font-medium text-orange-900 dark:text-orange-100">
                <Clock className="h-4 w-4" />
                {t("auth.signup.success.step2.title")}
              </p>
              <p className="text-sm text-orange-700 dark:text-orange-300">
                {t("auth.signup.success.step2.message")}
              </p>
            </div>
          </div>

          {/* Informações importantes */}
          <div className="bg-muted rounded-lg p-4">
            <p className="text-muted-foreground text-center text-sm">
              {t("auth.signup.success.importantNote")}
            </p>
          </div>

          <div className="space-y-4 text-center">
            <p className="text-muted-foreground text-sm">
              {t("auth.signup.success.thankYou")}
            </p>

            <Button asChild className="w-full">
              <Link href="/sign-in">
                <ArrowLeft className="mr-2 h-4 w-4" />
                {t("auth.signup.success.backToLogin")}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
