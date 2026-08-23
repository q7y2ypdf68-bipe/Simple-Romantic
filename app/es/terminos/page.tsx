import type { Metadata } from "next";
import { LegalPageEs } from "../legal/LegalPageEs";

export const metadata: Metadata = { title: "Condiciones de uso", description: "Condiciones de uso de los contenidos y herramientas de Simple & Romantic.", alternates: { canonical: "/es/terminos", languages: { "pt-BR": "/termos", "es-ES": "/es/terminos" } } };

export default function TermsPageEs() {
  return <LegalPageEs kicker="UNA EXPERIENCIA RESPETUOSA" title="Condiciones de uso" intro="Al utilizar el sitio aceptas estas condiciones. Última actualización: 23 de agosto de 2026.">
    <h2>1. Finalidad</h2><p>Ofrecemos contenido editorial, sugerencias y herramientas de inspiración. Las ideas no sustituyen tu propia valoración sobre seguridad, clima, accesibilidad, normas locales o idoneidad del lugar.</p>
    <h2>2. Responsabilidad del visitante</h2><p>Tú decides si una sugerencia es adecuada y debes respetar las leyes, horarios, propiedades, normas de los espacios públicos, consentimiento y límites de todas las personas implicadas.</p>
    <h2>3. Contenido enviado</h2><p>Declaras que tienes derecho a compartir el material y concedes a Simple & Romantic una autorización gratuita y no exclusiva para revisarlo, adaptarlo, publicarlo y difundirlo dentro del proyecto. La autoría sigue siendo tuya y puedes retirar la autorización mediante una solicitud razonable.</p>
    <h2>4. Entre nosotros</h2><p>Entre nosotros es un espacio editorial de escucha y acogida, no un servicio de psicología, terapia, emergencias, investigación ni asesoramiento médico o jurídico. Los mensajes no se supervisan en tiempo real y el envío no garantiza una respuesta inmediata. Si existe peligro, contacta con los servicios de emergencia.</p><p>Los relatos son privados por defecto. Una posible publicación exige autorización específica, revisión y una decisión editorial. Guarda tu código: permite consultar el estado, leer una posible respuesta y borrar definitivamente el relato.</p>
    <h2>5. Contenido prohibido</h2><p>No aceptamos material ilegal, amenazante, discriminatorio, invasivo, engañoso, comercial sin autorización, que exponga datos de terceros o vulnere derechos de autor. Podemos rechazar, editar, retirar o borrar aportaciones.</p>
    <h2>6. Propiedad intelectual</h2><p>Los textos, la identidad visual, la organización y los materiales propios están protegidos. Puedes compartir enlaces y fragmentos breves con atribución, pero no reproducir íntegramente el proyecto ni explotarlo comercialmente sin autorización.</p>
    <h2>7. Disponibilidad</h2><p>Intentamos mantener el servicio útil y correcto, pero no garantizamos disponibilidad continua, resultados concretos ni que toda la información esté siempre actualizada.</p>
    <h2>8. Cambios y contacto</h2><p>Podemos mejorar el sitio y estas condiciones. Las dudas o solicitudes pueden enviarse mediante <a href="/es/contacto">Contacto</a>.</p>
  </LegalPageEs>;
}
