---
name: 'Restaurant Management System'
description: 'Aplicación web para gestionar y centralizar las operaciones de un restaurante.'
problem: 'Procesos operativos y administrativos que requieren centralización y mejor control de la información.'
solution: 'Plataforma web para gestionar productos, facturación, cocina y procesos administrativos desde una interfaz centralizada.'
technologies:
  - Angular
  - TypeScript
  - Node.js
  - MongoDB
  - REST API
architecture: 'Full Stack + API + MongoDB'
features:
  - 'Gestión de productos'
  - 'Facturación'
  - 'Gestión de pedidos'
  - 'Módulo de cocina'
  - 'Control del estado de preparación'
  - 'Gestión administrativa'
  - 'Gestión contable'
status: 'En desarrollo'
role: 'Full Stack Developer'
technicalChallenges:
  - 'Diseño de módulos independientes'
  - 'Integración Frontend + Backend'
  - 'Persistencia de información'
  - 'Gestión del flujo de pedidos'
  - 'Diseño de una interfaz orientada a operaciones rápidas'
startDate: '2025-01'
endDate: '2026-03'
github: 'https://github.com/John-454/restaurant-management'
images: []
featured: true
order: 2
---

## Restaurant Management System - Operaciones de Restaurante Centralizadas

Sistema integral para la gestión completa de un restaurante: desde la toma de pedidos hasta la facturación, pasando por el control de cocina y la administración.

### Problema

Los restaurantes suelen usar múltiples herramientas desconectadas (comandas en papel, Excel para inventario, software separado para facturación), lo que genera errores, lentitud y falta de visibilidad en tiempo real.

### Solución

Plataforma unificada que conecta salón, cocina y administración en tiempo real, optimizando el flujo de trabajo operativo.

### Arquitectura

- **Frontend**: Angular 17+, componentes standalone, signals, RxJS
- **Backend**: Node.js + Express, API REST
- **Base de datos**: MongoDB
- **Tiempo real**: WebSockets (Socket.io) para estados de pedido
- **Patrón**: Modular por dominio (Productos, Pedidos, Cocina, Facturación, Admin)

### Retos Técnicos Principales

1. **Diseño modular desacoplado**: Módulos independientes con contratos claros, shared kernel mínimo
2. **Flujo de pedidos en tiempo real**: WebSockets para sincronizar salón ↔ cocina, manejo de reconexión, estados optimistas
3. **Interfaz operativa rápida**: UX optimizada para pantallas táctiles, atajos de teclado, modo "cocina" fullscreen
4. **Consistencia de datos**: Transacciones distribuidas entre módulos (pedido → inventario → facturación)
5. **Escalabilidad horizontal**: Stateless backend, sesiones en Redis, preparación para multi-sucursal
