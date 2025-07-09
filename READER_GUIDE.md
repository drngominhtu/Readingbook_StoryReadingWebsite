# Tính năng Đọc Truyện - Hướng dẫn sử dụng

## Tổng quan
Tính năng đọc truyện đã được hoàn thiện với giao diện đẹp và nhiều tính năng hữu ích:

## Các tính năng chính:

### 1. Trang đọc chương (`/stories/[id]/chapters/[chapterId]`)
- **Giao diện tối ưu**: Responsive, hỗ trợ cả desktop và mobile
- **Chế độ sáng/tối**: Người dùng có thể chuyển đổi giữa light/dark mode
- **Điều chỉnh cỡ chữ**: Từ 12px đến 24px (6 cấp độ)
- **Navigation**: Chuyển chương trước/sau dễ dàng
- **Keyboard shortcuts**: Dùng mũi tên trái/phải để chuyển chương
- **Thanh tiến trình**: Hiển thị vị trí chương hiện tại
- **Sticky header**: Thanh điều hướng luôn hiển thị khi cuộn

### 2. API mới
- **GET `/api/stories/[id]/chapters/[chapterId]`**: Lấy nội dung chương
  - Trả về thông tin chương, truyện, và navigation
  - Tự động tăng view count khi đọc chương
  - Tính toán chương trước/sau cho navigation

### 3. Trang test (`/test-reader`)
- Hiển thị danh sách truyện có sẵn
- Link nhanh đến trang xem truyện và quản lý chương
- Hướng dẫn quy trình sử dụng từ A-Z

## Quy trình sử dụng:

### Bước 1: Thêm truyện
1. Truy cập `/admin` hoặc click "Quản lý" trên header
2. Điền thông tin truyện: tiêu đề, tác giả, mô tả, thể loại
3. Click "Thêm truyện"

### Bước 2: Thêm chương
1. Từ trang admin, click "Quản lý chương" của truyện
2. Hoặc truy cập `/admin/stories/[id]/chapters`
3. Điền thông tin chương: tiêu đề, số chương, nội dung
4. Click "Thêm chương"

### Bước 3: Đọc truyện
1. Truy cập `/stories/[id]` để xem thông tin truyện
2. Click vào chương muốn đọc
3. Hoặc click "Đọc từ chương đầu" / "Đọc chương mới nhất"

### Bước 4: Trải nghiệm đọc
- Sử dụng nút "Cài đặt" để điều chỉnh giao diện
- Dùng nút chuyển chương hoặc phím mũi tên
- Nội dung được hiển thị với font dễ đọc và spacing tối ưu

## Các tính năng nâng cao:

### Dark/Light Mode
- Chuyển đổi bằng nút trong thanh settings
- Tự động lưu vào localStorage
- Áp dụng cho toàn bộ trang đọc

### Responsive Design
- Tối ưu cho tất cả kích thước màn hình
- Header thu gọn trên mobile
- Nội dung tự động điều chỉnh

### Keyboard Navigation
- Mũi tên trái: Chương trước
- Mũi tên phải: Chương sau
- Hoạt động mượt mà, không xung đột

### Performance
- Chỉ load nội dung chương hiện tại
- Tự động tăng view count
- Cache settings trong localStorage

## Cấu trúc file:

```
src/
├── app/
│   ├── stories/
│   │   └── [id]/
│   │       ├── page.tsx              # Trang chi tiết truyện
│   │       └── chapters/
│   │           └── [chapterId]/
│   │               └── page.tsx      # Trang đọc chương
│   ├── api/
│   │   └── stories/
│   │       └── [id]/
│   │           └── chapters/
│   │               └── [chapterId]/
│   │                   └── route.ts  # API lấy nội dung chương
│   └── test-reader/
│       └── page.tsx                  # Trang test
```

## Cách chạy và test:

1. **Chạy server**:
   ```bash
   cd d:\Code_Progress\Web_truyen
   npm run dev
   ```

2. **Truy cập các trang**:
   - Trang chủ: `http://localhost:3000`
   - Test reader: `http://localhost:3000/test-reader`
   - Admin: `http://localhost:3000/admin`

3. **Quy trình test**:
   - Thêm 1-2 truyện qua trang admin
   - Thêm vài chương cho mỗi truyện
   - Test đọc truyện qua trang test-reader
   - Kiểm tra tất cả tính năng: dark mode, font size, navigation

## Lưu ý:
- Đảm bảo MongoDB Atlas đã được cấu hình đúng trong `.env.local`
- Nội dung chương hỗ trợ xuống dòng (mỗi dòng là 1 paragraph)
- Tất cả settings được lưu vào localStorage của browser
- Responsive design đã được test trên nhiều kích thước màn hình

## Tính năng có thể mở rộng:
- Bookmark/đánh dấu chương đã đọc
- Bình luận cho từng chương
- Chia sẻ truyện qua social media
- Tìm kiếm nội dung trong truyện
- Thông báo khi có chương mới
- Export truyện ra file PDF/EPUB
