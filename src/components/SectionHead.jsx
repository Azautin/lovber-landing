import Heading from "./Heading.jsx";
import Reveal, { Item } from "./Reveal.jsx";

/** Cabecera de sección: etiqueta, titular enmascarado y bajada, escalonados. */
export default function SectionHead({ eyebrow, title, lead, center, children }) {
  return (
    <Reveal
      variant="fade"
      stagger={0.1}
      className={`section-head ${center ? "center" : ""}`}
    >
      <Item as="span" variant="down" className="eyebrow">
        {eyebrow}
      </Item>
      <Heading>{title}</Heading>
      {lead ? (
        <Item as="p" className="lead" delay={0.1}>
          {lead}
        </Item>
      ) : null}
      {children ? <Item delay={0.15}>{children}</Item> : null}
    </Reveal>
  );
}
