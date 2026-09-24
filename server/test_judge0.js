async function test() {
  try {
    const code = `#include <iostream>
using namespace std;
int main() {
    int a, b;
    if (cin >> a >> b) {
        cout << a + b;
    } else {
        cout << "Hello World";
    }
    return 0;
}`;

    console.log('Sending request to Judge0...');
    const res = await fetch('https://ce.judge0.com/submissions?base64_encoded=false&wait=true', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language_id: 54,
        source_code: code,
        stdin: '10 20'
      })
    });

    const data = await res.json();
    console.log('Judge0 result status:', res.status, data);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
