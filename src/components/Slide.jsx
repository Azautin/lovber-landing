import { useEffect } from "react";
import { animate, useMotionValue, useMotionValueEvent, useScroll } from "framer-motion";

/*
 * La landing se recorre como una presentación: una sección (diapositiva) a la vez.
 *
 * Reglas para cada sección:
 *  - Es un <section> dentro de <main>: el scroll se detiene en su inicio (scroll-snap en styles.css).
 *    Si necesita varias paradas (como «Cómo funciona»), coloca elementos `.snap-mark` dentro.
 *  - Declara `data-nav="dark"` si su fondo es oscuro; la barra de navegación adopta ese tema.
 *  - Su fondo es opaco y ocupa todo el ancho: el cambio de sección es un cambio de fondo.
 *
 * Transición entre una sección A y la siguiente B:
 *  - A usa `useStack(ref, markRef)`: queda fija al terminar de verse y devuelve `covered` (0 → 1)
 *    mientras B sube y la tapa. Con ese valor A se aleja (escala, se oscurece…).
 *  - B usa `useEnter(ref)`: devuelve 0 → 1 mientras sube hasta el borde superior, para animar su entrada.
 *  - A y B van juntas en un `.deck`, así A deja de estar fija cuando B termina.
 */

const clamp = (v) => Math.min(1, Math.max(0, v));
const SLIDE_EASE = [0.65, 0, 0.35, 1];

/** Paradas de scroll del documento: cada sección de <main>, cada `.snap-mark` y el final. */
function getStops() {
  const y = window.scrollY;
  const tops = [...document.querySelectorAll("main > section, .snap-mark")].map((el) =>
    Math.round(el.getBoundingClientRect().top + y),
  );
  const end = document.documentElement.scrollHeight - window.innerHeight;
  return [...new Set([...tops, end])].filter((t) => t <= end).sort((a, b) => a - b);
}

/**
 * Rueda del ratón / trackpad: cada gesto pasa exactamente a la diapositiva siguiente o
 * anterior con una transición controlada. El scroll-snap del navegador ya resuelve teclado
 * y pantallas táctiles, pero con la rueda vuelve a la parada más cercana si el giro es corto.
 * Dentro de una sección más alta que la pantalla el scroll es normal hasta llegar a su final.
 */
export function useWheelSlides() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let anim = null;
    let lockedUntil = 0;

    const go = (target) => {
      const from = window.scrollY;
      if (Math.abs(target - from) < 2) return;
      root.style.scrollSnapType = "none"; // si no, el navegador «ajusta» cada fotograma
      const done = () => {
        root.style.scrollSnapType = "";
        anim = null;
        lockedUntil = performance.now() + 180;
      };
      if (reduce.matches) {
        window.scrollTo({ top: target, behavior: "instant" });
        done();
        return;
      }
      anim = animate(from, target, {
        duration: 0.95,
        ease: SLIDE_EASE,
        onUpdate: (v) => window.scrollTo({ top: v, behavior: "instant" }),
        onComplete: done,
      });
    };

    const onWheel = (e) => {
      if (e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
      const now = performance.now();
      // Durante la transición y la inercia del trackpad, se ignora la rueda.
      if (anim || now < lockedUntil) {
        e.preventDefault();
        if (!anim) lockedUntil = now + 180;
        return;
      }
      if (Math.abs(e.deltaY) < 4) return;

      const vh = window.innerHeight;
      const y = window.scrollY;
      const stops = getStops();
      let i = 0;
      while (i + 1 < stops.length && stops[i + 1] <= y + 1) i++;
      const cur = stops[i];
      const next = stops[i + 1];

      if (e.deltaY > 0) {
        if (next === undefined || y + vh < next - 1) return; // sección alta: scroll normal
        e.preventDefault();
        go(next);
      } else {
        const tall = next !== undefined && next - cur > vh + 1;
        if (y > cur + 1) {
          if (tall) return;
          e.preventDefault();
          go(cur);
        } else if (i > 0) {
          e.preventDefault();
          go(Math.max(stops[i - 1], cur - vh));
        }
      }
    };

    // Los enlaces a #top apuntan al inicio, que es fijo (sticky): el navegador no sabe
    // llevar ahí, así que se sube al principio del documento a mano.
    const onClick = (e) => {
      if (!e.target.closest?.('a[href="#top"]')) return;
      e.preventDefault();
      go(0);
      history.replaceState(null, "", location.pathname);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("wheel", onWheel);
      document.removeEventListener("click", onClick);
      anim?.stop();
    };
  }, []);
}

/** Progreso de entrada: 0 cuando el borde superior asoma abajo, 1 cuando llega arriba. */
export function useEnter(ref) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  return scrollYProgress;
}

/**
 * Deja la sección fija (sticky) cuando se terminó de ver y mide cuánto la cubre la siguiente.
 * `markRef` es un `.snap-mark` justo antes de la sección: da la parada de scroll en su
 * posición real, porque un elemento fijo no sirve como referencia.
 */
export function useStack(ref, markRef) {
  const { scrollY } = useScroll();
  const covered = useMotionValue(0);

  const update = () => {
    const next = ref.current?.nextElementSibling;
    if (next) covered.set(clamp(1 - next.getBoundingClientRect().top / window.innerHeight));
  };
  useMotionValueEvent(scrollY, "change", update);

  useEffect(() => {
    const el = ref.current;
    const fit = () => {
      // Si es más alta que la pantalla, se fija cuando su borde inferior llega abajo.
      el.style.setProperty("--stick", `${Math.min(0, window.innerHeight - el.offsetHeight)}px`);
      if (markRef?.current) markRef.current.style.height = `${el.offsetHeight}px`;
      update();
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    window.addEventListener("resize", fit);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fit);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return covered;
}
