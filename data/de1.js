/**
 * ĐỀ THI SỐ 1 - CHỦ ĐỀ: CLASS & OBJECT, VÒNG ĐỜI ĐỐI TƯỢNG, BỘ NHỚ VÀ SINGLETON PATTERN
 * Bám sát nội dung slide tuần 2, tuần 4 và tài liệu ôn thi FIT-HCMUS
 */
var EXAM_DE_1 = {
  id: "de1",
  title: "Đề 01: Class, Quản Lý Bộ Nhớ & Singleton Pattern",
  subtitle: "Trọng tâm: Encapsulation, Pointer, Rule of Three, Operator Overloading, Singleton",
  timeMinutes: 90,
  questions: [
    {
      id: "de1_c1",
      number: 1,
      type: "theory",
      title: "Câu 1: Lý Thuyết - Quản Lý Vùng Nhớ & Rule of Three",
      maxScore: 2.0,
      slideRef: "Tuần 2 (Mục 1.3, 1.4) & Tuần 4 (Mục 3.1, 3.2, 3.3)",
      prompt: `**Yêu cầu:**
1. Phân biệt sự khác nhau giữa **Shallow Copy (Sao chép nông)** và **Deep Copy (Sao chép sâu)** trong C++.
2. Tại sao khi một class chứa thành viên con trỏ trỏ tới vùng nhớ heap (\`new\`) thì **bắt buộc** lập trình viên phải tự định nghĩa **Copy Constructor**, **Destructor** và **Operator=** (Quy tắc Rule of Three)?
3. Nếu không tự viết Copy Constructor trong trường hợp trên, điều gì nguy hiểm sẽ xảy ra khi truyền đối tượng theo kiểu pass-by-value hoặc khởi tạo đối tượng mới từ đối tượng cũ?`,
      subQuestions: [
        {
          id: "de1_c1_q1",
          question: "Khẳng định nào sau đây là ĐÚNG NHẤT về Shallow Copy mặc định do compiler tự sinh?",
          options: [
            "A. Shallow Copy tự động cấp phát vùng nhớ mới trên heap và sao chép từng phần tử dữ liệu sang.",
            "B. Shallow Copy chỉ sao chép nguyên xi giá trị từng byte/thuộc tính (bit-by-bit), nếu có con trỏ thì 2 đối tượng sẽ cùng trỏ vào 1 địa chỉ vùng nhớ.",
            "C. Shallow Copy gọi đệ quy Copy Constructor của tất cả các biến thành viên kể cả con trỏ nguyên thủy.",
            "D. Shallow Copy chỉ xảy ra khi dùng từ khóa virtual."
          ],
          correctIndex: 1,
          explanation: "Compiler sinh Copy Constructor mặc định thực hiện shallow copy (sao chép từng thuộc tính). Đối với con trỏ, giá trị địa chỉ được copy nguyên vẹn, khiến cả 2 đối tượng cùng trỏ chung vào 1 khối nhớ heap."
        },
        {
          id: "de1_c1_q2",
          question: "Hiện tượng nào sẽ xảy ra khi 2 đối tượng dùng shallow copy cùng chứa con trỏ kết thúc vòng đời (ra khỏi scope)?",
          options: [
            "A. Tự động chuyển con trỏ thứ hai thành nullptr mà không sinh lỗi.",
            "B. Lỗi Memory Leak vì vùng nhớ không được giải phóng.",
            "C. Lỗi Double Free (giải phóng vùng nhớ 2 lần) dẫn đến Crash/Undefined Behavior chương trình.",
            "D. Không có lỗi gì vì hệ điều hành tự thu gom rác giống Java."
          ],
          correctIndex: 2,
          explanation: "Khi đối tượng thứ nhất hủy, destructor gọi delete[] giải phóng vùng nhớ heap. Khi đối tượng thứ hai hủy, destructor lại gọi delete[] trên cùng địa chỉ đã bị giải phóng trước đó -> lỗi Double Free nghiêm trọng."
        }
      ],
      detailedAnswer: `### HƯỚNG DẪN TRẢ LỜI LÝ THUYẾT CHI TIẾT:
1. **Shallow Copy vs Deep Copy:**
   - **Shallow copy (Sao chép nông):** Sao chép nguyên giá trị từng trường (field-by-field / bit-by-bit). Với con trỏ, chỉ sao chép địa chỉ, cả 2 đối tượng cùng trỏ chung 1 khối nhớ.
   - **Deep copy (Sao chép sâu):** Cấp phát vùng nhớ mới hoàn toàn độc lập trên heap cho đối tượng đích, sau đó sao chép toàn bộ dữ liệu từ vùng nhớ nguồn sang.

2. **Lý do phải tuân thủ Rule of Three:**
   - **Destructor:** Bắt buộc có \`delete / delete[]\` để giải phóng vùng nhớ heap khi đối tượng bị hủy, tránh **Memory Leak**.
   - **Copy Constructor:** Đảm bảo khi tạo object mới từ object cũ (hoặc truyền qua hàm dạng pass-by-value) thì thực hiện Deep Copy, tránh việc 2 object trỏ chung vùng nhớ.
   - **Toán tử gán (Operator=):** Đảm bảo việc gán giữa 2 đối tượng đã tồn tại an toàn: phải kiểm tra tự gán (\`this == &src\`), giải phóng dữ liệu cũ, cấp phát vùng nhớ mới và deep copy, cuối cùng trả về \`*this\`.

3. **Nguy cơ khi không tự viết:**
   - Sửa đổi dữ liệu của 1 object sẽ làm thay đổi ngoài ý muốn dữ liệu của object kia.
   - Khi cả 2 object ra khỏi scope, destructor mặc định (hoặc destructor tự viết không có deep copy) sẽ delete cùng 1 vùng nhớ 2 lần -> **Lỗi Double Free Crash chương trình**.`
    },
    {
      id: "de1_c2",
      number: 2,
      type: "code_trace",
      title: "Câu 2: Đọc Code Đoán Output (Tracer)",
      maxScore: 2.0,
      slideRef: "Tuần 4 (Mục 3.1, 3.6 - Constructor, Static, Pass-by-value trap)",
      trapRef: "Bẫy 1 (Khai báo hàm), Bẫy 3 (Copy Constructor), Bẫy 9 (Static Member)",
      code: `#include <iostream>
using namespace std;

class Tracker {
    int id;
    static int count;
public:
    Tracker() {
        id = ++count;
        cout << "C" << id << " ";
    }
    Tracker(int customId) {
        id = customId;
        cout << "P" << id << " ";
    }
    Tracker(const Tracker& other) {
        id = ++count;
        cout << "CP" << id << " ";
    }
    ~Tracker() {
        cout << "D" << id << " ";
    }
    void print() { cout << "[" << id << "] "; }
};

int Tracker::count = 0;

void testFunc(Tracker obj) {
    obj.print();
}

int main() {
    Tracker t1;
    Tracker t2(99);
    Tracker t3(); // Bẫy khai báo hàm!
    
    cout << "| ";
    testFunc(t1);
    cout << "| ";
    
    Tracker t4 = t2;
    cout << endl;
    return 0;
}`,
      expectedOutput: "C1 P99 | CP2 [2] D2 | CP3 \nD3 D99 D1",
      alternativeOutputs: [
        "C1 P99 | CP2 [2] D2 | CP3\nD3 D99 D1",
        "C1 P99 | CP2 [2] D2 | CP3 \nD3 D99 D1 "
      ],
      stepByStepAnalysis: [
        {
          step: 1,
          line: "Tracker t1;",
          explanation: "Gọi Default Constructor. `count` tăng từ 0 lên 1. `id = 1`. In ra: `C1 `"
        },
        {
          step: 2,
          line: "Tracker t2(99);",
          explanation: "Gọi Parameterized Constructor với customId = 99. `id = 99` (count vẫn là 1). In ra: `P99 `"
        },
        {
          step: 3,
          line: "Tracker t3();",
          explanation: "⚠️ BẪY SỐ 1: Đây là khai báo HÀM `t3()` trả về `Tracker`, KHÔNG tạo object! Không có constructor nào được gọi, không in gì."
        },
        {
          step: 4,
          line: "cout << \"| \";",
          explanation: "In ra ký tự phân cách: `| `"
        },
        {
          step: 5,
          line: "testFunc(t1);",
          explanation: "⚠️ BẪY TRUYỀN THAM TRỊ (Pass-by-value): `testFunc(Tracker obj)` nhận tham trị -> gọi Copy Constructor `Tracker(const Tracker&)` để sao chép `t1` vào `obj`. `count` tăng từ 1 lên 2. `id` của `obj` là 2. In ra: `CP2 `. Bên trong hàm gọi `obj.print()` in `[2] `. Khi kết thúc `testFunc`, biến cục bộ `obj` bị hủy -> gọi Destructor in `D2 `. Kết quả đoạn này: `CP2 [2] D2 `"
        },
        {
          step: 6,
          line: "Tracker t4 = t2;",
          explanation: "Khởi tạo `t4` bằng cú pháp gán -> gọi Copy Constructor (chứ không phải operator=). `count` tăng từ 2 lên 3. `id` của `t4` là 3. In ra: `CP3 `"
        },
        {
          step: 7,
          line: "Kết thúc main() hủy các object theo thứ tự ngược lại (LIFO):",
          explanation: "Thứ tự tạo trong main là `t1`, `t2`, `t4` -> Thứ tự hủy là `t4` (id=3 -> `D3`), `t2` (id=99 -> `D99`), `t1` (id=1 -> `D1`). In ra: `D3 D99 D1`"
        }
      ]
    },
    {
      id: "de1_c3",
      number: 3,
      type: "code_writing",
      title: "Câu 3: Viết Code - Xây Dựng Lớp MyIntArray Chuẩn Rule of Three & Stream Operators",
      maxScore: 3.0,
      slideRef: "Tuần 2 (Mục 1.5 - Nạp chồng >> <<) & Tuần 4 (Mục 3.1, 3.2, 3.3 - Rule of Three)",
      prompt: `**Đề bài:**
Hãy viết định nghĩa và cài đặt hoàn chỉnh cho class \`MyIntArray\` quản lý một mảng số nguyên động trên heap theo chuẩn C++ đáp ứng các yêu cầu sau:

1. **Thuộc tính private:** \`int* pArr\` (con trỏ mảng) và \`int size\` (kích thước mảng).
2. **Default Constructor:** Khởi tạo mảng rỗng (\`size = 0\`, \`pArr = nullptr\`).
3. **Parameterized Constructor:** \`MyIntArray(int n)\` khởi tạo mảng gồm \`n\` phần tử đều bằng 0 (nếu \`n <= 0\` thì khởi tạo rỗng).
4. **Copy Constructor (Deep Copy):** Sao chép sâu an toàn từ đối tượng khác.
5. **Destructor:** Giải phóng bộ nhớ động an toàn tránh memory leak.
6. **Toán tử gán \`operator=\`:** Kiểm tra tự gán (\`this == &src\`), giải phóng dữ liệu cũ, deep copy mảng mới và trả về tham chiếu \`*this\`.
7. **Nạp chồng toán tử nhập/xuất \`>>\` và \`<<\`:** 
   - \`operator>>\`: Nhập \`size\` rồi nhập từng phần tử vào mảng (cấp phát lại nếu cần).
   - \`operator<<\`: In các phần tử cách nhau bởi khoảng trắng.`,
      starterCode: `#include <iostream>
using namespace std;

class MyIntArray {
private:
    int* pArr;
    int size;
public:
    // 1. Default constructor
    MyIntArray();

    // 2. Parameterized constructor
    MyIntArray(int n);

    // 3. Copy constructor (Deep copy)
    MyIntArray(const MyIntArray& other);

    // 4. Destructor
    ~MyIntArray();

    // 5. Operator=
    MyIntArray& operator=(const MyIntArray& other);

    // 6. Friends for Stream Operators
    friend istream& operator>>(istream& is, MyIntArray& arr);
    friend ostream& operator<<(ostream& os, const MyIntArray& arr);
};

// Cài đặt các phương thức bên dưới...
`,
      checklist: [
        { id: "c1", label: "Default Constructor khởi tạo an toàn (size = 0, pArr = nullptr)", weight: 0.25 },
        { id: "c2", label: "Parameterized Constructor kiểm tra n > 0, cấp phát `new int[size]` và gán giá trị khởi tạo", weight: 0.5 },
        { id: "c3", label: "Copy Constructor thực hiện DEEP COPY (cấp phát vùng nhớ mới và chép từng phần tử)", weight: 0.75 },
        { id: "c4", label: "Destructor gọi `delete[] pArr;` và gán `pArr = nullptr`", weight: 0.5 },
        { id: "c5", label: "Operator= có kiểm tra tự gán (`if (this == &other) return *this;`), giải phóng bộ nhớ cũ trước khi copy", weight: 0.5 },
        { id: "c6", label: "Operator>> và Operator<< nhận và trả về đúng tham chiếu `istream&` / `ostream&` để hỗ trợ chuỗi lệnh", weight: 0.5 }
      ],
      solutionCode: `#include <iostream>
using namespace std;

class MyIntArray {
private:
    int* pArr;
    int size;
public:
    // 1. Default Constructor
    MyIntArray() : pArr(nullptr), size(0) {}

    // 2. Parameterized Constructor
    MyIntArray(int n) {
        if (n > 0) {
            size = n;
            pArr = new int[size];
            for (int i = 0; i < size; ++i) {
                pArr[i] = 0;
            }
        } else {
            size = 0;
            pArr = nullptr;
        }
    }

    // 3. Copy Constructor (Deep Copy bắt buộc)
    MyIntArray(const MyIntArray& other) {
        size = other.size;
        if (size > 0 && other.pArr != nullptr) {
            pArr = new int[size];
            for (int i = 0; i < size; ++i) {
                pArr[i] = other.pArr[i];
            }
        } else {
            pArr = nullptr;
            size = 0;
        }
    }

    // 4. Destructor
    ~MyIntArray() {
        if (pArr != nullptr) {
            delete[] pArr;
            pArr = nullptr;
        }
        size = 0;
    }

    // 5. Operator= (Rule of Three)
    MyIntArray& operator=(const MyIntArray& other) {
        // Bước 1: Kiểm tra tự gán
        if (this == &other) {
            return *this;
        }
        // Bước 2: Giải phóng vùng nhớ cũ
        delete[] pArr;
        
        // Bước 3: Deep copy dữ liệu mới
        size = other.size;
        if (size > 0 && other.pArr != nullptr) {
            pArr = new int[size];
            for (int i = 0; i < size; ++i) {
                pArr[i] = other.pArr[i];
            }
        } else {
            pArr = nullptr;
            size = 0;
        }
        // Bước 4: Trả về *this
        return *this;
    }

    // 6. Toán tử nhập >>
    friend istream& operator>>(istream& is, MyIntArray& arr) {
        int n;
        is >> n;
        if (n <= 0) {
            delete[] arr.pArr;
            arr.pArr = nullptr;
            arr.size = 0;
            return is;
        }
        delete[] arr.pArr;
        arr.size = n;
        arr.pArr = new int[arr.size];
        for (int i = 0; i < arr.size; ++i) {
            is >> arr.pArr[i];
        }
        return is; // Bắt buộc return stream
    }

    // 7. Toán tử xuất <<
    friend ostream& operator<<(ostream& os, const MyIntArray& arr) {
        for (int i = 0; i < arr.size; ++i) {
            os << arr.pArr[i] << (i + 1 < arr.size ? " " : "");
        }
        return os; // Bắt buộc return stream
    }
};`
    },
    {
      id: "de1_c4",
      number: 4,
      type: "design_pattern",
      title: "Câu 4: Thiết Kế Kiến Trúc Hệ Thống - Singleton Pattern",
      maxScore: 3.0,
      slideRef: "Tuần 4 (Mục 3.8 - Singleton Pattern) & Tuần 8 (Mục 8.1)",
      scenario: `**Tình huống thực tế:**
Bạn đang phát triển module quản lý cấu hình hệ thống (\`AppConfig\`) cho một ứng dụng Game C++. Hệ thống yêu cầu:
1. File cấu hình chỉ được đọc và nạp vào bộ nhớ **duy nhất 1 lần**.
2. Toàn bộ các module khác (Graphics, Audio, Physics, Network) trên toàn chương trình phải dùng chung **duy nhất một thể hiện (single instance)** của \`AppConfig\` để đảm bảo tính đồng bộ dữ liệu.
3. Nghiêm cấm các lập trình viên khác tự ý dùng từ khóa \`new AppConfig()\` ở bất cứ đâu.`,
      patternOptions: [
        { id: "singleton", name: "Singleton Pattern", correct: true, reason: "Đảm bảo class chỉ có duy nhất 1 instance toàn cục và cung cấp global access point." },
        { id: "factory", name: "Factory Method Pattern", correct: false, reason: "Factory dùng để khởi tạo nhiều đối tượng con khác nhau theo tham số runtime, không đảm bảo chỉ có 1 instance." },
        { id: "iterator", name: "Iterator Pattern", correct: false, reason: "Iterator dùng để duyệt qua các phần tử của tập hợp mà không để lộ cấu trúc bên trong." },
        { id: "observer", name: "Observer Pattern", correct: false, reason: "Observer dùng để thông báo sự kiện giữa các đối tượng 1-nhiều." }
      ],
      roleMapping: [
        { role: "Private Constructor", requirement: "Ngăn chặn tạo instance trực tiếp từ bên ngoài class bằng lệnh `new` hoặc khai báo biến cục bộ." },
        { role: "Static Pointer Instance", requirement: "Lưu giữ con trỏ trỏ đến thể hiện duy nhất của class trong suốt vòng đời chương trình." },
        { role: "Static getInstance() Method", requirement: "Cung cấp điểm truy cập toàn cục, kiểm tra nếu instance chưa có thì tạo mới (Lazy Initialization), sau đó trả về instance." },
        { role: "Deleted Copy Constructor & Op=", requirement: "Ngăn chặn việc vô tình nhân bản thể hiện qua `AppConfig copy = *config;`" }
      ],
      umlDiagram: `
classDiagram
    class AppConfig {
        - static AppConfig* instance
        - string serverIP
        - int port
        - AppConfig()
        - AppConfig(const AppConfig&) = delete
        - void operator=(const AppConfig&) = delete
        + static AppConfig* getInstance()
        + string getServerIP() const
        + void setServerIP(string ip)
    }
`,
      designSkeleton: `class AppConfig {
private:
    // 1. Con trỏ static lưu instance duy nhất
    static AppConfig* instance;
    
    string serverIP;
    int port;

    // 2. Constructor đặt ở PRIVATE
    AppConfig() {
        serverIP = "127.0.0.1";
        port = 8080;
    }

    // C++11: Cấm copy constructor và toán tử gán
    AppConfig(const AppConfig&) = delete;
    AppConfig& operator=(const AppConfig&) = delete;

public:
    // 3. Static method toàn cục lấy thể hiện
    static AppConfig* getInstance() {
        if (instance == nullptr) {
            instance = new AppConfig();
        }
        return instance;
    }

    string getServerIP() const { return serverIP; }
    void setServerIP(const string& ip) { serverIP = ip; }
};

// 4. Khởi tạo biến static ở file .cpp
AppConfig* AppConfig::instance = nullptr;

// Sử dụng trong client:
void main() {
    AppConfig* config = AppConfig::getInstance();
    cout << config->getServerIP();
}`
    }
  ]
};
