import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MessageCircle, Instagram, Music2, Landmark, Mail, PhoneOff, Briefcase, ShieldQuestion, ChevronRight } from "lucide-react";
import { PageShell, SectionHeading } from "@/components/site-header";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: "Docs — Guías de ciberseguridad práctica" },
      { name: "description", content: "Guías paso a paso para proteger WhatsApp, redes sociales, finanzas y evitar ingeniería social." },
      { property: "og:title", content: "Docs — Name 17 IA" },
      { property: "og:description", content: "Centro de ayuda con guías prácticas y FAQ de privacidad." },
    ],
  }),
  component: DocsPage,
});

type Guide = {
  title: string;
  steps: string[];
};

type Section = {
  id: string;
  label: string;
  icon: React.ReactNode;
  intro: string;
  guides: Guide[];
};

const sections: Section[] = [
  {
    id: "whatsapp",
    label: "WhatsApp & Telegram",
    icon: <MessageCircle className="h-4 w-4" />,
    intro: "Blindá tus apps de mensajería contra clonación, grupos maliciosos y suplantación.",
    guides: [
      {
        title: "Activar verificación en dos pasos",
        steps: [
          "Abrí Ajustes → Cuenta → Verificación en dos pasos.",
          "Tocá 'Activar' y creá un PIN de 6 dígitos difícil de adivinar.",
          "Ingresá un email de recuperación (no lo compartas con nadie).",
          "Guardá el PIN en un gestor de contraseñas, nunca en notas.",
        ],
      },
      {
        title: "Proteger la foto de perfil para que no la clonen",
        steps: [
          "En WhatsApp: Ajustes → Privacidad → Foto del perfil → 'Mis contactos'.",
          "En Telegram: Ajustes → Privacidad y seguridad → Foto de perfil → 'Mis contactos'.",
          "Evitá usar la misma foto en LinkedIn, Instagram y WhatsApp: facilita el perfilamiento.",
        ],
      },
      {
        title: "Evitar que te metan a grupos sospechosos",
        steps: [
          "Ajustes → Privacidad → Grupos → 'Mis contactos' o 'Mis contactos, excepto…'.",
          "En Telegram: Privacidad → Grupos y canales → 'Mis contactos'.",
          "Salí sin abrir cualquier grupo sospechoso: no toques enlaces internos.",
        ],
      },
    ],
  },
  {
    id: "instagram",
    label: "Instagram & Facebook",
    icon: <Instagram className="h-4 w-4" />,
    intro: "Detectá perfiles falsos y bloqueá accesos no autorizados a tus cuentas.",
    guides: [
      {
        title: "Detectar perfiles falsos de sorteos o inversiones",
        steps: [
          "Verificá el tilde azul y la antigüedad de la cuenta (pestaña 'Sobre esta cuenta').",
          "Desconfiá de handles con letras cambiadas: '@marca_oficiaI' con i mayúscula.",
          "Ninguna marca real pide datos personales por DM para 'reclamar un premio'.",
          "Reportá y bloqueá; no interactúes ni respondas con 'STOP'.",
        ],
      },
      {
        title: "Activar alertas de inicio de sesión no autorizado",
        steps: [
          "Instagram: Configuración → Centro de cuentas → Contraseña y seguridad → Alertas de inicio de sesión.",
          "Facebook: Configuración → Seguridad e inicio de sesión → Alertas sobre inicios de sesión no reconocidos.",
          "Activá también la autenticación en dos pasos con app (no SMS).",
        ],
      },
    ],
  },
  {
    id: "tiktok",
    label: "TikTok & Snapchat",
    icon: <Music2 className="h-4 w-4" />,
    intro: "Configuración de privacidad para menores y protección frente a enlaces maliciosos.",
    guides: [
      {
        title: "Privacidad para cuentas de menores",
        steps: [
          "TikTok: Ajustes → Privacidad → Cuenta privada activada.",
          "Activá 'Sincronización familiar' desde el dispositivo del adulto responsable.",
          "Snapchat: Ajustes → 'Ver mi historia' y 'Contactarme' en 'Mis amigos'.",
        ],
      },
      {
        title: "Bloquear DMs de desconocidos",
        steps: [
          "TikTok: Privacidad → Mensajes directos → 'Solo amigos' o 'Nadie'.",
          "Snapchat: Privacidad → Contactarme → 'Mis amigos'.",
          "No abras enlaces en biografías: son la principal vía de virus y phishing.",
        ],
      },
    ],
  },
  {
    id: "finanzas",
    label: "Mercado Pago & Bancos",
    icon: <Landmark className="h-4 w-4" />,
    intro: "Blindá tus movimientos y aprendé a reaccionar ante transferencias fantasma.",
    guides: [
      {
        title: "Activar desbloqueo biométrico para transferencias",
        steps: [
          "Mercado Pago: Perfil → Seguridad → Activar huella / rostro para pagos y transferencias.",
          "En tu app bancaria: Configuración → Seguridad → Biometría para operaciones.",
          "Nunca compartas el código SMS de confirmación: es tu firma digital.",
        ],
      },
      {
        title: "Detectar phishing que simula ser la app",
        steps: [
          "Ninguna app te pide clave por email o SMS. Nunca.",
          "Verificá el dominio real: 'mercadopago.com.ar', no 'mercado-pago-ar.com'.",
          "Ante duda, cerrá el correo y abrí la app directamente desde el ícono.",
        ],
      },
      {
        title: "Qué hacer ante una transferencia fantasma",
        steps: [
          "No devuelvas el dinero por transferencia inmediata.",
          "Contactá al banco / MP por los canales oficiales y reportá el ingreso.",
          "Guardá comprobantes: el estafador podría reclamarte diciendo que 'se equivocó'.",
        ],
      },
    ],
  },
  {
    id: "email",
    label: "Email",
    icon: <Mail className="h-4 w-4" />,
    intro: "Verificá remitentes y no abras adjuntos peligrosos jamás.",
    guides: [
      {
        title: "Verificar el remitente real",
        steps: [
          "Mirá la dirección completa, no solo el nombre visible.",
          "Los dominios legítimos no usan subdominios raros ('@soporte.banco-secure.co').",
          "Pasá el mouse sobre los enlaces sin hacer clic: mirá la URL real abajo.",
        ],
      },
      {
        title: "Nunca descargar archivos .exe o .scr",
        steps: [
          "Los adjuntos ejecutables son la vía principal de ransomware.",
          "Desconfiá también de .zip / .rar con contraseña que 'te avisan por otro medio'.",
          "Ante duda, subí el archivo a Name 17 IA antes de abrirlo.",
        ],
      },
    ],
  },
  {
    id: "vishing",
    label: "Llamadas sospechosas",
    icon: <PhoneOff className="h-4 w-4" />,
    intro: "Protocolo ante vishing: falso soporte, secuestros virtuales y códigos SMS.",
    guides: [
      {
        title: "Protocolo ante llamadas de 'servicio técnico'",
        steps: [
          "No des códigos SMS ni instales apps de escritorio remoto (AnyDesk, TeamViewer).",
          "Cortá y llamá al número oficial del banco / empresa desde su web.",
          "Nunca hay 'urgencia' legítima que se resuelva por teléfono con un desconocido.",
        ],
      },
      {
        title: "Secuestros virtuales",
        steps: [
          "Si escuchás gritos o audios genéricos: cortá y llamá al familiar directamente.",
          "No des nombres de familiares ni confirmés datos ('¿estás con tu hijo?').",
          "Avisá a la fuerza policial local aunque no hayas caído.",
        ],
      },
    ],
  },
  {
    id: "trabajos",
    label: "Trabajos de mentiras",
    icon: <Briefcase className="h-4 w-4" />,
    intro: "Identificá ofertas laborales falsas y esquemas de 'ganar dinero fácil'.",
    guides: [
      {
        title: "Señales de una oferta laboral falsa",
        steps: [
          "Prometen ingresos altos por tareas triviales ('dar likes', 'ver videos').",
          "Te contactan por WhatsApp desde un número extranjero sin proceso formal.",
          "Piden dinero por 'capacitación', 'materiales' o 'activación de cuenta'.",
          "Te mueven a Telegram y a un grupo con 'ganancias en vivo': es piramidal.",
        ],
      },
      {
        title: "Verificación básica antes de aceptar",
        steps: [
          "Buscá la empresa en LinkedIn: página oficial, empleados reales, antigüedad.",
          "Ningún empleador legítimo pide clave bancaria ni foto del DNI por WhatsApp.",
          "Ante duda, subí la conversación a Name 17 IA para una auditoría forense.",
        ],
      },
    ],
  },
  {
    id: "faq",
    label: "FAQ de privacidad",
    icon: <ShieldQuestion className="h-4 w-4" />,
    intro: "Cómo tratamos los archivos que subís a la plataforma.",
    guides: [
      {
        title: "¿Qué pasa con las imágenes, audios y videos que subo?",
        steps: [
          "Se procesan de forma privada y segura con nuestra IA forense.",
          "No se comparten con terceros ni se usan para entrenar modelos externos.",
          "Se eliminan del almacenamiento temporal al finalizar la auditoría.",
        ],
      },
      {
        title: "¿Guardan mis mensajes o consultas?",
        steps: [
          "Guardamos únicamente metadatos mínimos para métricas agregadas y anónimas.",
          "Podés solicitar la eliminación total de tu historial desde tu cuenta.",
        ],
      },
      {
        title: "¿Quién puede ver los resultados de mis auditorías?",
        steps: [
          "Solo vos, desde tu sesión autenticada.",
          "En planes empresariales, los administradores pueden ver reportes agregados sin contenido personal.",
        ],
      },
    ],
  },
];

