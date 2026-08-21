/**
 * ĐỀ THI SỐ 3 - CHỦ ĐỀ: QUAN HỆ GIỮA CÁC LỚP, FILE I/O VÀ ITERATOR PATTERN
 * Bám sát nội dung slide tuần 6, tuần 8 và tài liệu ôn thi FIT-HCMUS
 */
var EXAM_DE_3 = {
  id: "de3",
  title: "Đề 03: Quan Hệ Đối Tượng, File I/O & Iterator Pattern",
  subtitle: "Trọng tâm: Association/Aggregation/Composition, Đọc/Ghi File, Stringstream, Iterator GoF",
  timeMinutes: 90,
  questions: [
    {
      id: "de3_c1",
      number: 1,
      type: "theory",
      title: "Câu 1: Lý Thuyết - Phân Biệt Các Mối Quan Hệ (UML) & Vòng Đời",
      maxScore: 2.0,
      slideRef: "Tuần 6 (Mục 5.1 - Quan hệ UML, Mục 5.3 - File Programming)",
      prompt: `**Yêu cầu:**
1. Phân biệt rõ sự khác nhau giữa quan hệ **Aggregation (Thu nạp / Sở hữu lỏng)** và **Composition (Hợp thành / Sở hữu chặt)** trong sơ đồ lớp UML.
2. Vòng đời (lifecycle) của đối tượng thành phần phụ thuộc như thế nào vào đối tượng chứa trong hai trường hợp trên? Cho ví dụ thực tế minh họa.
3. Trong lập trình file C++, tại sao cấu trúc vòng lặp \`while(!fin.eof())\` thường dẫn tới lỗi đọc dư một lần ở cuối file? Nêu cách viết chuẩn để khắc phục.`,
      subQuestions: [
        {
          id: "de3_c1_q1",
          question: "Ký hiệu nào trong sơ đồ UML thể hiện mối quan hệ Hợp thành (Composition)?",
          options: [
            "A. Đường nối có mũi tên tam giác rỗng ở đầu lớp cha.",
            "B. Đường nối có hình thoi ĐẶC (filled diamond) ở đầu lớp chứa.",
            "C. Đường nối có hình thoi RỖNG (hollow diamond) ở đầu lớp chứa.",
            "D. Đường nét đứt có mũi tên nhọn trỏ tới interface."
          ],
          correctIndex: 1,
          explanation: "Composition (sở hữu chặt) được biểu diễn bằng hình thoi ĐẶC ở phía lớp sở hữu. Aggregation (sở hữu lỏng) biểu diễn bằng hình thoi RỖNG."
        },
        {
          id: "de3_c1_q2",
          question: "Đoạn code đọc file nào sau đây là AN TOÀN NHẤT và KHÔNG bị lỗi đọc thừa dòng cuối?",
          options: [
            "A. `while (!fin.eof()) { fin >> x; cout << x; }`",
            "B. `while (fin >> x) { cout << x << ' '; }`",
            "C. `do { fin >> x; cout << x; } while (!fin.eof());`",
            "D. `while (fin.good()) { fin >> x; cout << x; }`"
          ],
          correctIndex: 1,
          explanation: "`while (fin >> x)` kiểm tra trạng thái của stream ngay sau thao tác đọc. Nếu đọc không thành công (hết file hoặc sai định dạng), vòng lặp dừng ngay lập tức."
        }
      ],
      detailedAnswer: `### HƯỚNG DẪN TRẢ LỜI LÝ THUYẾT CHI TIẾT:
1. **Phân biệt Aggregation vs Composition:**
   - **Aggregation (Sở hữu lỏng - "has-a"):** Đối tượng thành phần có thể tồn tại độc lập với đối tượng chứa. Khi đối tượng chứa bị hủy, đối tượng thành phần **vẫn tiếp tục tồn tại**. Ký hiệu: Hình thoi rỗng.
     * *Ví dụ:* \`LopHoc\` chứa danh sách con trỏ \`SinhVien*\`. Khi lớp học giải tán, các sinh viên vẫn tồn tại.
   - **Composition (Sở hữu chặt - "is-composed-of"):** Đối tượng thành phần thuộc về và phụ thuộc hoàn toàn vào vòng đời của đối tượng chứa. Khi đối tượng chứa bị hủy, đối tượng thành phần **bị hủy theo ngay lập tức**. Ký hiệu: Hình thoi đặc.
     * *Ví dụ:* \`Circle\` chứa trực tiếp đối tượng \`Point2D Center\` (hoặc \`House\` chứa các \`Room\`). Khi hình tròn bị hủy, tâm của nó cũng mất theo.

2. **Lỗi khi dùng \`while(!fin.eof())\`:**
   - Cờ \`eof\` chỉ được bật lên \`true\` **sau khi** một thao tác đọc cố gắng đọc vượt quá ký tự cuối cùng của file và thất bại.
   - Khi vừa đọc xong phần tử cuối, \`eof\` vẫn là \`false\`. Vòng lặp tiếp tục thực hiện thêm 1 lần, lệnh đọc \`fin >> x\` thất bại nhưng khối lệnh bên trong vẫn xử lý biến \`x\` (lúc này mang giá trị cũ hoặc rác) -> in thừa hoặc tính toán sai.
   - **Cách viết chuẩn:** Dùng điều kiện đọc trực tiếp: \`while (fin >> x)\` hoặc \`while (getline(fin, line))\`.`
    },
    {
      id: "de3_c2",
      number: 2,
      type: "code_trace",
      title: "Câu 2: Đọc Code Đoán Output (Tracer)",
      maxScore: 2.0,
      slideRef: "Tuần 6 (Mục 5.4 - Stringstream & Text Parsing) & Tuần 8 (Mục 7.2 - STL Container)",
      trapRef: "Bẫy 8 (Vòng lặp file & Stream state)",
      code: `#include <iostream>
#include <sstream>
#include <vector>
#include <string>
using namespace std;

int main() {
    string rawData = "10 25 Apple 30 40 Banana 50";
    stringstream ss(rawData);
    
    int num;
    string text;
    vector<int> numbers;
    
    while (ss >> num) {
        numbers.push_back(num);
    }
    
    cout << "Phase 1 - Size: " << numbers.size() << " | ";
    
    // Reset stream state để đọc tiếp phần chuỗi
    ss.clear();
    
    if (ss >> text) {
        cout << "Text: " << text << " | ";
    }
    
    int secondNum;
    if (ss >> secondNum) {
        cout << "Next: " << secondNum << " | ";
    }
    
    cout << "Nums: ";
    for (size_t i = 0; i < numbers.size(); ++i) {
        cout << numbers[i] << (i + 1 < numbers.size() ? "," : "");
    }
    cout << endl;
    return 0;
}`,
      expectedOutput: "Phase 1 - Size: 2 | Text: Apple | Next: 30 | Nums: 10,25",
      alternativeOutputs: [
        "Phase 1 - Size: 2 | Text: Apple | Next: 30 | Nums: 10,25\n",
        "Phase 1 - Size: 2 | Text: Apple | Next: 30 | Nums: 10,25 "
      ],
      stepByStepAnalysis: [
        {
          step: 1,
          line: "while (ss >> num)",
          explanation: "- Đọc số đầu tiên: 10 -> push vào vector.\n- Đọc số thứ hai: 25 -> push vào vector.\n- Gặp từ 'Apple' (không phải số nguyên) -> thao tác đọc `ss >> num` thất bại, cờ `failbit` được bật và vòng lặp dừng lại. `numbers` hiện có 2 phần tử: [10, 25]."
        },
        {
          step: 2,
          line: "cout << \"Phase 1 - Size: \" << numbers.size() << \" | \";",
          explanation: "In ra: `Phase 1 - Size: 2 | `"
        },
        {
          step: 3,
          line: "ss.clear();",
          explanation: "Xóa cờ lỗi `failbit` của stringstream để cho phép tiếp tục đọc từ vị trí con trỏ đang dừng lại (ngay trước chữ 'Apple')."
        },
        {
          step: 4,
          line: "if (ss >> text)",
          explanation: "Đọc chuỗi tiếp theo: lấy được chữ `Apple`. In ra: `Text: Apple | `"
        },
        {
          step: 5,
          line: "if (ss >> secondNum)",
          explanation: "Đọc số nguyên tiếp theo: lấy được số `30`. In ra: `Next: 30 | `"
        },
        {
          step: 6,
          line: "In các số trong vector:",
          explanation: "Vector `numbers` chứa `10` và `25`. In ra `Nums: 10,25`. Toàn bộ dòng hoàn chỉnh là: `Phase 1 - Size: 2 | Text: Apple | Next: 30 | Nums: 10,25`"
        }
      ]
    },
    {
      id: "de3_c3",
      number: 3,
      type: "code_writing",
      title: "Câu 3: Viết Code - Đọc Dữ Liệu File Đa Hình & Tính Tổng Diện Tích",
      maxScore: 3.0,
      slideRef: "Tuần 6 (Mục 5.3, 5.4 - File Programming, Stringstream) & Tuần 5 (Mục 4.3 - Đa hình)",
      prompt: `**Đề bài:**
Viết một chương trình C++ hoàn chỉnh thực hiện các yêu cầu sau:
1. Đọc dữ liệu từ file văn bản có tên \`"figures.txt"\`. Định dạng file:
   - Dòng 1: Số nguyên dương $N$ là số lượng hình.
   - $N$ dòng tiếp theo, mỗi dòng chứa thông tin một hình:
     * \`Square <cạnh>\` (VD: \`Square 5.5\`)
     * \`Circle <bán kính>\` (VD: \`Circle 3.2\`)
     * \`Rectangle <dài> <rộng>\` (VD: \`Rectangle 4 6\`)
2. Sử dụng cấu trúc đa hình (con trỏ \`Figure*\`) và thư viện \`stringstream\` để đọc và khởi tạo các đối tượng hình học tương ứng.
3. Tính **tổng diện tích** của tất cả các hình đọc được từ file.
4. Ghi kết quả tổng diện tích ra file \`"output.txt"\` với độ chính xác 2 chữ số thập phân (\`fixed << setprecision(2)\`).
5. Xử lý đóng file và giải phóng toàn bộ bộ nhớ heap đã cấp phát.`,
      starterCode: `#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <iomanip>
using namespace std;

const double PI = 3.14159;

class Figure {
public:
    virtual ~Figure() = default;
    virtual double Area() const = 0;
};

// Viết các lớp con Square, Circle, Rectangle...
// Viết hàm xử lý đọc file và tính tổng diện tích...
`,
      checklist: [
        { id: "c1", label: "Khai báo đầy đủ các lớp con Square, Circle, Rectangle kế thừa Figure và override Area()", weight: 0.75 },
        { id: "c2", label: "Kiểm tra mở file `fin.is_open()` và `fout.is_open()` an toàn", weight: 0.5 },
        { id: "c3", label: "Dùng `stringstream` hoặc `fin >> type` để phân nhánh tạo đúng đối tượng", weight: 0.75 },
        { id: "c4", label: "Tính tổng diện tích đa hình chính xác và định dạng xuất file 2 chữ số thập phân", weight: 0.5 },
        { id: "c5", label: "Duyệt vòng lặp giải phóng `delete` toàn bộ con trỏ và `close()` file", weight: 0.5 }
      ],
      solutionCode: `#include <iostream>
#include <fstream>
#include <sstream>
#include <vector>
#include <iomanip>
#include <string>
using namespace std;

const double PI = 3.14159;

// 1. Abstract Base Class
class Figure {
public:
    virtual ~Figure() = default;
    virtual double Area() const = 0;
};

class Square : public Figure {
    double side;
public:
    Square(double s) : side(s) {}
    double Area() const override { return side * side; }
};

class Circle : public Figure {
    double radius;
public:
    Circle(double r) : radius(r) {}
    double Area() const override { return PI * radius * radius; }
};

class Rectangle : public Figure {
    double width, height;
public:
    Rectangle(double w, double h) : width(w), height(h) {}
    double Area() const override { return width * height; }
};

int main() {
    ifstream fin("figures.txt");
    if (!fin.is_open()) {
        cerr << "Cannot open input file!" << endl;
        return 1;
    }

    int n;
    fin >> n;
    vector<Figure*> figures;
    string type;

    for (int i = 0; i < n; ++i) {
        fin >> type;
        if (type == "Square") {
            double s;
            fin >> s;
            figures.push_back(new Square(s));
        } else if (type == "Circle") {
            double r;
            fin >> r;
            figures.push_back(new Circle(r));
        } else if (type == "Rectangle") {
            double w, h;
            fin >> w >> h;
            figures.push_back(new Rectangle(w, h));
        }
    }
    fin.close();

    // Tính tổng diện tích
    double totalArea = 0.0;
    for (Figure* f : figures) {
        if (f != nullptr) {
            totalArea += f->Area();
        }
    }

    // Ghi ra output.txt
    ofstream fout("output.txt");
    if (fout.is_open()) {
        fout << fixed << setprecision(2) << totalArea << endl;
        fout.close();
    }

    // Dọn dẹp bộ nhớ động
    for (Figure* f : figures) {
        delete f;
    }
    figures.clear();

    return 0;
}`
    },
    {
      id: "de3_c4",
      number: 4,
      type: "design_pattern",
      title: "Câu 4: Thiết Kế Kiến Trúc Hệ Thống - Iterator Pattern (GoF)",
      maxScore: 3.0,
      slideRef: "Tuần 8 (Mục 7.3 - Iterator Design Pattern, Mục 8.2)",
      scenario: `**Tình huống thực tế:**
Bạn được giao thiết kế cấu trúc dữ liệu lưu trữ hồ sơ nhân viên \`EmployeeList\`.
Yêu cầu kiến trúc:
1. Cho phép các module bên ngoài duyệt qua từng nhân viên để tính lương hoặc in báo cáo theo nhiều tiêu chí khác nhau (duyệt xuôi, duyệt ngược, duyệt nhân viên theo phòng ban).
2. **Không để lộ cấu trúc lưu trữ nội bộ** của \`EmployeeList\` (dù bên trong dùng mảng động, danh sách liên kết \`std::list\`, hay cây nhị phân).
3. Tách biệt hoàn toàn trách nhiệm lưu trữ (\`Aggregate\`) và trách nhiệm duyệt dữ liệu (\`Iterator\`) theo mẫu thiết kế GoF.`,
      patternOptions: [
        { id: "iterator", name: "Iterator Pattern", correct: true, reason: "Cung cấp cách thức truy cập tuần tự các phần tử của một đối tượng tập hợp mà không làm lộ cấu trúc biểu diễn bên trong của nó." },
        { id: "singleton", name: "Singleton Pattern", correct: false, reason: "Không liên quan đến việc duyệt tập hợp phần tử." },
        { id: "strategy", name: "Strategy Pattern", correct: false, reason: "Strategy thay đổi thuật toán xử lý chứ không phụ trách giao diện duyệt phần tử tập hợp." },
        { id: "factory", name: "Factory Pattern", correct: false, reason: "Factory chỉ phụ trách khởi tạo đối tượng." }
      ],
      roleMapping: [
        { role: "Iterator (Interface)", requirement: "Định nghĩa giao diện duyệt: `First()`, `Next()`, `IsDone()`, `CurrentItem()`." },
        { role: "ConcreteIterator (EmployeeIterator)", requirement: "Lưu trữ chỉ số vị trí hiện tại và cài đặt logic duyệt trên cụ thể `EmployeeList`." },
        { role: "Aggregate (Interface)", requirement: "Định nghĩa phương thức tạo iterator: `CreateIterator()`." },
        { role: "ConcreteAggregate (EmployeeList)", requirement: "Lưu trữ tập hợp các nhân viên và cài đặt `CreateIterator()` trả về đối tượng `EmployeeIterator` tương ứng." }
      ],
      umlDiagram: `
classDiagram
    class Iterator {
        <<interface>>
        + First()* void
        + Next()* void
        + IsDone()* bool
        + CurrentItem()* Employee
    }
    class ConcreteIterator {
        - EmployeeList* list
        - int currentIndex
        + First() void
        + Next() void
        + IsDone() bool
        + CurrentItem() Employee
    }
    class Aggregate {
        <<interface>>
        + CreateIterator()* Iterator*
    }
    class EmployeeList {
        - vector~Employee~ data
        + Add(Employee e) void
        + Get(int index) Employee
        + Count() int
        + CreateIterator() Iterator*
    }
    Iterator <|-- ConcreteIterator
    Aggregate <|-- EmployeeList
    ConcreteIterator --> EmployeeList : references
    EmployeeList ..> ConcreteIterator : creates
`,
      designSkeleton: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct Employee {
    string name;
    double salary;
};

// 1. Iterator Interface
class Iterator {
public:
    virtual ~Iterator() = default;
    virtual void First() = 0;
    virtual void Next() = 0;
    virtual bool IsDone() const = 0;
    virtual Employee CurrentItem() const = 0;
};

class EmployeeList; // Forward declaration

// 2. Concrete Iterator
class EmployeeIterator : public Iterator {
private:
    const EmployeeList* list;
    int current;
public:
    EmployeeIterator(const EmployeeList* l);
    void First() override { current = 0; }
    void Next() override { ++current; }
    bool IsDone() const override;
    Employee CurrentItem() const override;
};

// 3. Aggregate Interface
class Aggregate {
public:
    virtual ~Aggregate() = default;
    virtual Iterator* CreateIterator() const = 0;
};

// 4. Concrete Aggregate
class EmployeeList : public Aggregate {
private:
    vector<Employee> employees;
public:
    void Add(const Employee& e) { employees.push_back(e); }
    int Count() const { return employees.size(); }
    Employee Get(int index) const { return employees[index]; }

    Iterator* CreateIterator() const override {
        return new EmployeeIterator(this);
    }
};

// Implementation of EmployeeIterator methods
EmployeeIterator::EmployeeIterator(const EmployeeList* l) : list(l), current(0) {}
bool EmployeeIterator::IsDone() const { return current >= list->Count(); }
Employee EmployeeIterator::CurrentItem() const { return list->Get(current); }

// Client usage
int main() {
    EmployeeList list;
    list.Add({"An", 1500});
    list.Add({"Binh", 2000});

    Iterator* it = list.CreateIterator();
    for (it->First(); !it->IsDone(); it->Next()) {
        Employee e = it->CurrentItem();
        cout << e.name << " - " << e.salary << endl;
    }
    delete it;
    return 0;
}`
    }
  ]
};
