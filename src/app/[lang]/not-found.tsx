export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center px-4 py-16 sm:px-6">
      <p className="font-mono text-sm text-emerald-400 mb-4">$ error 404</p>
      <h1 className="mb-3 text-3xl font-bold tracking-tight">Página no encontrada</h1>
      <p className="mb-8 text-base text-muted-foreground">
        Esta ruta no existe. Puede que la URL esté mal o la página haya sido eliminada.
      </p>
      <a
        href="/"
        className="inline-flex w-fit rounded-md border border-border px-4 py-2 font-mono text-sm text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        ← volver al inicio
      </a>
    </main>
  );
}
