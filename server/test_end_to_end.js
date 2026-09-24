async function runTests() {
  console.log('=== STARTING END-TO-END CODE EXECUTION TESTS ===\n');

  // Test 1: C++ Addition
  console.log('1. Testing C++ Execution...');
  try {
    const cppRes = await fetch('http://localhost:5000/api/code/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'cpp',
        languageId: 54,
        sourceCode: `#include <iostream>
using namespace std;
int main() {
    int a, b;
    if (cin >> a >> b) {
        cout << a + b;
    } else {
        cout << "Hello World";
    }
    return 0;
}`,
        stdin: '10 20'
      })
    });
    const cppData = await cppRes.json();
    console.log('   C++ Result:', cppData.stdout?.trim() === '30' ? '✓ SUCCESS (stdout: 30)' : '✗ FAILED', cppData);
  } catch (e) {
    console.error('   C++ Test Error:', e.message);
  }

  // Test 2: Python Addition
  console.log('\n2. Testing Python Execution...');
  try {
    const pyRes = await fetch('http://localhost:5000/api/code/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'python',
        languageId: 71,
        sourceCode: `import sys
lines = sys.stdin.read().split()
if len(lines) >= 2:
    print(int(lines[0]) + int(lines[1]))
else:
    print("Hello World")`,
        stdin: '10 20'
      })
    });
    const pyData = await pyRes.json();
    console.log('   Python Result:', pyData.stdout?.trim() === '30' ? '✓ SUCCESS (stdout: 30)' : '✗ FAILED', pyData);
  } catch (e) {
    console.error('   Python Test Error:', e.message);
  }

  // Test 3: JavaScript Addition
  console.log('\n3. Testing JavaScript Execution...');
  try {
    const jsRes = await fetch('http://localhost:5000/api/code/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'javascript',
        languageId: 63,
        sourceCode: `const fs = require('fs');
const input = fs.readFileSync(0, 'utf8').trim().split(/\\s+/).map(Number);
console.log(input[0] + input[1]);`,
        stdin: '10 20'
      })
    });
    const jsData = await jsRes.json();
    console.log('   JS Result:', jsData.stdout?.trim() === '30' ? '✓ SUCCESS (stdout: 30)' : '✗ FAILED', jsData);
  } catch (e) {
    console.error('   JS Test Error:', e.message);
  }

  // Test 4: Compilation Error Test
  console.log('\n4. Testing C++ Compilation Error...');
  try {
    const errRes = await fetch('http://localhost:5000/api/code/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'cpp',
        languageId: 54,
        sourceCode: `#include <iostream>
using namespace std;
int main() {
    cout << "Missing semicolon"
    return 0;
}`,
        stdin: ''
      })
    });
    const errData = await errRes.json();
    console.log('   Compilation Error Result:', (errData.compile_output || errData.stderr) ? '✓ SUCCESS (Error caught)' : 'Format issue', errData);
  } catch (e) {
    console.error('   Compilation Error Test Failed:', e.message);
  }

  // Test 5: Submit Endpoint Evaluation
  console.log('\n5. Testing Submit Endpoint Evaluation...');
  try {
    const subRes = await fetch('http://localhost:5000/api/code/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        problemSlug: 'two-sum',
        language: 'cpp',
        languageId: 54,
        sourceCode: `#include <iostream>
using namespace std;
int main() {
    cout << "[0, 1]";
    return 0;
}`
      })
    });
    const subData = await subRes.json();
    console.log('   Submit Verdict:', subData.verdict, `(Passed: ${subData.passedCount}/${subData.totalCount})`);
  } catch (e) {
    console.error('   Submit Test Failed:', e.message);
  }

  console.log('\n=== END-TO-END TESTS COMPLETE ===');
}

runTests();
