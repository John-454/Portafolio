export function getSecurityHeaders(): Record<string, string> {
  return {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
    'X-DNS-Prefetch-Control': 'on',
    'Cross-Origin-Opener-Policy': 'same-origin',
    'Cross-Origin-Resource-Policy': 'same-origin',
  };
}

export function getCSPHeader(nonce?: string): string {
  const nonceAttr = nonce ? `'nonce-${nonce}'` : '';
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline' ${nonceAttr} https://cdn.jsdelivr.net https://unpkg.com`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://api.github.com https://avatars.githubusercontent.com https://formspree.io",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self' https://formspree.io",
    "object-src 'none'",
  ].join('; ');
}

export function sanitizeHtml(html: string): string {
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '');
}

export function validateUrl(url: string, allowedDomains?: string[]): boolean {
  try {
    const parsed = new URL(url);
    if (allowedDomains && allowedDomains.length > 0) {
      return allowedDomains.some((domain) => parsed.hostname.endsWith(domain));
    }
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export function generateNonce(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, '0')).join('');
}
