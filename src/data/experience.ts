export interface ExperienceItem {
  id: string;
  type: 'employment' | 'education' | 'teaching' | 'certification';
  title: string;
  organization: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  achievements?: string[];
  technologies?: string[];
  url?: string;
}

export const experience: ExperienceItem[] = [
  {
    id: 'teaching-2024',
    type: 'teaching',
    title: 'Instructor / Docente de Tecnología e Informática',
    organization: '[Institución Educativa]',
    location: '[Ciudad, País]',
    startDate: '2024-01',
    endDate: '2024-05',
    current: false,
    description:
      'Docencia en fundamentos de informática, ofimática avanzada y programación introductoria. Diseño de currículo, material didáctico y evaluaciones. Acompañamiento personalizado de estudiantes en su proceso de aprendizaje tecnológico.',
    responsibilities: [
      'Planeación de clases y diseño de programas de estudio',
      'Elaboración de material educativo (guías, presentaciones, ejercicios prácticos)',
      'Enseñanza de herramientas tecnológicas: Microsoft Office (Word, Excel, PowerPoint) avanzado',
      'Fundamentos de programación con Python: variables, control de flujo, funciones, estructuras de datos básicas',
      'Diseño y aplicación de actividades y evaluaciones formativas y sumativas',
      'Acompañamiento y tutoría individualizada de estudiantes',
      'Comunicación y explicación de conceptos técnicos complejos de forma accesible',
      'Gestión de aula virtual y plataformas LMS',
    ],
    achievements: [
      'Diseño e implementación de módulo introductorio a programación para 30+ estudiantes sin experiencia previa',
      'Creación de banco de ejercicios progresivos en Python con autoevaluación',
      'Mejora en métricas de retención y aprobación del curso',
      'Capacitación a colegas en uso de herramientas digitales para enseñanza híbrida',
    ],
    technologies: [
      'Python',
      'Microsoft Office',
      'LMS (Moodle/Classroom)',
      'Zoom/Teams',
      'GitHub Classroom',
    ],
  },
];

export const education = [
  {
    id: 'self-taught',
    type: 'education' as const,
    title: 'Desarrollo Full Stack Autodidacta + Proyectos Reales',
    organization: 'Aprendizaje continuo + Práctica en proyectos',
    startDate: '2021',
    endDate: undefined,
    current: true,
    description:
      'Formación práctica construyendo aplicaciones completas en producción. Enfoque en TypeScript, Angular, Node.js, MongoDB, GraphQL, arquitectura de software, testing, CI/CD y seguridad.',
    technologies: [
      'TypeScript',
      'Angular',
      'Node.js',
      'MongoDB',
      'GraphQL',
      'Docker',
      'GitHub Actions',
      'Clean Architecture',
      'Hexagonal Architecture',
    ],
  },
];

export const certifications = [
  {
    id: 'owasp-top10',
    type: 'certification' as const,
    title: 'OWASP Top 10 2023 - Fundamentos',
    organization: 'OWASP / Autoestudio certificado',
    startDate: '2024',
    description:
      'Comprensión de las 10 principales vulnerabilidades de aplicaciones web y mitigaciones.',
  },
  {
    id: 'secure-coding',
    type: 'certification' as const,
    title: 'Secure Coding Practices',
    organization: 'Autoestudio + Práctica en proyectos',
    startDate: '2024',
    description:
      'Validación de entrada, encoding de salida, autenticación segura, gestión de secretos, CSP, headers de seguridad.',
  },
];
