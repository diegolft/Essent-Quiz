/** Máscara progressiva de WhatsApp, no máximo 11 dígitos. */
export function maskPhone(raw: string): string {
  const d = (raw || "").replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  const head = `(${d.slice(0, 2)}) `;
  if (d.length <= 6) return head + d.slice(2);
  if (d.length <= 10) return `${head}${d.slice(2, 6)}-${d.slice(6)}`;
  return `${head}${d.slice(2, 7)}-${d.slice(7)}`;
}

export function phoneDigits(masked: string): string {
  return (masked || "").replace(/\D/g, "");
}

/** Válido com DDD + número: 10 dígitos (fixo) ou 11 (celular). */
export function isPhoneValid(masked: string): boolean {
  const n = phoneDigits(masked).length;
  return n === 10 || n === 11;
}
