import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Users, ShieldCheck, Check, Sparkles } from "lucide-react";
import { PageShell, SectionHeading } from "@/components/site-header";

export const Route = createFileRoute("/empresas")({
  head: () => ({
    meta: [
      { title: "Empresas — Name 17 IA" },
      { name: "description", content: "Protección de marca, capacitación de equipos y planes de suscripción corporativos." },
      { property: "og:title", content: "Empresas — Name 17 IA" },
      { property: "og:description", content: "Soluciones corporativas de ciberseguridad con IA forense." },
    ],
  }),
  component: EmpresasPage,
});

const plans = [
  {
    name: "Starter",
    price: "USD 149",
    per: "/mes",
    desc: "Para equipos pequeños que necesitan cubrir lo básico.",
    features: ["Hasta 10 usuarios", "500 auditorías / mes", "Alertas de suplantación", "Soporte por email"],
  },
  {
    name: "Business",
    price: "USD 499",
    per: "/mes",
    desc: "Cobertura completa y capacitación continua.",
    features: ["Hasta 50 usuarios", "Auditorías ilimitadas", "Protección de marca activa", "Capacitación mensual", "Soporte prioritario"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "A medida",
    per: "",
    desc: "Integraciones dedicadas y SLA corporativo.",
    features: ["Usuarios ilimitados", "API dedicada", "SLA 99.9%", "Onboarding y compliance", "CSM asignado"],
  },
];

function EmpresasPage() {
  return (
    <PageShell>
      <SectionHeading
        eyebrow="Para empresas"
        title={<>Protegé tu marca, tu equipo y a tus <span style={{ background: "var(--gradient-gold)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>clientes.</span></>}
        description="Herramientas forenses, capacitación y monitoreo continuo para organizaciones de cualquier tamaño."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        <SolutionCard
          icon={<Building2 className="h-5 w-5" />}
          title="Protección de marca"
          copy="Monitoreo activo de dominios apócrifos, perfiles falsos y campañas de suplantación contra tu identidad corporativa."
        />
        <SolutionCard
          icon={<Users className="h-5 w-5" />}
          title="Capacitación de equipos"
          copy="Programas de entrenamiento antifraude, simulaciones de phishing y talleres a medida para tus áreas críticas."
        />
        <SolutionCard
          icon={<ShieldCheck className="h-5 w-5" />}
          title="Auditoría continua"
          copy="Panel corporativo con métricas de riesgo, alertas priorizadas y reportes forenses listos para compliance."
        />
      </div>

      <div className="mt-20">
        <div className="mb-8 flex items-center justify-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" style={{ color: "var(--gold)" }} />
          Planes de suscripción
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`relative overflow-hidden rounded-2xl border p-6 backdrop-blur transition-all ${
                p.featured
                  ? "border-[color:var(--gold)]/60 bg-card/90 shadow-[var(--shadow-gold)]"
                  : "border-border bg-card/70 hover:border-[color:var(--gold)]/40"
              }`}
            >
              {p.featured && (
                <div
                  className="absolute right-4 top-4 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest"
                  style={{ background: "var(--gradient-gold)", color: "var(--primary-foreground)" }}
                >
                  Recomendado
                </div>
              )}
              <div className="text-sm uppercase tracking-[0.2em] text-muted-foreground">{p.name}</div>
              <div className="mt-3 flex items-end gap-1">
                <span className="text-3xl font-semibold tracking-tight">{p.price}</span>
                <span className="pb-1 text-xs text-muted-foreground">{p.per}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
              <ul className="mt-5 space-y-2 border-t border-border/60 pt-4 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--gold)" }} />
                    <span className="text-foreground/85">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/auth"
                className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  p.featured
                    ? "text-[color:var(--primary-foreground)] hover:scale-[1.02] hover:shadow-[var(--shadow-gold)]"
                    : "border border-[color:var(--gold)]/40 text-foreground hover:border-[color:var(--gold)]"
                }`}
                style={p.featured ? { background: "var(--gradient-gold)" } : undefined}
              >
                {p.name === "Enterprise" ? "Contactar ventas" : "Empezar"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </PageShell>
  );
}

function SolutionCard({ icon, title, copy }: { icon: React.ReactNode; title: string; copy: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card/70 p-6 backdrop-blur transition-all hover:border-[color:var(--gold)]/50">
      <div
        className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ background: "var(--gradient-gold)", color: "var(--primary-foreground)" }}
      >
        {icon}
      </div>
      <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{copy}</p>
    </div>
  );
}