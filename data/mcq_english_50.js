/**
 * 50 ENGLISH MULTIPLE CHOICE QUESTIONS (MCQs) - ADVANCED OOP IN C++ (FIT-HCMUS STANDARD)
 * High-Difficulty Question Bank matching and exceeding the Official 2024-2025 Exam Caliber
 * 
 * Chapter Breakdown:
 *  - Chapter 5 (Inheritance & Polymorphism): 12 Questions (Q1 - Q12)
 *  - Chapter 6 (Relationships & File I/O): 8 Questions (Q13 - Q20)
 *  - Chapter 7 (Templates & Exceptions): 10 Questions (Q21 - Q30)
 *  - Chapter 8 & Design Patterns (STL & Enterprise Patterns): 10 Questions (Q31 - Q40)
 *  - Chapters 2, 3, 4 (Core OOP, Memory, Static, Rule of Three): 10 Questions (Q41 - Q50)
 */

var MCQ_ENGLISH_50 = [
  // =========================================================================
  // CHAPTER 5: INHERITANCE & POLYMORPHISM (Q1 - Q12)
  // =========================================================================
  {
    id: "mcq_1",
    number: 1,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "hard",
    tags: ["Copy Constructor Trap", "Member Initializer List", "Real Exam 2024-2025"],
    question: "In C++, what happens when a Derived class defines a Copy Constructor `Derived(const Derived& other)` but DOES NOT explicitly call the Base class copy constructor in its member initializer list?",
    code: `class Base {
public:
    Base() { cout << "Base() "; }
    Base(const Base& b) { cout << "Base(copy) "; }
};
class Derived : public Base {
public:
    Derived(const Derived& d) { cout << "Derived(copy) "; }
};
int main() {
    Derived d1;
    Derived d2 = d1; // What is printed for d2?
}`,
    options: [
      "A. The compiler generates an error because base copy constructor must always be explicitly invoked.",
      "B. C++ automatically calls Base's Default Constructor `Base()`, followed by `Derived(copy)`.",
      "C. C++ automatically calls Base's Copy Constructor `Base(copy)`, followed by `Derived(copy)`.",
      "D. C++ skips base construction completely and only executes `Derived(copy)`."
    ],
    correctIndex: 1,
    explanation: "**Explanation (Bẫy Đề Thi Thật 2024-2025):**\n" +
      "If you do not specify a base constructor call in the member initializer list of a derived copy constructor, C++ falls back to calling the **default constructor** of the base class (`Base()`), NOT the base copy constructor! To perform a proper deep copy of base sub-objects, you must write `Derived(const Derived& d) : Base(d) { ... }`.\n" +
      "- *Vietnamese Note:* Bẫy kinh điển trong đề thi 2024-2025: Khi viết Copy Constructor lớp con mà quên gọi `Base(d)` ở danh sách khởi tạo, C++ sẽ tự động gọi **Default Constructor** của lớp cha!"
  },
  {
    id: "mcq_2",
    number: 2,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "hard",
    tags: ["Virtual Destructor", "Polymorphism", "Memory Leak"],
    question: "Consider a polymorphic hierarchy where `Base* ptr = new Derived(); delete ptr;` is executed. If `~Base()` is NOT declared `virtual`, what is the exact behavior defined by the C++ Standard?",
    code: `class Base { public: ~Base() { cout << "~Base "; } };
class Derived : public Base {
    int* buffer;
public:
    Derived() : buffer(new int[100]) {}
    ~Derived() { delete[] buffer; cout << "~Derived "; }
};
int main() {
    Base* ptr = new Derived();
    delete ptr;
}`,
    options: [
      "A. It calls `~Derived()` followed by `~Base()`, freeing all heap memory properly.",
      "B. It invokes Undefined Behavior (typically executing only `~Base()` via static binding), leaking `buffer`.",
      "C. The program fails to compile because deleting a derived object through a base pointer requires `virtual ~Base()`.",
      "D. The runtime environment throws a `std::bad_alloc` exception."
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "According to the C++ Standard (§8.3.5), deleting an object of derived type through a pointer to a base type that does not have a virtual destructor results in **Undefined Behavior**. In practice, the compiler performs static binding and calls only `~Base()`. The `~Derived()` destructor is completely bypassed, leaking the dynamic array `buffer`.\n" +
      "- *Vietnamese Note:* Nếu destructor của `Base` không có `virtual`, `delete ptr` qua con trỏ lớp cha là Undefined Behavior (thực tế chỉ gọi `~Base()`, bỏ qua `~Derived()` và gây leak bộ nhớ)."
  },
  {
    id: "mcq_3",
    number: 3,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "medium",
    tags: ["Dynamic Binding", "Virtual Table", "vptr"],
    question: "How does the C++ runtime implement dynamic polymorphism for virtual function calls like `ptr->display()`?",
    code: `class Shape { public: virtual void display() { cout << "Shape"; } };
class Circle : public Shape { public: void display() override { cout << "Circle"; } };
Shape* s = new Circle();
s->display();`,
    options: [
      "A. The compiler performs string comparison on method names at runtime.",
      "B. The object contains a hidden virtual table pointer (`vptr`) pointing to a `vtable` of function pointers.",
      "C. The operating system performs dynamic linking on each method call.",
      "D. RTTI (Run-Time Type Information) is used to recompile the call site on the fly."
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "C++ implements dynamic dispatch using a **Virtual Method Table (vtable)** per class and a hidden **vptr** (virtual pointer) embedded inside each object instance. When `s->display()` is invoked, the program dereferences `s->vptr` to find `Circle`'s vtable and calls the function pointer at the slot for `display()`.\n" +
      "- *Vietnamese Note:* Mỗi đối tượng có chứa 1 con trỏ ẩn `vptr` trỏ tới bảng `vtable` của lớp tương ứng để tìm hàm cần gọi tại runtime."
  },
  {
    id: "mcq_4",
    number: 4,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "hard",
    tags: ["Object Slicing", "Pass-by-value", "Polymorphism"],
    question: "What is **Object Slicing** in C++ and when does it occur?",
    code: `class Base { public: int x; virtual void print() { cout << "Base"; } };
class Derived : public Base { public: int y; void print() override { cout << "Derived"; } };

void test(Base obj) { // Pass by value!
    obj.print();
}
int main() {
    Derived d;
    test(d);
}`,
    options: [
      "A. It occurs when a derived object is passed by pointer, causing memory fragmentation.",
      "B. It occurs when a Derived object is assigned or passed by value to a Base object, stripping away Derived members and vptr.",
      "C. It occurs when multiple inheritance classes have identical member names.",
      "D. It is a compilation optimization technique to reduce executable binary size."
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "Object slicing occurs when a derived class object is assigned or passed **by value** to a base class variable. The copy constructor of `Base` only copies the base sub-object data, 'slicing off' the derived-specific members (`y`) and pointing the vptr to `Base`'s vtable. Thus, `obj.print()` inside `test()` prints `Base`.\n" +
      "- *Vietnamese Note:* Cắt lớp đối tượng (Object Slicing) xảy ra khi truyền tham trị đối tượng con vào biến lớp cha -> phần dữ liệu mở rộng của con bị cắt bỏ hoàn toàn."
  },
  {
    id: "mcq_5",
    number: 5,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "hard",
    tags: ["Virtual in Constructor", "Lifecycle", "Constructor Traps"],
    question: "What is printed when calling a virtual method from inside a Base class constructor?",
    code: `#include <iostream>
using namespace std;

class Base {
public:
    Base() { setup(); }
    virtual void setup() { cout << "Base::setup "; }
};
class Derived : public Base {
public:
    Derived() {}
    void setup() override { cout << "Derived::setup "; }
};
int main() {
    Derived d;
    return 0;
}`,
    options: [
      "A. Derived::setup",
      "B. Base::setup",
      "C. Compilation Error: cannot call virtual function in constructor",
      "D. Undefined Behavior at runtime"
    ],
    correctIndex: 1,
    explanation: "**Explanation (Bẫy Gọi Virtual Trong Constructor):**\n" +
      "During the construction of `Base`, the `Derived` sub-object has not yet been initialized (its members do not exist yet). Therefore, C++ sets the `vptr` to `Base`'s vtable during `Base`'s constructor. Calling `setup()` executes `Base::setup`, NOT `Derived::setup`!\n" +
      "- *Vietnamese Note:* Trong constructor của lớp cha, đối tượng con chưa được tạo nên hàm ảo chỉ gọi phiên bản của lớp cha `Base::setup`."
  },
  {
    id: "mcq_6",
    number: 6,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "hard",
    tags: ["Diamond Problem", "Virtual Inheritance"],
    question: "How does **Virtual Inheritance** (`class B : virtual public A`) solve the Diamond Problem in C++?",
    code: `class A { public: int val; };
class B : virtual public A {};
class C : virtual public A {};
class D : public B, public C {};`,
    options: [
      "A. By making all methods in class A pure virtual.",
      "B. By ensuring that only one single shared instance of base class A exists in the most derived class D.",
      "C. By preventing class D from accessing any members of class A.",
      "D. By dynamically allocating class A on the heap during runtime."
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "Virtual inheritance ensures that only one shared sub-object of `A` is included in `D`. The most derived class `D` is responsible for directly invoking `A`'s constructor in its member initializer list, eliminating ambiguity when accessing `d.val`.\n" +
      "- *Vietnamese Note:* Kế thừa ảo (Virtual Inheritance) giải quyết bài toán Kim Cương (Diamond Problem) bằng cách đảm bảo chỉ có duy nhất 1 bản sao lớp gốc `A` được chia sẻ trong lớp `D`."
  },
  {
    id: "mcq_7",
    number: 7,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "medium",
    tags: ["Pure Virtual Function", "Abstract Class"],
    question: "Which of the following statements about pure virtual functions in C++ is **TRUE**?",
    code: `class Interface {
public:
    virtual void execute() = 0;
};`,
    options: [
      "A. A pure virtual function can NEVER have an implementation in C++.",
      "B. A class containing a pure virtual function cannot be instantiated, but a pure virtual function CAN have a default implementation outside the class.",
      "C. A pure virtual function forces all derived classes to be declared `final`.",
      "D. Pure virtual functions can only return `void`."
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "In C++, a pure virtual function makes the class abstract, but C++ actually permits providing a body for a pure virtual function outside the class declaration (e.g., `void Interface::execute() { ... }`). Derived classes still must override it, but they can call `Interface::execute()` explicitly.\n" +
      "- *Vietnamese Note:* Hàm thuần ảo (pure virtual function) làm cho class trở thành trừu tượng, nhưng C++ vẫn cho phép định nghĩa phần thân hàm thuần ảo ở bên ngoài class."
  },
  {
    id: "mcq_8",
    number: 8,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "hard",
    tags: ["dynamic_cast", "RTTI", "Type Casting"],
    question: "When using `dynamic_cast<Derived*>(basePtr)`, what is returned if `basePtr` does NOT actually point to a `Derived` instance?",
    code: `Base* b = new AnotherDerived();
Derived* d = dynamic_cast<Derived*>(b);`,
    options: [
      "A. It throws a `std::bad_cast` exception.",
      "B. It returns `nullptr` (for pointer casts) and throws `std::bad_cast` (for reference casts).",
      "C. It returns an uninitialized pointer pointing to invalid memory.",
      "D. It generates a compilation error."
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "For pointers, `dynamic_cast` returns `nullptr` on failure. For references (which cannot be null), `dynamic_cast<Derived&>(baseRef)` throws `std::bad_cast` on failure.\n" +
      "- *Vietnamese Note:* `dynamic_cast` với con trỏ sẽ trả về `nullptr` nếu ép kiểu thất bại; với tham chiếu sẽ ném ngoại lệ `std::bad_cast`."
  },
  {
    id: "mcq_9",
    number: 9,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "medium",
    tags: ["Access Specifiers", "Inheritance"],
    question: "If class `Derived` inherits from `Base` with `protected` inheritance (`class Derived : protected Base`), what do `public` members of `Base` become inside `Derived` and for external code?",
    code: `class Base { public: int x; };
class Derived : protected Base {};`,
    options: [
      "A. They become `public` inside `Derived` and accessible from external code.",
      "B. They become `protected` inside `Derived` and INACCESSIBLE from external code.",
      "C. They become `private` inside `Derived` and accessible from external code.",
      "D. They are completely hidden and cannot be accessed even inside `Derived`."
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "Under `protected` inheritance, `public` and `protected` members of the base class both become `protected` members of the derived class. They can be accessed by member functions of `Derived` and its children, but NOT by external code (`d.x` is a compiler error).\n" +
      "- *Vietnamese Note:* Khi kế thừa `protected`, các thành viên `public` của lớp cha sẽ trở thành `protected` trong lớp con (bên ngoài không truy cập được)."
  },
  {
    id: "mcq_10",
    number: 10,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "hard",
    tags: ["Function Hiding", "Name Shadowing"],
    question: "What is printed by the following C++ code involving function name hiding?",
    code: `#include <iostream>
using namespace std;

class Base {
public:
    void print(int x) { cout << "Base::int "; }
    void print(double x) { cout << "Base::double "; }
};
class Derived : public Base {
public:
    void print(int x) { cout << "Derived::int "; }
};
int main() {
    Derived d;
    d.print(3.14); // Notice 3.14 is a double
    return 0;
}`,
    options: [
      "A. Base::double (because 3.14 is a double)",
      "B. Derived::int (because Derived::print hides all Base::print overloads, converting 3.14 to int 3)",
      "C. Compilation Error: ambiguous call to print()",
      "D. Runtime Exception"
    ],
    correctIndex: 1,
    explanation: "**Explanation (Bẫy Ẩn Hàm - Name Hiding):**\n" +
      "In C++, declaring a function in a derived class with the same name as a base class function hides ALL overloads of that name in the base class, regardless of parameter signatures. `Derived::print(int)` hides `Base::print(double)`. Thus, `d.print(3.14)` implicitly truncates `3.14` to integer `3` and calls `Derived::print(int)`!\n" +
      "- *Vietnamese Note:* Lớp con có hàm cùng tên sẽ ẩn (hide) tất cả các hàm trùng tên của lớp cha. `3.14` bị ép kiểu ngầm định về `int 3` và gọi `Derived::int`!"
  },
  {
    id: "mcq_11",
    number: 11,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "hard",
    tags: ["Virtual Default Arguments", "Late Binding Trap"],
    question: "What is printed when calling a virtual function that has default parameter values in both Base and Derived?",
    code: `#include <iostream>
using namespace std;

class Base {
public:
    virtual void display(int x = 10) { cout << "Base:" << x << " "; }
};
class Derived : public Base {
public:
    void display(int x = 20) override { cout << "Derived:" << x << " "; }
};
int main() {
    Base* ptr = new Derived();
    ptr->display();
    delete ptr;
    return 0;
}`,
    options: [
      "A. Derived:20",
      "B. Derived:10",
      "C. Base:10",
      "D. Compilation Error: default parameters cannot be overridden"
    ],
    correctIndex: 1,
    explanation: "**Explanation (Bẫy Default Argument Trong Virtual Function):**\n" +
      "Default arguments are resolved at **compile time** based on the static type of the pointer (`Base*`), which specifies default value `10`. However, the virtual function body is resolved at **runtime** based on the actual object type (`Derived`). Therefore, `Derived::display` executes with argument `10`, printing `Derived:10`!\n" +
      "- *Vietnamese Note:* Tham số mặc định được gán ở thời điểm compile (theo kiểu con trỏ `Base*` là 10), nhưng hàm ảo được gọi ở runtime (là `Derived`) -> in `Derived:10`."
  },
  {
    id: "mcq_12",
    number: 12,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "medium",
    tags: ["final keyword", "override keyword"],
    question: "What happens if a method is declared with `virtual void func() final;` in a Base class?",
    code: `class Base {
public:
    virtual void process() final;
};
class Derived : public Base {
public:
    void process() override; // What happens here?
};`,
    options: [
      "A. Derived can override it only if it uses the `inline` keyword.",
      "B. The compiler emits an error because a `final` virtual method cannot be overridden by any derived class.",
      "C. The method can only be called once in the entire program.",
      "D. Derived inherits the method privately."
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "The `final` specifier prevents a virtual function from being overridden in derived classes (or prevents a class from being inherited if applied to class declaration). Overriding a final method causes a compiler error.\n" +
      "- *Vietnamese Note:* Từ khóa `final` ngăn chặn các lớp con ghi đè phương thức ảo."
  },

  // =========================================================================
  // CHAPTER 6: RELATIONSHIPS & FILE I/O (Q13 - Q20)
  // =========================================================================
  {
    id: "mcq_13",
    number: 13,
    chapter: "ch6",
    chapterName: "Chapter 6: Relationships & File I/O",
    difficulty: "medium",
    tags: ["Composition vs Aggregation", "UML", "Lifecycle"],
    question: "What is the key structural difference between **Composition** and **Aggregation** in OOP C++?",
    code: null,
    options: [
      "A. Composition is 'is-a', whereas Aggregation is 'has-a'.",
      "B. In Composition, the component's lifetime is strictly managed by the owner (strong 'part-of'); in Aggregation, the component can exist independently (weak 'has-a').",
      "C. Aggregation cannot use pointers, while Composition requires pointers.",
      "D. Composition allows multiple inheritance, while Aggregation only allows single inheritance."
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "In **Composition** (filled diamond in UML), the owner object manages the lifecycle of the component (if the House is destroyed, the Rooms are destroyed). In **Aggregation** (hollow diamond in UML), the parts have an independent lifecycle (if the University closes, Teachers still exist).\n" +
      "- *Vietnamese Note:* Composition (chứa gộp chặt) có vòng đời gắn liền với đối tượng cha; Aggregation (chứa gộp yếu/tụ tập) có vòng đời độc lập."
  },
  {
    id: "mcq_14",
    number: 14,
    chapter: "ch6",
    chapterName: "Chapter 6: Relationships & File I/O",
    difficulty: "hard",
    tags: ["Binary File I/O", "Pointers in Binary File", "Serialization Trap"],
    question: "Why is it DANGEROUS and INCORRECT to write an object containing raw pointers or `std::string` directly to a binary file using `file.write((char*)&obj, sizeof(obj))`?",
    code: `class Student {
    char* name; // heap pointer
    int age;
};
Student s;
file.write((char*)&s, sizeof(s)); // Why is this a serious bug?`,
    options: [
      "A. Because `sizeof(s)` always evaluates to 0 for classes with pointers.",
      "B. Because it only writes the memory address of the pointer (which becomes invalid/dangling upon re-reading in another process), not the actual pointed-to text.",
      "C. Because binary files only accept `int` data types.",
      "D. Because `write()` automatically decrypts the memory."
    ],
    correctIndex: 1,
    explanation: "**Explanation (Bẫy Ghi File Nhị Phân):**\n" +
      "A raw binary write (`sizeof(obj)`) copies the object's shallow byte layout. For pointers or dynamic objects like `std::string`, it writes the 8-byte pointer address, NOT the data on the heap! When the file is read back later, that address is dangling or points to garbage memory, causing crashes or memory corruption.\n" +
      "- *Vietnamese Note:* Ghi nhị phân trực tiếp đối tượng chứa con trỏ chỉ ghi địa chỉ bộ nhớ (RAM address) chứ không ghi nội dung thực sự -> khi đọc lại sẽ bị trỏ rác (Dangling Pointer) và crash!"
  },
  {
    id: "mcq_15",
    number: 15,
    chapter: "ch6",
    chapterName: "Chapter 6: Relationships & File I/O",
    difficulty: "hard",
    tags: ["File EOF Loop Trap", "Stream State"],
    question: "What is the common bug in the loop `while (!file.eof()) { file >> val; cout << val; }` when reading text files in C++?",
    code: `ifstream file("data.txt");
int val;
while (!file.eof()) { // Why is this a bug?
    file >> val;
    cout << val << " ";
}`,
    options: [
      "A. It skips the first line of the file.",
      "B. The `eof` flag is only set AFTER an attempted read fails past the end of file, causing the last item to be printed TWICE.",
      "C. It throws an `ifstream_overflow` exception.",
      "D. It truncates the input file to 0 bytes."
    ],
    correctIndex: 1,
    explanation: "**Explanation (Bẫy 10 Trong Sổ Tay - EOF Lặp Dư 1 Lần):**\n" +
      "In C++, `file.eof()` returns true ONLY after an I/O operation has already attempted to read beyond the end of the file and failed. In the last iteration, reading fails, `val` retains its old value, and `cout << val` prints the last item a second time! The correct pattern is `while (file >> val) { cout << val << ' '; }`.\n" +
      "- *Vietnamese Note:* Cờ `eof` chỉ bật lên sau khi phép đọc thất bại -> dẫn đến vòng lặp in lặp lại phần tử cuối cùng 2 lần!"
  },
  {
    id: "mcq_16",
    number: 16,
    chapter: "ch6",
    chapterName: "Chapter 6: Relationships & File I/O",
    difficulty: "medium",
    tags: ["Stream Operator Overloading", "friend function"],
    question: "Why must the stream extraction operator `operator>>` and insertion operator `operator<<` be implemented as NON-MEMBER (friend) functions rather than member methods?",
    code: `class Point { int x, y; };
// Why not: Point::operator<<(ostream& os)?`,
    options: [
      "A. Because C++ does not allow operator overloading inside class definitions.",
      "B. Because the left-hand operand is an `ostream`/`istream` object (e.g. `cout << p`), not the `Point` object itself.",
      "C. Because stream objects are allocated on the GPU.",
      "D. To make the execution 10 times faster."
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "In `cout << p;`, the left-hand operand is `std::ostream&`. If implemented as a member function, it would have to belong to `std::ostream`, which we cannot modify. If implemented as a member of `Point`, the syntax would awkwardly be `p << cout;` or `p.operator<<(cout)`.\n" +
      "- *Vietnamese Note:* Toán tử xuất nhập `<<` và `>>` có toán hạng bên trái là stream (`cin`, `cout`) chứ không phải đối tượng của class, nên bắt buộc phải khai báo hàm toàn cục (friend)."
  },
  {
    id: "mcq_17",
    number: 17,
    chapter: "ch6",
    chapterName: "Chapter 6: Relationships & File I/O",
    difficulty: "medium",
    tags: ["Association", "Dependency", "UML"],
    question: "In UML and OOP design, what represents a **Dependency** ('uses-a') relationship between Class A and Class B?",
    code: null,
    options: [
      "A. Class A has a member variable of type Class B.",
      "B. Class A receives an object of Class B as a parameter in a method or uses it as a local variable without storing it as an attribute.",
      "C. Class A inherits all protected methods of Class B.",
      "D. Class A and Class B are defined in the same source file."
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "A Dependency (dashed arrow with open arrowhead in UML) is the weakest relationship. Class A temporarily uses Class B (e.g., as a parameter in a method like `void printReport(Printer& p);`), but does not retain a persistent pointer/reference to B as a member attribute.\n" +
      "- *Vietnamese Note:* Phụ thuộc (Dependency - uses a) là quan hệ ngắn hạn khi lớp A nhận B làm tham số hàm hoặc biến cục bộ tạm thời."
  },
  {
    id: "mcq_18",
    number: 18,
    chapter: "ch6",
    chapterName: "Chapter 6: Relationships & File I/O",
    difficulty: "hard",
    tags: ["File Stream Modes", "ios::app vs ios::trunc"],
    question: "What is the difference between `ios::app` and `ios::ate` when opening an `ofstream` in C++?",
    code: `ofstream f1("log.txt", ios::app);
ofstream f2("log.txt", ios::ate);`,
    options: [
      "A. `ios::app` forces EVERY write operation to append to the end of the file, whereas `ios::ate` simply starts the write pointer at the end but allows seeking to other positions.",
      "B. `ios::app` truncates the file to 0 bytes, while `ios::ate` preserves existing content.",
      "C. `ios::ate` is for binary files only; `ios::app` is for text files only.",
      "D. There is no difference; they are exact aliases."
    ],
    correctIndex: 0,
    explanation: "**Explanation:**\n" +
      "In `ios::app` (append mode), all output operations are strictly performed at the end of the file (any `seekp()` call is ignored before write). In `ios::ate` ('at end' mode), the stream seeks to the end upon opening, but you can reposition the pointer elsewhere using `seekp()` to overwrite existing data.\n" +
      "- *Vietnamese Note:* `ios::app` luôn ghi vào cuối file; `ios::ate` chỉ đặt con trỏ tại cuối file lúc mở nhưng vẫn cho phép `seek` đến vị trí khác."
  },
  {
    id: "mcq_19",
    number: 19,
    chapter: "ch6",
    chapterName: "Chapter 6: Relationships & File I/O",
    difficulty: "medium",
    tags: ["tellg", "seekg", "File Size"],
    question: "How do you calculate the exact size of a file in bytes using C++ standard file streams?",
    code: `ifstream file("data.bin", ios::binary | ios::ate);
// How to get size?`,
    options: [
      "A. `int size = file.length();`",
      "B. `streampos size = file.tellg();` (when opened with `ios::ate`)",
      "C. `sizeof(file);`",
      "D. `file.size_in_bytes();`"
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "By opening the file in binary mode with `ios::ate`, the get pointer (`g`) is immediately placed at the end of the file. Calling `file.tellg()` returns the current get position in bytes, which equals the total file size.\n" +
      "- *Vietnamese Note:* Mở file với cờ `ios::ate` và gọi `file.tellg()` sẽ trả về vị trí con trỏ đọc tại cuối file = kích thước file theo byte."
  },
  {
    id: "mcq_20",
    number: 20,
    chapter: "ch6",
    chapterName: "Chapter 6: Relationships & File I/O",
    difficulty: "hard",
    tags: ["Stream State Flags", "failbit", "clear()"],
    question: "If a user enters invalid text when `cin >> intVar` is executed, what happens to the stream state and what must be done to restore input reading?",
    code: `int intVar;
cin >> intVar; // User enters "hello"`,
    options: [
      "A. The stream throws `std::runtime_error` immediately.",
      "B. `cin.failbit` is set; subsequent reads will fail silently until `cin.clear()` is called and invalid characters are extracted with `cin.ignore()`.",
      "C. `intVar` is set to `-1` and the stream continues normally.",
      "D. The program crashes with SIGSEGV."
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "When extraction fails, `cin.fail()` becomes true (`failbit` is set), and `cin` refuses further reads. To recover, you must call `cin.clear()` to reset the error flags and `cin.ignore(numeric_limits<streamsize>::max(), '\\n')` to flush the invalid characters from the stream buffer.\n" +
      "- *Vietnamese Note:* Khi nhập sai kiểu dữ liệu, `cin` bật cờ `failbit`. Phải dùng `cin.clear()` để xóa cờ lỗi và `cin.ignore()` để bỏ qua các ký tự rác còn sót lại."
  },

  // =========================================================================
  // CHAPTER 7: TEMPLATES & EXCEPTIONS (Q21 - Q30)
  // =========================================================================
  {
    id: "mcq_21",
    number: 21,
    chapter: "ch7",
    chapterName: "Chapter 7: Templates & Exceptions",
    difficulty: "hard",
    tags: ["Stack Unwinding", "Exception in Constructor", "RAII"],
    question: "If an exception is thrown inside a constructor before it finishes, what happens to the object's destructor and its member variables?",
    code: `class Device {
    Component c1;
    int* data;
public:
    Device() : data(new int[50]) {
        throw runtime_error("Error in Device ctor");
    }
    ~Device() { delete[] data; cout << "~Device "; }
};`,
    options: [
      "A. `~Device()` is executed, freeing `data`.",
      "B. `~Device()` is NEVER called because the object was never fully constructed; however, destructors for fully constructed members (`c1`) ARE called during Stack Unwinding.",
      "C. The program terminates immediately with `std::abort()`.",
      "D. All memory on the entire stack is leaked."
    ],
    correctIndex: 1,
    explanation: "**Explanation (Bẫy Ngoại Lệ Trong Constructor):**\n" +
      "In C++, an object is only considered constructed after its constructor completes successfully. If an exception is thrown inside the constructor, `~Device()` will NOT be called! Any raw pointer (`data`) allocated before the throw will leak unless wrapped in a smart pointer (`std::unique_ptr`). However, sub-objects like `c1` that finished constructing will have their destructors called during **Stack Unwinding**.\n" +
      "- *Vietnamese Note:* Nếu constructor ném ngoại lệ giữa chừng, destructor của đối tượng đó SẼ KHÔNG ĐƯỢC GỌI -> rò rỉ con trỏ thô `data` nếu không dùng Smart Pointer / RAII."
  },
  {
    id: "mcq_22",
    number: 22,
    chapter: "ch7",
    chapterName: "Chapter 7: Templates & Exceptions",
    difficulty: "hard",
    tags: ["Template Static Members", "Compilation"],
    question: "How are `static` data members handled in C++ Class Templates?",
    code: `template <typename T>
class Counter {
public:
    static int count;
};
template <typename T> int Counter<T>::count = 0;

int main() {
    Counter<int>::count = 5;
    Counter<double>::count = 10;
    cout << Counter<int>::count << " " << Counter<double>::count;
}`,
    options: [
      "A. 10 10 (all template instantiations share one single static variable).",
      "B. 5 10 (EACH distinct template type instantiation `Counter<int>`, `Counter<double>` gets its own independent static variable).",
      "C. Compilation Error: static members are not allowed in templates.",
      "D. 0 0"
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "Each distinct instantiation of a template class (such as `Counter<int>` vs `Counter<double>`) is a completely separate class type generated by the compiler. Therefore, each type has its own distinct static member instance in memory, printing `5 10`.\n" +
      "- *Vietnamese Note:* Mỗi kiểu dữ liệu cụ thể hóa template (`Counter<int>`, `Counter<double>`) là 1 lớp độc lập và có một bản sao biến `static` riêng biệt!"
  },
  {
    id: "mcq_23",
    number: 23,
    chapter: "ch7",
    chapterName: "Chapter 7: Templates & Exceptions",
    difficulty: "hard",
    tags: ["Google Expected Pattern", "Exception-less Error Handling", "Real Exam 2024-2025"],
    question: "In systems that avoid C++ exceptions (such as Google C++ Style Guide and Real Exam 2024-2025), how does the `Expected<T>` pattern represent success and failure?",
    code: `template <typename T>
struct Expected {
    bool success;
    string message;
    T data;
};`,
    options: [
      "A. It throws `std::runtime_error` when `success == false`.",
      "B. It wraps the result value `data` on success (`success = true`) or returns an error `message` on failure without throwing exceptions, enabling zero-cost predictable control flow.",
      "C. It converts all integer values to floating point numbers.",
      "D. It requires dynamic casting at runtime."
    ],
    correctIndex: 1,
    explanation: "**Explanation (Kiến Trúc Đề Thi 2024-2025):**\n" +
      "The `Expected<T>` structure (monadic result type, similar to `std::expected` in C++23) encapsulates both potential return data and error diagnostic messages. Callers inspect `result.success` instead of enclosing code in expensive `try-catch` blocks.\n" +
      "- *Vietnamese Note:* Cấu trúc `Expected<T>` (chuẩn Google C++ trong đề thi 2024-2025) đóng gói kết quả và thông báo lỗi mà không cần dùng `try-catch`."
  },
  {
    id: "mcq_24",
    number: 24,
    chapter: "ch7",
    chapterName: "Chapter 7: Templates & Exceptions",
    difficulty: "hard",
    tags: ["Catch by Reference", "Exception Slicing"],
    question: "Why should exceptions in C++ ALWAYS be caught by **const reference** (`catch (const std::exception& e)`) rather than by value (`catch (std::exception e)`)?",
    code: `try {
    throw CustomException("Database connection timeout");
} catch (std::exception e) { // Why is catching by value bad?
    cout << e.what();
}`,
    options: [
      "A. To prevent compilation errors.",
      "B. To avoid Object Slicing and unnecessary copy constructor overhead, preserving polymorphic `e.what()` behavior.",
      "C. Because C++ does not allow catching standard exceptions.",
      "D. To automatically retry the failed operation."
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "Catching by value causes **Object Slicing**: the `CustomException` is sliced down into a generic `std::exception`, destroying any custom members and resetting `what()` to the default base message. Catching by `const std::exception&` avoids copying and preserves polymorphism.\n" +
      "- *Vietnamese Note:* Luôn bắt ngoại lệ bằng tham chiếu (`const std::exception&`) để tránh cắt lớp đối tượng (Object Slicing) và giữ đúng đa hình của hàm `what()`."
  },
  {
    id: "mcq_25",
    number: 25,
    chapter: "ch7",
    chapterName: "Chapter 7: Templates & Exceptions",
    difficulty: "medium",
    tags: ["Template Specialization"],
    question: "What is **Full Template Specialization** in C++?",
    code: `template <typename T> class Printer { /* generic */ };
template <> class Printer<bool> { /* specialized for bool */ };`,
    options: [
      "A. Restricting a template to only accept primitive data types.",
      "B. Providing a custom, dedicated implementation of a template for a specific concrete type (e.g., `bool` or `char*`).",
      "C. Generating assembly code without using the compiler.",
      "D. Forcing template functions to be compiled as virtual methods."
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "Full Template Specialization (`template <> class ClassName<ConcreteType>`) allows developers to override the generic template logic with optimized or custom behavior specifically tailored for one data type (e.g. `std::vector<bool>` storing bits instead of bytes).\n" +
      "- *Vietnamese Note:* Chuyên biệt hóa toàn phần (Full Specialization) cho phép viết lại logic riêng biệt cho 1 kiểu dữ liệu cụ thể (như `bool`, `char*`)."
  },
  {
    id: "mcq_26",
    number: 26,
    chapter: "ch7",
    chapterName: "Chapter 7: Templates & Exceptions",
    difficulty: "hard",
    tags: ["catch(...)", "Catch Order"],
    question: "What is the consequence of placing `catch (...)` at the BEGINNING of a `try-catch` block before specific exception handlers?",
    code: `try {
    // some code
} catch (...) { // Placed FIRST!
    cout << "Catch all";
} catch (const invalid_argument& e) {
    cout << "Invalid argument";
}`,
    options: [
      "A. The compiler gives a warning/error because `catch (...)` captures all exceptions, making subsequent catch blocks unreachable dead code.",
      "B. The code compiles and prioritizes `invalid_argument` automatically.",
      "C. It creates a memory leak on the stack.",
      "D. It converts all exceptions to exit code 0."
    ],
    correctIndex: 0,
    explanation: "**Explanation:**\n" +
      "Exception handlers are evaluated in sequential order from top to bottom. Because `catch (...)` matches ANY exception type, placing it first causes all subsequent `catch` blocks to become unreachable, which modern C++ compilers flag as an error or warning.\n" +
      "- *Vietnamese Note:* `catch (...)` bắt tất cả mọi ngoại lệ, nên nếu đặt ở đầu sẽ làm cho các khối `catch` cụ thể phía sau không bao giờ được chạy tới."
  },
  {
    id: "mcq_27",
    number: 27,
    chapter: "ch7",
    chapterName: "Chapter 7: Templates & Exceptions",
    difficulty: "medium",
    tags: ["noexcept", "Move Semantics"],
    question: "Why should Move Constructors and Move Assignment Operators be marked with `noexcept` whenever possible?",
    code: `class Buffer {
public:
    Buffer(Buffer&& other) noexcept; // Why noexcept?
};`,
    options: [
      "A. To make the constructor execute asynchronously.",
      "B. To allow STL containers (like `std::vector`) to safely use move operations during reallocation instead of falling back to slow copies.",
      "C. To prevent the compiler from generating default destructors.",
      "D. To disable heap memory allocation."
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "When `std::vector` grows and reallocates memory, it requires strong exception safety. If an element's move constructor is not marked `noexcept`, `std::vector` cannot risk an exception during move and falls back to performing slow deep copies of all elements.\n" +
      "- *Vietnamese Note:* Đánh dấu `noexcept` giúp các container STL như `std::vector` tự tin di chuyển (move) đối tượng khi cấp phát lại bộ nhớ mà không phải copy chậm."
  },
  {
    id: "mcq_28",
    number: 28,
    chapter: "ch7",
    chapterName: "Chapter 7: Templates & Exceptions",
    difficulty: "medium",
    tags: ["Custom Exception", "std::exception", "what()"],
    question: "When creating a custom exception class inheriting from `std::exception`, which virtual method must be overridden to provide error descriptions?",
    code: `class MyException : public std::exception {
public:
    const char* what() const noexcept override {
        return "Custom Error Occurred";
    }
};`,
    options: [
      "A. `virtual string getMessage();`",
      "B. `virtual const char* what() const noexcept override;`",
      "C. `virtual void printError();`",
      "D. `virtual int getErrorCode();`"
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "The C++ standard exception base class `std::exception` declares `virtual const char* what() const noexcept;`. Overriding this method provides a descriptive C-string representing the error.\n" +
      "- *Vietnamese Note:* Kế thừa `std::exception` cần ghi đè phương thức `const char* what() const noexcept`."
  },
  {
    id: "mcq_29",
    number: 29,
    chapter: "ch7",
    chapterName: "Chapter 7: Templates & Exceptions",
    difficulty: "hard",
    tags: ["Template Compilation Model", "Header Files"],
    question: "Why are C++ template class definitions and their method implementations almost always placed together in `.h` header files rather than split into `.cpp` files?",
    code: null,
    options: [
      "A. Because C++ compilers do not support `.cpp` files for object-oriented programming.",
      "B. Because the compiler needs the complete template definition at the call site to instantiate code for the specific requested type `T` during compilation.",
      "C. To prevent other developers from reading the code.",
      "D. To reduce heap memory consumption at runtime."
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "Templates are not compiled into machine code until instantiated with concrete types (e.g. `Vector<int>`). If the implementation is in a `.cpp` file, other translation units including `vector.h` cannot see the implementation body, leading to unresolved external symbol linker errors.\n" +
      "- *Vietnamese Note:* Template chỉ sinh mã khi có kiểu dữ liệu cụ thể, nên trình biên dịch cần nhìn thấy toàn bộ code trong file header `.h` tại nơi sử dụng để sinh mã."
  },
  {
    id: "mcq_30",
    number: 30,
    chapter: "ch7",
    chapterName: "Chapter 7: Templates & Exceptions",
    difficulty: "hard",
    tags: ["Rethrowing Exception", "throw vs throw e"],
    question: "What is the difference between `throw;` (empty throw) and `throw e;` inside a `catch (const BaseException& e)` block?",
    code: `try {
    throw DerivedException();
} catch (const BaseException& e) {
    // Choice 1: throw;
    // Choice 2: throw e;
}`,
    options: [
      "A. `throw;` re-throws the original polymorphic exception object (`DerivedException`), whereas `throw e;` slices it down to `BaseException`.",
      "B. `throw;` restarts the entire program from `main()`.",
      "C. `throw e;` is faster because it deletes the previous exception.",
      "D. There is no difference."
    ],
    correctIndex: 0,
    explanation: "**Explanation (Bẫy Re-throw Ngoại Lệ):**\n" +
      "`throw;` re-throws the exact active exception, preserving its dynamic type (`DerivedException`). In contrast, `throw e;` constructs a new exception object by copying `e`, causing **Object Slicing** if `e` was caught via a base class reference.\n" +
      "- *Vietnamese Note:* Lệnh `throw;` ném tiếp đối tượng ngoại lệ gốc (giữ nguyên kiểu con `DerivedException`); còn `throw e;` tạo bản sao mới và bị cắt lớp về `BaseException`."
  },

  // =========================================================================
  // CHAPTER 8 & DESIGN PATTERNS: STL & ENTERPRISE PATTERNS (Q31 - Q40)
  // =========================================================================
  {
    id: "mcq_31",
    number: 31,
    chapter: "ch8",
    chapterName: "Chapter 8 & Design Patterns: STL & Architecture",
    difficulty: "hard",
    tags: ["Singleton Pattern", "Meyers Singleton", "Thread Safety"],
    question: "In modern C++, why is **Meyers' Singleton** (`static Singleton& getInstance() { static Singleton instance; return instance; }`) preferred over pointer-based Singleton?",
    code: `class Singleton {
public:
    static Singleton& getInstance() {
        static Singleton instance; // Meyers' Singleton
        return instance;
    }
private:
    Singleton() = default;
};`,
    options: [
      "A. Because C++11 guarantees thread-safe initialization of function-local static variables with zero manual locks, and automatically handles destruction.",
      "B. Because it allocates memory on the CPU register.",
      "C. Because it allows multiple instances to be created concurrently.",
      "D. Because it disables inheritance."
    ],
    correctIndex: 0,
    explanation: "**Explanation:**\n" +
      "Since C++11 (§6.7.4), local static variable initialization is guaranteed by the language standard to be thread-safe without needing mutex locks. Furthermore, it automatically calls the destructor upon program termination, preventing memory leaks associated with raw pointer singletons.\n" +
      "- *Vietnamese Note:* Meyers' Singleton dùng biến `static` cục bộ trong hàm, được C++11 đảm bảo an toàn đa luồng (Thread-safe) tự động mà không cần dùng Mutex lock."
  },
  {
    id: "mcq_32",
    number: 32,
    chapter: "ch8",
    chapterName: "Chapter 8 & Design Patterns: STL & Architecture",
    difficulty: "hard",
    tags: ["Iterator Pattern", "Encapsulation", "FIT-HCMUS Pattern"],
    question: "What is the primary motivation for implementing the **Iterator Pattern** in a custom Collection class?",
    code: null,
    options: [
      "A. To convert all data into linked lists.",
      "B. To provide a uniform sequential access mechanism to elements of an aggregate object without exposing its underlying internal data structure (array, tree, hash table).",
      "C. To prevent memory allocation on the heap.",
      "D. To sort the elements in ascending order automatically."
    ],
    correctIndex: 1,
    explanation: "**Explanation (Mẫu Iterator Chuẩn Slide Tuần 8):**\n" +
      "The Iterator Pattern decouples algorithms from container representations. Clients traverse elements using a uniform interface (`hasNext()`, `next()`, or `operator++`, `operator*`) without needing to know whether the container is backed by a dynamic array, a binary search tree, or a linked list.\n" +
      "- *Vietnamese Note:* Mẫu Iterator cho phép duyệt tuần tự các phần tử của một tập hợp mà không làm lộ cấu trúc dữ liệu lưu trữ bên trong."
  },
  {
    id: "mcq_33",
    number: 33,
    chapter: "ch8",
    chapterName: "Chapter 8 & Design Patterns: STL & Architecture",
    difficulty: "hard",
    tags: ["Factory Method Pattern", "Open/Closed Principle"],
    question: "How does the **Factory Method Pattern** adhere to the **Open/Closed Principle (OCP)** when adding a new product type?",
    code: `class NotificationFactory {
public:
    virtual unique_ptr<INotification> createNotification() = 0;
};`,
    options: [
      "A. By requiring modification of existing switch-case statements in main().",
      "B. By allowing new product types to be introduced by simply creating a new concrete creator subclass, without modifying existing client or factory code.",
      "C. By making all class attributes public.",
      "D. By deleting old product classes from the build."
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "Factory Method defines an interface for creating an object, but lets subclasses decide which class to instantiate. To add a new Notification type (e.g. `SlackNotification`), we create `SlackNotificationFactory` without touching or risking bugs in existing `SMS` or `Email` factories.\n" +
      "- *Vietnamese Note:* Factory Method tuân thủ nguyên lý Đóng/Mở (OCP): Khi thêm loại sản phẩm mới, chỉ cần tạo thêm class Factory mới mà không cần sửa code cũ."
  },
  {
    id: "mcq_34",
    number: 34,
    chapter: "ch8",
    chapterName: "Chapter 8 & Design Patterns: STL & Architecture",
    difficulty: "hard",
    tags: ["Iterator Invalidation", "std::vector Trap", "STL"],
    question: "What happens to existing iterators and pointers to elements of a `std::vector` when a `push_back()` triggers a capacity reallocation?",
    code: `vector<int> v = {1, 2, 3};
auto it = v.begin();
v.push_back(4); // Capacity exceeded!
cout << *it; // What happens here?`,
    options: [
      "A. `it` automatically updates to point to the new array location.",
      "B. `it` is INVALIDATED (points to deallocated memory), causing Undefined Behavior when dereferenced.",
      "C. The compiler throws a `vector_realloc_error`.",
      "D. `*it` always prints 0."
    ],
    correctIndex: 1,
    explanation: "**Explanation (Bẫy Iterator Invalidation Trong STL):**\n" +
      "When a `vector` exceeds its capacity, it allocates a new larger contiguous memory block, copies existing elements over, and deallocates the old memory. All existing iterators, pointers, and references pointing to elements in the old block become **invalidated (dangling)**.\n" +
      "- *Vietnamese Note:* Khi `std::vector` tăng dung lượng (reallocation), mảng cũ bị hủy nên tất cả iterator trỏ vào mảng cũ đều bị vô hiệu hóa (Invalidated) -> truy xuất sẽ crash!"
  },
  {
    id: "mcq_35",
    number: 35,
    chapter: "ch8",
    chapterName: "Chapter 8 & Design Patterns: STL & Architecture",
    difficulty: "medium",
    tags: ["std::map vs std::unordered_map", "Data Structures", "Big-O"],
    question: "What is the underlying data structure and search time complexity difference between `std::map` and `std::unordered_map` in C++?",
    code: null,
    options: [
      "A. `std::map` uses Hash Table ($O(1)$); `std::unordered_map` uses Red-Black Tree ($O(\\log n)$).",
      "B. `std::map` uses Red-Black Tree ($O(\\log n)$ ordered); `std::unordered_map` uses Hash Table ($O(1)$ average unordered).",
      "C. Both use arrays with $O(n)$ search time.",
      "D. `std::map` does not allow duplicate keys, while `std::unordered_map` allows infinite duplicates."
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "`std::map` is implemented as a Self-Balancing Binary Search Tree (Red-Black Tree), keeping keys strictly ordered with $O(\\log n)$ search/insert/delete. `std::unordered_map` is implemented as a Hash Table, providing $O(1)$ average time complexity but without any key ordering.\n" +
      "- *Vietnamese Note:* `std::map` dùng cây đỏ đen (Red-Black Tree, tìm kiếm $O(\\log n)$ có thứ tự); `std::unordered_map` dùng bảng băm (Hash Table, $O(1)$ không thứ tự)."
  },
  {
    id: "mcq_36",
    number: 36,
    chapter: "ch8",
    chapterName: "Chapter 8 & Design Patterns: STL & Architecture",
    difficulty: "hard",
    tags: ["std::unique_ptr", "Ownership", "Move Semantics"],
    question: "Why does `std::unique_ptr` prohibit copy construction (`std::unique_ptr<T> p2 = p1;` is a compile error) but permit move construction (`std::unique_ptr<T> p2 = std::move(p1);`)?",
    code: `unique_ptr<int> p1 = make_unique<int>(100);
// unique_ptr<int> p2 = p1;            // ERROR
unique_ptr<int> p2 = std::move(p1);  // OK`,
    options: [
      "A. To enforce Exclusive Ownership semantics, ensuring exactly one pointer owns the heap resource and avoids double-free errors.",
      "B. Because smart pointers cannot store integer values.",
      "C. To prevent pointers from accessing private members.",
      "D. To force the compiler to use garbage collection."
    ],
    correctIndex: 0,
    explanation: "**Explanation:**\n" +
      "`std::unique_ptr` represents unique, exclusive ownership. If copying were allowed, two `unique_ptr` instances would own the same address, causing a double-free crash when both destructors run. Moving transfers ownership from `p1` to `p2` and sets `p1` to `nullptr` safely.\n" +
      "- *Vietnamese Note:* `std::unique_ptr` đại diện cho quyền sở hữu độc quyền (Exclusive Ownership) -> cấm sao chép để tránh lỗi giải phóng bộ nhớ 2 lần (Double Free)."
  },
  {
    id: "mcq_37",
    number: 37,
    chapter: "ch8",
    chapterName: "Chapter 8 & Design Patterns: STL & Architecture",
    difficulty: "medium",
    tags: ["Strategy Pattern", "Algorithm Encapsulation"],
    question: "Which Design Pattern should be used when you need to switch sorting or payment algorithms dynamically at runtime without modifying client classes?",
    code: `class PaymentContext {
    IPaymentStrategy* strategy;
public:
    void setStrategy(IPaymentStrategy* s) { strategy = s; }
    void pay(double amount) { strategy->pay(amount); }
};`,
    options: [
      "A. Strategy Pattern",
      "B. Singleton Pattern",
      "C. Prototype Pattern",
      "D. Adapter Pattern"
    ],
    correctIndex: 0,
    explanation: "**Explanation:**\n" +
      "The **Strategy Pattern** defines a family of algorithms, encapsulates each one into a separate class conforming to a common interface, and makes them interchangeable at runtime inside a Context class.\n" +
      "- *Vietnamese Note:* Strategy Pattern đóng gói các thuật toán riêng biệt và cho phép hoán đổi linh hoạt tại thời điểm chạy (runtime)."
  },
  {
    id: "mcq_38",
    number: 38,
    chapter: "ch8",
    chapterName: "Chapter 8 & Design Patterns: STL & Architecture",
    difficulty: "hard",
    tags: ["std::shared_ptr", "Circular Reference", "std::weak_ptr"],
    question: "What problem arises when two objects hold `std::shared_ptr` pointing to each other (Circular Reference), and how is it resolved?",
    code: `struct Node {
    shared_ptr<Node> neighbor; // Circular dependency!
};`,
    options: [
      "A. Memory leak because the reference count never drops to 0; resolved by breaking the cycle with `std::weak_ptr`.",
      "B. Stack overflow at compile time; resolved by using raw pointers.",
      "C. Deadlock in the operating system.",
      "D. Segmentation fault upon creation."
    ],
    correctIndex: 0,
    explanation: "**Explanation:**\n" +
      "When two objects reference each other via `std::shared_ptr`, their reference counts remain at least 1 even when all external references are lost. Destructors are never called, causing a permanent memory leak. Replacing one of the references with `std::weak_ptr` (a non-owning observer) resolves the cycle.\n" +
      "- *Vietnamese Note:* Tham chiếu vòng (Circular Reference) giữa các `std::shared_ptr` khiến biến đếm không bao giờ về 0 -> gây rò rỉ bộ nhớ; khắc phục bằng cách dùng `std::weak_ptr`."
  },
  {
    id: "mcq_39",
    number: 39,
    chapter: "ch8",
    chapterName: "Chapter 8 & Design Patterns: STL & Architecture",
    difficulty: "medium",
    tags: ["STL Algorithms", "std::sort", "Custom Comparator"],
    question: "When passing a custom comparator to `std::sort`, what mathematical property must the comparison function satisfy to avoid Undefined Behavior?",
    code: `bool comp(const Item& a, const Item& b) {
    return a.score < b.score; // Strict Weak Ordering
}`,
    options: [
      "A. It must return `true` when `a == b`.",
      "B. It must implement **Strict Weak Ordering** (e.g., `comp(a, a)` MUST always return `false`).",
      "C. It must take parameters by non-const reference.",
      "D. It must be declared inside the `std` namespace."
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "The C++ standard requires comparators passed to `std::sort`, `std::map`, or `std::set` to satisfy **Strict Weak Ordering**. Specifically, `comp(a, a)` must return `false` (irreflexive). If you write `a <= b` instead of `a < b`, `std::sort` can access out-of-bounds memory and crash with a segmentation fault.\n" +
      "- *Vietnamese Note:* Hàm so sánh trong `std::sort` bắt buộc phải thỏa mãn Strict Weak Ordering (`comp(a, a)` phải luôn trả về `false`). Viết nhầm `<=` thay vì `<` sẽ khiến sort bị crash!"
  },
  {
    id: "mcq_40",
    number: 40,
    chapter: "ch8",
    chapterName: "Chapter 8 & Design Patterns: STL & Architecture",
    difficulty: "hard",
    tags: ["Validator Pattern", "Clean Architecture", "Real Exam 2024-2025"],
    question: "In enterprise software design (such as Question 4 in the 2024-2025 Exam), why should input validation rules (format, range, prime check) be decomposed into separate `IValidator` classes instead of being written in one large function?",
    code: `class IValidator {
public:
    virtual Expected<int> validate(const string& rawInput, int parsedVal) = 0;
};`,
    options: [
      "A. To adhere to the Single Responsibility Principle (SRP) and Open/Closed Principle (OCP), making each rule independently testable, reusable, and extensible.",
      "B. Because C++ compilers limit function length to 50 lines.",
      "C. To automatically speed up string parsing by 100%.",
      "D. To eliminate the need for classes."
    ],
    correctIndex: 0,
    explanation: "**Explanation (Kiến Trúc Đề Thi Thật 2024-2025):**\n" +
      "Decomposing validation into separate classes conforming to `IValidator` ensures Single Responsibility (each validator tests one distinct concern) and Open/Closed Principle (new validation rules like `EvenNumberValidator` can be added without modifying existing UseCase logic).\n" +
      "- *Vietnamese Note:* Tách các validator thành các lớp độc lập tuân thủ giao diện `IValidator` giúp tuân thủ nguyên lý Đơn trách nhiệm (SRP) và Đóng/Mở (OCP), dễ dàng mở rộng và viết unit test."
  },

  // =========================================================================
  // CHAPTERS 2, 3, 4: CORE OOP, MEMORY, STATIC & RULE OF THREE (Q41 - Q50)
  // =========================================================================
  {
    id: "mcq_41",
    number: 41,
    chapter: "ch2_4",
    chapterName: "Chapters 2-4: Core OOP, Memory & Static",
    difficulty: "hard",
    tags: ["Static Data Members", "Memory Segment", "Real Exam 2024-2025"],
    question: "According to Question 1 of the 2024-2025 Final Exam, where are `static data members` allocated in memory, and where MUST they be defined?",
    code: `class Student {
public:
    int id;           // Non-static
    static int count; // Static
};
// Where must count be defined?`,
    options: [
      "A. Allocated on the stack inside `main()`; defined inside the class constructor.",
      "B. Allocated in the **Data Segment (Static/Global memory)**; MUST be explicitly defined and initialized **outside the class** at file scope (`int Student::count = 0;`).",
      "C. Allocated on the heap; defined with `new int` in `main()`.",
      "D. Allocated inside each object instance; defined in `main()`."
    ],
    correctIndex: 1,
    explanation: "**Explanation (Câu 1 Đề Thi Thật 2024-2025):**\n" +
      "Unlike non-static data members which reside inside each object instance (on stack or heap), static data members are allocated once in the static **Data Segment** and shared across all instances. C++ requires declaring them inside the class and providing a separate definition in file scope: `int Student::count = 0;`.\n" +
      "- *Vietnamese Note:* Câu 1 đề thi thật 2024-2025: Biến static lưu trong Data Segment, tồn tại suốt chương trình và bắt buộc phải định nghĩa ngoài class: `int Student::count = 0;`."
  },
  {
    id: "mcq_42",
    number: 42,
    chapter: "ch2_4",
    chapterName: "Chapters 2-4: Core OOP, Memory & Static",
    difficulty: "hard",
    tags: ["Member Initializer List", "Initialization Order Trap"],
    question: "In what exact order are class member variables initialized in C++?",
    code: `#include <iostream>
using namespace std;

class Demo {
    int b;
    int a;
public:
    Demo(int val) : a(val), b(a + 5) { // Notice initializer list order!
        cout << a << ":" << b;
    }
};
int main() {
    Demo d(10);
    return 0;
}`,
    options: [
      "A. `a` is initialized first (10), then `b` is initialized (15), printing `10:15`.",
      "B. `b` is initialized FIRST because it is **declared first in the class definition**, using uninitialized `a` (garbage memory), causing a subtle bug!",
      "C. The compiler automatically reorders variable declarations in memory.",
      "D. Compilation Error: `a` must be declared before `b`."
    ],
    correctIndex: 1,
    explanation: "**Explanation (Bẫy Thứ Tự Khởi Tạo Biến Thành Viên):**\n" +
      "In C++, member variables are initialized in the **order of their declaration in the class definition**, NOT the order they appear in the member initializer list! Because `int b;` is declared before `int a;`, `b` is initialized with `a + 5` before `a` has received its value (reading garbage data).\n" +
      "- *Vietnamese Note:* Biến thành viên luôn được khởi tạo theo thứ tự khai báo trong class (`b` trước `a`), bất chấp thứ tự viết trong initializer list -> gây lỗi đọc rác!"
  },
  {
    id: "mcq_43",
    number: 43,
    chapter: "ch2_4",
    chapterName: "Chapters 2-4: Core OOP, Memory & Static",
    difficulty: "hard",
    tags: ["Rule of Three", "Copy Assignment Operator", "Self-assignment"],
    question: "In the **Rule of Three**, why MUST the Copy Assignment Operator `operator=` check for self-assignment (`if (this == &other) return *this;`)?",
    code: `MyString& MyString::operator=(const MyString& other) {
    if (this == &other) return *this; // Why is this check critical?
    delete[] buffer;
    length = other.length;
    buffer = new char[length + 1];
    strcpy(buffer, other.buffer);
    return *this;
}`,
    options: [
      "A. To prevent compiler optimization warnings.",
      "B. If self-assigning (`a = a;`), deleting `buffer` without checking would destroy the very data you intend to copy from `other.buffer`, causing read-after-free and crash!",
      "C. To prevent memory allocation on the stack.",
      "D. To allow chaining like `a = b = c;`."
    ],
    correctIndex: 1,
    explanation: "**Explanation (Bản Chất Rule of Three):**\n" +
      "If you execute `a = a;` without the self-assignment check, `delete[] buffer;` deallocates `this->buffer`, which is the SAME memory as `other.buffer`. Subsequent reading from `other.buffer` reads deallocated garbage memory, causing corrupted data or a segmentation fault.\n" +
      "- *Vietnamese Note:* Trong `operator=`, nếu không kiểm tra tự gán (`this == &other`), lệnh `delete[] buffer` sẽ xóa luôn vùng nhớ của đối tượng nguồn -> khi copy dữ liệu sẽ bị crash!"
  },
  {
    id: "mcq_44",
    number: 44,
    chapter: "ch2_4",
    chapterName: "Chapters 2-4: Core OOP, Memory & Static",
    difficulty: "medium",
    tags: ["Prefix vs Postfix ++", "Operator Overloading"],
    question: "What is the distinction in signature and return type between Prefix `++x` and Postfix `x++` operator overloading in C++?",
    code: null,
    options: [
      "A. Prefix: `Type& operator++();` (returns by reference); Postfix: `Type operator++(int);` (takes dummy `int` parameter, returns by value).",
      "B. Prefix takes `int` parameter; Postfix takes no parameters.",
      "C. Both return `void`.",
      "D. Prefix cannot be overloaded."
    ],
    correctIndex: 0,
    explanation: "**Explanation:**\n" +
      "Prefix `++obj` increments first and returns `Type&` (reference to modified self). Postfix `obj++` must capture the old state, increment self, and return the old state by value `Type`, distinguished by a dummy `int` parameter in its signature.\n" +
      "- *Vietnamese Note:* Tiền tố `++x` không có tham số và trả về tham chiếu `Type&`; Hậu tố `x++` có tham số giả `(int)` và trả về bản sao giá trị cũ `Type`."
  },
  {
    id: "mcq_45",
    number: 45,
    chapter: "ch2_4",
    chapterName: "Chapters 2-4: Core OOP, Memory & Static",
    difficulty: "hard",
    tags: ["Most Vexing Parse", "Function Declaration Trap"],
    question: "What does the line `Tracker t();` actually do in C++?",
    code: `class Tracker { public: Tracker() {} };
int main() {
    Tracker t(); // What does this line do?
    return 0;
}`,
    options: [
      "A. It instantiates an object `t` on the stack using default constructor.",
      "B. It is interpreted as a **function declaration** named `t` that takes no arguments and returns a `Tracker` object (Most Vexing Parse).",
      "C. It allocates a `Tracker` object on the heap.",
      "D. It generates a compilation syntax error."
    ],
    correctIndex: 1,
    explanation: "**Explanation (Bẫy 1 Trong Sổ Tay - Most Vexing Parse):**\n" +
      "According to C++ grammar disambiguation rules, anything that can be parsed as a declaration is parsed as a declaration. `Tracker t();` declares a function named `t` taking 0 parameters and returning `Tracker`. To instantiate an object with the default constructor, write `Tracker t;` (without parentheses).\n" +
      "- *Vietnamese Note:* `Tracker t();` là khai báo HÀM `t()` chứ KHÔNG tạo đối tượng (Bẫy Most Vexing Parse). Viết đúng là `Tracker t;`."
  },
  {
    id: "mcq_46",
    number: 46,
    chapter: "ch2_4",
    chapterName: "Chapters 2-4: Core OOP, Memory & Static",
    difficulty: "medium",
    tags: ["const member functions", "this pointer"],
    question: "What type does the `this` pointer have inside a `const` member function `void Item::display() const`?",
    code: `class Item {
public:
    void display() const {
        // What is the type of 'this'?
    }
};`,
    options: [
      "A. `Item*`",
      "B. `const Item* const` (a constant pointer to a constant Item)",
      "C. `const Item&`",
      "D. `void*`"
    ],
    correctIndex: 1,
    explanation: "**Explanation:**\n" +
      "Inside a const member function, `this` is of type `const Item* const`. You cannot modify any non-mutable member variables, nor call any non-const member functions through `this`.\n" +
      "- *Vietnamese Note:* Trong hàm hằng `const`, con trỏ `this` có kiểu `const Item* const` -> ngăn chặn mọi hành vi thay đổi thuộc tính của đối tượng."
  },
  {
    id: "mcq_47",
    number: 47,
    chapter: "ch2_4",
    chapterName: "Chapters 2-4: Core OOP, Memory & Static",
    difficulty: "hard",
    tags: ["delete vs delete[]", "Undefined Behavior"],
    question: "What happens if an array allocated with `int* arr = new int[50];` is deallocated using `delete arr;` instead of `delete[] arr;`?",
    code: `int* arr = new int[50];
delete arr; // Notice missing []`,
    options: [
      "A. It safely deletes all 50 integers.",
      "B. It causes **Undefined Behavior** (heap memory corruption and missed destructors for non-primitive types).",
      "C. The compiler automatically corrects it to `delete[] arr`.",
      "D. It only deletes the first byte."
    ],
    correctIndex: 1,
    explanation: "**Explanation (Bẫy 3 Trong Sổ Tay - delete vs delete[]):**\n" +
      "Mismatching `new[]` with scalar `delete` is Undefined Behavior. For classes with destructors, `delete` only calls the destructor of the first element and corrupts heap bookkeeping metadata, leading to memory leaks and application crashes.\n" +
      "- *Vietnamese Note:* Dùng `new[]` bắt buộc phải giải phóng bằng `delete[]`. Dùng `delete` thường là Undefined Behavior và làm hỏng bảng quản lý heap."
  },
  {
    id: "mcq_48",
    number: 48,
    chapter: "ch2_4",
    chapterName: "Chapters 2-4: Core OOP, Memory & Static",
    difficulty: "medium",
    tags: ["mutable keyword", "const correctness"],
    question: "What is the purpose of the `mutable` keyword on a class member variable in C++?",
    code: `class Cache {
    mutable int accessCount = 0;
public:
    int getData() const {
        accessCount++; // Allowed because of mutable!
        return 42;
    }
};`,
    options: [
      "A. It allows the variable to be modified even inside `const` member functions.",
      "B. It makes the variable accessible from any package.",
      "C. It prevents multi-threaded race conditions.",
      "D. It converts the variable to a static member."
    ],
    correctIndex: 0,
    explanation: "**Explanation:**\n" +
      "The `mutable` specifier permits a member variable to be modified even within `const` member functions. It is commonly used for mutexes, caching, and access counters that do not affect the logical constness of the object.\n" +
      "- *Vietnamese Note:* Từ khóa `mutable` cho phép biến thành viên có thể bị thay đổi giá trị ngay cả trong các hàm hằng `const`."
  },
  {
    id: "mcq_49",
    number: 49,
    chapter: "ch2_4",
    chapterName: "Chapters 2-4: Core OOP, Memory & Static",
    difficulty: "hard",
    tags: ["Operator Overloading", "Comparison Operators", "Real Exam 2024-2025"],
    question: "According to Question 3 of the 2024-2025 Exam, when implementing 6 comparison operators (`==`, `!=`, `<`, `<=`, `>`, `>=`) for a class based on a computed score (`getPerformanceScore()`), which design practice is most maintainable?",
    code: `class Computer {
    float getPerformanceScore() const;
    // How should comparison operators be implemented?
};`,
    options: [
      "A. Implement `operator==` and `operator<` directly, and express all other 4 operators (`!=`, `<=`, `>`, `>=`) in terms of `==` and `<`.",
      "B. Copy-paste the entire multiplication formula in all 6 operator methods.",
      "C. Use dynamic casting inside each operator.",
      "D. Overload operators as private member functions."
    ],
    correctIndex: 0,
    explanation: "**Explanation (Thiết Kế Toán Tử Câu 3 Đề Thi 2024-2025):**\n" +
      "The standard C++ idiom for comparison operators is to implement `==` and `<`, and derive `!=` as `!(*this == other)`, `>` as `other < *this`, `<=` as `!(other < *this)`, and `>=` as `!(*this < other)`. This eliminates duplicated logic and guarantees consistent ordering semantics.\n" +
      "- *Vietnamese Note:* Chuẩn thiết kế toán tử so sánh: Cài đặt hàm `==` và `<`, sau đó định nghĩa 4 toán tử còn lại (`!=`, `<=`, `>`, `>=`) thông qua `==` và `<` để tránh trùng lặp code."
  },
  {
    id: "mcq_50",
    number: 50,
    chapter: "ch2_4",
    chapterName: "Chapters 2-4: Core OOP, Memory & Static",
    difficulty: "hard",
    tags: ["Explicit Constructor", "Implicit Conversion Trap"],
    question: "Why should single-argument constructors generally be declared with the `explicit` keyword in C++?",
    code: `class Array {
public:
    explicit Array(int size); // Why explicit?
};
void process(Array a);
// process(50); // What does explicit prevent here?`,
    options: [
      "A. To prevent the compiler from performing unwanted implicit type conversions (e.g. accidentally converting integer `50` into an `Array` of size 50 when calling `process(50)`).",
      "B. To make the constructor public.",
      "C. To prevent memory allocation.",
      "D. To enable operator overloading."
    ],
    correctIndex: 0,
    explanation: "**Explanation:**\n" +
      "Without `explicit`, any single-argument constructor acts as an implicit conversion operator. A call like `process(50)` would silently construct a temporary `Array(50)` and pass it, leading to subtle bugs. The `explicit` keyword forces callers to write `process(Array(50))` explicitly.\n" +
      "- *Vietnamese Note:* Từ khóa `explicit` ngăn chặn compiler tự động ép kiểu ngầm định nguy hiểm (như tự biến số nguyên `50` thành mảng `Array(50)`)."
  }
];
