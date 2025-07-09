# Web Truyện - Trang Web Đọc Truyện

Một trang web đọc truyện hiện đại được xây dựng bằng Next.js, MongoDB, và Tailwind CSS.

## 🚀 Tính năng

- **Giao diện đẹp và responsive** - Hoạt động tốt trên mọi thiết bị
- **Quản lý truyện dễ dàng** - Thêm, sửa, xóa truyện và chương
- **Hệ thống tag** - Phân loại truyện theo thể loại
- **Tìm kiếm mạnh mẽ** - Tìm kiếm theo tên, tác giả, thể loại
- **Đọc truyện tối ưu** - Giao diện đọc truyện thoải mái
- **Database trên cloud** - Sử dụng MongoDB Atlas miễn phí

## 🛠️ Công nghệ sử dụng

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: MongoDB Atlas
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📦 Cài đặt

### Bước 1: Cài đặt Node.js
Tải và cài đặt Node.js từ [nodejs.org](https://nodejs.org/)

### Bước 2: Clone project
```bash
git clone <repository-url>
cd web-truyen
```

### Bước 3: Cài đặt dependencies
```bash
npm install
```

### Bước 4: Thiết lập MongoDB Atlas
1. Tạo tài khoản miễn phí tại [MongoDB Atlas](https://cloud.mongodb.com/)
2. Tạo cluster mới
3. Lấy connection string
4. Sao chép `.env.example` thành `.env.local`
5. Điền connection string vào `MONGODB_URI`

### Bước 5: Chạy ứng dụng
```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem kết quả.

## 🌐 Deploy lên Production

### Deploy lên Vercel (Khuyến nghị)

1. **Push code lên GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo.git
   git push -u origin main
   ```

2. **Deploy trên Vercel:**
   - Vào [vercel.com](https://vercel.com)
   - Đăng nhập bằng GitHub
   - Import repository
   - Thêm Environment Variable: `MONGODB_URI`
   - Deploy!

3. **Cấu hình MongoDB Atlas cho Production:**
   - Vào Network Access
   - Add IP: `0.0.0.0/0` (cho Vercel)

### URL Demo
- **Local**: http://localhost:3000
- **Production**: https://your-project.vercel.app

## 📱 Hướng dẫn sử dụng

### Lần đầu sử dụng:
1. **Tạo thể loại**: Truy cập `/admin/database` → "Tạo thể loại mẫu" (50 thể loại)
2. **Thêm truyện**: Truy cập `/admin` → "Thêm truyện mới"
3. **Thêm chương**: Click "Quản lý chương" → Thêm nội dung
4. **Đọc truyện**: Truy cập `/stories` hoặc trang chủ

### Các trang chính:
- **Trang chủ**: `/` - Giới thiệu và điều hướng
- **Danh sách truyện**: `/stories` - Xem tất cả truyện
- **Đọc truyện**: `/stories/[id]/chapters/[chapterId]` - Đọc chương
- **Admin**: `/admin` - Quản lý truyện và chương
- **Database Admin**: `/admin/database` - Reset và tạo mẫu dữ liệu
- **Test Reader**: `/test-reader` - Test tính năng đọc truyện

## 🎯 Cách sử dụng

### Thêm truyện mới
1. Vào trang `/admin`
2. Click "Thêm truyện mới"
3. Điền thông tin truyện
4. Chọn thể loại
5. Click "Thêm truyện"

### Thêm chương
1. Vào trang quản lý truyện
2. Click vào icon sách của truyện
3. Click "Thêm chương mới"
4. Điền nội dung chương
5. Click "Thêm chương"

### Thêm thể loại
1. Vào trang `/admin`
2. Click "Thêm thể loại"
3. Điền tên và mô tả
4. Chọn màu sắc
5. Click "Thêm thể loại"

## 📚 Nguồn truyện gợi ý

### Trang web truyện Việt Nam
- [TruyenFull.vn](https://truyenfull.vn) - Truyện đầy đủ
- [WikiDich.com](https://wikidich.com) - Truyện dịch
- [Hako.re](https://hako.re) - Light novel
- [TangThuVien.vn](https://www.tangthuvien.vn) - Truyện tiên hiệp

### API và công cụ
- [TruyenCV API](https://truyencv.com) - API truyện
- [Web scraping tools](https://scrapy.org/) - Công cụ thu thập dữ liệu

### Cách lấy truyện
1. **Thủ công**: Copy-paste từ các trang web
2. **API**: Sử dụng API có sẵn
3. **Web scraping**: Viết script thu thập tự động
4. **Import**: Từ file text/JSON

## 🚀 Deployment

### Vercel (Khuyến nghị)
1. Push code lên GitHub
2. Kết nối với [Vercel](https://vercel.com)
3. Thêm environment variables
4. Deploy tự động

### Netlify
1. Push code lên GitHub
2. Kết nối với [Netlify](https://netlify.com)
3. Cấu hình build settings
4. Deploy

## 📁 Cấu trúc thư mục

```
src/
├── app/
│   ├── admin/              # Trang quản lý
│   ├── api/                # API routes
│   ├── stories/            # Trang truyện
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Layout chính
│   └── page.tsx            # Trang chủ
├── lib/
│   └── mongodb.ts          # Database connection
└── models/
    └── index.ts            # Database models
```

## 🔧 API Endpoints

### Stories
- `GET /api/stories` - Lấy danh sách truyện
- `POST /api/stories` - Tạo truyện mới
- `GET /api/stories/[id]` - Lấy chi tiết truyện
- `PUT /api/stories/[id]` - Cập nhật truyện
- `DELETE /api/stories/[id]` - Xóa truyện

### Chapters
- `GET /api/stories/[id]/chapters` - Lấy danh sách chương
- `POST /api/stories/[id]/chapters` - Tạo chương mới

### Tags
- `GET /api/tags` - Lấy danh sách thể loại
- `POST /api/tags` - Tạo thể loại mới

## 🎨 Customization

### Thay đổi theme
Chỉnh sửa file `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Thay đổi màu chính
      }
    }
  }
}
```

### Thêm tính năng
1. Tạo component mới trong `src/components/`
2. Thêm API route trong `src/app/api/`
3. Cập nhật database model trong `src/models/`

## 📝 License

MIT License - Sử dụng tự do cho mọi mục đích.

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Hãy tạo issue hoặc pull request.

## 📞 Liên hệ

Nếu có thắc mắc, hãy tạo issue trên GitHub.

---

**Chúc bạn xây dựng thành công trang web truyện! 📚✨**
