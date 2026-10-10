/* ============================================================
   C TRACK: c-1 through c-50

   Every level here runs on the interpreter in c-sim.js, which needs no
   download. Each level's expected output was produced by real clang and
   checked byte for byte by c-crosscheck.js, so what a learner sees is
   what C actually prints.

   The track is shaped like a course:
     1-12  output, variables, arithmetic
     13-22 decisions and loops
     23-30 functions
     31-38 arrays and strings
     39-46 pointers and structs
     47-50 a small program each

   Loaded after levels.js and appended to TRACKS.c.
   ============================================================ */
var C_PART2 = [

  /* ---------------------------------------------------------
     BASICS
     --------------------------------------------------------- */
  {
    id: 'c-1', title: 'Hello, C', xp: 10,
    teaches: 'Every C program starts at main and ends with return 0.',
    brief: 'Print <code>Hello, C</code> using <code>printf</code>.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  \n  return 0;\n}\n',
    hint: 'printf("Hello, C\\n");',
    checks: [
      { name: 'it prints Hello, C', code: 'return out.join("\\n") === "Hello, C";', fail: 'printf("Hello, C\\n");' }
    ]
  },
  {
    id: 'c-2', title: 'A variable', xp: 10,
    teaches: 'Declare a variable with its type, give it a value, then print it.',
    brief: 'Make an <code>int</code> called <code>age</code> set to <code>20</code> and print it.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  \n  printf("%d\\n", age);\n  return 0;\n}\n',
    hint: 'int age = 20;',
    checks: [{ name: 'it prints 20', code: 'return out.join("").trim() === "20";', fail: 'int age = 20;' }]
  },
  {
    id: 'c-3', title: 'Two variables', xp: 10,
    teaches: 'Several variables can be declared in one statement.',
    brief: 'Make an <code>int</code> <code>w</code> of 5 and an <code>int</code> <code>h</code> of 8, then print both on one line separated by a space.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  \n  printf("%d %d\\n", w, h);\n  return 0;\n}\n',
    hint: 'int w = 5, h = 8;',
    checks: [{ name: 'it prints 5 8', code: 'return out.join("").trim() === "5 8";', fail: 'int w = 5, h = 8;' }]
  },
  {
    id: 'c-4', title: 'Add two numbers', xp: 10,
    teaches: 'C evaluates the expression before printing it.',
    brief: 'Print the sum of 17 and 3.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  \n  return 0;\n}\n',
    hint: 'printf("%d\\n", 17 + 3);',
    checks: [{ name: 'it prints 20', code: 'return out.join("").trim() === "20";', fail: '17 + 3 is 20.' }]
  },
  {
    id: 'c-5', title: 'Subtract', xp: 10,
    teaches: 'The minus sign works on numbers as you would expect.',
    brief: 'Print 100 minus 58.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  \n  return 0;\n}\n',
    hint: 'printf("%d\\n", 100 - 58);',
    checks: [{ name: 'it prints 42', code: 'return out.join("").trim() === "42";', fail: '100 - 58 is 42.' }]
  },
  {
    id: 'c-6', title: 'Multiply', xp: 10,
    teaches: 'In C the multiply sign is *, not x.',
    brief: 'Print 12 times 7.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  \n  return 0;\n}\n',
    hint: 'printf("%d\\n", 12 * 7);',
    checks: [{ name: 'it prints 84', code: 'return out.join("").trim() === "84";', fail: '12 * 7 is 84.' }]
  },
  {
    id: 'c-7', title: 'Integer division', xp: 15,
    teaches: 'Two ints divide to an int. The decimal part is dropped, not rounded.',
    brief: 'Print 17 divided by 5. Then print the remainder.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  \n  return 0;\n}\n',
    hint: '17 / 5 is 3, and 17 % 5 is 2.',
    checks: [{ name: 'it prints 3 then 2', code: 'return out.join("\\n") === "3\\n2";', fail: '17/5 = 3 and 17%5 = 2.' }]
  },
  {
    id: 'c-8', title: 'Division order', xp: 15,
    teaches: 'Multiplication and division are done before addition.',
    brief: 'Print 2 + 3 times 4.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  \n  return 0;\n}\n',
    hint: '3 * 4 is done first, so the answer is 14.',
    checks: [{ name: 'it prints 14', code: 'return out.join("").trim() === "14";', fail: 'Multiplication happens before addition: 14.' }]
  },
  {
    id: 'c-9', title: 'Changing a variable', xp: 15,
    teaches: 'A variable can be reassigned at any time.',
    brief: 'Make <code>int n</code> set to 5, add 3 to it, then print it.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  int n = 5;\n  \n  printf("%d\\n", n);\n  return 0;\n}\n',
    hint: 'n += 3;  or  n = n + 3;',
    checks: [{ name: 'it prints 8', code: 'return out.join("").trim() === "8";', fail: '5 + 3 is 8.' }]
  },
  {
    id: 'c-10', title: 'Count up', xp: 15,
    teaches: '++ adds one and gives the new value. n++ also works.',
    brief: 'Make <code>int n</code> set to 1. Print it, add one, print it, and again.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  int n = 1;\n  \n  return 0;\n}\n',
    hint: 'printf("%d ", n); n++;',
    checks: [{ name: 'it prints 1 2 3', code: 'return out.join("").trim() === "1 2 3";', fail: 'Print, then n++, three times.' }]
  },
  {
    id: 'c-11', title: 'A float', xp: 15,
    teaches: 'float and double hold decimals. %.2f prints two decimal places.',
    brief: 'Print 3.14159 rounded to two decimal places.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  \n  return 0;\n}\n',
    hint: 'printf("%.2f\\n", 3.14159);',
    checks: [{ name: 'it prints 3.14', code: 'return out.join("").trim() === "3.14";', fail: '%.2f rounds to 3.14.' }]
  },
  {
    id: 'c-12', title: 'Width in printf', xp: 20,
    teaches: 'A number in the format sets a minimum field width.',
    brief: 'Print <code>42</code> right-aligned in a field of 6.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  \n  return 0;\n}\n',
    hint: 'printf("%6d\\n", 42);',
    checks: [{ name: 'it pads 42 to six characters', code: 'return out.join("").indexOf("42") === 4;', fail: '%6d pads 42 to six characters, so it starts at position 4.' }]
  },

  /* ---------------------------------------------------------
     DECISIONS AND LOOPS
     --------------------------------------------------------- */
  {
    id: 'c-13', title: 'if', xp: 15,
    teaches: 'A condition in parentheses decides whether a block runs.',
    brief: 'If <code>n</code> is over 5, print <code>big</code>, otherwise print <code>small</code>. Set <code>n</code> to 10.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  int n = 10;\n  \n  return 0;\n}\n',
    hint: 'if (n > 5) printf("big\\n"); else printf("small\\n");',
    checks: [{ name: 'it prints big', code: 'return out.join("").trim() === "big";', fail: 'n is 10, so big.' }]
  },
  {
    id: 'c-14', title: 'if and else', xp: 15,
    teaches: 'else catches everything the if did not.',
    brief: 'Set <code>n</code> to 3 and print <code>small</code> because it is not over 5.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  int n = 3;\n  \n  return 0;\n}\n',
    hint: 'if (n > 5) printf("big\\n"); else printf("small\\n");',
    checks: [{ name: 'it prints small', code: 'return out.join("").trim() === "small";', fail: 'n is 3, so small.' }]
  },
  {
    id: 'c-15', title: 'Braces matter', xp: 20,
    teaches: 'Without braces an if only controls the next statement.',
    brief: 'Print <code>yes</code> when <code>n</code> is over 0, then always print <code>done</code> on its own line.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  int n = 1;\n  \n  return 0;\n}\n',
    hint: 'Use braces around both printf calls so done always runs.',
    checks: [{ name: 'it prints yes then done', code: 'return out.join("\\n") === "yes\\ndone";', fail: 'yes on one line, done on the next.' }]
  },
  {
    id: 'c-16', title: 'while', xp: 20,
    teaches: 'A while loop repeats while its condition stays true.',
    brief: 'Start <code>n</code> at 3. Print it, subtract one, and repeat until it reaches 0.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  int n = 3;\n  \n  return 0;\n}\n',
    hint: 'while (n > 0) { printf("%d", n); n--; }',
    checks: [{ name: 'it prints 321', code: 'return out.join("").trim() === "321";', fail: '3, then 2, then 1.' }]
  },
  {
    id: 'c-17', title: 'Countdown to zero', xp: 20,
    teaches: 'A loop can run any number of times as long as the condition holds.',
    brief: 'Start <code>n</code> at 5 and print each number down to 1, each on its own line.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  int n = 5;\n  \n  return 0;\n}\n',
    hint: 'while (n >= 1) { printf("%d\\n", n); n--; }',
    checks: [{ name: 'it prints 5 down to 1', code: 'return out.join("\\n") === "5\\n4\\n3\\n2\\n1";', fail: 'One number per line, ending at 1.' }]
  },
  {
    id: 'c-18', title: 'for loop', xp: 20,
    teaches: 'for sets up, tests and updates in one line.',
    brief: 'Print the numbers 1 to 5, each on its own line.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  \n  return 0;\n}\n',
    hint: 'for (int i = 1; i <= 5; i++) printf("%d\\n", i);',
    checks: [{ name: 'it prints 1 to 5', code: 'return out.join("\\n") === "1\\n2\\n3\\n4\\n5";', fail: 'One per line, 1 through 5.' }]
  },
  {
    id: 'c-19', title: 'Sum in a loop', xp: 20,
    teaches: 'A loop can accumulate into a variable.',
    brief: 'Add up the numbers 1 to 10 and print the total.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  int sum = 0;\n  \n  return 0;\n}\n',
    hint: 'for (int i = 1; i <= 10; i++) sum += i;',
    checks: [{ name: 'it prints 55', code: 'return out.join("").trim() === "55";', fail: '1 to 10 adds up to 55.' }]
  },
  {
    id: 'c-20', title: 'Even and odd', xp: 25,
    teaches: 'The remainder operator decides whether a number divides evenly.',
    brief: 'Print every even number from 2 to 10, each on its own line.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  \n  return 0;\n}\n',
    hint: 'if (i % 2 == 0) printf("%d\\n", i);',
    checks: [{ name: 'it prints 2 4 6 8 10', code: 'return out.join("\\n") === "2\\n4\\n6\\n8\\n10";', fail: 'Five lines: 2, 4, 6, 8, 10.' }]
  },
  {
    id: 'c-21', title: 'break', xp: 25,
    teaches: 'break leaves the loop immediately.',
    brief: 'Print numbers 1 upwards until you reach 5, then stop without printing 5.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  \n  return 0;\n}\n',
    hint: 'for (int i = 1; i <= 10; i++) { if (i == 5) break; printf("%d ", i); }',
    checks: [{ name: 'it prints 1 2 3 4', code: 'return out.join("").trim() === "1 2 3 4";', fail: 'Stop before printing 5.' }]
  },
  {
    id: 'c-22', title: 'continue', xp: 25,
    teaches: 'continue skips the rest of this turn but keeps looping.',
    brief: 'Print only the odd numbers from 1 to 9, separated by spaces.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  \n  return 0;\n}\n',
    hint: 'if (i % 2 == 0) continue;',
    checks: [{ name: 'it prints 1 3 5 7 9', code: 'return out.join("").trim() === "1 3 5 7 9";', fail: 'Five odd numbers, space separated.' }]
  },

  /* ---------------------------------------------------------
     FUNCTIONS
     --------------------------------------------------------- */
  {
    id: 'c-23', title: 'Your first function', xp: 20,
    teaches: 'A function has a return type, a name and a parameter list.',
    brief: 'Write <code>int add(int a, int b)</code> that returns the sum, then print <code>add(3, 4)</code>.',
    starter: '#include <stdio.h>\n\nint add(int a, int b) {\n  \n}\n\nint main(void) {\n  printf("%d\\n", add(3, 4));\n  return 0;\n}\n',
    hint: 'return a + b;',
    checks: [{ name: 'it prints 7', code: 'return out.join("").trim() === "7";', fail: 'add returns a + b, so 3 + 4 is 7.' }]
  },
  {
    id: 'c-24', title: 'Double it', xp: 20,
    teaches: 'A function can be called as many times as you like.',
    brief: 'Write <code>int twice(int n)</code> that returns <code>n * 2</code>. Print it on 5, 8 and 12.',
    starter: '#include <stdio.h>\n\nint twice(int n) {\n  \n}\n\nint main(void) {\n  printf("%d %d %d\\n", twice(5), twice(8), twice(12));\n  return 0;\n}\n',
    hint: 'return n * 2;',
    checks: [{ name: 'it prints 10 16 24', code: 'return out.join("").trim() === "10 16 24";', fail: '5, 8 and 12 doubled.' }]
  },
  {
    id: 'c-25', title: 'Even or odd', xp: 25,
    teaches: 'A function can return 1 for true and 0 for false.',
    brief: 'Write <code>int isEven(int n)</code> returning 1 when <code>n</code> is even, otherwise 0. Print it for 4 and 7.',
    starter: '#include <stdio.h>\n\nint isEven(int n) {\n  \n}\n\nint main(void) {\n  printf("%d %d\\n", isEven(4), isEven(7));\n  return 0;\n}\n',
    hint: 'return n % 2 == 0;',
    checks: [{ name: 'it prints 1 0', code: 'return out.join("").trim() === "1 0";', fail: '4 is even (1), 7 is not (0).' }]
  },
  {
    id: 'c-26', title: 'Local variables', xp: 25,
    teaches: 'Variables declared inside a function only exist there.',
    brief: 'Write <code>int square(int n)</code> that returns <code>n * n</code> and prints it locally. Call it on 7.',
    starter: '#include <stdio.h>\n\nint square(int n) {\n  \n}\n\nint main(void) {\n  printf("%d\\n", square(7));\n  return 0;\n}\n',
    hint: 'return n * n;',
    checks: [{ name: 'it prints 49', code: 'return out.join("").trim() === "49";', fail: '7 squared is 49.' }]
  },
  {
    id: 'c-27', title: 'void functions', xp: 25,
    teaches: 'A function that does not return anything is declared void.',
    brief: 'Write <code>void greet(void)</code> that prints <code>hello</code>. Call it once.',
    starter: '#include <stdio.h>\n\nvoid greet(void) {\n  \n}\n\nint main(void) {\n  greet();\n  return 0;\n}\n',
    hint: 'void means it returns nothing, so it only calls printf.',
    checks: [{ name: 'it prints hello', code: 'return out.join("").trim() === "hello";', fail: 'greet prints hello.' }]
  },
  {
    id: 'c-28', title: 'Recursion', xp: 30,
    teaches: 'A function can call itself. It needs a base case to stop.',
    brief: 'Write <code>int fact(int n)</code> returning <code>n * (n-1) * ... * 1</code>, with <code>fact(1) = 1</code>. Print <code>fact(5)</code>.',
    starter: '#include <stdio.h>\n\nint fact(int n) {\n  \n}\n\nint main(void) {\n  printf("%d\\n", fact(5));\n  return 0;\n}\n',
    hint: 'if (n <= 1) return 1;  return n * fact(n - 1);',
    checks: [{ name: 'it prints 120', code: 'return out.join("").trim() === "120";', fail: 'fact(5) is 5 * 4 * 3 * 2 * 1 = 120.' }]
  },
  {
    id: 'c-29', title: 'Fibonacci', xp: 30,
    teaches: 'Recursion often needs two calls back to back.',
    brief: 'Write <code>int fib(int n)</code> where <code>fib(0)=0</code> and <code>fib(1)=1</code>. Print the first eight, space separated.',
    starter: '#include <stdio.h>\n\nint fib(int n) {\n  \n}\n\nint main(void) {\n  for (int i = 0; i < 8; i++) printf("%d ", fib(i));\n  printf("\\n");\n  return 0;\n}\n',
    hint: 'if (n < 2) return n;  return fib(n - 1) + fib(n - 2);',
    checks: [{ name: 'it prints the first eight', code: 'return out.join("").trim() === "0 1 1 2 3 5 8 13";', fail: '0 1 1 2 3 5 8 13' }]
  },
  {
    id: 'c-30', title: 'Pass by value', xp: 30,
    teaches: 'C hands functions a copy, so the caller is not changed.',
    brief: 'Write <code>void tryChange(int n)</code> that sets <code>n = 99</code>. Call it on 5, then print <code>n</code>.',
    starter: '#include <stdio.h>\n\nvoid tryChange(int n) {\n  \n}\n\nint main(void) {\n  int n = 5;\n  tryChange(n);\n  printf("%d\\n", n);\n  return 0;\n}\n',
    hint: 'n = 99; inside the function. main still sees 5.',
    checks: [{ name: 'it prints 5', code: 'return out.join("").trim() === "5";', fail: 'n is passed by value, so main still has 5.' }]
  },

  /* ---------------------------------------------------------
     ARRAYS AND STRINGS
     --------------------------------------------------------- */
  {
    id: 'c-31', title: 'An array', xp: 25,
    teaches: 'An array holds several values of one type, indexed from 0.',
    brief: 'Make <code>int a[5]</code> holding 1 2 3 4 5, then print the third element.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  \n  return 0;\n}\n',
    hint: 'int a[5] = {1,2,3,4,5};  then printf("%d\\n", a[2]);',
    checks: [{ name: 'it prints 3', code: 'return out.join("").trim() === "3";', fail: 'The third element is a[2], which is 3.' }]
  },
  {
    id: 'c-32', title: 'Sum an array', xp: 25,
    teaches: 'Arrays work well with a for loop over the indices.',
    brief: 'Add up <code>int a[5] = {4, 8, 15, 16, 23}</code> and print the total.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  int a[5] = {4, 8, 15, 16, 23};\n  \n  return 0;\n}\n',
    hint: 'for (int i = 0; i < 5; i++) sum += a[i];',
    checks: [{ name: 'it prints 66', code: 'return out.join("").trim() === "66";', fail: '4 + 8 + 15 + 16 + 23 = 66.' }]
  },
  {
    id: 'c-33', title: 'Find the biggest', xp: 30,
    teaches: 'Keep the largest value seen so far while you loop.',
    brief: 'From <code>int a[6] = {7, 3, 19, 8, 25, 14}</code>, print the largest.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  int a[6] = {7, 3, 19, 8, 25, 14};\n  \n  return 0;\n}\n',
    hint: 'Start max at a[0], then compare each element with it.',
    checks: [{ name: 'it prints 25', code: 'return out.join("").trim() === "25";', fail: '25 is the largest of the six.' }]
  },
  {
    id: 'c-34', title: 'Reverse an array', xp: 30,
    teaches: 'Two indices walking toward each other can reverse in place.',
    brief: 'Print <code>int a[5] = {1,2,3,4,5}</code> in reverse order, space separated.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  int a[5] = {1,2,3,4,5};\n  \n  return 0;\n}\n',
    hint: 'for (int i = 4; i >= 0; i--) printf("%d ", a[i]);',
    checks: [{ name: 'it prints 5 4 3 2 1', code: 'return out.join("").trim() === "5 4 3 2 1";', fail: 'Print a[4] down to a[0].' }]
  },
  {
    id: 'c-35', title: 'A 2D array', xp: 30,
    teaches: 'A 2D array is an array of arrays: a[rows][columns].',
    brief: 'Print the total of <code>int g[2][3] = {{1,2,3},{4,5,6}}</code> using two nested loops.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  int g[2][3] = {{1,2,3},{4,5,6}};\n  \n  return 0;\n}\n',
    hint: 'Two loops: the outer one over i, the inner over j.',
    checks: [{ name: 'it prints 21', code: 'return out.join("").trim() === "21";', fail: '1+2+3+4+5+6 = 21.' }]
  },
  {
    id: 'c-36', title: 'Strings are arrays', xp: 30,
    teaches: 'A string in C is a char array ending in a zero byte.',
    brief: 'Print the third character of <code>char s[] = "hello"</code>.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  char s[] = "hello";\n  \n  return 0;\n}\n',
    hint: 'printf("%c\\n", s[2]);',
    checks: [{ name: 'it prints l', code: 'return out.join("").trim() === "l";', fail: 'h is 0, e is 1, l is 2.' }]
  },
  {
    id: 'c-37', title: 'strlen', xp: 30,
    teaches: 'strlen counts the characters before the zero byte.',
    brief: 'Print the length of <code>char s[] = "hello"</code>.',
    starter: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n  char s[] = "hello";\n  \n  return 0;\n}\n',
    hint: '#include <string.h> then printf("%d\\n", (int)strlen(s));',
    checks: [{ name: 'it prints 5', code: 'return out.join("").trim() === "5";', fail: 'hello has five letters.' }]
  },
  {
    id: 'c-38', title: 'Copy a string', xp: 30,
    teaches: 'strcpy copies one char array into another.',
    brief: 'Copy <code>"world"</code> into <code>char a[20]</code> and print it in brackets.',
    starter: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n  char a[20];\n  char b[] = "world";\n  \n  return 0;\n}\n',
    hint: 'strcpy(a, b);  then printf("[%s]\\n", a);',
    checks: [{ name: 'it prints [world]', code: 'return out.join("").trim() === "[world]";', fail: 'Copy b into a first.' }]
  },

  /* ---------------------------------------------------------
     POINTERS AND STRUCTS
     --------------------------------------------------------- */
  {
    id: 'c-39', title: 'What is a pointer', xp: 30,
    teaches: '&x is the address of x, and int *p holds that address.',
    brief: 'Set <code>int v = 42</code>, point a pointer at it, then print what it points to.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  int v = 42;\n  \n  return 0;\n}\n',
    hint: 'int *p = &v;  then printf("%d\\n", *p);',
    checks: [{ name: 'it prints 42', code: 'return out.join("").trim() === "42";', fail: '*p reads the value v points to.' }]
  },
  {
    id: 'c-40', title: 'Write through a pointer', xp: 30,
    teaches: 'Changing *p changes the original variable, because it is the same memory.',
    brief: 'Set <code>int v = 42</code>. Point a pointer at it, add 8 through the pointer, then print <code>v</code>.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  int v = 42;\n  \n  return 0;\n}\n',
    hint: '*p = *p + 8;  then printf("%d\\n", v);',
    checks: [{ name: 'it prints 50', code: 'return out.join("").trim() === "50";', fail: '42 + 8 is 50, and v really changed.' }]
  },
  {
    id: 'c-41', title: 'Pointers into arrays', xp: 35,
    teaches: 'An array name is already a pointer to its first element.',
    brief: 'From <code>int a[4] = {5,6,7,8}</code>, print the second and fourth values using pointer arithmetic.',
    starter: '#include <stdio.h>\n\nint main(void) {\n  int a[4] = {5,6,7,8};\n  int *p = a;\n  \n  return 0;\n}\n',
    hint: '*(p + 1) is a[1] and *(p + 3) is a[3].',
    checks: [{ name: 'it prints 6 8', code: 'return out.join("").trim() === "6 8";', fail: 'The second value is 6 and the fourth is 8.' }]
  },
  {
    id: 'c-42', title: 'Swap two values', xp: 35,
    teaches: 'To change the caller variables you need their addresses.',
    brief: 'Write <code>void swap(int *a, int *b)</code> that swaps what the two pointers point to. Call it on 1 and 9, then print both.',
    starter: '#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n  \n}\n\nint main(void) {\n  int x = 1, y = 9;\n  swap(&x, &y);\n  printf("%d %d\\n", x, y);\n  return 0;\n}\n',
    hint: 'int t = *a; *a = *b; *b = t;',
    checks: [{ name: 'it prints 9 1', code: 'return out.join("").trim() === "9 1";', fail: 'The two values trade places.' }]
  },
  {
    id: 'c-43', title: 'A struct', xp: 35,
    teaches: 'A struct groups different values under one name.',
    brief: 'Make <code>struct Point { int x; int y; };</code>, set <code>x</code> to 3 and <code>y</code> to 4, then print them.',
    starter: '#include <stdio.h>\n\nstruct Point {\n  int x;\n  int y;\n};\n\nint main(void) {\n  \n  return 0;\n}\n',
    hint: 'struct Point p;  p.x = 3;  p.y = 4;',
    checks: [{ name: 'it prints 3 4', code: 'return out.join("").trim() === "3 4";', fail: 'Set p.x = 3 and p.y = 4.' }]
  },
  {
    id: 'c-44', title: 'Struct initialisers', xp: 35,
    teaches: 'A struct can be initialised in one go with braces.',
    brief: 'Make <code>struct P { int x; int y; };</code>, set <code>p</code> to 5 and 6 in one statement, then print them.',
    starter: '#include <stdio.h>\n\nstruct P {\n  int x;\n  int y;\n};\n\nint main(void) {\n  \n  return 0;\n}\n',
    hint: 'struct P p = {5, 6};',
    checks: [{ name: 'it prints 5 6', code: 'return out.join("").trim() === "5 6";', fail: 'struct P p = {5, 6};' }]
  },
  {
    id: 'c-45', title: 'Structs are copied', xp: 35,
    teaches: 'Assigning one struct to another copies every field.',
    brief: 'Make <code>struct P { int x; int y; };</code>. Set <code>p</code> to 3 and 4, copy it into <code>q</code>, then set <code>q.x</code> to 99 and print both <code>x</code> values.',
    starter: '#include <stdio.h>\n\nstruct P {\n  int x;\n  int y;\n};\n\nint main(void) {\n  \n  return 0;\n}\n',
    hint: 'struct P p = {3,4};  struct P q = p;  q.x = 99;',
    checks: [{ name: 'it prints 3 99', code: 'return out.join("").trim() === "3 99";', fail: 'q is a copy, so p.x stays 3.' }]
  },
  {
    id: 'c-46', title: 'An array of structs', xp: 40,
    teaches: 'Structs can be array elements.',
    brief: 'Make <code>struct P { int x; int y; };</code> and an array of three of them holding 1 2, 3 4 and 5 6. Print the second element first.',
    starter: '#include <stdio.h>\n\nstruct P {\n  int x;\n  int y;\n};\n\nint main(void) {\n  \n  return 0;\n}\n',
    hint: 'struct P a[3] = {{1,2},{3,4},{5,6}};  then printf("%d %d\\n", a[1].x, a[1].y);',
    checks: [{ name: 'it prints 3 4', code: 'return out.join("").trim() === "3 4";', fail: 'a[1] holds 3 and 4.' }]
  },

  /* ---------------------------------------------------------
     PROGRAMS
     --------------------------------------------------------- */
  {
    id: 'c-47', title: 'Prime check', xp: 40,
    teaches: 'A number is prime if nothing divides it except 1 and itself.',
    brief: 'Print <code>yes</code> when 29 is prime, otherwise <code>no</code>. Write it as a function <code>int isPrime(int n)</code>.',
    starter: '#include <stdio.h>\n\nint isPrime(int n) {\n  \n}\n\nint main(void) {\n  printf("%s\\n", isPrime(29) ? "yes" : "no");\n  return 0;\n}\n',
    hint: 'Try dividing by 2 up to n-1. If anything divides evenly, return 0.',
    checks: [{ name: 'it prints yes', code: 'return out.join("").trim() === "yes";', fail: '29 has no divisors other than 1 and 29.' }]
  },
  {
    id: 'c-48', title: 'Greatest common divisor', xp: 40,
    teaches: 'The Euclidean algorithm repeats with smaller numbers each time.',
    brief: 'Write <code>int gcd(int a, int b)</code> and print the gcd of 48 and 18, then of 17 and 5.',
    starter: '#include <stdio.h>\n\nint gcd(int a, int b) {\n  \n}\n\nint main(void) {\n  printf("%d %d\\n", gcd(48, 18), gcd(17, 5));\n  return 0;\n}\n',
    hint: 'while (b) { int t = b; b = a % b; a = t; } return a;',
    checks: [{ name: 'it prints 6 1', code: 'return out.join("").trim() === "6 1";', fail: 'gcd(48,18) = 6 and gcd(17,5) = 1.' }]
  },
  {
    id: 'c-49', title: 'Count the words', xp: 45,
    teaches: 'Spaces separate words, so count where a space follows a letter.',
    brief: 'Given <code>char s[] = "the quick brown fox"</code>, print how many words it has.',
    starter: '#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n  char s[] = "the quick brown fox";\n  \n  return 0;\n}\n',
    hint: 'A word starts at index 0, or after a space.',
    checks: [{ name: 'it prints 4', code: 'return out.join("").trim() === "4";', fail: 'the, quick, brown, fox is four words.' }]
  },
  {
    id: 'c-50', title: 'Final program', xp: 60,
    teaches: 'Structs, arrays, functions and loops all in one program.',
    brief: 'Make <code>struct P { int w; int q; };</code> and <code>int total(struct P a[], int n)</code> summing <code>w * q</code> over the array. Print the total of {2,3} and {4,5}.',
    starter: '#include <stdio.h>\n\nstruct P {\n  int w;\n  int q;\n};\n\nint total(struct P a[], int n) {\n  \n}\n\nint main(void) {\n  struct P items[2] = {{2,3},{4,5}};\n  printf("%d\\n", total(items, 2));\n  return 0;\n}\n',
    hint: 'Loop over the array adding a[i].w * a[i].q.',
    checks: [{ name: 'it prints 26', code: 'return out.join("").trim() === "26";', fail: '2*3 = 6 and 4*5 = 20, so 26.' }]
  }
];

/* Appended here rather than in levels.js: this file loads AFTER levels.js,
   so TRACKS already exists and C_PART2 is defined. */
if (typeof TRACKS !== 'undefined' && Array.isArray(C_PART2)) {
  TRACKS.c.levels = TRACKS.c.levels.concat(C_PART2);
}