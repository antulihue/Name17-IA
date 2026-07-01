import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, MessageSquareWarning, PhoneCall, Mic2, Mail, ShieldAlert, Radio } from "lucide-react";
import { PageShell, SectionHeading } from "@/components/site-header";

export const Route = createFileRoute("/amenazas")({
  head: () => ({
    meta: [
      { title: "Amenazas — Name 17 IA" },
      { name: "description", content: "Feed en tiempo real de estafas: phishing, smishing, deepfakes de voz y consejos para detectarlas." },
      { property: "og:title", content: "Amenazas — Name 17 IA" },
      { property: "og:description", content: "Alertas activas de fraudes digitales y cómo protegerte." },
    ],
  }),
  component: AmenazasPage,
});

const feed = [
  { level: "high", icon: <Mail className="h-4 w-4" />, tag: "Phishing", time: "hace 2 min", title: "Falsos correos de 'AFIP / Impuestos' con adjuntos .zip", body: "Suplantación de organismos oficiales pidiendo abrir un archivo comprimido con supuesta deuda." },
  { level: "high", icon: <Mic2 className="h-4 w-4" />, tag: "Deepfake de voz", time: "hace 12 min", title: "Audios clonados de familiares pidiendo transferencias urgentes", body: "IA que reproduce la voz de un ser querido diciendo estar en una emergencia." },
  { level: "med", icon: <MessageSquareWarning className="h-4 w-4" />, tag: "Smishing", time: "hace 34 min", title: "SMS de 'entrega de paquete' con link acortado", body: "Enlaces bit.ly que redirigen a formularios de credenciales bancarias." },
  { level: "med", icon: <PhoneCall className="h-4 w-4" />, tag: "Vishing", time: "hace 1 h", title: "Llamadas de falso soporte técnico bancario", body: "Piden códigos SMS 'para verificar' y toman control de la app del banco." },
  { level: "low", icon: <Radio className="h-4 w-4" />, tag: "Redes sociales", time: "hace 3 h", title: "Sorteos falsos en Instagram usando marcas conocidas", body: "Cuentas con un carácter cambiado piden datos personales para 'reclamar el premio'." },
];

const tips = [
  "Verificá el remitente real del correo, no solo el nombre visible.",
  "Ningún banco pide códigos SMS por teléfono. Nunca.",
  "Ante audios urgentes de familiares, cortá y llamá por otro medio.",
  "Nunca abras adjuntos .exe, .scr o .zip inesperados.",
  "Los links acortados en SMS son bandera roja: no los abras.",
];

function levelStyles(level: string) {
  if (level === "high") return { color: "oklch(0.68 0.22 25)", label: "Crítica" };
  if (level === "med") return { color: "oklch(0.82 0.15 85)", label: "Media" };
  return { color: "oklch(0.75 0.15 155)", label: "Informativa" };
}

function AmenazasPage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Amenazas en curso"
        title={<>Feed de <span style={{ background: "var(--gradient-gold)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>alertas en tiempo real.</span></>}
        description="Estafas activas detectadas por nuestra red forense y por reportes verificados."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-3">
          {feed.map((a, i) => {
            const s = levelStyles(a.level);
            return (
              <article key={i} className="rounded-2xl border border-border bg-card/70 p-5 backdrop-blur transition-colors hover:border-[color:var(--gold)]/40">
                <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-widest">
                  <div className="flex items-center gap-2" style={{ color: s.color }}>
                    <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
                    {s.label} · {a.tag}
                  </div>
                  <span className="text-muted-foreground">{a.time}</span>
                </div>
                <h3 className="flex items-start gap-2 text-base font-semibold text-foreground">
                  <span className="mt-0.5 text-[color:var(--gold)]">{a.icon}</span>
                  {a.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{a.body}</p>
              </article>
            );
          })}
        </div>

        <aside className="h-fit rounded-2xl border border-border bg-card/70 p-6 backdrop-blur">
          <div className="mb-4 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <ShieldAlert className="h-3.5 w-3.5" style={{ color: "var(--gold)" }} />
            Consejos rápidos
          </div>
          <ul className="space-y-3 text-sm">
            {tips.map((t, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--gold)" }} />
                <span className="text-foreground/85">{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl border border-[color:var(--gold)]/30 bg-secondary/40 p-4 text-xs text-muted-foreground">
            <div className="mb-1 flex items-center gap-1.5 text-[color:var(--gold)]"><AlertTriangle className="h-3.5 w-3.5" /> Regla de oro</div>
            Si un mensaje genera urgencia o miedo, es sospechoso por defecto.
          </div>
        </aside>
      </div>
    </PageShell>
  );
}