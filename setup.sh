#!/bin/bash
# Setup script for new portfolio project
# Run: chmod +x setup.sh && ./setup.sh

set -e

echo "🚀 Configurando portfolio de John Chitan..."

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
  echo "❌ Se requiere Node.js 20+. Versión actual: $(node -v)"
  exit 1
fi

echo "✅ Node.js $(node -v) detectado"

# Install dependencies
echo "📦 Instalando dependencias..."
npm ci

# Create .env.local if not exists
if [ ! -f .env.local ]; then
  echo "📝 Creando .env.local..."
  cat > .env.local << 'EOF'
# Configuración local
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_FORMSPREE_ENDPOINT=
EOF
fi

# Initialize git hooks (optional)
if [ -d .git ]; then
  echo "🔧 Configurando git hooks..."
  npx husky install 2>/dev/null || true
fi

# Run initial checks
echo "🔍 Ejecutando verificaciones iniciales..."
npm run format:check || echo "⚠️  Ejecuta 'npm run format' para formatear"
npm run lint || echo "⚠️  Ejecuta 'npm run lint:fix' para corregir"
npm run typecheck || echo "⚠️  Revisa errores de TypeScript"
npm run test || echo "⚠️  Revisa tests"

echo ""
echo "✨ ¡Configuración completada!"
echo ""
echo "Comandos útiles:"
echo "  npm run dev          # Desarrollo local"
echo "  npm run build        # Build de producción"
echo "  npm run preview      # Preview del build"
echo "  npm run test         # Tests"
echo ""
echo "📖 Lee README.md para más información"