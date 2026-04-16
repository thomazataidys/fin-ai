import ProfileSelector from "@/features/auth/components/ProfileSelector";

export default function DashboardPage() {
  return (
    <div className="p-8 pb-32">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <ProfileSelector />
        </div>
      </header>

      <main className="grid gap-6">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-card border rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Saldo Atual</h3>
            <p className="text-3xl font-bold">R$ 5.240,00</p>
          </div>
          <div className="p-6 bg-card border rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Receitas do Mês</h3>
            <p className="text-3xl font-bold text-green-600">R$ 8.500,00</p>
          </div>
          <div className="p-6 bg-card border rounded-lg shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Despesas do Mês</h3>
            <p className="text-3xl font-bold text-red-500">R$ 3.260,00</p>
          </div>
        </div>
      </main>
    </div>
  );
}
