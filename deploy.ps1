# Web Truyen Deployment Script
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "          WEB TRUYEN DEPLOYMENT" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Checking Git status..." -ForegroundColor Yellow
git status

Write-Host ""
Write-Host "Adding all files..." -ForegroundColor Yellow
git add .

Write-Host ""
$commitMsg = Read-Host "Enter commit message (or press Enter for default)"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "Update project - $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
}

Write-Host "Committing with message: $commitMsg" -ForegroundColor Yellow
git commit -m $commitMsg

Write-Host ""
Write-Host "Pushing to GitHub..." -ForegroundColor Yellow
git push

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "    DEPLOYMENT COMPLETED SUCCESSFULLY!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your changes have been pushed to GitHub." -ForegroundColor Green
Write-Host "Vercel will automatically deploy in 1-2 minutes." -ForegroundColor Green
Write-Host ""
Write-Host "Check your Vercel dashboard for deployment status:" -ForegroundColor Cyan
Write-Host "https://vercel.com/dashboard" -ForegroundColor Blue
Write-Host ""
Read-Host "Press Enter to continue"
