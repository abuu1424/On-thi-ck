# 🎓 HƯỚNG DẪN SỬ DỤNG - OOP C++ EXAM MASTER (FIT-HCMUS)

Hệ thống ôn luyện thi cuối kỳ môn **Lập Trình Hướng Đối Tượng (OOP C++)** chuẩn cấu trúc đề thi Khoa CNTT - ĐH Khoa Học Tự Nhiên ĐHQG-HCM (FIT-HCMUS) bám sát giáo trình Slide Tuần 2 → Tuần 8.

---

## 🚀 1. Hướng Dẫn Khởi Chạy Nhanh

Ứng dụng được thiết kế dạng **Single Page Application (HTML/CSS/JS thuần)**, không yêu cầu cài đặt môi trường backend hay database:

1. **Cách 1 (Đơn giản nhất):** 
   - Nhấp đúp chuột trực tiếp vào file [`index.html`](file:///Users/phangiahuy290407gmail.com/Documents/bài tập/file pdf/slide bài giảng/hk3/oop/On thi ck/index.html) để mở trên bất kỳ trình duyệt web nào (Google Chrome, Microsoft Edge, Safari, Firefox,...).
2. **Cách 2 (Dành cho VS Code / IDE):**
   - Cài extension `Live Server` trong VS Code, nhấp chuột phải vào `index.html` và chọn **Open with Live Server**.

---

## 🎯 2. Hướng Dẫn Sử Dụng Chi Tiết

Giao diện ứng dụng được chia thành **2 phân hệ chính** ở thanh menu trên cùng:

```
[ 📝 Trắc Nghiệm (50 MCQs) ]   |   [ ✍️ Tự Luận & 4 Dạng Bài ]   |   [ ⚡ 10 Bẫy Code ]
```

---

### PHÂN HỆ 1: 📝 TRẮC NGHIỆM TIẾNG ANH (50 MCQs)

Ngân hàng 50 câu hỏi trắc nghiệm tiếng Anh chuẩn hóa, tập trung sâu vào **Chương 5 trở đi** (Kế thừa, Đa hình, File I/O, Template, Exception, STL, Design Patterns) và bổ trợ **Chương 2, 3, 4** (Quản lý bộ nhớ, Rule of Three, Static).

#### Các bước luyện tập:
1. **Lọc câu hỏi:**
   - **Lọc theo chương:** Bấm các chip `Tất cả 50 câu`, `Ch 5: Inheritance & Polymorphism`, `Ch 6: File I/O`, `Ch 7: Templates & Exceptions`, `Ch 8: STL & Design`, `Ch 2-4: Core OOP`.
   - **Lọc theo độ khó:** Bấm chọn `🟢 Easy (Cơ bản)`, `🟡 Medium (Trung bình)`, hoặc `🔴 Hard / Trap (Nâng cao/Bẫy)`.
   - **Tìm kiếm từ khóa:** Gõ thuật ngữ vào ô tìm kiếm (ví dụ: `vtable`, `dynamic_cast`, `rule of three`, `ios::binary`,...).
2. **Chọn chế độ làm bài:**
   - ⚡ **Chế độ Luyện Tập (Mặc định):** Khi nhấp chọn đáp án A/B/C/D hoặc nút `✓ Kiểm Tra Ngay`, hệ thống sẽ đổi màu Xanh (Đúng) / Đỏ (Sai) và mở ngay **Hộp Giải Thích Chi Tiết Song Ngữ (Detailed Explanation)**.
   - 📝 **Chế độ Thi Thử:** Ẩn giải thích và kết quả tức thì. Bạn làm bài từ câu 1 → 50 rồi bấm **🏆 Nộp Bài & Chấm Điểm** để nhận bảng điểm tổng kết (thang điểm 10.0) và phân tích năng lực từng chương.
3. **Bảng điều hướng nhanh (Question Navigator 1..50):**
   - Ở cột bên phải có lưới 50 ô số tương ứng 50 câu.
   - **Màu sắc trạng thái:**
     - ⚪ Xám: Chưa làm.
     - 🔵 Xanh dương: Đã chọn đáp án.
     - 🟢 Xanh lá: Câu trả lời đúng.
     - 🔴 Đỏ: Câu trả lời sai.
   - Bấm vào bất kỳ số nào để cuộn trang mượt mà đến đúng câu hỏi đó.
4. **Làm lại từ đầu:** Bấm nút `🔄 Làm Lại` để xóa câu trả lời cũ và reset bài thi.

---

### PHÂN HỆ 2: ✍️ TỰ LUẬN & 4 DẠNG BÀI CHUẨN FIT-HCMUS

Hỗ trợ 2 chế độ xem qua thanh nút chuyển đổi:

#### 1) Chế độ "📄 Theo Bộ Đề Chuẩn 90 Phút (Đề 01 → Đề 05)"
- Mỗi đề thi gồm đúng 4 câu chuẩn barem 10 điểm:
  - **Câu 1 (2.0đ):** Lý thuyết chuyên sâu & so sánh cặp khái niệm.
  - **Câu 2 (2.0đ):** Đọc code đoán output (chứa các bẫy code kinh điển).
  - **Câu 3 (3.0đ):** Viết code hoàn chỉnh cho một class/template.
  - **Câu 4 (3.0đ):** Thiết kế kiến trúc phần mềm theo Design Pattern & vẽ UML.
- Bấm chọn các tab `Đề 01`, `Đề 02`, `Đề 03`, `Đề 04`, `Đề 05 (Tổng Hợp)` để đổi đề thi.
- Bấm nút `▶ Bắt đầu` trên đồng hồ để tính giờ 90 phút. Sau khi làm xong, bấm `🏆 Nộp Bài & Chấm Điểm` để nhận điểm số và xếp loại.

#### 2) Chế độ "📚 Theo Kho 4 Dạng Bài (Dạng 1 → Dạng 4)"
Tập trung cày sâu từng dạng bài với đa dạng bài tập và độ khó:
- **📖 Dạng 1: Lý Thuyết:** Đọc đề bài, làm các câu hỏi trắc nghiệm kiểm tra mức độ hiểu sâu, bấm `📖 Xem bài giải lý thuyết chi tiết` để xem hướng dẫn trả lời chuẩn barem chấm điểm.
- **🔍 Dạng 2: Đọc Code → Output:**
  - Đọc đoạn code C++.
  - Gõ kết quả output bạn đoán vào ô `⌨️ Output của bạn`.
  - Bấm `🔍 Kiểm tra Output` để chạy công cụ **Diff Check** so khớp từng ký tự (Xanh = Trùng khớp hoàn toàn, Đỏ = Chưa khớp).
  - Bấm `🔎 Xem phân tích từng bước` để mở Accordion giải thích chi tiết từng dòng code và các điểm bẫy.
- **💻 Dạng 3: Viết Code:**
  - Soạn thảo trực tiếp trong khung **Code Editor** (hỗ trợ phím `Tab` thụt lề 4 khoảng trắng).
  - Tích chọn các tiêu chí trong **Barem tự đánh giá (Checklist)** để theo dõi điểm số đạt được.
  - Bấm `✨ Xem Code chuẩn của giảng viên` để đối chiếu với mã nguồn mẫu tối ưu nhất.
  - Có các nút tiện ích: `Khôi phục mẫu ban đầu`, `Copy Code của bạn`, `Copy Code Mẫu`.
- **🏛️ Dạng 4: Thiết Kế Kiến Trúc:**
  - Đọc tình huống thực tế (Scenario).
  - **Bước 1:** Chọn mẫu thiết kế phù hợp (Singleton, Iterator, Factory,...) và bấm `✓ Đánh giá lựa chọn`.
  - **Bước 2:** Đọc bảng phân rã vai trò thành phần kiến trúc (Role Mapping).
  - **Bước 3:** Quan sát sơ đồ lớp UML (Class Diagram).
  - Bấm `🏛️ Xem Khung Code Thiết Kế Kiến Trúc` để xem mã nguồn khung C++ Skeleton chuẩn.

---

## ⚡ 3. Các Tiện Ích Hỗ Trợ Đặc Biệt

1. **⚡ Sổ Tay 10 Bẫy Code Kinh Điển:**
   - Bấm nút `⚡ 10 Bẫy Code` trên thanh header (hoặc góc phải).
   - Tra cứu nhanh 10 bẫy code hay gài bẫy nhất trong đề thi (Khai báo hàm `PhanSo t()`, Virtual Destructor, Shallow Copy, Thứ tự catch, EOF thừa 1 dòng, Static out-of-class,...).
   - Có thanh tìm kiếm nhanh theo từ khóa và khung so sánh Code Sai (Đỏ) vs Code Đúng (Xanh).
2. **⏱️ Đồng Hồ Đếm Ngược 90 Phút:**
   - Hỗ trợ bắt đầu (`▶`), tạm dừng (`⏸`), đặt lại (`🔄`).
   - Tự động đổi sang **Màu Vàng** khi còn dưới 15 phút và **Màu Đỏ nhấp nháy** khi còn dưới 5 phút.
3. **🌓 Giao Diện Sáng / Tối (Theme Toggle):**
   - Bấm nút `☀️ Sáng / 🌙 Tối` trên header để đổi theme phù hợp với mắt.
4. **💾 Tự Động Lưu Tiến Độ (Auto-save LocalStorage):**
   - Mọi câu trả lời trắc nghiệm, đáp án output bạn đã gõ, đoạn code bạn đã viết trong editor, và checklist bạn đã tích đều được lưu tự động vào trình duyệt. Khi tải lại trang web (F5), toàn bộ dữ liệu làm bài vẫn được giữ nguyên vẹn.

---

## 📂 4. Cấu Trúc Thư Mục Dự Án

```
├── index.html                 # Giao diện chính của ứng dụng
├── style.css                  # Hệ thống định dạng, màu sắc Dark/Light & animations
├── app.js                     # Bộ xử lý tương tác, chấm điểm & điều hướng
├── README.md                  # Hướng dẫn sử dụng hệ thống
├── OOP_TongHop_OnThi.md       # Cẩm nang tóm tắt lý thuyết toàn diện Tuần 2 → 8
└── data/
    ├── mcq_english_50.js      # Ngân hàng 50 câu hỏi trắc nghiệm tiếng Anh
    ├── question_bank_4types.js# Kho bài tập tự luận tuần tự 4 dạng bài
    ├── trap_cheatsheet.js     # Sổ tay 10 bẫy code kinh điển
    ├── de1.js                 # Đề thi 01 (Class, Rule of Three, Singleton)
    ├── de2.js                 # Đề thi 02 (Kế thừa, Đa hình, Factory)
    ├── de3.js                 # Đề thi 03 (Quan hệ lớp, File Programming)
    ├── de4.js                 # Đề thi 04 (Template, Exception Handling)
    ├── de5.js                 # Đề thi 05 (STL Library, Iterator Pattern)
    └── exams.js               # File tổng hợp và liên kết dữ liệu đề thi
```

---

## 🏆 5. Lời Khuyên Ôn Thi Đạt Điểm A+ Môn OOP

1. **Luyện trắc nghiệm 50 câu:** Làm đi làm lại cho đến khi đạt độ chính xác > 90%, đặc biệt chú ý các câu về **Virtual Destructor**, **vtable/vptr**, **Object Slicing**, **Exception Unwinding**, và **Iterator Invalidation**.
2. **Nắm vững 10 bẫy code:** Đọc kỹ sổ tay bẫy code để tránh mất điểm oan ở Câu 2 (Đoán output).
3. **Viết code chuẩn chỉ:** Ở Câu 3, luôn nhớ viết đủ bộ **Rule of Three** khi class có con trỏ heap, kiểm tra tự gán `if (this == &other) return *this;`, và luôn `return inDev/outDev` trong toán tử stream `>>`/`<<`.
4. **Thiết kế kiến trúc tự tin:** Ở Câu 4, nhận diện nhanh từ khóa để chọn đúng Pattern: *"duy nhất 1 thể hiện toàn cục"* → **Singleton**, *"duyệt danh sách không để lộ cấu trúc"* → **Iterator**, *"tạo object theo tham số runtime"* → **Factory Method**.

Chúc các bạn ôn tập thật tốt và đạt kết quả cao nhất trong kỳ thi cuối kỳ! 🚀
