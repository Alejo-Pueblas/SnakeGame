git add .
git commit -m "Add web version for GitHub Pages"
git push origin main

Write-Host "Proyecto actualizado en GitHub!" -ForegroundColor Green
Write-Host ""
Write-Host "Ahora activa GitHub Pages:" -ForegroundColor Yellow
Write-Host "1. Ve a: https://github.com/Alejo-Pueblas/SnakeGame/settings/pages" -ForegroundColor Cyan
Write-Host "2. En 'Source' selecciona: main" -ForegroundColor Cyan
Write-Host "3. En 'Folder' selecciona: /docs" -ForegroundColor Cyan
Write-Host "4. Click en 'Save'" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tu juego estara en: https://alejo-pueblas.github.io/SnakeGame/" -ForegroundColor Green
