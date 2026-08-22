/**
 * DẠNG 3: NGÂN HÀNG BÀI TẬP VIẾT CODE C++ (IMPLEMENTATION / CODING PROBLEMS - 3.0 ĐIỂM)
 * Bao quát toàn bộ kiến thức Slide Tuần 2 → 8 (FIT-HCMUS)
 * Phân bổ chi tiết từ Quản lý bộ nhớ, Rule of Three, Kế thừa, Đa hình, File I/O, Template, Exception đến STL.
 */

var CODE_WRITING_BANK = [
  // =========================================================================
  // CHƯƠNG 2, 3, 4: CLASS, QUẢN LÝ BỘ NHỚ & RULE OF THREE (Bài 1 - Bài 4)
  // =========================================================================
  {
    id: "write_1",
    number: 1,
    chapter: "ch2_4",
    chapterName: "Chương 2-4: Rule of Three & Cấp Phát Động",
    difficulty: "hard",
    points: "3.0 điểm",
    title: "Bài 1: Xây Dựng Lớp MyString Hoàn Chỉnh (Rule of Three & Operator Overloading)",
    description: `Xây dựng lớp \`MyString\` để quản lý chuỗi ký tự động (không dùng \`std::string\`).
Yêu cầu kỹ thuật bắt buộc:
1. Thuộc tính: \`char* buffer\` và \`int length\`.
2. Constructor mặc định (tạo chuỗi rỗng), Parameterized Constructor từ \`const char*\`.
3. **Bộ 3 hàm kinh điển (Rule of Three)**: Destructor (giải phóng vùng nhớ), Copy Constructor (sao chép sâu), Copy Assignment Operator \`operator=\` (có kiểm tra tự gán và giải phóng bộ nhớ cũ).
4. Nạp chồng toán tử nối chuỗi \`operator+\`, toán tử truy xuất \`operator[]\` (có kiểm tra chỉ số hợp lệ), và toán tử nhập xuất stream \`operator>>\`, \`operator<<\`.`,
    checklist: [
      { id: "c1", text: "Constructor mặc định & Constructor từ `const char*` cấp phát động chính xác (+0.5đ)", points: 0.5 },
      { id: "c2", text: "Destructor giải phóng `delete[] buffer` an toàn (+0.5đ)", points: 0.5 },
      { id: "c3", text: "Copy Constructor thực hiện sao chép sâu (Deep Copy) (+0.5đ)", points: 0.5 },
      { id: "c4", text: "Operator= kiểm tra tự gán `if (this == &other)` và giải phóng vùng nhớ cũ (+0.5đ)", points: 0.5 },
      { id: "c5", text: "Nạp chồng `operator[]` trả về tham chiếu và `operator+` nối chuỗi (+0.5đ)", points: 0.5 },
      { id: "c6", text: "Nạp chồng `operator<<` và `operator>>` trả về stream reference (+0.5đ)", points: 0.5 }
    ],
    starterCode: `#include <iostream>
#include <cstring>
using namespace std;

class MyString {
private:
    char* buffer;
    int length;
public:
    // 1. Constructors
    MyString();
    MyString(const char* str);

    // 2. Rule of Three
    ~MyString();
    MyString(const MyString& other);
    MyString& operator=(const MyString& other);

    // 3. Operators
    char& operator[](int index);
    const char& operator[](int index) const;
    MyString operator+(const MyString& other) const;

    // 4. Stream Operators
    friend ostream& operator<<(ostream& os, const MyString& str);
    friend istream& operator>>(istream& is, MyString& str);

    int getLength() const { return length; }
};

// TODO: Cài đặt chi tiết các phương thức ở đây...
`,
    solutionCode: `#include <iostream>
#include <cstring>
using namespace std;

class MyString {
private:
    char* buffer;
    int length;
public:
    // 1. Constructor mặc định: Tạo chuỗi rỗng hợp lệ
    MyString() {
        length = 0;
        buffer = new char[1];
        buffer[0] = '\\0';
    }

    // Constructor từ const char*
    MyString(const char* str) {
        if (str) {
            length = strlen(str);
            buffer = new char[length + 1];
            strcpy(buffer, str);
        } else {
            length = 0;
            buffer = new char[1];
            buffer[0] = '\\0';
        }
    }

    // 2. Destructor
    ~MyString() {
        delete[] buffer;
        buffer = nullptr;
    }

    // 3. Copy Constructor (Sao chép sâu - Deep Copy)
    MyString(const MyString& other) {
        length = other.length;
        buffer = new char[length + 1];
        strcpy(buffer, other.buffer);
    }

    // 4. Copy Assignment Operator (Toán tử gán bằng)
    MyString& operator=(const MyString& other) {
        // Kiểm tra tự gán (Self-assignment check)
        if (this != &other) {
            delete[] buffer; // Giải phóng vùng nhớ cũ
            length = other.length;
            buffer = new char[length + 1];
            strcpy(buffer, other.buffer);
        }
        return *this;
    }

    // 5. Toán tử truy xuất phần tử operator[]
    char& operator[](int index) {
        return buffer[index];
    }

    const char& operator[](int index) const {
        return buffer[index];
    }

    // 6. Toán tử nối chuỗi operator+
    MyString operator+(const MyString& other) const {
        MyString result;
        delete[] result.buffer;
        result.length = length + other.length;
        result.buffer = new char[result.length + 1];
        strcpy(result.buffer, buffer);
        strcat(result.buffer, other.buffer);
        return result;
    }

    // 7. Toán tử xuất stream <<
    friend ostream& operator<<(ostream& os, const MyString& str) {
        os << (str.buffer ? str.buffer : "");
        return os;
    }

    // 8. Toán tử nhập stream >>
    friend istream& operator>>(istream& is, MyString& str) {
        char temp[1024];
        if (is >> temp) {
            str = MyString(temp);
        }
        return is;
    }

    int getLength() const { return length; }
};`
  },
  {
    id: "write_2",
    number: 2,
    chapter: "ch2_4",
    chapterName: "Chương 2-4: Lớp Động & Toán Tử Số Học",
    difficulty: "medium",
    points: "3.0 điểm",
    title: "Bài 2: Xây Dựng Lớp VectorND (Mảng Động N Chiều)",
    description: `Xây dựng lớp \`VectorND\` biểu diễn vector trong không gian $N$ chiều:
1. Thuộc tính: \`int dimension\` và con trỏ \`double* coords\`.
2. Hỗ trợ Constructor mặc định, Constructor khởi tạo $N$ phần tử với giá trị mặc định $0.0$.
3. Tuân thủ **Rule of Three**: Destructor, Copy Constructor, Operator=.
4. Nạp chồng toán tử cộng 2 vector cùng số chiều \`operator+\`, tích vô hướng \`dotProduct()\`, và \`operator<<\`.`,
    checklist: [
      { id: "c1", text: "Khởi tạo vùng nhớ mảng động `coords = new double[dimension]` (+0.5đ)", points: 0.5 },
      { id: "c2", text: "Destructor giải phóng `delete[] coords` (+0.5đ)", points: 0.5 },
      { id: "c3", text: "Copy Constructor & Operator= sao chép sâu và kiểm tra tự gán (+1.0đ)", points: 1.0 },
      { id: "c4", text: "Nạp chồng `operator+` cộng từng phần tử và kiểm tra cùng số chiều (+0.5đ)", points: 0.5 },
      { id: "c5", text: "Toán tử `operator<<` in định dạng `(x1, x2, ..., xN)` (+0.5đ)", points: 0.5 }
    ],
    starterCode: `#include <iostream>
using namespace std;

class VectorND {
private:
    int dim;
    double* coords;
public:
    VectorND(int n = 0);
    ~VectorND();
    VectorND(const VectorND& other);
    VectorND& operator=(const VectorND& other);

    VectorND operator+(const VectorND& other) const;
    double dot(const VectorND& other) const;

    friend ostream& operator<<(ostream& os, const VectorND& v);
};
`,
    solutionCode: `#include <iostream>
using namespace std;

class VectorND {
private:
    int dim;
    double* coords;
public:
    VectorND(int n = 0) : dim(n) {
        if (dim > 0) {
            coords = new double[dim]();
        } else {
            dim = 0;
            coords = nullptr;
        }
    }

    ~VectorND() {
        delete[] coords;
        coords = nullptr;
    }

    VectorND(const VectorND& other) : dim(other.dim) {
        if (dim > 0) {
            coords = new double[dim];
            for (int i = 0; i < dim; ++i) coords[i] = other.coords[i];
        } else {
            coords = nullptr;
        }
    }

    VectorND& operator=(const VectorND& other) {
        if (this != &other) {
            delete[] coords;
            dim = other.dim;
            if (dim > 0) {
                coords = new double[dim];
                for (int i = 0; i < dim; ++i) coords[i] = other.coords[i];
            } else {
                coords = nullptr;
            }
        }
        return *this;
    }

    VectorND operator+(const VectorND& other) const {
        if (dim != other.dim) return VectorND();
        VectorND res(dim);
        for (int i = 0; i < dim; ++i) {
            res.coords[i] = coords[i] + other.coords[i];
        }
        return res;
    }

    double dot(const VectorND& other) const {
        if (dim != other.dim) return 0.0;
        double sum = 0.0;
        for (int i = 0; i < dim; ++i) {
            sum += coords[i] * other.coords[i];
        }
        return sum;
    }

    friend ostream& operator<<(ostream& os, const VectorND& v) {
        os << "(";
        for (int i = 0; i < v.dim; ++i) {
            os << v.coords[i] << (i < v.dim - 1 ? ", " : "");
        }
        os << ")";
        return os;
    }
};`
  },
  {
    id: "write_3",
    number: 3,
    chapter: "ch2_4",
    chapterName: "Chương 2-4: Nạp Chồng Toán Tử Toàn Diện",
    difficulty: "easy",
    points: "3.0 điểm",
    title: "Bài 3: Xây Dựng Lớp PhanSo Chuẩn Hóa & Toán Tử Rút Gọn",
    description: `Xây dựng lớp \`PhanSo\` hoàn chỉnh:
1. Thuộc tính: \`int tu, mau\` (\`mau != 0\`).
2. Hàm tiện ích rút gọn phân số bằng thuật toán tìm ƯCLN (GCD).
3. Nạp chồng các toán tử: \`+\`, \`-\`, \`*\`, \`/\`, so sánh \`==\`, \`<\`, và toán tử stream \`>>\`, \`<<\`.`,
    checklist: [
      { id: "c1", text: "Constructor kiểm tra mẫu khác 0 và tự động chuẩn hóa dấu/rút gọn (+0.5đ)", points: 0.5 },
      { id: "c2", text: "Nạp chồng 4 toán tử số học `+`, `-`, `*`, `/` (+1.0đ)", points: 1.0 },
      { id: "c3", text: "Nạp chồng toán tử so sánh `==` và `<` (+0.5đ)", points: 0.5 },
      { id: "c4", text: "Nạp chồng `operator<<` (xuất dạng `tu/mau` hoặc `tu` nếu mẫu là 1) (+0.5đ)", points: 0.5 },
      { id: "c5", text: "Nạp chồng `operator>>` nhập từ bàn phím an toàn (+0.5đ)", points: 0.5 }
    ],
    starterCode: `#include <iostream>
using namespace std;

class PhanSo {
private:
    int tu, mau;
    int gcd(int a, int b);
    void rutGon();
public:
    PhanSo(int t = 0, int m = 1);
    PhanSo operator+(const PhanSo& p) const;
    PhanSo operator-(const PhanSo& p) const;
    PhanSo operator*(const PhanSo& p) const;
    PhanSo operator/(const PhanSo& p) const;
    bool operator==(const PhanSo& p) const;
    bool operator<(const PhanSo& p) const;

    friend ostream& operator<<(ostream& os, const PhanSo& p);
    friend istream& operator>>(istream& is, PhanSo& p);
};
`,
    solutionCode: `#include <iostream>
#include <cmath>
using namespace std;

class PhanSo {
private:
    int tu, mau;

    int gcd(int a, int b) {
        a = abs(a); b = abs(b);
        while (b != 0) {
            int r = a % b;
            a = b;
            b = r;
        }
        return a == 0 ? 1 : a;
    }

    void rutGon() {
        if (mau < 0) {
            tu = -tu;
            mau = -mau;
        }
        int g = gcd(tu, mau);
        tu /= g;
        mau /= g;
    }

public:
    PhanSo(int t = 0, int m = 1) : tu(t), mau(m == 0 ? 1 : m) {
        rutGon();
    }

    PhanSo operator+(const PhanSo& p) const {
        return PhanSo(tu * p.mau + p.tu * mau, mau * p.mau);
    }

    PhanSo operator-(const PhanSo& p) const {
        return PhanSo(tu * p.mau - p.tu * mau, mau * p.mau);
    }

    PhanSo operator*(const PhanSo& p) const {
        return PhanSo(tu * p.tu, mau * p.mau);
    }

    PhanSo operator/(const PhanSo& p) const {
        return PhanSo(tu * p.mau, mau * p.tu);
    }

    bool operator==(const PhanSo& p) const {
        return tu == p.tu && mau == p.mau;
    }

    bool operator<(const PhanSo& p) const {
        return (tu * p.mau) < (p.tu * mau);
    }

    friend ostream& operator<<(ostream& os, const PhanSo& p) {
        if (p.mau == 1) os << p.tu;
        else os << p.tu << "/" << p.mau;
        return os;
    }

    friend istream& operator>>(istream& is, PhanSo& p) {
        is >> p.tu >> p.mau;
        if (p.mau == 0) p.mau = 1;
        p.rutGon();
        return is;
    }
};`
  },
  {
    id: "write_4",
    number: 4,
    chapter: "ch2_4",
    chapterName: "Chương 2-4: Tiền Tố & Hậu Tố",
    difficulty: "medium",
    points: "3.0 điểm",
    title: "Bài 4: Xây Dựng Lớp Time Với Toán Tử Tăng Giảm ++, --",
    description: `Xây dựng lớp \`Time\` biểu diễn thời gian (giờ, phút, giây):
1. Thuộc tính: \`int hour, minute, second\`.
2. Hàm chuẩn hóa thời gian khi giây $\ge 60$ hoặc phút $\ge 60$.
3. Nạp chồng toán tử tăng 1 giây: \`operator++()\` (tiền tố) và \`operator++(int)\` (hậu tố).
4. Nạp chồng toán tử xuất \`operator<<\` định dạng \`HH:MM:SS\`.`,
    checklist: [
      { id: "c1", text: "Constructor và hàm chuẩn hóa giờ/phút/giây chính xác (+0.5đ)", points: 0.5 },
      { id: "c2", text: "Nạp chồng Prefix `operator++()` tăng 1 giây và trả về `*this` (+1.0đ)", points: 1.0 },
      { id: "c3", text: "Nạp chồng Postfix `operator++(int)` lưu temp, tăng 1 giây và trả về temp (+1.0đ)", points: 1.0 },
      { id: "c4", text: "Toán tử `operator<<` in đủ 2 chữ số với `setw` / `setfill` (+0.5đ)", points: 0.5 }
    ],
    starterCode: `#include <iostream>
#include <iomanip>
using namespace std;

class Time {
private:
    int h, m, s;
    void normalize();
public:
    Time(int h = 0, int m = 0, int s = 0);
    Time& operator++();    // Prefix
    Time operator++(int);   // Postfix

    friend ostream& operator<<(ostream& os, const Time& t);
};
`,
    solutionCode: `#include <iostream>
#include <iomanip>
using namespace std;

class Time {
private:
    int h, m, s;

    void normalize() {
        if (s >= 60) {
            m += s / 60;
            s %= 60;
        }
        if (m >= 60) {
            h += m / 60;
            m %= 60;
        }
        h %= 24;
    }

public:
    Time(int h = 0, int m = 0, int s = 0) : h(h), m(m), s(s) {
        normalize();
    }

    // Prefix ++: Tăng 1 giây và trả về tham chiếu đối tượng đã tăng
    Time& operator++() {
        s++;
        normalize();
        return *this;
    }

    // Postfix ++: Lưu bản sao cũ, tăng 1 giây và trả về bản sao cũ
    Time operator++(int) {
        Time temp = *this;
        s++;
        normalize();
        return temp;
    }

    friend ostream& operator<<(ostream& os, const Time& t) {
        os << setfill('0') << setw(2) << t.h << ":"
           << setw(2) << t.m << ":"
           << setw(2) << t.s;
        return os;
    }
};`
  },

  // =========================================================================
  // CHƯƠNG 5: KẾ THỪA, ĐA HÌNH & LỚP QUẢN LÝ (Bài 5 - Bài 8)
  // =========================================================================
  {
    id: "write_5",
    number: 5,
    chapter: "ch5",
    chapterName: "Chương 5: Kế Thừa & Mảng Con Trỏ Đa Hình",
    difficulty: "hard",
    points: "3.0 điểm",
    title: "Bài 5: Hệ Thống Nhân Viên Đa Hình & Lớp Quản Lý Công Ty",
    description: `Thiết kế hệ thống quản lý lương nhân viên cho một công ty:
1. Lớp cơ sở trừu tượng \`NhanVien\`: có thuộc tính \`string maNV, hoTen\`, \`virtual ~NhanVien()\`, và hàm thuần ảo \`virtual double tinhLuong() const = 0;\`.
2. Lớp \`NhanVienVanPhong\` kế thừa \`NhanVien\`: có thêm \`luongCoBan, soNgayLamViec\` $\rightarrow$ $\text{Lương} = \text{luongCoBan} + \text{soNgayLamViec} \times 150000$.
3. Lớp \`NhanVienSanXuat\` kế thừa \`NhanVien\`: có thêm \`soSanPham\` $\rightarrow$ $\text{Lương} = \text{soSanPham} \times 20000$.
4. Lớp quản lý \`CongTy\`: chứa danh sách con trỏ đa hình \`vector<NhanVien*>\`, hàm \`themNV()\`, hàm \`tongLuong()\`, hàm \`timNVLuongCaoNhat()\`, và destructor giải phóng toàn bộ con trỏ.`,
    checklist: [
      { id: "c1", text: "Lớp cơ sở `NhanVien` có `virtual ~NhanVien()` và hàm ảo thuần túy `tinhLuong() = 0` (+0.5đ)", points: 0.5 },
      { id: "c2", text: "Lớp con `NhanVienVanPhong` & `NhanVienSanXuat` kế thừa và override `tinhLuong()` chuẩn xác (+0.5đ)", points: 0.5 },
      { id: "c3", text: "Lớp `CongTy` sử dụng `vector<NhanVien*>` quản lý đối tượng đa hình (+0.5đ)", points: 0.5 },
      { id: "c4", text: "Hàm `tongLuong()` duyệt đa hình gọi `nv->tinhLuong()` (+0.5đ)", points: 0.5 },
      { id: "c5", text: "Hàm `timNVLuongCaoNhat()` tìm đúng nhân viên có lương cao nhất (+0.5đ)", points: 0.5 },
      { id: "c6", text: "Destructor của `CongTy` duyệt vòng lặp `delete nv` giải phóng bộ nhớ tránh rò rỉ (+0.5đ)", points: 0.5 }
    ],
    starterCode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// 1. Abstract Base Class
class NhanVien {
protected:
    string maNV, hoTen;
public:
    NhanVien(string ma, string ten) : maNV(ma), hoTen(ten) {}
    virtual ~NhanVien() {}
    virtual double tinhLuong() const = 0;
    virtual void xuat() const;
    string getHoTen() const { return hoTen; }
};

// 2. Derived Classes
// TODO: NhanVienVanPhong, NhanVienSanXuat

// 3. Manager Class
class CongTy {
private:
    vector<NhanVien*> danhSach;
public:
    ~CongTy();
    void themNV(NhanVien* nv);
    double tinhTongLuong() const;
    NhanVien* timLuongCaoNhat() const;
};
`,
    solutionCode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

// 1. Abstract Base Class
class NhanVien {
protected:
    string maNV, hoTen;
public:
    NhanVien(string ma, string ten) : maNV(ma), hoTen(ten) {}
    virtual ~NhanVien() {} // BẮT BUỘC có Virtual Destructor
    
    virtual double tinhLuong() const = 0; // Pure virtual function

    virtual void xuat() const {
        cout << "[" << maNV << "] " << hoTen << " - Luong: " << (long long)tinhLuong() << " VND" << endl;
    }

    string getHoTen() const { return hoTen; }
};

// 2. Nhân viên văn phòng
class NhanVienVanPhong : public NhanVien {
private:
    double luongCoBan;
    int soNgayLamViec;
public:
    NhanVienVanPhong(string ma, string ten, double lcb, int ngay)
        : NhanVien(ma, ten), luongCoBan(lcb), soNgayLamViec(ngay) {}

    double tinhLuong() const override {
        return luongCoBan + soNgayLamViec * 150000.0;
    }
};

// 3. Nhân viên sản xuất
class NhanVienSanXuat : public NhanVien {
private:
    int soSanPham;
public:
    NhanVienSanXuat(string ma, string ten, int sp)
        : NhanVien(ma, ten), soSanPham(sp) {}

    double tinhLuong() const override {
        return soSanPham * 20000.0;
    }
};

// 4. Lớp quản lý Công Ty
class CongTy {
private:
    vector<NhanVien*> danhSach;
public:
    ~CongTy() {
        for (NhanVien* nv : danhSach) {
            delete nv; // Giải phóng từng con trỏ
        }
        danhSach.clear();
    }

    void themNV(NhanVien* nv) {
        if (nv) danhSach.push_back(nv);
    }

    double tinhTongLuong() const {
        double tong = 0;
        for (const NhanVien* nv : danhSach) {
            tong += nv->tinhLuong(); // Lời gọi đa hình
        }
        return tong;
    }

    NhanVien* timLuongCaoNhat() const {
        if (danhSach.empty()) return nullptr;
        NhanVien* maxNV = danhSach[0];
        for (NhanVien* nv : danhSach) {
            if (nv->tinhLuong() > maxNV->tinhLuong()) {
                maxNV = nv;
            }
        }
        return maxNV;
    }
};`
  },
  {
    id: "write_6",
    number: 6,
    chapter: "ch5",
    chapterName: "Chương 5: Phân Cấp Hình Học (Shape Hierarchy)",
    difficulty: "medium",
    points: "3.0 điểm",
    title: "Bài 6: Phân Cấp Lớp Hình Học (Shape Hierarchy) & Tính Diện Tích Đa Hình",
    description: `Thiết kế cây phân cấp hình học:
1. Lớp cơ sở \`Shape\` có phương thức ảo thuần túy \`virtual double area() const = 0\` và \`virtual double perimeter() const = 0\`.
2. Lớp \`Circle\` (bán kính $r$) và lớp \`Rectangle\` (chiều dài $w$, rộng $h$).
3. Viết hàm toàn cục \`double totalArea(const vector<Shape*>& shapes)\` tính tổng diện tích của tất cả các hình trong mảng.`,
    checklist: [
      { id: "c1", text: "Khai báo `virtual ~Shape()` và 2 hàm thuần ảo `area()`, `perimeter()` (+0.5đ)", points: 0.5 },
      { id: "c2", text: "Cài đặt lớp `Circle` tính diện tích $\\pi r^2$ và chu vi $2\\pi r$ (+0.5đ)", points: 0.5 },
      { id: "c3", text: "Cài đặt lớp `Rectangle` tính diện tích $w \\times h$ và chu vi $2(w+h)$ (+0.5đ)", points: 0.5 },
      { id: "c4", text: "Cài đặt hàm `totalArea` duyệt đa hình con trỏ `Shape*` (+1.0đ)", points: 1.0 },
      { id: "c5", text: "Sử dụng từ khóa `override` và `const` đúng chuẩn (+0.5đ)", points: 0.5 }
    ],
    starterCode: `#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

class Shape {
public:
    virtual ~Shape() {}
    virtual double area() const = 0;
    virtual double perimeter() const = 0;
};

// TODO: Circle & Rectangle

double totalArea(const vector<Shape*>& shapes);
`,
    solutionCode: `#include <iostream>
#include <vector>
#include <cmath>
using namespace std;

const double PI = 3.141592653589793;

class Shape {
public:
    virtual ~Shape() {}
    virtual double area() const = 0;
    virtual double perimeter() const = 0;
};

class Circle : public Shape {
private:
    double r;
public:
    Circle(double radius) : r(radius) {}
    double area() const override { return PI * r * r; }
    double perimeter() const override { return 2 * PI * r; }
};

class Rectangle : public Shape {
private:
    double w, h;
public:
    Rectangle(double width, double height) : w(width), h(height) {}
    double area() const override { return w * h; }
    double perimeter() const override { return 2 * (w + h); }
};

double totalArea(const vector<Shape*>& shapes) {
    double sum = 0.0;
    for (const Shape* s : shapes) {
        if (s) sum += s->area();
    }
    return sum;
}`
  },
  {
    id: "write_7",
    number: 7,
    chapter: "ch5",
    chapterName: "Chương 5: Kế Thừa Tài Khoản Ngân Hàng",
    difficulty: "medium",
    points: "3.0 điểm",
    title: "Bài 7: Hệ Thống Tài Khoản Ngân Hàng (Account Hierarchy)",
    description: `Thiết kế hệ thống tài khoản ngân hàng:
1. Lớp \`Account\`: số tài khoản, số dư, hàm \`deposit(amount)\`, \`virtual bool withdraw(amount)\`.
2. Lớp \`SavingsAccount\`: có thêm lãi suất \`interestRate\`, hàm \`calculateInterest()\`.
3. Lớp \`CheckingAccount\`: có phí giao dịch \`fee\`, trừ phí mỗi khi rút tiền thành công.`,
    checklist: [
      { id: "c1", text: "Lớp `Account` kiểm tra số tiền gửi/rút hợp lệ (+0.5đ)", points: 0.5 },
      { id: "c2", text: "Lớp `SavingsAccount` tính đúng lãi suất theo số dư (+1.0đ)", points: 1.0 },
      { id: "c3", text: "Lớp `CheckingAccount` trừ phí giao dịch chính xác khi rút tiền (+1.0đ)", points: 1.0 },
      { id: "c4", text: "Khai báo `virtual ~Account()` và virtual methods chuẩn xác (+0.5đ)", points: 0.5 }
    ],
    starterCode: `#include <iostream>
#include <string>
using namespace std;

class Account {
protected:
    string accNumber;
    double balance;
public:
    Account(string acc, double bal = 0);
    virtual ~Account() {}
    virtual void deposit(double amount);
    virtual bool withdraw(double amount);
    double getBalance() const { return balance; }
};
`,
    solutionCode: `#include <iostream>
#include <string>
using namespace std;

class Account {
protected:
    string accNumber;
    double balance;
public:
    Account(string acc, double bal = 0) : accNumber(acc), balance(bal >= 0 ? bal : 0) {}
    virtual ~Account() {}

    virtual void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    virtual bool withdraw(double amount) {
        if (amount > 0 && balance >= amount) {
            balance -= amount;
            return true;
        }
        return false;
    }

    double getBalance() const { return balance; }
};

class SavingsAccount : public Account {
private:
    double interestRate; // Ví dụ: 0.05 (5%)
public:
    SavingsAccount(string acc, double bal, double rate)
        : Account(acc, bal), interestRate(rate) {}

    double calculateInterest() const {
        return balance * interestRate;
    }
};

class CheckingAccount : public Account {
private:
    double fee; // Phí mỗi lần rút
public:
    CheckingAccount(string acc, double bal, double feePerTx)
        : Account(acc, bal), fee(feePerTx) {}

    bool withdraw(double amount) override {
        double total = amount + fee;
        if (amount > 0 && balance >= total) {
            balance -= total;
            return true;
        }
        return false;
    }
};`
  },
  {
    id: "write_8",
    number: 8,
    chapter: "ch5",
    chapterName: "Chương 5: Đa Hình & Game Entity",
    difficulty: "medium",
    points: "3.0 điểm",
    title: "Bài 8: Hệ Thống Nhân Vật Game (Warrior, Mage & Battle Arena)",
    description: `Thiết kế hệ thống thực thể trong game RPG:
1. Lớp trừu tượng \`Character\`: \`name\`, \`hp\`, \`attackPower\`, phương thức ảo thuần túy \`virtual void attack(Character& target) = 0\`.
2. Lớp \`Warrior\`: khi tấn công gây sát thương vật lý trực tiếp = \`attackPower\`.
3. Lớp \`Mage\`: có \`mana\`, nếu \`mana >= 10\` gây sát thương phép gấp đôi $2 \times \text{attackPower}$ và trừ 10 mana; nếu không đủ mana chỉ gây $0.5 \times \text{attackPower}$.`,
    checklist: [
      { id: "c1", text: "Abstract base class `Character` có `virtual ~Character()` (+0.5đ)", points: 0.5 },
      { id: "c2", text: "Phương thức `takeDamage()` trừ máu an toàn không âm (+0.5đ)", points: 0.5 },
      { id: "c3", text: "Lớp `Warrior` cài đặt hành vi tấn công vật lý (+0.5đ)", points: 0.5 },
      { id: "c4", text: "Lớp `Mage` kiểm tra và trừ mana khi dùng skill phép thuật (+1.0đ)", points: 1.0 },
      { id: "c5", text: "Đảm bảo tính đa hình qua tham chiếu `Character&` (+0.5đ)", points: 0.5 }
    ],
    starterCode: `#include <iostream>
#include <string>
using namespace std;

class Character {
protected:
    string name;
    int hp;
    int atk;
public:
    Character(string n, int h, int a) : name(n), hp(h), atk(a) {}
    virtual ~Character() {}
    virtual void attack(Character& target) = 0;
    void takeDamage(int dmg);
    bool isAlive() const { return hp > 0; }
};
`,
    solutionCode: `#include <iostream>
#include <string>
using namespace std;

class Character {
protected:
    string name;
    int hp;
    int atk;
public:
    Character(string n, int h, int a) : name(n), hp(h), atk(a) {}
    virtual ~Character() {}

    virtual void attack(Character& target) = 0;

    void takeDamage(int dmg) {
        hp -= dmg;
        if (hp < 0) hp = 0;
        cout << name << " mat " << dmg << " HP, con lai " << hp << " HP" << endl;
    }

    bool isAlive() const { return hp > 0; }
    string getName() const { return name; }
};

class Warrior : public Character {
public:
    Warrior(string n, int h, int a) : Character(n, h, a) {}

    void attack(Character& target) override {
        cout << name << " chem " << target.getName() << " bang kiem!" << endl;
        target.takeDamage(atk);
    }
};

class Mage : public Character {
private:
    int mana;
public:
    Mage(string n, int h, int a, int m) : Character(n, h, a), mana(m) {}

    void attack(Character& target) override {
        if (mana >= 10) {
            mana -= 10;
            cout << name << " phong hoa cau vao " << target.getName() << " (x2 damage)!" << endl;
            target.takeDamage(atk * 2);
        } else {
            cout << name << " het mana, danh thuong vao " << target.getName() << endl;
            target.takeDamage(atk / 2);
        }
    }
};`
  },

  // =========================================================================
  // CHƯƠNG 6: QUAN HỆ LỚP & FILE I/O (Bài 9 - Bài 10)
  // =========================================================================
  {
    id: "write_9",
    number: 9,
    chapter: "ch6",
    chapterName: "Chương 6: File I/O Nhị Phân (Binary File)",
    difficulty: "hard",
    points: "3.0 điểm",
    title: "Bài 9: Đọc Ghi Đối Tượng Vào File Nhị Phân (Binary File I/O)",
    description: `Xây dựng hệ thống lưu trữ sinh viên vào file nhị phân:
1. \`struct Student\`: \`int id\`, \`char name[50]\`, \`double gpa\`.
2. Hàm \`void writeToFile(const string& filename, const vector<Student>& list)\` sử dụng \`ofstream\` với cờ \`ios::binary\` và phương thức \`write()\`.
3. Hàm \`vector<Student> readFromFile(const string& filename)\` sử dụng \`ifstream\` với cờ \`ios::binary\` và phương thức \`read()\`.`,
    checklist: [
      { id: "c1", text: "Mở file với chế độ nhị phân `ios::binary` chính xác (+0.5đ)", points: 0.5 },
      { id: "c2", text: "Ghi số lượng bản ghi và từng struct bằng `out.write((char*)&s, sizeof(s))` (+1.0đ)", points: 1.0 },
      { id: "c3", text: "Đọc file nhị phân bằng `in.read((char*)&s, sizeof(s))` và kiểm tra EOF an toàn (+1.0đ)", points: 1.0 },
      { id: "c4", text: "Đóng file sau khi hoàn tất thao tác (+0.5đ)", points: 0.5 }
    ],
    starterCode: `#include <iostream>
#include <fstream>
#include <vector>
#include <string>
using namespace std;

struct Student {
    int id;
    char name[50];
    double gpa;
};

void writeToFile(const string& filename, const vector<Student>& list);
vector<Student> readFromFile(const string& filename);
`,
    solutionCode: `#include <iostream>
#include <fstream>
#include <vector>
#include <string>
using namespace std;

struct Student {
    int id;
    char name[50];
    double gpa;
};

void writeToFile(const string& filename, const vector<Student>& list) {
    ofstream out(filename, ios::binary);
    if (!out) {
        cerr << "Khong the mo file de ghi!" << endl;
        return;
    }

    size_t count = list.size();
    out.write(reinterpret_cast<const char*>(&count), sizeof(count));

    for (const auto& s : list) {
        out.write(reinterpret_cast<const char*>(&s), sizeof(Student));
    }
    out.close();
}

vector<Student> readFromFile(const string& filename) {
    vector<Student> result;
    ifstream in(filename, ios::binary);
    if (!in) {
        cerr << "Khong the mo file de doc!" << endl;
        return result;
    }

    size_t count = 0;
    in.read(reinterpret_cast<char*>(&count), sizeof(count));

    for (size_t i = 0; i < count; ++i) {
        Student s;
        if (in.read(reinterpret_cast<char*>(&s), sizeof(Student))) {
            result.push_back(s);
        }
    }
    in.close();
    return result;
}`
  },
  {
    id: "write_10",
    number: 10,
    chapter: "ch6",
    chapterName: "Chương 6: Quan Hệ Composition Trong Class",
    difficulty: "medium",
    points: "3.0 điểm",
    title: "Bài 10: Quản Lý Đơn Hàng & Sản Phẩm (Quan Hệ Composition)",
    description: `Xây dựng hệ thống quản lý đơn hàng:
1. Lớp \`Item\`: \`string name\`, \`double price\`, \`int quantity\`, hàm tính thành tiền \`getTotalPrice()\`.
2. Lớp \`Order\` (Composition): chứa mảng động các \`Item*\` (hoặc \`vector<Item>\`), quản lý toàn bộ vòng đời của sản phẩm trong đơn hàng.
3. Cài đặt đầy đủ Constructor, Destructor, Copy Constructor, hàm \`addItem()\`, và hàm \`calculateGrandTotal()\`.`,
    checklist: [
      { id: "c1", text: "Lớp `Item` tính thành tiền `price * quantity` (+0.5đ)", points: 0.5 },
      { id: "c2", text: "Lớp `Order` tuân thủ vòng đời Composition (hủy toàn bộ Item khi Order bị hủy) (+1.0đ)", points: 1.0 },
      { id: "c3", text: "Copy Constructor sao chép sâu toàn bộ danh sách Item (+0.5đ)", points: 0.5 },
      { id: "c4", text: "Hàm `calculateGrandTotal()` tính tổng tiền toàn đơn hàng (+1.0đ)", points: 1.0 }
    ],
    starterCode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Item {
public:
    string name;
    double price;
    int quantity;
    Item(string n, double p, int q) : name(n), price(p), quantity(q) {}
    double getTotal() const { return price * quantity; }
};

class Order {
private:
    vector<Item*> items; // Composition
public:
    ~Order();
    Order(const Order& other);
    Order& operator=(const Order& other);
    void addItem(string name, double price, int qty);
    double getGrandTotal() const;
};
`,
    solutionCode: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

class Item {
public:
    string name;
    double price;
    int quantity;
    Item(string n, double p, int q) : name(n), price(p), quantity(q) {}
    double getTotal() const { return price * quantity; }
};

class Order {
private:
    vector<Item*> items; // Composition
public:
    Order() {}

    ~Order() {
        for (Item* item : items) delete item;
        items.clear();
    }

    Order(const Order& other) {
        for (const Item* it : other.items) {
            items.push_back(new Item(it->name, it->price, it->quantity));
        }
    }

    Order& operator=(const Order& other) {
        if (this != &other) {
            for (Item* item : items) delete item;
            items.clear();
            for (const Item* it : other.items) {
                items.push_back(new Item(it->name, it->price, it->quantity));
            }
        }
        return *this;
    }

    void addItem(string name, double price, int qty) {
        items.push_back(new Item(name, price, qty));
    }

    double getGrandTotal() const {
        double total = 0.0;
        for (const Item* it : items) {
            total += it->getTotal();
        }
        return total;
    }
};`
  },

  // =========================================================================
  // CHƯƠNG 7: TEMPLATES & EXCEPTION HANDLING (Bài 11 - Bài 14)
  // =========================================================================
  {
    id: "write_11",
    number: 11,
    chapter: "ch7",
    chapterName: "Chương 7: Template Class & Ngoại Lệ",
    difficulty: "hard",
    points: "3.0 điểm",
    title: "Bài 11: Template Class SafeStack<T> Với Kiểm Soát Ngoại Lệ",
    description: `Xây dựng Template Class \`SafeStack<T>\` cài đặt ngăn xếp tổng quát an toàn:
1. Thuộc tính: \`T* data\`, \`int capacity\`, \`int topIndex\`.
2. Phương thức \`push(const T& val)\`: Nếu stack đầy, ném ngoại lệ \`std::overflow_error("Stack is full!")\`.
3. Phương thức \`pop()\`: Nếu stack rỗng, ném ngoại lệ \`std::underflow_error("Stack is empty!")\`.
4. Phương thức \`top()\`: Trả về phần tử đỉnh; nếu rỗng ném \`std::underflow_error\`.
5. Đảm bảo đầy đủ Rule of Three (Destructor, Copy Constructor, Operator=).`,
    checklist: [
      { id: "c1", text: "Khai báo Template `template <typename T>` trước class và trước mỗi phương thức bên ngoài (+0.5đ)", points: 0.5 },
      { id: "c2", text: "Phương thức `push` ném đúng `std::overflow_error` khi đầy (+0.5đ)", points: 0.5 },
      { id: "c3", text: "Phương thức `pop` và `top` ném đúng `std::underflow_error` khi rỗng (+0.5đ)", points: 0.5 },
      { id: "c4", text: "Cài đặt Destructor giải phóng `delete[] data` (+0.5đ)", points: 0.5 },
      { id: "c5", text: "Cài đặt Copy Constructor & Operator= sao chép sâu an toàn (+1.0đ)", points: 1.0 }
    ],
    starterCode: `#include <iostream>
#include <stdexcept>
using namespace std;

template <typename T>
class SafeStack {
private:
    T* data;
    int capacity;
    int topIndex;
public:
    SafeStack(int cap = 10);
    ~SafeStack();
    SafeStack(const SafeStack<T>& other);
    SafeStack<T>& operator=(const SafeStack<T>& other);

    void push(const T& val);
    T pop();
    const T& top() const;
    bool isEmpty() const { return topIndex == -1; }
    bool isFull() const { return topIndex == capacity - 1; }
};
`,
    solutionCode: `#include <iostream>
#include <stdexcept>
using namespace std;

template <typename T>
class SafeStack {
private:
    T* data;
    int capacity;
    int topIndex;
public:
    SafeStack(int cap = 10) : capacity(cap > 0 ? cap : 10), topIndex(-1) {
        data = new T[capacity];
    }

    ~SafeStack() {
        delete[] data;
        data = nullptr;
    }

    SafeStack(const SafeStack<T>& other) : capacity(other.capacity), topIndex(other.topIndex) {
        data = new T[capacity];
        for (int i = 0; i <= topIndex; ++i) {
            data[i] = other.data[i];
        }
    }

    SafeStack<T>& operator=(const SafeStack<T>& other) {
        if (this != &other) {
            delete[] data;
            capacity = other.capacity;
            topIndex = other.topIndex;
            data = new T[capacity];
            for (int i = 0; i <= topIndex; ++i) {
                data[i] = other.data[i];
            }
        }
        return *this;
    }

    void push(const T& val) {
        if (isFull()) {
            throw overflow_error("Stack is full! Cannot push.");
        }
        data[++topIndex] = val;
    }

    T pop() {
        if (isEmpty()) {
            throw underflow_error("Stack is empty! Cannot pop.");
        }
        return data[topIndex--];
    }

    const T& top() const {
        if (isEmpty()) {
            throw underflow_error("Stack is empty! Cannot get top.");
        }
        return data[topIndex];
    }

    bool isEmpty() const { return topIndex == -1; }
    bool isFull() const { return topIndex == capacity - 1; }
};`
  },
  {
    id: "write_12",
    number: 12,
    chapter: "ch7",
    chapterName: "Chương 7: Template Class SafeQueue<T>",
    difficulty: "medium",
    points: "3.0 điểm",
    title: "Bài 12: Template Class SafeQueue<T> Vòng (Circular Queue)",
    description: `Xây dựng Template Class \`SafeQueue<T>\` theo mô hình hàng đợi vòng (Circular Queue):
1. Thuộc tính: \`T* buffer\`, \`int capacity\`, \`int front\`, \`int rear\`, \`int count\`.
2. Phương thức \`enqueue(val)\`: Nếu đầy, ném ngoại lệ \`std::overflow_error\`.
3. Phương thức \`dequeue()\`: Nếu rỗng, ném ngoại lệ \`std::underflow_error\`.
4. Phương thức \`getFront()\`: Lấy giá trị đầu hàng đợi.`,
    checklist: [
      { id: "c1", text: "Cài đặt hàng đợi vòng với công thức modulo `(rear + 1) % capacity` (+1.0đ)", points: 1.0 },
      { id: "c2", text: "Ném ngoại lệ `overflow_error` / `underflow_error` đúng chuẩn (+1.0đ)", points: 1.0 },
      { id: "c3", text: "Destructor và giải phóng bộ nhớ an toàn (+1.0đ)", points: 1.0 }
    ],
    starterCode: `#include <iostream>
#include <stdexcept>
using namespace std;

template <typename T>
class SafeQueue {
private:
    T* buffer;
    int capacity, front, rear, count;
public:
    SafeQueue(int cap = 10);
    ~SafeQueue();
    void enqueue(const T& val);
    T dequeue();
    const T& getFront() const;
    bool isEmpty() const { return count == 0; }
    bool isFull() const { return count == capacity; }
};
`,
    solutionCode: `#include <iostream>
#include <stdexcept>
using namespace std;

template <typename T>
class SafeQueue {
private:
    T* buffer;
    int capacity;
    int front;
    int rear;
    int count;
public:
    SafeQueue(int cap = 10) : capacity(cap > 0 ? cap : 10), front(0), rear(-1), count(0) {
        buffer = new T[capacity];
    }

    ~SafeQueue() {
        delete[] buffer;
        buffer = nullptr;
    }

    void enqueue(const T& val) {
        if (isFull()) {
            throw overflow_error("Queue is full!");
        }
        rear = (rear + 1) % capacity;
        buffer[rear] = val;
        count++;
    }

    T dequeue() {
        if (isEmpty()) {
            throw underflow_error("Queue is empty!");
        }
        T item = buffer[front];
        front = (front + 1) % capacity;
        count--;
        return item;
    }

    const T& getFront() const {
        if (isEmpty()) {
            throw underflow_error("Queue is empty!");
        }
        return buffer[front];
    }

    bool isEmpty() const { return count == 0; }
    bool isFull() const { return count == capacity; }
};`
  },
  {
    id: "write_13",
    number: 13,
    chapter: "ch7",
    chapterName: "Chương 7: Template Ma Trận Matrix<T>",
    difficulty: "hard",
    points: "3.0 điểm",
    title: "Bài 13: Template Class Matrix<T> & Nạp Chồng Phép Nhân Ma Trận",
    description: `Xây dựng Template Class \`Matrix<T>\`:
1. Thuộc tính: \`int rows, cols\`, con trỏ 2 chiều \`T** data\`.
2. Nạp chồng toán tử cộng \`operator+\` và nhân ma trận \`operator*\`.
3. Nếu không cùng kích thước khi cộng, hoặc số cột ma trận A khác số dòng ma trận B khi nhân, ném ngoại lệ \`std::invalid_argument\`.
4. Quản lý cấp phát và giải phóng mảng 2 chiều chính xác.`,
    checklist: [
      { id: "c1", text: "Cấp phát và giải phóng mảng 2 chiều `T** data` không rò rỉ (+1.0đ)", points: 1.0 },
      { id: "c2", text: "Nạp chồng `operator+` và ném `invalid_argument` khi sai kích thước (+1.0đ)", points: 1.0 },
      { id: "c3", text: "Nạp chồng `operator*` nhân ma trận theo thuật toán 3 vòng lặp (+1.0đ)", points: 1.0 }
    ],
    starterCode: `#include <iostream>
#include <stdexcept>
using namespace std;

template <typename T>
class Matrix {
private:
    int rows, cols;
    T** data;
public:
    Matrix(int r = 0, int c = 0);
    ~Matrix();
    Matrix(const Matrix<T>& other);
    Matrix<T>& operator=(const Matrix<T>& other);

    Matrix<T> operator+(const Matrix<T>& other) const;
    Matrix<T> operator*(const Matrix<T>& other) const;
};
`,
    solutionCode: `#include <iostream>
#include <stdexcept>
using namespace std;

template <typename T>
class Matrix {
private:
    int rows, cols;
    T** data;

    void allocate() {
        if (rows > 0 && cols > 0) {
            data = new T*[rows];
            for (int i = 0; i < rows; ++i) {
                data[i] = new T[cols]();
            }
        } else {
            data = nullptr;
        }
    }

    void deallocate() {
        if (data) {
            for (int i = 0; i < rows; ++i) delete[] data[i];
            delete[] data;
            data = nullptr;
        }
    }

public:
    Matrix(int r = 0, int c = 0) : rows(r), cols(c) {
        allocate();
    }

    ~Matrix() {
        deallocate();
    }

    Matrix(const Matrix<T>& other) : rows(other.rows), cols(other.cols) {
        allocate();
        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < cols; ++j) {
                data[i][j] = other.data[i][j];
            }
        }
    }

    Matrix<T>& operator=(const Matrix<T>& other) {
        if (this != &other) {
            deallocate();
            rows = other.rows;
            cols = other.cols;
            allocate();
            for (int i = 0; i < rows; ++i) {
                for (int j = 0; j < cols; ++j) {
                    data[i][j] = other.data[i][j];
                }
            }
        }
        return *this;
    }

    Matrix<T> operator+(const Matrix<T>& other) const {
        if (rows != other.rows || cols != other.cols) {
            throw invalid_argument("Matrix dimensions do not match for addition!");
        }
        Matrix<T> result(rows, cols);
        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < cols; ++j) {
                result.data[i][j] = data[i][j] + other.data[i][j];
            }
        }
        return result;
    }

    Matrix<T> operator*(const Matrix<T>& other) const {
        if (cols != other.rows) {
            throw invalid_argument("Matrix columns of A must match rows of B for multiplication!");
        }
        Matrix<T> result(rows, other.cols);
        for (int i = 0; i < rows; ++i) {
            for (int j = 0; j < other.cols; ++j) {
                result.data[i][j] = 0;
                for (int k = 0; k < cols; ++k) {
                    result.data[i][j] += data[i][k] * other.data[k][j];
                }
            }
        }
        return result;
    }
};`
  },
  {
    id: "write_14",
    number: 14,
    chapter: "ch7",
    chapterName: "Chương 7: Custom Exception Class",
    difficulty: "easy",
    points: "3.0 điểm",
    title: "Bài 14: Xây Dựng Lớp Ngoại Lệ Tùy Biến Kế Thừa std::exception",
    description: `Xây dựng lớp ngoại lệ tùy biến \`DivisionByZeroException\` và \`NegativeValueException\` kế thừa từ \`std::exception\`:
1. Override phương thức \`const char* what() const noexcept\`.
2. Áp dụng vào hàm tính thương \`double safeDivide(double a, double b)\`.`,
    checklist: [
      { id: "c1", text: "Kế thừa `std::exception` và có từ khóa `const noexcept` ở hàm `what()` (+1.5đ)", points: 1.5 },
      { id: "c2", text: "Hàm `safeDivide` ném ngoại lệ khi $b = 0$ và bắt lại chính xác (+1.5đ)", points: 1.5 }
    ],
    starterCode: `#include <iostream>
#include <exception>
#include <string>
using namespace std;

// TODO: DivisionByZeroException

double safeDivide(double a, double b);
`,
    solutionCode: `#include <iostream>
#include <exception>
#include <string>
using namespace std;

class DivisionByZeroException : public exception {
private:
    string msg;
public:
    DivisionByZeroException(const string& m = "Loi: Khong the chia cho 0!") : msg(m) {}
    const char* what() const noexcept override {
        return msg.c_str();
    }
};

double safeDivide(double a, double b) {
    if (b == 0.0) {
        throw DivisionByZeroException("Phep chia cho 0 khong hop le!");
    }
    return a / b;
}`
  },

  // =========================================================================
  // CHƯƠNG 8: STL & TẬP HỢP TỔNG HỢP (Bài 15)
  // =========================================================================
  {
    id: "write_15",
    number: 15,
    chapter: "ch8",
    chapterName: "Chương 8: STL std::map & Thống Kê Tần Suất",
    difficulty: "medium",
    points: "3.0 điểm",
    title: "Bài 15: Xây Dựng Lớp WordFrequencyTracker Sử Dụng std::map & STL",
    description: `Xây dựng lớp \`WordFrequencyTracker\` để đếm tần suất xuất hiện của các từ trong đoạn văn bản:
1. Thuộc tính: \`map<string, int> freqMap\`.
2. Phương thức \`addText(const string& text)\`: Tách từng từ và cập nhật tần suất.
3. Phương thức \`getTopWords(int k)\`: Trả về danh sách $k$ từ xuất hiện nhiều nhất (sắp xếp giảm dần theo tần suất).
4. Phương thức \`printAll()\`: In bảng thống kê từ và tần suất theo thứ tự alphabet của từ.`,
    checklist: [
      { id: "c1", text: "Sử dụng `stringstream` tách từ và cập nhật vào `map<string, int>` (+1.0đ)", points: 1.0 },
      { id: "c2", text: "Chuyển `map` sang `vector<pair<string, int>>` và dùng `std::sort` với custom comparator (+1.0đ)", points: 1.0 },
      { id: "c3", text: "Hàm `getTopWords(k)` lấy đúng $k$ phần tử đầu tiên (+1.0đ)", points: 1.0 }
    ],
    starterCode: `#include <iostream>
#include <map>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class WordFrequencyTracker {
private:
    map<string, int> freqMap;
public:
    void addText(const string& text);
    vector<pair<string, int>> getTopWords(int k) const;
    void printAll() const;
};
`,
    solutionCode: `#include <iostream>
#include <map>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

class WordFrequencyTracker {
private:
    map<string, int> freqMap;
public:
    void addText(const string& text) {
        stringstream ss(text);
        string word;
        while (ss >> word) {
            // Chuyển về chữ thường
            for (char& c : word) c = tolower(c);
            freqMap[word]++;
        }
    }

    vector<pair<string, int>> getTopWords(int k) const {
        vector<pair<string, int>> vec(freqMap.begin(), freqMap.end());
        // Sắp xếp giảm dần theo tần suất
        sort(vec.begin(), vec.end(), [](const pair<string, int>& a, const pair<string, int>& b) {
            return a.second > b.second;
        });

        if (k < (int)vec.size()) {
            vec.resize(k);
        }
        return vec;
    }

    void printAll() const {
        for (const auto& pair : freqMap) {
            cout << pair.first << ": " << pair.second << endl;
        }
    }
};`
  }
];
