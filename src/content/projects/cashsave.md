---
name: 'CashSave'
description: 'Aplicación web para la gestión y control de las finanzas de pequeños negocios, incluyendo ventas, facturación, abonos, gastos y reportes.'
problem: 'Negocios que necesitan centralizar el control de sus ventas, facturación, pagos, gastos y resultados financieros.'
solution: 'Plataforma web que centraliza la gestión financiera y proporciona información organizada para facilitar el seguimiento y la toma de decisiones.'
result: 'Redujo un 95% del problema de control financiero planteado: ventas, gastos y reportes centralizados en un solo lugar.'
technologies:
  - Angular
  - TypeScript
  - Node.js
  - MongoDB
  - REST API
  - JWT
  - PDF
architecture: 'Full Stack + API REST + MongoDB'
features:
  - 'Autenticación y autorización'
  - 'Gestión de clientes'
  - 'Facturación'
  - 'Historial de ventas'
  - 'Gestión de abonos'
  - 'Gestión de gastos'
  - 'Contabilidad'
  - 'Resúmenes diarios y mensuales'
  - 'Generación de documentos PDF'
status: 'En producción'
role: 'Full Stack Developer'
technicalChallenges:
  - 'Gestión de autenticación mediante JWT'
  - 'Integración Angular + API Node.js'
  - 'Persistencia y consulta de información en MongoDB'
  - 'Generación de documentos PDF'
  - 'Manejo de fechas y resúmenes financieros'
startDate: '2024'
endDate: '2025'
github: 'https://github.com/John-454/cashsave'
images: []
featured: true
order: 1
---

## CashSave - Gestión Financiera para Pequeños Negocios

CashSave es una aplicación web completa diseñada para que pequeños negocios puedan gestionar sus finanzas de forma centralizada, automatizando procesos de facturación, control de pagos, gestión de gastos y generación de reportes financieros.

### Problema

Muchos pequeños negocios llevan sus cuentas en hojas de cálculo o papel, lo que genera errores, pérdida de información y dificultad para tomar decisiones basadas en datos reales.

### Solución

Una plataforma web que integra todas las operaciones financieras en un solo lugar: ventas, facturación, cobros (abonos), gastos, contabilidad básica y reportes visuales.

### Arquitectura

- **Frontend**: Angular 17+ con TypeScript, standalone components, signals
- **Backend**: Node.js + Express, API RESTful
- **Base de datos**: MongoDB con Mongoose
- **Autenticación**: JWT con refresh tokens
- **Documentos**: Generación PDF con pdfmake
- **Despliegue**: Docker + VPS

### Retos Técnicos Principales

1. **Autenticación JWT robusta**: Implementación de access/refresh tokens, rotación, revocación y manejo de expiración silenciosa
2. **Sincronización Angular-Node**: Tipos compartidos, manejo de errores tipado, interceptores HTTP
3. **Consultas financieras en MongoDB**: Agregaciones complejas para resúmenes diarios/mensuales, pipelines de facturación
4. **Generación PDF**: Layouts dinámicos, fuentes personalizadas, rendimiento en servidor
5. **Manejo de zonas horarias y fechas**: Consistencia entre cliente/servidor/BD para reportes financieros
