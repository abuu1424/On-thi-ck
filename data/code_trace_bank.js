/**
 * DẠNG 2: NGÂN HÀNG CÂU HỎI ĐỌC CODE ĐOÁN OUTPUT & BẪY CODE KINH ĐIỂN
 * Bao quát toàn bộ kiến thức Slide Tuần 2 → 8 (FIT-HCMUS)
 * Phân loại chi tiết theo Chương, Độ khó và Điểm bẫy
 */

var CODE_TRACE_BANK = [
  // =========================================================================
  // CHƯƠNG 2, 3, 4: CLASS, QUẢN LÝ BỘ NHỚ & VÒNG ĐỜI ĐỐI TƯỢNG (Q1 - Q10)
  // =========================================================================
  {
    id: "trace_1",
    number: 1,
    chapter: "ch2_4",
    chapterName: "Chương 2-4: Vòng Đời Đối Tượng & Copy Constructor",
    difficulty: "medium",
    trapRef: "Bẫy 1 (Khai báo hàm) & Bẫy Pass-by-value",
    tags: ["Constructor", "Destructor", "Pass-by-value", "LIFO Destruction"],
    title: "Bài 1: Thứ Tự Constructor, Destructor & Bẫy Khai Báo Hàm",
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
      { step: 1, line: "Tracker t1;", explanation: "Default constructor chạy: `count` tăng từ 0 lên 1, `id = 1`. In: `C1 `" },
      { step: 2, line: "Tracker t2(99);", explanation: "Parameterized constructor chạy với `customId = 99`. In: `P99 `" },
      { step: 3, line: "Tracker t3();", explanation: "⚠️ BẪY 1: Đây là khai báo HÀM `t3()` trả về `Tracker`, KHÔNG tạo đối tượng! Không có constructor nào được gọi." },
      { step: 4, line: "cout << \"| \";", explanation: "In ký tự phân cách: `| `" },
      { step: 5, line: "testFunc(t1);", explanation: "⚠️ BẪY TRUYỀN THAM TRỊ (Pass-by-value): Gọi Copy Constructor tạo bản sao `obj`. `count` tăng lên 2, `id = 2`. In `CP2 `. Trong hàm gọi `obj.print()` in `[2] `. Hết hàm, `obj` bị hủy -> gọi destructor in `D2 `. Đoạn này in: `CP2 [2] D2 `" },
      { step: 6, line: "Tracker t4 = t2;", explanation: "Khởi tạo bằng phép gán -> gọi Copy Constructor. `count` tăng lên 3, `id = 3`. In `CP3 `" },
      { step: 7, line: "Kết thúc main():", explanation: "Hủy các biến cục bộ theo thứ tự ngược lại (LIFO): `t4` (id=3 -> `D3 `), `t2` (id=99 -> `D99 `), `t1` (id=1 -> `D1 `). In: `D3 D99 D1`" }
    ]
  },
  {
    id: "trace_2",
    number: 2,
    chapter: "ch2_4",
    chapterName: "Chương 2-4: Biến Tĩnh (Static) & Vòng Đời",
    difficulty: "easy",
    trapRef: "Bẫy 9 (Biến Static tồn tại suốt chương trình)",
    tags: ["Static Variable", "Function Scope", "Lifetime"],
    title: "Bài 2: Biến Static Trong Hàm & Khởi Tạo Duy Nhất 1 Lần",
    code: `#include <iostream>
using namespace std;

void counter() {
    static int x = 10;
    int y = 10;
    x += 5;
    y += 5;
    cout << x << ":" << y << " ";
}

int main() {
    counter();
    counter();
    counter();
    return 0;
}`,
    expectedOutput: "15:15 20:15 25:15",
    alternativeOutputs: [
      "15:15 20:15 25:15 ",
      "15:15 20:15 25:15\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "Lần gọi counter() thứ 1:", explanation: "Biến `static int x` được khởi tạo bằng 10 (chỉ khởi tạo 1 lần duy nhất). `y = 10`. `x` tăng lên 15, `y` tăng lên 15. In `15:15 `." },
      { step: 2, line: "Lần gọi counter() thứ 2:", explanation: "`x` giữ nguyên giá trị 15 từ lần trước (vùng nhớ tĩnh). `y` được tạo mới trên stack = 10. `x` tăng lên 20, `y` tăng lên 15. In `20:15 `." },
      { step: 3, line: "Lần gọi counter() thứ 3:", explanation: "`x` tiếp tục tăng từ 20 lên 25. `y` tạo mới = 10 tăng lên 15. In `25:15 `." }
    ]
  },
  {
    id: "trace_3",
    number: 3,
    chapter: "ch2_4",
    chapterName: "Chương 2-4: Copy Constructor vs Operator=",
    difficulty: "medium",
    trapRef: "Bẫy Khởi tạo vs Phép gán",
    tags: ["Copy Constructor", "Operator=", "Deep Copy"],
    title: "Bài 3: Phân Biệt Copy Constructor Và Toán Tử Gán Operator=",
    code: `#include <iostream>
using namespace std;

class Box {
    int val;
public:
    Box(int v = 0) : val(v) { cout << "C" << val << " "; }
    Box(const Box& b) : val(b.val) { cout << "CP" << val << " "; }
    Box& operator=(const Box& b) {
        val = b.val;
        cout << "OP" << val << " ";
        return *this;
    }
};

int main() {
    Box b1(5);
    Box b2 = b1;   // Copy constructor
    Box b3(10);
    cout << "| ";
    b3 = b1;       // Operator=
    return 0;
}`,
    expectedOutput: "C5 CP5 C10 | OP5",
    alternativeOutputs: [
      "C5 CP5 C10 | OP5 ",
      "C5 CP5 C10 | OP5\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "Box b1(5);", explanation: "Gọi constructor khởi tạo `val = 5` -> in `C5 `" },
      { step: 2, line: "Box b2 = b1;", explanation: "Khởi tạo đối tượng mới `b2` bằng cú pháp gán -> gọi **Copy Constructor** -> in `CP5 `" },
      { step: 3, line: "Box b3(10);", explanation: "Gọi constructor tạo `b3` -> in `C10 `" },
      { step: 4, line: "cout << \"| \";", explanation: "In `| `" },
      { step: 5, line: "b3 = b1;", explanation: "Đối tượng `b3` đã tồn tại trước đó -> gọi **Toán tử gán (Operator=)** -> in `OP5 `" }
    ]
  },
  {
    id: "trace_4",
    number: 4,
    chapter: "ch2_4",
    chapterName: "Chương 2-4: Explicit Constructor & Ép Kiểu Ngầm Định",
    difficulty: "medium",
    trapRef: "Bẫy 10 (Constructor 1 tham số ép kiểu ngầm định)",
    tags: ["explicit", "Implicit Conversion", "Type Casting"],
    title: "Bài 4: Constructor 1 Tham Số & Ép Kiểu Tự Động",
    code: `#include <iostream>
using namespace std;

class Number {
    int num;
public:
    Number(int n) : num(n) { cout << "N(" << num << ") "; }
    void show() const { cout << "[" << num << "] "; }
};

void printNum(Number n) {
    n.show();
}

int main() {
    cout << "Start ";
    printNum(42); // Ép kiểu ngầm định int -> Number
    cout << "End";
    return 0;
}`,
    expectedOutput: "Start N(42) [42] End",
    alternativeOutputs: [
      "Start N(42) [42] End ",
      "Start N(42) [42] End\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "cout << \"Start \";", explanation: "In `Start `" },
      { step: 2, line: "printNum(42);", explanation: "Vì constructor `Number(int)` không có từ khóa `explicit`, compiler tự động dùng số `42` để gọi constructor tạo đối tượng tạm `Number` -> in `N(42) `. Bên trong hàm gọi `n.show()` in `[42] `." },
      { step: 3, line: "cout << \"End\";", explanation: "In `End`" }
    ]
  },
  {
    id: "trace_5",
    number: 5,
    chapter: "ch2_4",
    chapterName: "Chương 2-4: Toán Tử ++ (Tiền Tố vs Hậu Tố)",
    difficulty: "hard",
    trapRef: "Bẫy Toán tử ++ Tự Viết",
    tags: ["Prefix ++", "Postfix ++", "Operator Overloading"],
    title: "Bài 5: Nạp Chồng Toán Tử ++ Tiền Tố (Prefix) Và Hậu Tố (Postfix)",
    code: `#include <iostream>
using namespace std;

class Counter {
    int val;
public:
    Counter(int v = 0) : val(v) {}
    
    // Prefix (++c)
    Counter& operator++() {
        val += 2;
        cout << "Pre:" << val << " ";
        return *this;
    }
    
    // Postfix (c++) - có tham số int giả (dummy)
    Counter operator++(int) {
        Counter temp = *this;
        val += 2;
        cout << "Post:" << temp.val << " ";
        return temp;
    }
    
    int get() const { return val; }
};

int main() {
    Counter c(5);
    ++c;
    c++;
    cout << "| Final:" << c.get();
    return 0;
}`,
    expectedOutput: "Pre:7 Post:7 | Final:9",
    alternativeOutputs: [
      "Pre:7 Post:7 | Final:9 ",
      "Pre:7 Post:7 | Final:9\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "++c;", explanation: "Gọi Prefix `operator++()`. `val` tăng từ 5 lên 7. In `Pre:7 ` và trả về tham chiếu đến `c`." },
      { step: 2, line: "c++;", explanation: "Gọi Postfix `operator++(int)`. `temp.val = 7`. `c.val` tăng từ 7 lên 9. Hàm in giá trị cũ `Post:7 ` và trả về bản sao `temp`." },
      { step: 3, line: "cout << \"| Final:\" << c.get();", explanation: "In giá trị hiện tại của `c`: `| Final:9`" }
    ]
  },
  {
    id: "trace_6",
    number: 6,
    chapter: "ch2_4",
    chapterName: "Chương 2-4: Con Trỏ This & Chaining Method",
    difficulty: "medium",
    trapRef: "Bẫy return *this",
    tags: ["this Pointer", "Method Chaining", "Reference Return"],
    title: "Bài 6: Chuỗi Lời Gọi Phương Thức (Method Chaining) & Con Trỏ This",
    code: `#include <iostream>
using namespace std;

class Builder {
    int score;
public:
    Builder(int s = 0) : score(s) {}
    
    Builder& add(int x) {
        score += x;
        cout << "+" << x << " ";
        return *this;
    }
    
    Builder& mul(int x) {
        score *= x;
        cout << "*" << x << " ";
        return *this;
    }
    
    void print() const { cout << "= " << score << endl; }
};

int main() {
    Builder b(10);
    b.add(5).mul(2).add(3);
    b.print();
    return 0;
}`,
    expectedOutput: "+5 *2 +3 = 33",
    alternativeOutputs: [
      "+5 *2 +3 \n= 33",
      "+5 *2 +3 = 33\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "b.add(5)", explanation: "`score = 10 + 5 = 15`. In `+5 `. Trả về `*this` (chính là `b`)." },
      { step: 2, line: ".mul(2)", explanation: "`score = 15 * 2 = 30`. In `*2 `. Trả về `*this`." },
      { step: 3, line: ".add(3)", explanation: "`score = 30 + 3 = 33`. In `+3 `. Trả về `*this`." },
      { step: 4, line: "b.print()", explanation: "In `= 33`" }
    ]
  },
  {
    id: "trace_7",
    number: 7,
    chapter: "ch2_4",
    chapterName: "Chương 2-4: Destructor Khi Cấp Phát Động new[]",
    difficulty: "hard",
    trapRef: "Bẫy Heap Allocation & Scope",
    tags: ["new", "delete", "Destructor", "Heap vs Stack"],
    title: "Bài 7: Vòng Đời Destructor Đối Tượng Stack vs Đối Tượng Heap",
    code: `#include <iostream>
using namespace std;

class Node {
    char label;
public:
    Node(char c) : label(c) { cout << "+" << label << " "; }
    ~Node() { cout << "~" << label << " "; }
};

int main() {
    Node s1('A');
    Node* h1 = new Node('B');
    {
        Node s2('C');
        delete h1; // Hủy h1 sớm
        cout << "| ";
    }
    cout << "End ";
    return 0;
}`,
    expectedOutput: "+A +B +C ~B | ~C End ~A",
    alternativeOutputs: [
      "+A +B +C ~B | ~C End ~A ",
      "+A +B +C ~B | ~C End ~A\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "Node s1('A');", explanation: "Tạo `s1` trên stack -> in `+A `" },
      { step: 2, line: "Node* h1 = new Node('B');", explanation: "Tạo `h1` trên heap -> in `+B `" },
      { step: 3, line: "Vào block { Node s2('C'); delete h1; }", explanation: "Tạo `s2` trên stack in `+C `. Lệnh `delete h1` chủ động hủy đối tượng heap ngay lập tức in `~B `. In `| `." },
      { step: 4, line: "Thoát block {}:", explanation: "Biến cục bộ `s2` ra khỏi scope và bị hủy -> in `~C `." },
      { step: 5, line: "cout << \"End \";", explanation: "In `End `" },
      { step: 6, line: "Kết thúc main():", explanation: "Biến cục bộ `s1` bị hủy -> in `~A`" }
    ]
  },
  {
    id: "trace_8",
    number: 8,
    chapter: "ch2_4",
    chapterName: "Chương 2-4: Friend Function & Truy Cập Private",
    difficulty: "easy",
    tags: ["Friend Function", "Encapsulation"],
    title: "Bài 8: Hàm Friend Truy Cập Trực Tiếp Thuộc Tính Private",
    code: `#include <iostream>
using namespace std;

class Secret {
    int code;
public:
    Secret(int c) : code(c) {}
    friend void reveal(const Secret& s, int factor);
};

void reveal(const Secret& s, int factor) {
    cout << "Secret:" << s.code * factor << endl;
}

int main() {
    Secret s(7);
    reveal(s, 6);
    return 0;
}`,
    expectedOutput: "Secret:42",
    alternativeOutputs: [
      "Secret:42\n",
      "Secret: 42"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "Secret s(7);", explanation: "Khởi tạo đối tượng `s` với thuộc tính private `code = 7`." },
      { step: 2, line: "reveal(s, 6);", explanation: "Hàm friend `reveal` truy cập trực tiếp `s.code`, tính `7 * 6 = 42` và in `Secret:42`." }
    ]
  },
  {
    id: "trace_9",
    number: 9,
    chapter: "ch2_4",
    chapterName: "Chương 2-4: Tham Chiếu (Reference) vs Con Trỏ (Pointer)",
    difficulty: "medium",
    tags: ["Pass-by-reference", "Pointers", "Side-effects"],
    title: "Bài 9: Truyền Tham Chiếu (Reference) Và Biến Đổi Dữ Liệu Gốc",
    code: `#include <iostream>
using namespace std;

void modify(int& a, int* b, int c) {
    a += 10;
    *b += 20;
    c += 30;
}

int main() {
    int x = 1, y = 2, z = 3;
    modify(x, &y, z);
    cout << x << " " << y << " " << z;
    return 0;
}`,
    expectedOutput: "11 22 3",
    alternativeOutputs: [
      "11 22 3 ",
      "11 22 3\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "modify(x, &y, z);", explanation: "`a` là tham chiếu tới `x` -> `x = 1 + 10 = 11`. `b` là con trỏ trỏ tới địa chỉ của `y` -> `*b = y = 2 + 20 = 22`. `c` là tham trị sao chép giá trị của `z` -> `c = 33` nhưng `z` gốc không đổi vẫn là 3." },
      { step: 2, line: "cout << x << \" \" << y << \" \" << z;", explanation: "In ra giá trị: `11 22 3`" }
    ]
  },
  {
    id: "trace_10",
    number: 10,
    chapter: "ch2_4",
    chapterName: "Chương 2-4: Const Method & Const Object",
    difficulty: "medium",
    tags: ["const method", "Overloading on const"],
    title: "Bài 10: Nạp Chồng Phương Thức Theo Hằng (Const Overloading)",
    code: `#include <iostream>
using namespace std;

class ValueHolder {
    int val;
public:
    ValueHolder(int v) : val(v) {}
    
    void print() {
        cout << "Non-const:" << val << " ";
    }
    
    void print() const {
        cout << "Const:" << val << " ";
    }
};

int main() {
    ValueHolder v1(10);
    const ValueHolder v2(20);
    
    v1.print();
    v2.print();
    return 0;
}`,
    expectedOutput: "Non-const:10 Const:20",
    alternativeOutputs: [
      "Non-const:10 Const:20 ",
      "Non-const:10 Const:20\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "v1.print();", explanation: "`v1` là đối tượng thường (non-const) -> ưu tiên gọi phiên bản `void print()` -> in `Non-const:10 `." },
      { step: 2, line: "v2.print();", explanation: "`v2` là đối tượng hằng (const) -> bắt buộc phải gọi phiên bản `void print() const` -> in `Const:20 `." }
    ]
  },

  // =========================================================================
  // CHƯƠNG 5: KẾ THỪA & ĐA HÌNH (POLYMORPHISM) (Q11 - Q20)
  // =========================================================================
  {
    id: "trace_11",
    number: 11,
    chapter: "ch5",
    chapterName: "Chương 5: Kế Thừa & Đa Hình",
    difficulty: "medium",
    trapRef: "Bẫy 4 (Quên từ khóa virtual)",
    tags: ["Virtual Function", "Dynamic Binding", "Polymorphism"],
    title: "Bài 11: Đa Hình Động (Virtual) vs Liên Kết Tĩnh (Non-virtual)",
    code: `#include <iostream>
using namespace std;

class Animal {
public:
    virtual void speak() { cout << "Animal "; }
    void sleep() { cout << "Zzz "; }
};

class Dog : public Animal {
public:
    void speak() override { cout << "Woof "; }
    void sleep() { cout << "DogSleep "; }
};

int main() {
    Animal* a = new Dog();
    a->speak(); // virtual -> dynamic binding
    a->sleep(); // non-virtual -> static binding
    delete a;
    return 0;
}`,
    expectedOutput: "Woof Zzz",
    alternativeOutputs: [
      "Woof Zzz ",
      "Woof Zzz\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "Animal* a = new Dog();", explanation: "Con trỏ lớp cha `Animal*` trỏ tới đối tượng thực tế `Dog` trên heap." },
      { step: 2, line: "a->speak();", explanation: "Vì `speak()` là hàm `virtual` ở `Animal`, C++ dùng Dynamic Binding gọi đúng hàm của đối tượng thực tế `Dog` -> in `Woof `." },
      { step: 3, line: "a->sleep();", explanation: "⚠️ BẪY: Vì `sleep()` KHÔNG PHẢI virtual, compiler dùng Static Binding dựa theo kiểu con trỏ `Animal*` -> in `Zzz ` (chứ không in `DogSleep`)." }
    ]
  },
  {
    id: "trace_12",
    number: 12,
    chapter: "ch5",
    chapterName: "Chương 5: Virtual Destructor",
    difficulty: "hard",
    trapRef: "Bẫy 2 (Virtual Destructor)",
    tags: ["Virtual Destructor", "Memory Leak", "Destruction Order"],
    title: "Bài 12: Thứ Tự Hủy & Bẫy Virtual Destructor",
    code: `#include <iostream>
using namespace std;

class Base {
public:
    Base() { cout << "B_ctor "; }
    virtual ~Base() { cout << "B_dtor "; }
};

class Derived : public Base {
public:
    Derived() { cout << "D_ctor "; }
    ~Derived() override { cout << "D_dtor "; }
};

int main() {
    Base* p = new Derived();
    cout << "| ";
    delete p;
    return 0;
}`,
    expectedOutput: "B_ctor D_ctor | D_dtor B_dtor",
    alternativeOutputs: [
      "B_ctor D_ctor | D_dtor B_dtor ",
      "B_ctor D_ctor | D_dtor B_dtor\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "Base* p = new Derived();", explanation: "Khi tạo đối tượng `Derived`, Constructor lớp cha `Base` chạy trước (`B_ctor `), Constructor lớp con `Derived` chạy sau (`D_ctor `)." },
      { step: 2, line: "cout << \"| \";", explanation: "In `| `" },
      { step: 3, line: "delete p;", explanation: "Vì `~Base()` được khai báo là `virtual`, lời gọi `delete p` qua con trỏ `Base*` kích hoạt đa hình: Destructor của `Derived` chạy trước (`D_dtor `), sau đó destructor của `Base` chạy (`B_dtor `)." }
    ]
  },
  {
    id: "trace_13",
    number: 13,
    chapter: "ch5",
    chapterName: "Chương 5: Object Slicing (Cắt Gọt Đối Tượng)",
    difficulty: "hard",
    trapRef: "Bẫy Object Slicing khi truyền tham trị",
    tags: ["Object Slicing", "Pass-by-value", "Polymorphism loss"],
    title: "Bài 13: Hiện Tượng Object Slicing Làm Mất Tính Đa Hình",
    code: `#include <iostream>
using namespace std;

class Shape {
public:
    virtual void draw() const { cout << "Shape "; }
};

class Circle : public Shape {
public:
    void draw() const override { cout << "Circle "; }
};

void renderVal(Shape s) { // Tham trị -> Object Slicing
    s.draw();
}

void renderRef(const Shape& s) { // Tham chiếu -> Đa hình
    s.draw();
}

int main() {
    Circle c;
    renderVal(c);
    cout << "| ";
    renderRef(c);
    return 0;
}`,
    expectedOutput: "Shape | Circle",
    alternativeOutputs: [
      "Shape | Circle ",
      "Shape | Circle\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "renderVal(c);", explanation: "⚠️ BẪY OBJECT SLICING: Hàm nhận tham trị `Shape s`. Khi truyền `Circle c`, phần dẫn xuất của Circle và con trỏ vptr bị cắt gọt (sliced off). `s` chỉ là một object `Shape` thuần túy -> in `Shape `." },
      { step: 2, line: "renderRef(c);", explanation: "Hàm nhận tham chiếu `const Shape& s`, giữ nguyên vptr của đối tượng gốc `Circle` -> dynamic binding gọi đúng `Circle::draw()` -> in `Circle `." }
    ]
  },
  {
    id: "trace_14",
    number: 14,
    chapter: "ch5",
    chapterName: "Chương 5: Gọi Hàm Ảo Trong Constructor",
    difficulty: "hard",
    trapRef: "Bẫy Virtual Function in Constructor",
    tags: ["Virtual in Constructor", "Early Binding in Ctor"],
    title: "Bài 14: Lời Gọi Hàm Ảo Bên Trong Constructor",
    code: `#include <iostream>
using namespace std;

class Base {
public:
    Base() {
        cout << "B_init:";
        callMe(); // Lời gọi hàm ảo trong ctor cha
    }
    virtual void callMe() { cout << "BaseCall "; }
};

class Derived : public Base {
public:
    Derived() {
        cout << "D_init:";
        callMe();
    }
    void callMe() override { cout << "DerivedCall "; }
};

int main() {
    Derived d;
    return 0;
}`,
    expectedOutput: "B_init:BaseCall D_init:DerivedCall",
    alternativeOutputs: [
      "B_init:BaseCall D_init:DerivedCall ",
      "B_init:BaseCall D_init:DerivedCall\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "Base ctor chạy trước:", explanation: "⚠️ BẪY: Trong lúc `Base()` đang chạy, phần `Derived` CHƯA ĐƯỢC XÂY DỰNG. Do đó, C++ không kích hoạt đa hình xuống `Derived` mà gọi phiên bản `Base::callMe()` -> in `B_init:BaseCall `." },
      { step: 2, line: "Derived ctor chạy sau:", explanation: "Khi vào `Derived()`, object đã là `Derived` -> gọi `Derived::callMe()` -> in `D_init:DerivedCall `." }
    ]
  },
  {
    id: "trace_15",
    number: 15,
    chapter: "ch5",
    chapterName: "Chương 5: Dynamic Cast & Ép Kiểu Xuống",
    difficulty: "medium",
    tags: ["dynamic_cast", "RTTI", "Downcasting"],
    title: "Bài 15: Ép Kiểu Động dynamic_cast Xuống Lớp Con",
    code: `#include <iostream>
using namespace std;

class Vehicle {
public:
    virtual void drive() {}
};

class Car : public Vehicle {};
class Boat : public Vehicle {};

int main() {
    Vehicle* v1 = new Car();
    Vehicle* v2 = new Boat();
    
    Car* c1 = dynamic_cast<Car*>(v1);
    Car* c2 = dynamic_cast<Car*>(v2); // Ép kiểu thất bại
    
    cout << (c1 != nullptr ? "Car_OK" : "Car_FAIL") << " ";
    cout << (c2 != nullptr ? "Boat_OK" : "Boat_FAIL");
    
    delete v1;
    delete v2;
    return 0;
}`,
    expectedOutput: "Car_OK Boat_FAIL",
    alternativeOutputs: [
      "Car_OK Boat_FAIL ",
      "Car_OK Boat_FAIL\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "Car* c1 = dynamic_cast<Car*>(v1);", explanation: "`v1` thực sự trỏ tới `Car` -> ép kiểu thành công -> `c1 != nullptr` -> in `Car_OK `." },
      { step: 2, line: "Car* c2 = dynamic_cast<Car*>(v2);", explanation: "`v2` trỏ tới `Boat` (không phải `Car`) -> ép kiểu con trỏ thất bại an toàn, trả về `nullptr` -> `c2 == nullptr` -> in `Boat_FAIL`." }
    ]
  },
  {
    id: "trace_16",
    number: 16,
    chapter: "ch5",
    chapterName: "Chương 5: Thứ Tự Kế Thừa Đa Tầng (3 Cấp)",
    difficulty: "medium",
    tags: ["Multilevel Inheritance", "Constructor Order"],
    title: "Bài 16: Thứ Tự Khởi Tạo Trong Cây Kế Thừa 3 Cấp",
    code: `#include <iostream>
using namespace std;

class A {
public:
    A() { cout << "A "; }
    virtual ~A() { cout << "~A "; }
};

class B : public A {
public:
    B() { cout << "B "; }
    ~B() override { cout << "~B "; }
};

class C : public B {
public:
    C() { cout << "C "; }
    ~C() override { cout << "~C "; }
};

int main() {
    A* p = new C();
    cout << "| ";
    delete p;
    return 0;
}`,
    expectedOutput: "A B C | ~C ~B ~A",
    alternativeOutputs: [
      "A B C | ~C ~B ~A ",
      "A B C | ~C ~B ~A\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "new C()", explanation: "Constructor gọi từ gốc đến ngọn: `A` -> `B` -> `C` -> in `A B C `." },
      { step: 2, line: "delete p", explanation: "Do `~A()` là virtual, Destructor gọi ngược từ ngọn về gốc (LIFO): `~C` -> `~B` -> `~A` -> in `~C ~B ~A`." }
    ]
  },
  {
    id: "trace_17",
    number: 17,
    chapter: "ch5",
    chapterName: "Chương 5: Đa Kế Thừa (Multiple Inheritance)",
    difficulty: "hard",
    tags: ["Multiple Inheritance", "Constructor Order"],
    title: "Bài 17: Thứ Tự Khai Báo Trong Đa Kế Thừa",
    code: `#include <iostream>
using namespace std;

class Engine {
public:
    Engine() { cout << "Engine "; }
};

class Wheels {
public:
    Wheels() { cout << "Wheels "; }
};

// Thứ tự khai báo Base quyết định thứ tự chạy Constructor
class Car : public Wheels, public Engine {
public:
    Car() { cout << "Car "; }
};

int main() {
    Car myCar;
    return 0;
}`,
    expectedOutput: "Wheels Engine Car",
    alternativeOutputs: [
      "Wheels Engine Car ",
      "Wheels Engine Car\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "class Car : public Wheels, public Engine", explanation: "Trong C++, thứ tự chạy Constructor của các lớp cha được xác định theo **thứ tự xuất hiện trong danh sách kế thừa** (`Wheels` trước, `Engine` sau), chứ không phụ thuộc thứ tự trong initializer list." },
      { step: 2, line: "Kết quả:", explanation: "`Wheels` chạy trước -> `Engine` chạy tiếp -> `Car` chạy sau cùng -> in `Wheels Engine Car`." }
    ]
  },
  {
    id: "trace_18",
    number: 18,
    chapter: "ch5",
    chapterName: "Chương 5: Override & Chữ Ký Hàm",
    difficulty: "hard",
    trapRef: "Bẫy Sai Chữ Ký Hàm Ảo",
    tags: ["Method Hiding", "Signature mismatch"],
    title: "Bài 18: Ẩn Hàm (Name Hiding) Khi Sai Kiểu Tham Số",
    code: `#include <iostream>
using namespace std;

class Parent {
public:
    virtual void print(int x) { cout << "P_int:" << x << " "; }
};

class Child : public Parent {
public:
    // Chữ ký hàm double != int -> đây là Overload/Hide, KHÔNG PHẢI Override!
    virtual void print(double x) { cout << "C_double:" << x << " "; }
};

int main() {
    Parent* p = new Child();
    p->print(5); // Gọi qua Parent*
    delete p;
    return 0;
}`,
    expectedOutput: "P_int:5",
    alternativeOutputs: [
      "P_int:5 ",
      "P_int:5\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "Parent* p = new Child(); p->print(5);", explanation: "⚠️ BẪY: `Child::print(double)` có kiểu tham số `double` khác với `Parent::print(int)`. Do đó nó không override hàm của `Parent`. Khi gọi `p->print(5)` qua con trỏ `Parent*`, compiler liên kết với `Parent::print(int)` -> in `P_int:5`." }
    ]
  },
  {
    id: "trace_19",
    number: 19,
    chapter: "ch5",
    chapterName: "Chương 5: Ghi Đè Thuộc Tính (Field Hiding)",
    difficulty: "medium",
    tags: ["Field Hiding", "Static Binding of Variables"],
    title: "Bài 19: Biến Thành Viên Không Có Tính Đa Hình (Field Hiding)",
    code: `#include <iostream>
using namespace std;

class Super {
public:
    int value = 10;
    virtual void show() { cout << "Super:" << value << " "; }
};

class Sub : public Super {
public:
    int value = 20; // Ẩn thuộc tính value của Super
    void show() override { cout << "Sub:" << value << " "; }
};

int main() {
    Super* s = new Sub();
    cout << "Field:" << s->value << " | ";
    s->show();
    delete s;
    return 0;
}`,
    expectedOutput: "Field:10 | Sub:20",
    alternativeOutputs: [
      "Field:10 | Sub:20 ",
      "Field:10 | Sub:20\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "s->value", explanation: "⚠️ BẪY: Thuộc tính (biến) KHÔNG BAO GIỜ có tính đa hình trong C++. Truy xuất `s->value` qua `Super*` sẽ luôn lấy biến `value` của `Super` (bằng 10)." },
      { step: 2, line: "s->show()", explanation: "Phương thức `show()` có từ khóa `virtual` nên dùng Dynamic Binding gọi `Sub::show()`, in `Sub:20`." }
    ]
  },
  {
    id: "trace_20",
    number: 20,
    chapter: "ch5",
    chapterName: "Chương 5: Con Trỏ Hàm Thuần Ảo (Pure Virtual)",
    difficulty: "easy",
    tags: ["Abstract Class", "Pure Virtual"],
    title: "Bài 20: Lớp Trừu Tượng & Gọi Phương Thức Override",
    code: `#include <iostream>
using namespace std;

class Calculator {
public:
    virtual int compute(int a, int b) = 0; // Pure virtual
};

class Adder : public Calculator {
public:
    int compute(int a, int b) override { return a + b; }
};

class Multiplier : public Calculator {
public:
    int compute(int a, int b) override { return a * b; }
};

int main() {
    Calculator* c1 = new Adder();
    Calculator* c2 = new Multiplier();
    cout << c1->compute(3, 4) << " " << c2->compute(3, 4);
    delete c1;
    delete c2;
    return 0;
}`,
    expectedOutput: "7 12",
    alternativeOutputs: [
      "7 12 ",
      "7 12\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "c1->compute(3, 4)", explanation: "`c1` là `Adder` -> $3 + 4 = 7$." },
      { step: 2, line: "c2->compute(3, 4)", explanation: "`c2` là `Multiplier` -> $3 \\times 4 = 12$." }
    ]
  },

  // =========================================================================
  // CHƯƠNG 6: QUAN HỆ LỚP & FILE PROGRAMMING (Q21 - Q25)
  // =========================================================================
  {
    id: "trace_21",
    number: 21,
    chapter: "ch6",
    chapterName: "Chương 6: Quan Hệ Composition vs Aggregation",
    difficulty: "medium",
    tags: ["Composition", "Object Member Lifecycle"],
    title: "Bài 21: Vòng Đời Chứa Gộp Chặt (Composition) Trong Class",
    code: `#include <iostream>
using namespace std;

class Engine {
public:
    Engine() { cout << "Eng_C "; }
    ~Engine() { cout << "Eng_D "; }
};

class Car {
    Engine e; // Thành viên trực tiếp (Composition)
public:
    Car() { cout << "Car_C "; }
    ~Car() { cout << "Car_D "; }
};

int main() {
    {
        Car c;
        cout << "| ";
    }
    return 0;
}`,
    expectedOutput: "Eng_C Car_C | Car_D Eng_D",
    alternativeOutputs: [
      "Eng_C Car_C | Car_D Eng_D ",
      "Eng_C Car_C | Car_D Eng_D\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "Khởi tạo Car c:", explanation: "Khi tạo `Car`, thành viên dữ liệu `Engine e` phải được khởi tạo trước (`Eng_C `), sau đó mới chạy thân hàm `Car()` (`Car_C `)." },
      { step: 2, line: "Hủy Car c khi ra khỏi block:", explanation: "Khi `Car` bị hủy, thân hàm `~Car()` chạy trước (`Car_D `), sau đó thành viên `e` tự động bị hủy theo (`Eng_D `)." }
    ]
  },
  {
    id: "trace_22",
    number: 22,
    chapter: "ch6",
    chapterName: "Chương 6: stringstream & Trích Xuất Dữ Liệu",
    difficulty: "easy",
    tags: ["stringstream", "Parsing"],
    title: "Bài 22: Tách Dữ Liệu Từ Chuỗi Bằng std::stringstream",
    code: `#include <iostream>
#include <sstream>
#include <string>
using namespace std;

int main() {
    string input = "HCMUS 2026 8.75";
    stringstream ss(input);
    
    string school;
    int year;
    double score;
    
    ss >> school >> year >> score;
    cout << school << "-" << year + 1 << "-" << score;
    return 0;
}`,
    expectedOutput: "HCMUS-2027-8.75",
    alternativeOutputs: [
      "HCMUS-2027-8.75\n",
      "HCMUS - 2027 - 8.75"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "ss >> school >> year >> score", explanation: "Tách từng token: `school = \"HCMUS\"`, `year = 2026`, `score = 8.75`." },
      { step: 2, line: "cout", explanation: "In `HCMUS-2027-8.75` (`year + 1 = 2027`)." }
    ]
  },
  {
    id: "trace_23",
    number: 23,
    chapter: "ch6",
    chapterName: "Chương 6: Bẫy Đọc File Với while(!fin.eof())",
    difficulty: "hard",
    trapRef: "Bẫy 8 (Đọc file lặp dư với while !fin.eof)",
    tags: ["File I/O", "EOF Pitfall", "stringstream"],
    title: "Bài 23: Bẫy Lặp Dư 1 Lần Khi Đọc File Bằng !eof()",
    code: `#include <iostream>
#include <sstream>
using namespace std;

int main() {
    string data = "10 20";
    stringstream ss(data);
    
    int val = 0;
    // BẪY: !ss.eof() chỉ bật sau khi đã đọc hụt
    while (!ss.eof()) {
        ss >> val;
        cout << val << " ";
    }
    return 0;
}`,
    expectedOutput: "10 20 20",
    alternativeOutputs: [
      "10 20 20 ",
      "10 20 20\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "Lần 1:", explanation: "Đọc `10` thành công -> in `10 `." },
      { step: 2, line: "Lần 2:", explanation: "Đọc `20` thành công -> in `20 `. Lúc này con trỏ đọc chạm cuối chuỗi nhưng cờ EOF CHƯA BẬT." },
      { step: 3, line: "Lần 3:", explanation: "⚠️ BẪY EOF: `!ss.eof()` vẫn là `true`! Lệnh `ss >> val` thất bại vì hết dữ liệu, `val` giữ nguyên giá trị cũ là `20` -> in tiếp `20 `." }
    ]
  },
  {
    id: "trace_24",
    number: 24,
    chapter: "ch6",
    chapterName: "Chương 6: Định Dạng Stream <iomanip>",
    difficulty: "medium",
    tags: ["<iomanip>", "setw", "hex"],
    title: "Bài 24: Định Dạng Xuất Dữ Liệu Hex & Chiều Rộng setw",
    code: `#include <iostream>
#include <iomanip>
using namespace std;

int main() {
    int n = 255;
    cout << hex << uppercase << n << " ";
    cout << dec << setw(5) << setfill('0') << 42;
    return 0;
}`,
    expectedOutput: "FF 00042",
    alternativeOutputs: [
      "FF 00042 ",
      "FF 00042\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "cout << hex << uppercase << 255", explanation: "Chuyển sang hệ 16 in hoa: 255 = `FF `." },
      { step: 2, line: "cout << dec << setw(5) << setfill('0') << 42", explanation: "Chuyển về hệ 10, độ rộng 5 ký tự lấp đầy bằng số '0' -> in `00042`." }
    ]
  },
  {
    id: "trace_25",
    number: 25,
    chapter: "ch6",
    chapterName: "Chương 6: Stream Chaining Với Operator<<",
    difficulty: "easy",
    trapRef: "Bẫy 6 (Quên return stream)",
    tags: ["Operator<<", "Stream Chaining"],
    title: "Bài 25: Nạp Chồng Operator<< Và Chuỗi Lệnh In",
    code: `#include <iostream>
using namespace std;

class Point {
public:
    int x, y;
    Point(int x, int y) : x(x), y(y) {}
    friend ostream& operator<<(ostream& os, const Point& p) {
        os << "(" << p.x << "," << p.y << ")";
        return os;
    }
};

int main() {
    Point p1(1, 2), p2(3, 4);
    cout << p1 << " -> " << p2;
    return 0;
}`,
    expectedOutput: "(1,2) -> (3,4)",
    alternativeOutputs: [
      "(1,2) -> (3,4) ",
      "(1,2) -> (3,4)\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "cout << p1", explanation: "Gọi `operator<<` in `(1,2)` và trả về `cout`." },
      { step: 2, line: "<< \" -> \" << p2", explanation: "Tiếp tục in ` -> ` rồi in `(3,4)` -> Tổng: `(1,2) -> (3,4)`." }
    ]
  },

  // =========================================================================
  // CHƯƠNG 7: TEMPLATE & EXCEPTION HANDLING (Q26 - Q33)
  // =========================================================================
  {
    id: "trace_26",
    number: 26,
    chapter: "ch7",
    chapterName: "Chương 7: Template & Exception",
    difficulty: "medium",
    tags: ["Function Template", "Type Deduction"],
    title: "Bài 26: Tự Suy Luận Kiểu (Type Deduction) Trong Template",
    code: `#include <iostream>
using namespace std;

template <typename T>
void printType(T val) {
    cout << "Gen:" << val << " ";
}

template <>
void printType<char>(char val) {
    cout << "Char:'" << val << "' ";
}

int main() {
    printType(100);
    printType('A');
    printType(3.14);
    return 0;
}`,
    expectedOutput: "Gen:100 Char:'A' Gen:3.14",
    alternativeOutputs: [
      "Gen:100 Char:'A' Gen:3.14 ",
      "Gen:100 Char:'A' Gen:3.14\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "printType(100)", explanation: "`100` là int -> gọi bản tổng quát in `Gen:100 `." },
      { step: 2, line: "printType('A')", explanation: "`'A'` là char -> gọi bản **Template Specialization** cho `char` -> in `Char:'A' `." },
      { step: 3, line: "printType(3.14)", explanation: "`3.14` là double -> gọi bản tổng quát in `Gen:3.14`." }
    ]
  },
  {
    id: "trace_27",
    number: 27,
    chapter: "ch7",
    chapterName: "Chương 7: Exception & Stack Unwinding",
    difficulty: "hard",
    trapRef: "Bẫy Stack Unwinding Destructor",
    tags: ["Stack Unwinding", "Exception", "Destructor Safety"],
    title: "Bài 27: Cơ Chế Stack Unwinding Tự Động Hủy Biến Khi Throw",
    code: `#include <iostream>
#include <stdexcept>
using namespace std;

class Resource {
    int id;
public:
    Resource(int i) : id(i) { cout << "R" << id << " "; }
    ~Resource() { cout << "~R" << id << " "; }
};

void process() {
    Resource r1(1);
    Resource r2(2);
    throw runtime_error("Err");
    Resource r3(3); // Không bao giờ chạy tới
}

int main() {
    try {
        process();
    }
    catch (const exception& e) {
        cout << "Caught ";
    }
    return 0;
}`,
    expectedOutput: "R1 R2 ~R2 ~R1 Caught",
    alternativeOutputs: [
      "R1 R2 ~R2 ~R1 Caught ",
      "R1 R2 ~R2 ~R1 Caught\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "Resource r1(1); Resource r2(2);", explanation: "Khởi tạo `r1` in `R1 `, khởi tạo `r2` in `R2 `." },
      { step: 2, line: "throw runtime_error(\"Err\");", explanation: "⚠️ CƠ CHẾ STACK UNWINDING: Khi ném ngoại lệ, hàm dừng ngay và dọn dẹp các biến cục bộ trên stack theo thứ tự ngược lại (LIFO): `r2` bị hủy trước (`~R2 `), rồi `r1` bị hủy (`~R1 `)." },
      { step: 3, line: "catch (const exception& e)", explanation: "Khớp ngoại lệ và in `Caught`." }
    ]
  },
  {
    id: "trace_28",
    number: 28,
    chapter: "ch7",
    chapterName: "Chương 7: Thứ Tự Khối Catch (Catch Order Trap)",
    difficulty: "hard",
    trapRef: "Bẫy 5 (Thứ tự catch sai)",
    tags: ["Catch Order", "Exception Inheritance"],
    title: "Bài 28: Bẫy Thứ Tự Khối Catch Bắt Lớp Cha Trước Lớp Con",
    code: `#include <iostream>
#include <stdexcept>
using namespace std;

int main() {
    try {
        throw out_of_range("Out of bounds!");
    }
    catch (const logic_error& e) { // logic_error là lớp cha của out_of_range
        cout << "Catch_Logic ";
    }
    catch (const out_of_range& e) {
        cout << "Catch_OutOfRange ";
    }
    catch (...) {
        cout << "Catch_All ";
    }
    return 0;
}`,
    expectedOutput: "Catch_Logic",
    alternativeOutputs: [
      "Catch_Logic ",
      "Catch_Logic\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "throw out_of_range(...)", explanation: "`out_of_range` kế thừa từ `logic_error`." },
      { step: 2, line: "catch (const logic_error& e)", explanation: "⚠️ BẪY THỨ TỰ CATCH: C++ duyệt catch từ trên xuống. Vì `logic_error` là lớp cha, nó khớp ngay và chặn luôn exception. Khối `catch (out_of_range)` phía dưới bị bỏ qua hoàn toàn. In `Catch_Logic`." }
    ]
  },
  {
    id: "trace_29",
    number: 29,
    chapter: "ch7",
    chapterName: "Chương 7: Ngoại Lệ Ném Trong Constructor",
    difficulty: "hard",
    trapRef: "Bẫy Destructor Không Chạy Khi Constructor Throw",
    tags: ["Exception in Constructor", "Object Lifetime"],
    title: "Bài 29: Đối Tượng Chưa Hoàn Tất Khởi Tạo Sẽ Không Gọi Destructor",
    code: `#include <iostream>
using namespace std;

class Demo {
public:
    Demo() {
        cout << "D_ctor ";
        throw 10; // Ném ngoại lệ khi đang tạo
    }
    ~Demo() {
        cout << "D_dtor ";
    }
};

int main() {
    try {
        Demo d;
    }
    catch (int e) {
        cout << "Catch:" << e;
    }
    return 0;
}`,
    expectedOutput: "D_ctor Catch:10",
    alternativeOutputs: [
      "D_ctor Catch:10 ",
      "D_ctor Catch:10\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "Demo d;", explanation: "Constructor bắt đầu chạy -> in `D_ctor `." },
      { step: 2, line: "throw 10;", explanation: "⚠️ BẪY KINH ĐIỂN: Vì constructor chưa hoàn tất, đối tượng `d` được coi là CHƯA TỒN TẠI. Do đó, destructor `~Demo()` của nó SẼ KHÔNG ĐƯỢC GỌI!" },
      { step: 3, line: "catch (int e)", explanation: "Bắt số nguyên `10` -> in `Catch:10`." }
    ]
  },
  {
    id: "trace_30",
    number: 30,
    chapter: "ch7",
    chapterName: "Chương 7: Non-type Template Parameter",
    difficulty: "medium",
    tags: ["Non-type Parameter", "Compile-time Constant"],
    title: "Bài 30: Tham Số Giá Trị Không Phải Kiểu (Non-type Parameter)",
    code: `#include <iostream>
using namespace std;

template <typename T, int MULTIPLIER>
T scale(T val) {
    return val * MULTIPLIER;
}

int main() {
    cout << scale<int, 5>(10) << " ";
    cout << scale<double, 2>(3.5);
    return 0;
}`,
    expectedOutput: "50 7",
    alternativeOutputs: [
      "50 7 ",
      "50 7\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "scale<int, 5>(10)", explanation: "$10 \\times 5 = 50$." },
      { step: 2, line: "scale<double, 2>(3.5)", explanation: "$3.5 \\times 2 = 7$." }
    ]
  },

  // =========================================================================
  // CHƯƠNG 8 & PATTERNS: STL & DESIGN PATTERNS (Q31 - Q35)
  // =========================================================================
  {
    id: "trace_31",
    number: 31,
    chapter: "ch8",
    chapterName: "Chương 8: STL std::vector & Dung Lượng Capacity",
    difficulty: "medium",
    tags: ["std::vector", "size vs capacity", "push_back"],
    title: "Bài 31: Kích Thước (Size) vs Dung Lượng (Capacity) Trong Vector",
    code: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> v;
    v.push_back(10);
    v.push_back(20);
    v.push_back(30);
    
    v.pop_back(); // Xóa 30
    
    cout << "Size:" << v.size() << " ";
    cout << "Front:" << v.front() << " ";
    cout << "Back:" << v.back();
    return 0;
}`,
    expectedOutput: "Size:2 Front:10 Back:20",
    alternativeOutputs: [
      "Size:2 Front:10 Back:20 ",
      "Size:2 Front:10 Back:20\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "push_back 10, 20, 30 rồi pop_back()", explanation: "Vector còn 2 phần tử: `[10, 20]`." },
      { step: 2, line: "cout", explanation: "`size = 2`, `front = 10`, `back = 20` -> In `Size:2 Front:10 Back:20`." }
    ]
  },
  {
    id: "trace_32",
    number: 32,
    chapter: "ch8",
    chapterName: "Chương 8: std::map Tự Sắp Xếp Theo Key",
    difficulty: "medium",
    tags: ["std::map", "Ordered Associative Container", "Key Sorting"],
    title: "Bài 32: std::map Tự Động Sắp Xếp Tăng Dần Theo Khóa (Key)",
    code: `#include <iostream>
