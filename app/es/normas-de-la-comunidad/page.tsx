import type { Metadata } from "next";
import { LegalPageEs } from "../legal/LegalPageEs";

export const metadata: Metadata = { title: "Normas de la comunidad", description: "Normas para compartir historias e ideas con respeto y seguridad.", alternates: { canonical: "/es/normas-de-la-comunidad", languages: { "pt-BR": "/regras-da-comunidade", "es-ES": "/es/normas-de-la-comunidad", en: "/en/community-guidelines" } } };

export default function CommunityRulesPageEs() {
  return <LegalPageEs kicker="HISTORIAS QUE ACERCAN" title="Normas de la comunidad" intro="Queremos historias verdaderas, útiles y acogedoras. Estas normas protegen a quien comparte y a quien lee.">
    <h2>Comparte con respeto</h2><p>Cuenta tu experiencia sin humillar, amenazar, discriminar ni exponer a nadie. Se admiten desacuerdos; no ataques personales, acoso ni discursos de odio.</p>
    <h2>Protege la privacidad</h2><p>No envíes teléfonos, direcciones, documentos, conversaciones privadas, imágenes ni datos que identifiquen a terceros sin su consentimiento. Usa nombres ficticios cuando sea necesario.</p>
    <h2>Envía contenido original</h2><p>Comparte textos e ideas que hayas creado o tengas permiso para utilizar. No copies artículos, letras, fotografías ni relatos ajenos.</p>
    <h2>Sin spam ni publicidad encubierta</h2><p>Los enlaces excesivos, promociones no solicitadas, estafas y contenido automatizado pueden bloquearse. Las colaboraciones comerciales deben acordarse previamente.</p>
    <h2>Moderación previa</h2><p>Toda aportación entra en una cola privada. Podemos corregir el lenguaje, solicitar aclaraciones, rechazar o retirar contenido para proteger a la comunidad. La selección editorial no promete la publicación.</p>
    <h2>Anonimato y retirada</h2><p>Puedes pedir una publicación anónima y solicitar correcciones o retirada mediante <a href="/es/contacto">Contacto</a>, usando el mismo correo del envío para facilitar la verificación.</p>
  </LegalPageEs>;
}
