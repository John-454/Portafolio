---
name: 'Academic Management System'
description: 'Sistema web para gestionar matrícula, estudiantes, profesores, asignaturas, cursos y calificaciones en instituciones educativas.'
problem: 'Procesos académicos que requieren centralizar la información de estudiantes, docentes, cursos, matrículas y calificaciones.'
solution: 'Aplicación web orientada a sistematizar la gestión académica y facilitar el registro y consulta de información educativa.'
result: 'Redujo un 98% del problema planteado, atendiendo a los usuarios de manera eficaz.'
technologies:
  - Angular
  - TypeScript
  - Node.js
  - MongoDB
  - GraphQL
  - Apollo
architecture: 'Hexagonal Architecture'
features:
  - 'Gestión de estudiantes'
  - 'Gestión de profesores'
  - 'Gestión de cursos'
  - 'Gestión de asignaturas'
  - 'Matrículas'
  - 'Registro de calificaciones'
  - 'Generación de boletines'
  - 'Consultas mediante GraphQL'
status: 'En desarrollo'
role: 'Full Stack Developer'
technicalChallenges:
  - 'Implementación de arquitectura hexagonal'
  - 'Diseño del modelo de dominio'
  - 'Integración GraphQL + MongoDB'
  - 'Separación de responsabilidades'
  - 'Gestión de relaciones entre entidades académicas'
startDate: '2023'
endDate: '2025-10'
github: 'https://github.com/John-454/academic-management'
images: []
featured: true
order: 3
---

## Academic Management System - Gestión Académica Integral

Sistema completo para instituciones educativas que cubre el ciclo completo: matrícula, gestión de estudiantes/profesores, asignación de cursos/asignaturas, calificaciones y generación de boletines.

### Problema

Las instituciones educativas suelen gestionar procesos académicos en sistemas fragmentados o manuales, dificultando el seguimiento del rendimiento estudiantil, la planificación curricular y la generación de documentos oficiales.

### Solución

Plataforma centralizada que modela el dominio académico con reglas de negocio claras, exponiendo una API GraphQL flexible para consultas complejas y generación de reportes.

### Arquitectura

**Hexagonal Architecture (Ports & Adapters)**:

- **Domain**: Entidades (Student, Teacher, Course, Subject, Enrollment, Grade), Value Objects, Domain Events, Repositories (ports)
- **Application**: Use Cases (Commands/Queries), DTOs, Validators
- **Infrastructure**: MongoDB Repositories, GraphQL Resolvers (Apollo Server), Express Adapters
- **Interfaces**: Angular Frontend, GraphQL Playground

### Retos Técnicos Principales

1. **Arquitectura Hexagonal pura**: Separación estricta dominio/infraestructura, testing de casos de uso sin BD, inyección de dependencias manual
2. **Modelo de dominio rico**: Entidades con invariantes, value objects (Email, GradeValue, AcademicPeriod), agregados consistentes
3. **GraphQL + MongoDB**: DataLoader para N+1, proyecciones optimizadas, filtros dinámicos, paginación cursor-based
4. **Relaciones académicas complejas**: Matrículas con prerrequisitos, horarios sin conflictos, historial de calificaciones inmutable
5. **Generación de boletines**: PDFs oficiales con firmas digitales, plantillas configurables, rendimiento batch