function DocsPage() {
  const [activeId, setActiveId] = useState(sections[0].id);
  const active = sections.find((s) => s.id === activeId) ?? sections[0];

  return (
    <PageShell>
      <SectionHeading
        eyebrow="Centro de guías"
        title={<>Ciberseguridad práctica, <span style={{ background: "var(--gradient-gold)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>paso a paso.</span></>}
        description="Guías accionables para blindar tus apps, tus finanzas y a las personas que te importan."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-2xl border border-border bg-card/70 p-3 backdrop-blur lg:sticky lg:top-6">
          <div className="px-3 py-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            Secciones
          </div>
          <nav className="flex flex-col gap-1">
            {sections.map((s) => {
              const isActive = s.id === activeId;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveId(s.id)}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-md border ${
                      isActive
                        ? "border-[color:var(--gold)] text-[color:var(--gold)]"
                        : "border-border text-muted-foreground group-hover:border-[color:var(--gold)]/50"
                    }`}
                  >
                    {s.icon}
                  </span>
                  <span className="flex-1">{s.label}</span>
                  {isActive && <ChevronRight className="h-3.5 w-3.5" style={{ color: "var(--gold)" }} />}
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur md:p-8">
          <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.25em]" style={{ color: "var(--gold)" }}>
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--gold)", boxShadow: "0 0 8px var(--gold)" }} />
            {active.label}
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">{active.label}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{active.intro}</p>

          <div className="mt-8 space-y-6">
            {active.guides.map((g, i) => (
              <article key={i} className="rounded-xl border border-border/60 bg-background/40 p-5">
                <h3 className="mb-4 flex items-center gap-2 text-base font-semibold">
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-md text-[11px] font-bold"
                    style={{ background: "var(--gradient-gold)", color: "var(--primary-foreground)" }}
                  >
                    {i + 1}
                  </span>
                  {g.title}
                </h3>
                <ol className="space-y-2.5 pl-1 text-sm text-foreground/85">
                  {g.steps.map((s, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="mt-1 inline-block h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--gold)" }} />
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}