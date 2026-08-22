# 🎓 HƯỚNG DẪN SỬ DỤNG - OOP C++ EXAM MASTER (FIT-HCMUS)

Hệ thống luyện thi cuối kỳ môn **Lập Trình Hướng Đối Tượng (OOP C++)** tích hợp **Đề Thi Chính Thức Năm Học 2024-2025 (100 phút)** và 4 phân hệ luyện thi chuyên sâu theo chuẩn độ khó cao nhất của Khoa CNTT - ĐH Khoa Học Tự Nhiên ĐHQG-HCM (FIT-HCMUS).

---

## 🚀 1. Hướng Dẫn Khởi Chạy Nhanh

Ứng dụng là **Single Page Application (HTML/CSS/JS thuần)**:

1. **Cách 1 (Mở trực tiếp):** 
   - Nhấp đúp chuột vào file [`index.html`](file:///Users/phangiahuy290407gmail.com/Documents/bài tập/file pdf/slide bài giảng/hk3/oop/On thi ck/index.html) để mở trên bất kỳ trình duyệt web nào (Chrome, Edge, Safari, Firefox,...).
2. **Cách 2 (Mở với VS Code Live Server):**
   - Chuột phải vào `index.html` $\rightarrow$ chọn **Open with Live Server**.

---

## 🎯 2. Trọn Bộ 5 Phân Hệ Trên Giao Diện Ứng Dụng

```
[ ⭐ Đề Thi Thật 2024-2025 ]  |  [ 📝 Trắc Nghiệm (50) ]  |  [ 🔍 Dạng 2: Đọc Code (35) ]  |  [ 💻 Dạng 3: Viết Code (16) ]  |  [ 🏛️ Dạng 4: Thiết Kế (11) ]  |  [ ⚡ 10 Bẫy Code ]
```

---

### ⭐ PHÂN HỆ ĐẶC BIỆT: ĐỀ THI CHÍNH THỨC CUỐI KỲ (HK3 / 2024-2025 - 100 PHÚT)
Bám sát 100% tài liệu 4 trang ảnh đề thi thực tế (`trang1.jpg` $\rightarrow$ `trang4.jpg`):
- **Câu 1 (1.0đ - Lý thuyết):** Phân biệt bản chất `static data members` vs `non-static data members` (quyền sở hữu, vùng nhớ Data Segment, vòng đời, khởi tạo ngoài class). Kèm bảng barem và lời giải mẫu.
- **Câu 2 (2.0đ - Đọc Code Đoán Output):** Cây kế thừa `Shape` $\rightarrow$ `Rectangle` chứa `Point _topLeft`. Bẫy cực hiểm: **Copy Constructor của Rectangle không gọi Shape(p) và `_topLeft(...)` trong Member Initializer List** $\rightarrow$ kích hoạt Default Constructor của Shape và Point. Kèm công cụ Diff Check 12 dòng và timeline giải thích chi tiết.
- **Câu 3 (3.0đ - Viết Code C++):** Xây dựng lớp `Computer` (brand, ram, cpu, `getPerformanceScore()`), đầy đủ 6 toán tử so sánh `==`, `!=`, `<`, `<=`, `>`, `>=` và 2 toán tử stream `>>`, `<<`. Tích hợp Code Editor hỗ trợ phím Tab, checklist barem tự chấm và mã nguồn mẫu.
- **Câu 4 (4.0đ - Thiết Kế Kiến Trúc Chuẩn Google C++ Style):** Hệ thống `IntegerRequestUseCase` + `Expected<T>` + **Validator Architecture** kiểm tra số nguyên tố $[1, 100]$. Cung cấp bảng phân rã vai trò, sơ đồ lớp UML và full mã nguồn vượt qua 5 test cases thực tế.

---

### 📝 PHÂN HỆ 1: TRẮC NGHIỆM TIẾNG ANH (50 MCQs CHUẨN HÓA)
- 50 câu trắc nghiệm tiếng Anh, trọng tâm Chương 5 trở đi & Bổ trợ Chương 2-4.
- Lọc theo chương & độ khó, **Question Navigator (1..50)**, chế độ Luyện tập vs Thi thử 10.0đ.

---

### 🔍 PHÂN HỆ 2: DẠNG 2 - ĐỌC CODE ĐOÁN OUTPUT & BẪY CODE (35 BÀI - 2.0Đ)
- 35 bài tập truy vết mã nguồn C++ với độ khó bằng và cao hơn đề thật.
- Tích hợp công cụ **Diff Check tự động** (so khớp màu xanh/đỏ) và **Timeline Step-by-step trace**.

---

### 💻 PHÂN HỆ 3: DẠNG 3 - VIẾT CODE C++ HOÀN CHỈNH (16 BÀI - 3.0Đ)
- 16 bài tập lập trình C++ (`Computer`, `MyString`, `VectorND`, `CongTy/NhanVien`, `SafeStack<T>`, `SafeQueue<T>`, `Binary File I/O`, `DivisionByZeroException`...).
- Code Editor có phím Tab, checklist tiêu chí kỹ thuật, mã nguồn chuẩn của giảng viên.

---

### 🏛️ PHÂN HỆ 4: DẠNG 4 - THIẾT KẾ KIẾN TRÚC & PATTERNS (11 BÀI - 3.0Đ/4.0Đ)
- 11 bài tập thiết kế hệ thống (`Validator Architecture Google Style`, `AppLogger`, `ConfigManager`, `AudioEngine`, `ProductCollection`, `Playlist`, `NotificationFactory`, `DocumentFactory`, `PaymentStrategy`...).
- Trắc nghiệm Pattern, Bảng vai trò (Role Mapping), Sơ đồ UML và C++ Skeleton.

---

## ⚡ 3. Tiện Ích Hỗ Trợ Đắc Lực
1. **⚡ Sổ Tay 10 Bẫy Code:** Tra cứu nhanh các bẫy code hay gài trong đề thi FIT-HCMUS.
2. **⏱️ Đồng Hồ Đếm Ngược 100 Phút:** Tự động cảnh báo màu vàng và đỏ khi sắp hết giờ.
3. **💾 Tự Động Lưu Tiến Độ (Auto-save LocalStorage):** Lưu lại 100% câu trả lời, code đã gõ, checklist đã tích.
4. **🌓 Giao Diện Dark / Light Mode.**

Chúc bạn ôn tập xuất sắc và đạt điểm tối đa trong kỳ thi cuối kỳ OOP C++! 🚀
