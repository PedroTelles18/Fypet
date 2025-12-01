import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";

export default function VerifyEmail() {
  const [, setLocation] = useLocation();
  const search = useSearch();
  const [isVerifying, setIsVerifying] = useState(true);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationError, setVerificationError] = useState<string | null>(null);

  const verifyEmailMutation = trpc.auth.verifyEmail.useMutation({
    onSuccess: () => {
      setVerificationSuccess(true);
      toast.success("Email verificado com sucesso! Voce ja pode fazer login.");
      setTimeout(() => {
        setLocation("/login");
      }, 3000);
    },
    onError: (error: any) => {
      setVerificationError(error.message || "Erro ao verificar email. O link pode ter expirado.");
      toast.error("Erro ao verificar email");
    },
  });

  useEffect(() => {
    const params = new URLSearchParams(search);
    const token = params.get("token");

    if (!token) {
      setVerificationError("Token de verificação não encontrado.");
      setIsVerifying(false);
      return;
    }

    // Verify email with token
    verifyEmailMutation.mutate({ token });
  }, [search]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 container py-12 flex items-center justify-center">
        <Card className="w-full max-w-md p-8 text-center">
          {isVerifying && !verificationSuccess && !verificationError && (
            <>
              <Loader2 className="w-16 h-16 mx-auto mb-4 text-primary animate-spin" />
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Verificando Email
              </h1>
              <p className="text-muted-foreground">
                Aguarde enquanto verificamos seu email...
              </p>
            </>
          )}

          {verificationSuccess && (
            <>
              <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Email Verificado!
              </h1>
              <p className="text-muted-foreground mb-6">
                Sua conta foi ativada com sucesso. Você será redirecionado para a página de login em alguns segundos.
              </p>
              <Button
                onClick={() => setLocation("/login")}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Ir para Login
              </Button>
            </>
          )}

          {verificationError && (
            <>
              <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-600" />
              <h1 className="text-2xl font-bold text-foreground mb-2">
                Erro na Verificação
              </h1>
              <p className="text-muted-foreground mb-6">
                {verificationError}
              </p>
              <div className="space-y-3">
                <Button
                  onClick={() => setLocation("/register")}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Fazer Novo Cadastro
                </Button>
                <Button
                  onClick={() => setLocation("/")}
                  variant="outline"
                  className="w-full"
                >
                  Voltar para Home
                </Button>
              </div>
            </>
          )}
        </Card>
      </main>

      <Footer />
    </div>
  );
}
