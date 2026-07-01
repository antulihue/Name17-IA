import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { PageBackground } from "@/components/site-header";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Ingresar — Name 17 IA" },
      { name: "description", content: "Iniciá sesión o creá tu cuenta en Name 17 IA." },
      { property: "og:title", content: "Ingresar — Name 17 IA" },
      { property: "og:description", content: "Acceso premium a la plataforma de auditoría forense con IA." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [showPw, setShowPw] = useState(false);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12 text-foreground">
      <PageBackground />

      <div className="relative z-10 w-full max-w-md">
        <Link to="/" className="mb-6 flex items-center justify-center gap-2.5">
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

        <div className="rounded-2xl border border-border bg-card/80 p-7 shadow-[var(--shadow-elegant)] backdrop-blur">
          <div className="mb-6 flex rounded-full border border-border bg-background/40 p-1 text-xs">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 rounded-full px-4 py-2 font-medium transition-all ${
                mode === "login"
                  ? "text-[color:var(--primary-foreground)] shadow-[var(--shadow-gold)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={mode === "login" ? { background: "var(--gradient-gold)" } : undefined}
            >
              Ingresar
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 rounded-full px-4 py-2 font-medium transition-all ${
                mode === "register"
                  ? "text-[color:var(--primary-foreground)] shadow-[var(--shadow-gold)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={mode === "register" ? { background: "var(--gradient-gold)" } : undefined}
            >
              Registrarse
            </button>
          </div>

          {mode === "login" ? (
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4"
              autoComplete="on"
            >
              <h1 className="text-xl font-semibold tracking-tight">Bienvenido de vuelta</h1>
              <p className="text-sm text-muted-foreground">
                Accedé a tu consola de auditoría forense.
              </p>

              <Field
                id="login-email"
                name="email"
                type="email"
                label="Email"
                placeholder="tu@correo.com"
                icon={<Mail className="h-4 w-4" />}
                autoComplete="email"
                required
              />
              <Field
                id="login-password"
                name="password"
                type={showPw ? "text" : "password"}
                label="Contraseña"
                placeholder="••••••••"
                icon={<Lock className="h-4 w-4" />}
                autoComplete="current-password"
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPw((v) => !v)}
                    className="text-muted-foreground hover:text-foreground"
                    aria-label="Mostrar contraseña"
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
                required
              />

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-muted-foreground">
                  <input type="checkbox" id="remember" name="remember" className="accent-[color:var(--gold)]" />
                  Recordarme
                </label>
                <a href="#forgot" className="text-[color:var(--gold)] hover:underline">
                  Olvidaste tu contraseña
                </a>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all hover:scale-[1.01] hover:shadow-[var(--shadow-gold)]"
                style={{ background: "var(--gradient-gold)", color: "var(--primary-foreground)" }}
              >
                Ingresar
              </button>

              <p className="pt-2 text-center text-xs text-muted-foreground">
                ¿No tenés cuenta?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="text-[color:var(--gold)] hover:underline"
                >
                  Registrarse
                </button>
              </p>
            </form>
          ) : (
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-4"
              autoComplete="on"
            >
              <h1 className="text-xl font-semibold tracking-tight">Creá tu cuenta</h1>
              <p className="text-sm text-muted-foreground">
                Empezá a auditar mensajes y archivos en segundos.
              </p>

              <Field
                id="register-name"
                name="fullName"
                type="text"
                label="Nombre completo"
                placeholder="Tu nombre y apellido"
                icon={<User className="h-4 w-4" />}
                autoComplete="name"
                required
              />
              <Field
                id="register-email"
                name="email"
                type="email"
                label="Email"
                placeholder="tu@correo.com"
                icon={<Mail className="h-4 w-4" />}
                autoComplete="email"
                required
              />
              <Field
                id="register-password"
                name="password"
                type="password"
                label="Contraseña"
                placeholder="Mínimo 8 caracteres"
                icon={<Lock className="h-4 w-4" />}
                autoComplete="new-password"
                minLength={8}
                required
              />
              <Field
                id="register-password-confirm"
                name="passwordConfirm"
                type="password"
                label="Confirmar contraseña"
                placeholder="Repetí la contraseña"
                icon={<Lock className="h-4 w-4" />}
                autoComplete="new-password"
                minLength={8}
                required
              />

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all hover:scale-[1.01] hover:shadow-[var(--shadow-gold)]"
                style={{ background: "var(--gradient-gold)", color: "var(--primary-foreground)" }}
              >
                Crear cuenta
              </button>

              <p className="pt-2 text-center text-xs text-muted-foreground">
                ¿Ya tenés cuenta?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-[color:var(--gold)] hover:underline"
                >
                  Ingresar
                </button>
              </p>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Al continuar aceptás nuestros términos y política de privacidad.
        </p>
      </div>
    </div>
  );
}

function Field({
  id,
  name,
  type,
  label,
  placeholder,
  icon,
  trailing,
  autoComplete,
  minLength,
  required,
}: {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
  trailing?: React.ReactNode;
  autoComplete?: string;
  minLength?: number;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-medium text-muted-foreground">
        {label}
      </label>
      <div className="group flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-2.5 transition-colors focus-within:border-[color:var(--gold)]/60 focus-within:shadow-[var(--shadow-gold)]">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          minLength={minLength}
          required={required}
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
        />
        {trailing}
      </div>
    </div>
  );
}