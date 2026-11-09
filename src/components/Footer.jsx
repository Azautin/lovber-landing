import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { LINKS } from "../config.js";

export default function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="wrap footer-row">
        <a href="#top" className="logo" aria-label="Lovber, inicio">
          lovber<span>.</span>
        </a>
        <span className="made">
          Hecho con
          <motion.span
            style={{ display: "inline-flex" }}
            animate={{ scale: [1, 1.25, 1, 1.18, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.2 }}
          >
            <Heart size={14} fill="#E88E83" color="#E88E83" />
          </motion.span>
          para quienes quieren estar presentes
        </span>
        <div className="footer-links">
          {LINKS.privacy ? <a href={LINKS.privacy}>Privacidad</a> : null}
          {LINKS.terms ? <a href={LINKS.terms}>Términos</a> : null}
          <span>© {new Date().getFullYear()} Lovber</span>
        </div>
      </div>
    </motion.footer>
  );
}
