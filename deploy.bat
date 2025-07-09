@echo off
echo ========================================
echo          WEB TRUYEN DEPLOYMENT
echo ========================================
echo.

echo Checking Git status...
git status

echo.
echo Adding all files...
git add .

echo.
set /p commit_msg="Enter commit message: "
if "%commit_msg%"=="" set commit_msg=Update project

echo Committing with message: %commit_msg%
git commit -m "%commit_msg%"

echo.
echo Pushing to GitHub...
git push

echo.
echo ========================================
echo    DEPLOYMENT COMPLETED SUCCESSFULLY!
echo ========================================
echo.
echo Your changes have been pushed to GitHub.
echo Vercel will automatically deploy in 1-2 minutes.
echo.
echo Check your Vercel dashboard for deployment status:
echo https://vercel.com/dashboard
echo.
pause
