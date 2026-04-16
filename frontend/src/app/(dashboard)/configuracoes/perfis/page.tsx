import ProfileSelector from "@/features/auth/components/ProfileSelector";

export default function ConfigProfilesPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Perfis</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie quem tem acesso ao seu painel e os dados de cada um.
          </p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground mb-2">Perfil Atual</p>
          <ProfileSelector />
        </div>
      </div>

      <div className="grid gap-6 mt-6">
        <div className="border rounded-md p-6 bg-card">
          <h2 className="text-xl font-medium mb-4">Meus Perfis</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-md">
              <div>
                <span className="font-medium">Thomaz (Primário)</span>
                <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                  PRINCIPAL
                </span>
              </div>
              <div className="text-sm text-muted-foreground">Não pode ser inativado</div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-md">
              <div>
                <span className="font-medium">Wife</span>
                <span className="ml-2 text-xs bg-secondary/20 text-secondary-foreground px-2 py-1 rounded">
                  SECUNDÁRIO
                </span>
              </div>
              <div className="flex gap-2">
                <button className="text-sm text-blue-500 hover:underline">Editar</button>
                <button className="text-sm text-red-500 hover:underline">Inativar</button>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t">
            <button className="text-sm bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition">
              + Adicionar Novo Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
