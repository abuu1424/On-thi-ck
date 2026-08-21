# OOP – TỔNG HỢP ÔN THI (C++)

> Dựa trên slide tuần 2 → 8 (FIT-HCMUS, CLC). Cấu trúc theo 4 dạng câu hỏi thi:
> **C1** Lý thuyết · **C2** Đọc code → output · **C3** Viết code · **C4** Thiết kế kiến trúc (design pattern)

---

## MỤC LỤC

1. [Tuần 2 — Class &amp; Object](#tuan-2)
2. [Tuần 3 — Built-in Class (kiểu dữ liệu)](#tuan-3)
3. [Tuần 4 — Property &amp; Method (Constructor/Destructor/Static/Singleton)](#tuan-4)
4. [Tuần 5 — Inheritance &amp; Polymorphism](#tuan-5)
5. [Tuần 6 — Relationship &amp; File Programming](#tuan-6)
6. [Tuần 7 — Template &amp; Exception](#tuan-7)
7. [Tuần 8 — STL Library &amp; Iterator Pattern](#tuan-8)
8. [Design Patterns tổng hợp (C4)](#design-patterns)
9. [Bẫy code hay ra thi (C2/C3)](#bay-code)

---

<a id="tuan-2"></a>

## 1. TUẦN 2 — CLASS & OBJECT

### 1.1 Khái niệm

- **Class**: khuôn mẫu mô tả 1 nhóm object cùng loại (thuộc tính + phương thức).
- **Object**: 1 thể hiện (instance) cụ thể của class.
- Các object cùng class có cùng hành vi (behaviors), nhưng dữ liệu khác nhau.

### 1.2 Khai báo & cài đặt class (2 file .h / .cpp)

```cpp
//File Figures.h
#ifndef _FIGURE_H_
#define _FIGURE_H_
class Point2D{
  double X, Y;                 // mặc định private
  public:
    void Set(double, double);
    void Move(double, double);
    void Scale(double, double);
};
class Circle{
  Point2D Center;
  double Radius;
  public:
    void Set(double, double, double);
    void Move(double, double);
    double Area();
    double Perimeter();
};
#endif
```

```cpp
//File Figures.cpp
#include "Figures.h"
const double PI = 3.14159;
void Point2D::Set(double X0, double Y0){ X = X0; Y = Y0; }
void Point2D::Move(double dX, double dY){ X += dX; Y += dY; }
void Circle::Set(double X0, double Y0, double r){
  Center.Set(X0, Y0);
  if(r < 0) r = 0;
  this->Radius = r;              // con trỏ this
}
double Circle::Area(){ return PI*Radius*Radius; }
```

**Lý thuyết cần nhớ:**

- `public`: gọi được từ bên ngoài. Không có `public:` → mặc định **private**.
- `this`: con trỏ trỏ đến chính object đang gọi method (dùng khi tên tham số trùng tên thuộc tính).
- Vòng đời object: **tạo (created) → nhận message xử lý → hủy (destroyed)**.

### 1.3 Data encapsulation (đóng gói)

- Method `public` → gọi được từ ngoài: `Cir.Set(0,10,20)` OK.
- Thuộc tính `private` → **không gán trực tiếp** từ ngoài: `Cir.Radius = -5;` → **lỗi biên dịch**.
- Muốn set riêng 1 thuộc tính private → viết thêm method public overload: `Set(double r)`.

### 1.4 new / delete

```cpp
Circle* mycir = new Circle();     // tạo động (heap)
if(mycir != NULL){
  mycir->Set(20,20,100);          // dùng -> với con trỏ
  double S = mycir->Area();
}
delete mycir;                     // hủy, giải phóng vùng nhớ
mycir = NULL;                     // luôn NULL sau khi delete (tránh dangling pointer)
```

### 1.5 Input/Output — nạp chồng toán tử `>>` `<<`

```cpp
istream& operator>>(istream& inDev, Circle& cir){
  double X0,Y0,r;
  inDev >> X0 >> Y0 >> r;
  cir.Set(X0,Y0,r);
  return inDev;                    // PHẢI return để chain được: cin >> a >> b;
}
ostream& operator<<(ostream& outDev, const Circle& cir){   // const vì chỉ đọc
  outDev << "Area: " << cir.Area() << endl;
  return outDev;
}
```

> **Lỗi hay gặp khi viết code (C3):** quên `return inDev/outDev` → không thể viết `cin >> a >> b`. Quên `const` ở tham số của `operator<<` (best practice, không bắt buộc nhưng hay bị trừ điểm).

### 1.6 Tổ chức source code

- 1 chương trình C++ = 1 `main()` + nhiều cặp `.h/.cpp`.
- Mỗi cặp `.h/.cpp` → biên dịch ra 1 file `.o/.obj` → Linker gộp lại thành 1 file thực thi.
- `#ifndef/#define/#endif` (include guard) tránh khai báo trùng khi 1 header được include nhiều lần.

### 1.7 UML notation

- Class: hình chữ nhật 3 ngăn (tên – thuộc tính – phương thức).
- Object: `tenDoiTuong:TenClass` (có gạch dưới).
- Dấu trong UML: `+ public`, `- private`, `# protected`.
- Quan hệ association giữa 2 class vẽ bằng đường nối (Circle "có" Point2D = **composition**).

### 1.8 So sánh C++ / Java / C#

| Tiêu chí                 | C++                          | Java                         | C#                           |
| -------------------------- | ---------------------------- | ---------------------------- | ---------------------------- |
| Số file/class             | 2 (.h + .cpp)                | 1 (.java)                    | 1 (.cs)                      |
| Không ghi modifier        | private                      | **public**             | private                      |
| Cấp phát object thường | tự động (stack), tự hủy | luôn`new` (heap), GC dọn | luôn`new` (heap), GC dọn |
| Con trỏ                   | có (`*`, `->`)          | không (chỉ reference)      | có`unsafe` (ít dùng)    |
| new/delete thủ công      | có                          | GC tự động                | GC tự động                |

---

<a id="tuan-3"></a>

## 2. TUẦN 3 — BUILT-IN CLASS / KIỂU DỮ LIỆU

### 2.1 Kiểu nguyên thủy (Primitive datatypes)

- `int, float, double, char, bool, long, short, unsigned...`
- Chú ý kích thước byte, phạm vi giá trị, ép kiểu ngầm định giữa các kiểu số.

### 2.2 Chuỗi ký tự (String)

- **C-string (8-bit string)**: mảng `char[]` kết thúc bằng `'\0'`, thao tác qua thư viện `<cstring>` (`strcpy, strcat, strlen, strcmp...`).
- **`std::string` (C++ string)**: an toàn hơn, có operator `+`, `==`, `[]`, `.length()`, `.substr()`, `.find()`...
- **16-bit string** (`wchar_t`, `wstring`) cho ký tự Unicode.

### 2.3 Kiểu dữ liệu động (Dynamic datatypes)

- **Mảng động 1 chiều** dùng con trỏ: `int* a = new int[n]; ... delete[] a;`
- **`std::vector<T>`**: mảng động tự quản lý bộ nhớ.

```cpp
vector<int> v;
v.push_back(10);
v.size(); v[0]; v.pop_back();
```

- **Mảng động 2 chiều** bằng `vector<vector<int>>` hoặc con trỏ đôi `int**`.
- **`list<T>`** (danh sách liên kết đôi), **`stack<T>`** (LIFO: `push/pop/top`), **`queue<T>`** (FIFO: `push/pop/front`).

### 2.4 C++11/14 updates

- `auto`: tự suy luận kiểu — `auto x = 5;`
- `decltype(expr)`: lấy kiểu của biểu thức.
- `std::array<T,N>`: mảng tĩnh có kiểm tra bound tốt hơn mảng C thường.
- **Range-based for loop**: `for(auto x : container){...}` hoặc `for(auto& x : container)` (tham chiếu, sửa được phần tử).

### 2.5 So sánh C++/Java/C# về mảng động

|                 | C++ (`vector`)   | Java (`ArrayList`)      | C# (`List<T>`) |
| --------------- | ------------------ | ------------------------- | ---------------- |
| 1D              | `vector<int> v;` | `ArrayList<Integer> v;` | `List<int> v;` |
| Thêm phần tử | `v.push_back(x)` | `v.add(x)`              | `v.Add(x)`     |
| Số phần tử   | `v.size()`       | `v.size()`              | `v.Count`      |

---

<a id="tuan-4"></a>

## 3. TUẦN 4 — PROPERTY & METHOD (CONSTRUCTOR / DESTRUCTOR / STATIC)

### 3.1 Constructor

- Tên trùng tên class, **không có kiểu trả về**, tự động gọi khi tạo object, có thể **overload** nhiều constructor.

```cpp
class PhanSo{
  int tu, mau;
  public:
    PhanSo();                 // default constructor
    PhanSo(int, int);         // constructor đủ tham số
    PhanSo(const PhanSo&);    // copy constructor
};
PhanSo::PhanSo(){ tu = 0; mau = 1; }
PhanSo::PhanSo(int t, int m){ tu = t; mau = m; }
PhanSo::PhanSo(const PhanSo& p){ tu = p.tu; mau = p.mau; }
```

**Lưu ý quan trọng:**

- Nếu **không khai báo constructor nào** → compiler tự sinh default constructor (rỗng) + copy constructor (copy từng field – "shallow copy").
- Nếu class **có con trỏ (pointer member)** → **PHẢI tự viết copy constructor** (deep copy), nếu không 2 object sẽ trỏ chung 1 vùng nhớ → double free khi destructor chạy 2 lần.

```cpp
class MyIntArray{
  int *pArr; int size;
  public:
    MyIntArray(int n){
      size = n; pArr = new int[size];
      for(int i=0;i<size;i++) pArr[i]=0;
    }
    MyIntArray(const MyIntArray& src){      // deep copy — bắt buộc vì có con trỏ
      size = src.size;
      pArr = new int[size];
      for(int i=0;i<size;i++) pArr[i] = src.pArr[i];
    }
};
```

- Khai báo `PhanSo t();` → đây là khai báo **hàm** (function declaration), **KHÔNG** phải gọi default constructor! (bẫy kinh điển). Muốn tạo object dùng default constructor: `PhanSo t;`

### 3.2 Destructor

```cpp
class MyIntArray{
  int* pArr;
  public:
    ~MyIntArray(){ delete[] pArr; }   // giải phóng bộ nhớ tránh memory leak
};
```

- Tự động gọi khi object bị hủy (ra khỏi scope, hoặc `delete`).
- Nếu class có con trỏ cấp phát động mà **không viết destructor** → memory leak.
- Đối với inheritance + polymorphism: destructor của lớp cha nên khai báo `virtual` (xem mục 4).

### 3.3 Toán tử gán `operator=`

```cpp
MyIntArray& operator=(const MyIntArray& src){
  if(this == &src) return *this;      // check tự gán cho chính mình
  delete[] pArr;                       // giải phóng dữ liệu cũ
  size = src.size;
  pArr = new int[size];
  for(int i=0;i<size;i++) pArr[i]=src.pArr[i];
  return *this;                        // trả về *this để chain a=b=c
}
```

- Khác constructor: **operator=** hoạt động trên object **đã tồn tại**, còn copy constructor tạo object **mới**.
- Nếu class có con trỏ → phải tự viết cả copy constructor **và** operator= (nguyên tắc Rule of Three).

### 3.4 Truyền tham số (Parameter passing)

| Kiểu truyền      | Cú pháp                  | Đặc điểm                                                       |
| ------------------ | -------------------------- | ------------------------------------------------------------------ |
| Pass-by-value      | `void f(int x)`          | copy giá trị, sửa`x` không ảnh hưởng biến gốc           |
| Pass-by-reference  | `void f(int& x)`         | tham chiếu trực tiếp biến gốc, sửa`x` → thay đổi thật  |
| Pass-by-address    | `void f(int* x)`         | truyền địa chỉ, phải dùng`*x` để truy xuất giá trị    |
| Default parameter  | `void f(int x, int y=0)` | tham số có giá trị mặc định, phải đặt**sau cùng** |
| Variable arguments | `void f(int n, ...)`     | số lượng tham số thay đổi (`<cstdarg>`)                    |

### 3.5 Type-casting

- **Ngầm định (implicit)**: `int → double` tự động.
- **Tường minh (explicit)**: `static_cast<T>()`, `dynamic_cast<T>()`, `const_cast<T>()`, `reinterpret_cast<T>()`, hoặc cách C cũ `(T)x`.
- **Constructor 1 tham số** đóng vai trò type-casting ngầm định (implicit conversion) — muốn cấm dùng `explicit`:

```cpp
class PhanSo{
  public:
    explicit PhanSo(int t){ tu=t; mau=1; }   // cấm ép kiểu ngầm int -> PhanSo
};
```

- **Nạp chồng operator ép kiểu**: `operator int() const { return tu/mau; }` cho phép `PhanSo p; int x = p;`

### 3.6 Static member

```cpp
class Counter{
  static int count;      // khai báo trong class
  public:
    Counter(){ count++; }
};
int Counter::count = 0;  // ĐỊNH NGHĨA + khởi tạo phải ở ngoài class, trong file .cpp
```

- Thuộc về **class**, không thuộc về từng object — tất cả object dùng chung 1 vùng nhớ.
- Static method chỉ truy cập được static member (không có `this`).

### 3.7 Const method

```cpp
double Area() const { return PI*Radius*Radius; }  // cam kết không sửa thuộc tính object
```

- Cho phép gọi trên object `const`.

### 3.8 SINGLETON PATTERN (quan trọng — hay ra C4)

**Mục đích**: đảm bảo 1 class chỉ có **duy nhất 1 instance** trong suốt chương trình.
**Đặc điểm bắt buộc:**

1. Constructor đặt ở **private** (hoặc protected) → ngoài không `new` được trực tiếp.
2. Có con trỏ **static** trỏ tới instance duy nhất (khởi tạo NULL).
3. Có method **static `getInstance()`** — tạo instance nếu chưa có, rồi trả về.

```cpp
class A{
  static A* obj;         // 1) con trỏ static, khởi tạo NULL
  A();                   // 2) constructor private
  public:
    static A* getInstance(){        // 3) static method
      if(!obj) obj = new A();
      return obj;
    }
};
A* A::obj = NULL;        // định nghĩa biến static ngoài class
A::A(){ /*...*/ }

void main(){
  A* a = A::getInstance();   // KHÔNG được viết: A* a = new A();  (lỗi vì constructor private)
}
```

**Áp dụng thực tế**: class quản lý thuật toán (ví dụ `SortAlg`) chỉ cần 1 thể hiện toàn cục để chọn & chạy 1 thuật toán sắp xếp hiện hành (dùng con trỏ hàm `currentAlg`).

### 3.9 C++11 updates

- Khởi tạo bằng `{}` (uniform initialization): `int x{5}; vector<int> v{1,2,3};`
- `initializer_list<T>` — cho phép constructor nhận danh sách `{1,2,3}`.
- `= delete`: cấm compiler dùng 1 hàm (thường dùng để cấm copy constructor/operator=):

```cpp
class NoCopy{
  public:
    NoCopy(const NoCopy&) = delete;
    NoCopy& operator=(const NoCopy&) = delete;
};
```

- `= default`: yêu cầu compiler sinh bản mặc định.
- **Move constructor** `T(T&& other)`: "cướp" tài nguyên thay vì copy, tối ưu hiệu năng khi trả object tạm (rvalue).

---

<a id="tuan-5"></a>

## 4. TUẦN 5 — INHERITANCE & POLYMORPHISM

### 4.1 Inheritance (kế thừa)

```cpp
class Rectangle{
  protected:                       // protected: con cháu truy cập được, ngoài thì không
    float width, height;
  public:
    Rectangle(float, float);
    virtual float Area();
};
class Square : public Rectangle{   // kế thừa public
  public:
    Square(float side) : Rectangle(side, side) {}   // gọi constructor lớp cha
};
```

- 3 kiểu kế thừa: `public` (giữ nguyên độ truy cập), `protected`, `private` (thu hẹp độ truy cập) — **`public` là phổ biến nhất, gần như luôn dùng trong bài tập**.

### 4.2 Polymorphism (đa hình) — trọng tâm C4

- Không có `virtual` → gọi method theo **kiểu con trỏ khai báo** (static binding / early binding, KHÔNG đa hình).
- Có `virtual` → gọi method theo **kiểu object thực sự trỏ tới** (dynamic binding / late binding, ĐÚNG đa hình).

```cpp
class Rectangle{
  public:
    virtual void Input(istream&);   // virtual -> cho phép override đa hình
    virtual float Area();
};
void main(){
  Rectangle* pRec;
  Rectangle Rec; Square Sq;
  pRec = &Rec;  pRec->Input(cin);   // gọi Input của Rectangle
  pRec = &Sq;   pRec->Input(cin);   // KHÔNG virtual -> vẫn gọi Input của Rectangle (SAI mong đợi)
                                    // CÓ virtual -> gọi đúng Input của Square (đa hình)
}
```

**Abstract class** (lớp trừu tượng): có ít nhất 1 **pure virtual method** (`= 0`), không thể tạo instance trực tiếp.

```cpp
class Figure{
  public:
    virtual void Input(istream&) = 0;   // pure virtual = abstract method
    virtual float Area() = 0;
};
// Figure fig;   <- LỖI biên dịch (không thể new/khai báo object của abstract class)
```

### 4.3 Bài toán mẫu kinh điển: hệ thống hình học

```
Figure (abstract)
 ├── Rectangle
 │     └── Square
 ├── Ellipse
 │     └── Circle
 └── Triangle
```

```cpp
Figure* findMaxArea(Figure* f[], int n){
  Figure* a = NULL;
  if(n > 0){
    a = f[0];
    for(int i=0; i<n; i++)
      if(f[i]->Area() > a->Area()) a = f[i];
  }
  return a;
}
// gọi: Figure* f[] = {new Rectangle(9.3,9.7), new Circle(4.5), new Square(9.5), ...};
```

→ Đây chính là ứng dụng của đa hình: dùng **1 hàm chung** xử lý cho **nhiều loại hình khác nhau** thông qua con trỏ lớp cha (Figure*).

### 4.4 Access mechanism (3 mức truy cập)

| Từ khóa     | Trong class | Ngoài class | Lớp con |
| ------------- | ----------- | ------------ | -------- |
| `public`    | ✔          | ✔           | ✔       |
| `protected` | ✔          | ✘           | ✔       |
| `private`   | ✔          | ✘           | ✘       |

### 4.5 Friend function/class

- `friend` cho phép 1 hàm/class bên ngoài truy cập trực tiếp thành viên `private`/`protected`.

```cpp
class Box{
  private: double width;
  friend void printWidth(Box& b);   // hàm friend truy cập được width
};
void printWidth(Box& b){ cout << b.width; }
```

### 4.6 Virtual destructor (rất hay ra C2 — bẫy memory leak)

```cpp
class Base{
  public: virtual ~Base(){ cout << "~Base"; } // PHẢI virtual
};
class Derived : public Base{
  int* data;
  public:
    Derived(){ data = new int[10]; }
    ~Derived(){ delete[] data; cout << "~Derived"; }
};
void main(){
  Base* p = new Derived();
  delete p;   // nếu ~Base() KHÔNG virtual -> chỉ gọi ~Base(), KHÔNG gọi ~Derived() -> leak "data"
}
```

> **Quy tắc**: nếu class có ý định làm base class dùng đa hình (có ít nhất 1 hàm `virtual`), destructor của nó **phải virtual**.

### 4.7 Xác định tên class lúc runtime — RTTI

- `typeid(obj).name()` — lấy tên kiểu thực sự của object lúc chạy.
- `dynamic_cast<Derived*>(basePtr)` — ép kiểu an toàn xuống lớp con, trả `NULL`/ném exception nếu sai kiểu (yêu cầu class có ít nhất 1 hàm ảo).

### 4.8 Clone object

```cpp
virtual Figure* Clone() const = 0;              // khai báo trừu tượng ở Figure
Figure* Circle::Clone() const { return new Circle(*this); }   // dùng copy constructor
```

### 4.9 Tạo object bằng tên class (Factory-style, "GENERALIZE THE SCHEME & ALGORITHM")

- Dùng 1 hàm factory ánh xạ chuỗi tên → new object tương ứng (thường switch/if-else theo string), phục vụ tạo object linh động không cần biết trước kiểu cụ thể lúc compile.

```cpp
Figure* createFigure(string name){
  if(name == "Circle") return new Circle();
  if(name == "Square") return new Square();
  return NULL;
}
```

### 4.10 C++11 updates

- `override`: đánh dấu tường minh hàm ghi đè, compiler kiểm tra lỗi (sai chữ ký sẽ báo lỗi thay vì âm thầm tạo hàm mới).
- `final`: cấm ghi đè thêm (trên method) hoặc cấm kế thừa thêm (trên class).

```cpp
class Base{ virtual void f(); };
class D1 : public Base{ void f() override final; };  // D1::f không thể bị override tiếp
class D2 final : public Base{};                       // không ai được kế thừa D2 nữa
```

- `explicit`, `= delete` (đã nêu ở tuần 4).

### 4.11 So sánh C++/C#/Java

|                       | C++                        | C#                                      | Java                                  |
| --------------------- | -------------------------- | --------------------------------------- | ------------------------------------- |
| Đa hình mặc định | KHÔNG (cần`virtual`)   | có nhưng cần`virtual`+`override` | **luôn đa hình mặc định** |
| Abstract              | `=0`                     | `abstract`                            | `abstract`                          |
| Đa kế thừa class   | có (multiple inheritance) | KHÔNG (chỉ single + interface)        | KHÔNG (chỉ single + interface)      |

---

<a id="tuan-6"></a>

## 5. TUẦN 6 — RELATIONSHIP & FILE PROGRAMMING

### 5.1 Các loại quan hệ giữa class (UML)

| Quan hệ                                        | Ý nghĩa                                        | Ví dụ                             | Vòng đời                                         |
| ----------------------------------------------- | ------------------------------------------------ | ----------------------------------- | --------------------------------------------------- |
| **Association**                           | 2 class biết đến nhau, dùng nhau             | `Teacher` biết `Student`       | độc lập                                          |
| **Aggregation** ("has-a", sở hữu lỏng) | 1 class chứa tham chiếu đến class khác      | `Class` chứa `Student[]`       | con tồn tại độc lập với cha                   |
| **Composition** ("has-a", sở hữu chặt) | 1 class chứa hẳn class khác làm thành phần | `Circle` chứa `Point2D Center` | con**mất theo** cha (cha hủy thì con hủy) |
| **Inheritance** ("is-a")                  | kế thừa                                        | `Square is-a Rectangle`           | —                                                  |

### 5.2 Input/Output nâng cao của C++

- `cin/cout` với các cờ định dạng: `setw()`, `setprecision()`, `fixed`, `hex`, `dec`, `left/right` (`<iomanip>`).
- Xử lý lỗi nhập: `cin.fail()`, `cin.clear()`, `cin.ignore()`.

### 5.3 File Programming (rất hay ra C2/C3)

**Text file (ifstream/ofstream):**

```cpp
#include <fstream>
ofstream fout("data.txt");     // mở để ghi (tạo mới/ghi đè)
if(fout.is_open()){
  fout << 10 << " " << 20 << endl;
  fout.close();
}
ifstream fin("data.txt");      // mở để đọc
if(fin.is_open()){
  int a, b;
  fin >> a >> b;
  fin.close();
}
```

- Chế độ mở: `ios::in`, `ios::out`, `ios::app` (ghi thêm cuối file), `ios::trunc` (xóa nội dung cũ), `ios::binary`.
- Kiểm tra hết file: `while(!fin.eof()){ ... }` (lưu ý: cách này dễ đọc dư 1 dòng cuối — nên kiểm tra ngay sau lệnh đọc: `while(fin >> a){...}`).

**Binary file (đọc/ghi struct/object nhị phân):**

```cpp
ofstream fout("data.bin", ios::binary);
fout.write((char*)&obj, sizeof(obj));
ifstream fin("data.bin", ios::binary);
fin.read((char*)&obj, sizeof(obj));
```

- Ưu điểm: nhanh, giữ nguyên định dạng số; Nhược điểm: không đọc được bằng text editor thường, không portable giữa các kiến trúc máy khác nhau.

### 5.4 Extended text file programming

- Đọc/ghi từng dòng: `getline(fin, line)`.
- Tách chuỗi (`stringstream`) để parse dữ liệu từ 1 dòng có nhiều trường.

```cpp
#include <sstream>
string line = "10 20 Circle";
stringstream ss(line);
int x, y; string name;
ss >> x >> y >> name;
```

---

<a id="tuan-7"></a>

## 6. TUẦN 7 — TEMPLATE & EXCEPTION

### 6.1 Template cho hàm

```cpp
template <typename T>
T Max(T a, T b){ return (a > b) ? a : b; }
// gọi: Max<int>(3,5); hoặc để compiler tự suy luận: Max(3,5);
```

### 6.2 Template cho class

```cpp
template <typename T>
class Stack{
  T* data; int top;
  public:
    Stack(int size);
    void push(T val);
    T pop();
};
template <typename T>
void Stack<T>::push(T val){ data[++top] = val; }   // định nghĩa method ngoài class PHẢI lặp lại template<typename T>
```

> **Bẫy viết code**: định nghĩa method của class template bên ngoài luôn phải có `template<typename T>` phía trước, và `Stack<T>::` (không phải `Stack::`).

### 6.3 Xử lý trường hợp đặc biệt (specialization)

```cpp
template <> 
class Stack<char>{  /* cài đặt riêng cho char */ };
```

### 6.4 Template với tham số không phải kiểu (non-type parameter)

```cpp
template <typename T, int SIZE>
class FixedArray{
  T data[SIZE];
};
FixedArray<int, 10> arr;
```

### 6.5 Kế thừa với class template

```cpp
template <typename T>
class Base{ /*...*/ };
template <typename T>
class Derived : public Base<T>{ /*...*/ };
```

### 6.6 Exception handling — try/catch/throw

```cpp
try{
  if(mau == 0) throw "Chia cho 0!";     // throw có thể ném bất kỳ kiểu (string, int, object exception...)
  int result = tu/mau;
}
catch(const char* msg){
  cout << "Loi: " << msg << endl;
}
catch(...){                              // catch mọi loại exception còn lại
  cout << "Loi khong xac dinh" << endl;
}
```

- **Thứ tự catch quan trọng**: catch kiểu cụ thể trước, catch tổng quát (`...` hoặc lớp cha) sau — ngược lại sẽ không bao giờ chạy tới catch cụ thể (bẫy hay ra C2).

```cpp
class MyException : public exception{
  public:
    const char* what() const throw() override { return "Loi tuy chinh"; }
};
throw MyException();
catch(exception& e){ cout << e.what(); }   // bắt bằng tham chiếu lớp cha -> đa hình
```

- **Giới hạn loại lỗi được throw**: khai báo `void f() throw(int, char*)` (C++ cũ, đã deprecated trong C++11+, nay dùng `noexcept`).
- **Memory leak khi có exception**: nếu `new` cấp phát rồi exception xảy ra trước `delete` → leak. Giải pháp: RAII (dùng destructor để tự dọn, hoặc smart pointer).
- **Constructor/Destructor & exception**: nếu constructor ném exception, object coi như **chưa được tạo xong** → destructor của nó **sẽ KHÔNG được gọi** (vì object chưa "sống").
- **Exception với kế thừa**: có thể định nghĩa exception theo cây kế thừa (`class FileNotFoundException : public IOException`), catch theo lớp cha sẽ bắt được tất cả lớp con.

---

<a id="tuan-8"></a>

## 7. TUẦN 8 — STL LIBRARY & ITERATOR PATTERN

### 7.1 Giới thiệu STL (Standard Template Library)

Gồm 3 thành phần chính: **Container** (chứa dữ liệu), **Iterator** (duyệt), **Algorithm** (xử lý).

### 7.2 Container thường gặp

| Container             | Đặc điểm                             | Thao tác chính                                 |
| --------------------- | ---------------------------------------- | ------------------------------------------------ |
| `stack<T>`          | LIFO                                     | `push, pop, top, empty`                        |
| `queue<T>`          | FIFO                                     | `push, pop, front, back`                       |
| `vector<T>`         | mảng động, random access              | `push_back, pop_back, [], size, insert, erase` |
| `list<T>`           | danh sách liên kết đôi              | `push_front, push_back, insert, erase`         |
| `set/map`           | tự sắp xếp, không trùng key         | `insert, find, erase`                          |
| `multiset/multimap` | như set/map nhưng cho phép trùng key | tương tự                                      |

### 7.3 ITERATOR DESIGN PATTERN (trọng tâm C4 tuần 8)

**Mục đích**: tách việc **duyệt (enumerate)** phần tử ra khỏi cấu trúc chứa (Container), cho phép duyệt bằng nhiều cách khác nhau mà không sửa đổi class chứa.

**Sơ đồ vai trò (theo GoF):**

- `Iterator` (interface): `First(), Next(), IsDone(), CurrentItem()`
- `Aggregate` (interface): `CreateIterator()`
- `ConcreteAggregate`: cài đặt cụ thể `CreateIterator()` → `return new ConcreteIterator(this)`
- `ConcreteIterator`: cài đặt cụ thể việc duyệt trên `ConcreteAggregate`
- `Client`: chỉ làm việc qua interface `Iterator`, không quan tâm cấu trúc lưu trữ bên trong.

**Cách STL hiện thực Iterator pattern:**

```cpp
Container<T>::iterator it = c.begin();       // begin(): trỏ tới phần tử đầu
Container<T>::const_iterator it = c.begin(); // bản const - chỉ đọc, không sửa qua iterator
while(it != c.end()){                        // end(): trỏ tới VỊ TRÍ SAU phần tử cuối
  cout << *it << " ";     // operator* lấy giá trị
  ++it;                   // operator++ trỏ tới phần tử kế tiếp
}
```

- Toán tử của Iterator: `*` (deref), `++` (next), `==`/`!=` (so sánh vị trí).
- Phân loại: **2-way scanning** (`list, set, map,...` — chỉ `++`/`--`), **Random access** (`vector, deque` — có thêm `+=, -=, <, >`).

### 7.4 General Algorithms (thư viện `<algorithm>`, `<numeric>`)

```cpp
#include <algorithm>
sort(c.begin(), c.end());
auto it = min_element(c.begin(), c.end());
auto it = max_element(c.begin(), c.end());
auto it = find(c.begin(), c.end(), 3);
reverse(c.begin(), c.end());
copy(src.begin(), src.end(), dest.begin());
```

- `<numeric>`: `accumulate()` (tính tổng).

### 7.5 Ứng dụng ví dụ: Complex number, tính biểu thức, đồ thị

- Overload các toán tử `+, -, *, /, ==` cho class `Complex` (số phức) — vận dụng lại kiến thức nạp chồng toán tử tuần 2/4.
- Bài tập tính biểu thức thường dùng **stack** để đổi trung tố → hậu tố hoặc định giá biểu thức hậu tố (postfix evaluation).
- Bài tập đồ thị: biểu diễn bằng `vector<vector<int>>` (ma trận kề) hoặc `vector<list<int>>` (danh sách kề), duyệt bằng iterator.

---

<a id="design-patterns"></a>

## 8. DESIGN PATTERNS TỔNG HỢP (C4 — thiết kế kiến trúc)

### 8.1 Singleton Pattern (tuần 4)

- **Vấn đề giải quyết**: đảm bảo chỉ có đúng 1 instance của 1 class (VD: quản lý cấu hình hệ thống, connection pool, thuật toán hiện hành).
- **Cấu trúc**: constructor `private` + con trỏ `static` + method `static getInstance()`.
- **Khi thi hỏi thiết kế**: nhận diện đề bài có từ khóa "duy nhất", "toàn cục", "chỉ 1 thể hiện" → dùng Singleton.

### 8.2 Iterator Pattern (tuần 8)

- **Vấn đề giải quyết**: cần duyệt qua tập hợp phần tử theo nhiều cách khác nhau mà **không muốn để lộ cấu trúc lưu trữ bên trong** ra ngoài, và không muốn class chứa phải tự viết logic duyệt.
- **Cấu trúc**: `Aggregate/ConcreteAggregate` (nơi chứa dữ liệu) tách biệt với `Iterator/ConcreteIterator` (nơi chứa logic duyệt).
- **Khi thi hỏi thiết kế**: đề bài có nhiều cách duyệt (theo thứ tự tăng/giảm, theo điều kiện lọc...) trên cùng 1 tập dữ liệu → tách ra Iterator riêng thay vì nhồi hết method duyệt vào class chứa.

### 8.3 Kỹ thuật thiết kế xuyên suốt hay dùng khi làm câu 4

- **Abstract class + Polymorphism**: khi có nhiều loại đối tượng "họ hàng" (VD: nhiều loại hình, nhiều loại nhân viên, nhiều loại phương tiện) cùng chia sẻ hành vi chung nhưng cài đặt khác nhau → tạo lớp trừu tượng cha định nghĩa method ảo, các lớp con override.
- **Composition/Aggregation** khi 1 object "có chứa" object khác (VD: `Company` chứa nhiều `Employee`).
- **Factory-style creation** khi cần tạo object linh động theo tên/loại nhập vào lúc runtime.
- Vẽ UML class diagram: chỉ rõ `+/-/#`, mối quan hệ (kế thừa: mũi tên tam giác rỗng; composition: hình thoi đặc; aggregation: hình thoi rỗng).

---

<a id="bay-code"></a>

## 9. CÁC BẪY CODE HAY RA THI (C2 – đọc code đoán output)

1. **`PhanSo t();`** → khai báo hàm, KHÔNG gọi constructor mặc định.
2. **Con trỏ + destructor không virtual** → `delete` qua con trỏ lớp cha chỉ gọi destructor lớp cha, không gọi lớp con → leak.
3. **Không viết copy constructor cho class có con trỏ** → 2 object share chung vùng nhớ (shallow copy) → sửa 1 object ảnh hưởng object kia; khi cả 2 bị hủy → double free / crash.
4. **Quên `virtual`** trên method của lớp cha → gọi qua con trỏ lớp cha luôn chạy hàm lớp cha (không đa hình) dù object thực sự là lớp con.
5. **Thứ tự `catch` sai** (catch tổng quát trước catch cụ thể) → nhánh catch cụ thể "chết", không bao giờ chạy.
6. **Quên `return` trong `operator>>`/`operator<<`** → không `chain` được `cin >> a >> b`.
7. **So sánh `this == &src` trong `operator=`** thiếu → tự gán cho chính mình (`a = a;`) có thể xóa dữ liệu trước khi copy lại → mất dữ liệu.
8. **`while(!fin.eof())`** đọc dư 1 lần ở cuối file → in ra phần tử cuối 2 lần hoặc phần tử rác — nên dùng `while(fin >> x)`.
9. **Biến `static` phải định nghĩa (& khởi tạo) ngoài class** (`int A::obj = NULL;`), nếu chỉ khai báo trong class sẽ lỗi linker.
10. **Constructor 1 tham số không có `explicit`** → tự động cho phép ép kiểu ngầm định — có thể gây ra hành vi ngoài ý muốn khi truyền nhầm kiểu.

---

## GHI CHÚ ÔN TẬP

- **Câu 1 (lý thuyết)**: học kỹ định nghĩa + phân biệt các khái niệm cặp đôi: `public/private/protected`, `constructor/destructor`, `virtual/non-virtual`, `aggregation/composition`, `pass-by-value/reference/address`, `abstract class/concrete class`.
- **Câu 2 (đọc code → output)**: tập trung vào mục 9 (bẫy) — đây là nguồn ra đề phổ biến nhất, đặc biệt về **con trỏ, đa hình, exception, vòng đời object**.
- **Câu 3 (viết code)**: luyện viết đủ bộ constructor/destructor/operator=/operator>>/operator<< cho 1 class có con trỏ; luyện template class cơ bản; luyện try-catch.
- **Câu 4 (thiết kế)**: nhận diện tình huống áp dụng **Singleton** hoặc **Iterator**, biết vẽ sơ đồ UML vai trò từng class trong pattern.
