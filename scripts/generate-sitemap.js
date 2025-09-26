import "dotenv/config";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 👉 función para convertir títulos a slug SEO
function generarSlug(texto) {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

async function generarSitemap() {
  try {
    // 1️⃣ Obtener equipos
    const { data: equipos, error: errorEquipos } = await supabase
      .from("equipos")
      .select("id, nombre")
      .eq("club", 1);

    if (errorEquipos) throw errorEquipos;

    // 2️⃣ Obtener crónicas
    const { data: cronicas, error: errorCronicas } = await supabase
      .from("cronicas")
      .select("id, titulo");

    if (errorCronicas) throw errorCronicas;

    // 3️⃣ URLs base
    const baseUrl = "https://union-baloncesto-bailen.vercel.app";

    const urls = [{ loc: `${baseUrl}/`, priority: "1.0", changefreq: "daily" }];

    // Equipos
    equipos.forEach((eq) => {
      urls.push({
        loc: `${baseUrl}/equipos/${eq.id}-${generarSlug(eq.nombre)}`,
        priority: "0.9",
        changefreq: "weekly",
      });
    });

    // Crónicas
    cronicas.forEach((cr) => {
      urls.push({
        loc: `${baseUrl}/cronicas/${cr.id}-${generarSlug(cr.titulo)}`,
        priority: "0.8",
        changefreq: "weekly",
      });
    });

    // 4️⃣ Construir XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `
  <url>
    <loc>${u.loc}</loc>
    <priority>${u.priority}</priority>
    <changefreq>${u.changefreq}</changefreq>
  </url>`
  )
  .join("\n")}
</urlset>`;

    // 5️⃣ Guardar en /public/sitemap.xml
    fs.writeFileSync("public/sitemap.xml", xml, "utf8");
    console.log("✅ sitemap.xml generado correctamente.");
  } catch (err) {
    console.error("❌ Error generando sitemap:", err);
  }
}

generarSitemap();
