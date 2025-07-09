# 🚀 HƯỚNG DẪN DEPLOY NHANH

## 📋 Chuẩn bị (5 phút)

### 1. Tạo GitHub Repository
```bash
# Vào github.com → New repository → Đặt tên "web-truyen"
```

### 2. Upload code lên GitHub
```bash
# Mở PowerShell trong thư mục dự án
git init
git add .
git commit -m "Initial commit - Web Truyen with 50 tags"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/web-truyen.git
git push -u origin main
```

## ☁️ Deploy Vercel (3 phút)

### 1. Tạo tài khoản Vercel
- Vào https://vercel.com
- Đăng ký bằng GitHub

### 2. Import project
- Click "New Project"
- Chọn repo "web-truyen"
- Click "Deploy"

### 3. Thêm Environment Variable
- Project Settings → Environment Variables
- Add: `MONGODB_URI` = connection string MongoDB của bạn
- Redeploy

## 🔧 Cấu hình MongoDB (2 phút)

### 1. Whitelist IP cho Vercel
- MongoDB Atlas → Network Access
- Add IP: `0.0.0.0/0`

### 2. Test kết nối
- Truy cập `https://your-project.vercel.app`
- Test thêm thể loại, truyện

## ✅ Hoàn thành!

**URL website**: `https://your-project.vercel.app`

### Để update sau này:
```bash
# Chỉ cần chạy:
./deploy.bat
# hoặc
./deploy.ps1
```

### Các trang chính:
- `/` - Trang chủ
- `/admin/database` - Tạo 50 thể loại mẫu
- `/admin` - Thêm truyện
- `/test-reader` - Test đọc truyện

**🎉 Website đã live và bạn bè có thể truy cập!**
