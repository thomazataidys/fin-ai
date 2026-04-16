import LoginForm from "@/features/auth/components/LoginForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex h-screen w-full items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Acessar FinanceFlow</CardTitle>
          <CardDescription>
            Entre com suas credenciais para gerenciar suas finanças
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
          <div className="mt-4 text-center text-sm">
            Não tem uma conta?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Crie uma agora
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
