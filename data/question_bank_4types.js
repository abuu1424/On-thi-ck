/**
 * QUESTION BANK ORGANIZED SEQUENTIALLY ACROSS 4 STANDARD QUESTION TYPES (FIT-HCMUS)
 * Type 1: Theory (Lý Thuyết & Bản chất OOP)
 * Type 2: Code Tracing (Đọc Code Đoán Output & Bẫy Code)
 * Type 3: Code Writing (Viết Code C++ Chuẩn Barem & Checklist)
 * Type 4: Architecture & Design Patterns (Thiết Kế Hệ Thống & UML)
 */

var QUESTION_BANK_4TYPES = {
  // =========================================================================
  // TYPE 1: LÝ THUYẾT (THEORY QUESTIONS BANK)
  // =========================================================================
  theory: [
    {
      id: "bank_t1",
      number: 1,
      type: "theory",
      difficulty: "easy",
      title: "Dạng 1.1: Quản Lý Vùng Nhớ Heap/Stack, Vòng Đời Đối Tượng & Rule of Three",
      maxScore: 2.0,
      slideRef: "Tuần 2 (Mục 1.4) & Tuần 4 (Mục 3.1, 3.2, 3.3)",
      prompt: `**Yêu cầu:**
1. Phân biệt sự khác nhau giữa vùng nhớ **Stack** và **Heap** trong C++.
2. Nêu rõ nguyên tắc **Rule of Three**: Khi nào bắt buộc lập trình viên phải tự định nghĩa Destructor, Copy Constructor và Operator=?
3. Giải thích hiện tượng **Double Free** và nguy cơ crash khi dùng Shallow Copy mặc định trên class chứa con trỏ heap.`,
      subQuestions: [
        {
          id: "bank_t1_q1",
          question: "Vùng nhớ Heap trong C++ có đặc điểm nào sau đây?",
          options: [
            "A. Tự động giải phóng khi biến ra khỏi scope hàm.",
            "B. Do lập trình viên chủ động cấp phát qua `new/new[]` và bắt buộc phải giải phóng thủ công qua `delete/delete[]`.",
            "C. Có tốc độ truy xuất nhanh hơn thanh ghi CPU và kích thước cố định.",
            "D. Chỉ dùng để lưu trữ các hàm static."
          ],
          correctIndex: 1,
          explanation: "Heap là vùng nhớ động do lập trình viên quản lý bằng `new/delete`. Nếu quên `delete`, bộ nhớ sẽ bị rò rỉ (memory leak)."
        },
        {
          id: "bank_t1_q2",
          question: "Tại sao copy constructor mặc định nguy hiểm khi class chứa con trỏ `int* data = new int[10]`?",
          options: [
            "A. Compiler sẽ từ chối biên dịch code.",
            "B. Shallow copy chỉ chép địa chỉ con trỏ, khiến 2 object cùng trỏ vào 1 khối nhớ -> khi cả 2 hủy sẽ giải phóng 2 lần (Double Free Crash).",
            "C. Tự động chuyển con trỏ thành nullptr.",
            "D. Không gây nguy hiểm gì nếu dùng visual studio."
          ],
          correctIndex: 1,
          explanation: "Copy constructor mặc định sao chép nông (bit-by-bit). Khi 2 object cùng giữ 1 địa chỉ heap, destructor của cả hai sẽ delete cùng 1 vùng nhớ -> Double Free lỗi nghiêm trọng."
        }
      ],
      detailedAnswer: `### HƯỚNG DẪN TRẢ LỜI CHI TIẾT:
1. **Stack vs Heap:**
   - **Stack:** Cấp phát tự động, kích thước hạn chế, tốc độ rất nhanh, tự động giải phóng khi ra khỏi scope.
   - **Heap:** Cấp phát động qua \`new\`, kích thước lớn theo RAM, phải giải phóng thủ công bằng \`delete/delete[]\`.
2. **Rule of Three:**
   - Bắt buộc khi class sở hữu tài nguyên động (con trỏ heap, file handle, socket).
   - Cần: Destructor (tránh memory leak), Copy Constructor (deep copy tránh trỏ chung), Operator= (giải phóng cũ, copy mới, check self-assignment).
3. **Double Free:**
   - Xảy ra khi 2 destructor cùng gọi \`delete\` trên cùng 1 địa chỉ heap do shallow copy, gây crash chương trình.`
    },
    {
      id: "bank_t2",
      number: 2,
      type: "theory",
      difficulty: "medium",
      title: "Dạng 1.2: Kế Thừa, Đa Hình Động & Bảng Hàm Ảo (vtable/vptr)",
      maxScore: 2.0,
      slideRef: "Tuần 5 (Mục 4.2 - Polymorphism, Mục 4.6 - Virtual Destructor)",
      prompt: `**Yêu cầu:**
1. Trình bày điều kiện cần và đủ để xảy ra cơ chế **Đa hình động (Dynamic Polymorphism)** trong C++.
2. Giải thích cơ chế bên dưới của trình biên dịch: **Bảng hàm ảo (vtable)** và **con trỏ hàm ảo (vptr)**.
3. Tại sao trong cây kế thừa đa hình, Destructor của lớp Base **bắt buộc phải là \`virtual\`**?`,
      subQuestions: [
        {
          id: "bank_t2_q1",
          question: "Lời gọi hàm `p->draw()` qua con trỏ `Shape* p = new Circle()` sẽ gọi `Circle::draw()` khi nào?",
          options: [
            "A. Khi hàm `draw()` ở `Shape` được khai báo là `virtual`.",
            "B. Luôn luôn gọi `Circle::draw()` dù có `virtual` hay không.",
            "C. Khi hàm `draw()` ở `Circle` là static.",
            "D. Khi class `Shape` không có thuộc tính private."
          ],
          correctIndex: 0,
          explanation: "Chỉ khi hàm ở Base có từ khóa `virtual`, C++ mới dùng dynamic binding qua vtable để gọi đúng phương thức của đối tượng thực tế `Circle`."
        },
        {
          id: "bank_t2_q2",
          question: "Hậu quả gì xảy ra nếu thực thi `Base* p = new Derived(); delete p;` khi `~Base()` KHÔNG có `virtual`?",
          options: [
            "A. Lỗi crash tại thời điểm biên dịch.",
            "B. Chỉ destructor `~Base()` được gọi, `~Derived()` bị bỏ qua -> Memory Leak tài nguyên của Derived.",
            "C. Cả 2 destructor vẫn được gọi bình thường.",
            "D. Hệ điều hành tự động thu gom rác."
          ],
          correctIndex: 1,
          explanation: "Không có `virtual ~Base()`, `delete p` chỉ gọi static binding destructor của Base, bỏ qua Derived -> rò rỉ vùng nhớ heap được cấp phát trong Derived."
        }
      ],
      detailedAnswer: `### HƯỚNG DẪN TRẢ LỜI CHI TIẾT:
1. **Điều kiện xảy ra Đa hình động:**
   - Có quan hệ kế thừa giữa Base và Derived.
   - Phương thức ở Base được khai báo \`virtual\` (hoặc pure virtual \`= 0\`), Derived override lại.
   - Gọi hàm thông qua **con trỏ (\`Base*\`)** hoặc **tham chiếu (\`Base&\`)** của lớp cha.
2. **Cơ chế vtable & vptr:**
   - Mỗi class có hàm ảo sở hữu 1 bảng tĩnh \`vtable\` chứa địa chỉ các hàm ảo.
   - Mỗi object chứa 1 con trỏ ẩn \`vptr\` trỏ tới \`vtable\` của class tương ứng.
   - Khi gọi hàm ảo, chương trình truy xuất qua \`vptr\` đến \`vtable\` để lấy địa chỉ hàm thực thi lúc runtime.
3. **Tầm quan trọng của Virtual Destructor:**
   - Đảm bảo khi hủy object qua con trỏ \`Base*\`, destructor của lớp con \`Derived\` được gọi trước, sau đó mới đến \`Base\`, tránh memory leak.`
    },
    {
      id: "bank_t3",
      number: 3,
      type: "theory",
      difficulty: "medium",
      title: "Dạng 1.3: Các Mối Quan Hệ Class Trong UML (Association, Aggregation, Composition)",
      maxScore: 2.0,
      slideRef: "Tuần 6 (Mục 5.1 - Relationships & Lifetime)",
      prompt: `**Yêu cầu:**
1. Phân biệt sự khác biệt về **mức độ gắn kết** và **vòng đời (lifetime dependency)** giữa: **Association**, **Aggregation** (\"has-a\" lỏng) và **Composition** (\"has-a\" chặt).
2. Cho ví dụ thực tế trong mô hình hướng đối tượng cho từng loại quan hệ.
3. Ký hiệu UML tương ứng của từng quan hệ được vẽ như thế nào?`,
      subQuestions: [
        {
          id: "bank_t3_q1",
          question: "Quan hệ giữa `Car` và `Engine` (Xe hơi và Động cơ) khi động cơ được tạo ra và hủy cùng lúc với chiếc xe là quan hệ gì?",
          options: [
            "A. Inheritance (Kế thừa)",
            "B. Composition (Chứa gộp chặt - hình thoi đặc)",
            "C. Aggregation (Thu nạp lỏng - hình thoi rỗng)",
            "D. Generalization"
          ],
          correctIndex: 1,
          explanation: "Khi vòng đời của Engine phụ thuộc hoàn toàn vào Car (Car hủy thì Engine hủy theo), đây là quan hệ Composition."
        },
        {
          id: "bank_t3_q2",
          question: "Quan hệ giữa `Teacher` và `Department` (Khoa và Giảng viên) khi Giảng viên vẫn tồn tại độc lập nếu Khoa giải thể là quan hệ gì?",
          options: [
            "A. Composition",
            "B. Aggregation (Thu nạp lỏng - hình thoi rỗng)",
            "C. Pure Virtual Interface",
            "D. Friend Class"
          ],
          correctIndex: 1,
          explanation: "Khi đối tượng con có thể tồn tại độc lập với đối tượng cha ngoài vòng đời của cha, đó là Aggregation."
        }
      ],
      detailedAnswer: `### HƯỚNG DẪN TRẢ LỜI CHI TIẾT:
1. **Phân biệt 3 loại quan hệ:**
   - **Association (Liên kết):** 2 class biết và sử dụng nhau (VD: \`Doctor\` khám cho \`Patient\`). Vòng đời hoàn toàn độc lập.
   - **Aggregation (Thu nạp lỏng - \"has-a\"):** Class cha chứa tham chiếu/con trỏ tới class con (VD: \`Class\` chứa danh sách \`Student*\`). Khi cha hủy, con **vẫn tồn tại**. Ký hiệu: hình thoi rỗng \`◇\`.
   - **Composition (Chứa gộp chặt - \"has-a\"):** Class cha chứa hẳn class con làm thành phần trực tiếp (VD: \`Circle\` chứa \`Point2D center\`). Khi cha hủy, con **bị hủy theo**. Ký hiệu: hình thoi đặc \`◆\`.`
    },
    {
      id: "bank_t4",
      number: 4,
      type: "theory",
      difficulty: "hard",
      title: "Dạng 1.4: Template C++, Chuyên Biệt Hóa & Cơ Chế Exception Safety (RAII)",
      maxScore: 2.0,
      slideRef: "Tuần 7 (Mục 6.1 -> 6.6 - Template & Exception Handling)",
      prompt: `**Yêu cầu:**
1. Phân biệt giữa **Template Function** và **Template Class**. Khi nào cần dùng **Template Specialization (Chuyên biệt hóa)**?
2. Trình bày cơ chế **Stack Unwinding** khi ngoại lệ (exception) được ném ra qua từ khóa \`throw\`.
3. Giải thích tại sao thứ tự các khối \`catch\` phải đặt từ **lớp con cụ thể trước, lớp cha tổng quát sau** và rủi ro ngoại lệ trong Constructor.`,
      subQuestions: [
        {
          id: "bank_t4_q1",
          question: "Điều gì xảy ra nếu đặt `catch (std::exception& e)` TRƯỚC `catch (std::out_of_range& e)`?",
          options: [
            "A. Báo lỗi cú pháp lúc compile.",
            "B. Khối `catch (out_of_range)` không bao giờ được thực thi vì mọi exception con đều bị khối cha chặn trước.",
            "C. Chương trình tự động đổi thứ tự lại cho đúng.",
            "D. Ngoại lệ bị bỏ qua và chương trình chạy tiếp."
          ],
          correctIndex: 1,
          explanation: "Catch blocks được duyệt tuần tự. Lớp cha đứng trước sẽ khớp với mọi ngoại lệ con, làm cho nhánh catch con bên dưới trở thành dead code."
        },
        {
          id: "bank_t4_q2",
          question: "Khi một ngoại lệ bị ném ra khỏi Constructor trong quá trình khởi tạo đối tượng, Destructor của đối tượng đó có được gọi không?",
          options: [
            "A. Có, destructor luôn được gọi tự động.",
            "B. Không, vì đối tượng được coi là chưa hoàn tất vòng đời tạo lập nên destructor của nó sẽ KHÔNG được gọi.",
            "C. Chỉ gọi nếu class có từ khóa explicit.",
            "D. Chỉ gọi trong môi trường 64-bit."
          ],
          correctIndex: 1,
          explanation: "Trong C++, một object chỉ được coi là đã sinh ra khi constructor kết thúc thành công. Nếu constructor throw exception giữa chừng, destructor của object đó KHÔNG chạy -> nguy cơ rò rỉ nếu dùng con trỏ thô."
        }
      ],
      detailedAnswer: `### HƯỚNG DẪN TRẢ LỜI CHI TIẾT:
1. **Template & Specialization:**
   - Template cho phép lập trình tổng quát (Generic Programming), compiler sinh mã tương ứng theo từng kiểu dữ liệu lúc biên dịch.
   - Template Specialization (cú pháp \`template<>\`) dùng để cài đặt thuật toán hoặc cấu trúc lưu trữ tối ưu riêng biệt cho một kiểu dữ liệu cụ thể (ví dụ xử lý chuỗi \`const char*\` hay \`vector<bool>\`).
2. **Stack Unwinding & RAII:**
   - Khi có \`throw\`, runtime tìm ngược cây gọi hàm (call stack) đến \`catch\` tương ứng. Trong quá trình này, destructor của tất cả biến cục bộ trên stack đều được gọi tự động giải phóng tài nguyên (RAII).
3. **Thứ tự Catch:**
   - Luôn đặt ngoại lệ cụ thể trước, tổng quát sau. Khối \`catch(...)\` luôn đặt cuối cùng làm fallback.`
    }
  ],

  // =========================================================================
  // TYPE 2: ĐỌC CODE ĐOÁN OUTPUT (CODE TRACING BANK)
  // =========================================================================
  code_trace: [
    {
      id: "bank_c1",
      number: 1,
      type: "code_trace",
      difficulty: "medium",
      title: "Dạng 2.1: Vòng Đời Đối Tượng, Bẫy Pass-by-Value & Bẫy Khai Báo Hàm",
      maxScore: 2.0,
      slideRef: "Tuần 4 (Mục 3.1, 3.4)",
      trapRef: "Bẫy 1 (Khai báo hàm), Bẫy 3 (Copy Ctor pass-by-value)",
      code: `#include <iostream>
using namespace std;

class Alpha {
    int id;
public:
    Alpha() : id(0) { cout << "A0 "; }
    Alpha(int x) : id(x) { cout << "A" << id << " "; }
    Alpha(const Alpha& other) : id(other.id + 10) { cout << "CP" << id << " "; }
    ~Alpha() { cout << "D" << id << " "; }
    void show() { cout << "[" << id << "] "; }
};

void run(Alpha a) {
    a.show();
}

int main() {
    Alpha a1(1);
    Alpha a2(); // Bẫy khai báo hàm!
    cout << "| ";
    run(a1);
    cout << "| ";
    Alpha a3 = a1;
    cout << endl;
    return 0;
}`,
      expectedOutput: "A1 | CP11 [11] D11 | CP11 \nD11 D1",
      alternativeOutputs: [
        "A1 | CP11 [11] D11 | CP11\nD11 D1",
        "A1 | CP11 [11] D11 | CP11 \nD11 D1 "
      ],
      stepByStepAnalysis: [
        { step: 1, line: "Alpha a1(1);", explanation: "Gọi constructor 1 tham số -> in ra: `A1 `" },
        { step: 2, line: "Alpha a2();", explanation: "⚠️ BẪY SỐ 1: Đây là khai báo HÀM trả về `Alpha`, KHÔNG tạo object! Không có constructor nào được gọi." },
        { step: 3, line: "cout << \"| \";", explanation: "In ra ký tự phân cách: `| `" },
        { step: 4, line: "run(a1);", explanation: "Hàm nhận tham trị `Alpha a` -> gọi Copy Constructor. `id = a1.id + 10 = 11`. In `CP11 `. Trong hàm gọi `a.show()` in `[11] `. Hết hàm, `a` bị hủy -> gọi destructor in `D11 `. Tổng đoạn này: `CP11 [11] D11 `" },
        { step: 5, line: "Alpha a3 = a1;", explanation: "Khởi tạo bằng gán -> gọi Copy Constructor. `id = a1.id + 10 = 11`. In `CP11 `" },
        { step: 6, line: "Kết thúc main():", explanation: "Hủy theo thứ tự LIFO: `a3` (id=11 -> `D11 `), `a1` (id=1 -> `D1 `). In ra: `D11 D1`" }
      ]
    },
    {
      id: "bank_c2",
      number: 2,
      type: "code_trace",
      difficulty: "hard",
      title: "Dạng 2.2: Kế Thừa, Thứ Tự Constructor/Destructor & Virtual Destructor Trap",
      maxScore: 2.0,
      slideRef: "Tuần 5 (Mục 4.1, 4.6)",
      trapRef: "Bẫy 2 (Virtual Destructor), Bẫy 4 (Quên virtual method)",
      code: `#include <iostream>
using namespace std;

class Base {
public:
    Base() { cout << "B_ctor "; }
    virtual void hello() { cout << "B_hello "; }
    virtual ~Base() { cout << "B_dtor "; }
};

class Sub : public Base {
public:
    Sub() { cout << "S_ctor "; }
    void hello() override { cout << "S_hello "; }
    ~Sub() override { cout << "S_dtor "; }
};

void invoke(Base* p) {
    p->hello();
}

int main() {
    Base* ptr = new Sub();
    cout << "| ";
    invoke(ptr);
    cout << "| ";
    delete ptr;
    return 0;
}`,
      expectedOutput: "B_ctor S_ctor | S_hello | S_dtor B_dtor",
      alternativeOutputs: [
        "B_ctor S_ctor | S_hello | S_dtor B_dtor ",
        "B_ctor S_ctor | S_hello | S_dtor B_dtor\n"
      ],
      stepByStepAnalysis: [
        { step: 1, line: "Base* ptr = new Sub();", explanation: "Khởi tạo `Sub` trên heap: Ctor lớp cha `Base` chạy trước (`B_ctor `), ctor lớp con `Sub` chạy sau (`S_ctor `)." },
        { step: 2, line: "invoke(ptr);", explanation: "Gọi `p->hello()` qua con trỏ `Base*`. Do `hello()` là `virtual`, dynamic binding gọi đúng hàm của `Sub` -> in `S_hello `" },
        { step: 3, line: "delete ptr;", explanation: "Vì `~Base()` là `virtual`, việc hủy xảy ra đa hình: Destructor của `Sub` chạy trước (`S_dtor `), sau đó tới destructor của `Base` (`B_dtor `)." }
      ]
    },
    {
      id: "bank_c3",
      number: 3,
      type: "code_trace",
      difficulty: "hard",
      title: "Dạng 2.3: Exception Handling, Thứ Tự Catch & Stack Unwinding",
      maxScore: 2.0,
      slideRef: "Tuần 7 (Mục 6.6)",
      trapRef: "Bẫy 5 (Thứ tự catch), Bẫy Stack Unwinding",
      code: `#include <iostream>
#include <stdexcept>
using namespace std;

class Guard {
    string name;
public:
    Guard(string n) : name(n) { cout << "+" << name << " "; }
    ~Guard() { cout << "~" << name << " "; }
};

void testException(int code) {
    Guard g1("G1");
    if (code == 1) {
        Guard g2("G2");
        throw runtime_error("Error1");
    }
    cout << "OK ";
}

int main() {
    try {
        testException(1);
    }
    catch (const runtime_error& e) {
        cout << "| CatchRuntime | ";
    }
    catch (const exception& e) {
        cout << "| CatchBase | ";
    }
    return 0;
}`,
      expectedOutput: "+G1 +G2 ~G2 ~G1 | CatchRuntime |",
      alternativeOutputs: [
        "+G1 +G2 ~G2 ~G1 | CatchRuntime | ",
        "+G1 +G2 ~G2 ~G1 | CatchRuntime |\n"
      ],
      stepByStepAnalysis: [
        { step: 1, line: "Guard g1(\"G1\");", explanation: "Khởi tạo đối tượng cục bộ `g1` -> in `+G1 `" },
        { step: 2, line: "Guard g2(\"G2\");", explanation: "Khởi tạo đối tượng cục bộ `g2` trong khối if -> in `+G2 `" },
        { step: 3, line: "throw runtime_error(\"Error1\");", explanation: "Ném ngoại lệ -> kích hoạt cơ chế **Stack Unwinding**. Hủy các biến cục bộ theo thứ tự ngược lại: `g2` hủy trước (`~G2 `), rồi `g1` hủy (`~G1 `)." },
        { step: 4, line: "catch (const runtime_error& e)", explanation: "Khối `catch (runtime_error)` khớp chính xác kiểu exception -> in `| CatchRuntime |`." }
      ]
    },
    {
      id: "bank_c4",
      number: 4,
      type: "code_trace",
      difficulty: "medium",
      title: "Dạng 2.4: Đọc Ghi File Nhị Phân & Bẫy Cờ EOF",
      maxScore: 2.0,
      slideRef: "Tuần 6 (Mục 5.3)",
      trapRef: "Bẫy 8 (while !fin.eof)",
      code: `#include <iostream>
#include <sstream>
using namespace std;

int main() {
    string data = "10 20 30";
    stringstream ss(data);
    int val;
    int count = 0;
    
    while (ss >> val) {
        count++;
        cout << val * 2 << " ";
    }
    cout << "| Total:" << count;
    return 0;
}`,
      expectedOutput: "20 40 60 | Total:3",
      alternativeOutputs: [
        "20 40 60 | Total:3 ",
        "20 40 60 | Total:3\n"
      ],
      stepByStepAnalysis: [
        { step: 1, line: "Vòng lặp while (ss >> val)", explanation: "Đọc an toàn bằng `ss >> val`: Lần 1 đọc 10 -> in 20. Lần 2 đọc 20 -> in 40. Lần 3 đọc 30 -> in 60. Lần 4 hết dữ liệu -> vòng lặp kết thúc ngay mà không đọc dư." },
        { step: 2, line: "cout << \"| Total:\" << count;", explanation: "In tổng số phần tử đã trích xuất: `| Total:3`" }
      ]
    }
  ],

  // =========================================================================
  // TYPE 3: VIẾT CODE (CODE WRITING BANK)
  // =========================================================================
  code_writing: [
    {
      id: "bank_w1",
      number: 1,
      type: "code_writing",
      difficulty: "medium",
      title: "Dạng 3.1: Xây Dựng Lớp MyString Quản Lý Chuỗi Động Chuẩn Rule of Three",
      maxScore: 3.0,
      slideRef: "Tuần 2 (Mục 1.3, 1.4) & Tuần 4 (Rule of Three)",
      prompt: `**Đề bài:**
Hãy cài đặt lớp \`MyString\` quản lý chuỗi ký tự động trên heap theo chuẩn C++ đáp ứng các yêu cầu:
1. Thuộc tính private: \`char* buffer\` và \`int length\`.
2. Default Constructor: khởi tạo chuỗi rỗng (\`length = 0\`, \`buffer = nullptr\`).
3. Parameterized Constructor: \`MyString(const char* str)\` cấp phát động và copy nội dung chuỗi.
4. Copy Constructor (Deep Copy) và Destructor (\`delete[] buffer\`).
5. Toán tử gán \`operator=\`: kiểm tra tự gán (\`this == &other\`), giải phóng bộ nhớ cũ, deep copy và trả về \`*this\`.
6. Nạp chồng toán tử \`+\` nối 2 chuỗi và \`operator<<\` in chuỗi ra màn hình.`,
      starterCode: `#include <iostream>
#include <cstring>
using namespace std;

class MyString {
private:
    char* buffer;
    int length;
public:
    MyString();
    MyString(const char* str);
    MyString(const MyString& other);
    ~MyString();
    MyString& operator=(const MyString& other);
    MyString operator+(const MyString& other) const;
    friend ostream& operator<<(ostream& os, const MyString& s);
};

// Cài đặt các phương thức bên dưới...
`,
      checklist: [
        { id: "c1", label: "Default constructor khởi tạo buffer = nullptr, length = 0 an toàn", weight: 0.25 },
        { id: "c2", label: "Constructor nhận const char* cấp phát new char[length + 1] và strcpy an toàn", weight: 0.5 },
        { id: "c3", label: "Copy constructor thực hiện DEEP COPY độc lập", weight: 0.75 },
        { id: "c4", label: "Destructor giải phóng delete[] buffer và set nullptr", weight: 0.5 },
        { id: "c5", label: "Operator= kiểm tra tự gán (this == &other) trước khi giải phóng", weight: 0.5 },
        { id: "c6", label: "Operator+ và Operator<< cài đặt chính xác", weight: 0.5 }
      ],
      solutionCode: `#include <iostream>
#include <cstring>
using namespace std;

class MyString {
private:
    char* buffer;
    int length;
public:
    MyString() : buffer(nullptr), length(0) {}

    MyString(const char* str) {
        if (str != nullptr) {
            length = strlen(str);
            buffer = new char[length + 1];
            strcpy(buffer, str);
        } else {
            buffer = nullptr;
            length = 0;
        }
    }

    MyString(const MyString& other) {
        length = other.length;
        if (other.buffer != nullptr) {
            buffer = new char[length + 1];
            strcpy(buffer, other.buffer);
        } else {
            buffer = nullptr;
        }
    }

    ~MyString() {
        if (buffer != nullptr) {
            delete[] buffer;
            buffer = nullptr;
        }
        length = 0;
    }

    MyString& operator=(const MyString& other) {
        if (this == &other) return *this;
        delete[] buffer;
        length = other.length;
        if (other.buffer != nullptr) {
            buffer = new char[length + 1];
            strcpy(buffer, other.buffer);
        } else {
            buffer = nullptr;
        }
        return *this;
    }

    MyString operator+(const MyString& other) const {
        MyString result;
        result.length = this->length + other.length;
        result.buffer = new char[result.length + 1];
        result.buffer[0] = '\\0';
        if (this->buffer) strcat(result.buffer, this->buffer);
        if (other.buffer) strcat(result.buffer, other.buffer);
        return result;
    }

    friend ostream& operator<<(ostream& os, const MyString& s) {
        if (s.buffer) os << s.buffer;
        return os;
    }
};`
    },
    {
      id: "bank_w2",
      number: 2,
      type: "code_writing",
      difficulty: "hard",
      title: "Dạng 3.2: Xây Dựng Template SafeQueue<T> Quản Lý Bộ Đệm Và Bắt Ngoại Lệ",
      maxScore: 3.0,
      slideRef: "Tuần 7 (Mục 6.2, 6.6 - Class Template & Exceptions)",
      prompt: `**Đề bài:**
Hãy viết một lớp Template \`SafeQueue<T>\` cài đặt cấu trúc hàng đợi FIFO (First In First Out) sử dụng mảng động trên heap:
1. Thuộc tính private: \`T* arr\`, \`int capacity\`, \`int front\`, \`int rear\`, \`int count\`.
2. Constructor \`SafeQueue(int cap)\`: khởi tạo sức chứa \`cap\` (nếu \`cap <= 0\` thì ném \`std::invalid_argument\`).
3. Destructor giải phóng bộ nhớ heap.
4. Phương thức \`void enqueue(const T& val)\`: thêm phần tử vào cuối hàng đợi. Nếu đầy thì ném \`std::overflow_error(\"Queue is full\")\`.
5. Phương thức \`T dequeue()\`: lấy và xóa phần tử ở đầu hàng đợi. Nếu rỗng thì ném \`std::underflow_error(\"Queue is empty\")\`.
6. Phương thức \`bool isEmpty() const\` và \`int size() const\`.`,
      starterCode: `#include <iostream>
#include <stdexcept>
using namespace std;

template <typename T>
class SafeQueue {
private:
    T* arr;
    int capacity;
    int front;
    int rear;
    int count;
public:
    SafeQueue(int cap);
    ~SafeQueue();
    void enqueue(const T& val);
    T dequeue();
    bool isEmpty() const;
    int size() const;
};

// Cài đặt class template bên dưới...
`,
      checklist: [
        { id: "c1", label: "Cú pháp template <typename T> chính xác ở khai báo và định nghĩa phương thức", weight: 0.5 },
        { id: "c2", label: "Constructor kiểm tra cap <= 0 và ném invalid_argument chuẩn", weight: 0.5 },
        { id: "c3", label: "enqueue kiểm tra count == capacity và ném overflow_error", weight: 0.75 },
        { id: "c4", label: "dequeue kiểm tra count == 0 và ném underflow_error", weight: 0.75 },
        { id: "c5", label: "Xử lý chỉ số vòng (circular index: (rear + 1) % capacity) và Destructor chuẩn", weight: 0.5 }
      ],
      solutionCode: `#include <iostream>
#include <stdexcept>
using namespace std;

template <typename T>
class SafeQueue {
private:
    T* arr;
    int capacity;
    int front;
    int rear;
    int count;
public:
    SafeQueue(int cap) {
        if (cap <= 0) {
            throw invalid_argument("Capacity must be positive");
        }
        capacity = cap;
        arr = new T[capacity];
        front = 0;
        rear = -1;
        count = 0;
    }

    ~SafeQueue() {
        delete[] arr;
        arr = nullptr;
    }

    void enqueue(const T& val) {
        if (count == capacity) {
            throw overflow_error("Queue is full");
        }
        rear = (rear + 1) % capacity;
        arr[rear] = val;
        count++;
    }

    T dequeue() {
        if (isEmpty()) {
            throw underflow_error("Queue is empty");
        }
        T item = arr[front];
        front = (front + 1) % capacity;
        count--;
        return item;
    }

    bool isEmpty() const {
        return count == 0;
    }

    int size() const {
        return count;
    }
};`
    }
  ],

  // =========================================================================
  // TYPE 4: THIẾT KẾ KIẾN TRÚC & DESIGN PATTERNS (ARCHITECTURE BANK)
  // =========================================================================
  design_pattern: [
    {
      id: "bank_d1",
      number: 1,
      type: "design_pattern",
      difficulty: "medium",
      title: "Dạng 4.1: Hệ Thống Ghi Nhật Ký Toàn Cục - Singleton Logger Pattern",
      maxScore: 3.0,
      slideRef: "Tuần 4 (Mục 3.8 - Singleton Pattern) & Tuần 8",
      scenario: `**Tình huống thực tế:**
Bạn đang thiết kế module \`Logger\` cho một ứng dụng ngân hàng phân tán. Yêu cầu kiến trúc:
1. Tất cả các giao dịch (Chuyển tiền, Rút tiền, Đăng nhập) từ các thread khác nhau đều phải ghi log vào **duy nhất 1 file nhật ký**.
2. Chỉ có duy nhất 1 thể hiện của lớp \`Logger\` được tồn tại trong toàn bộ vòng đời chương trình.
3. Không cho phép client gọi \`new Logger()\` tùy tiện.`,
      patternOptions: [
        { id: "singleton", name: "Singleton Pattern", correct: true, reason: "Đảm bảo class chỉ có đúng 1 instance duy nhất toàn cục và cung cấp global access point." },
        { id: "factory", name: "Factory Method Pattern", correct: false, reason: "Factory tạo nhiều loại đối tượng con khác nhau theo tham số runtime." },
        { id: "iterator", name: "Iterator Pattern", correct: false, reason: "Iterator dùng để duyệt danh sách mà không để lộ cấu trúc bên trong." },
        { id: "observer", name: "Observer Pattern", correct: false, reason: "Observer dùng để đồng bộ thông báo 1-nhiều." }
      ],
      roleMapping: [
        { role: "Private Constructor", requirement: "Ngăn chặn khởi tạo đối tượng trực tiếp từ ngoài class bằng new hoặc biến stack." },
        { role: "Static Logger* instance", requirement: "Lưu giữ con trỏ trỏ đến thể hiện duy nhất của Logger trong bộ nhớ." },
        { role: "Static getInstance() Method", requirement: "Điểm truy cập toàn cục: kiểm tra nếu instance chưa có thì tạo mới (Lazy Init) và trả về." },
        { role: "Deleted Copy Ctor & Op=", requirement: "Cấm sao chép nhân bản thể hiện qua Logger copy = *logger;" }
      ],
      umlDiagram: `classDiagram
    class Logger {
        - static Logger* instance
        - ofstream logFile
        - Logger()
        - Logger(const Logger&) = delete
        - void operator=(const Logger&) = delete
        + static Logger* getInstance()
        + void log(string message)
    }`,
      designSkeleton: `class Logger {
private:
    static Logger* instance;
    ofstream logFile;

    Logger() {
        logFile.open("system.log", ios::app);
    }

    Logger(const Logger&) = delete;
    Logger& operator=(const Logger&) = delete;

public:
    static Logger* getInstance() {
        if (instance == nullptr) {
            instance = new Logger();
        }
        return instance;
    }

    void log(const string& msg) {
        if (logFile.is_open()) {
            logFile << "[LOG] " << msg << endl;
        }
    }

    ~Logger() {
        if (logFile.is_open()) logFile.close();
    }
};

Logger* Logger::instance = nullptr;`
    },
    {
      id: "bank_d2",
      number: 2,
      type: "design_pattern",
      difficulty: "hard",
      title: "Dạng 4.2: Hệ Thống Duyệt Danh Sách Trừu Tượng - Iterator Pattern",
      maxScore: 3.0,
      slideRef: "Tuần 8 (Mục 7.3, 8.2 - Iterator Pattern)",
      scenario: `**Tình huống thực tế:**
Bạn xây dựng một cấu trúc dữ liệu tùy biến \`CustomList\` lưu trữ danh sách sản phẩm. Yêu cầu kiến trúc:
1. Cần cung cấp cơ chế duyệt qua các sản phẩm tuần tự mà **hoàn toàn giấu kín cấu trúc lưu trữ nội bộ** (mảng động, danh sách liên kết đơn, cây nhị phân...).
2. Client chỉ tương tác qua một interface chung \`Iterator\` gồm các hàm: \`first()\`, \`next()\`, \`isDone()\`, \`currentItem()\`.
3. Cho phép nhiều iterator cùng duyệt độc lập trên cùng 1 collection cùng một thời điểm.`,
      patternOptions: [
        { id: "iterator", name: "Iterator Pattern", correct: true, reason: "Tách biệt việc duyệt tập hợp ra khỏi cấu trúc dữ liệu chứa nó, đảm bảo tính đóng gói." },
        { id: "singleton", name: "Singleton Pattern", correct: false, reason: "Singleton chỉ tạo 1 instance duy nhất, không giải quyết bài toán duyệt tập hợp." },
        { id: "strategy", name: "Strategy Pattern", correct: false, reason: "Strategy dùng để hoán đổi thuật toán tính toán lúc runtime." }
      ],
      roleMapping: [
        { role: "Iterator (Interface)", requirement: "Định nghĩa giao diện duyệt: first(), next(), isDone(), currentItem()." },
        { role: "ConcreteIterator", requirement: "Cài đặt cụ thể cơ chế duyệt và giữ con trỏ/vị trí hiện hành trên ConcreteAggregate." },
        { role: "Aggregate (Interface)", requirement: "Định nghĩa phương thức tạo iterator: createIterator()." },
        { role: "ConcreteAggregate", requirement: "Lớp chứa dữ liệu thực tế (CustomList), trả về thể hiện của ConcreteIterator tương ứng." }
      ],
      umlDiagram: `classDiagram
    class Iterator {
        <<interface>>
        + first()* void
        + next()* void
        + isDone()* bool
        + currentItem()* int
    }
    class ConcreteIterator {
        - ConcreteAggregate* collection
        - int currentIndex
        + first() void
        + next() void
        + isDone() bool
        + currentItem() int
    }
    class Aggregate {
        <<interface>>
        + createIterator()* Iterator*
    }
    class ConcreteAggregate {
        - int items[]
        + createIterator() Iterator*
    }
    Iterator <|.. ConcreteIterator
    Aggregate <|.. ConcreteAggregate
    ConcreteAggregate --> ConcreteIterator : creates`,
      designSkeleton: `// 1. Iterator Interface
class Iterator {
public:
    virtual ~Iterator() {}
    virtual void first() = 0;
    virtual void next() = 0;
    virtual bool isDone() const = 0;
    virtual int currentItem() const = 0;
};

// Forward declaration
class ConcreteAggregate;

// 2. Concrete Iterator
class ConcreteIterator : public Iterator {
private:
    const ConcreteAggregate* aggregate;
    int current;
public:
    ConcreteIterator(const ConcreteAggregate* agg);
    void first() override { current = 0; }
    void next() override { current++; }
    bool isDone() const override;
    int currentItem() const override;
};

// 3. Aggregate Interface
class Aggregate {
public:
    virtual ~Aggregate() {}
    virtual Iterator* createIterator() const = 0;
};

// 4. Concrete Aggregate
class ConcreteAggregate : public Aggregate {
    friend class ConcreteIterator;
private:
    int* items;
    int count;
public:
    ConcreteAggregate(int n) : count(n) {
        items = new int[count];
    }
    ~ConcreteAggregate() { delete[] items; }

    Iterator* createIterator() const override {
        return new ConcreteIterator(this);
    }
};`
    }
  ]
};