#include <map>
#include <string>
using namespace std;

int main() {
    map<int, string> studentMap;
    studentMap[30] = "Charlie";
    studentMap[10] = "Alice";
    studentMap[20] = "Bob";
    
    for (auto it = studentMap.begin(); it != studentMap.end(); ++it) {
        cout << it->first << ":" << it->second << " ";
    }
    return 0;
}`,
    expectedOutput: "10:Alice 20:Bob 30:Charlie",
    alternativeOutputs: [
      "10:Alice 20:Bob 30:Charlie ",
      "10:Alice 20:Bob 30:Charlie\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "studentMap chèn 30, 10, 20", explanation: "`std::map` dựa trên cây Đỏ-Đen tự động sắp xếp các khóa tăng dần: `10` -> `20` -> `30`." },
      { step: 2, line: "Duyệt iterator in kết quả:", explanation: "In ra đúng thứ tự: `10:Alice 20:Bob 30:Charlie`." }
    ]
  },
  {
    id: "trace_33",
    number: 33,
    chapter: "ch8",
    chapterName: "Chương 8: std::accumulate Khởi Tạo Giá Trị Ban Đầu",
    difficulty: "medium",
    tags: ["std::accumulate", "<numeric>", "Initial value trap"],
    title: "Bài 33: Bẫy Giá Trị Khởi Tạo Của std::accumulate",
    code: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    vector<int> numbers = {1, 2, 3, 4};
    // initVal = 100
    int sum = accumulate(numbers.begin(), numbers.end(), 100);
    cout << "Sum = " << sum;
    return 0;
}`,
    expectedOutput: "Sum = 110",
    alternativeOutputs: [
      "Sum = 110\n",
      "Sum = 10"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "accumulate(..., 100)", explanation: "⚠️ BẪY: Tham số thứ 3 của `accumulate` là giá trị khởi tạo `init = 100`. Tổng các phần tử mảng là $1 + 2 + 3 + 4 = 10$. Tổng trả về = $100 + 10 = 110$." }
    ]
  },
  {
    id: "trace_34",
    number: 34,
    chapter: "ch8",
    chapterName: "Chương 8: Vòng Đời Singleton Pattern",
    difficulty: "medium",
    tags: ["Singleton Pattern", "Static Instance"],
    title: "Bài 34: Vòng Đời Thể Hiện Duy Nhất Của Singleton Pattern",
    code: `#include <iostream>
using namespace std;

class AppConfig {
    static AppConfig* instance;
    int counter;
    AppConfig() : counter(0) { cout << "Created "; }
public:
    static AppConfig* getInstance() {
        if (!instance) instance = new AppConfig();
        return instance;
    }
    void increment() { counter++; cout << "C:" << counter << " "; }
};

AppConfig* AppConfig::instance = nullptr;

int main() {
    AppConfig* c1 = AppConfig::getInstance();
    c1->increment();
    
    AppConfig* c2 = AppConfig::getInstance(); // Không tạo object mới
    c2->increment();
    return 0;
}`,
    expectedOutput: "Created C:1 C:2",
    alternativeOutputs: [
      "Created C:1 C:2 ",
      "Created C:1 C:2\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "c1 = AppConfig::getInstance();", explanation: "`instance` là null -> gọi private constructor in `Created `. `c1->increment()` tăng `counter` lên 1 in `C:1 `." },
      { step: 2, line: "c2 = AppConfig::getInstance();", explanation: "`instance` đã tồn tại -> trả về con trỏ cũ (không gọi constructor nữa). `c2->increment()` tăng tiếp `counter` lên 2 in `C:2 `." }
    ]
  },
  {
    id: "trace_35",
    number: 35,
    chapter: "ch8",
    chapterName: "Chương 8: std::sort Với Toán Tử So Sánh Custom",
    difficulty: "easy",
    tags: ["std::sort", "greater<int>", "<algorithm>"],
    title: "Bài 35: Sắp Xếp Giảm Dần Với std::greater Trong <algorithm>",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> arr = {15, 3, 99, 42};
    sort(arr.begin(), arr.end(), greater<int>());
    
    for (int x : arr) {
        cout << x << " ";
    }
    return 0;
}`,
    expectedOutput: "99 42 15 3",
    alternativeOutputs: [
      "99 42 15 3 ",
      "99 42 15 3\n"
    ],
    stepByStepAnalysis: [
      { step: 1, line: "sort(..., greater<int>())", explanation: "Sắp xếp giảm dần từ lớn đến bé." },
      { step: 2, line: "Kết quả in ra:", explanation: "`99 42 15 3 `" }
    ]
  }
];
