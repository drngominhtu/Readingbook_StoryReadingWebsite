# 🚀 Hướng dẫn Host lên GitHub và Deploy Vercel

## 📋 Chuẩn bị trước khi deploy:

### 1. **Cấu hình Environment Variables**
Tạo file `.env.example` để hướng dẫn cấu hình:

```env
# MongoDB Atlas Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

### 2. **Kiểm tra .gitignore**
Đảm bảo file `.env.local` không được commit:

```gitignore
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

## 🌐 Bước 1: Tạo Repository GitHub

### **1.1 Tạo repo mới trên GitHub:**
1. Vào https://github.com
2. Click "New repository"
3. Đặt tên: `web-truyen` hoặc tên khác
4. Chọn Public hoặc Private
5. **KHÔNG** tích "Initialize with README"
6. Click "Create repository"

### **1.2 Kết nối local với GitHub:**

Mở PowerShell trong thư mục dự án và chạy:

```powershell
# Khởi tạo git (nếu chưa có)
git init

# Thêm tất cả file
git add .

# Commit đầu tiên
git commit -m "Initial commit - Web Truyen with 50 tags"

# Thêm remote origin (thay YOUR_USERNAME và YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Push lên GitHub
git branch -M main
git push -u origin main
```

## ☁️ Bước 2: Deploy lên Vercel

### **2.1 Tạo tài khoản Vercel:**
1. Vào https://vercel.com
2. Đăng ký bằng GitHub account
3. Authorize Vercel truy cập GitHub

### **2.2 Import dự án:**
1. Click "New Project"
2. Chọn repository vừa tạo
3. Vercel sẽ tự detect Next.js
4. Click "Deploy"

### **2.3 Cấu hình Environment Variables:**
1. Trong Vercel Dashboard → Project Settings → Environment Variables
2. Thêm biến:
   ```
   MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
   ```
3. Click "Save"

## 🔧 Bước 3: Cấu hình Production

### **3.1 Cập nhật MongoDB Atlas:**
1. Vào MongoDB Atlas Dashboard
2. Network Access → Add IP Address
3. Thêm `0.0.0.0/0` (cho Vercel)
4. Hoặc thêm IP của Vercel

### **3.2 Cập nhật CORS (nếu cần):**
Vercel tự động handle CORS cho Next.js API routes.

## 📱 Bước 4: Test Production

### **4.1 Kiểm tra website:**
1. Vercel sẽ cho URL: `https://your-project.vercel.app`
2. Test các tính năng:
   - Trang chủ
   - Thêm thể loại
   - Thêm truyện
   - Đọc truyện
   - Database admin

### **4.2 Khắc phục lỗi (nếu có):**
1. Xem logs trong Vercel Dashboard
2. Kiểm tra Environment Variables
3. Kiểm tra MongoDB connection

## 🔄 Bước 5: Workflow Update

### **5.1 Quy trình update:**
```powershell
# Khi có thay đổi code
git add .
git commit -m "Update: mô tả thay đổi"
git push

# Vercel sẽ tự động deploy
```

### **5.2 Rollback (nếu cần):**
1. Vào Vercel Dashboard
2. Deployments tab
3. Click "..." → "Promote to Production"

## 🎯 Custom Domain (Tuỳ chọn)

### **Nếu có domain riêng:**
1. Vercel Dashboard → Settings → Domains
2. Add domain
3. Cấu hình DNS theo hướng dẫn
4. Vercel tự động cấp SSL

## ⚡ Tối ưu Performance

### **Các cài đặt được tối ưu sẵn:**
- ✅ Next.js Image Optimization
- ✅ Automatic Code Splitting
- ✅ Edge Functions
- ✅ Global CDN
- ✅ Automatic HTTPS

## 🔐 Bảo mật

### **Kiểm tra bảo mật:**
- ✅ Environment variables an toàn
- ✅ MongoDB Atlas IP whitelist
- ✅ No sensitive data in git
- ✅ HTTPS enforced

## 📊 Monitoring

### **Theo dõi website:**
1. Vercel Analytics (free)
2. MongoDB Atlas Monitoring
3. Uptime monitoring tools

## 🆘 Troubleshooting

### **Lỗi thường gặp:**

**1. MongoDB connection failed:**
```
Solution: Kiểm tra MONGODB_URI và IP whitelist
```

**2. 404 on API routes:**
```
Solution: Kiểm tra file structure trong /pages/api hoặc /app/api
```

**3. Environment variables không work:**
```
Solution: Redeploy sau khi thêm env vars
```

**4. Build failed:**
```
Solution: Kiểm tra TypeScript errors local trước
```

## 🎉 Kết quả

Sau khi hoàn thành, bạn sẽ có:
- ✅ Website live trên internet
- ✅ URL chia sẻ được: `https://your-project.vercel.app`
- ✅ Auto-deploy khi push code
- ✅ SSL certificate tự động
- ✅ Global CDN performance
- ✅ 50 thể loại truyện sẵn sàng

**Website của bạn đã sẵn sàng cho bạn bè sử dụng!** 🚀
