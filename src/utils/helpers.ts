import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string, locale = 'es-CO'): string {
  try {
    // Debe ser 'YYYY' o 'YYYY-MM'; cualquier otra cosa se devuelve tal cual
    // (Number('invalid') es NaN y no lanza excepción, por eso no basta el catch).
    const match = /^(\d{4})(?:-(\d{2}))?$/.exec(dateString.trim());
    if (!match) return dateString;

    const year = Number(match[1]);
    const month = match[2] ? Number(match[2]) : 1;
    if (month < 1 || month > 12) return dateString;

    const date = new Date(year, month - 1);
    if (Number.isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString(locale, { year: 'numeric', month: 'long' });
  } catch {
    return dateString;
  }
}

export function formatDateRange(start: string, end?: string, current = false): string {
  const startFormatted = formatDate(start);
  if (current || !end) {
    return `${startFormatted} – Presente`;
  }
  return `${startFormatted} – ${formatDate(end)}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  // Deja sitio para el '…' para no exceder `length` caracteres en total,
  // y corta en el último espacio para no partir una palabra por la mitad.
  const budget = Math.max(1, length - 1);
  const slice = text.slice(0, budget);
  const lastSpace = slice.lastIndexOf(' ');
  const base = lastSpace > 0 ? slice.slice(0, lastSpace) : slice;
  return base.trimEnd() + '…';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function getTechIcon(tech: string): string {
  const icons: Record<string, string> = {
    angular: 'angular',
    typescript: 'typescript',
    nodejs: 'nodejs',
    mongodb: 'mongodb',
    postgresql: 'postgresql',
    graphql: 'graphql',
    docker: 'docker',
    github: 'github',
    jwt: 'jwt',
    rest: 'rest',
    html: 'html5',
    css: 'css3',
    python: 'python',
    redis: 'redis',
    express: 'express',
    apollo: 'apollo',
    rxjs: 'rxjs',
    tailwind: 'tailwind',
    astro: 'astro',
  };
  const key = tech.toLowerCase().replace(/[.\s+]/g, '');
  return icons[key] || 'code';
}
