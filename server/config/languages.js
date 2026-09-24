/**
 * Centralized Language Configuration & Judge0 Mapping
 */

export const SUPPORTED_LANGUAGES = {
  c: {
    id: 'c',
    name: 'C (GCC)',
    judge0Id: 50,
    monacoLang: 'c',
    extension: 'c',
    starterCode: `#include <stdio.h>

int main() {
    printf("Hello World\\n");
    return 0;
}
`
  },
  cpp: {
    id: 'cpp',
    name: 'C++ (GCC 12)',
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
  java: {
    id: 'java',
    name: 'Java (JDK 17)',
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
    name: 'JavaScript (Node.js)',
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

export const getJudge0LanguageId = (input) => {
  if (!input) return 54; // default C++
  if (typeof input === 'number') return input;
  const num = parseInt(input, 10);
  if (!isNaN(num) && [50, 54, 62, 63, 71].includes(num)) return num;

  const key = String(input).toLowerCase();
  const lang = SUPPORTED_LANGUAGES[key];
  if (lang) return lang.judge0Id;

  // Fallback lookup by judge0Id string
  const found = Object.values(SUPPORTED_LANGUAGES).find(l => l.id === key || l.judge0Id === num);
  if (found) return found.judge0Id;

  throw new Error(`Unsupported programming language: '${input}'`);
};
