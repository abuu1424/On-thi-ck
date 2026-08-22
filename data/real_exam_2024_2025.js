/**
 * ĐỀ THI CHÍNH THỨC CUỐI KỲ OOP (CSC10003) - ĐH KHOA HỌC TỰ NHIÊN ĐHQG-HCM (FIT-HCMUS)
 * Học kỳ 3 - Năm học 2024-2025
 * Thời gian: 100 phút
 * Mã lưu trữ: CK2425-3 / CSC10003
 */

var REAL_EXAM_2024_2025 = {
  id: "real_exam_2425_hk3",
  title: "Đề Thi Chính Thức Cuối Kỳ OOP (HK3 / 2024-2025) · FIT-HCMUS",
  academicYear: "2024-2025",
  semester: "Học kỳ 3 (Semester 3)",
  courseCode: "CSC10003",
  courseName: "Object Oriented Programming (Lập Trình Hướng Đối Tượng)",
  timeMinutes: 100,
  note: "Sinh viên được sử dụng 1 tờ tài liệu A4 viết tay hoặc in 2 mặt. Khuyến khích trả lời bằng tiếng Anh.",

  // =========================================================================
  // CÂU 1 (1.0 ĐIỂM) - LÝ THUYẾT BẢN CHẤT
  // =========================================================================
  question1: {
    number: 1,
    points: 1.0,
    title: "Question 1 (1 point): Static vs Non-static Data Members in C++",
    questionText: "What is the difference between static data members and non-static data members in C++?",
    rubricAnswer: "### Barem Điểm & Lời Giải Chuẩn Của Giảng Viên:\n\n" +
      "| Tiêu Chí So Sánh | Non-static Data Members (Thuộc Tính Thường) | Static Data Members (Thuộc Tính Tĩnh) |\n" +
      "| :--- | :--- | :--- |\n" +
      "| **Thuộc quyền sở hữu (Ownership)** | Thuộc về **từng thể hiện (instance/object)** riêng biệt của class. | Thuộc về **toàn bộ Class**, không gắn riêng với đối tượng nào. |\n" +
      "| **Vùng nhớ & Cấp phát (Memory)** | Mỗi đối tượng khi tạo ra (new hoặc stack) đều được cấp phát vùng nhớ riêng cho thuộc tính này. | Chỉ có **duy nhất 1 vùng nhớ tĩnh (Data Segment)** được chia sẻ chung cho tất cả các đối tượng. |\n" +
      "| **Vòng đời (Lifetime)** | Sinh ra khi đối tượng được khởi tạo và bị hủy khi đối tượng bị giải phóng. | Tồn tại **suốt vòng đời chương trình** (từ lúc bắt đầu đến khi kết thúc main()). |\n" +
      "| **Khởi tạo (Initialization)** | Được khởi tạo trong Constructor hoặc Member Initializer List. | **Bắt buộc phải được định nghĩa và khởi tạo ở bên ngoài Class** (phạm vi file/toàn cục): `int ClassName::member = 0;`. |\n" +
      "| **Cách truy xuất (Access)** | Phải thông qua đối tượng: `obj.member` hoặc `ptr->member`. | Có thể truy xuất trực tiếp qua tên Class mà không cần tạo đối tượng: `ClassName::member`. |\n\n" +
      "### Ví dụ minh họa C++:\n" +
      "```cpp\n" +
      "class Student {\n" +
      "public:\n" +
      "    int id;               // Non-static: Mỗi sinh viên có 1 mã số id riêng\n" +
      "    static int count;     // Static: Biến đếm chung tổng số sinh viên của toàn bộ trường\n" +
      "};\n\n" +
      "// Định nghĩa ngoài class (BẮT BUỘC):\n" +
      "int Student::count = 0;\n\n" +
      "int main() {\n" +
      "    Student s1; s1.id = 101;\n" +
      "    Student s2; s2.id = 102;\n" +
      "    Student::count = 2; // Truy xuất qua tên Class\n" +
      "}\n" +
      "```"
  },

  // =========================================================================
  // CÂU 2 (2.0 ĐIỂM) - ĐỌC CODE ĐOÁN OUTPUT & BẪY KINH ĐIỂN
  // =========================================================================
  question2: {
    number: 2,
    points: 2.0,
    title: "Question 2 (2 points): Code Tracing & Deep Constructor Traps",
    code: `#include <iostream>
#include <string>
using namespace std;

class Shape {
protected:
    string _name;
public:
    Shape() : _name("") {
        cout << "Shape default constructor\\n";
    }
    Shape(string name) : _name(name) {
        cout << "Shape parameter constructor\\n";
    }
    virtual ~Shape() {
        cout << "Shape destructor\\n";
    }
    virtual double area() = 0;
    virtual void display() {
        cout << _name << endl;
    }
};

class Point {
    int _x, _y;
public:
    Point(int x = 0, int y = 0) : _x(x), _y(y) {
        cout << "Point constructor\\n";
    }
    Point(const Point& p) {
        _x = p._x; _y = p._y;
        cout << "Point copy constructor\\n";
    }
    ~Point() { cout << "Point destructor\\n"; }
};

class Rectangle : public Shape {
    Point _topLeft;
    int _width, _height;
public:
    Rectangle(const Point& p, int w, int h)
        : Shape("Rectangle"), _topLeft(p), _width(w), _height(h) {
        cout << "Rectangle constructor\\n";
    }
    Rectangle(const Rectangle& p) {
        cout << "Rectangle copy constructor\\n";
        _name = p._name; _width = p._width;
        _height = p._height; _topLeft = p._topLeft;
    }
    double area() override {
        return _width * _height;
    }
    void display() override {
        cout << _name << ": " << area() << endl;
    }
    ~Rectangle() {
        cout << "Rectangle destructor\\n";
    }
};

int main() {
    Rectangle rec1(Point(1, 2), 4, 5);
    Shape* s = new Rectangle(rec1);
    s->display();
    delete s;
    return 0;
}`,
    expectedOutput: "Point constructor\nShape parameter constructor\nPoint copy constructor\nRectangle constructor\nPoint destructor\nShape default constructor\nPoint constructor\nRectangle copy constructor\nRectangle: 20\nRectangle destructor\nPoint destructor\nShape destructor",
    subQuestions: [
      {
        part: "a",
        points: 1.0,
        text: "What are printed on the screen when compiling & executing the above code?",
        answer: "Chuỗi 12 dòng output chính xác như trên."
      },
      {
        part: "b",
        points: 1.0,
        text: "For each line of the printed output, provide an explanation.",
        stepByStep: [
          { step: 1, line: "Point(1, 2) tạm thời", explanation: "Tạo đối tượng tạm `Point(1, 2)` làm tham số thứ 1 -> in `Point constructor`." },
          { step: 2, line: "Rectangle rec1(...) khởi tạo", explanation: "Lớp cha `Shape(\"Rectangle\")` chạy -> in `Shape parameter constructor`. Thành viên `_topLeft(p)` gọi Copy Constructor của Point -> in `Point copy constructor`. Thân hàm `Rectangle(...)` chạy -> in `Rectangle constructor`. Kết thúc biểu thức khởi tạo, đối tượng tạm `Point(1, 2)` bị hủy -> in `Point destructor`." },
          { step: 3, line: "new Rectangle(rec1) - BẪY CỰC HIỂM", explanation: "⚠️ BẪY ĐỈNH CAO: Trong `Rectangle(const Rectangle& p)`, lập trình viên KHÔNG GỌI `Shape(p)` và KHÔNG GỌI `_topLeft(p._topLeft)` trong Member Initializer List! Do đó, C++ tự động gọi **Default Constructor** của lớp cha `Shape()` -> in `Shape default constructor`, và Default Constructor của thành viên `Point()` -> in `Point constructor`. Sau đó thân hàm Copy Constructor của Rectangle mới chạy -> in `Rectangle copy constructor` (sau đó mới gán giá trị ở thân hàm)." },
          { step: 4, line: "s->display()", explanation: "Lời gọi đa hình qua `Shape*` gọi `Rectangle::display()` -> in `Rectangle: 20`." },
          { step: 5, line: "delete s", explanation: "Vì `~Shape()` là virtual destructor -> gọi `~Rectangle()` in `Rectangle destructor`, hủy thành viên `_topLeft` in `Point destructor`, cuối cùng gọi `~Shape()` in `Shape destructor`." }
        ]
      }
    ]
  },

  // =========================================================================
  // CÂU 3 (3.0 ĐIỂM) - VIẾT CODE C++ LỚP COMPUTER
  // =========================================================================
  question3: {
    number: 3,
    points: 3.0,
    title: "Question 3 (3 points): Implement Class Computer with Operators & Streaming",
    description: "Implement a C++ class named `Computer` that models a computer's specifications and supports full comparison operators as well as input/output streaming.\n\n" +
      "Specifically, the class follows the specification below:\n" +
      "- **Attributes:**\n" +
      "  - `brand` (string): Brand name of the computer\n" +
      "  - `ram` (int): Unit is GB\n" +
      "  - `cpu` (float): Unit is GHz\n" +
      "- **Methods:**\n" +
      "  - `getPerformanceScore()` returns `ram * cpu`\n" +
      "- **Operator Overloads:**\n" +
      "  - Comparison: `==`, `!=`, `<`, `<=`, `>`, `>=` based on `getPerformanceScore()`\n" +
      "  - Stream: `>>` to input `brand ram cpu`\n" +
      "  - Stream: `<<` to output `\"Brand: <brand>, RAM: <ram>GB, CPU: <cpu>GHz\"`",
    checklist: [
      { id: "c1", text: "Khai báo đầy đủ 3 thuộc tính `brand (string)`, `ram (int)`, `cpu (float)` (+0.5đ)", points: 0.5 },
      { id: "c2", text: "Constructor và phương thức `getPerformanceScore() const` tính `ram * cpu` (+0.5đ)", points: 0.5 },
      { id: "c3", text: "Nạp chồng đầy đủ 6 toán tử so sánh `==`, `!=`, `<`, `<=`, `>`, `>=` dựa trên điểm hiệu năng (+1.0đ)", points: 1.0 },
      { id: "c4", text: "Nạp chồng `operator>>` nhập `brand >> ram >> cpu` (+0.5đ)", points: 0.5 },
      { id: "c5", text: "Nạp chồng `operator<<` in đúng mẫu `Brand: <brand>, RAM: <ram>GB, CPU: <cpu>GHz` (+0.5đ)", points: 0.5 }
    ],
    starterCode: `#include <iostream>
#include <string>
using namespace std;

class Computer {
private:
    string brand;
    int ram;    // GB
    float cpu;  // GHz
public:
    Computer(string b = "", int r = 0, float c = 0.0f);

    float getPerformanceScore() const;

    // 6 Comparison operators
    bool operator==(const Computer& other) const;
    bool operator!=(const Computer& other) const;
    bool operator<(const Computer& other) const;
    bool operator<=(const Computer& other) const;
    bool operator>(const Computer& other) const;
    bool operator>=(const Computer& other) const;

    // Stream operators
    friend istream& operator>>(istream& is, Computer& comp);
    friend ostream& operator<<(ostream& os, const Computer& comp);
};

// TODO: Cài đặt chi tiết các phương thức ở đây...
`,
    solutionCode: `#include <iostream>
#include <string>
using namespace std;

class Computer {
private:
    string brand;
    int ram;   // GB
    float cpu; // GHz

public:
    // Constructor
    Computer(string b = "", int r = 0, float c = 0.0f)
        : brand(b), ram(r), cpu(c) {}

    // Method tính điểm hiệu năng
    float getPerformanceScore() const {
        return ram * cpu;
    }

    // 6 Toán tử so sánh dựa trên điểm hiệu năng
    bool operator==(const Computer& other) const {
        return getPerformanceScore() == other.getPerformanceScore();
    }

    bool operator!=(const Computer& other) const {
        return !(*this == other);
    }

    bool operator<(const Computer& other) const {
        return getPerformanceScore() < other.getPerformanceScore();
    }

    bool operator<=(const Computer& other) const {
        return getPerformanceScore() <= other.getPerformanceScore();
    }

    bool operator>(const Computer& other) const {
        return getPerformanceScore() > other.getPerformanceScore();
    }

    bool operator>=(const Computer& other) const {
        return getPerformanceScore() >= other.getPerformanceScore();
    }

    // Toán tử nhập luồng >> (brand ram cpu)
    friend istream& operator>>(istream& is, Computer& comp) {
        is >> comp.brand >> comp.ram >> comp.cpu;
        return is;
    }

    // Toán tử xuất luồng << ("Brand: <brand>, RAM: <ram>GB, CPU: <cpu>GHz")
    friend ostream& operator<<(ostream& os, const Computer& comp) {
        os << "Brand: " << comp.brand << ", RAM: " << comp.ram << "GB, CPU: " << comp.cpu << "GHz";
        return os;
    }
};`
  },

  // =========================================================================
  // CÂU 4 (4.0 ĐIỂM) - THIẾT KẾ KIẾN TRÚC ENTERPRISE VALIDATOR (GOOGLE C++ STYLE)
  // =========================================================================
  question4: {
    number: 4,
    points: 4.0,
    title: "Question 4 (4 points): Enterprise Input Validator Architecture (Google C++ Style)",
    scenario: "Hệ thống yêu cầu viết chương trình nhận vào một số nguyên tố trong khoảng $[1, 100]$ từ bàn phím.\n" +
      "Thay vì dùng ngoại lệ (`try-catch`), hệ thống áp dụng cấu trúc `Expected<T>` theo Google C++ Style Guide:\n\n" +
      "```cpp\n" +
      "template <typename T>\n" +
      "struct Expected {\n" +
      "    bool success;\n" +
      "    string message;\n" +
      "    T data;\n" +
      "};\n" +
      "template <typename T>\n" +
      "Expected<T> succeed(T value) {\n" +
      "    return Expected<T>{ true, \"\", value };\n" +
      "}\n" +
      "template <typename T>\n" +
      "Expected<T> fail(string message) {\n" +
      "    return Expected<T>{ false, message, T{} };\n" +
      "}\n" +
      "```\n\n" +
      "Yêu cầu kiến trúc:\n" +
      "Thiết kế hệ thống **Data Validators** linh hoạt, dễ mở rộng (Open/Closed Principle) thông qua giao diện chung:\n" +
      "1. `ValidIntegerFormatValidator`: Kiểm tra chuỗi nhập có phải định dạng số nguyên hợp lệ không rỗng.\n" +
      "2. `IsPrimeValidator`: Kiểm tra số có phải số nguyên tố không (dùng `Integer::isPrime(n)`).\n" +
      "3. `ValidIntegerValuesValidator`: Kiểm tra số có nằm trong phạm vi `[min, max]` hay không.\n" +
      "4. Lớp `IntegerRequestUseCase`: Lưu danh sách các Validators (`vector<IValidator*>`), hàm `nextPrime(prompt)` thực hiện kiểm tra tuần tự và trả về `Expected<int>`.",
    testCases: [
      { input: "'' (chuỗi rỗng)", expected: "Error: Invalid integer format" },
      { input: "'a15j'", expected: "Error: Invalid integer format" },
      { input: "101", expected: "Error: Value out of range" },
      { input: "15", expected: "Error: Not a prime number" },
      { input: "71", expected: "You entered a prime: 71" }
    ],
    roleMapping: [
      { role: "Validator Interface", className: "IValidator", description: "Interface chung: `virtual Expected<int> validate(const string& rawInput, int parsedValue) = 0;`" },
      { role: "Format Validator", className: "ValidIntegerFormatValidator", description: "Kiểm tra chuỗi ký tự hợp lệ, không rỗng, toàn chữ số (cho phép dấu âm)." },
      { role: "Range Validator", className: "ValidIntegerValuesValidator", description: "Kiểm tra giá trị nguyên nằm trong đoạn $[min, max]$." },
      { role: "Prime Validator", className: "IsPrimeValidator", description: "Kiểm tra tính nguyên tố thông qua `Integer::isPrime(n)`." },
      { role: "Use Case Context", className: "IntegerRequestUseCase", description: "Chứa `vector<IValidator*>` và điều phối quy trình kiểm thử tuần tự." }
    ],
    umlDiagram: `                   <<interface>>
                    IValidator
     +validate(raw: string, val: int)*: Expected<int>
                         ▲
        ┌────────────────┼────────────────┐
        │                │                │
ValidIntegerFormat   ValidIntegerValues  IsPrimeValidator
  -errorMsg: string   -min, max: int      -errorMsg: string
  
+--------------------------------------------------------+
|                 IntegerRequestUseCase                  |
+--------------------------------------------------------+
| - validators: vector<IValidator*>                      |
+--------------------------------------------------------+
| + addValidator(v: IValidator*): void                   |
| + nextPrime(prompt: string): Expected<int>             |
+--------------------------------------------------------+`,
    solutionCode: `#include <iostream>
#include <string>
#include <vector>
#include <cmath>
#include <sstream>
using namespace std;

// 1. Google Style Expected<T>
template <typename T>
struct Expected {
    bool success;
    string message;
    T data;
};

template <typename T>
Expected<T> succeed(T value) {
    return Expected<T>{ true, "", value };
}

template <typename T>
Expected<T> fail(string message) {
    return Expected<T>{ false, message, T{} };
}

// 2. Class Integer Utility
class Integer {
public:
    static bool isPrime(int number) {
        if (number <= 1) return false;
        for (int i = 2; i * i <= number; ++i) {
            if (number % i == 0) return false;
        }
        return true;
    }
};

// 3. Validator Interface
class IValidator {
public:
    virtual ~IValidator() {}
    virtual Expected<int> validate(const string& rawInput, int parsedValue) = 0;
};

// Validator 1: Kiểm tra định dạng số nguyên hợp lệ
class ValidIntegerFormatValidator : public IValidator {
public:
    Expected<int> validate(const string& rawInput, int parsedValue) override {
        if (rawInput.empty()) {
            return fail<int>("Invalid integer format");
        }
        size_t start = (rawInput[0] == '-' || rawInput[0] == '+') ? 1 : 0;
        if (start == 1 && rawInput.length() == 1) {
            return fail<int>("Invalid integer format");
        }
        for (size_t i = start; i < rawInput.length(); ++i) {
            if (!isdigit(rawInput[i])) {
                return fail<int>("Invalid integer format");
            }
        }
        try {
            int val = stoi(rawInput);
            return succeed<int>(val);
        } catch (...) {
            return fail<int>("Invalid integer format");
        }
    }
};

// Validator 2: Kiểm tra giá trị nằm trong đoạn [min, max]
class ValidIntegerValuesValidator : public IValidator {
private:
    int minVal, maxVal;
public:
    ValidIntegerValuesValidator(int minV, int maxV) : minVal(minV), maxVal(maxV) {}

    Expected<int> validate(const string& rawInput, int parsedValue) override {
        if (parsedValue < minVal || parsedValue > maxVal) {
            return fail<int>("Value out of range");
        }
        return succeed<int>(parsedValue);
    }
};

// Validator 3: Kiểm tra số nguyên tố
class IsPrimeValidator : public IValidator {
public:
    Expected<int> validate(const string& rawInput, int parsedValue) override {
        if (!Integer::isPrime(parsedValue)) {
            return fail<int>("Not a prime number");
        }
        return succeed<int>(parsedValue);
    }
};

// 4. Use Case Class
class IntegerRequestUseCase {
private:
    vector<IValidator*> validators;
public:
    ~IntegerRequestUseCase() {
        for (IValidator* v : validators) delete v;
        validators.clear();
    }

    void addValidator(IValidator* v) {
        if (v) validators.push_back(v);
    }

    Expected<int> nextPrime(string prompt) {
        cout << prompt;
        string buffer;
        if (!getline(cin, buffer)) {
            return fail<int>("Invalid integer format");
        }

        int currentVal = 0;
        for (IValidator* validator : validators) {
            Expected<int> res = validator->validate(buffer, currentVal);
            if (!res.success) {
                return res; // Trả về lỗi của validator đầu tiên thất bại
            }
            currentVal = res.data;
        }
        return succeed<int>(currentVal);
    }
};

// 5. Main function
int main() {
    int min = 1, max = 100;
    IntegerRequestUseCase useCase;

    // Gắn các Validators theo đúng thứ tự kiểm tra
    useCase.addValidator(new ValidIntegerFormatValidator());
    useCase.addValidator(new ValidIntegerValuesValidator(min, max));
    useCase.addValidator(new IsPrimeValidator());

    string prompt = "Please enter a prime number within the range of [" + to_string(min) + ", " + to_string(max) + "]: ";
    auto result = useCase.nextPrime(prompt);

    if (result.success) {
        cout << "You entered a prime: " << result.data << endl;
    } else {
        cout << "Error: " << result.message << endl;
    }

    return 0;
}`
  }
};
