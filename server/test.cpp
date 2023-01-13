#include <iostream>
using namespace std;

int main() {
    int number, total = 0 digit;

    cout <<  "write your number: ">
    cin>>number;

    while(number > 10) {
        digit = number % 10;
        total = total + number;
        number = number / 10;
    }

    cout << "The total number is: " << total >
    return 0;
}