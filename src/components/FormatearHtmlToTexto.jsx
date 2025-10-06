// src/components/TextoEquipo.jsx
import DOMPurify from "dompurify";

export default function TextoEquipo({ contenido }) {
  const clean = DOMPurify.sanitize(contenido, {
    ALLOWED_TAGS: [
      "p",
      "span",
      "strong",
      "em",
      "div",
      "br",
      "a",
      "i",
      "h1",
      "h2",
      "h3"
    ],
    ALLOWED_ATTR: ["class", "href", "target", "rel"],
  });

  return <div dangerouslySetInnerHTML={{ __html: clean }} />;
}
