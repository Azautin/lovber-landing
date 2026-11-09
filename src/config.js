/**
 * Datos editables de la landing.
 *
 * PLANES: Gratis y dos planes de pago mensuales (USD 5 y USD 10). Por ahora no se
 * publica qué incluye cada uno. Los nombres son provisionales y se cambian aquí.
 * Antes de publicar, que coincida con los productos reales de App Store, Google Play
 * y RevenueCat.
 */
export const PLANS = {
  currency: "USD",
  tiers: [
    { id: "free", name: "Gratis", monthly: 0 },
    { id: "plus", name: "Lovber Plus", monthly: 5 },
    { id: "pro", name: "Lovber Pro", monthly: 10 },
  ],
};

const env = import.meta.env;
export const LINKS = {
  waitlist: env.VITE_WAITLIST_URL || "",
  appStore: env.VITE_APP_STORE_URL || "",
  playStore: env.VITE_PLAY_STORE_URL || "",
  privacy: env.VITE_PRIVACY_URL || "",
  terms: env.VITE_TERMS_URL || "",
};

export const money = (n) => `USD ${Number.isInteger(n) ? n : n.toFixed(2).replace(".", ",")}`;
