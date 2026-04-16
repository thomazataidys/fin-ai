export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4">
        <p className="text-sm font-medium">Fin AI — área logada (placeholder)</p>
      </header>
      <div className="p-6">{children}</div>
    </div>
  );
}
