interface Props {
  label: string;
}

export default function SectionLabel({ label }: Props) {
  return (
    <p className="font-mono text-xs text-emerald-400 mb-8">
      {"// "}
      {label}
    </p>
  );
}
