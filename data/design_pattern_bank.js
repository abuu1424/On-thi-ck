/**
 * DẠNG 4: NGÂN HÀNG BÀI TẬP THIẾT KẾ KIẾN TRÚC & DESIGN PATTERNS (3.0 ĐIỂM)
 * Bao quát các mẫu thiết kế trọng tâm đề thi FIT-HCMUS:
 *  - Singleton Pattern (Logger, Database, Config, Audio Engine)
 *  - Iterator Pattern (Collection traversal, Playlist, FileSystem)
 *  - Factory Method Pattern (Notification, Document, Game Spawner)
 *  - Strategy / Observer Pattern (Payment Processor, Event System)
 */

var DESIGN_PATTERN_BANK = [
  // =========================================================================
  // SINGLETON PATTERN (Bài 1 - Bài 3)
  // =========================================================================
  {
    id: "pattern_1",
    number: 1,
    category: "singleton",
    categoryName: "Mẫu Khởi Tạo: Singleton Pattern",
    difficulty: "medium",
    points: "3.0 điểm",
    title: "Bài 1: Thiết Kế Hệ Thống Ghi Log Toàn Cục (AppLogger Singleton)",
    scenario: `Một hệ thống ứng dụng ngân hàng trực tuyến yêu cầu ghi nhật ký (log) tất cả các giao dịch và lỗi bảo mật từ nhiều module khác nhau (Xác thực, Chuyển tiền, Báo cáo).
Yêu cầu kiến trúc:
1. Đảm bảo toàn bộ ứng dụng chỉ tồn tại **duy nhất một đối tượng Logger** để tránh xung đột ghi đè file log.
2. Cung cấp một điểm truy cập toàn cục (global access point) để mọi module đều có thể gọi ghi log dễ dàng mà không cần truyền tham số con trỏ qua lại.
3. Chặn việc người dùng tự ý khởi tạo (\`new AppLogger()\`) hoặc sao chép (\`AppLogger l2 = l1;\`).`,
    patternOptions: [
      "Factory Method Pattern",
      "Singleton Pattern",
      "Iterator Pattern",
      "Observer Pattern"
    ],
    correctPatternIndex: 1,
    patternRationale: "Cần đảm bảo duy nhất 1 thể hiện (unique instance) trong toàn bộ ứng dụng và cung cấp điểm truy cập toàn cục -> Singleton Pattern là lựa chọn chính xác 100%.",
    roleMapping: [
      { role: "Singleton Class", className: "AppLogger", description: "Lớp chứa con trỏ static duy nhất `instance`, constructor private, và phương thức tĩnh `getInstance()`." },
      { role: "Client Modules", className: "AuthModule, TransactionModule", description: "Các module nghiệp vụ gọi `AppLogger::getInstance()->log(...)` để ghi thông tin." }
    ],
    umlDiagram: `+-----------------------------------------------+
|                  AppLogger                    |
+-----------------------------------------------+
| - instance: AppLogger* (static)               |
| - logFile: ofstream                           |
+-----------------------------------------------+
| - AppLogger()                                 |
| - AppLogger(const AppLogger&) = delete        |
| - operator=(const AppLogger&) = delete        |
| + getInstance(): AppLogger* (static)          |
| + log(level: string, message: string): void   |
+-----------------------------------------------+`,
    skeletonCode: `#include <iostream>
#include <string>
#include <fstream>
using namespace std;

class AppLogger {
private:
    static AppLogger* instance;
    ofstream logFile;

    // 1. Private Constructor: Chặn khởi tạo từ bên ngoài
    AppLogger() {
        cout << "[System] AppLogger khoi tao duy nhat 1 lan." << endl;
        logFile.open("app_log.txt", ios::app);
    }

    // 2. Chặn Copy Constructor và Phép gán bằng delete
    AppLogger(const AppLogger&) = delete;
    AppLogger& operator=(const AppLogger&) = delete;

public:
    ~AppLogger() {
        if (logFile.is_open()) logFile.close();
    }

    // 3. Static Method: Điểm truy cập toàn cục
    static AppLogger* getInstance() {
        if (instance == nullptr) {
            instance = new AppLogger();
        }
        return instance;
    }

    // Phương thức nghiệp vụ
    void log(const string& level, const string& msg) {
        cout << "[" << level << "] " << msg << endl;
        if (logFile.is_open()) {
            logFile << "[" << level << "] " << msg << endl;
        }
    }
};

// Khởi tạo biến tĩnh static
AppLogger* AppLogger::instance = nullptr;

// Test Client
int main() {
    AppLogger* logger1 = AppLogger::getInstance();
    logger1->log("INFO", "Nguoi dung A dang nhap thanh cong.");

    AppLogger* logger2 = AppLogger::getInstance();
    logger2->log("WARN", "Phat hien giao dich bat thuong.");

    cout << "Dia chi logger1: " << logger1 << endl;
    cout << "Dia chi logger2: " << logger2 << endl; // Trùng địa chỉ
    return 0;
}`
  },
  {
    id: "pattern_2",
    number: 2,
    category: "singleton",
    categoryName: "Mẫu Khởi Tạo: Singleton Pattern",
    difficulty: "medium",
    points: "3.0 điểm",
    title: "Bài 2: Quản Lý Cấu Hình Hệ Thống (ConfigurationManager Singleton)",
    scenario: `Ứng dụng đọc file cài đặt \`config.json\` khi khởi động và lưu trữ các thiết lập: URL máy chủ, Cổng Port kết nối, Mã ngôn ngữ giao diện.
Yêu cầu kiến trúc:
1. Dữ liệu cấu hình phải đồng nhất và chỉ được tải vào bộ nhớ đúng 1 lần.
2. Mọi thành phần trong phần mềm có thể đọc cấu hình bất kỳ lúc nào qua \`ConfigManager::getInstance()->getSetting(key)\`.`,
    patternOptions: [
      "Iterator Pattern",
      "Strategy Pattern",
      "Singleton Pattern",
      "Adapter Pattern"
    ],
    correctPatternIndex: 2,
    patternRationale: "Cần đảm bảo dữ liệu cấu hình đồng nhất xuyên suốt chương trình và chỉ tải đúng 1 lần duy nhất trong RAM -> Singleton Pattern.",
    roleMapping: [
      { role: "Singleton Class", className: "ConfigManager", description: "Lưu trữ `map<string, string> settings`, đảm bảo duy nhất 1 thể hiện." }
    ],
    umlDiagram: `+-----------------------------------------------+
|                 ConfigManager                 |
+-----------------------------------------------+
| - instance: ConfigManager* (static)           |
| - settings: map<string, string>               |
+-----------------------------------------------+
| - ConfigManager()                             |
| + getInstance(): ConfigManager* (static)      |
| + get(key: string): string                    |
| + set(key: string, val: string): void         |
+-----------------------------------------------+`,
    skeletonCode: `#include <iostream>
#include <string>
#include <map>
using namespace std;

class ConfigManager {
private:
    static ConfigManager* instance;
    map<string, string> configs;

    ConfigManager() {
        // Tải thiết lập mặc định
        configs["server_url"] = "https://api.hcmus.edu.vn";
        configs["port"] = "8080";
        configs["theme"] = "dark";
    }

    ConfigManager(const ConfigManager&) = delete;
    ConfigManager& operator=(const ConfigManager&) = delete;

public:
    static ConfigManager* getInstance() {
        if (!instance) instance = new ConfigManager();
        return instance;
    }

    string get(const string& key) {
        if (configs.find(key) != configs.end()) return configs[key];
        return "";
    }

    void set(const string& key, const string& val) {
        configs[key] = val;
    }
};

ConfigManager* ConfigManager::instance = nullptr;`
  },
  {
    id: "pattern_3",
    number: 3,
    category: "singleton",
    categoryName: "Mẫu Khởi Tạo: Singleton Pattern",
    difficulty: "easy",
    points: "3.0 điểm",
    title: "Bài 3: Quản Lý Âm Thanh Trong Game (AudioEngine Singleton)",
    scenario: `Trong một game 3D, có hàng chục quái vật và hiệu ứng kỹ năng phát ra âm thanh đồng thời. Cần thiết kế bộ quản lý thiết bị âm thanh \`AudioEngine\` để điều phối phần cứng loa và nhạc nền.`,
    patternOptions: [
      "Singleton Pattern",
      "Factory Method Pattern",
      "Composite Pattern",
      "Proxy Pattern"
    ],
    correctPatternIndex: 0,
    patternRationale: "Thiết bị phần cứng âm thanh chỉ có 1 cổng ra duy nhất, cần quản lý tập trung và tránh xung đột phát nhạc -> Singleton Pattern.",
    roleMapping: [
      { role: "Singleton Class", className: "AudioEngine", description: "Điều phối phát âm thanh BGM và SFX toàn game." }
    ],
    umlDiagram: `+-----------------------------------------------+
|                  AudioEngine                  |
+-----------------------------------------------+
| - instance: AudioEngine* (static)             |
| - masterVolume: float                         |
+-----------------------------------------------+
| - AudioEngine()                               |
| + getInstance(): AudioEngine* (static)        |
| + playSound(soundName: string): void          |
| + setVolume(vol: float): void                 |
+-----------------------------------------------+`,
    skeletonCode: `#include <iostream>
#include <string>
using namespace std;

class AudioEngine {
private:
    static AudioEngine* instance;
    float volume;

    AudioEngine() : volume(1.0f) {}
    AudioEngine(const AudioEngine&) = delete;
    AudioEngine& operator=(const AudioEngine&) = delete;

public:
    static AudioEngine* getInstance() {
        if (!instance) instance = new AudioEngine();
        return instance;
    }

    void playSound(const string& soundName) {
        cout << "[AudioEngine] Phat am thanh: " << soundName << " o am luong: " << volume * 100 << "%" << endl;
    }

    void setVolume(float v) {
        if (v >= 0.0f && v <= 1.0f) volume = v;
    }
};

AudioEngine* AudioEngine::instance = nullptr;`
  },

  // =========================================================================
  // ITERATOR PATTERN (Bài 4 - Bài 6)
  // =========================================================================
  {
    id: "pattern_4",
    number: 4,
    category: "iterator",
    categoryName: "Mẫu Hành Vi: Iterator Pattern",
    difficulty: "hard",
    points: "3.0 điểm",
    title: "Bài 4: Thiết Kế Bộ Duyệt Danh Sách Sản Phẩm (ProductCollection & Iterator)",
    scenario: `Một trang thương mại điện tử có lớp \`ProductList\` lưu trữ hàng nghìn sản phẩm.
Yêu cầu kiến trúc:
1. Cho phép duyệt tuần tự qua tất cả sản phẩm mà **không được để lộ cấu trúc lưu trữ nội bộ** (dù bên dưới là mảng động, danh sách liên kết hay cây nhị phân).
2. Hỗ trợ tạo nhiều bộ duyệt độc lập chạy cùng một lúc (ví dụ: vừa duyệt hiển thị giao diện, vừa duyệt để tính tổng tiền giỏ hàng).`,
    patternOptions: [
      "Singleton Pattern",
      "Factory Method Pattern",
      "Iterator Pattern",
      "Decorator Pattern"
    ],
    correctPatternIndex: 2,
    patternRationale: "Đề bài yêu cầu duyệt qua các phần tử của một tập hợp mà không làm lộ cấu trúc biểu diễn bên trong và hỗ trợ nhiều bộ duyệt đồng thời -> Iterator Pattern.",
    roleMapping: [
      { role: "Iterator Interface", className: "Iterator", description: "Định nghĩa các hàm ảo thuần túy: `first()`, `next()`, `isDone()`, `currentItem()`." },
      { role: "Concrete Iterator", className: "ProductIterator", description: "Cài đặt cụ thể cách duyệt trên mảng `ProductList`." },
      { role: "Aggregate Interface", className: "IterableCollection", description: "Định nghĩa hàm `createIterator()`." },
      { role: "Concrete Aggregate", className: "ProductList", description: "Lớp chứa danh sách sản phẩm thật, cài đặt `createIterator()` trả về `new ProductIterator(this)`." }
    ],
    umlDiagram: `    <<interface>>                              <<interface>>
  IterableCollection ------------------------>   Iterator
+createIterator()*                           +first()*
        ▲                                    +next()*
        │                                    +isDone()*: bool
        │                                    +currentItem()*: Product
   ProductList <-----------------------  ProductIterator
-products: Product[]    (holds ref)        -currentIdx: int
-count: int`,
    skeletonCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

struct Product {
    string name;
    double price;
};

// 1. Giao diện Iterator
class Iterator {
public:
    virtual ~Iterator() {}
    virtual void first() = 0;
    virtual void next() = 0;
    virtual bool isDone() const = 0;
    virtual Product currentItem() const = 0;
};

// Forward declaration
class ProductList;

// 2. Concrete Iterator
class ProductIterator : public Iterator {
private:
    const ProductList* list;
    int current;
public:
    ProductIterator(const ProductList* l);
    void first() override { current = 0; }
    void next() override { current++; }
    bool isDone() const override;
    Product currentItem() const override;
};

// 3. Giao diện Aggregate
class IterableCollection {
public:
    virtual ~IterableCollection() {}
    virtual Iterator* createIterator() const = 0;
};

// 4. Concrete Aggregate
class ProductList : public IterableCollection {
    friend class ProductIterator;
private:
    vector<Product> items;
public:
    void addProduct(string name, double price) {
        items.push_back({name, price});
    }

    int getCount() const { return items.size(); }
    Product getAt(int idx) const { return items[idx]; }

    Iterator* createIterator() const override {
        return new ProductIterator(this);
    }
};

// Cài đặt phương thức của ProductIterator
ProductIterator::ProductIterator(const ProductList* l) : list(l), current(0) {}
bool ProductIterator::isDone() const { return current >= list->getCount(); }
Product ProductIterator::currentItem() const { return list->getAt(current); }

int main() {
    ProductList shop;
    shop.addProduct("Laptop Dell", 1500.0);
    shop.addProduct("Chuot Logitech", 25.0);
    shop.addProduct("Ban phim co", 80.0);

    Iterator* it = shop.createIterator();
    for (it->first(); !it->isDone(); it->next()) {
        Product p = it->currentItem();
        cout << "- " << p.name << ": $" << p.price << endl;
    }
    delete it;
    return 0;
}`
  },
  {
    id: "pattern_5",
    number: 5,
    category: "iterator",
    categoryName: "Mẫu Hành Vi: Iterator Pattern",
    difficulty: "medium",
    points: "3.0 điểm",
    title: "Bài 5: Thiết Kế Danh Sách Bài Hát & Bộ Duyệt Ngược (Playlist Reverse Iterator)",
    scenario: `Phần mềm nghe nhạc Spotify cần hỗ trợ phát bài hát theo thứ tự ngược lại (từ bài cuối cùng về bài đầu tiên) của một danh sách phát \`Playlist\`.`,
    patternOptions: [
      "Iterator Pattern",
      "Facade Pattern",
      "Builder Pattern",
      "Singleton Pattern"
    ],
    correctPatternIndex: 0,
    patternRationale: "Cung cấp cách duyệt phần tử (duyệt ngược) tách biệt khỏi cấu trúc lưu trữ của Playlist -> Iterator Pattern.",
    roleMapping: [
      { role: "Iterator", className: "SongIterator", description: "Interface duyệt bài hát." },
      { role: "ConcreteIterator", className: "ReverseSongIterator", description: "Duyệt từ `index = count - 1` giảm dần về 0." },
      { role: "Aggregate", className: "Playlist", description: "Tạo bộ duyệt ngược qua `createReverseIterator()`." }
    ],
    umlDiagram: `+-----------------------------------------------+
|                  Playlist                     |
+-----------------------------------------------+
| + createReverseIterator(): SongIterator*      |
+-----------------------------------------------+
                       │
                       ▼
+-----------------------------------------------+
|             ReverseSongIterator               |
+-----------------------------------------------+
| - current: int (init = count - 1)             |
| + next(): current--                           |
+-----------------------------------------------+`,
    skeletonCode: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

class SongIterator {
public:
    virtual ~SongIterator() {}
    virtual void first() = 0;
    virtual void next() = 0;
    virtual bool isDone() const = 0;
    virtual string currentItem() const = 0;
};

class Playlist;

class ReverseSongIterator : public SongIterator {
private:
    const Playlist* playlist;
    int current;
public:
    ReverseSongIterator(const Playlist* p);
    void first() override;
    void next() override { current--; }
    bool isDone() const override { return current < 0; }
    string currentItem() const;
};

class Playlist {
    friend class ReverseSongIterator;
private:
    vector<string> songs;
public:
    void addSong(string song) { songs.push_back(song); }
    int size() const { return songs.size(); }
    string get(int idx) const { return songs[idx]; }

    SongIterator* createReverseIterator() const {
        return new ReverseSongIterator(this);
    }
};

ReverseSongIterator::ReverseSongIterator(const Playlist* p) : playlist(p) { first(); }
void ReverseSongIterator::first() { current = playlist->size() - 1; }
string ReverseSongIterator::currentItem() const { return playlist->get(current); }`
  },
  {
    id: "pattern_6",
    number: 6,
    category: "iterator",
    categoryName: "Mẫu Hành Vi: Iterator Pattern",
    difficulty: "hard",
    points: "3.0 điểm",
    title: "Bài 6: Thiết Kế Bộ Duyệt Cây Thư Mục (FileSystemTree Iterator)",
    scenario: `Hệ điều hành quản lý cây thư mục và tệp tin. Cần cung cấp bộ duyệt theo chiều sâu (Depth-First Search Iterator) để quét toàn bộ file trong ổ đĩa.`,
    patternOptions: [
      "Iterator Pattern",
      "State Pattern",
      "Command Pattern",
      "Prototype Pattern"
    ],
    correctPatternIndex: 0,
    patternRationale: "Cần tách thuật toán duyệt cây thư mục (DFS) ra khỏi cấu trúc dữ liệu node thư mục -> Iterator Pattern.",
    roleMapping: [
      { role: "Iterator", className: "FileIterator", description: "Interface duyệt file." },
      { role: "ConcreteAggregate", className: "DirectoryNode", description: "Cấu trúc thư mục chứa các thư mục con." }
    ],
    umlDiagram: `+-----------------------------------------------+
|                 DirectoryNode                 |
+-----------------------------------------------+
| + createDFSIterator(): FileIterator*          |
+-----------------------------------------------+`,
    skeletonCode: `// Architecture skeleton for FileSystem Iterator
#include <iostream>
#include <string>
#include <vector>
#include <stack>
using namespace std;

class FileNode {
public:
    string name;
    bool isDir;
    vector<FileNode*> children;
    FileNode(string n, bool dir) : name(n), isDir(dir) {}
};

class FileIterator {
public:
    virtual ~FileIterator() {}
    virtual bool hasNext() = 0;
    virtual string next() = 0;
};`
  },

  // =========================================================================
  // FACTORY METHOD PATTERN (Bài 7 - Bài 9)
  // =========================================================================
  {
    id: "pattern_7",
    number: 7,
    category: "factory",
    categoryName: "Mẫu Khởi Tạo: Factory Method Pattern",
    difficulty: "medium",
    points: "3.0 điểm",
    title: "Bài 7: Hệ Thống Gửi Thông Báo Đa Kênh (NotificationFactory)",
    scenario: `Một ứng dụng giao đồ ăn cần gửi thông báo đến khách hàng qua nhiều kênh khác nhau tùy ngữ cảnh: SMS, Email, hoặc Push Notification trên app điện thoại.
Yêu cầu kiến trúc:
1. Khi cần gửi thông báo, Client chỉ cần truyền loại kênh thông báo (\`"SMS"\`, \`"EMAIL"\`, \`"PUSH"\`), hệ thống sẽ tự động khởi tạo đúng đối tượng tương ứng.
2. Dễ dàng mở rộng thêm kênh mới (ví dụ: Zalo Notification) trong tương lai mà không cần sửa đổi mã nguồn xử lý logic của Client (tuân thủ nguyên lý Open/Closed Principle).`,
    patternOptions: [
      "Factory Method Pattern",
      "Singleton Pattern",
      "Iterator Pattern",
      "Decorator Pattern"
    ],
    correctPatternIndex: 0,
    patternRationale: "Đề bài yêu cầu đóng gói quá trình tạo lập đối tượng dựa vào tham số truyền vào runtime và dễ dàng mở rộng lớp sản phẩm mới mà không sửa Client -> Factory Method Pattern.",
    roleMapping: [
      { role: "Product Interface", className: "Notification", description: "Khai báo hàm ảo thuần túy `virtual void send(string message) = 0`." },
      { role: "Concrete Products", className: "SMSNotification, EmailNotification, PushNotification", description: "Cài đặt gửi tin qua từng kênh cụ thể." },
      { role: "Creator / Factory", className: "NotificationFactory", description: "Chứa phương thức `static Notification* createNotification(string type)`." }
    ],
    umlDiagram: `       <<interface>>
        Notification
      +send(msg)*: void
            ▲
     ┌──────┼──────┐
     │      │      │
 SMSNotif EmailNotif PushNotif
 
+-------------------------------------------------------+
|                 NotificationFactory                   |
+-------------------------------------------------------+
| + createNotification(type: string): Notification*    |
+-------------------------------------------------------+`,
    skeletonCode: `#include <iostream>
#include <string>
using namespace std;

// 1. Abstract Product
class Notification {
public:
    virtual ~Notification() {}
    virtual void send(const string& msg) = 0;
};

// 2. Concrete Products
class SMSNotification : public Notification {
public:
    void send(const string& msg) override {
        cout << "[SMS Gateway] Gui tin nhan SMS: " << msg << endl;
    }
};

class EmailNotification : public Notification {
public:
    void send(const string& msg) override {
        cout << "[Email Server] Gui email den hop thu: " << msg << endl;
    }
};

class PushNotification : public Notification {
public:
    void send(const string& msg) override {
        cout << "[FCM Push] Day thong bao len dien thoai: " << msg << endl;
    }
};

// 3. Factory Class
class NotificationFactory {
public:
    static Notification* createNotification(const string& type) {
        if (type == "SMS") return new SMSNotification();
        if (type == "EMAIL") return new EmailNotification();
        if (type == "PUSH") return new PushNotification();
        return nullptr;
    }
};

int main() {
    Notification* n1 = NotificationFactory::createNotification("SMS");
    n1->send("Ma OTP cua ban la 123456");

    Notification* n2 = NotificationFactory::createNotification("PUSH");
    n2->send("Don hang cua ban dang duoc giao!");

    delete n1;
    delete n2;
    return 0;
}`
  },
  {
    id: "pattern_8",
    number: 8,
    category: "factory",
    categoryName: "Mẫu Khởi Tạo: Factory Method Pattern",
    difficulty: "medium",
    points: "3.0 điểm",
    title: "Bài 8: Trình Tạo Tài Liệu Đa Định Dạng (DocumentCreator Factory)",
    scenario: `Phần mềm văn phòng hỗ trợ xuất báo cáo ra 3 định dạng: PDF Document, Word Document, và HTML Document. Cần thiết kế bộ khởi tạo tài liệu chuẩn kiến trúc Factory.`,
    patternOptions: [
      "Factory Method Pattern",
      "Bridge Pattern",
      "Composite Pattern",
      "Flyweight Pattern"
    ],
    correctPatternIndex: 0,
    patternRationale: "Tạo các loại tài liệu cụ thể (PDF, Word, HTML) dựa trên interface chung `Document` -> Factory Method Pattern.",
    roleMapping: [
      { role: "Product", className: "Document", description: "Interface chung có `exportFile()`." },
      { role: "Concrete Product", className: "PDFDocument, WordDocument, HTMLDocument", description: "Cài đặt định dạng file cụ thể." },
      { role: "Factory", className: "DocumentFactory", description: "Tạo đối tượng Document tương ứng." }
    ],
    umlDiagram: `+-----------------------------------------------+
|                DocumentFactory                |
+-----------------------------------------------+
| + createDocument(type: string): Document*     |
+-----------------------------------------------+`,
    skeletonCode: `#include <iostream>
#include <string>
using namespace std;

class Document {
public:
    virtual ~Document() {}
    virtual void exportFile() = 0;
};

class PDFDocument : public Document {
public:
    void exportFile() override { cout << "Xuat file bao cao: report.pdf" << endl; }
};

class WordDocument : public Document {
public:
    void exportFile() override { cout << "Xuat file bao cao: report.docx" << endl; }
};

class HTMLDocument : public Document {
public:
    void exportFile() override { cout << "Xuat file bao cao: report.html" << endl; }
};

class DocumentFactory {
public:
    static Document* create(const string& type) {
        if (type == "pdf") return new PDFDocument();
        if (type == "word") return new WordDocument();
        if (type == "html") return new HTMLDocument();
        return nullptr;
    }
};`
  },
  {
    id: "pattern_9",
    number: 9,
    category: "factory",
    categoryName: "Mẫu Khởi Tạo: Factory Method Pattern",
    difficulty: "medium",
    points: "3.0 điểm",
    title: "Bài 9: Hệ Thống Sinh Quái Vật Trong Game (Monster Spawner Factory)",
    scenario: `Trong game RPG, tùy thuộc vào độ khó của màn chơi (Level 1, Level 2, Boss Level), trò chơi cần sinh ra các loại quái vật khác nhau (\`Goblin\`, \`Dragon\`, \`Zombie\`) tại các tọa độ ngẫu nhiên.`,
    patternOptions: [
      "Factory Method Pattern",
      "Proxy Pattern",
      "Chain of Responsibility",
      "Mediator Pattern"
    ],
    correctPatternIndex: 0,
    patternRationale: "Đóng gói logic sinh quái vật theo loại màn chơi mà không ràng buộc mã nguồn game engine chính -> Factory Method Pattern.",
    roleMapping: [
      { role: "Product", className: "Monster", description: "Interface quái vật." },
      { role: "Factory", className: "MonsterSpawner", description: "Sinh quái vật theo loại." }
    ],
    umlDiagram: `+-----------------------------------------------+
|                MonsterSpawner                 |
+-----------------------------------------------+
| + spawnMonster(type: string): Monster*        |
+-----------------------------------------------+`,
    skeletonCode: `#include <iostream>
#include <string>
using namespace std;

class Monster {
public:
    virtual ~Monster() {}
    virtual void roar() = 0;
};

class Goblin : public Monster {
public:
    void roar() override { cout << "Goblin: Hehehe!" << endl; }
};

class Dragon : public Monster {
public:
    void roar() override { cout << "Dragon: ROAAARRR (Phun lua)!" << endl; }
};

class MonsterSpawner {
public:
    static Monster* spawn(const string& type) {
        if (type == "goblin") return new Goblin();
        if (type == "dragon") return new Dragon();
        return nullptr;
    }
};`
  },

  // =========================================================================
  // BEHAVIORAL / STRATEGY PATTERN (Bài 10)
  // =========================================================================
  {
    id: "pattern_10",
    number: 10,
    category: "other",
    categoryName: "Mẫu Hành Vi: Strategy Pattern",
    difficulty: "hard",
    points: "3.0 điểm",
    title: "Bài 10: Thiết Kế Hệ Thống Xử Lý Thanh Toán (Payment Strategy Pattern)",
    scenario: `Một ứng dụng mua sắm cho phép người dùng chọn phương thức thanh toán linh hoạt lúc checkout: Thanh toán thẻ tín dụng (Credit Card), Ví điện tử Momo, hoặc Tiền mặt khi nhận hàng (COD). Cần thiết kế để thuật toán thanh toán có thể hoán đổi linh hoạt lúc runtime.`,
    patternOptions: [
      "Strategy Pattern",
      "Singleton Pattern",
      "Decorator Pattern",
      "Memento Pattern"
    ],
    correctPatternIndex: 0,
    patternRationale: "Cần đóng gói các thuật toán thanh toán khác nhau thành các lớp riêng biệt và có thể thay đổi linh hoạt lúc runtime -> Strategy Pattern.",
    roleMapping: [
      { role: "Strategy Interface", className: "PaymentStrategy", description: "Khai báo `virtual void pay(double amount) = 0`." },
      { role: "Concrete Strategy", className: "CreditCardPayment, MomoPayment, CODPayment", description: "Cài đặt thuật toán thanh toán cụ thể." },
      { role: "Context", className: "ShoppingCart", description: "Chứa con trỏ `PaymentStrategy*` và gọi `strategy->pay(total)`." }
    ],
    umlDiagram: `+-----------------------------------------------+
|                 ShoppingCart                  |
+-----------------------------------------------+
| - paymentMethod: PaymentStrategy*             |
| + setPaymentStrategy(s: PaymentStrategy*)     |
| + checkout(): void                            |
+-----------------------------------------------+
                       │
                       ▼
        <<interface>> PaymentStrategy
             +pay(amount)*: void
                       ▲
         ┌─────────────┼─────────────┐
   CreditCardPay    MomoPay       CODPay`,
    skeletonCode: `#include <iostream>
using namespace std;

// 1. Strategy Interface
class PaymentStrategy {
public:
    virtual ~PaymentStrategy() {}
    virtual void pay(double amount) = 0;
};

// 2. Concrete Strategies
class CreditCardPayment : public PaymentStrategy {
public:
    void pay(double amount) override {
        cout << "[CreditCard] Thanh toan $" << amount << " qua the tin dung quoc te." << endl;
    }
};

class MomoPayment : public PaymentStrategy {
public:
    void pay(double amount) override {
        cout << "[Momo Wallet] Quet ma QR thanh toan $" << amount << " qua Vi Momo." << endl;
    }
};

// 3. Context
class ShoppingCart {
private:
    double totalAmount;
    PaymentStrategy* paymentMethod;
public:
    ShoppingCart(double total) : totalAmount(total), paymentMethod(nullptr) {}

    void setPaymentMethod(PaymentStrategy* strategy) {
        paymentMethod = strategy;
    }

    void checkout() {
        if (paymentMethod) {
            paymentMethod->pay(totalAmount);
        } else {
            cout << "Vui long chon phuong thuc thanh toan!" << endl;
        }
    }
};

int main() {
    ShoppingCart cart(250.0);

    MomoPayment momo;
    cart.setPaymentMethod(&momo);
    cart.checkout();

    CreditCardPayment visa;
    cart.setPaymentMethod(&visa);
    cart.checkout();

    return 0;
}`
  }
];
