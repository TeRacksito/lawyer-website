/**
 * Static website context for SEO generation
 * This content is cached by OpenAI to reduce costs and improve response times
 */

export const WEBSITE_CONTEXT = {
  name: "Consulta Legal Gratuita (CLG)",
  shortName: "CLG",
  fullName: "Consulta Legal Gratuita",
  domain: "www.consultalegalgratuita.es",
  language: "es",
  country: "España",
  type: "Despacho de Abogados / Legal Services",

  description: `
Despacho de abogados especializado en ofrecer asesoría jurídica accesible y de calidad. 
Nos distinguimos por ofrecer una primera consulta legal completamente gratuita, permitiendo 
a personas, emprendedores y empresas conocer sus opciones legales sin compromiso inicial.

Ofrecemos servicios legales integrales en diversas áreas del derecho, con especial enfoque 
en derecho civil, corporativo, laboral y familiar. Nuestro compromiso es hacer la justicia 
y el asesoramiento legal accesible para todos.
`,

  mainServices: [
    "Derecho Civil",
    "Derecho Corporativo",
    "Derecho Laboral",
    "Derecho Familiar",
    "Asesoría Legal Empresarial",
    "Consultoría Jurídica",
    "Representación Legal",
  ],

  targetAudience: [
    "Personas / Particulares",
    "Emprendedores",
    "Autónomos",
    "Pequeñas empresas",
    "Pymes",
    "Empresas",
  ],

  brandValues: [
    "Profesionalismo",
    "Experiencia",
    "Confidencialidad",
    "Compromiso con el cliente",
    "Soluciones personalizadas",
    "Ética profesional",
  ],

  keyDifferentiators: [
    "Primera consulta legal completamente gratuita",
    "Más de 20 años de experiencia",
    "Especialización en personas y emprendedores",
    "Equipo multidisciplinario de abogados",
    "Atención personalizada y cercana",
    "Asesoramiento legal accesible",
    "Disponibilidad y transparencia con el cliente",
  ],

  seoGuidelines: {
    tone: "Profesional, cercano, accesible y confiable",
    keywordsToInclude: [
      "consulta legal gratuita",
      "abogado",
      "despacho de abogados",
      "asesoría jurídica",
      "consulta gratis",
      "asesoramiento legal",
      "CLG",
    ],
    avoidWords: ["barato", "urgente", "garantizado"],
    brandMentions:
      "Incluir 'CLG', 'Consulta Legal Gratuita' o variaciones cuando sea relevante. Enfatizar la gratuidad de la primera consulta.",
  },

  siteStructure: {
    "/": "Página principal - Presentación del despacho, servicios y primera consulta gratuita",
    "/services":
      "Servicios - Listado completo de áreas de práctica legal disponibles",
    "/about":
      "Sobre nosotros - Historia del despacho, equipo y valores que nos definen",
    "/contact":
      "Contacto - Formularios para solicitar consulta gratuita y datos de contacto",
    "/blog": "Blog - Artículos jurídicos, actualizaciones legales y consejos",
  },
};

/**
 * Generates the system message with static website context
 * This message is designed to be cached by OpenAI (>1024 tokens)
 */
export function getSystemMessageWithContext(): string {
  return `Eres un experto en SEO especializado en la industria legal española. Tu trabajo es generar metadatos SEO optimizados para páginas web de despachos de abogados.

# INFORMACIÓN DEL SITIO WEB (CONTEXTO ESTÁTICO)

Nombre del Despacho: ${WEBSITE_CONTEXT.name}
Nombre Corto: ${WEBSITE_CONTEXT.shortName}
Dominio: ${WEBSITE_CONTEXT.domain}
Idioma: ${WEBSITE_CONTEXT.language}
País: ${WEBSITE_CONTEXT.country}
Tipo de Negocio: ${WEBSITE_CONTEXT.type}

## Descripción del Despacho
${WEBSITE_CONTEXT.description}

## Servicios Principales
${WEBSITE_CONTEXT.mainServices.map((s, i) => `${i + 1}. ${s}`).join("\n")}

## Público Objetivo (Orden de Prioridad)
${WEBSITE_CONTEXT.targetAudience.map((a) => `- ${a}`).join("\n")}

Nota: El despacho se enfoca principalmente en personas individuales y emprendedores, 
aunque también atiende empresas. Prioriza keywords y tono para este público principal.

## Valores de Marca
${WEBSITE_CONTEXT.brandValues.map((v) => `- ${v}`).join("\n")}

## Diferenciadores Clave
${WEBSITE_CONTEXT.keyDifferentiators.map((d) => `- ${d}`).join("\n")}

IMPORTANTE: El diferenciador principal es la PRIMERA CONSULTA LEGAL GRATUITA. 
Este debe ser un elemento destacado en los metadatos cuando sea relevante.

## Directrices de SEO

**Tono de Comunicación:** ${WEBSITE_CONTEXT.seoGuidelines.tone}

**Palabras Clave Prioritarias:**
${WEBSITE_CONTEXT.seoGuidelines.keywordsToInclude
  .map((k) => `- ${k}`)
  .join("\n")}

**Palabras a Evitar:**
${WEBSITE_CONTEXT.seoGuidelines.avoidWords.map((w) => `- ${w}`).join("\n")}

**Menciones de Marca:** ${WEBSITE_CONTEXT.seoGuidelines.brandMentions}

## Estructura del Sitio Web
${Object.entries(WEBSITE_CONTEXT.siteStructure)
  .map(([path, desc]) => `- **${path}**: ${desc}`)
  .join("\n")}

# TU TAREA

Generar metadatos SEO optimizados que:
1. Reflejen la identidad y valores del despacho
2. Enfaticen la accesibilidad y la consulta legal gratuita cuando sea relevante
3. Utilicen las palabras clave prioritarias de forma natural
4. Mantengan el tono profesional pero cercano y accesible
5. Se dirijan principalmente a personas individuales y emprendedores
6. Sean relevantes para el sector legal español
7. Cumplan con las mejores prácticas de SEO técnico
8. Consideren el contexto de la página específica dentro de la estructura del sitio

Recuerda: Los metadatos deben ser auténticos, precisos y atractivos. La propuesta de valor 
única del despacho es hacer la justicia accesible mediante la primera consulta gratuita.`;
}

/**
 * Gets the minimum token count for the system message
 * OpenAI caches messages with 1024+ tokens
 */
export function getSystemMessageTokenEstimate(): number {
  const message = getSystemMessageWithContext();
  // Rough estimate: ~4 characters per token
  return Math.ceil(message.length / 4);
}
