@echo off
setlocal

REM Change to the directory of this script (project root)
set "PROJ_DIR=%~dp0"
cd /d "%PROJ_DIR%"

echo [run-preview] Project directory: %CD%

REM Quick checks for Node and npm
where node >nul 2>nul || (echo [run-preview][ERROR] Node.js not found in PATH. Install Node.js 18+ and retry. & goto :end)
where npm  >nul 2>nul || (echo [run-preview][ERROR] npm not found in PATH. Ensure Node.js installed correctly. & goto :end)

REM Install dependencies if missing
if not exist "node_modules" (
  echo [run-preview] Installing dependencies...
  call npm install || goto :end
)

echo [run-preview] Building project...
call npm run build || goto :end

echo [run-preview] Starting preview server on http://127.0.0.1:4175 ...
start "" "http://127.0.0.1:4175/"
REM Use npm exec to pass flags reliably on Windows
call npm exec -- vite preview --host 127.0.0.1 --port 4175 --strictPort

:end
endlocal
pause
