export function formatPhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function buildWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/55${formatPhone(phone)}?text=${encodeURIComponent(message)}`;
}

export function formatPrice(price: string): string {
  return price;
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

export function cleanFotos(fotos: string[] | undefined): string[] {
  if (!fotos || !Array.isArray(fotos)) return [];
  return fotos.filter((f) => typeof f === 'string' && f.trim().startsWith('http'));
}
