/**
 * ĐỀ THI SỐ 2 - CHỦ ĐỀ: KẾ THỪA, ĐA HÌNH, VIRTUAL DESTRUCTOR VÀ FACTORY CREATION
 * Bám sát nội dung slide tuần 5 và tài liệu ôn thi FIT-HCMUS
 */
var EXAM_DE_2 = {
  id: "de2",
  title: "Đề 02: Kế Thừa, Đa Hình & Factory Pattern",
  subtitle: "Trọng tâm: Dynamic Binding, Abstract Class, Virtual Destructor, Dynamic Cast, Factory Creation",
  timeMinutes: 90,
  questions: [
    {
      id: "de2_c1",
      number: 1,
      type: "theory",
      title: "Câu 1: Lý Thuyết - Đa Hình Động & Virtual Destructor",
      maxScore: 2.0,
      slideRef: "Tuần 5 (Mục 4.2 - Polymorphism, Mục 4.6 - Virtual Destructor, Mục 4.10 - override/final)",
      prompt: `**Yêu cầu:**
1. Phân biệt sự khác nhau giữa **Static Binding (Early Binding)** và **Dynamic Binding (Late Binding)** trong C++.
2. Điều kiện cần và đủ để cơ chế Đa hình động (Dynamic Polymorphism) hoạt động khi gọi một phương thức là gì?
3. Tại sao trong một cây kế thừa có sử dụng đa hình, Destructor của lớp cha (Base class) **bắt buộc phải là \`virtual\`**? Giải thích hậu quả nếu quên từ khóa này.`,
      subQuestions: [
        {
          id: "de2_c1_q1",
          question: "Đoạn mã `Base* p = new Derived(); p->speak();` sẽ gọi phương thức của ai nếu phương thức `speak()` ở lớp `Base` KHÔNG có từ khóa `virtual`?",
          options: [
            "A. Luôn gọi phương thức của `Derived` vì đối tượng thực tế trên heap là `Derived`.",
            "B. Luôn gọi phương thức của `Base` vì trình biên dịch chỉ dựa vào kiểu con trỏ lúc compile (Static Binding).",
            "C. Báo lỗi biên dịch vì không thể gán con trỏ Base trỏ tới Derived.",
            "D. Ném ra ngoại lệ `std::bad_cast` lúc runtime."
          ],
          correctIndex: 1,
          explanation: "Không có `virtual`, C++ dùng Static Binding: hàm được gọi theo kiểu dữ liệu của biến con trỏ (`Base*`), bỏ qua kiểu thực tế của đối tượng."
        },
        {
          id: "de2_c1_q2",
          question: "Lợi ích chính của từ khóa `override` (C++11) khi ghi đè phương thức ảo ở lớp con là gì?",
          options: [
            "A. Tăng tốc độ thực thi của hàm ảo lên gấp 2 lần.",
            "B. Cho phép phương thức ở lớp con truy cập trực tiếp vào thuộc tính private của lớp cha.",
            "C. Bắt compiler kiểm tra tính hợp lệ: nếu sai chữ ký hàm (tên, tham số, const) so với lớp cha thì báo lỗi ngay lúc biên dịch.",
            "D. Ngăn cản các lớp con kế tiếp ghi đè phương thức này."
          ],
          correctIndex: 2,
          explanation: "Từ khóa `override` giúp phát hiện lỗi chính tả hoặc sai lệch chữ ký hàm ảo ngay lúc compile thay vì vô tình tạo ra một hàm mới."
        }
      ],
      detailedAnswer: `### HƯỚNG DẪN TRẢ LỜI LÝ THUYẾT CHI TIẾT:
1. **Static Binding vs Dynamic Binding:**
   - **Static Binding (Early Binding):** Trình biên dịch quyết định hàm nào được gọi ngay tại thời điểm dịch mã (compile-time) dựa vào kiểu tĩnh của con trỏ/biến. Áp dụng cho các hàm thông thường (non-virtual).
   - **Dynamic Binding (Late Binding):** Việc quyết định hàm được gọi được trì hoãn đến thời điểm chạy (runtime) dựa trên bảng con trỏ hàm ảo (vtable) và kiểu thực sự của đối tượng đang được trỏ tới. Áp dụng cho các hàm có từ khóa \`virtual\`.

2. **Điều kiện cần và đủ để xảy ra đa hình động:**
   - Có quan hệ kế thừa (Inheritance).
   - Phương thức ở lớp cha phải được khai báo là **\`virtual\`** (hoặc pure virtual \`= 0\`), lớp con ghi đè (\`override\`).
   - Lời gọi hàm phải được thực hiện thông qua **con trỏ (\`Base*\`)** hoặc **tham chiếu (\`Base&\`)** của lớp cha.

3. **Tầm quan trọng của Virtual Destructor:**
   - Khi ta giải phóng đối tượng qua con trỏ lớp cha: \`Base* p = new Derived(); delete p;\`
   - Nếu \`~Base()\` **không có virtual**, compiler chỉ gọi destructor của \`Base\`, bỏ qua \`~Derived()\`. Mọi tài nguyên động cấp phát bên trong \`Derived\` sẽ không được giải phóng -> gây **Rò rỉ bộ nhớ (Memory Leak)** nghiêm trọng.
   - Khi có \`virtual ~Base()\`, trình biên dịch sẽ gọi \`~Derived()\` trước rồi mới đến \`~Base()\`, giải phóng toàn bộ tài nguyên một cách an toàn.`
    },
    {
      id: "de2_c2",
      number: 2,
      type: "code_trace",
      title: "Câu 2: Đọc Code Đoán Output (Tracer)",
      maxScore: 2.0,
      slideRef: "Tuần 5 (Mục 4.1, 4.2, 4.6 - Kế thừa, Vtable, Thứ tự Constructor/Destructor)",
      trapRef: "Bẫy 2 (Virtual Destructor), Bẫy 4 (Thiếu virtual trên method)",
      code: `#include <iostream>
using namespace std;

class Animal {
public:
    Animal() { cout << "Ani_C "; }
    virtual void Sound() { cout << "Ani_S "; }
    void Sleep() { cout << "Ani_Z "; }
    virtual ~Animal() { cout << "Ani_D "; }
};

class Dog : public Animal {
public:
    Dog() { cout << "Dog_C "; }
    void Sound() override { cout << "Woof "; }
    void Sleep() { cout << "Dog_Z "; }
    ~Dog() override { cout << "Dog_D "; }
};

class Cat : public Animal {
public:
    Cat() { cout << "Cat_C "; }
    void Sound() override { cout << "Meow "; }
    void Sleep() { cout << "Cat_Z "; }
    ~Cat() override { cout << "Cat_D "; }
};

int main() {
    cout << "1: ";
    Animal* a = new Dog();
    
    cout << "\n2: ";
    a->Sound();
    a->Sleep();
    
    cout << "\n3: ";
    delete a;
    
    cout << "\n4: ";
    Animal* c = new Cat();
    Animal& ref = *c;
    ref.Sound();
    ref.Sleep();
    delete c;
    
    cout << endl;
    return 0;
}`,
      expectedOutput: `1: Ani_C Dog_C 
2: Woof Ani_Z 
3: Dog_D Ani_D 
4: Ani_C Cat_C Meow Ani_Z Cat_D Ani_D`,
      alternativeOutputs: [
        "1: Ani_C Dog_C\n2: Woof Ani_Z\n3: Dog_D Ani_D\n4: Ani_C Cat_C Meow Ani_Z Cat_D Ani_D",
        "1: Ani_C Dog_C \n2: Woof Ani_Z \n3: Dog_D Ani_D \n4: Ani_C Cat_C Meow Ani_Z Cat_D Ani_D "
      ],
      stepByStepAnalysis: [
        {
          step: 1,
          line: "Animal* a = new Dog();",
          explanation: "Khi tạo `Dog`, constructor của lớp cha `Animal` chạy trước in `Ani_C `, sau đó constructor của `Dog` chạy in `Dog_C `. Kết quả dòng 1: `Ani_C Dog_C `"
        },
        {
          step: 2,
          line: "a->Sound(); a->Sleep();",
          explanation: "- `Sound()` là phương thức `virtual` -> gọi đa hình theo đối tượng thực tế `Dog` -> in `Woof `.\n- ⚠️ BẪY: `Sleep()` KHÔNG có `virtual` -> gọi theo kiểu con trỏ `Animal*` (Static binding) -> in `Ani_Z `. Kết quả dòng 2: `Woof Ani_Z `"
        },
        {
          step: 3,
          line: "delete a;",
          explanation: "Vì `~Animal()` có `virtual`, quá trình hủy sẽ gọi `~Dog()` trước in `Dog_D `, sau đó gọi `~Animal()` in `Ani_D `. Kết quả dòng 3: `Dog_D Ani_D `"
        },
        {
          step: 4,
          line: "Animal* c = new Cat(); Animal& ref = *c; ref.Sound(); ref.Sleep(); delete c;",
          explanation: "- Tạo Cat: in `Ani_C Cat_C `.\n- `ref` là tham chiếu `Animal&`: `ref.Sound()` có virtual in `Meow `, `ref.Sleep()` không virtual in `Ani_Z `.\n- `delete c`: gọi `Cat_D Ani_D `. Kết quả dòng 4: `Ani_C Cat_C Meow Ani_Z Cat_D Ani_D`"
        }
      ]
    },
    {
      id: "de2_c3",
      number: 3,
      type: "code_writing",
      title: "Câu 3: Viết Code - Hệ Thống Hình Học Đa Hình & Tìm Diện Tích Lớn Nhất",
      maxScore: 3.0,
      slideRef: "Tuần 5 (Mục 4.2, 4.3 - Bài toán mẫu hệ thống hình học, Pure Virtual)",
      prompt: `**Đề bài:**
Xây dựng cây kế thừa cho hệ thống hình học bằng C++ đáp ứng đầy đủ các tiêu chuẩn sau:

1. **Lớp cơ sở trừu tượng \`Figure\` (Abstract Class):**
   - Destructor ảo \`virtual ~Figure() = default;\`
   - Phương thức thuần ảo \`virtual double Area() const = 0;\`
   - Phương thức thuần ảo \`virtual void PrintInfo() const = 0;\`
   - Phương thức thuần ảo \`virtual Figure* Clone() const = 0;\`

2. **Lớp \`Rectangle\` kế thừa \`Figure\`:**
   - Thuộc tính: \`double width, height\`
   - Constructor khởi tạo kích thước.
   - Ghi đè (\`override\`) đầy đủ \`Area()\`, \`PrintInfo()\` (in ra tên loại, kích thước, diện tích) và \`Clone()\`.

3. **Lớp \`Circle\` kế thừa \`Figure\`:**
   - Thuộc tính: \`double radius\`
   - Constructor khởi tạo bán kính (\`PI = 3.14159\`).
   - Ghi đè đầy đủ \`Area()\`, \`PrintInfo()\` và \`Clone()\`.

4. **Hàm toàn cục \`Figure* findMaxArea(Figure* list[], int n)\`:**
   - Nhận vào mảng con trỏ hình học và số lượng phần tử.
   - Trả về con trỏ tới hình có diện tích lớn nhất (trả về \`nullptr\` nếu \`n <= 0\`).`,
      starterCode: `#include <iostream>
using namespace std;

const double PI = 3.14159;

// 1. Abstract Base Class Figure
class Figure {
public:
    virtual ~Figure() {}
    virtual double Area() const = 0;
    virtual void PrintInfo() const = 0;
    virtual Figure* Clone() const = 0;
};

// 2. Class Rectangle
class Rectangle : public Figure {
private:
    double width, height;
public:
    // Viết code Rectangle ở đây...
};

// 3. Class Circle
class Circle : public Figure {
private:
    double radius;
public:
    // Viết code Circle ở đây...
};

// 4. Global function findMaxArea
Figure* findMaxArea(Figure* list[], int n) {
    // Viết logic tìm max diện tích ở đây...
    return nullptr;
}
`,
      checklist: [
        { id: "c1", label: "Figure có destructor virtual và các hàm thuần ảo (= 0) đúng cú pháp const", weight: 0.5 },
        { id: "c2", label: "Rectangle override đầy đủ Area() = width * height, PrintInfo(), Clone() = new Rectangle(*this)", weight: 0.75 },
        { id: "c3", label: "Circle override đầy đủ Area() = PI * r * r, PrintInfo(), Clone() = new Circle(*this)", weight: 0.75 },
        { id: "c4", label: "findMaxArea duyệt qua mảng con trỏ Figure* và sử dụng đa hình f->Area() để tìm max chính xác", weight: 0.5 },
        { id: "c5", label: "Xử lý biên an toàn (kiểm tra n <= 0 hoặc con trỏ nullptr)", weight: 0.5 }
      ],
      solutionCode: `#include <iostream>
using namespace std;

const double PI = 3.14159;

// 1. Abstract Base Class
class Figure {
public:
    virtual ~Figure() {} // Virtual destructor
    virtual double Area() const = 0;
    virtual void PrintInfo() const = 0;
    virtual Figure* Clone() const = 0;
};

// 2. Class Rectangle
class Rectangle : public Figure {
private:
    double width, height;
public:
    Rectangle(double w = 0, double h = 0) : width(w), height(h) {}

    double Area() const override {
        return width * height;
    }

    void PrintInfo() const override {
        cout << "Rectangle [" << width << " x " << height 
             << "] - Area: " << Area() << endl;
    }

    Figure* Clone() const override {
        return new Rectangle(*this);
    }
};

// 3. Class Circle
class Circle : public Figure {
private:
    double radius;
public:
    Circle(double r = 0) : radius(r) {}

    double Area() const override {
        return PI * radius * radius;
    }

    void PrintInfo() const override {
        cout << "Circle [R=" << radius 
             << "] - Area: " << Area() << endl;
    }

    Figure* Clone() const override {
        return new Circle(*this);
    }
};

// 4. Global polymorphic function
Figure* findMaxArea(Figure* list[], int n) {
    if (list == nullptr || n <= 0) {
        return nullptr;
    }
    
    Figure* maxFig = list[0];
    for (int i = 1; i < n; ++i) {
        if (list[i] != nullptr && list[i]->Area() > maxFig->Area()) {
            maxFig = list[i];
        }
    }
    return maxFig;
}`
    },
    {
      id: "de2_c4",
      number: 4,
      type: "design_pattern",
      title: "Câu 4: Thiết Kế Kiến Trúc Hệ Thống - Factory Method Pattern",
      maxScore: 3.0,
      slideRef: "Tuần 5 (Mục 4.9 - Tạo object bằng tên class, Generalize Scheme) & Tuần 8 (Mục 8.3)",
      scenario: `**Tình huống thực tế:**
Bạn đang xây dựng hệ thống phần mềm đồ họa vẽ hình. Khi người dùng bấm nút vẽ hoặc đọc từ file định dạng:
- Nếu chuỗi là \`"Rectangle"\` -> tạo đối tượng \`Rectangle\`.
- Nếu chuỗi là \`"Circle"\` -> tạo đối tượng \`Circle\`.
- Nếu chuỗi là \`"Triangle"\` -> tạo đối tượng \`Triangle\`.

Yêu cầu kiến trúc:
1. Module Client (giao diện / parser) **không được phụ thuộc trực tiếp** vào các lớp cụ thể mà chỉ tương tác thông qua lớp trừu tượng \`Figure\`.
2. Hệ thống phải dễ dàng mở rộng thêm các hình mới (như \`Ellipse\`, \`Square\`) trong tương lai mà không làm xáo trộn mã nguồn xử lý của Client (Nguyên lý Open-Closed Principle).`,
      patternOptions: [
        { id: "factory", name: "Factory Method / Simple Factory Pattern", correct: true, reason: "Đóng gói logic khởi tạo đối tượng dựa trên tham số chuỗi đầu vào lúc runtime, trả về con trỏ lớp cơ sở trừu tượng." },
        { id: "singleton", name: "Singleton Pattern", correct: false, reason: "Singleton chỉ dùng khi cần duy nhất 1 instance, trong khi ứng dụng vẽ cần tạo hàng ngàn hình vẽ khác nhau." },
        { id: "iterator", name: "Iterator Pattern", correct: false, reason: "Iterator giải quyết việc duyệt tập hợp phần tử, không phải việc khởi tạo đối tượng." },
        { id: "decorator", name: "Decorator Pattern", correct: false, reason: "Decorator mở rộng tính năng cho object lúc runtime mà không thay đổi cấu trúc." }
      ],
      roleMapping: [
        { role: "Abstract Product (Figure)", requirement: "Định nghĩa giao diện chung cho mọi loại hình vẽ (`Area`, `Draw`, `Clone`)." },
        { role: "Concrete Products (Rectangle, Circle...)", requirement: "Các lớp hình học cụ thể cài đặt chi tiết giao diện từ Figure." },
        { role: "Creator / Factory (FigureFactory)", requirement: "Chứa phương thức `createFigure(string type)` ánh xạ chuỗi sang việc `new` đúng đối tượng con tương ứng." },
        { role: "Client", requirement: "Chỉ tương tác với `FigureFactory` và sử dụng con trỏ đa hình `Figure*` để xử lý logic." }
      ],
      umlDiagram: `
classDiagram
    class Figure {
        <<abstract>>
        + Area()* double
        + Draw()* void
    }
    class Rectangle {
        - double width, height
        + Area() double
        + Draw() void
    }
    class Circle {
        - double radius
        + Area() double
        + Draw() void
    }
    class FigureFactory {
        + static createFigure(string type) Figure*
    }
    Figure <|-- Rectangle
    Figure <|-- Circle
    FigureFactory ..> Figure : creates
`,
      designSkeleton: `#include <iostream>
#include <string>
using namespace std;

// 1. Abstract Product
class Figure {
public:
    virtual ~Figure() = default;
    virtual void Draw() const = 0;
    virtual double Area() const = 0;
};

// 2. Concrete Products
class Rectangle : public Figure {
public:
    void Draw() const override { cout << "Drawing Rectangle\\n"; }
    double Area() const override { return 10.0; }
};

class Circle : public Figure {
public:
    void Draw() const override { cout << "Drawing Circle\\n"; }
    double Area() const override { return 31.4; }
};

// 3. Factory Class
class FigureFactory {
public:
    static Figure* createFigure(const string& type) {
        if (type == "Rectangle") {
            return new Rectangle();
        } else if (type == "Circle") {
            return new Circle();
        }
        return nullptr; // Hoặc ném exception ngoại lệ không tìm thấy loại
    }
};

// 4. Client Code
int main() {
    Figure* f1 = FigureFactory::createFigure("Rectangle");
    Figure* f2 = FigureFactory::createFigure("Circle");
    
    f1->Draw();
    f2->Draw();

    delete f1;
    delete f2;
    return 0;
}`
    }
  ]
};
