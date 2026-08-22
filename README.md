# 🎓 HƯỚNG DẪN SỬ DỤNG - OOP C++ EXAM MASTER (FIT-HCMUS)

Hệ thống luyện thi cuối kỳ môn **Lập Trình Hướng Đối Tượng (OOP C++)** chuẩn cấu trúc đề thi Khoa CNTT - ĐH Khoa Học Tự Nhiên ĐHQG-HCM (FIT-HCMUS) bám sát giáo trình Slide Tuần 2 → Tuần 8.

---

## 🚀 1. Hướng Dẫn Khởi Chạy Nhanh

Ứng dụng được thiết kế dạng **Single Page Application (HTML/CSS/JS thuần)**, không yêu cầu cài đặt môi trường backend hay database:

1. **Cách 1 (Đơn giản nhất):** 
   - Nhấp đúp chuột trực tiếp vào file [`index.html`](file:///Users/phangiahuy290407gmail.com/Documents/bài tập/file pdf/slide bài giảng/hk3/oop/On thi ck/index.html) để mở trên bất kỳ trình duyệt web nào (Google Chrome, Microsoft Edge, Safari, Firefox,...).
2. **Cách 2 (Dành cho VS Code / IDE):**
   - Cài extension `Live Server` trong VS Code, nhấp chuột phải vào `index.html` và chọn **Open with Live Server**.

---

## 🎯 2. Trọn Bộ 4 Phân Hệ Luyện Thi Trên Thanh Điều Hướng

```
[ 📝 Trắc Nghiệm (50) ]  |  [ 🔍 Dạng 2: Đọc Code (35) ]  |  [ 💻 Dạng 3: Viết Code (15) ]  |  [ 🏛️ Dạng 4: Thiết Kế (10) ]  |  [ ⚡ 10 Bẫy Code ]
```

---

### PHÂN HỆ 1: 📝 TRẮC NGHIỆM TIẾNG ANH (50 MCQs CHUẨN HÓA)
- **Nội dung:** 50 câu hỏi trắc nghiệm tiếng Anh, trọng tâm từ Chương 5 trở đi (Kế thừa, Đa hình, File I/O, Template, Exception, STL, Design Patterns) & Bổ trợ Chương 2-4.
- **Tính năng:**
  - Lọc theo chương & Lọc theo độ khó (🟢 Easy, 🟡 Medium, 🔴 Hard/Trap).
  - **Question Navigator Grid (1..50)** nhảy nhanh câu và tự động phát sáng viền vàng tại câu đang làm dở.
  - ⚡ **Chế độ Luyện Tập:** Hiện giải thích chi tiết song ngữ ngay lập tức.
  - 📝 **Chế độ Thi Thử:** Nộp bài tính điểm 10.0đ và phân tích năng lực từng chương.

---

### PHÂN HỆ 2: 🔍 DẠNG 2 - ĐỌC CODE ĐOÁN OUTPUT & BẪY CODE (35 BÀI - 2.0 ĐIỂM)
- **Nội dung:** 35 bài tập truy vết mã nguồn C++, nhận diện 10 bẫy code kinh điển (Khai báo hàm `PhanSo t()`, Virtual Destructor, Object Slicing, Stack Unwinding, EOF lặp dư 1 lần...).
- **Tính năng:**
  - **Công cụ Diff Check tự động:** Gõ output bạn đoán $\rightarrow$ Bấm `🔍 Kiểm tra Output` để so khớp màu xanh lá khi đúng, hoặc hiển thị so sánh 2 cột khi chưa khớp.
  - **Accordion Phân tích từng bước (Step-by-step trace):** Xem timeline giải thích chi tiết từng dòng lệnh từ `main()`.
  - **Question Navigator Grid (1..35)** theo dõi trạng thái làm bài real-time.

---

### PHÂN HỆ 3: 💻 DẠNG 3 - VIẾT CODE C++ HOÀN CHỈNH (15 BÀI - 3.0 ĐIỂM)
- **Nội dung:** 15 bài tập lập trình C++ điển hình:
  - `MyString` (Rule of Three, Deep Copy, `operator=`, toán tử stream `>>`/`<<`, `[]`).
  - `VectorND` & `PhanSo` rút gọn & `Time` (tiền tố/hậu tố).
  - Cây kế thừa đa hình `NhanVien` (`CongTy`), `ShapeHierarchy`, `Account`, `Character`.
  - Ghi file nhị phân `Binary File I/O` cho Sinh viên, Quản lý đơn hàng `Order` (Composition).
  - Template Class `SafeStack<T>`, `SafeQueue<T>`, `Matrix<T>` ném ngoại lệ an toàn.
  - Lớp ngoại lệ tùy biến `DivisionByZeroException` kế thừa `std::exception`.
  - Lớp `WordFrequencyTracker` sử dụng `std::map` và STL algorithm.
- **Tính năng:**
  - **Code Editor tích hợp:** Hỗ trợ phím `Tab` thụt lề 4 khoảng trắng, nút copy code, khôi phục starter code.
  - **Barem Tự Đánh Giá (Live Checklist):** Tích chọn các tiêu chí kỹ thuật để tự chấm điểm trên thang 3.0đ.
  - **Mã nguồn chuẩn của giảng viên (Teacher's Solution Code):** Accordion hiển thị lời giải tối ưu và nút copy code mẫu.
  - **Question Navigator Grid (1..15).**

---

### PHÂN HỆ 4: 🏛️ DẠNG 4 - THIẾT KẾ KIẾN TRÚC & DESIGN PATTERNS (10 BÀI - 3.0 ĐIỂM)
- **Nội dung:** 10 bài tập tình huống thực tế:
  - **Singleton Pattern:** `AppLogger` ghi log toàn cục, `ConfigManager` cấu hình hệ thống, `AudioEngine` âm thanh game.
  - **Iterator Pattern:** `ProductCollection` duyệt sản phẩm không lộ mảng, `Playlist` duyệt bài hát ngược, `FileSystemTree` duyệt cây thư mục.
  - **Factory Method Pattern:** `NotificationFactory` gửi tin nhắn đa kênh (SMS, Email, Push), `DocumentFactory` xuất tài liệu (PDF, Word, HTML), `MonsterSpawner` sinh quái vật trong game.
  - **Strategy Pattern:** `PaymentStrategy` thanh toán linh hoạt (Momo, CreditCard, COD).
- **Tính năng:**
  - **Bước 1:** Trắc nghiệm lựa chọn Design Pattern phù hợp + Đánh giá & giải thích lý do.
  - **Bước 2:** Bảng phân rã vai trò thành phần kiến trúc (Role Mapping: Interface, Concrete, Aggregate, Client...).
  - **Bước 3:** Sơ đồ lớp UML (Class Diagram) trực quan.
  - **Bước 4:** Khung code kiến trúc C++ Skeleton chuẩn chỉ của giảng viên.
  - **Question Navigator Grid (1..10).**

---

## ⚡ 3. Các Tiện Ích Hỗ Trợ Đặc Biệt

1. **⚡ Sổ Tay 10 Bẫy Code Kinh Điển:** Tra cứu nhanh bẫy thi kèm khung so sánh Code Sai (Đỏ) vs Code Đúng (Xanh).
2. **⏱️ Đồng Hồ Đếm Ngược 90 Phút:** Tự động cảnh báo màu vàng khi còn dưới 15 phút và màu đỏ khi còn dưới 5 phút.
3. **🌓 Giao Diện Sáng / Tối (Dark / Light Theme):** Tự động lưu lựa chọn theme.
4. **💾 Tự Động Lưu Tiến Độ (Auto-save LocalStorage):** Lưu lại 100% câu trả lời, code đã gõ, checklist đã tích và phân hệ đang mở.

---

## 📂 4. Cấu Trúc Thư Mục Dự Án

```
├── index.html                 # Giao diện chính của ứng dụng
├── style.css                  # Toàn bộ định dạng UI, màu sắc & animations
├── app.js                     # Bộ xử lý tương tác cho cả 4 phân hệ
├── README.md                  # Hướng dẫn sử dụng hệ thống
├── OOP_TongHop_OnThi.md       # Cẩm nang tóm tắt lý thuyết Tuần 2 → 8
└── data/
    ├── mcq_english_50.js      # 50 câu hỏi trắc nghiệm tiếng Anh
    ├── code_trace_bank.js     # 35 bài tập Dạng 2 - Đọc code đoán output
    ├── code_writing_bank.js   # 15 bài tập Dạng 3 - Viết code C++
    ├── design_pattern_bank.js # 10 bài tập Dạng 4 - Thiết kế kiến trúc
    ├── trap_cheatsheet.js     # Sổ tay 10 bẫy code kinh điển
    ├── de1.js → de5.js        # 5 Bộ đề thi chuẩn 90 phút
    └── exams.js               # File tổng hợp và liên kết dữ liệu
```

Chúc bạn ôn tập hiệu quả và chinh phục điểm số tuyệt đối trong kỳ thi cuối kỳ OOP C++! 🚀
