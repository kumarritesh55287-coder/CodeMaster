/**
 * Centralized Language Configuration & Judge0 Mapping
 */

export const SUPPORTED_LANGUAGES = {
  c: {
    id: 'c',
    name: 'C',
    judge0Id: 50,
    monacoLang: 'c',
    extension: 'c',
    starterCode: `#include <stdio.h>

int main() {
    // Write your C code here
    printf("Hello World\\n");
    return 0;
}
`
  },
  cpp: {
    id: 'cpp',
    name: 'C++',
    judge0Id: 54,
    monacoLang: 'cpp',
    extension: 'cpp',
    starterCode: `#include <iostream>
using namespace std;

int main() {
    // Write your C++ code here
    cout << "Hello World" << endl;
    return 0;
}
`
  },
  java: {
    id: 'java',
    name: 'Java',
    judge0Id: 62,
    monacoLang: 'java',
    extension: 'java',
    starterCode: `public class Main {
    public static void main(String[] args) {
        // Write your Java code here
        System.out.println("Hello World");
    }
}
`
  },
  javascript: {
    id: 'javascript',
    name: 'JavaScript',
    judge0Id: 63,
    monacoLang: 'javascript',
    extension: 'js',
    starterCode: `// Write your JavaScript code here
console.log("Hello World");
`
  },
  python: {
    id: 'python',
    name: 'Python 3',
    judge0Id: 71,
    monacoLang: 'python',
    extension: 'py',
    starterCode: `# Write your Python code here
print("Hello World")
`
  }
};

export const getJudge0LanguageId = (langKey) => {
  const lang = SUPPORTED_LANGUAGES[langKey?.toLowerCase()];
  if (!lang) {
    throw new Error(`Unsupported programming language: '${langKey}'`);
  }
  return lang.judge0Id;
};
