import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

const navItems = [
  { to: "/producto", label: "Producto" },
  { to: "/amenazas", label: "Amenazas" },
  { to: "/empresas", label: "Empresas" },
  { to: "/docs", label: "Docs" },
] as const;

export function SiteHeader() {
  return (
    <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <Link to="/" className="flex items-center gap-2.5">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[color:var(--gold)]/30"
          style={{ background: "var(--gradient-gold)" }}
        >
          <ShieldCheck className="h-5 w-5" style={{ color: "var(--primary-foreground)" }} />
        </div>
        <span className="text-lg font-semibold tracking-tight">
          Name 17 IA<span style={{ color: "var(--gold)" }}>.</span>
        </span>
      </Link>
      <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="transition-colors hover:text-foreground"
            activeProps={{ style: { color: "var(--gold)" } }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Link
        to="/auth"
        className="rounded-full border border-[color:var(--gold)]/40 px-4 py-1.5 text-xs font-medium text-foreground transition-all hover:border-[color:var(--gold)] hover:shadow-[var(--shadow-gold)]"
      >
        Iniciar sesión
      </Link>
    </header>
  );
}

export function PageBackground() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{ background: "var(--gradient-bg)" }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.13 85 / 0.12), transparent 70%)",
        }}
      />
    </>
  );
}

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <PageBackground />
      <SiteHeader />
      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-8">{children}</main>
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow && (
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/25 bg-card/60 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--gold)", boxShadow: "0 0 8px var(--gold)" }}
          />
          {eyebrow}
        </div>
      )}
      <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mt-4 text-balance text-base text-muted-foreground">{description}</p>
      )}
    </div>
  );
}