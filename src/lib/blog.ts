import type { Lang } from "./i18n";

export type Section =
  | { t: "h2"; es: string; en: string }
  | { t: "p"; es: string; en: string }
  | { t: "code"; lang: string; es: string; en: string }
  | { t: "ul"; es: string[]; en: string[] }
  | { t: "diagram"; es: string; en: string; def: string };

export interface BlogPost {
  slug: string;
  date: string;
  readingTime: number;
  tags: string[];
  cover: string;
  title: { es: string; en: string };
  excerpt: { es: string; en: string };
  content: Section[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "zero-dep-packages",
    date: "2026-05-15",
    readingTime: 5,
    tags: ["Node.js", "npm", "TypeScript"],
    cover: "/blog/cover-zero-dep.svg",
    title: {
      es: "Por qué mis paquetes npm tienen cero dependencias",
      en: "Why my npm packages have zero dependencies",
    },
    excerpt: {
      es: "Cuando publiqué lightq-node empecé a darme cuenta de algo: cada dependencia que añades no es tuya. Es de alguien que no conoces, que puede desaparecer mañana.",
      en: "When I published lightq-node I started realising something: every dependency you add isn't really yours. It belongs to someone you don't know, who might disappear tomorrow.",
    },
    content: [
      {
        t: "p",
        es: "Cuando publiqué lightq-node, una cola de jobs para Node.js, lo primero que me preguntaron fue: ¿por qué no usas bull o bee-queue? La respuesta corta es que no quería que mis usuarios instalaran Redis sin pedírselo. Pero mientras lo pensaba me di cuenta de algo más profundo: tengo verdadero miedo de los árboles de dependencias que no controlo.",
        en: "When I published lightq-node, a Node.js job queue, the first question I got was: why not use bull or bee-queue? The short answer is I didn't want my users installing Redis without asking them. But while thinking about it I realised something deeper: I'm genuinely scared of dependency trees I don't control.",
      },
      {
        t: "p",
        es: "No es paranoia. En 2018, event-stream, un paquete con millones de descargas semanales, fue comprometido porque su autor lo cedió a un desconocido. El nuevo mantenedor inyectó código malicioso que robaba wallets de criptomonedas. El paquete en sí era inofensivo — el problema era uno de sus deps. Eso es supply chain attack, y le puede pasar a cualquiera.",
        en: "It's not paranoia. In 2018, event-stream, a package with millions of weekly downloads, was compromised because its author handed it off to a stranger. The new maintainer injected malicious code that stole cryptocurrency wallets. The package itself was harmless — the problem was one of its dependencies. That's a supply chain attack, and it can happen to anyone.",
      },
      {
        t: "h2",
        es: "El coste que nadie calcula",
        en: "The cost nobody calculates",
      },
      {
        t: "p",
        es: "Imagina que publicas una librería con tres dependencias pequeñas. Cada una tiene las suyas. Antes de darte cuenta, tus usuarios tienen 40 paquetes en node_modules que no saben que existen. Cuando uno de esos 40 saca una versión rota, tú tienes una issue abierta aunque tu código no haya cambiado. Eso pasa constantemente.",
        en: "Imagine you publish a library with three small dependencies. Each one has its own. Before you know it, your users have 40 packages in node_modules they don't know exist. When one of those 40 ships a broken release, you get an open issue even though your code hasn't changed. This happens constantly.",
      },
      {
        t: "p",
        es: "El otro coste es más silencioso: el tiempo de auditoría. Si usas una dependencia con CVE, tienes que parchear aunque la vulnerabilidad no te afecte directamente. Si tienes cero dependencias, ese problema directamente no existe.",
        en: "The other cost is quieter: audit time. If you use a dependency with a CVE, you have to patch even if the vulnerability doesn't directly affect you. With zero dependencies, that problem simply doesn't exist.",
      },
      {
        t: "h2",
        es: "TypeScript compilado lo hace todo",
        en: "Compiled TypeScript does it all",
      },
      {
        t: "p",
        es: "La parte que más me sorprendió al escribir estos paquetes: casi todo lo que necesitaba ya estaba en Node.js core o era lo suficientemente simple como para implementarlo en un par de horas. El parser de cron de cron-scheduler-ts me llevó una tarde. Una cola con MinHeap y backoff exponencial, otra tarde. No hay magia detrás — son algoritmos básicos con buenos nombres.",
        en: "The part that surprised me most when writing these packages: almost everything I needed was already in Node.js core, or simple enough to implement in a couple of hours. The cron parser in cron-scheduler-ts took me an afternoon. A queue with MinHeap and exponential backoff, another afternoon. There's no magic — just basic algorithms with good names.",
      },
      {
        t: "code",
        lang: "json",
        es: `// Así queda el package.json de cron-scheduler-ts
// Sin nada en "dependencies" — solo herramientas de desarrollo
{
  "name": "cron-scheduler-ts",
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.8.3",
    "tsup": "^8.4.0",
    "vitest": "^3.1.1"
  }
}`,
        en: `// This is what cron-scheduler-ts's package.json looks like
// Nothing in "dependencies" — only development tools
{
  "name": "cron-scheduler-ts",
  "dependencies": {},
  "devDependencies": {
    "typescript": "^5.8.3",
    "tsup": "^8.4.0",
    "vitest": "^3.1.1"
  }
}`,
      },
      {
        t: "h2",
        es: "¿Cuándo sí merece la pena añadir una dep?",
        en: "When is it actually worth adding a dep?",
      },
      {
        t: "p",
        es: "Tampoco me vuelvo loco. Si necesito un driver de base de datos o un cliente HTTP con soporte de retry y circuit breaker bien testeado, lo uso. La pregunta que me hago es: ¿cuánto tiempo me llevaría hacer esto bien, versus el riesgo de tener esta dep para siempre? Si la respuesta es 'más de dos días', acepto la dependencia. Si es 'una tarde', la implemento yo.",
        en: "I'm not fanatical about it. If I need a database driver or an HTTP client with well-tested retry and circuit breaker support, I use one. The question I ask myself is: how long would it take me to build this properly, versus the risk of carrying this dep forever? If the answer is 'more than two days', I take the dependency. If it's 'an afternoon', I implement it myself.",
      },
      {
        t: "p",
        es: "El resultado práctico: paquetes que se instalan en menos de un segundo, que nunca van a romper por un cambio en una dep transitiva, y cuyo código completo puedes leer en media hora. Para mí eso vale la inversión.",
        en: "The practical result: packages that install in under a second, that will never break because of a change in a transitive dep, and whose complete source you can read in half an hour. To me that's worth the investment.",
      },
    ],
  },
  {
    slug: "drift-free-scheduling",
    date: "2026-05-10",
    readingTime: 6,
    tags: ["Node.js", "scheduling", "TypeScript"],
    cover: "/blog/cover-scheduler.svg",
    title: {
      es: "El bug silencioso de los schedulers: drift acumulado",
      en: "The silent scheduler bug: accumulated drift",
    },
    excerpt: {
      es: "Tenía un scheduler con setInterval que después de una semana en producción disparaba las tareas con varios minutos de retraso. Aquí está lo que aprendí.",
      en: "I had a scheduler using setInterval that after a week in production was firing tasks several minutes late. Here's what I learned.",
    },
    content: [
      {
        t: "p",
        es: "Cuando empecé a construir cron-scheduler-ts, mi primer instinto fue usar setInterval. Es lo más obvio — quieres que algo se ejecute cada X milisegundos, usas setInterval. El problema es que setInterval no hace eso exactamente, y la diferencia importa muchísimo en un scheduler.",
        en: "When I started building cron-scheduler-ts, my first instinct was to use setInterval. It's the obvious choice — you want something to run every X milliseconds, you use setInterval. The problem is that setInterval doesn't do exactly that, and the difference matters enormously in a scheduler.",
      },
      {
        t: "h2",
        es: "Qué hace setInterval realmente",
        en: "What setInterval actually does",
      },
      {
        t: "p",
        es: "setInterval garantiza que tu callback se llamará como mínimo N milisegundos después del disparo anterior. No garantiza exactamente N. Si el handler tarda 80ms en ejecutarse, el siguiente tick se retrasa 80ms. Si el event loop está ocupado cuando le toca, se retrasa más. Cada disparo acumula un pequeño error. Después de 1000 disparos, ese error puede ser minutos.",
        en: "setInterval guarantees your callback will be called at least N milliseconds after the previous fire. It doesn't guarantee exactly N. If the handler takes 80ms to run, the next tick is delayed 80ms. If the event loop is busy when it's due, it's delayed further. Each fire accumulates a small error. After 1000 fires, that error can be minutes.",
      },
      {
        t: "code",
        lang: "typescript",
        es: `// ❌ Acumula drift con cada ejecución
//    Si el handler tarda 50ms → el próximo tick llega 50ms tarde
//    Tras 24h con disparos cada minuto → ~72 segundos de desfase
setInterval(async () => {
  await hacerTrabajo(); // esto tarda tiempo variable
}, 60_000);`,
        en: `// ❌ Accumulates drift with every execution
//    If the handler takes 50ms → next tick arrives 50ms late
//    After 24h with per-minute fires → ~72 seconds of skew
setInterval(async () => {
  await doWork(); // this takes variable time
}, 60_000);`,
      },
      {
        t: "h2",
        es: "La solución: recomputar desde el reloj, no desde el disparo",
        en: "The fix: recompute from the clock, not from the last fire",
      },
      {
        t: "p",
        es: "La clave es que cada vez que un job se dispara, el scheduler no dice 'próximo disparo en X ms'. Dice 'próximo disparo en el momento calculado desde ahora'. Eso significa llamar a nextTick(expresión, new Date()) después de cada ejecución. Si el handler tardó 80ms, el delay del siguiente setTimeout ya lo tiene en cuenta — sigue apuntando al mismo segundo en la hora.",
        en: "The key is that every time a job fires, the scheduler doesn't say 'next fire in X ms'. It says 'next fire at the time calculated from now'. That means calling nextTick(expression, new Date()) after each execution. If the handler took 80ms, the next setTimeout's delay already accounts for it — it still points to the same second on the clock.",
      },
      {
        t: "code",
        lang: "typescript",
        es: `// ✅ Sin drift — el delay se calcula siempre desde new Date()
function programarJob(expr: string, handler: () => Promise<void>) {
  const siguiente = nextTick(expr, new Date()); // siguiente tick absoluto
  const delay = siguiente.getTime() - Date.now();

  setTimeout(async () => {
    await handler();
    programarJob(expr, handler); // recomputar desde el reloj actual
  }, delay);
}`,
        en: `// ✅ No drift — delay is always calculated from new Date()
function scheduleJob(expr: string, handler: () => Promise<void>) {
  const next = nextTick(expr, new Date()); // next absolute tick
  const delay = next.getTime() - Date.now();

  setTimeout(async () => {
    await handler();
    scheduleJob(expr, handler); // recompute from current clock
  }, delay);
}`,
      },
      {
        t: "diagram",
        es: "ciclo sin drift",
        en: "drift-free cycle",
        def: `flowchart LR
    A["setTimeout(delay)"] -->|timer dispara| B["handler()"]
    B --> C["nextTick(expr, new Date())"]
    C --> D["delay = next - Date.now()"]
    D --> A`,
      },
      {
        t: "h2",
        es: "¿Y si el proceso estaba caído?",
        en: "What if the process was down?",
      },
      {
        t: "p",
        es: "Esto me lo preguntaron el primer día que publiqué el paquete. Si el servidor se reinicia a las 3 de la mañana y había un job programado para las 2:30, ¿qué pasa? En cron-scheduler-ts, cuando el scheduler arranca lee el estado persistido de cada job. Si lastRun + intervalo es menor que ahora, sabe que ese job se perdió. Emite un evento missed y lo reprograma para el siguiente tick futuro. No lo reproduce — solo te avisa para que decidas qué hacer.",
        en: "This was the first question I got the day I published the package. If the server restarts at 3am and there was a job scheduled for 2:30, what happens? In cron-scheduler-ts, when the scheduler starts it reads the persisted state of each job. If lastRun + interval is less than now, it knows that job was missed. It emits a missed event and reschedules for the next future tick. It doesn't replay — it just tells you so you can decide what to do.",
      },
      {
        t: "code",
        lang: "typescript",
        es: `const scheduler = new Scheduler({
  storage: new FileSystemAdapter("./estado.json"),
});

// El scheduler te avisa — tú decides si compensar o ignorar
scheduler.on("missed", ({ id, name, scheduledFor }) => {
  console.warn(\`Job "\${name}" no se ejecutó a las \${scheduledFor.toISOString()}\`);
});

await scheduler.start();`,
        en: `const scheduler = new Scheduler({
  storage: new FileSystemAdapter("./state.json"),
});

// The scheduler tells you — you decide whether to compensate or ignore
scheduler.on("missed", ({ id, name, scheduledFor }) => {
  console.warn(\`Job "\${name}" didn't run at \${scheduledFor.toISOString()}\`);
});

await scheduler.start();`,
      },
    ],
  },
  {
    slug: "atomic-writes-nodejs",
    date: "2026-05-03",
    readingTime: 4,
    tags: ["Node.js", "filesystem"],
    cover: "/blog/cover-atomic.svg",
    title: {
      es: "Escribir ficheros sin romperlos: el truco de tmp + rename",
      en: "Writing files without breaking them: the tmp + rename trick",
    },
    excerpt: {
      es: "Un proceso que muere a mitad de un fs.writeFile deja un JSON corrupto. No es un caso raro — pasa en deploys, en reinicios, en cortes de luz. Hay una solución de dos líneas.",
      en: "A process that dies mid fs.writeFile leaves a corrupted JSON. It's not an edge case — it happens on deploys, restarts, power cuts. There's a two-line fix.",
    },
    content: [
      {
        t: "p",
        es: "Cuando construí FileSystemAdapter para cron-scheduler-ts, lo primero que hice fue un fs.writeFile directo. Funcionaba en local, pasaba los tests. Luego pensé: ¿qué pasa si el proceso muere justo cuando está escribiendo? Y me puse nervioso.",
        en: "When I built FileSystemAdapter for cron-scheduler-ts, the first thing I did was a plain fs.writeFile. It worked locally, tests passed. Then I thought: what happens if the process dies right in the middle of writing? And I got worried.",
      },
      {
        t: "p",
        es: "fs.writeFile abre el fichero, lo trunca a cero bytes, y luego escribe el contenido nuevo. Si el proceso muere entre el truncado y el write completo, el fichero tiene 0 bytes o un JSON a medias. En el siguiente arranque, JSON.parse lanza un error, el scheduler no puede cargar el estado, y pierdes todos los jobs persistidos. Para una tarea de backup de las 2 de la mañana que no se volvía a ejecutar hasta el día siguiente — eso es un problema real.",
        en: "fs.writeFile opens the file, truncates it to zero bytes, and then writes the new content. If the process dies between the truncation and the complete write, the file has 0 bytes or half a JSON. On the next startup, JSON.parse throws, the scheduler can't load state, and you lose all persisted jobs. For a 2am backup task that wouldn't run again until the next day — that's a real problem.",
      },
      {
        t: "h2",
        es: "El problema con la escritura directa",
        en: "The problem with direct writes",
      },
      {
        t: "code",
        lang: "typescript",
        es: `// ❌ No seguro — hay una ventana donde data.json queda corrupto
//    Si el proceso muere aquí ↓ el fichero tiene 0 bytes o JSON roto
await fs.writeFile("data.json", JSON.stringify(estado, null, 2));
// Si esto falla a mitad → data.json está corrupto para siempre`,
        en: `// ❌ Not safe — there's a window where data.json ends up corrupted
//    If the process dies here ↓ the file has 0 bytes or broken JSON
await fs.writeFile("data.json", JSON.stringify(state, null, 2));
// If this fails halfway → data.json is corrupted forever`,
      },
      {
        t: "h2",
        es: "Por qué rename() es diferente",
        en: "Why rename() is different",
      },
      {
        t: "p",
        es: "En sistemas POSIX — Linux, macOS — rename() es una operación atómica. El sistema operativo garantiza que, desde el punto de vista del sistema de ficheros, o el rename ocurre completamente o no ocurre. No hay estado intermedio. Esto significa que si escribes a un fichero temporal y luego haces rename a la ruta final, el lector siempre ve o el fichero antiguo completo o el nuevo completo. Nunca uno roto.",
        en: "On POSIX systems — Linux, macOS — rename() is an atomic operation. The operating system guarantees that, from the filesystem's perspective, either the rename happens completely or it doesn't happen at all. No intermediate state. This means if you write to a temp file and then rename it to the final path, the reader always sees either the complete old file or the complete new one. Never a broken one.",
      },
      {
        t: "code",
        lang: "typescript",
        es: `// ✅ Escritura atómica — data.json nunca queda corrupto
async function guardarEstado(ruta: string, estado: unknown) {
  const rutaTmp = ruta + ".tmp";

  // Escribimos en el temporal — si falla, data.json sigue intacto
  await fs.writeFile(rutaTmp, JSON.stringify(estado, null, 2), "utf8");

  // rename() es atómica: en este punto, data.json = nuevo estado completo
  await fs.rename(rutaTmp, ruta);
}`,
        en: `// ✅ Atomic write — data.json never ends up corrupted
async function saveState(path: string, state: unknown) {
  const tmpPath = path + ".tmp";

  // Write to the temp file — if it fails, data.json stays intact
  await fs.writeFile(tmpPath, JSON.stringify(state, null, 2), "utf8");

  // rename() is atomic: at this point, data.json = complete new state
  await fs.rename(tmpPath, path);
}`,
      },
      {
        t: "diagram",
        es: "escritura atómica",
        en: "atomic write",
        def: `flowchart LR
    A["writeFile(.tmp)"] --> B{"escritura ok?"}
    B -- no --> C["data.json intacto\n.tmp se descarta"]
    B -- si --> D["rename(.tmp → data.json)"]
    D --> E["data.json = estado nuevo\noperacion atomica"]`,
      },
      {
        t: "h2",
        es: "Cuándo lo necesitas de verdad",
        en: "When you actually need this",
      },
      {
        t: "p",
        es: "La respuesta honesta: no siempre. Para logs, usar append es suficientemente seguro y mucho más eficiente. Para ficheros que se leen una vez al arrancar y representan estado crítico — configuración, estado de jobs, metadatos de usuario — el patrón tmp + rename es imprescindible. En Windows también funciona desde Vista: la API MoveFileEx tiene el mismo comportamiento atómico.",
        en: "The honest answer: not always. For logs, append is safe enough and far more efficient. For files that are read once at startup and represent critical state — config, job state, user metadata — the tmp + rename pattern is essential. On Windows it also works since Vista: the MoveFileEx API has the same atomic behaviour.",
      },
      {
        t: "p",
        es: "Lo que sí puedo decir con seguridad: desde que lo implementé en FileSystemAdapter, no he tenido ni un solo reporte de fichero corrupto. Y eso que el paquete se reinicia constantemente durante los tests. Dos líneas extra, cero problemas.",
        en: "What I can say with confidence: since implementing it in FileSystemAdapter, I haven't had a single corrupted file report. And the package restarts constantly during tests. Two extra lines, zero problems.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getBlogPostContent(
  post: BlogPost,
  lang: Lang,
): {
  title: string;
  excerpt: string;
  sections: Array<
    | { t: "h2"; text: string }
    | { t: "p"; text: string }
    | { t: "code"; lang: string; code: string }
    | { t: "ul"; items: string[] }
    | { t: "diagram"; title: string; def: string }
  >;
} {
  return {
    title: post.title[lang],
    excerpt: post.excerpt[lang],
    sections: post.content.map((s) => {
      if (s.t === "code") return { t: "code", lang: s.lang, code: s[lang] };
      if (s.t === "diagram") return { t: "diagram", title: s[lang], def: s.def };
      if (s.t === "ul") return { t: "ul", items: s[lang] };
      return { t: s.t, text: s[lang] };
    }),
  };
}
