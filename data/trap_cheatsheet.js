/**
 * Dữ liệu sổ tay 10 bẫy code kinh điển và tóm tắt kiến thức cốt lõi
 * Trích xuất từ tài liệu OOP_TongHop_OnThi.md (FIT-HCMUS)
 */
var TRAP_CHEATSHEET = [
  {
    id: 1,
    title: "Khai báo PhanSo t();",
    type: "Syntax & Constructor",
    description: "Khai báo `PhanSo t();` bị compiler hiểu nhầm là khai báo một HÀM tên `t` không nhận tham số và trả về `PhanSo`, KHÔNG PHẢI tạo object gọi default constructor.",
    correct: "PhanSo t; // Đúng để gọi default constructor\nPhanSo t(1, 2); // Đúng khi có tham số",
    wrong: "PhanSo t(); // SAI - Không tạo object nào cả!"
  },
  {
    id: 2,
    title: "Virtual Destructor trong kế thừa & đa hình",
    type: "Polymorphism & Memory",
    description: "Khi giải phóng object thông qua con trỏ lớp cha (`Base* p = new Derived(); delete p;`), nếu destructor của `Base` KHÔNG có từ khóa `virtual`, chỉ có `~Base()` được gọi, `~Derived()` bị bỏ qua -> rò rỉ vùng nhớ (memory leak) các tài nguyên cấp phát trong `Derived`.",
    correct: "class Base {\npublic:\n    virtual ~Base() { ... }\n};",
    wrong: "class Base {\npublic:\n    ~Base() { ... } // Nguy cơ memory leak khi delete qua Base*\n};"
  },
  {
    id: 3,
    title: "Quên Copy Constructor khi class chứa con trỏ (Rule of Three)",
    type: "Memory & Pointer",
    description: "Nếu class có con trỏ cấp phát động (`new`) mà không tự viết Copy Constructor, compiler sẽ dùng default copy (shallow copy - sao chép nông). Hai object sẽ trỏ chung 1 vùng nhớ -> khi sửa đổi một object thì object kia bị ảnh hưởng; khi cả 2 bị hủy sẽ gây lỗi 'double free' và crash chương trình.",
    correct: "MyArray::MyArray(const MyArray& src) {\n    size = src.size;\n    p = new int[size]; // Deep copy - cấp phát vùng nhớ mới\n    for(int i=0; i<size; i++) p[i] = src.p[i];\n}",
    wrong: "// Không viết copy constructor -> compiler copy con trỏ nguyên bản -> 2 con trỏ trỏ chung 1 mảng"
  },
  {
    id: 4,
    title: "Thiếu từ khóa virtual dẫn tới Early Binding",
    type: "Polymorphism",
    description: "Nếu phương thức ở lớp cha không khai báo `virtual`, trình biên dịch sẽ thực hiện Static Binding (liên kết tĩnh). Khi gọi qua con trỏ hoặc tham chiếu của lớp cha `Base* p = new Derived(); p->display();`, phương thức của `Base` luôn được gọi thay vì của `Derived`.",
    correct: "class Base {\n    virtual void display(); // Cho phép dynamic late binding\n};",
    wrong: "class Base {\n    void display(); // Không virtual -> luôn gọi Base::display\n};"
  },
  {
    id: 5,
    title: "Thứ tự các khối catch(...) bị sai",
    type: "Exception Handling",
    description: "Trong xử lý ngoại lệ `try-catch`, khối `catch` kiểu cha hoặc `catch(...)` phải đặt ở DƯỚI CÙNG. Nếu đặt `catch(BaseException&)` hoặc `catch(...)` lên đầu, nó sẽ bắt luôn tất cả ngoại lệ con, khiến các khối `catch(DerivedException&)` bên dưới thành 'dead code' không bao giờ được chạm tới.",
    correct: "try { ... }\ncatch (DerivedException& e) { /* Bắt cụ thể trước */ }\ncatch (BaseException& e) { /* Bắt cha sau */ }\ncatch (...) { /* Bắt mọi loại còn lại cuối cùng */ }",
    wrong: "try { ... }\ncatch (...) { /* Đặt đầu sẽ nuốt chửng mọi lỗi phía dưới */ }\ncatch (DerivedException& e) { /* Không bao giờ chạy tới */ }"
  },
  {
    id: 6,
    title: "Quên return trong operator>> và operator<<",
    type: "Operator Overloading",
    description: "Toán tử nhập `operator>>` và xuất `operator<<` bắt buộc phải trả về tham chiếu đến stream (`istream&` và `ostream&`) để hỗ trợ tính chất chuỗi (chaining), ví dụ: `cin >> a >> b;` hay `cout << a << b << endl;`.",
    correct: "ostream& operator<<(ostream& os, const Point& p) {\n    os << '(' << p.x << ',' << p.y << ')';\n    return os; // BẮT BUỘC để chain cout << p1 << p2;\n}",
    wrong: "void operator<<(ostream& os, const Point& p) {\n    os << '(' << p.x << ',' << p.y << ')';\n    // Không return -> Không thể viết cout << p << endl;\n}"
  },
  {
    id: 7,
    title: "Quên kiểm tra tự gán (this == &src) trong operator=",
    type: "Operator Overloading",
    description: "Trong toán tử gán `operator=`, nếu người dùng viết `a = a;` mà không kiểm tra `if(this == &src) return *this;`, lệnh `delete[] p;` sẽ giải phóng chính dữ liệu nguồn trước khi sao chép -> dữ liệu bị hủy hoại hoàn toàn.",
    correct: "MyArray& operator=(const MyArray& src) {\n    if(this == &src) return *this; // BẮT BUỘC check tự gán\n    delete[] p; // Sau đó mới dọn bộ nhớ cũ\n    size = src.size;\n    p = new int[size];\n    for(int i=0; i<size; i++) p[i] = src.p[i];\n    return *this;\n}",
    wrong: "MyArray& operator=(const MyArray& src) {\n    delete[] p; // Nếu src là chính *this -> xóa mất tiêu dữ liệu để copy!\n    p = new int[src.size];\n    ...\n}"
  },
  {
    id: 8,
    title: "Vòng lặp đọc file while(!fin.eof()) bị đọc dư 1 lần",
    type: "File I/O",
    description: "Cờ `eof` chỉ được bật SAU KHI một thao tác đọc thất bại do chạm đáy file. Do đó `while(!fin.eof())` sẽ làm vòng lặp chạy thêm 1 lần thừa ở cuối, in ra phần tử cuối 2 lần hoặc dữ liệu rác. Cách chuẩn nhất là kiểm tra trực tiếp kết quả đọc.",
    correct: "int x;\nwhile(fin >> x) { // Đúng chuẩn: chỉ xử lý khi đọc thành công\n    cout << x << ' ';\n}",
    wrong: "while(!fin.eof()) { // Nguy cơ lặp dư 1 lần ở cuối\n    fin >> x;\n    cout << x << ' ';\n}"
  },
  {
    id: 9,
    title: "Biến static chỉ khai báo mà không định nghĩa ngoài class",
    type: "Static Member",
    description: "Biến thành viên `static` chỉ được khai báo (declare) bên trong class. Bắt buộc phải có một dòng định nghĩa (define) và khởi tạo ở phạm vi toàn cục bên ngoài class (trong file `.cpp`), nếu không sẽ gây lỗi `Undefined Reference` lúc Linker liên kết.",
    correct: "// Trong file .h\nclass Counter { static int count; };\n// Trong file .cpp\nint Counter::count = 0; // Định nghĩa biến static bắt buộc!",
    wrong: "// Chỉ khai báo trong class nhưng không định nghĩa ngoài .cpp -> Lỗi Linker"
  },
  {
    id: 10,
    title: "Constructor 1 tham số gây ép kiểu ngầm định ngoài ý muốn",
    type: "Constructor & Type Casting",
    description: "Constructor nhận 1 tham số nếu không có từ khóa `explicit` sẽ vô tình trở thành toán tử chuyển kiểu ngầm định (implicit conversion). Ví dụ `PhanSo(int t)` cho phép viết `PhanSo p = 5;` hoặc truyền `int` vào hàm nhận `PhanSo`, có thể gây nhầm lẫn logic khó debug.",
    correct: "class PhanSo {\npublic:\n    explicit PhanSo(int t) : tu(t), mau(1) {} // Cấm ép kiểu ngầm\n};",
    wrong: "class PhanSo {\npublic:\n    PhanSo(int t) : tu(t), mau(1) {} // Cho phép ép kiểu ngầm int -> PhanSo\n};"
  }
];
