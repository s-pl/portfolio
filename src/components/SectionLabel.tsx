interface Props {
  label: string;
}

export default function SectionLabel({ label }: Props) {
  return (
    <p className="mb-6 font-mono text-sm text-emerald-400 sm:mb-8">
      {"// "}
      {label}
    </p>
  );
}
