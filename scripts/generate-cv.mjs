/**
 * Genera public/cv.pdf a partir de los MISMOS datos que consume el sitio
 * (src/data/*.ts y src/content/projects/*.md). Sin duplicar información.
 *
 * Uso: npm run cv
 *
 * Implementa un writer PDF 1.4 mínimo (fuentes Type1 Helvetica con
 * WinAnsiEncoding => acentos y signos españoles se renderizan bien).
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import ts from 'typescript';

const ROOT = process.cwd();
const PUBLIC = path.join(ROOT, 'public');

/* ------------------------------------------------------------------ *
 * Carga de datos (transpila los .ts en memoria; no requieren Node 22)
 * ------------------------------------------------------------------ */
async function loadTsModule(relPath) {
  const source = await readFile(path.join(ROOT, relPath), 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
  });
  const url = `data:text/javascript;base64,${Buffer.from(outputText, 'utf8').toString('base64')}`;
  return import(url);
}

/** Frontmatter mínimo (clave: valor) para los proyectos en Markdown. */
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.+)$/);
    if (!kv) continue;
    const value = kv[2].trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      data[kv[1]] = value
        .slice(1, -1)
        .split(',')
        .map((v) => v.trim().replace(/^['"]|['"]$/g, ''))
        .filter(Boolean);
    } else {
      data[kv[1]] = value.replace(/^['"]|['"]$/g, '');
    }
  }
  return data;
}

async function loadProjects() {
  const dir = path.join(ROOT, 'src/content/projects');
  const { readdir } = await import('node:fs/promises');
  const files = (await readdir(dir)).filter((f) => f.endsWith('.md'));
  const projects = [];
  for (const file of files) {
    const raw = await readFile(path.join(dir, file), 'utf8');
    projects.push(parseFrontmatter(raw));
  }
  return projects.sort(
    (a, b) => Number(b.featured) - Number(a.featured) || Number(a.order) - Number(b.order)
  );
}

/* ------------------------------------------------------------------ *
 * Writer PDF mínimo
 * ------------------------------------------------------------------ */
const A4 = { w: 595.28, h: 841.89 };
const MARGIN = 48;
// Coordenadas PDF: y=0 abajo. El contenido vive entre BOTTOM y (A4.h - MARGIN).
const PAGE_BOTTOM = MARGIN;
const PAGE_TOP = A4.h - MARGIN;

const COLORS = {
  brand: [0x2e / 255, 0x47 / 255, 0xc4 / 255],
  ink: [0.09, 0.11, 0.16],
  muted: [0.35, 0.39, 0.46],
  rule: [0.85, 0.87, 0.9],
  accent: [0x05 / 255, 0x96 / 255, 0x69 / 255],
};

// Factores de ancho aproximados por fuente (Helvetica) para el word-wrap.
const WIDTH_FACTOR = { F1: 0.5, F2: 0.535, F3: 0.475 }; // regular, bold, oblique

class PdfWriter {
  constructor() {
    this.pages = [];
    this.ops = null;
    this.y = 0;
    this.addPage();
  }

  addPage() {
    this.ops = [];
    this.pages.push(this.ops);
    this.y = PAGE_TOP;
  }

  /** Salta espacio vertical; pagina automáticamente. */
  space(h) {
    this.y -= h;
    if (this.y < PAGE_BOTTOM) this.addPage();
  }

  setFont(font, size, color) {
    this.ops.push(`${font} ${size} Tf`);
    const [r, g, b] = color;
    this.ops.push(`${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} rg`);
  }

  textWidth(str, font, size) {
    return str.length * size * WIDTH_FACTOR[font];
  }

  /** Escribe una línea en la posición actual de cursor (x desde el margen). */
  line(str, { font = 'F1', size = 10, color = COLORS.ink, x = MARGIN, dx = 0 } = {}) {
    this.setFont(font, size, color);
    this.ops.push(`BT ${x + dx} ${this.y.toFixed(2)} Td (${escape(str)}) Tj ET`);
  }

  /** Texto con salto de línea automático. Devuelve la nueva posición y. */
  paragraph(
    str,
    {
      font = 'F1',
      size = 10,
      color = COLORS.ink,
      leading = size * 1.45,
      width = A4.w - MARGIN * 2,
      x = MARGIN,
      dx = 0,
    } = {}
  ) {
    const maxWidth = width - dx;
    const words = str.split(/\s+/);
    let current = '';
    const lines = [];
    for (const word of words) {
      const test = current ? `${current} ${word}` : word;
      if (this.textWidth(test, font, size) > maxWidth && current) {
        lines.push(current);
        current = word;
      } else {
        current = test;
      }
    }
    if (current) lines.push(current);

    for (const text of lines) {
      if (this.y - leading <= PAGE_BOTTOM) this.addPage();
      this.y -= leading;
      this.line(text, { font, size, color, x, dx });
    }
    return lines.length;
  }

  bullet(str, opts = {}) {
    const size = opts.size ?? 9.5;
    if (this.y - size * 1.5 <= PAGE_BOTTOM) this.addPage();
    this.y -= size * 1.5;
    this.setFont('F2', size, COLORS.brand);
    this.ops.push(`BT ${(MARGIN + 4).toFixed(2)} ${this.y.toFixed(2)} Td (\u2022) Tj ET`);
    this.paragraph(str, { ...opts, size, x: MARGIN + 16, dx: 0, width: A4.w - MARGIN * 2 - 16 });
  }

  rule(color = COLORS.rule, thickness = 0.8, width = A4.w - MARGIN * 2) {
    const [r, g, b] = color;
    this.ops.push(
      `${r.toFixed(3)} ${g.toFixed(3)} ${b.toFixed(3)} RG ${thickness} w ` +
        `${MARGIN} ${this.y.toFixed(2)} m ${(MARGIN + width).toFixed(2)} ${this.y.toFixed(2)} l S`
    );
    this.y -= 8;
  }

  heading(text) {
    this.space(14);
    this.setFont('F2', 13, COLORS.brand);
    this.y -= 13;
    this.ops.push(`BT ${MARGIN} ${this.y.toFixed(2)} Td (${escape(text.toUpperCase())}) Tj ET`);
    this.y -= 6;
    this.rule(COLORS.brand, 1.4);
  }

  /** Serializa a un buffer PDF válido con xref correcto. */
  toBuffer() {
    const objects = [];
    const add = (body) => objects.push(body);

    const fontRegular = add(
      `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>`
    );
    const fontBold = add(
      `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>`
    );
    const fontItalic = add(
      `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Oblique /Encoding /WinAnsiEncoding >>`
    );
    const fontIds = { F1: fontRegular, F2: fontBold, F3: fontItalic };

    const fontDict = Object.entries(fontIds)
      .map(([k, id]) => `/${k} ${id} 0 R`)
      .join(' ');

    const contentIds = [];
    const pageIds = [];

    for (const ops of this.pages) {
      const stream = ops.join('\n');
      const contentId = add(
        `<< /Length ${Buffer.byteLength(stream, 'latin1')} >>\nstream\n${stream}\nendstream`
      );
      contentIds.push(contentId);
    }
    const catalogId = add('PLACEHOLDER_CATALOG');
    const realPagesId = add('PLACEHOLDER_PAGES');
    for (const contentId of contentIds) {
      pageIds.push(
        add(
          `<< /Type /Page /Parent ${realPagesId} 0 R /MediaBox [0 0 ${A4.w} ${A4.h}] ` +
            `/Resources << /Font << ${fontDict} >> >> /Contents ${contentId} 0 R >>`
        )
      );
    }
    objects[catalogId - 1] = `<< /Type /Catalog /Pages ${realPagesId} 0 R >>`;
    objects[realPagesId - 1] =
      `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`;

    let out = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
    const offsets = [0];
    objects.forEach((body, i) => {
      offsets.push(Buffer.byteLength(out, 'latin1'));
      out += `${i + 1} 0 obj\n${body}\nendobj\n`;
    });
    const xrefPos = Buffer.byteLength(out, 'latin1');
    out += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (let i = 1; i <= objects.length; i++) {
      out += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
    }
    out += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`;

    return Buffer.from(out, 'latin1');
  }
}

/** Escapa paréntesis, backslashes y codifica a WinAnsi (latin1 suficiente para español). */
function escape(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/\u2013|\u2014/g, '-')
    .replace(/\u2022/g, '-')
    .replace(/[^\x20-\x7e\xA0-\xFF]/g, '?');
}

/* ------------------------------------------------------------------ *
 * Contenido del CV
 * ------------------------------------------------------------------ */
async function main() {
  const personal = await loadTsModule('src/data/personal.ts');
  const skillsMod = await loadTsModule('src/data/skills.ts');
  const expMod = await loadTsModule('src/data/experience.ts');
  const projects = await loadProjects();

  const { personalInfo } = personal;
  const { skills, skillCategories } = skillsMod;
  const { experience, education, certifications } = expMod;

  const pdf = new PdfWriter();

  // ---------- Encabezado ----------
  pdf.setFont('F2', 30, COLORS.ink);
  pdf.y -= 30;
  pdf.ops.push(`BT ${MARGIN} ${pdf.y.toFixed(2)} Td (${escape(personalInfo.name)}) Tj ET`);

  pdf.space(8);
  pdf.paragraph(personalInfo.tagline, { font: 'F3', size: 11.5, color: COLORS.brand, leading: 15 });

  pdf.space(6);
  const contact = [
    personalInfo.email,
    personalInfo.github.replace('https://', ''),
    personalInfo.linkedin.replace('https://www.', '').replace('https://', ''),
    personalInfo.location,
    'johnchitan.dev',
  ].join('   |   ');
  pdf.paragraph(contact, { font: 'F1', size: 9.5, color: COLORS.muted, leading: 13 });
  pdf.rule(COLORS.brand, 1.6);

  // ---------- Perfil ----------
  pdf.heading('Perfil profesional');
  const profile = personalInfo.shortBio.replace(/\*\*/g, '');
  pdf.paragraph(profile, { size: 10 });

  // ---------- Experiencia ----------
  pdf.heading('Experiencia');
  for (const item of experience) {
    const range = `${item.startDate}${item.endDate ? ` – ${item.endDate}` : ''}`;
    pdf.space(6);
    pdf.y -= 12;
    pdf.setFont('F2', 11, COLORS.ink);
    pdf.ops.push(`BT ${MARGIN} ${pdf.y.toFixed(2)} Td (${escape(titleCase(item.title))}) Tj ET`);
    const rangeX = A4.w - MARGIN - pdf.textWidth(range, 'F1', 9.5);
    pdf.setFont('F1', 9.5, COLORS.muted);
    pdf.ops.push(`BT ${rangeX.toFixed(2)} ${pdf.y.toFixed(2)} Td (${escape(range)}) Tj ET`);

    pdf.space(3);
    pdf.paragraph(
      `${item.organization}${item.location ? ` — ${item.location}` : ''} · ${item.description}`,
      {
        size: 9.5,
        color: COLORS.muted,
        leading: 13,
      }
    );
    pdf.space(3);
    for (const r of item.responsibilities.slice(0, 6)) pdf.bullet(r);
    for (const a of item.achievements ?? []) pdf.bullet(a);
    if (item.technologies?.length) {
      pdf.space(2);
      pdf.paragraph(`Stack: ${item.technologies.join(', ')}`, {
        font: 'F3',
        size: 9,
        color: COLORS.muted,
        leading: 12,
      });
    }
  }

  // ---------- Formación ----------
  pdf.heading('Formación');
  for (const item of education) {
    pdf.space(4);
    pdf.y -= 12;
    pdf.setFont('F2', 11, COLORS.ink);
    pdf.ops.push(`BT ${MARGIN} ${pdf.y.toFixed(2)} Td (${escape(titleCase(item.title))}) Tj ET`);
    const range = `${item.startDate} – ${item.current ? 'Presente' : (item.endDate ?? 'Presente')}`;
    const rangeX = A4.w - MARGIN - pdf.textWidth(range, 'F1', 9.5);
    pdf.setFont('F1', 9.5, COLORS.muted);
    pdf.ops.push(`BT ${rangeX.toFixed(2)} ${pdf.y.toFixed(2)} Td (${escape(range)}) Tj ET`);
    pdf.space(3);
    pdf.paragraph(`${item.organization}. ${item.description.replace(/\*\*/g, '')}`, {
      size: 9.5,
      color: COLORS.muted,
      leading: 13,
    });
  }

  // ---------- Proyectos destacados ----------
  pdf.heading('Proyectos destacados');
  for (const project of projects.slice(0, 4)) {
    pdf.space(5);
    pdf.y -= 12;
    pdf.setFont('F2', 11, COLORS.ink);
    pdf.ops.push(`BT ${MARGIN} ${pdf.y.toFixed(2)} Td (${escape(project.name)}) Tj ET`);
    pdf.space(3);
    pdf.paragraph(project.description, { size: 9.5, leading: 13 });
    if (project.technologies?.length) {
      pdf.space(1);
      pdf.paragraph(project.technologies.join(' · '), {
        font: 'F3',
        size: 9,
        color: COLORS.brand,
        leading: 12,
      });
    }
  }

  // ---------- Tecnologías ----------
  pdf.heading('Tecnologías clave');
  const rank = { expert: 5, advanced: 4, intermediate: 3, beginner: 2, learning: 1 };
  for (const cat of skillCategories) {
    const items = skills
      .filter((s) => s.category === cat.key && (rank[s.level] ?? 0) >= 3)
      .sort((a, b) => (rank[b.level] ?? 0) - (rank[a.level] ?? 0));
    if (!items.length) continue;
    pdf.space(4);
    pdf.y -= 11;
    pdf.setFont('F2', 10, COLORS.ink);
    pdf.ops.push(
      `BT ${MARGIN} ${pdf.y.toFixed(2)} Td (${escape(cat.label.replace(' (Learning)', ''))}) Tj ET`
    );
    pdf.space(1);
    pdf.paragraph(items.map((s) => s.name).join('  ·  '), {
      size: 9,
      color: COLORS.muted,
      leading: 12,
    });
  }

  // ---------- Certificaciones ----------
  if (certifications?.length) {
    pdf.heading('Certificaciones');
    for (const cert of certifications) {
      pdf.space(3);
      pdf.bullet(`${titleCase(cert.title)} — ${cert.organization} (${cert.startDate})`, {
        size: 9.5,
      });
    }
  }

  // ---------- Cierre ----------
  pdf.space(14);
  pdf.rule();
  pdf.paragraph(
    `Disponibilidad: ${personalInfo.availability}. Documento generado automáticamente desde johnchitan.dev.`,
    { font: 'F3', size: 8.5, color: COLORS.muted, leading: 12 }
  );

  await mkdir(PUBLIC, { recursive: true });
  const buffer = pdf.toBuffer();
  await writeFile(path.join(PUBLIC, 'cv.pdf'), buffer);
  console.log(
    `✓ public/cv.pdf generado (${(buffer.length / 1024).toFixed(1)} KB, ${pdf.pages.length} página(s))`
  );
}

function titleCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

await main();
