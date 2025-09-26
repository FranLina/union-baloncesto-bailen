export function stripHtml(html) {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
}

export function generarSlug(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // quitar acentos
    .replace(/[^a-z0-9]+/g, "-") // todo lo que no sea letra/número -> "-"
    .replace(/(^-|-$)+/g, ""); // quitar guiones al inicio y fin
}
