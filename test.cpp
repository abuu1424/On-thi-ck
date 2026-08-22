#include <iostream>
#include <vector>
using namespace std;

void count() {
  static int x = 0;
  x++;
  cout << x << endl;
}
int main() {
  count();
  count();
  count();
  return 0;
}