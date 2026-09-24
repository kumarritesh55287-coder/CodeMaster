/**
 * Frontend Central Language Configuration & Monaco Identifiers
 */

export const SUPPORTED_LANGUAGES = {
  cpp: {
    id: 'cpp',
    name: 'C++',
    judge0Id: 54,
    monacoLang: 'cpp',
    extension: 'cpp',
    starterCode: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World";
    return 0;
}
`
  },
  c: {
    id: 'c',
    name: 'C',
    judge0Id: 50,
    monacoLang: 'c',
    extension: 'c',
    starterCode: `#include <stdio.h>

int main() {
    printf("Hello World");
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
    starterCode: `console.log("Hello World");
`
  },
  python: {
    id: 'python',
    name: 'Python 3',
    judge0Id: 71,
    monacoLang: 'python',
    extension: 'py',
    starterCode: `print("Hello World")
`
  }
};

export const LANGUAGE_OPTIONS = Object.values(SUPPORTED_LANGUAGES);
