@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Necesitas Node.js para iniciar el servidor local.
  pause
  exit /b 1
)
start "Transformice Adventures" /min cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:8010"
node scripts/server.mjs
pause
