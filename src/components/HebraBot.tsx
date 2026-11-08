/*
 * Robot de la landing de Hebra (apps/web/components/landing/pixel.tsx),
 * en índigo como el de claude-code. SVG pixel a pixel, sin imágenes.
 */
const ROBOT = [
  "......aa......",
  "......mm......",
  "..oooooooooo..",
  ".olllllllllso.",
  ".olvvvvvvvvso.",
  ".olveevveevso.",
  ".olveevveevso.",
  ".olvvvvvvvvso.",
  ".obbbbbbbbbso.",
  "..oooooooooo..",
  "...obbbbbbo...",
  "mmolbbppbbsomm",
  "m.olbbbbbbso.m",
  "M..osssssso..M",
  "...oooooooo...",
  "....oo..oo....",
  "...Moo..ooM...",
];

const COLORS: Record<string, string> = {
  o: "#2E3A9E",
  l: "#7C86EA",
  b: "#5B67DB",
  s: "#4351C9",
  v: "#15161C",
  e: "#E9FFF8",
  a: "#F7C870",
  m: "#6E717B",
  M: "#B8BAC2",
  p: "#EF7CA2",
};

const CLASSES: Record<string, string> = { e: "hebra-eye", a: "hebra-ant" };

export default function HebraBot({ px = 2, className = "" }: { px?: number; className?: string }) {
  const width = ROBOT[0].length;
  return (
    <svg
      viewBox={`0 0 ${width} ${ROBOT.length}`}
      width={width * px}
      height={ROBOT.length * px}
      shapeRendering="crispEdges"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      {ROBOT.flatMap((row, y) =>
        [...row].map((ch, x) =>
          COLORS[ch] ? (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={1}
              height={1}
              fill={COLORS[ch]}
              className={CLASSES[ch]}
            />
          ) : null,
        ),
      )}
    </svg>
  );
}
