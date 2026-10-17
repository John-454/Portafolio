/**
 * Genera los assets estáticos faltantes del portafolio a partir de public/favicon.svg:
 *   - public/favicon-16.png, public/favicon-32.png   (favicons transparentes)
 *   - public/apple-touch-icon.png                    (180x180, fondo brand)
 *   - public/icons/icon-{72..512}.png                (PWA, "any maskable")
 *   - public/images/og-portfolio.png                 (1200x630 Open Graph)
 *
 * Uso: npm run assets
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, 'public');
const BRAND = '#2e47c4';
const BRAND_DARK = '#191f4a';

/** Extrae el "glyph" (hexágono + círculo) del favicon y permite recolorearlo. */
async function glyph(stroke) {
  const svg = await readFile(path.join(PUBLIC, 'favicon.svg'), 'utf8');
  return svg.replace(/<svg([^>]*)>/, '<svg$1>').replace(/#2e47c4/g, stroke);
}

/** Compone fondo de color + glyph centrado en un lienzo de `size` px. */
function iconSvg(size, { background, stroke, scale }) {
  // glyph original mide 32x32 en su viewBox
  const drawn = 32 * scale;
  const offset = (size - drawn) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="${size}" height="${size}" fill="${background}"/>
  <svg x="${offset}" y="${offset}" width="${drawn}" height="${drawn}" viewBox="0 0 32 32">
    <path d="M16 2L4 8v16l12 6 12-6V8L16 2zm0 2.5l9.5 4.75v10.5L16 27.5 6.5 22.75V12.25L16 4.5z"
          stroke="${stroke}" stroke-width="2" fill="none"/>
    <circle cx="16" cy="16" r="4" fill="${stroke}"/>
  </svg>
</svg>`;
}

async function generateFavicons() {
  const transparentGlyph = await glyph('#2e47c4');
  for (const size of [16, 32]) {
    const png = await sharp(Buffer.from(transparentGlyph), { density: 300 * (32 / size) })
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toBuffer();
    await writeFile(path.join(PUBLIC, `favicon-${size}.png`), png);
    console.log(`  ✓ favicon-${size}.png (${png.length} B)`);
  }
}

async function generateAppleTouchIcon() {
  // iOS ignora la transparencia: fondo brand + glyph blanco con safe area.
  const size = 180;
  const png = await sharp(
    Buffer.from(
      iconSvg(size, {
        background: BRAND,
        stroke: '#ffffff',
        scale: 3.5, // 112px de glyph sobre 180px -> radio 56px, dentro del safe area
      })
    )
  )
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(path.join(PUBLIC, 'apple-touch-icon.png'), png);
  console.log(`  ✓ apple-touch-icon.png (${png.length} B)`);
}

async function generatePwaIcons() {
  const dir = path.join(PUBLIC, 'icons');
  await mkdir(dir, { recursive: true });
  for (const size of [72, 96, 128, 144, 152, 192, 384, 512]) {
    const png = await sharp(
      Buffer.from(
        iconSvg(size, {
          background: BRAND,
          stroke: '#ffffff',
          scale: 3.5, // glyph al 35% del lienzo => dentro del círculo maskable (40%)
        })
      )
    )
      .png({ compressionLevel: 9 })
      .toBuffer();
    await writeFile(path.join(dir, `icon-${size}.png`), png);
    console.log(`  ✓ icons/icon-${size}.png (${png.length} B)`);
  }
}

async function generateOgImage() {
  const W = 1200;
  const H = 630;
  const chips = ['TypeScript', 'Angular', 'Node.js', 'GraphQL', 'Docker', 'AppSec'];
  const chipGap = 16;
  const chipFontSize = 20;
  const chipPadX = 22;
  // ancho aproximado de cada chip: padding + ~11.5px por carácter a 20px
  const chipWidths = chips.map((c) => chipPadX * 2 + c.length * chipFontSize * 0.575);
  const totalChips = chipWidths.reduce((a, b) => a + b, 0) + chipGap * (chips.length - 1);
  let chipX = 72;
  const chipMarkup = chips
    .map((label, i) => {
      const w = chipWidths[i];
      const item = `<rect x="${chipX}" y="500" width="${w}" height="46" rx="23"
        fill="#ffffff" fill-opacity="0.10" stroke="#ffffff" stroke-opacity="0.22"/>
      <text x="${chipX + chipPadX}" y="529" font-family="Helvetica, Arial, sans-serif"
        font-size="${chipFontSize}" font-weight="bold" fill="#e0ebff">${label}</text>`;
      chipX += w + chipGap;
      return item;
    })
    .join('\n  ');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND}"/>
      <stop offset="55%" stop-color="${BRAND_DARK}"/>
      <stop offset="100%" stop-color="#0b1120"/>
    </linearGradient>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#3d5ee6"/>
      <stop offset="100%" stop-color="#10b981"/>
    </linearGradient>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <circle cx="1080" cy="90" r="240" fill="#ffffff" fill-opacity="0.05"/>
  <circle cx="140" cy="600" r="180" fill="#10b981" fill-opacity="0.10"/>
  <path d="M760 630 L1200 190 L1200 630 Z" fill="#ffffff" fill-opacity="0.04"/>

  <!-- Logo -->
  <g transform="translate(72 72) scale(4)">
    <path d="M16 2L4 8v16l12 6 12-6V8L16 2zm0 2.5l9.5 4.75v10.5L16 27.5 6.5 22.75V12.25L16 4.5z"
          stroke="#ffffff" stroke-width="2" fill="none"/>
    <circle cx="16" cy="16" r="4" fill="#ffffff"/>
  </g>
  <text x="220" y="130" font-family="Helvetica, Arial, sans-serif" font-size="34"
        font-weight="bold" fill="#ffffff" letter-spacing="4">JOHN CHITAN</text>

  <!-- Titular -->
  <text x="72" y="300" font-family="Helvetica, Arial, sans-serif" font-size="76"
        font-weight="bold" fill="#ffffff">Full Stack Developer</text>
  <rect x="72" y="330" width="320" height="8" rx="4" fill="url(#accent)"/>
  <text x="72" y="410" font-family="Helvetica, Arial, sans-serif" font-size="34"
        font-weight="normal" fill="#c7d9fe">Building Secure &amp; Scalable Web Applications</text>

  <!-- Chips de stack -->
  ${chipMarkup}

  <!-- Dominio -->
  <text x="1128" y="529" text-anchor="end" font-family="Helvetica, Arial, sans-serif"
        font-size="22" font-weight="bold" fill="#6ee7b7">johnchitan.dev</text>
</svg>`;

  const outDir = path.join(PUBLIC, 'images');
  await mkdir(outDir, { recursive: true });
  const png = await sharp(Buffer.from(svg), { density: 96 })
    .resize(W, H)
    .png({ compressionLevel: 9 })
    .toBuffer();
  await writeFile(path.join(outDir, 'og-portfolio.png'), png);
  console.log(
    `  ✓ images/og-portfolio.png (${(png.length / 1024).toFixed(1)} KB, ${totalChips > 0 ? 'ok' : ''})`
  );
}

console.log('→ Generando assets estáticos…');
if (!existsSync(path.join(PUBLIC, 'favicon.svg'))) {
  console.error('  ✗ No se encontró public/favicon.svg');
  process.exit(1);
}
await generateFavicons();
await generateAppleTouchIcon();
await generatePwaIcons();
await generateOgImage();
console.log('✓ Listo.');
