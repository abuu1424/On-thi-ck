/**
 * ĐỀ THI SỐ 5 - ĐỀ THI TỔNG HỢP CUỐI KỲ (CHUẨN FORM FIT-HCMUS CLC)
 * Tích hợp đầy đủ kiến thức tuần 2 đến tuần 8: Class, Pointer, Đa hình, Stream/File, Exception, Singleton & Iterator
 */
var EXAM_DE_5 = {
  id: "de5",
  title: "Đề 05: Đề Thi Thử Tổng Hợp Cuối Kỳ (Form Chuẩn FIT-HCMUS)",
  subtitle: "Cấu trúc chuẩn 4 câu: C1 Lý thuyết (2đ), C2 Đoán output (2đ), C3 Viết code (3đ), C4 Thiết kế kiến trúc (3đ)",
  timeMinutes: 90,
  questions: [
    {
      id: "de5_c1",
      number: 1,
      type: "theory",
      title: "Câu 1: Lý Thuyết Tổng Hợp - Tính Đóng Gói, Đa Hình & Quản Lý Vùng Nhớ",
      maxScore: 2.0,
      slideRef: "Toàn bộ tài liệu tổng hợp ôn thi (Tuần 2 đến 8)",
      prompt: `**Yêu cầu:**
1. Trình bày ngắn gọn ý nghĩa của 4 tính chất cốt lõi trong Lập trình hướng đối tượng (OOP): **Encapsulation (Đóng gói)**, **Inheritance (Kế thừa)**, **Polymorphism (Đa hình)** và **Abstraction (Trừu tượng hóa)**.
2. Một lớp có ít nhất một phương thức thuần ảo (\`pure virtual method = 0\`) được gọi là gì? Lớp này có thể khởi tạo trực tiếp đối tượng bằng lệnh \`new\` hay khai báo biến thường được không? Tại sao?
3. Phân biệt sự khác nhau giữa **Nạp chồng phương thức (Method Overloading)** và **Ghi đè phương thức (Method Overriding)** về thời điểm liên kết (binding time), phạm vi lớp và danh sách tham số.`,
      subQuestions: [
        {
          id: "de5_c1_q1",
          question: "Lệnh nào sau đây sẽ gây LỖI BIÊN DỊCH nếu lớp `Shape` là một Abstract Class (Lớp trừu tượng có chứa hàm thuần ảo)?",
          options: [
            "A. `Shape* p = nullptr;`",
            "B. `void processShape(Shape& s);`",
            "C. `Shape s;`",
            "D. `vector<Shape*> list;`"
          ],
          correctIndex: 2,
          explanation: "Không thể tạo đối tượng (instantiate) trực tiếp của một Abstract Class bằng `Shape s;` hay `new Shape();`. Chỉ có thể khai báo con trỏ `Shape*` hoặc tham chiếu `Shape&` trỏ tới các lớp con cụ thể."
        },
        {
          id: "de5_c1_q2",
          question: "So sánh Method Overloading và Method Overriding trong C++:",
          options: [
            "A. Overloading xảy ra lúc runtime (Dynamic), Overriding xảy ra lúc compile (Static).",
            "B. Overloading cùng trong 1 phạm vi lớp (hoặc cùng namespace) với cùng tên nhưng khác tham số; Overriding nằm ở quan hệ cha-con với cùng chữ ký hàm và hàm cha phải là `virtual`.",
            "C. Overriding không cho phép thay đổi kiểu trả về trong mọi trường hợp.",
            "D. Cả Overloading và Overriding đều bắt buộc phải có từ khóa virtual."
          ],
          correctIndex: 1,
          explanation: "Overloading là nạp chồng (cùng tên, khác tham số, liên kết tĩnh lúc compile). Overriding là ghi đè phương thức ảo ở lớp con (cùng tên, cùng tham số, liên kết động lúc runtime qua vtable)."
        }
      ],
      detailedAnswer: `### HƯỚNG DẪN TRẢ LỜI LÝ THUYẾT CHI TIẾT:
1. **4 Tính chất cốt lõi của OOP:**
   - **Encapsulation (Đóng gói):** Gom dữ liệu (attributes) và hành vi (methods) vào trong 1 class; ẩn giấu chi tiết cài đặt qua access modifiers (\`private\`, \`protected\`), chỉ cung cấp giao diện công khai (\`public\`).
   - **Inheritance (Kế thừa):** Cho phép lớp con kế thừa lại các thuộc tính và phương thức của lớp cha, thúc đẩy tái sử dụng mã nguồn và biểu diễn quan hệ 'is-a'.
   - **Polymorphism (Đa hình):** Khả năng các đối tượng khác nhau phản ứng với cùng một thông điệp/lời gọi hàm theo các cách khác nhau (thông qua hàm ảo \`virtual\` và liên kết động lúc runtime).
   - **Abstraction (Trừu tượng hóa):** Tập trung vào các đặc trưng bản chất của đối tượng mà bỏ qua các chi tiết không cần thiết, được hiện thực qua Abstract Class và Interface.

2. **Lớp trừu tượng (Abstract Class):**
   - Lớp có ít nhất 1 pure virtual method (\`virtual void f() = 0;\`) là **Abstract Class**.
   - **KHÔNG thể** khởi tạo đối tượng trực tiếp (\`Shape s;\` hoặc \`new Shape()\`) vì lớp này chưa được cài đặt đầy đủ hành vi.
   - Mục đích của Abstract Class là làm khuôn mẫu chung và cung cấp giao diện đa hình cho các lớp con kế thừa.

3. **Overloading vs Overriding:**
   | Tiêu chí | Method Overloading (Nạp chồng) | Method Overriding (Ghi đè) |
   |---|---|---|
   | **Phạm vi** | Trong cùng 1 class hoặc cùng scope | Giữa lớp cha và lớp con (kế thừa) |
   | **Tên hàm** | Giống nhau | Giống nhau |
   | **Tham số** | **Bắt buộc phải khác nhau** | **Bắt buộc phải giống nhau** |
   | **Từ khóa virtual** | Không cần | **Bắt buộc ở lớp cha** |
   | **Thời điểm quyết định** | Compile-time (Static binding) | Runtime (Dynamic binding qua vtable) |`
    },
    {
      id: "de5_c2",
      number: 2,
      type: "code_trace",
      title: "Câu 2: Đọc Code Đoán Output (Tổng Hợp Nhiều Bẫy Code)",
      maxScore: 2.0,
      slideRef: "Mục 9 - Các bẫy code hay ra thi (Bẫy 1, 2, 4, 7, 9)",
      trapRef: "Bẫy 1 (Khai báo hàm), Bẫy 2 (Virtual Destructor), Bẫy 4 (Virtual/Non-virtual)",
      code: `#include <iostream>
using namespace std;

class Base {
public:
    Base() { cout << "B"; }
    virtual void show() { cout << "1"; }
    void print() { cout << "2"; }
    virtual ~Base() { cout << "~B"; }
};

class Sub : public Base {
public:
    Sub() { cout << "S"; }
    void show() override { cout << "3"; }
    void print() { cout << "4"; }
    ~Sub() override { cout << "~S"; }
};

void run(Base* p) {
    p->show();
    p->print();
}

int main() {
    cout << "[Init] ";
    Base* ptr = new Sub();
    
    cout << " [Run] ";
    run(ptr);
    
    cout << " [Del] ";
    delete ptr;
    
    cout << " [End]" << endl;
    return 0;
}`,
      expectedOutput: "[Init] BS [Run] 32 [Del] ~S~B [End]",
      alternativeOutputs: [
        "[Init] BS [Run] 32 [Del] ~S~B [End]\n",
        "[Init] BS [Run] 32 [Del] ~S~B [End] "
      ],
      stepByStepAnalysis: [
        {
          step: 1,
          line: "Base* ptr = new Sub();",
          explanation: "Khởi tạo đối tượng `Sub`: Constructor của `Base` chạy trước in `B`, sau đó constructor của `Sub` chạy in `S`. Kết quả: `[Init] BS`"
        },
        {
          step: 2,
          line: "run(ptr); với hàm run(Base* p)",
          explanation: "- `p->show()`: Phương thức `show()` có từ khóa `virtual` -> gọi đa hình động theo đối tượng thực tế `Sub` -> in ra `3`.\n- `p->print()`: Phương thức `print()` KHÔNG có từ khóa `virtual` -> gọi theo kiểu con trỏ `Base*` (Static binding) -> in ra `2`.\n- Kết quả: ` [Run] 32`"
        },
        {
          step: 3,
          line: "delete ptr;",
          explanation: "Vì destructor `~Base()` có `virtual`, lệnh delete gọi `~Sub()` trước in `~S`, sau đó gọi `~Base()` in `~B`. Kết quả: ` [Del] ~S~B`"
        },
        {
          step: 4,
          line: "Tổng kết toàn bộ chuỗi output:",
          explanation: "`[Init] BS [Run] 32 [Del] ~S~B [End]`"
        }
      ]
    },
    {
      id: "de5_c3",
      number: 3,
      type: "code_writing",
      title: "Câu 3: Viết Code - Xây Dựng Lớp String Động (MyString) Chuẩn C++",
      maxScore: 3.0,
      slideRef: "Tuần 3 (Mục 2.2 - C-string), Tuần 4 (Rule of Three), Tuần 2 (Operator Overloading)",
      prompt: `**Đề bài:**
Hãy viết một class \`MyString\` mô phỏng chuỗi ký tự tự quản lý bộ nhớ động bằng C-string (\`char*\`) với các yêu cầu:

1. **Thuộc tính:** \`char* buffer\` (con trỏ lưu mảng ký tự kết thúc bằng \`'\\0'\`) và \`int length\` (độ dài chuỗi không tính '\\0').
2. **Constructors:**
   - Default Constructor: khởi tạo chuỗi rỗng (\`length = 0\`, \`buffer = new char[1]\`, \`buffer[0] = '\\0'\`).
   - Constructor nhận \`const char* str\`: cấp phát và sao chép an toàn chuỗi từ C-string (dùng \`strlen\`, \`strcpy\` hoặc tự viết vòng lặp).
3. **Copy Constructor (Deep Copy) & Destructor:** Tuân thủ quy tắc Rule of Three.
4. **Toán tử gán \`operator=\`:** Kiểm tra tự gán (\`this == &other\`), giải phóng dữ liệu cũ, deep copy.
5. **Toán tử cộng \`operator+\`:** Nối 2 chuỗi \`MyString\` và trả về một đối tượng \`MyString\` mới.
6. **Toán tử xuất \`operator<<\`:** In chuỗi ra stream.`,
      starterCode: `#include <iostream>
#include <cstring>
using namespace std;

class MyString {
private:
    char* buffer;
    int length;
public:
    // Default constructor
    MyString();

    // Parameterized constructor from const char*
    MyString(const char* str);

    // Copy constructor (Deep copy)
    MyString(const MyString& other);

    // Destructor
    ~MyString();

    // Operator=
    MyString& operator=(const MyString& other);

    // Operator+ (Concat)
    MyString operator+(const MyString& other) const;

    // Friend stream operator
    friend ostream& operator<<(ostream& os, const MyString& str);
};

// Cài đặt các phương thức bên dưới...
`,
      checklist: [
        { id: "c1", label: "Default Constructor cấp phát bộ nhớ đúng cho ký tự '\\0' kết thúc chuỗi", weight: 0.5 },
        { id: "c2", label: "Parameterized Constructor kiểm tra str != nullptr, tính length và sao chép đúng", weight: 0.5 },
        { id: "c3", label: "Copy Constructor cấp phát `new char[length + 1]` và Deep Copy an toàn", weight: 0.5 },
        { id: "c4", label: "Destructor giải phóng `delete[] buffer`", weight: 0.5 },
        { id: "c5", label: "Operator= kiểm tra `this == &other`, xóa buffer cũ và copy", weight: 0.5 },
        { id: "c6", label: "Operator+ tính đúng tổng độ dài, tạo buffer mới và trả về MyString nối chuỗi", weight: 0.5 }
      ],
      solutionCode: `#include <iostream>
#include <cstring>
using namespace std;

class MyString {
private:
    char* buffer;
    int length;
public:
    // 1. Default Constructor
    MyString() {
        length = 0;
        buffer = new char[1];
        buffer[0] = '\\0';
    }

    // 2. Parameterized Constructor
    MyString(const char* str) {
        if (str != nullptr) {
            length = strlen(str);
            buffer = new char[length + 1];
            strcpy(buffer, str);
        } else {
            length = 0;
            buffer = new char[1];
            buffer[0] = '\\0';
        }
    }

    // 3. Copy Constructor (Deep Copy)
    MyString(const MyString& other) {
        length = other.length;
        buffer = new char[length + 1];
        strcpy(buffer, other.buffer);
    }

    // 4. Destructor
    ~MyString() {
        delete[] buffer;
        buffer = nullptr;
        length = 0;
    }

    // 5. Operator=
    MyString& operator=(const MyString& other) {
        if (this == &other) {
            return *this;
        }
        delete[] buffer;
        length = other.length;
        buffer = new char[length + 1];
        strcpy(buffer, other.buffer);
        return *this;
    }

    // 6. Operator+ (Nối chuỗi)
    MyString operator+(const MyString& other) const {
        MyString result;
        delete[] result.buffer; // Xóa buffer rỗng mặc định
        
        result.length = this->length + other.length;
        result.buffer = new char[result.length + 1];
        
        strcpy(result.buffer, this->buffer);
        strcat(result.buffer, other.buffer);
        
        return result;
    }

    // 7. Toán tử xuất <<
    friend ostream& operator<<(ostream& os, const MyString& str) {
        if (str.buffer != nullptr) {
            os << str.buffer;
        }
        return os;
    }
};`
    },
    {
      id: "de5_c4",
      number: 4,
      type: "design_pattern",
      title: "Câu 4: Thiết Kế Kiến Trúc Hệ Thống - Game Engine Audio/Log Manager (Singleton & Factory)",
      maxScore: 3.0,
      slideRef: "Tuần 4 (Mục 3.8), Tuần 5 (Mục 4.9), Tuần 8 (Mục 8.1, 8.3)",
      scenario: `**Tình huống thực tế:**
Trong một dự án Game 2D viết bằng C++, bạn chịu trách nhiệm thiết kế hệ thống âm thanh \`SoundManager\`.
Yêu cầu hệ thống:
1. Toàn bộ Game Engine (Menu, Gameplay, Settings, UI) chỉ có **DUY NHẤT 1 đối tượng \`SoundManager\`** tồn tại trong bộ nhớ để tránh việc khởi tạo lại phần cứng âm thanh nhiều lần và xung đột kênh phát.
2. Hệ thống phát được nhiều loại âm thanh khác nhau: \`BackgroundMusic\` (nhạc nền lặp vô tận), \`SoundEffect\` (tiếng nổ, bắn súng phát 1 lần), \`VoiceOver\` (lời thoại nhân vật).
3. Sử dụng kết hợp **Singleton Pattern** (cho \`SoundManager\`) và **Factory Method** (để tạo các loại hiệu ứng âm thanh từ chuỗi định danh \`"BGM"\`, \`"SFX"\`, \`"VOICE"\`).`,
      patternOptions: [
        { id: "singleton_factory", name: "Singleton + Factory Pattern", correct: true, reason: "SoundManager đóng vai trò Singleton quản lý toàn cục duy nhất, bên trong chứa phương thức Factory để tạo các loại âm thanh đa hình." },
        { id: "iterator", name: "Iterator Pattern", correct: false, reason: "Iterator chỉ giải quyết việc duyệt danh sách tuần tự." },
        { id: "observer", name: "Observer Pattern", correct: false, reason: "Observer dùng để phát thông điệp lắng nghe sự kiện." }
      ],
      roleMapping: [
        { role: "Singleton Instance (SoundManager)", requirement: "Constructor private, biến con trỏ static `instance`, phương thức static `getInstance()`." },
        { role: "Abstract Audio (Sound)", requirement: "Lớp cơ sở trừu tượng có phương thức thuần ảo `virtual void Play() = 0;`" },
        { role: "Concrete Sounds (BGM, SFX, Voice)", requirement: "Các lớp kế thừa cài đặt chi tiết việc phát âm thanh tương ứng." },
        { role: "Factory Method", requirement: "Phương thức `createSound(string type)` sinh đúng đối tượng âm thanh lúc runtime." }
      ],
      umlDiagram: `
classDiagram
    class SoundManager {
        - static SoundManager* instance
        - SoundManager()
        + static SoundManager* getInstance()
        + createSound(string type) Sound*
    }
    class Sound {
        <<abstract>>
        + Play()* void
        + Stop()* void
    }
    class BGM {
        + Play() void
        + Stop() void
    }
    class SFX {
        + Play() void
        + Stop() void
    }
    Sound <|-- BGM
    Sound <|-- SFX
    SoundManager ..> Sound : creates (Factory)
`,
      designSkeleton: `#include <iostream>
#include <string>
using namespace std;

// 1. Abstract Sound Class
class Sound {
public:
    virtual ~Sound() = default;
    virtual void Play() = 0;
    virtual void Stop() = 0;
};

// 2. Concrete Sounds
class BGM : public Sound {
public:
    void Play() override { cout << "[BGM] Playing background music looping...\\n"; }
    void Stop() override { cout << "[BGM] Stopped music.\\n"; }
};

class SFX : public Sound {
public:
    void Play() override { cout << "[SFX] Playing sound effect once!\\n"; }
    void Stop() override { cout << "[SFX] Effect ended.\\n"; }
};

// 3. SoundManager combining Singleton and Factory
class SoundManager {
private:
    static SoundManager* instance;
    
    // Private constructor
    SoundManager() { cout << "Initializing Sound Hardware once...\\n"; }
    SoundManager(const SoundManager&) = delete;
    SoundManager& operator=(const SoundManager&) = delete;

public:
    static SoundManager* getInstance() {
        if (instance == nullptr) {
            instance = new SoundManager();
        }
        return instance;
    }

    // Factory Method to create sound objects
    Sound* createSound(const string& type) {
        if (type == "BGM") return new BGM();
        if (type == "SFX") return new SFX();
        return nullptr;
    }
};

SoundManager* SoundManager::instance = nullptr;

// Client Usage
int main() {
    SoundManager* soundMgr = SoundManager::getInstance();
    
    Sound* bgm = soundMgr->createSound("BGM");
    Sound* sfx = soundMgr->createSound("SFX");
    
    bgm->Play();
    sfx->Play();

    delete bgm;
    delete sfx;
    return 0;
}`
    }
  ]
};
