import { useState } from "react";
import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import Heading from "./Heading.jsx";
import Reveal, { EASE, Item } from "./Reveal.jsx";
import { FILMS, Photo } from "./Screens.jsx";

/* Fotos de ejemplo (Unsplash, licencia libre) en public/photos. */
const PRINTS = [
  { src: "/photos/c3.jpg", alt: "Pareja caminando de la mano junto al mar", rot: -9, x: "-38%", y: 18 },
  { src: "/photos/c7.jpg", alt: "Pies descalzos sobre un muelle mojado", rot: 8, x: "38%", y: 26 },
  {
    src: "/photos/c6.jpg",
    alt: "Pareja entre rocas blancas en un día de sol",
    rot: -2,
    x: 0,
    y: 0,
    caption: "Tarde en las rocas",
    date: "13 AGO",
  },
];

export default function Memories() {
  const [film, setFilm] = useState("A6");
  const current = FILMS.find((f) => f.id === film);
  return (
    <section id="recuerdos" className="darkroom" data-nav="dark">
      <div className="wrap darkroom-grid">
        <Reveal variant="fade" stagger={0.08} className="darkroom-copy">
          <Item as="span" variant="down" className="eyebrow">
            Recuerdos
          </Item>
          <Heading>Su historia, *revelada*</Heading>
          <Item as="p" className="lead">
            Sus momentos como fotos de carrete, con película y grano. Y cada
            mes, un rollo de 24 fotos que no se ven hasta revelarlo.
          </Item>
          <Item className="darkroom-local">
            <Smartphone size={18} />
            <span>
              <b>Tus fotos se quedan en tu teléfono.</b>
            </span>
          </Item>
        </Reveal>

        <Reveal variant="scale" className="darkroom-photo" duration={1}>
          <div className="prints">
            {PRINTS.map((p) => (
              <motion.div
                key={p.src}
                className={`print ${p.caption ? "print-front" : "print-back"}`}
                style={{ rotate: p.rot, x: p.x, y: p.y }}
                whileHover={{ y: p.y - 10, rotate: p.rot * 0.6 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <Photo src={p.src} alt={p.alt} film={film} className="print-photo" />
                <div className="print-meta">
                  {p.caption ? (
                    <>
                      <small>
                        {p.date} · {current.id} {current.name.toUpperCase()}
                      </small>
                      <b>{p.caption}</b>
                    </>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="films" role="radiogroup" aria-label="Película">
            {FILMS.map((f) => (
              <button
                key={f.id}
                role="radio"
                aria-checked={f.id === film}
                className={f.id === film ? "on" : ""}
                onClick={() => setFilm(f.id)}
              >
                {f.id === film ? (
                  <motion.span
                    layoutId="film-pill"
                    className="film-pill"
                    transition={{ duration: 0.35, ease: EASE }}
                  />
                ) : null}
                <b>{f.id}</b>
                <small>{f.name}</small>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
