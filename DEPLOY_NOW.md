# 🚀 HƯỚNG DẪN DEPLOY ĐƠN GIẢN - 5 PHÚT

## 🎯 Chuẩn bị ngay lập tức

### **Bước 1: Check dự án (30 giây)**
```bash
# Mở PowerShell trong thư mục dự án và chạy:
npm run build
```
Nếu build thành công → OK, nếu lỗi → cần sửa trước.

### **Bước 2: Tạo GitHub repo (1 phút)**
1. Vào https://github.com/new
2. Repository name: `web-truyen`
3. Description: `Web đọc truyện với Next.js`
4. Public
5. Create repository

### **Bước 3: Upload code (2 phút)**
```bash
# Copy paste từng lệnh một:
git init
git add .
git commit -m "Web truyen hoan thanh"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/web-truyen.git
git push -u origin main
```

### **Bước 4: Deploy Vercel (2 phút)**
1. Vào https://vercel.com/signup
2. Continue with GitHub
3. Import Project → Chọn `web-truyen`
4. Deploy (đợi 1-2 phút)

### **Bước 5: Add MongoDB URI (30 giây)**
1. Trong Vercel: Settings → Environment Variables
2. Key: `MONGODB_URI`
3. Value: `mongodb+srv://username:password@cluster.mongodb.net/database`
4. Save → Redeploy

## ✅ Xong! 

Website đã live tại: `https://web-truyen-xyz.vercel.app`

## 🔧 Fix lỗi thường gặp:

### **Build failed:**
```bash
# Chạy local để check lỗi:
npm run build
# Sửa lỗi TypeScript/syntax rồi push lại
```

### **MongoDB connection failed:**
```
- Kiểm tra MONGODB_URI đúng format
- MongoDB Atlas → Network Access → Add 0.0.0.0/0
```

### **404 page:**
```
- Đợi 2-3 phút để Vercel build xong
- Check Functions tab trong Vercel dashboard
```

## 🎉 Test ngay:

1. **Vào website** → Check trang chủ
2. **Admin Database** → `your-url.vercel.app/admin/database`
3. **Tạo dữ liệu mẫu** → Click "Tạo dữ liệu mẫu"
4. **Test đọc truyện** → `your-url.vercel.app/test-reader`

## 📱 Update sau này:

```bash
# Mỗi khi có thay đổi:
git add .
git commit -m "Update something"
git push
# Vercel tự động deploy trong 1-2 phút
```

**🎊 Xong! Bạn bè giờ có thể vào đọc truyện rồi!**
