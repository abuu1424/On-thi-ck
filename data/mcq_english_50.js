/**
 * 50 ENGLISH MULTIPLE CHOICE QUESTIONS (MCQs) - ADVANCED OOP IN C++
 * Standard Curriculum for FIT-HCMUS Computer Science
 * Breakdown:
 *  - Chapter 5 (Inheritance & Polymorphism): 12 Questions (Q1 - Q12)
 *  - Chapter 6 (Relationships & File I/O): 8 Questions (Q13 - Q20)
 *  - Chapter 7 (Templates & Exceptions): 10 Questions (Q21 - Q30)
 *  - Chapter 8 & Design Patterns (STL & Patterns): 10 Questions (Q31 - Q40)
 *  - Chapters 2, 3, 4 (Core OOP, Memory, Rule of Three, Static): 10 Questions (Q41 - Q50)
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
    difficulty: "medium",
    tags: ["Virtual Functions", "Dynamic Binding", "Polymorphism"],
    question: "Consider the following C++ code. What will be the output printed to the console?",
    code: `#include <iostream>
using namespace std;

class Base {
public:
    virtual void show() { cout << "Base::show "; }
    void print() { cout << "Base::print "; }
};

class Derived : public Base {
public:
    void show() override { cout << "Derived::show "; }
    void print() { cout << "Derived::print "; }
};

int main() {
    Base* b = new Derived();
    b->show();
    b->print();
    delete b;
    return 0;
}`,
    options: [
      "A. Base::show Base::print",
      "B. Derived::show Derived::print",
      "C. Derived::show Base::print",
      "D. Base::show Derived::print"
    ],
    correctIndex: 2,
    explanation: `**Explanation:**
- \`b->show()\` invokes **Dynamic Binding** (Late Binding) because \`show()\` is declared as \`virtual\` in \`Base\`. At runtime, C++ resolves the call through the virtual method table (vtable) to the actual object type (\`Derived\`), printing \`Derived::show \`.
- \`b->print()\` uses **Static Binding** (Early Binding) because \`print()\` is non-virtual. The compiler decides which function to call based solely on the static type of the pointer (\`Base*\`), printing \`Base::print \`.
- *Vietnamese Note:* Hàm \`virtual\` sử dụng dynamic binding (gọi hàm của lớp thực tế \`Derived\`), còn hàm non-virtual sử dụng static binding (gọi theo kiểu con trỏ \`Base*\`).`
  },
  {
    id: "mcq_2",
    number: 2,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "hard",
    tags: ["Virtual Destructor", "Memory Leak", "Destruction Order"],
    question: "Why should a base class destructor almost always be declared as `virtual` when the class is intended to be used polymorphically?",
    code: `Base* ptr = new Derived();
delete ptr; // What happens if ~Base() is NOT virtual?`,
    options: [
      "A. To allow private members of the Derived class to be accessed inside main().",
      "B. To ensure that the Derived destructor is called first before the Base destructor, preventing memory leaks.",
      "C. To prevent the compiler from generating default copy constructors.",
      "D. To automatically deallocate stack variables allocated inside member methods."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
When deleting an object through a base class pointer (\`Base* ptr = new Derived(); delete ptr;\`), if \`~Base()\` is not virtual, the compiler performs static binding and only invokes \`~Base()\`. The \`Derived\` destructor is bypassed completely, causing resources and heap memory allocated within \`Derived\` to leak. Declaring \`virtual ~Base()\` ensures that destruction starts at \`~Derived()\` and cascades up to \`~Base()\`.
- *Vietnamese Note:* Nếu destructor lớp cha không có \`virtual\`, lệnh \`delete ptr\` qua con trỏ lớp cha chỉ gọi destructor của \`Base\`, bỏ qua \`Derived\` -> gây Memory Leak.`
  },
  {
    id: "mcq_3",
    number: 3,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "easy",
    tags: ["Abstract Class", "Pure Virtual Function"],
    question: "What makes a C++ class an **Abstract Base Class**?",
    code: null,
    options: [
      "A. Having all member functions declared as `protected`.",
      "B. Inheriting from more than two classes simultaneously.",
      "C. Containing at least one pure virtual function (e.g., `virtual void f() = 0;`).",
      "D. Having a private constructor and no public methods."
    ],
    correctIndex: 2,
    explanation: `**Explanation:**
In C++, an abstract class is a class that contains at least one **pure virtual function** (syntax: \`virtual ReturnType funcName(params) = 0;\`). You cannot instantiate objects directly from an abstract class; derived classes must implement all pure virtual functions to become concrete classes.`
  },
  {
    id: "mcq_4",
    number: 4,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "medium",
    tags: ["override Keyword", "C++11", "Compilation Safety"],
    question: "In C++11 and later, what is the primary purpose of the `override` specifier on a member function?",
    code: `class Base {
    virtual void calculate(int x) const;
};
class Derived : public Base {
    void calculate(int x) const override; // Purpose?
};`,
    options: [
      "A. It forces the function to execute in a separate thread asynchronously.",
      "B. It makes the function accessible from outside the class regardless of access specifiers.",
      "C. It instructs the compiler to verify that the function actually overrides a virtual function with the exact same signature in a base class.",
      "D. It converts the function into an inline function automatically."
    ],
    correctIndex: 2,
    explanation: `**Explanation:**
The \`override\` specifier is a compile-time check introduced in C++11. If there is a typo in the method name, parameter types, or \`const\`-qualification (which would otherwise silently create an overload instead of an override), the compiler immediately raises a compilation error.`
  },
  {
    id: "mcq_5",
    number: 5,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "hard",
    tags: ["Object Slicing", "Pass-by-value", "Copying"],
    question: "What phenomenon occurs in the following code snippet?",
    code: `class Base {
public:
    virtual void identify() { cout << "Base"; }
};
class Derived : public Base {
    int extraData;
public:
    void identify() override { cout << "Derived"; }
};

void test(Base obj) { // Passed by VALUE
    obj.identify();
}

int main() {
    Derived d;
    test(d);
    return 0;
}`,
    options: [
      "A. Compilation error: cannot pass a Derived object to a Base parameter.",
      "B. Runtime crash due to invalid memory dereferencing.",
      "C. Object Slicing occurs: only the Base portion of 'd' is copied into 'obj', and 'Base' is printed.",
      "D. Polymorphism works correctly and 'Derived' is printed."
    ],
    correctIndex: 2,
    explanation: `**Explanation:**
**Object Slicing** happens when a derived class object is assigned or passed by value to a base class object (\`void test(Base obj)\`). The derived-specific members (\`extraData\`) and the derived vptr are sliced off; the copy is strictly of type \`Base\`. Thus, dynamic polymorphism is lost and \`Base::identify()\` is invoked. To preserve polymorphism, pass by reference (\`const Base&\`) or by pointer (\`Base*\`).`
  },
  {
    id: "mcq_6",
    number: 6,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "medium",
    tags: ["final Keyword", "C++11", "Inheritance Control"],
    question: "What is the effect of applying the `final` specifier to a class or a virtual method in C++11?",
    code: `class Base {
    virtual void func() final;
};
class Derived final : public Base {
};`,
    options: [
      "A. It marks the class/method as deprecated.",
      "B. It prevents further overriding of \`func()\` in subclasses, and prevents other classes from inheriting from \`Derived\`.",
      "C. It makes the class immutable and all its members constant.",
      "D. It requires the class to be instantiated only once (Singleton)."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
In C++11:
1. When applied to a virtual method (\`virtual void func() final;\`), it prohibits any derived class from overriding \`func()\`.
2. When applied to a class (\`class Derived final\`), it forbids any other class from inheriting from \`Derived\`. Attempting to inherit results in a compile-time error.`
  },
  {
    id: "mcq_7",
    number: 7,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "hard",
    tags: ["dynamic_cast", "RTTI", "Type Casting"],
    question: "When performing a safe downcast using `dynamic_cast<Derived*>(basePtr)` on a pointer, what is returned if the cast fails at runtime?",
    code: `Base* basePtr = new AnotherDerived();
Derived* d = dynamic_cast<Derived*>(basePtr);`,
    options: [
      "A. It throws an `std::bad_cast` exception.",
      "B. It returns `nullptr` (or NULL).",
      "C. It returns a garbage pointer that causes Undefined Behavior.",
      "D. It triggers a compile-time error."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
- When \`dynamic_cast\` is used on **pointers** (\`Derived*\`), if \`basePtr\` does not actually point to a \`Derived\` object, the cast fails gracefully by returning **\`nullptr\`**.
- When \`dynamic_cast\` is used on **references** (\`dynamic_cast<Derived&>(baseRef)\`), because references cannot be null, a failed cast throws an **\`std::bad_cast\`** exception.
- Note: \`dynamic_cast\` requires the Base class to have at least one virtual function (polymorphic class).`
  },
  {
    id: "mcq_8",
    number: 8,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "easy",
    tags: ["Access Specifiers", "Inheritance Types"],
    question: "Under `public` inheritance in C++, what happens to the access levels of `protected` members of the Base class in the Derived class?",
    code: null,
    options: [
      "A. They become `private` in the Derived class.",
      "B. They remain `protected` in the Derived class and can be accessed by member functions of Derived.",
      "C. They become `public` and can be accessed anywhere outside the class.",
      "D. They are inaccessible and completely hidden from Derived."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
Under \`public\` inheritance (\`class Derived : public Base\`):
- \`public\` members in Base remain \`public\` in Derived.
- \`protected\` members in Base remain \`protected\` in Derived (accessible within Derived and its descendants, but hidden from external code).
- \`private\` members in Base remain \`private\` to Base and cannot be directly accessed by Derived.`
  },
  {
    id: "mcq_9",
    number: 9,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "hard",
    tags: ["Virtual Table", "vptr", "Internal Mechanism"],
    question: "How does C++ internally implement dynamic polymorphism for classes containing virtual functions?",
    code: null,
    options: [
      "A. The compiler embeds a copy of the entire Base class bytecode into every Derived object.",
      "B. Each polymorphic class has a Virtual Method Table (vtable) of function pointers, and each object instance holds a hidden pointer (vptr) pointing to its class's vtable.",
      "C. It evaluates string function names dynamically at runtime like an interpreted language.",
      "D. It generates a giant global \`switch-case\` statement for all object addresses."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
Dynamic polymorphism in C++ is achieved via the **vtable / vptr mechanism**:
1. The compiler creates a single static table called **vtable** (Virtual Table) per class containing addresses of its virtual functions.
2. Every object of that class contains an invisible pointer member called **vptr** (virtual table pointer) pointing to the corresponding vtable.
3. At runtime, calling \`ptr->virtualFunc()\` dereferences \`ptr->vptr\` to locate the target function address.`
  },
  {
    id: "mcq_10",
    number: 10,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "medium",
    tags: ["Constructor Order", "Destructor Order", "Inheritance"],
    question: "Given `class D : public B`, what is the correct order of Constructor and Destructor invocations when an object of `D` is created and then destroyed?",
    code: null,
    options: [
      "A. Creation: D() -> B(); Destruction: ~D() -> ~B()",
      "B. Creation: B() -> D(); Destruction: ~B() -> ~D()",
      "C. Creation: B() -> D(); Destruction: ~D() -> ~B()",
      "D. Creation: D() -> B(); Destruction: ~B() -> ~D()"
    ],
    correctIndex: 2,
    explanation: `**Explanation:**
- **Construction Order:** Base class first, then Derived class (\`B() -> D()\`). A house needs its foundation built before the upper floors.
- **Destruction Order:** Exact reverse order: Derived class first, then Base class (\`~D() -> ~B()\`).`
  },
  {
    id: "mcq_11",
    number: 11,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "hard",
    tags: ["Multiple Inheritance", "Diamond Problem", "virtual Base"],
    question: "In C++, how is the **Diamond Problem** (ambiguity and duplicate base subobjects in multiple inheritance) resolved?",
    code: `// A -> B, A -> C, and D inherits from both B and C
class B : virtual public A { ... };
class C : virtual public A { ... };
class D : public B, public C { ... };`,
    options: [
      "A. By declaring all functions in class A as pure virtual.",
      "B. By using **Virtual Inheritance** (\`virtual public A\`), ensuring only a single shared instance of A exists in D.",
      "C. By making class D inherit privately from class A.",
      "D. By deleting the default constructor of class A."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
The Diamond Problem arises when classes \`B\` and \`C\` both inherit from \`A\`, and class \`D\` inherits from both \`B\` and \`C\`. Without virtual inheritance, \`D\` would contain two separate copies of \`A\`, leading to ambiguity. Using **virtual base classes** (\`virtual public A\`) ensures only one single instance of \`A\` is shared within \`D\`.`
  },
  {
    id: "mcq_12",
    number: 12,
    chapter: "ch5",
    chapterName: "Chapter 5: Inheritance & Polymorphism",
    difficulty: "medium",
    tags: ["Polymorphic Collections", "Base Pointer Array"],
    question: "Why is an array of base pointers (`Figure* arr[]`) preferred over an array of base objects (`Figure arr[]`) when managing a heterogeneous collection of shapes?",
    code: `Figure* list[3];
list[0] = new Rectangle(4, 5);
list[1] = new Circle(3);
list[2] = new Triangle(3, 4, 5);`,
    options: [
      "A. Because `Figure arr[]` would cause object slicing, cannot store abstract types, and cannot invoke derived virtual overrides.",
      "B. Because pointer arrays automatically free heap memory without needing delete.",
      "C. Because C++ forbids arrays of objects under all circumstances.",
      "D. Because `Figure*` consumes 0 bytes of memory."
    ],
    correctIndex: 0,
    explanation: `**Explanation:**
1. If \`Figure\` is abstract, \`Figure arr[]\` cannot even compile because abstract classes cannot be instantiated.
2. Even if non-abstract, storing derived objects in \`Figure arr[]\` causes **object slicing** and disables runtime polymorphism.
3. Using pointers (\`Figure*\`) or smart pointers (\`std::unique_ptr<Figure>\`) allows each element to hold the address of any derived object on the heap and invoke overridden methods polymorphically.`
  },

  // =========================================================================
  // CHAPTER 6: RELATIONSHIPS & FILE PROGRAMMING (Q13 - Q20)
  // =========================================================================
  {
    id: "mcq_13",
    number: 13,
    chapter: "ch6",
    chapterName: "Chapter 6: Relationships & File Programming",
    difficulty: "medium",
    tags: ["Aggregation vs Composition", "UML Relationships"],
    question: "What is the primary difference in **lifetime dependency** between **Composition** (\"has-a\" tight) and **Aggregation** (\"has-a\" loose) in UML/OOP design?",
    code: null,
    options: [
      "A. In Composition, the child object exists independently if the parent is destroyed; in Aggregation, the child dies with the parent.",
      "B. In Composition, the child object belongs exclusively to the parent and is destroyed when the parent is destroyed; in Aggregation, the child can exist independently.",
      "C. Composition uses public inheritance while Aggregation uses private inheritance.",
      "D. There is no difference; they are identical synonyms in C++."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
- **Composition (Filled Diamond in UML):** Strong ownership. The part's lifetime is bound to the whole (e.g., \`Circle\` contains \`Point2D center\`). When the \`Circle\` is destroyed, \`center\` is destroyed simultaneously.
- **Aggregation (Hollow Diamond in UML):** Weak ownership/reference. The part can exist independently outside the whole (e.g., \`Department\` has \`Teacher*\`). If the \`Department\` closes, the \`Teacher\` still exists.`
  },
  {
    id: "mcq_14",
    number: 14,
    chapter: "ch6",
    chapterName: "Chapter 6: Relationships & File Programming",
    difficulty: "hard",
    tags: ["File I/O", "EOF Pitfall", "ifstream"],
    question: "Why is using `while (!fin.eof()) { fin >> x; cout << x; }` considered an anti-pattern in C++ file reading?",
    code: `ifstream fin("data.txt");
int x;
while (!fin.eof()) { // Bẫy đọc file!
    fin >> x;
    cout << x << " ";
}`,
    options: [
      "A. It causes a compilation error because `.eof()` only works on binary files.",
      "B. `fin.eof()` only returns `true` AFTER a read operation has already attempted to read past the end of the file, causing the last value to be printed twice.",
      "C. It creates a memory leak by opening the file multiple times.",
      "D. It slows down execution because EOF check requires network access."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
The EOF flag in C++ streams is only set **after** an input operation attempts to read beyond the end of the file and fails. Therefore, \`!fin.eof()\` is still true on the last iteration, \`fin >> x\` fails leaving \`x\` with its previous value, and \`cout << x\` prints the final item twice.
**Correct idiom:** \`while (fin >> x) { cout << x << " "; }\``
  },
  {
    id: "mcq_15",
    number: 15,
    chapter: "ch6",
    chapterName: "Chapter 6: Relationships & File Programming",
    difficulty: "medium",
    tags: ["Binary File I/O", "read", "write"],
    question: "Which code snippet correctly writes a POD (Plain Old Data) struct `Student s` into a binary file in C++?",
    code: `struct Student { int id; double gpa; };
Student s = {101, 3.85};
ofstream fout("students.dat", ios::binary);`,
    options: [
      "A. `fout << s.id << s.gpa;`",
      "B. `fout.write((char*)&s, sizeof(s));`",
      "C. `fout.writeBinary(&s, sizeof(Student));`",
      "D. `fout.put((Student*)&s);`"
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
In C++, raw binary output is performed using the \`ostream::write(const char* s, streamsize count)\` method. We must cast the struct's address to a byte pointer \`(char*)&s\` (or \`reinterpret_cast<const char*>(&s)\`) and pass the byte size \`sizeof(s)\`.`
  },
  {
    id: "mcq_16",
    number: 16,
    chapter: "ch6",
    chapterName: "Chapter 6: Relationships & File Programming",
    difficulty: "easy",
    tags: ["File Modes", "ios::app", "fstream"],
    question: "Which file open mode flag appends new data to the end of an existing file without overwriting previous content?",
    code: null,
    options: [
      "A. `ios::trunc`",
      "B. `ios::in`",
      "C. `ios::app`",
      "D. `ios::ate | ios::trunc`"
    ],
    correctIndex: 2,
    explanation: `**Explanation:**
- \`ios::app\` (append): All output operations are performed at the end of the file, preserving existing content.
- \`ios::trunc\` (truncate): Discards any existing content in the file upon opening (default for \`ofstream\`).
- \`ios::in\`: Open for reading (default for \`ifstream\`).`
  },
  {
    id: "mcq_17",
    number: 17,
    chapter: "ch6",
    chapterName: "Chapter 6: Relationships & File Programming",
    difficulty: "medium",
    tags: ["stringstream", "Parsing", "String Manipulation"],
    question: "What is the result of executing the following `std::stringstream` code?",
    code: `#include <iostream>
#include <sstream>
#include <string>
using namespace std;

int main() {
    string line = "2026 CS102 9.5";
    stringstream ss(line);
    int year;
    string code;
    double score;
    ss >> year >> code >> score;
    cout << code << ":" << score + 0.5;
    return 0;
}`,
    options: [
      "A. 2026:10",
      "B. CS102:10",
      "C. CS102:9.50.5",
      "D. Compilation error on stringstream extraction."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
\`stringstream\` breaks whitespace-delimited tokens from the string \`line\`:
- \`ss >> year\` extracts \`2026\`
- \`ss >> code\` extracts \`"CS102"\`
- \`ss >> score\` extracts \`9.5\` (floating point)
- \`cout << code << ":" << score + 0.5\` calculates \`9.5 + 0.5 = 10\`, printing \`CS102:10\`.`
  },
  {
    id: "mcq_18",
    number: 18,
    chapter: "ch6",
    chapterName: "Chapter 6: Relationships & File Programming",
    difficulty: "hard",
    tags: ["Binary Serialization Pitfall", "Pointers in Binary Files"],
    question: "Why is it dangerous to directly write an object containing a pointer member (like `std::string` or `int*`) to a binary file using `fout.write((char*)&obj, sizeof(obj))`?",
    code: `class Employee {
    int id;
    string* name; // Pointer to heap memory!
};
Employee e;
fout.write((char*)&e, sizeof(e)); // Danger?`,
    options: [
      "A. Because `sizeof(obj)` is always 0 for classes with pointers.",
      "B. Because it only writes the numeric memory address of the pointer rather than the actual string data; when read back in a new run, it results in a dangling pointer / invalid address.",
      "C. Because binary files can only store fundamental integers.",
      "D. Because the operating system blocks pointer writes for security reasons."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
Writing raw bytes of an object with pointers saves the pointer's *virtual memory address* (e.g. \`0x7ffee4...\`), not the payload pointed to on the heap. When the program is restarted and the file is read back, that memory address is no longer valid, causing crashes when dereferenced. Deep serialization (writing string length + character array) is required.`
  },
  {
    id: "mcq_19",
    number: 19,
    chapter: "ch6",
    chapterName: "Chapter 6: Relationships & File Programming",
    difficulty: "medium",
    tags: ["Stream State Flags", "Error Recovery", "cin.clear"],
    question: "If a user enters invalid non-numeric text (e.g. `\"abc\"`) when `cin >> number` is expecting an integer, which two functions are required to restore `cin` to a working state?",
    code: null,
    options: [
      "A. `cin.close()` followed by `cin.open()`",
      "B. `cin.clear()` (to reset fail bit) and `cin.ignore()` (to discard the offending characters from the buffer)",
      "C. `cin.flush()` and `cin.restart()`",
      "D. `delete cin` and `cin = new istream()`"
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
When invalid input occurs, the stream sets its \`failbit\` and stops reading.
1. \`cin.clear()\` resets the internal error flags back to \`goodbit\`.
2. \`cin.ignore(numeric_limits<streamsize>::max(), '\\n')\` clears out the bad characters sitting in the input stream buffer so the next read won't fail immediately again.`
  },
  {
    id: "mcq_20",
    number: 20,
    chapter: "ch6",
    chapterName: "Chapter 6: Relationships & File Programming",
    difficulty: "easy",
    tags: ["Association", "Dependency", "UML"],
    question: "In UML class relationships, when class `InvoicePrinter` receives an instance of `Invoice` as a parameter to its `print(const Invoice& inv)` method without storing it as a member variable, what type of relationship is this?",
    code: null,
    options: [
      "A. Inheritance (\"is-a\")",
      "B. Composition (\"part-of\")",
      "C. Dependency / Association (\"uses-a\")",
      "D. Generalization"
    ],
    correctIndex: 2,
    explanation: `**Explanation:**
When one class uses another class temporarily (e.g. as a method parameter, local variable, or return value) without holding a permanent reference as a field, it represents a **Dependency / Association** ("uses-a" relationship, represented by a dashed arrow in UML).`
  },

  // =========================================================================
  // CHAPTER 7: TEMPLATES & EXCEPTION HANDLING (Q21 - Q30)
  // =========================================================================
  {
    id: "mcq_21",
    number: 21,
    chapter: "ch7",
    chapterName: "Chapter 7: Templates & Exception Handling",
    difficulty: "easy",
    tags: ["Function Template", "Generic Programming"],
    question: "What is the primary benefit of using C++ templates?",
    code: `template <typename T>
T myMax(T a, T b) {
    return (a > b) ? a : b;
}`,
    options: [
      "A. They make the program run in a virtual machine.",
      "B. They allow writing generic, type-independent code where the compiler generates concrete types at compile time without runtime overhead.",
      "C. They convert all dynamic allocations into garbage-collected pointers.",
      "D. They eliminate the need for header files."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
C++ templates enable **Generic Programming** (Compile-time Polymorphism). When you call \`myMax(3, 5)\` or \`myMax(3.2, 1.4)\`, the compiler automatically instantiates specialized versions (\`myMax<int>\` and \`myMax<double>\`) at compile time with zero runtime performance cost.`
  },
  {
    id: "mcq_22",
    number: 22,
    chapter: "ch7",
    chapterName: "Chapter 7: Templates & Exception Handling",
    difficulty: "medium",
    tags: ["Class Template", "Out-of-class Definition"],
    question: "When defining a member function of a class template outside the class declaration, which syntax is strictly required?",
    code: `template <typename T>
class Stack {
    T* data;
public:
    void push(T val);
};`,
    options: [
      "A. `void Stack::push(T val) { ... }`",
      "B. `template <typename T> void Stack<T>::push(T val) { ... }`",
      "C. `template <> void Stack::push(T val) { ... }`",
      "D. `generic <T> void Stack<T>::push(T val) { ... }`"
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
Defining a class template method outside the class header requires two things:
1. The prefix \`template <typename T>\`
2. The class qualification with type parameter \`Stack<T>::push(T val)\`. Omitting \`<T>\` will result in a syntax error.`
  },
  {
    id: "mcq_23",
    number: 23,
    chapter: "ch7",
    chapterName: "Chapter 7: Templates & Exception Handling",
    difficulty: "hard",
    tags: ["Template Specialization", "Edge Cases"],
    question: "What is **Full Template Specialization** used for in C++?",
    code: `template <>
class Formatter<const char*> {
    // Custom implementation specifically for C-style strings
};`,
    options: [
      "A. To restrict a template so that it only works with primitive integers.",
      "B. To provide a completely custom, specialized implementation of a template for a specific data type (e.g. \`const char*\` or \`bool\`) differing from the generic version.",
      "C. To prevent the compiler from generating templates.",
      "D. To convert a class template into a regular function."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
Full Template Specialization (syntax: \`template <>\`) allows developers to override the generic template logic and supply custom algorithms or storage for specific types (for instance, \`std::vector<bool>\` optimizes storage by using 1 bit per boolean, or string comparisons using \`strcmp\` instead of \`>\`).`
  },
  {
    id: "mcq_24",
    number: 24,
    chapter: "ch7",
    chapterName: "Chapter 7: Templates & Exception Handling",
    difficulty: "medium",
    tags: ["Non-type Template Parameters", "std::array"],
    question: "In the template declaration `template <typename T, int SIZE> class StaticBuffer`, what is `int SIZE` called?",
    code: `template <typename T, int SIZE>
class StaticBuffer {
    T buffer[SIZE];
};
StaticBuffer<int, 256> myBuf;`,
    options: [
      "A. Dynamic Constructor Argument",
      "B. Non-Type Template Parameter (NTTP)",
      "C. Virtual Type Specifier",
      "D. Variadic Argument Pack"
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
\`int SIZE\` is a **Non-Type Template Parameter (NTTP)**. It represents a compile-time constant value rather than a type. \`std::array<T, N>\` is a standard example where the size \`N\` is determined at compile time.`
  },
  {
    id: "mcq_25",
    number: 25,
    chapter: "ch7",
    chapterName: "Chapter 7: Templates & Exception Handling",
    difficulty: "hard",
    tags: ["Exception Catch Order", "Catch Order Trap"],
    question: "What is wrong with the following `try-catch` exception handling block?",
    code: `#include <iostream>
#include <stdexcept>
using namespace std;

int main() {
    try {
        throw out_of_range("Index too large");
    }
    catch (const exception& e) {
        cout << "Caught base exception: " << e.what() << endl;
    }
    catch (const out_of_range& e) { // Bẫy thứ tự catch!
        cout << "Caught out_of_range: " << e.what() << endl;
    }
    return 0;
}`,
    options: [
      "A. `out_of_range` cannot be caught with a reference.",
      "B. The second catch block (`out_of_range`) will NEVER execute because the first handler (`std::exception`) catches all derived exceptions first.",
      "C. C++ does not allow multiple catch blocks for the same try.",
      "D. `e.what()` returns an integer error code instead of text."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
C++ evaluates catch blocks sequentially from top to bottom. Because \`std::out_of_range\` inherits from \`std::exception\`, the base class handler matches first and intercepts the exception. The specific \`out_of_range\` catch block is dead code.
**Rule:** Always catch **derived/specific exceptions first**, and **base/general exceptions last**.`
  },
  {
    id: "mcq_26",
    number: 26,
    chapter: "ch7",
    chapterName: "Chapter 7: Templates & Exception Handling",
    difficulty: "medium",
    tags: ["catch(...)", "Default Handler"],
    question: "What does the `catch (...)` ellipsis handler accomplish in C++?",
    code: `try {
    processData();
} catch (const exception& e) {
    cout << "Standard exception: " << e.what();
} catch (...) {
    cout << "Caught unknown exception!";
}`,
    options: [
      "A. It suppresses all compile-time warnings.",
      "B. It acts as a catch-all fallback handler that catches any thrown exception of any data type (int, string, custom types, etc.).",
      "C. It restarts the program from main().",
      "D. It catches only hardware segmentation faults."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
\`catch (...)\` is the universal catch-all block. It catches any exception regardless of its type (even non-\`std::exception\` objects like \`throw 404;\` or \`throw "error";\`). It must always be placed as the final catch block.`
  },
  {
    id: "mcq_27",
    number: 27,
    chapter: "ch7",
    chapterName: "Chapter 7: Templates & Exception Handling",
    difficulty: "hard",
    tags: ["Stack Unwinding", "Destructor Safety", "RAII"],
    question: "What happens to local stack objects when an exception is thrown inside a function and caught in an outer caller?",
    code: `void func() {
    MyObject obj1;
    MyObject obj2;
    throw runtime_error("Error"); // What happens to obj1 and obj2?
}`,
    options: [
      "A. They remain in memory forever causing memory leaks.",
      "B. **Stack Unwinding** occurs: local stack objects are destroyed automatically in reverse order of construction by having their destructors invoked.",
      "C. Their memory is corrupted and immediate crash occurs.",
      "D. The program terminates immediately without running any cleanup."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
**Stack Unwinding** is the runtime process where the call stack is unwound until a matching \`catch\` block is found. During this process, destructors of all fully constructed local stack objects in the exited scopes are guaranteed to be called. This is why RAII (Resource Acquisition Is Initialization) is the cornerstone of C++ exception safety.`
  },
  {
    id: "mcq_28",
    number: 28,
    chapter: "ch7",
    chapterName: "Chapter 7: Templates & Exception Handling",
    difficulty: "hard",
    tags: ["Exception in Constructor", "Destructor Lifecycle Trap"],
    question: "If an exception is thrown inside a class **Constructor** before it finishes, will that object's **Destructor** be called?",
    code: `class ResourceHolder {
    int* data;
public:
    ResourceHolder() {
        data = new int[100];
        throw runtime_error("Fail!"); // Thrown inside constructor
    }
    ~ResourceHolder() {
        delete[] data;
    }
};`,
    options: [
      "A. Yes, the destructor is always called automatically.",
      "B. **No**, because in C++ an object's lifetime only begins when its constructor completes successfully. An incompletely constructed object has no destructor called.",
      "C. Yes, but only in debug mode.",
      "D. The compiler rejects exceptions inside constructors at compile time."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
In C++, an object is only considered \"alive\" once its constructor completes. If an exception leaves the constructor, the object is never considered fully constructed, so its destructor **will NOT run**. In the code above, \`delete[] data\` never executes, leading to a memory leak unless handled with \`std::unique_ptr\` or a try-catch inside the constructor.`
  },
  {
    id: "mcq_29",
    number: 29,
    chapter: "ch7",
    chapterName: "Chapter 7: Templates & Exception Handling",
    difficulty: "medium",
    tags: ["std::exception", "what() Method"],
    question: "When creating a custom exception class inheriting from `std::exception`, which virtual method should be overridden to return the error description?",
    code: `class MyException : public std::exception {
public:
    const char* ________() const noexcept override {
        return "Custom error message";
    }
};`,
    options: [
      "A. `getMessage()`",
      "B. `what()`",
      "C. `toString()`",
      "D. `description()`"
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
\`std::exception\` defines the virtual method:
\`virtual const char* what() const noexcept;\`
Overriding \`what()\` allows your custom exception to integrate seamlessly with standard exception catching (\`catch (const std::exception& e) { cout << e.what(); }\`).`
  },
  {
    id: "mcq_30",
    number: 30,
    chapter: "ch7",
    chapterName: "Chapter 7: Templates & Exception Handling",
    difficulty: "easy",
    tags: ["Rethrowing Exceptions", "throw;"],
    question: "Inside a `catch` block, which statement rethrows the currently active exception up the call stack without slicing its derived type?",
    code: `try {
    doWork();
} catch (const std::exception& e) {
    logError(e.what());
    ______; // Rethrow exact same exception
}`,
    options: [
      "A. `throw e;`",
      "B. `throw;`",
      "C. `rethrow;`",
      "D. `throw new exception();`"
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
- \`throw;\` (with no arguments) rethrows the original exception object exactly as-is, preserving its dynamic type and polymorphism.
- \`throw e;\` would create a new copy and cause **object slicing** if \`e\` is a derived exception caught by base reference.`
  },

  // =========================================================================
  // CHAPTER 8 & DESIGN PATTERNS: STL & PATTERNS (Q31 - Q40)
  // =========================================================================
  {
    id: "mcq_31",
    number: 31,
    chapter: "ch8",
    chapterName: "Chapter 8 & Patterns: STL & Design Patterns",
    difficulty: "easy",
    tags: ["STL Components", "Standard Template Library"],
    question: "What are the three fundamental pillars that compose the C++ Standard Template Library (STL)?",
    code: null,
    options: [
      "A. Classes, Structs, and Enums",
      "B. Containers, Iterators, and Algorithms",
      "C. Pointers, References, and Addresses",
      "D. Headers, Source files, and Objects"
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
The STL is organized into 3 core architectural components:
1. **Containers:** Data structures that hold collections of objects (\`vector\`, \`list\`, \`map\`, etc.).
2. **Iterators:** Generalized pointer-like objects used to traverse elements of containers.
3. **Algorithms:** Generic functions that perform operations (such as \`sort\`, \`find\`, \`accumulate\`) via iterators.`
  },
  {
    id: "mcq_32",
    number: 32,
    chapter: "ch8",
    chapterName: "Chapter 8 & Patterns: STL & Design Patterns",
    difficulty: "medium",
    tags: ["STL Containers", "vector vs list", "Performance"],
    question: "Which STL container provides $O(1)$ constant time random access via index operator `[]`, but $O(N)$ linear time insertion/deletion in the middle?",
    code: null,
    options: [
      "A. `std::list`",
      "B. `std::vector`",
      "C. `std::set`",
      "D. `std::stack`"
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
- \`std::vector\` is a dynamic contiguous array. It offers $O(1)$ random access by index (\`v[i]\`), but inserting in the middle requires shifting elements ($O(N)$).
- \`std::list\` is a doubly-linked list with $O(1)$ insertion at known iterators, but no random index access ($O(N)$ traversal).`
  },
  {
    id: "mcq_33",
    number: 33,
    chapter: "ch8",
    chapterName: "Chapter 8 & Patterns: STL & Design Patterns",
    difficulty: "hard",
    tags: ["Iterator Pattern", "GoF Design Pattern"],
    question: "In the Gang of Four (GoF) **Iterator Design Pattern**, what is the primary goal of decoupling the Iterator from the Aggregate Collection?",
    code: null,
    options: [
      "A. To speed up integer addition operations.",
      "B. To allow traversing a container's elements in multiple different ways (e.g. forward, backward, filtered) without exposing its internal data representation.",
      "C. To prevent subclasses from using virtual functions.",
      "D. To convert private members into public members."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
The Iterator Pattern provides a standardized way to sequentially access elements of an aggregate object (like a binary tree, linked list, or array) without exposing its underlying internal structure (encapsulation). It allows multiple simultaneous traversals with different strategies without modifying the collection class itself.`
  },
  {
    id: "mcq_34",
    number: 34,
    chapter: "ch8",
    chapterName: "Chapter 8 & Patterns: STL & Design Patterns",
    difficulty: "medium",
    tags: ["Singleton Pattern", "Architecture", "Design Patterns"],
    question: "Which three implementation rules are mandatory to implement a classic **Singleton Pattern** in C++?",
    code: `class Singleton {
    // What goes here?
};`,
    options: [
      "A. Public constructor, virtual destructor, and friend functions.",
      "B. **Private constructor**, a **static pointer/instance** variable, and a **public static `getInstance()`** method.",
      "C. Multiple inheritance, pure virtual methods, and template parameters.",
      "D. All methods declared inline with public copy constructor."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
To guarantee that only one instance of a class exists throughout program execution:
1. **Private Constructor** (and deleted copy/move constructors): Prevents direct instantiation via \`new Singleton()\` or local variables.
2. **Static Member Instance Pointer:** Holds the unique instance.
3. **Public Static \`getInstance()\` Method:** Provides a global access point to create (lazy initialization) and retrieve the instance.`
  },
  {
    id: "mcq_35",
    number: 35,
    chapter: "ch8",
    chapterName: "Chapter 8 & Patterns: STL & Design Patterns",
    difficulty: "medium",
    tags: ["std::map", "Associative Containers", "Complexity"],
    question: "In `std::map<string, int>`, how are keys stored internally and what is the lookup time complexity for `myMap.find(key)`?",
    code: null,
    options: [
      "A. Hash table with $O(1)$ average time.",
      "B. Self-balancing Binary Search Tree (Red-Black Tree), sorted by key with $O(\\log N)$ time complexity.",
      "C. Unsorted array with $O(N)$ linear search.",
      "D. Doubly linked list with $O(N)$ time complexity."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
- \`std::map\` and \`std::set\` are ordered associative containers implemented using **Red-Black Trees** (Self-balancing BST). Keys are always kept sorted, giving $O(\\log N)$ logarithmic time complexity for insertions, deletions, and lookups.
- Note: \`std::unordered_map\` is based on hash tables with $O(1)$ average lookup.`
  },
  {
    id: "mcq_36",
    number: 36,
    chapter: "ch8",
    chapterName: "Chapter 8 & Patterns: STL & Design Patterns",
    difficulty: "hard",
    tags: ["end() Iterator", "Half-open Range [begin, end)"],
    question: "In STL containers, what does `container.end()` actually point to?",
    code: `vector<int> v = {10, 20, 30};
auto it = v.end();`,
    options: [
      "A. The last element in the container (i.e. value 30).",
      "B. The theoretical element **immediately following the last element** (past-the-end marker).",
      "C. \`nullptr\` or memory address 0.",
      "D. The first element in the container."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
STL ranges are always **half-open intervals: \`[begin, end)\`**. \`v.begin()\` points to the first element (\`10\`), whereas \`v.end()\` points to the position **one past the last valid element**. Dereferencing \`*v.end()\` is Undefined Behavior.`
  },
  {
    id: "mcq_37",
    number: 37,
    chapter: "ch8",
    chapterName: "Chapter 8 & Patterns: STL & Design Patterns",
    difficulty: "medium",
    tags: ["std::accumulate", "<numeric>", "STL Algorithms"],
    question: "What is the output of the following STL algorithm code?",
    code: `#include <iostream>
#include <vector>
#include <numeric>
using namespace std;

int main() {
    vector<int> v = {1, 2, 3, 4, 5};
    int total = accumulate(v.begin(), v.end(), 10);
    cout << total;
    return 0;
}`,
    options: [
      "A. 15",
      "B. 25",
      "C. 10",
      "D. Compilation error: accumulate requires 2 parameters."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
\`std::accumulate(first, last, initValue)\` from \`<numeric>\` computes the sum of the range initialized with \`initValue\`.
Sum of elements = $1 + 2 + 3 + 4 + 5 = 15$.
Total = $15 + 10 = 25$.`
  },
  {
    id: "mcq_38",
    number: 38,
    chapter: "ch8",
    chapterName: "Chapter 8 & Patterns: STL & Design Patterns",
    difficulty: "hard",
    tags: ["Factory Method Pattern", "Object Creation", "Design Patterns"],
    question: "What is the key purpose of the **Factory Method Pattern** in OOP design?",
    code: `Figure* FigureFactory::create(const string& type) {
    if (type == "Circle") return new Circle();
    if (type == "Rectangle") return new Rectangle();
    return nullptr;
}`,
    options: [
      "A. To enforce that only one instance of Figure can ever exist.",
      "B. To decouple the client code from concrete subclass implementations by providing an interface/method that instantiates objects dynamically based on runtime parameters.",
      "C. To prevent memory allocation on the heap.",
      "D. To convert dynamic dispatch into static binding."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
The **Factory Method Pattern** delegates object creation to a specialized method. The client code only depends on the abstract base class (\`Figure\`) and the factory, making the system easy to extend with new shapes without modifying existing client business logic (Open-Closed Principle).`
  },
  {
    id: "mcq_39",
    number: 39,
    chapter: "ch8",
    chapterName: "Chapter 8 & Patterns: STL & Design Patterns",
    difficulty: "medium",
    tags: ["std::sort", "<algorithm>", "Custom Comparator"],
    question: "How do you sort a `std::vector<int> v` in **descending (decreasing)** order using `<algorithm>`?",
    code: `vector<int> v = {5, 2, 8, 1, 9};`,
    options: [
      "A. `v.sort_descending();`",
      "B. `sort(v.begin(), v.end(), greater<int>());`",
      "C. `sort(v.end(), v.begin());`",
      "D. `reverse_sort(v.begin(), v.end());`"
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
By default, \`std::sort(v.begin(), v.end())\` sorts in ascending order (using \`operator<\`). Passing the standard functor \`std::greater<int>()\` (or a lambda \`[](int a, int b){ return a > b; }\`) sorts the elements in descending order.`
  },
  {
    id: "mcq_40",
    number: 40,
    chapter: "ch8",
    chapterName: "Chapter 8 & Patterns: STL & Design Patterns",
    difficulty: "hard",
    tags: ["Iterator Invalidation", "vector reallocation"],
    question: "What causes **Iterator Invalidation** when calling `v.push_back(x)` on a `std::vector`?",
    code: `vector<int> v = {1, 2, 3};
auto it = v.begin();
v.push_back(4); // What happens to 'it'?
cout << *it;`,
    options: [
      "A. Iterators are automatically deleted by the garbage collector.",
      "B. If the vector exceeds its current capacity, it allocates a new larger memory block elsewhere on the heap and copies old elements over, leaving previous iterators pointing to deallocated memory.",
      "C. `push_back` always sets all existing iterators to `nullptr`.",
      "D. There is no iterator invalidation in C++."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
When a \`std::vector\` runs out of capacity (\`size == capacity\`), \`push_back()\` reallocates a new contiguous block in the heap (typically $1.5\\times$ or $2\\times$ larger), copies existing elements, and frees the old buffer. Any existing iterators, pointers, or references pointing into the old buffer become **invalid/dangling**, and dereferencing them causes Undefined Behavior.`
  },

  // =========================================================================
  // CHAPTERS 2, 3, 4: CORE OOP, MEMORY, RULE OF THREE, STATIC (Q41 - Q50)
  // =========================================================================
  {
    id: "mcq_41",
    number: 41,
    chapter: "ch2_4",
    chapterName: "Chapters 2-4: Core OOP, Memory & Lifecycle",
    difficulty: "hard",
    tags: ["Most Vexing Parse", "Function Declaration Trap"],
    question: "What does the statement `MyClass obj();` do in C++?",
    code: `class MyClass {
public:
    MyClass() { cout << "Constructed"; }
};

int main() {
    MyClass obj(); // Bẫy kinh điển!
    return 0;
}`,
    options: [
      "A. It creates an object named `obj` using the default constructor and prints \"Constructed\".",
      "B. It is interpreted by the compiler as a **Function Declaration** named `obj` that takes 0 parameters and returns a `MyClass` object. No object is created!",
      "C. It throws a syntax error because parentheses are forbidden in C++.",
      "D. It allocates a pointer `obj` on the heap."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
This is the infamous **\"Most Vexing Parse\"** in C++. \`MyClass obj();\` matches the grammar for a forward declaration of a function named \`obj\` taking no arguments and returning \`MyClass\`. To construct an object with default constructor, write:
\`MyClass obj;\` or \`MyClass obj{};\` (C++11 uniform initialization).`
  },
  {
    id: "mcq_42",
    number: 42,
    chapter: "ch2_4",
    chapterName: "Chapters 2-4: Core OOP, Memory & Lifecycle",
    difficulty: "medium",
    tags: ["Rule of Three", "Copy Constructor", "Memory Management"],
    question: "What comprises the classic C++ **Rule of Three** for classes that manage raw dynamic memory resources?",
    code: null,
    options: [
      "A. Constructor, Getter, and Setter",
      "B. Destructor, Copy Constructor, and Copy Assignment Operator (`operator=`)",
      "C. Default Constructor, Parameterized Constructor, and Overloaded Operator+",
      "D. Virtual Function, Friend Function, and Static Function"
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
The **Rule of Three** states that if a class explicitly manages dynamic resources (like \`new\` heap memory) and requires a custom **Destructor** to free it, it almost certainly also requires a custom **Copy Constructor** and **Copy Assignment Operator (\`operator=\`)** to perform Deep Copies and avoid double-free errors.`
  },
  {
    id: "mcq_43",
    number: 43,
    chapter: "ch2_4",
    chapterName: "Chapters 2-4: Core OOP, Memory & Lifecycle",
    difficulty: "hard",
    tags: ["Self-assignment Check", "operator="],
    question: "Why is the self-assignment check `if (this == &other) return *this;` essential at the start of an overloaded `operator=`?",
    code: `MyArray& operator=(const MyArray& other) {
    if (this == &other) return *this; // Why?
    delete[] data;
    data = new int[other.size];
    ...
}`,
    options: [
      "A. To prevent the compiler from optimizing away the assignment.",
      "B. Because if `a = a;` is executed without this check, `delete[] data;` will deallocate the object's own buffer before copying from it, destroying the source data.",
      "C. To convert the assignment operator into a move constructor.",
      "D. To guarantee thread safety across multi-threaded execution."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
If self-assignment occurs (\`a = a;\` or \`*ptrA = *ptrB;\` where both point to the same object), deleting the current heap buffer (\`delete[] data;\`) destroys the very data you intend to copy from \`other.data\`, leading to reading freed memory (Undefined Behavior / Crash).`
  },
  {
    id: "mcq_44",
    number: 44,
    chapter: "ch2_4",
    chapterName: "Chapters 2-4: Core OOP, Memory & Lifecycle",
    difficulty: "medium",
    tags: ["explicit Keyword", "Implicit Conversion"],
    question: "What is the purpose of declaring a single-parameter constructor as `explicit`?",
    code: `class Fraction {
public:
    explicit Fraction(int numerator); // explicit
};`,
    options: [
      "A. It forces the constructor to be inlined by the compiler.",
      "B. It prevents the compiler from using the constructor for **implicit type conversions** and copy-initialization (e.g. `Fraction f = 5;`).",
      "C. It allows private access from external functions without friend declaration.",
      "D. It makes the constructor callable only once during program lifetime."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
By default, any single-argument constructor in C++ serves as an implicit type conversion operator (e.g. converting \`int\` into \`Fraction\`). Marking it \`explicit\` blocks unintentional implicit conversions:
- \`Fraction f(5);\` // OK
- \`Fraction f = 5;\` // Compile error with explicit`
  },
  {
    id: "mcq_45",
    number: 45,
    chapter: "ch2_4",
    chapterName: "Chapters 2-4: Core OOP, Memory & Lifecycle",
    difficulty: "medium",
    tags: ["static Members", "Definition Out-of-class"],
    question: "Where must a non-const `static` member variable of a class be defined and initialized in C++?",
    code: `// Header.h
class Counter {
    static int count; // Declaration
};`,
    options: [
      "A. Inside the class declaration in the header file directly: `static int count = 0;`",
      "B. In exactly one source file (`.cpp`) outside the class declaration: `int Counter::count = 0;`",
      "C. Inside the `main()` function.",
      "D. Static variables do not need definition; the compiler initializes them automatically."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
In standard C++ (pre-C++17 \`inline static\`), non-const static member variables are only *declared* inside the class header. They must be explicitly *defined and initialized* in exactly one source file (\`.cpp\`) using the scope resolution operator (\`int Counter::count = 0;\`). Otherwise, the linker will report an \"undefined reference\" error.`
  },
  {
    id: "mcq_46",
    number: 46,
    chapter: "ch2_4",
    chapterName: "Chapters 2-4: Core OOP, Memory & Lifecycle",
    difficulty: "easy",
    tags: ["this Pointer", "Member Functions"],
    question: "What is the `this` pointer in C++?",
    code: null,
    options: [
      "A. A reference to the parent base class.",
      "B. A const pointer passed implicitly to all non-static member functions, holding the memory address of the current object instance calling the method.",
      "C. A pointer that points to the first element of an array.",
      "D. A keyword used to delete an object from heap memory."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
\`this\` is an implicit pointer parameter available inside all non-static member functions of a class. It points to the specific object instance that called the method, allowing access to its members (e.g. \`this->x = x;\`) or returning references to the current object (\`return *this;\`).`
  },
  {
    id: "mcq_47",
    number: 47,
    chapter: "ch2_4",
    chapterName: "Chapters 2-4: Core OOP, Memory & Lifecycle",
    difficulty: "medium",
    tags: ["Operator Overloading", "Stream Operators Chaining"],
    question: "Why must overloaded stream operators `operator<<` and `operator>>` return references to `ostream&` and `istream&`?",
    code: `ostream& operator<<(ostream& os, const Point& p) {
    os << "(" << p.x << ", " << p.y << ")";
    return os; // Why return os?
}`,
    options: [
      "A. To prevent the point object from being copied.",
      "B. To allow chaining multiple stream insertions/extractions in a single line (e.g. `cout << p1 << p2 << endl;`).",
      "C. Because stream objects cannot be passed by value due to private copy constructors.",
      "D. Both B and C are correct."
    ],
    correctIndex: 3,
    explanation: `**Explanation:**
1. \`std::ostream\` and \`std::istream\` have deleted copy constructors and cannot be copied by value.
2. Returning \`os\` (as \`ostream&\`) allows operator chaining: in \`cout << a << b;\`, \`(cout << a)\` evaluates to \`cout\`, which is then used as the left-hand operand for \`<< b\`."`
  },
  {
    id: "mcq_48",
    number: 48,
    chapter: "ch2_4",
    chapterName: "Chapters 2-4: Core OOP, Memory & Lifecycle",
    difficulty: "hard",
    tags: ["new[] and delete[]", "Heap Array Allocation"],
    question: "What undefined behavior or error occurs if dynamic array `int* a = new int[50];` is deallocated using `delete a;` instead of `delete[] a;`?",
    code: `int* arr = new int[50];
delete arr; // Notice missing [] !`,
    options: [
      "A. It compiles and runs safely with no issues because `int` is a primitive type.",
      "B. It results in **Undefined Behavior**: for objects with destructors, only the first element's destructor will be invoked, and heap metadata can be corrupted.",
      "C. It throws a `std::bad_alloc` exception at runtime.",
      "D. The compiler automatically corrects `delete` to `delete[]`."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
Pairing \`new[]\` with scalar \`delete\` (without brackets) is strictly **Undefined Behavior** in C++. For arrays of class objects, the runtime stores the array size in heap metadata and needs \`delete[]\` to call destructors for all 50 elements. Mixing scalar and array forms corrupts the heap manager.`
  },
  {
    id: "mcq_49",
    number: 49,
    chapter: "ch2_4",
    chapterName: "Chapters 2-4: Core OOP, Memory & Lifecycle",
    difficulty: "easy",
    tags: ["const Member Functions", "const Correctness"],
    question: "What does the `const` keyword signify at the end of a member function declaration: `double getArea() const;`?",
    code: `class Circle {
    double radius;
public:
    double getArea() const; // const here
};`,
    options: [
      "A. It returns a constant double that cannot be modified.",
      "B. It guarantees that the function will not modify any non-mutable member variables of the calling object, allowing it to be invoked on `const` objects.",
      "C. It prevents other functions from overloading `getArea()`.",
      "D. It makes the function static."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
A \`const\` member function commits not to modify any state (member variables) of the object instance it is called on. This allows the method to be safely called on \`const\` instances of the class (e.g. \`const Circle c(5); c.getArea();\`).`
  },
  {
    id: "mcq_50",
    number: 50,
    chapter: "ch2_4",
    chapterName: "Chapters 2-4: Core OOP, Memory & Lifecycle",
    difficulty: "medium",
    tags: ["Default Constructor", "Compiler Generation Rules"],
    question: "When does the C++ compiler automatically generate a default parameterless constructor for a class?",
    code: null,
    options: [
      "A. For every class under all circumstances.",
      "B. Only when the programmer has **NOT declared ANY constructor** (default, parameterized, or copy) in the class.",
      "C. Whenever at least one virtual function is declared.",
      "D. Only when inheriting from an abstract base class."
    ],
    correctIndex: 1,
    explanation: `**Explanation:**
The compiler only synthesizes a default parameterless constructor if **no constructors of any kind** are declared by the user. If you define even a single constructor (e.g. \`MyClass(int x)\`), the compiler ceases to provide the default parameterless constructor automatically, making \`MyClass obj;\` an error unless you explicitly write \`MyClass() = default;\` or define it manually.`
  }
];
