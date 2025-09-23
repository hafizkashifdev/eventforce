# Event Force - Start All Applications
# This script will start the backend, frontend, and admin dashboard

Write-Host "🚀 Starting Event Force Applications..." -ForegroundColor Green
Write-Host ""

# Check if Node.js is installed
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed. Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Function to check if a port is in use
function Test-Port {
    param([int]$Port)
    try {
        $connection = New-Object System.Net.Sockets.TcpClient
        $connection.Connect("localhost", $Port)
        $connection.Close()
        return $true
    } catch {
        return $false
    }
}

# Check if required ports are available
$ports = @(3000, 3001, 5173)
foreach ($port in $ports) {
    if (Test-Port $port) {
        Write-Host "⚠️  Port $port is already in use. Please free it up first." -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "📋 Starting applications in the following order:" -ForegroundColor Cyan
Write-Host "1. Backend API (Port 3001)"
Write-Host "2. Frontend Website (Port 3000)"
Write-Host "3. Admin Dashboard (Port 5173)"
Write-Host ""

# Start Backend
Write-Host "🔧 Starting Backend API..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; Write-Host 'Starting Backend API...' -ForegroundColor Green; npm run start:dev"

# Wait for backend to start
Write-Host "⏳ Waiting for backend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 10

# Check if backend is running
if (Test-Port 3001) {
    Write-Host "✅ Backend API is running on http://localhost:3001" -ForegroundColor Green
} else {
    Write-Host "❌ Backend API failed to start" -ForegroundColor Red
}

# Start Frontend
Write-Host "🌐 Starting Frontend Website..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd ..; Write-Host 'Starting Frontend Website...' -ForegroundColor Green; npm run dev"

# Wait for frontend to start
Write-Host "⏳ Waiting for frontend to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

# Check if frontend is running
if (Test-Port 3000) {
    Write-Host "✅ Frontend Website is running on http://localhost:3000" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend Website failed to start" -ForegroundColor Red
}

# Start Admin Dashboard
Write-Host "📊 Starting Admin Dashboard..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd admin-dashboard; Write-Host 'Starting Admin Dashboard...' -ForegroundColor Green; npm run dev"

# Wait for admin dashboard to start
Write-Host "⏳ Waiting for admin dashboard to start..." -ForegroundColor Yellow
Start-Sleep -Seconds 8

# Check if admin dashboard is running
if (Test-Port 5173) {
    Write-Host "✅ Admin Dashboard is running on http://localhost:5173" -ForegroundColor Green
} else {
    Write-Host "❌ Admin Dashboard failed to start" -ForegroundColor Red
}

Write-Host ""
Write-Host "🎉 All applications are starting!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Application URLs:" -ForegroundColor Cyan
Write-Host "   Frontend Website:  http://localhost:3000" -ForegroundColor White
Write-Host "   Backend API:       http://localhost:3001" -ForegroundColor White
Write-Host "   API Documentation: http://localhost:3001/api/docs" -ForegroundColor White
Write-Host "   Admin Dashboard:   http://localhost:5173" -ForegroundColor White
Write-Host ""
Write-Host "🔐 Default Admin Login:" -ForegroundColor Cyan
Write-Host "   Email:    admin@eventforce.com" -ForegroundColor White
Write-Host "   Password: admin123" -ForegroundColor White
Write-Host ""
Write-Host "💡 Tips:" -ForegroundColor Cyan
Write-Host "   - Check the console windows for any error messages" -ForegroundColor White
Write-Host "   - Make sure PostgreSQL and Redis are running" -ForegroundColor White
Write-Host "   - If ports are busy, close other applications using them" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to continue..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
