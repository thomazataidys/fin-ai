export default function SetupPage() {
  return (
    <div className="flex h-screen items-center justify-center p-4 text-center">
      <div className="max-w-lg">
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao FinanceFlow!</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Vimos que seu cadastro acabou de ser concluído. Para começar a gerenciar
          suas finanças, vamos realizar a configuração inicial de suas receitas.
        </p>
        <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 rounded-lg text-lg font-medium shadow">
          Iniciar Configuração
        </button>
      </div>
    </div>
  );
}
