/**
 * ĐỀ THI SỐ 4 - CHỦ ĐỀ: TEMPLATE, XỬ LÝ NGOẠI LỆ (EXCEPTION) VÀ THƯ VIỆN STL
 * Bám sát nội dung slide tuần 7, tuần 8 và tài liệu ôn thi FIT-HCMUS
 */
var EXAM_DE_4 = {
  id: "de4",
  title: "Đề 04: Template, Ngoại Lệ (Exception) & STL",
  subtitle: "Trọng tâm: Class/Function Template, Try-Catch-Throw, Exception Lifecycle, STL Algorithms",
  timeMinutes: 90,
  questions: [
    {
      id: "de4_c1",
      number: 1,
      type: "theory",
      title: "Câu 1: Lý Thuyết - Cơ Chế Xử Lý Ngoại Lệ & Thứ Tự Khối Catch",
      maxScore: 2.0,
      slideRef: "Tuần 7 (Mục 6.1, 6.2 - Template, Mục 6.6 - Exception Handling)",
      prompt: `**Yêu cầu:**
1. Trình bày cơ chế bắt lỗi và lan truyền ngoại lệ (\`Stack Unwinding\`) khi xảy ra lệnh \`throw\` trong C++.
2. Tại sao thứ tự của các khối \`catch\` lại có tính chất quyết định? Nếu đặt \`catch(std::exception&)\` hoặc \`catch(...)\` lên trước \`catch(std::runtime_error&)\` thì điều gì sẽ xảy ra?
3. Nếu một Constructor ném ra ngoại lệ (exception) trong quá trình khởi tạo, Destructor của đối tượng đó có được gọi tự động để dọn dẹp tài nguyên hay không? Giải pháp lập trình an toàn là gì?`,
      subQuestions: [
        {
          id: "de4_c1_q1",
          question: "Khối lệnh `catch(...)` (dấu ba chấm) có tác dụng gì trong C++?",
          options: [
            "A. Chỉ bắt các ngoại lệ kiểu số nguyên (`int`).",
            "B. Bắt MỌI loại ngoại lệ được ném ra không thuộc các kiểu đã khai báo ở các khối catch phía trước.",
            "C. Tự động sửa lỗi và tiếp tục chạy chương trình tại dòng bị lỗi.",
            "D. Bắt buộc phải đặt ở đầu tiên trước các catch khác."
          ],
          correctIndex: 1,
          explanation: "`catch(...)` là khối catch tổng quát nhất, có khả năng bắt bất kỳ ngoại lệ nào, và luôn phải được đặt ở vị trí cuối cùng trong chuỗi catch."
        },
        {
          id: "de4_c1_q2",
          question: "Khi định nghĩa phương thức của một Class Template `template <typename T> class Stack` bên ngoài thân class, cú pháp nào là ĐÚNG?",
          options: [
            "A. `void Stack::push(T val) { ... }`",
            "B. `template <typename T> void Stack::push(T val) { ... }`",
            "C. `template <typename T> void Stack<T>::push(T val) { ... }`",
            "D. `void Stack<T>::push(T val) { ... }`"
          ],
          correctIndex: 2,
          explanation: "Khi định nghĩa method ngoài class template, bắt buộc phải lặp lại tiền tố `template <typename T>` và dùng tên lớp kèm tham số kiểu `Stack<T>::`."
        }
      ],
      detailedAnswer: `### HƯỚNG DẪN TRẢ LỜI LÝ THUYẾT CHI TIẾT:
1. **Cơ chế lan truyền ngoại lệ (Stack Unwinding):**
   - Khi gặp lệnh \`throw\`, luồng thực thi thông thường dừng lại ngay lập tức.
   - Runtime tìm kiếm khối \`catch\` tương ứng trong hàm hiện tại. Nếu không có, nó thoát khỏi hàm hiện tại (hủy toàn bộ biến cục bộ trên stack của hàm đó) và lan truyền ngược lên hàm gọi nó (call stack) cho đến khi tìm thấy khối \`catch\` phù hợp. Quá trình này gọi là **Stack Unwinding**.
   - Nếu không có khối catch nào bắt được -> hàm \`std::terminate()\` được gọi -> crash chương trình.

2. **Tầm quan trọng của thứ tự các khối catch:**
   - Các khối \`catch\` được kiểm tra **tuần tự từ trên xuống dưới**; khối catch đầu tiên có kiểu tương thích (kể cả tương thích đa hình cha-con) sẽ được chọn thực thi.
   - Nếu đặt \`catch(std::exception&)\` (lớp cha) hoặc \`catch(...)\` lên đầu, nó sẽ bắt luôn cả các ngoại lệ con (\`std::runtime_error\`, \`std::out_of_range\`), khiến các khối catch cụ thể bên dưới bị 'chết' (dead code), không bao giờ được chạm tới.
   - **Quy tắc:** Bắt kiểu cụ thể (Derived) trước -> Bắt kiểu tổng quát (Base) sau -> \`catch(...)\` cuối cùng.

3. **Ngoại lệ trong Constructor và vòng đời Destructor:**
   - Trong C++, một đối tượng chỉ được coi là đã 'sống' khi Constructor của nó kết thúc thành công.
   - Nếu Constructor ném ngoại lệ giữa chừng, đối tượng coi như **chưa được tạo thành công** -> **Destructor của đối tượng đó SẼ KHÔNG BAO GIỜ ĐƯỢC GỌI**.
   - **Hậu quả:** Nếu trước lệnh ném ngoại lệ đã có lệnh \`new\` cấp phát bộ nhớ thì vùng nhớ đó sẽ bị rò rỉ (memory leak) vì destructor không thể dọn.
   - **Giải pháp:** Sử dụng thành viên là Smart Pointer (\`std::unique_ptr\`), các container tự quản lý vùng nhớ (\`std::vector\`, \`std::string\`) hoặc bọc khối khởi tạo trong \`try-catch\` ngay bên trong constructor để \`delete\` trước khi \`re-throw\` (nguyên lý RAII).`
    },
    {
      id: "de4_c2",
      number: 2,
      type: "code_trace",
      title: "Câu 2: Đọc Code Đoán Output (Tracer)",
      maxScore: 2.0,
      slideRef: "Tuần 7 (Mục 6.6 - Exception) & Tuần 8 (Mục 7.4 - STL Algorithms)",
      trapRef: "Bẫy 5 (Thứ tự catch), Bẫy 7 (Specialization & Catch polymorphism)",
      code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

class BaseEx {
public:
    virtual const char* what() const { return "BaseEx"; }
};

class DerivedEx : public BaseEx {
public:
    const char* what() const override { return "DerivedEx"; }
};

void testException(int code) {
    if (code == 1) throw DerivedEx();
    if (code == 2) throw 404;
    if (code == 3) throw "Fatal Error";
    cout << "Normal ";
}

int main() {
    int testCases[] = {1, 2, 3};
    
    for (int tc : testCases) {
        try {
            testException(tc);
        }
        catch (const BaseEx& e) { // Bắt đa hình lớp cha bằng tham chiếu
            cout << "[" << e.what() << "] ";
        }
        catch (int err) {
            cout << "[ErrCode:" << err << "] ";
        }
        catch (...) {
            cout << "[Unknown] ";
        }
    }
    
    cout << endl;
    return 0;
}`,
      expectedOutput: "[DerivedEx] [ErrCode:404] [Unknown]",
      alternativeOutputs: [
        "[DerivedEx] [ErrCode:404] [Unknown] ",
        "[DerivedEx] [ErrCode:404] [Unknown]\n"
      ],
      stepByStepAnalysis: [
        {
          step: 1,
          line: "Vòng lặp tc = 1:",
          explanation: "- `testException(1)` ném ra đối tượng `DerivedEx()`.\n- Khối `catch (const BaseEx& e)` bắt được vì `DerivedEx` kế thừa `BaseEx`.\n- Do `what()` là hàm `virtual` và bắt bằng tham chiếu `const BaseEx&` -> cơ chế đa hình gọi đúng `DerivedEx::what()`, trả về `DerivedEx`.\n- In ra: `[DerivedEx] `"
        },
        {
          step: 2,
          line: "Vòng lặp tc = 2:",
          explanation: "- `testException(2)` ném ra số nguyên `404` (`int`).\n- Khối `catch (int err)` bắt được giá trị `404`.\n- In ra: `[ErrCode:404] `"
        },
        {
          step: 3,
          line: "Vòng lặp tc = 3:",
          explanation: "- `testException(3)` ném ra chuỗi hằng `const char*` (\"Fatal Error\").\n- Không khớp `BaseEx` và `int` -> rơi vào khối `catch (...)`.\n- In ra: `[Unknown] `.\n- Tổng hợp chuỗi in ra: `[DerivedEx] [ErrCode:404] [Unknown]`"
        }
      ]
    },
    {
      id: "de4_c3",
      number: 3,
      type: "code_writing",
      title: "Câu 3: Viết Code - Xây Dựng Class Template Stack<T> Với Ngoại Lệ",
      maxScore: 3.0,
      slideRef: "Tuần 7 (Mục 6.2 - Class Template, Mục 6.6 - Exception) & Tuần 8 (Mục 7.2)",
      prompt: `**Đề bài:**
Viết một Class Template \`Stack<T>\` trong C++ cài đặt cấu trúc dữ liệu Ngăn xếp (LIFO) bằng mảng động với các yêu cầu sau:

1. **Thuộc tính:**
   - \`T* elements\`: con trỏ mảng động lưu các phần tử.
   - \`int capacity\`: dung lượng tối đa hiện tại của mảng.
   - \`int topIndex\`: chỉ số của phần tử trên đỉnh ngăn xếp (khởi tạo \`-1\`).

2. **Constructor & Destructor:**
   - \`Stack(int cap = 10)\`: cấp phát mảng với dung lượng \`cap\` (nếu \`cap <= 0\` thì gán \`capacity = 10\`).
   - \`~Stack()\`: giải phóng mảng động.

3. **Phương thức cơ bản:**
   - \`bool isEmpty() const\`: trả về \`true\` nếu ngăn xếp rỗng.
   - \`int getSize() const\`: trả về số lượng phần tử hiện có trong ngăn xếp.
   - \`void push(const T& val)\`: thêm phần tử lên đỉnh ngăn xếp. Nếu ngăn xếp đầy, tự động nhân đôi dung lượng (\`capacity *= 2\`) và chuyển dữ liệu sang mảng mới.
   - \`T pop()\`: lấy và loại bỏ phần tử ở đỉnh ngăn xếp. **Nếu ngăn xếp rỗng, ném ra ngoại lệ \`std::underflow_error("Stack is empty!")\`**.
   - \`T top() const\`: trả về phần tử ở đỉnh mà không xóa. **Nếu ngăn xếp rỗng, ném ra ngoại lệ \`std::underflow_error("Stack is empty!")\`**.`,
      starterCode: `#include <iostream>
#include <stdexcept>
using namespace std;

template <typename T>
class Stack {
private:
    T* elements;
    int capacity;
    int topIndex;

    void resize(int newCapacity) {
        // Viết hàm mở rộng dung lượng ở đây...
    }

public:
    Stack(int cap = 10);
    ~Stack();

    bool isEmpty() const;
    int getSize() const;
    void push(const T& val);
    T pop();
    T top() const;
};

// Cài đặt các phương thức của template bên dưới...
`,
      checklist: [
        { id: "c1", label: "Định nghĩa template đúng cú pháp `template <typename T>` trên class và phương thức", weight: 0.5 },
        { id: "c2", label: "Constructor khởi tạo an toàn, Destructor giải phóng `delete[] elements`", weight: 0.5 },
        { id: "c3", label: "Hàm `push` tự động resize x2 dung lượng khi đầy và sao chép dữ liệu", weight: 0.75 },
        { id: "c4", label: "Hàm `pop` và `top` ném ngoại lệ `std::underflow_error` khi stack rỗng", weight: 0.75 },
        { id: "c5", label: "Cú pháp const đúng cho `isEmpty`, `getSize`, `top`", weight: 0.5 }
      ],
      solutionCode: `#include <iostream>
#include <stdexcept>
using namespace std;

template <typename T>
class Stack {
private:
    T* elements;
    int capacity;
    int topIndex;

    void resize(int newCapacity) {
        T* newElements = new T[newCapacity];
        for (int i = 0; i <= topIndex; ++i) {
            newElements[i] = elements[i];
        }
        delete[] elements;
        elements = newElements;
        capacity = newCapacity;
    }

public:
    // 1. Constructor
    Stack(int cap = 10) {
        capacity = (cap > 0) ? cap : 10;
        elements = new T[capacity];
        topIndex = -1;
    }

    // 2. Destructor
    ~Stack() {
        delete[] elements;
        elements = nullptr;
    }

    // 3. isEmpty & getSize
    bool isEmpty() const {
        return topIndex == -1;
    }

    int getSize() const {
        return topIndex + 1;
    }

    // 4. Push
    void push(const T& val) {
        if (topIndex + 1 == capacity) {
            resize(capacity * 2);
        }
        elements[++topIndex] = val;
    }

    // 5. Pop
    T pop() {
        if (isEmpty()) {
            throw underflow_error("Stack is empty!");
        }
        return elements[topIndex--];
    }

    // 6. Top
    T top() const {
        if (isEmpty()) {
            throw underflow_error("Stack is empty!");
        }
        return elements[topIndex];
    }
};`
    },
    {
      id: "de4_c4",
      number: 4,
      type: "design_pattern",
      title: "Câu 4: Thiết Kế Kiến Trúc Hệ Thống - STL Architecture & Iterator Decoupling",
      maxScore: 3.0,
      slideRef: "Tuần 8 (Mục 7.1, 7.3 - STL Decoupling, Mục 8.2)",
      scenario: `**Tình huống thực tế:**
Trong thư viện chuẩn C++ (STL), các thuật toán tổng quát như \`std::sort\`, \`std::find\`, \`std::accumulate\` không hề được viết riêng cho từng cấu trúc dữ liệu (như mảng tĩnh, \`std::vector\`, \`std::list\`, \`std::deque\`).
Yêu cầu thiết kế:
1. Giải thích kiến trúc 3 tầng của STL (**Container - Iterator - Algorithm**).
2. Thiết kế một hàm thuật toán template độc lập \`countMatches\` đếm số lượng phần tử thỏa mãn điều kiện duyệt qua con trỏ Iterator mà **hoàn toàn không phụ thuộc vào Container bên dưới**.`,
      patternOptions: [
        { id: "iterator", name: "Iterator Pattern (Tách rời Container & Algorithm)", correct: true, reason: "Iterator đóng vai trò cầu nối (decoupling) giúp các hàm thuật toán làm việc với mọi loại tập hợp thông qua giao diện duyệt chung." },
        { id: "singleton", name: "Singleton Pattern", correct: false, reason: "Không liên quan đến tách rời container và thuật toán." },
        { id: "factory", name: "Factory Pattern", correct: false, reason: "Factory chỉ phụ trách khởi tạo đối tượng." },
        { id: "adapter", name: "Adapter Pattern", correct: false, reason: "Adapter chuyển đổi giao diện nhưng không phải kiến trúc cốt lõi phân tách 3 thành phần của STL." }
      ],
      roleMapping: [
        { role: "Container", requirement: "Lưu trữ dữ liệu trong bộ nhớ (vector, list, deque...)." },
        { role: "Iterator (Bridge)", requirement: "Cung cấp các toán tử `*` (dereference), `++` (tiến), `==` / `!=` (so sánh vị trí) để truy cập tuần tự." },
        { role: "Algorithm", requirement: "Các hàm độc lập chỉ nhận cặp iterator `[begin, end)` và thực thi logic xử lý mà không cần biết cấu trúc vùng nhớ của Container." }
      ],
      umlDiagram: `
classDiagram
    class Container {
        <<data store>>
        + begin() Iterator
        + end() Iterator
    }
    class Iterator {
        <<bridge / traversal>>
        + operator*() T
        + operator++() Iterator
        + operator!=(Iterator) bool
    }
    class GenericAlgorithm {
        <<processing logic>>
        + find(Iterator begin, Iterator end, T value)
        + sort(Iterator begin, Iterator end)
    }
    Container ..> Iterator : creates
    GenericAlgorithm ..> Iterator : consumes / traverses
`,
      designSkeleton: `#include <iostream>
#include <vector>
#include <list>
using namespace std;

// Generic Algorithm độc lập hoàn toàn với Container nhờ Iterator
template <typename InputIterator, typename T>
int countMatches(InputIterator begin, InputIterator end, const T& target) {
    int count = 0;
    for (InputIterator it = begin; it != end; ++it) {
        if (*it == target) {
            ++count;
        }
    }
    return count;
}

int main() {
    // 1. Dùng với vector (mảng động liền kề)
    vector<int> v = {1, 2, 3, 2, 4, 2, 5};
    int c1 = countMatches(v.begin(), v.end(), 2);
    cout << "Matches in vector: " << c1 << endl; // In 3

    // 2. Dùng với list (danh sách liên kết đôi)
    list<int> l = {2, 9, 2, 8, 2};
    int c2 = countMatches(l.begin(), l.end(), 2);
    cout << "Matches in list: " << c2 << endl;   // In 3

    // 3. Dùng với mảng C nguyên thủy
    int arr[] = {2, 2, 2, 7};
    int c3 = countMatches(arr, arr + 4, 2);
    cout << "Matches in array: " << c3 << endl;  // In 3

    return 0;
}`
    }
  ]
};
