interface Props {
  label: string;
}

export default function SectionLabel({ label }: Props) {
  return (
    <p className="font-mono text-sm text-emerald-400 mb-8">
      {"// "}
      {label}
    </p>
  );
}
