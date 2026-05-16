"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col justify-center px-4 py-16 sm:px-6">
      <p className="font-mono text-sm text-rose-400 mb-4">$ error</p>
      <h1 className="mb-3 text-3xl font-bold tracking-tight">Algo ha fallado</h1>
      <p className="mb-8 text-base text-muted-foreground">
        Ha ocurrido un error inesperado. Puedes intentar de nuevo o volver al inicio.
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="inline-flex w-fit rounded-md bg-foreground px-4 py-2 font-mono text-sm text-background transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          reintentar
        </button>
        <a
          href="/"
          className="inline-flex w-fit rounded-md border border-border px-4 py-2 font-mono text-sm text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          ← inicio
        </a>
      </div>
    </main>
  );
}
