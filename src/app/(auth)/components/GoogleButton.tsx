"use client";

import { useTranslation } from "@/contexts/i18n-context";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { GoogleIcon } from "./GoogleIcon";
import { toast } from "sonner";
import { authClient } from "@/lib/auth/auth-client";

// Componente do botão do Google com estado de loading
const GoogleButton = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);

      // Usar authClient diretamente no lado cliente conforme documentação
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard", // Redirect após login bem-sucedido
      });

      toast.success("Redirecionando para Google...");
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Erro ao conectar com Google. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full"
      onClick={handleGoogleLogin}
      disabled={isLoading}
    >
      <GoogleIcon width="0.98em" height="1em" />
      {isLoading ? t("auth.common.loading") : t("auth.login.loginWithGoogle")}
    </Button>
  );
};

export default GoogleButton;
