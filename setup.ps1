<# 
.SYNOPSIS
    Setup script for portfolio project
.DESCRIPTION
    Installs dependencies, creates .env.local, runs initial checks
#>

Write-Host "🚀 Configurando portfolio de John Chitan..." -ForegroundColor Cyan

# Check Node version
$nodeVersion = (node -v).TrimStart('v').Split('.')[0]
if ([int]$nodeVersion -lt 20) {
    Write-Host "❌ Se requiere Node.js 20+. Versión actual: $(node -v)" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Node.js $(node -v) detectado" -ForegroundColor Green

# Install dependencies
Write-Host "📦 Instalando dependencias..." -ForegroundColor Cyan
npm ci

# Create .env.local if not exists
if (-not (Test-Path ".env.local")) {
    Write-Host "📝 Creando .env.local..." -ForegroundColor Cyan
    @"
# Configuración local
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_FORMSPREE_ENDPOINT=
"@ | Out-File -FilePath ".env.local" -Encoding utf8
}

# Initialize git hooks (optional)
if (Test-Path ".git") {
    Write-Host "🔧 Configurando git hooks..." -ForegroundColor Cyan
    npx husky install 2>$null | Out-Null
}

# Run initial checks
Write-Host "🔍 Ejecutando verificaciones iniciales..." -ForegroundColor Cyan
npm run format:check 2>$null || Write-Host "⚠️  Ejecuta 'npm run format' para formatear" -ForegroundColor Yellow
npm run lint 2>$null || Write-Host "⚠️  Ejecuta 'npm run lint:fix' para corregir" -ForegroundColor Yellow
npm run typecheck 2>$null || Write-Host "⚠️  Revisa errores de TypeScript" -ForegroundColor Yellow
npm run test 2>$null || Write-Host "⚠️  Revisa tests" -ForegroundColor Yellow

Write-Host ""
Write-Host "✨ ¡Configuración completada!" -ForegroundColor Green
Write-Host ""
Write-Host "Comandos útiles:" -ForegroundColor Cyan
Write-Host "  npm run dev          # Desarrollo local"
Write-Host "  npm run build        # Build de producción"
Write-Host "  npm run preview      # Preview del build"
Write-Host "  npm run test         # Tests"
Write-Host ""
Write-Host "📖 Lee README.md para más información" -ForegroundColor Cyan