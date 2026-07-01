import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Search, Paperclip, Image as ImageIcon, Mic, Video, Shield, Sparkles, X, FileText, Loader2 } from "lucide-react";
import { SiteHeader, PageBackground } from "@/components/site-header";

export const Route = createFileRoute("/")({
  component: Index,
});

type Attachment = {
  file: File;
  kind: "image" | "audio" | "video";
  previewUrl: string;
};

type AuditMessage = {
  role: "user" | "ai";
  content: string;
  verdict?: "safe" | "warning" | "danger";
};

function Index() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [attachment, setAttachment] = useState<Attachment | null>(null);
  const [messages, setMessages] = useState<AuditMessage[]>([]);
  const [auditing, setAuditing] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const audioInput = useRef<HTMLInputElement>(null);
  const videoInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    return () => {
      if (attachment) URL.revokeObjectURL(attachment.previewUrl);
    };
  }, [attachment]);

  function handleFile(kind: Attachment["kind"], file: File | undefined) {
    if (!file) return;
    if (attachment) URL.revokeObjectURL(attachment.previewUrl);
    setAttachment({ file, kind, previewUrl: URL.createObjectURL(file) });
    setMenuOpen(false);
  }

  function runAudit(kind: "text" | "file") {
    const label =
      kind === "text"
        ? `Analizando contenido: "${query.slice(0, 80)}${query.length > 80 ? "…" : ""}"`
        : `Auditando ${attachment?.kind === "image" ? "imagen" : attachment?.kind === "audio" ? "nota de voz" : "video"}: ${attachment?.file.name}`;
    setMessages((m) => [...m, { role: "user", content: label }]);
    setAuditing(true);
    setTimeout(() => {
      const verdicts: AuditMessage["verdict"][] = ["safe", "warning", "danger"];
      const verdict = verdicts[Math.floor(Math.random() * 3)];
      const responses = {
        safe: "Análisis completado. No se detectaron patrones de phishing, malware ni ingeniería social. El contenido parece legítimo. Confianza: 96%.",
        warning: "Se detectaron elementos sospechosos: dominio recientemente registrado y lenguaje de urgencia atípico. Recomendación: verificar remitente antes de interactuar. Confianza: 78%.",
        danger: "ALERTA: patrones consistentes con intento de phishing / suplantación. Se identificaron enlaces acortados maliciosos y solicitud de credenciales. No interactúes con este contenido. Confianza: 94%.",
      } as const;
      setMessages((m) => [...m, { role: "ai", content: responses[verdict!], verdict }]);
      setAuditing(false);
      if (kind === "text") setQuery("");
    }, 1400);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <PageBackground />
      <SiteHeader />

      {/* Hero */}
      <main className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 pb-24 pt-16 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[color:var(--gold)]/25 bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
          <Sparkles className="h-3 w-3" style={{ color: "var(--gold)" }} />
          Auditoría IA en tiempo real
        </div>
        <h1 className="text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          Detecta lo sospechoso <br />
          <span style={{ background: "var(--gradient-gold)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            antes de que te alcance.
          </span>
        </h1>
        <p className="mt-5 max-w-xl text-balance text-base text-muted-foreground">
          Analiza mensajes, emails, números, capturas, notas de voz y videos con una capa de inteligencia forense adaptada a estafas modernas.
        </p>

        {/* Search bar */}
        <div className="w-full max-w-2xl">
          <div className="group relative flex items-center rounded-2xl border border-border bg-card/80 pl-5 pr-2 py-2 shadow-[var(--shadow-elegant)] backdrop-blur transition-all focus-within:border-[color:var(--gold)]/60 focus-within:shadow-[var(--shadow-gold)]">
            <Search className="mr-3 h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && query.trim() && runAudit("text")}
              placeholder="Pega un mensaje, email o número sospechoso…"
              className="min-w-0 flex-1 bg-transparent py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />

            <div className="relative z-50" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Adjuntar archivo"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--gold)]/30 transition-all hover:scale-105 hover:border-[color:var(--gold)] hover:shadow-[var(--shadow-gold)]"
                style={{ background: "var(--gradient-gold)" }}
              >
                <Paperclip className="h-4 w-4" style={{ color: "var(--primary-foreground)" }} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 bottom-full mb-2 z-50 w-64 overflow-hidden rounded-xl border border-border bg-popover/95 p-1.5 shadow-[var(--shadow-elegant)] backdrop-blur-xl">
                  <MenuItem icon={<ImageIcon className="h-4 w-4" />} label="Subir Imagen / Captura" hint="PNG, JPG, WEBP" onClick={() => imageInput.current?.click()} />
                  <MenuItem icon={<Mic className="h-4 w-4" />} label="Subir Nota de voz" hint="MP3, WAV, M4A" onClick={() => audioInput.current?.click()} />
                  <MenuItem icon={<Video className="h-4 w-4" />} label="Subir Video sospechoso" hint="MP4, MOV, WEBM" onClick={() => videoInput.current?.click()} />
                </div>
              )}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
            <Chip>Phishing</Chip>
            <Chip>Smishing</Chip>
            <Chip>Deepfake de voz</Chip>
            <Chip>Suplantación</Chip>
          </div>
        </div>

        {/* Hidden inputs */}
        <input ref={imageInput} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile("image", e.target.files?.[0])} />
        <input ref={audioInput} type="file" accept="audio/*" className="hidden" onChange={(e) => handleFile("audio", e.target.files?.[0])} />
        <input ref={videoInput} type="file" accept="video/*" className="hidden" onChange={(e) => handleFile("video", e.target.files?.[0])} />

        {/* Attachment preview card */}
        {attachment && (
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur">
            <div className="flex items-center justify-between border-b border-border/60 px-5 py-3">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                <FileText className="h-3.5 w-3.5" style={{ color: "var(--gold)" }} />
                Previsualización
              </div>
              <button
                onClick={() => setAttachment(null)}
                className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Quitar archivo"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-4 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg bg-secondary">
                {attachment.kind === "image" && (
                  <img src={attachment.previewUrl} alt="preview" className="h-full w-full object-cover" />
                )}
                {attachment.kind === "audio" && <Mic className="h-8 w-8" style={{ color: "var(--gold)" }} />}
                {attachment.kind === "video" && (
                  <video src={attachment.previewUrl} className="h-full w-full object-cover" muted />
                )}
              </div>
              <div className="min-w-0 text-left">
                <p className="truncate text-sm font-medium text-foreground">{attachment.file.name}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {(attachment.file.size / 1024).toFixed(1)} KB ·{" "}
                  {attachment.kind === "image" ? "Imagen" : attachment.kind === "audio" ? "Audio" : "Video"}
                </p>
                {attachment.kind === "audio" && (
                  <audio controls src={attachment.previewUrl} className="mt-2 h-8 w-full" />
                )}
              </div>
              <button
                onClick={() => runAudit("file")}
                disabled={auditing}
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all hover:scale-[1.02] hover:shadow-[var(--shadow-gold)] disabled:opacity-60"
                style={{ background: "var(--gradient-gold)", color: "var(--primary-foreground)" }}
              >
                {auditing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
                Iniciar Auditoría de Archivo
              </button>
            </div>
          </div>
        )}

        {/* AI responses container */}
        <div className="relative mt-14 w-full max-w-2xl">
          <div className="mb-3 flex items-center justify-between px-1 text-left">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--gold)", boxShadow: "0 0 8px var(--gold)" }} />
              Consola de auditoría IA
            </div>
            {messages.length > 0 && (
              <button onClick={() => setMessages([])} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                Limpiar
              </button>
            )}
          </div>

          <div className="min-h-[220px] rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
            {messages.length === 0 && !auditing && (
              <div className="flex h-full min-h-[180px] flex-col items-center justify-center text-center">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--gold)]/30">
                  <Shield className="h-5 w-5" style={{ color: "var(--gold)" }} />
                </div>
                <p className="text-sm text-muted-foreground">
                  Aún no hay auditorías. Envía un mensaje o sube un archivo para comenzar.
                </p>
              </div>
            )}

            <div className="space-y-3 text-left">
              {messages.map((m, i) => (
                <MessageBubble key={i} msg={m} />
              ))}
              {auditing && (
                <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-secondary/50 px-4 py-3 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" style={{ color: "var(--gold)" }} />
                  Analizando patrones forenses…
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function MenuItem({ icon, label, hint, onClick }: { icon: React.ReactNode; label: string; hint: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-secondary"
    >
      <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[color:var(--gold)]/25 text-[color:var(--gold)]">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-foreground">{label}</div>
        <div className="text-[11px] text-muted-foreground">{hint}</div>
      </div>
    </button>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-card/60 px-2.5 py-1 text-[11px] text-muted-foreground backdrop-blur">
      {children}
    </span>
  );
}

function MessageBubble({ msg }: { msg: AuditMessage }) {
  if (msg.role === "user") {
    return (
      <div className="rounded-xl border border-border/60 bg-secondary/40 px-4 py-3 text-sm text-foreground">
        <div className="mb-1 text-[10px] uppercase tracking-widest text-muted-foreground">Consulta</div>
        {msg.content}
      </div>
    );
  }
  const styles = {
    safe: { label: "Seguro", color: "oklch(0.75 0.15 155)" },
    warning: { label: "Sospechoso", color: "oklch(0.82 0.15 85)" },
    danger: { label: "Amenaza detectada", color: "oklch(0.68 0.22 25)" },
  } as const;
  const s = styles[msg.verdict ?? "safe"];
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3 text-sm">
      <div className="mb-1.5 flex items-center gap-2 text-[10px] uppercase tracking-widest" style={{ color: s.color }}>
        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: s.color, boxShadow: `0 0 8px ${s.color}` }} />
        Name 17 IA · {s.label}
      </div>
      <p className="text-foreground/90">{msg.content}</p>
    </div>
  );
}
