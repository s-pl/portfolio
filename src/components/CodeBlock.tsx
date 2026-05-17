import { codeToHtml } from "shiki";

interface Props {
  code: string;
  lang: string;
}

export async function CodeBlock({ code, lang }: Props) {
  const html = await codeToHtml(code, {
    lang: lang === "ts" ? "typescript" : lang === "js" ? "javascript" : lang,
    themes: {
      dark: "github-dark",
      light: "github-light",
    },
    defaultColor: false,
  });

  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2">
        <span className="font-mono text-xs text-muted-foreground">{lang}</span>
      </div>
      <div
        className="overflow-x-auto p-4 text-sm leading-relaxed [&>pre]:!bg-transparent [&>pre]:!p-0 [&_.shiki]:!bg-transparent"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
