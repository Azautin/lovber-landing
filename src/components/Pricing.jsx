import Reveal, { Item } from "./Reveal.jsx";
import SectionHead from "./SectionHead.jsx";
import { money, PLANS } from "../config.js";

const hover = { y: -6, transition: { type: "spring", stiffness: 300, damping: 22 } };

export default function Pricing() {
  return (
    <section id="precios" className="band band-warm">
      <div className="wrap">
        <SectionHead
          center
          eyebrow="Planes"
          title="Empieza gratis. Crece cuando quieras."
          lead="Un plan gratis y dos planes mensuales. Muy pronto te contamos qué incluye cada uno."
        />

        <div className="plans plans-3">
          {PLANS.tiers.map((t, i) => {
            const featured = i === 1;
            return (
              <Reveal
                key={t.id}
                className={`plan ${featured ? "featured" : ""}`}
                variant="up"
                delay={i * 0.1}
                stagger={0.06}
                hover={hover}
              >
                <Item as="h3">{t.name}</Item>
                <Item className="price">
                  <b>{money(t.monthly)}</b>
                  <span>{t.monthly ? "al mes" : "para siempre"}</span>
                </Item>
                <Item className="plan-soon">
                  {t.monthly ? "Detalles muy pronto" : "Sin tarjeta, sin plazos"}
                </Item>
                <Item>
                  <a href="#descargar" className={`btn ${featured ? "" : "btn-ghost"}`}>
                    {t.monthly ? "Avísame" : "Empezar gratis"}
                  </a>
                </Item>
              </Reveal>
            );
          })}
        </div>

        <Reveal variant="fade" delay={0.2} as="p" className="fine">
          Precios de referencia en dólares (USD). El precio final, la moneda
          local y los impuestos los muestra tu tienda (App Store o Google Play)
          antes de confirmar. Puedes cancelar cuando quieras desde tu tienda.
        </Reveal>
      </div>
    </section>
  );
}
