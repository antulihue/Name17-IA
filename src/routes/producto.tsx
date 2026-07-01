import { createFileRoute } from "@tanstack/react-router";
import { FileText, Image as ImageIcon, Mic, Video, ShieldAlert, ScanSearch, Gauge, ShieldCheck, CircleAlert, Skull } from "lucide-react";
import { PageShell, SectionHeading } from "@/components/site-header";

export const Route = createFileRoute("/producto")({
  head: () => ({
    meta: [
      { title: "Producto — Name 17 IA" },
      { name: "description", content: "Auditoría multimodal, capa forense antifraude y veredictos de riesgo claros para tu seguridad digital." },
      { property: "og:title", content: "Producto — Name 17 IA" },
      { property: "og:description", content: "Los tres pilares de nuestra plataforma premium de ciberseguridad con IA." },
    ],
  }),
  component: ProductoPage,
});

function ProductoPage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Producto"
        title={<>Tres pilares para detectar <span style={{ background: "var(--gradient-gold)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>lo invisible.</span></>}
        description="Una plataforma forense diseñada para adelantarse a las estafas modernas."
      />

      <div className="mt-16 grid gap-6 md:grid-cols-3">
        <PillarCard
          icon={<ScanSearch className="h-5 w-5" />}
          title="Auditoría Multimodal"
          copy="Analiza texto, imágenes, notas de voz y videos en una sola consulta con modelos afinados para detección de fraude."
          items={[
            { icon: <FileText className="h-3.5 w-3.5" />, label: "Texto y emails" },
            { icon: <ImageIcon className="h-3.5 w-3.5" />, label: "Imágenes / capturas" },
            { icon: <Mic className="h-3.5 w-3.5" />, label: "Notas de voz" },
            { icon: <Video className="h-3.5 w-3.5" />, label: "Videos sospechosos" },
          ]}
        />
        <PillarCard
          icon={<ShieldAlert className="h-5 w-5" />}
          title="Capa Forense Antifraude"
          copy="Motores de análisis que revisan metadatos, patrones de suplantación, deepfakes y señales de ingeniería social."
          items={[
            { icon: <span>·</span>, label: "Detección de deepfake de voz" },
            { icon: <span>·</span>, label: "Análisis de metadatos EXIF" },
            { icon: <span>·</span>, label: "Reputación de dominios y URLs" },
            { icon: <span>·</span>, label: "Reconocimiento de patrones de phishing" },
          ]}
        />
        <PillarCard
          icon={<Gauge className="h-5 w-5" />}
          title="Veredictos de Riesgo"
          copy="Resultados claros, accionables y con nivel de confianza. Sin jerga, sin ambigüedad."
          items={[
            { icon: <ShieldCheck className="h-3.5 w-3.5" style={{ color: "oklch(0.75 0.15 155)" }} />, label: "Seguro" },
            { icon: <CircleAlert className="h-3.5 w-3.5" style={{ color: "oklch(0.82 0.15 85)" }} />, label: "Sospechoso" },
            { icon: <Skull className="h-3.5 w-3.5" style={{ color: "oklch(0.68 0.22 25)" }} />, label: "Amenaza detectada" },
          ]}
        />
      </div>
    </PageShell>
  );
}

function PillarCard({
  icon,
  title,
  copy,
  items,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
  items: { icon: React.ReactNode; label: string }[];
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card/70 p-6 backdrop-blur transition-all hover:border-[color:var(--gold)]/50 hover:shadow-[var(--shadow-gold)]">
      <div
        className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--gold)]/30"
        style={{ background: "var(--gradient-gold)", color: "var(--primary-foreground)" }}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
      <ul className="mt-5 space-y-2 border-t border-border/60 pt-4 text-sm">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2 text-foreground/85">
            <span className="text-[color:var(--gold)]">{it.icon}</span>
            {it.label}
          </li>
        ))}
      </ul>
    </div>
  );
}