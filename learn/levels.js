/* ============================================================
   LEVEL DATA
   Each level: what to teach, starter code, and how to check it.

   The JavaScript track lives in levels-js.js and is appended to
   TRACKS.js at the bottom of this file, so the JS track can hold 60
   levels without making this file unreadable. Load order matters:

       <script src="levels.js"></script>
       <script src="levels-js.js"></script>

   Checks run in a sandboxed iframe and see whatever the learner just
   declared, because they are evaluated in the same scope.
   ============================================================ */

var TRACKS = {

  /* ==========================================================
     JAVASCRIPT - the main track. Real code, real output.
     ========================================================== */
  js: {
    name: 'JavaScript',
    tag: 'Start here',
    blurb: 'Write real code. It runs immediately. You learn by breaking things until they work.',
    levels: [

      {
        id: 'js-1',
        title: 'Your first variable',
        xp: 10,
        teaches: 'A variable is a labelled box. You put something in, you take it out by name.',
        brief: 'Store the text <code>"hello"</code> in a variable called <code>greeting</code>, then print it.',
        starter: '// A variable is a box with a name.\n// const means "this will not change".\n\nconst greeting = ;\n\n// print it\nconsole.log();',
        hint: 'Try: const greeting = "hello";',
        tests: [
          {
            name: 'greeting holds the text hello',
            code: 'return greeting === "hello";',
            fail: 'greeting should equal "hello". Did you put the text in quotes?'
          },
          {
            name: 'it prints hello',
            code: 'return out.join("|") === "hello";',
            fail: 'Nothing printed "hello". Check console.log(greeting);'
          }
        ]
      },

      {
        id: 'js-2',
        title: 'Numbers and maths',
        xp: 10,
        teaches: 'The + - * / operators do maths. Variables let you keep the result.',
        brief: 'Store <code>17 * 3</code> in a variable called <code>answer</code>, then print it.',
        starter: '// JavaScript maths works like a calculator\n\nconst answer = ;\n\nconsole.log(answer);',
        hint: 'Try: const answer = 17 * 3;',
        tests: [
          { name: 'answer is 51', code: 'return answer === 51;', fail: '17 * 3 is 51. Did you write the multiplication?' },
          { name: 'it prints 51', code: 'return out.join("|") === "51";', fail: 'Nothing printed 51.' }
        ]
      },

      {
        id: 'js-3',
        title: 'Making a decision',
        xp: 15,
        teaches: 'if / else runs code only when something is true.',
        brief: 'Set <code>age</code> to <code>20</code>. If age is 18 or more, set <code>canVote</code> to <code>true</code>. Otherwise <code>false</code>. Then print it.',
        starter: 'const age = 20;\nlet canVote;\n\n// if age is 18 or more...\nif () {\n  canVote = ;\n} else {\n  canVote = ;\n}\n\nconsole.log(canVote);',
        hint: 'if (age >= 18) { canVote = true; } else { canVote = false; }',
        tests: [
          { name: 'canVote is true', code: 'return canVote === true;', fail: 'At age 20 the answer should be true.' },
          { name: 'it prints true', code: 'return out.join("|") === "true";', fail: 'Nothing printed. Check console.log(canVote);' }
        ]
      },

      {
        id: 'js-4',
        title: 'Repeating with loops',
        xp: 15,
        teaches: 'A loop runs the same code many times. for (let i = 0; i < n; i++) is the pattern.',
        brief: 'Print the numbers 1 to 5, each on its own line.',
        starter: '// A loop repeats. i counts up each time round.\n\nfor (let i = ; i < ; i++) {\n  console.log();\n}',
        hint: 'for (let i = 1; i <= 5; i++) { console.log(i); }',
        tests: [
          { name: 'printed 1 to 5 in order', code: 'return out.join(",") === "1,2,3,4,5";', fail: 'You should print 1,2,3,4,5 exactly. Start i at 1 and loop while i is 5 or less.' }
        ]
      },

      {
        id: 'js-5',
        title: 'Your first function',
        xp: 15,
        teaches: 'A function is a reusable instruction. You name it, then call it.',
        brief: 'Write a function called <code>add</code> that takes two numbers and returns their sum. Then print <code>add(2, 3)</code>.',
        starter: '// A function takes inputs and gives back a result.\n\nfunction add(a, b) {\n  // return the sum\n}\n\nconsole.log(add(2, 3));',
        hint: 'return a + b;',
        tests: [
          { name: 'add(2,3) is 5', code: 'return add(2, 3) === 5;', fail: 'Inside the function, return a + b;' },
          { name: 'add(10,5) is 15', code: 'return add(10, 5) === 15;', fail: 'Check your function returns the sum of its two inputs.' },
          { name: 'it prints 5', code: 'return out.join("|") === "5";', fail: 'console.log(add(2, 3)) should print 5.' }
        ]
      },

      {
        id: 'js-6',
        title: 'Lists (arrays)',
        xp: 20,
        teaches: 'An array holds many values in order. .length tells you how many.',
        brief: 'Create an array <code>fruits</code> with <code>"apple"</code>, <code>"banana"</code>, <code>"mango"</code>. Print how many are in it.',
        starter: '// An array is a list. Square brackets.\n\nconst fruits = [];\n\n// print the length\n',
        hint: 'const fruits = ["apple", "banana", "mango"]; console.log(fruits.length);',
        tests: [
          { name: 'fruits has 3 items', code: 'return Array.isArray(fruits) && fruits.length === 3;', fail: 'Make an array with three items in square brackets.' },
          { name: 'the items are right', code: 'return fruits[0] === "apple" && fruits[1] === "banana" && fruits[2] === "mango";', fail: 'Order matters: apple, banana, mango.' },
          { name: 'it prints 3', code: 'return out.join("|") === "3";', fail: 'console.log(fruits.length) prints the count.' }
        ]
      },

      {
        id: 'js-7',
        title: 'Looping over a list',
        xp: 20,
        teaches: 'for...of walks through every item in an array.',
        brief: 'Using the <code>fruits</code> array from before, print each fruit on its own line.',
        starter: 'const fruits = ["apple", "banana", "mango"];\n\n// for...of gives you each item in turn\nfor (const fruit of fruits) {\n  console.log();\n}',
        hint: 'console.log(fruit);',
        tests: [
          { name: 'all three printed', code: 'return out.join(",") === "apple,banana,mango";', fail: 'Each fruit should be printed once, in order.' }
        ]
      },

      {
        id: 'js-8',
        title: 'Finding something',
        xp: 20,
        teaches: '.includes() checks if a list contains a value. A very common job.',
        brief: 'You have <code>cart</code>. Set <code>hasMilk</code> to true if the cart includes <code>"milk"</code>, otherwise false. Print it.',
        starter: 'const cart = ["bread", "eggs", "milk"];\n\n// does the cart contain milk?\nconst hasMilk = ;\n\nconsole.log(hasMilk);',
        hint: 'const hasMilk = cart.includes("milk");',
        tests: [
          { name: 'hasMilk is true', code: 'return hasMilk === true;', fail: 'The cart does contain milk. Try cart.includes("milk");' }
        ]
      },

      {
        id: 'js-9',
        title: 'Counting things',
        xp: 25,
        teaches: '.filter() keeps only what matches. A list can become a new, shorter list.',
        brief: 'From <code>numbers = [3, 8, 12, 5, 20, 7]</code>, make <code>big</code> containing only numbers over 10. Print how many.',
        starter: 'const numbers = [3, 8, 12, 5, 20, 7];\n\n// filter keeps items where the test is true\nconst big = numbers.filter(  );\n\nconsole.log(big.length);',
        hint: 'big = numbers.filter(n => n > 10)',
        tests: [
          { name: 'big has 2 items', code: 'return Array.isArray(big) && big.length === 2;', fail: 'Only 12 and 20 are over 10.' },
          { name: 'they are the right ones', code: 'return big[0] === 12 && big[1] === 20;', fail: 'big should contain 12 and 20.' },
          { name: 'it prints 2', code: 'return out.join("|") === "2";', fail: 'console.log(big.length);' }
        ]
      },

      {
        id: 'js-10',
        title: 'Transforming a list',
        xp: 25,
        teaches: '.map() turns each item into something new.',
        brief: 'From <code>nums = [1, 2, 3, 4]</code>, make <code>doubles</code> where each number is multiplied by 2. Print the list.',
        starter: 'const nums = [1, 2, 3, 4];\n\n// map returns a new list, same length, changed items\nconst doubles = nums.map(  );\n\nconsole.log(doubles);',
        hint: 'doubles = nums.map(n => n * 2)',
        tests: [
          { name: 'doubles is [2,4,6,8]', code: 'return JSON.stringify(doubles) === "[2,4,6,8]";', fail: 'Each number times 2: 2, 4, 6, 8.' },
          { name: 'it prints the list', code: 'return out.join("|") === "[2,4,6,8]";', fail: 'console.log(doubles);' }
        ]
      },

      {
        id: 'js-11',
        title: 'Objects - grouped data',
        xp: 25,
        teaches: 'An object holds labelled values. Real data arrives like this.',
        brief: 'Make an object <code>user</code> with a <code>name</code> of <code>"Ali"</code> and an <code>age</code> of <code>22</code>. Print the name.',
        starter: '// An object groups related values under keys\n\nconst user = {\n  name: ,\n  age: \n};\n\nconsole.log(user.name);',
        hint: 'name: "Ali",  age: 22',
        tests: [
          { name: 'user.name is Ali', code: 'return user && user.name === "Ali";', fail: 'Set name to "Ali".' },
          { name: 'user.age is 22', code: 'return user && user.age === 22;', fail: 'Set age to 22 (no quotes for numbers).' },
          { name: 'it prints Ali', code: 'return out.join("|") === "Ali";', fail: 'console.log(user.name);' }
        ]
      },

      {
        id: 'js-12',
        title: 'Your first mini project',
        xp: 40,
        teaches: 'Put it together. Use several ideas in one piece of code.',
        brief: 'You have orders as objects. Count how many cost more than 1000, and print that number.',
        starter: 'const orders = [\n  { id: 1, total: 500 },\n  { id: 2, total: 1500 },\n  { id: 3, total: 800 },\n  { id: 4, total: 2400 },\n  { id: 5, total: 300 }\n];\n\n// filter for totals over 1000, then count\nconst bigCount = ;\n\nconsole.log(bigCount);',
        hint: 'orders.filter(o => o.total > 1000).length',
        tests: [
          { name: 'bigCount is 2', code: 'return bigCount === 2;', fail: 'Orders 2 and 4 are over 1000.' },
          { name: 'it prints 2', code: 'return out.join("|") === "2";', fail: 'console.log(bigCount);' }
        ]
      },

      {
        id: 'js-13',
        title: 'Reading text',
        xp: 25,
        teaches: 'Strings have methods too. .length, .toUpperCase(), .includes() and slicing all work on text.',
        brief: 'Given <code>name = "Abdullah Khan"</code>, make <code>initials</code> holding only the first letter of each word, in capitals. Then print it.',
        starter: 'const name = "Abdullah Khan";\n\n// split() cuts a string into a list, split on a space\nconst parts = name.split(" ");\n\n// map over the parts and take the first letter of each\nconst initials = ;\n\nconsole.log(initials);',
        hint: 'parts.map(p => p[0].toUpperCase()).join("")',
        tests: [
          { name: 'initials is AK', code: 'return initials === "AK";', fail: 'Abdullah Khan becomes AK' },
          { name: 'it prints AK', code: 'return out.join("|") === "AK";', fail: 'console.log(initials);' }
        ]
      },

      {
        id: 'js-14',
        title: 'Counting with reduce',
        xp: 30,
        teaches: '.reduce() folds a list into one value. You give it an accumulator and a function to apply to each item.',
        brief: 'From <code>cart = [10, 25, 40]</code>, work out the total. Print it.',
        starter: 'const cart = [10, 25, 40];\n\n// reduce(accumulator, item) -> accumulator\nconst total = cart.reduce(  , 0);\n\nconsole.log(total);',
        hint: 'cart.reduce((sum, n) => sum + n, 0)',
        tests: [
          { name: 'total is 75', code: 'return total === 75;', fail: '10 + 25 + 40 = 75.' },
          { name: 'it prints 75', code: 'return out.join("|") === "75";', fail: 'console.log(total);' }
        ]
      },

      {
        id: 'js-15',
        title: 'Objects inside objects',
        xp: 30,
        teaches: 'Real data nests. An order has a customer, a customer has an address.',
        brief: 'Read <code>order.customer.city</code> from the object below and print it.',
        starter: 'const order = {\n  id: 7,\n  total: 2200,\n  customer: {\n    name: "Ali",\n    city: "Lahore"\n  }\n};\n\n// drill into the nested object\nconsole.log();',
        hint: 'console.log(order.customer.city);',
        tests: [
          { name: 'it prints Lahore', code: 'return out.join("|") === "Lahore";', fail: 'The city is inside customer, inside order.' }
        ]
      },

      {
        id: 'js-16',
        title: 'Destructuring',
        xp: 35,
        teaches: 'Destructuring pulls values out of an object in one line instead of reaching in repeatedly.',
        brief: 'Pull <code>name</code> and <code>age</code> out of <code>person</code> using destructuring, then print both on one line.',
        starter: 'const person = { name: "Hina", age: 24 };\n\n// pull two values out at once\nconst {  } = person;\n\nconsole.log(name + " " + age);',
        hint: 'const { name, age } = person;',
        tests: [
          { name: 'it prints Hina 24', code: 'return out.join("|") === "Hina 24";', fail: 'console.log(name + " " + age);' }
        ]
      },

      {
        id: 'js-17',
        title: 'Sorting',
        xp: 30,
        teaches: '.sort() needs a function that says what "a before b" means. Returning a negative number puts a first.',
        brief: 'Sort <code>names = ["Bilal", "Ali", "Sara"]</code> alphabetically into <code>sorted</code>. Print it.',
        starter: 'const names = ["Bilal", "Ali", "Sara"];\n\n// sort by comparing two letters\nconst sorted = names.sort(  );\n\nconsole.log(sorted);',
        hint: 'names.sort((a, b) => a.localeCompare(b))',
        tests: [
          { name: 'sorted is [Ali,Bilal,Sara]', code: 'return JSON.stringify(sorted) === "[\\"Ali\\",\\"Bilal\\",\\"Sara\\"]";', fail: 'Alphabetical order: Ali, Bilal, Sara.' },
          { name: 'it prints the list', code: 'return out.join("|") === "[\\"Ali\\",\\"Bilal\\",\\"Sara\\"]";', fail: 'console.log(sorted);' }
        ]
      },

      {
        id: 'js-18',
        title: 'Error handling',
        xp: 35,
        teaches: 'try/catch runs code that might fail and gives you a chance to recover instead of crashing.',
        brief: 'Parsing <code>"abc"</code> as a number fails. Use <code>Number()</code> inside a <code>try</code>, and set <code>safe</code> to the number or <code>"not a number"</code>.',
        starter: 'let safe;\n\ntry {\n  safe = Number("abc");\n} catch (e) {\n  // Number() returns NaN instead of throwing, so check for it\n  safe = ;\n}\n\nconsole.log(safe);',
        hint: 'Number("abc") is NaN. Test it with Number.isNaN(...).',
        tests: [
          { name: 'safe is "not a number"', code: 'return safe === "not a number";', fail: 'Number("abc") gives NaN, which is not a real number.' },
          { name: 'it prints not a number', code: 'return out.join("|") === "not a number";', fail: 'console.log(safe);' }
        ]
      },

      {
        id: 'js-19',
        title: 'Reading an array of objects',
        xp: 40,
        teaches: 'The shape most real data arrives in: a list of records. filter, map and reduce all chain together.',
        brief: 'From <code>staff</code>, build <code>names</code> containing the name of everyone in Sales. Print the list.',
        starter: 'const staff = [\n  { name: "Ali", dept: "Engineering" },\n  { name: "Sara", dept: "Engineering" },\n  { name: "Hina", dept: "Sales" },\n  { name: "Usman", dept: "Sales" }\n];\n\n// filter first, then map to the names\nconst names = staff\n  ;\n\nconsole.log(names);',
        hint: 'staff.filter(s => s.dept === "Sales").map(s => s.name)',
        tests: [
          { name: 'names is [Hina,Usman]', code: 'return JSON.stringify(names) === "[\\"Hina\\",\\"Usman\\"]";', fail: 'Only Sales people: Hina and Usman.' },
          { name: 'it prints the list', code: 'return out.join("|") === "[\\"Hina\\",\\"Usman\\"]";', fail: 'console.log(names);' }
        ]
      },

      {
        id: 'js-20',
        title: 'Your first real program',
        xp: 50,
        teaches: 'A function that takes input and returns a result is the unit every real program is built from.',
        brief: 'Write <code>discount(price, percent)</code> that returns the price after a percentage discount. Then print <code>discount(2000, 15)</code>.',
        starter: '// price after a percent discount\nfunction discount(price, percent) {\n  \n}\n\nconsole.log(discount(2000, 15));',
        hint: 'return price - (price * percent / 100);',
        tests: [
          { name: 'discount(2000,15) is 1700', code: 'return discount(2000, 15) === 1700;', fail: '2000 minus 15 percent is 1700.' },
          { name: 'discount(500,50) is 250', code: 'return discount(500, 50) === 250;', fail: 'Half of 500 is 250.' },
          { name: 'it prints 1700', code: 'return out.join("|") === "1700";', fail: 'console.log(discount(2000, 15));' }
        ]
      }
    ]
  },

  /* ==========================================================
     C - real C, interpreted in the browser.
     No compiler download: c-sim.js parses and runs the code
     directly. Expected output matches clang exactly.
     ========================================================== */
  c: {
    name: 'C',
    tag: 'No download',
    blurb: 'Write real C. It runs in your browser with nothing to download.',
    levels: []
  },

  /* ==========================================================
     LOGIC - drag blocks, no typing. For absolute beginners.
     ========================================================== */
  logic: {
    name: 'Logic',
    tag: 'No typing',
    blurb: 'Drag blocks into place. It builds real code behind the scenes, so you see what code is.',
    levels: [
      {
        id: 'lg-1', title: 'Print a line', xp: 10,
        brief: 'Drag the <b>Print</b> block into the <b>Run</b> area. Click Run.',
        hint: 'Click the Print block, then tap the Run area. Or drag it across.',
        target: ['print'],
        blocks: [{ id: 'print', label: 'Print a message', kind: 'print' }]
      },
      {
        id: 'lg-2', title: 'Two prints', xp: 10,
        brief: 'Add <b>two</b> Print blocks. Order matters - they run top to bottom.',
        hint: 'The same block can be used twice. Tap it in the palette twice.',
        target: ['print', 'print'],
        blocks: [{ id: 'print', label: 'Print a message', kind: 'print' }]
      },
      {
        id: 'lg-3', title: 'Set a number', xp: 15,
        brief: 'Set a variable called <b>score</b> to <b>10</b>, then print it.',
        hint: 'Set first, then Print variable. Printing before setting gives undefined.',
        target: ['set', 'printvar'],
        blocks: [
          { id: 'set', label: 'Set variable', kind: 'set' },
          { id: 'printvar', label: 'Print variable', kind: 'printvar' },
          { id: 'print', label: 'Print a message', kind: 'print' }
        ]
      },
      {
        id: 'lg-4', title: 'Change it', xp: 15,
        brief: 'Set <b>score</b> to 10, then add 5 to it. Then print it.',
        hint: 'Set 10, Add 5, then Print variable. The output should be 15.',
        target: ['set', 'add', 'printvar'],
        blocks: [
          { id: 'set', label: 'Set variable', kind: 'set' },
          { id: 'add', label: 'Add to variable', kind: 'add' },
          { id: 'printvar', label: 'Print variable', kind: 'printvar' },
          { id: 'if', label: 'If / else', kind: 'if' }
        ]
      },
      {
        id: 'lg-5', title: 'If this, then that', xp: 20,
        brief: 'Set <b>score</b> to 10. If it is greater than 5, print "big".',
        hint: 'Set, then If. Put Print inside the If so it only runs when the test is true.',
        target: ['set', 'if', 'print'],
        blocks: [
          { id: 'set', label: 'Set variable', kind: 'set' },
          { id: 'if', label: 'If / else', kind: 'if' },
          { id: 'print', label: 'Print a message', kind: 'print' },
          { id: 'add', label: 'Add to variable', kind: 'add' }
        ]
      },
      {
        id: 'lg-6', title: 'Repeat N times', xp: 20,
        brief: 'Print a message 3 times using a <b>Repeat</b> block inside it.',
        hint: 'Repeat 3, with the Print block nested inside the loop.',
        target: ['repeat', 'print'],
        blocks: [
          { id: 'repeat', label: 'Repeat N times', kind: 'repeat' },
          { id: 'print', label: 'Print a message', kind: 'print' },
          { id: 'set', label: 'Set variable', kind: 'set' }
        ]
      },
      {
        id: 'lg-7', title: 'Loop over a list', xp: 25,
        brief: 'Use <b>For each item</b> to print every item in the list.',
        hint: 'For each item in list, with Print inside so it runs once per item.',
        target: ['foreach', 'print'],
        blocks: [
          { id: 'foreach', label: 'For each item in list', kind: 'foreach' },
          { id: 'print', label: 'Print a message', kind: 'print' },
          { id: 'repeat', label: 'Repeat N times', kind: 'repeat' }
        ]
      },

      {
        id: 'lg-8', title: 'Count to three', xp: 20,
        brief: 'Use <b>Repeat</b> to print one message three times.',
        hint: 'Repeat 3 around a single Print block.',
        target: ['repeat', 'print'],
        blocks: [
          { id: 'repeat', label: 'Repeat N times', kind: 'repeat' },
          { id: 'print', label: 'Print a message', kind: 'print' },
          { id: 'if', label: 'If / else', kind: 'if' }
        ]
      },

      {
        id: 'lg-9', title: 'Decide, then print', xp: 25,
        brief: 'Set <b>count</b> to 5. Add 3 to it. Then check if it is greater than 7.',
        hint: 'Set count, Add 3, then If to test whether the result is greater than 7.',
        target: ['set', 'add', 'if'],
        blocks: [
          { id: 'set', label: 'Set variable', kind: 'set' },
          { id: 'add', label: 'Add to variable', kind: 'add' },
          { id: 'if', label: 'If / else', kind: 'if' },
          { id: 'printvar', label: 'Print variable', kind: 'printvar' }
        ]
      },

      {
        id: 'lg-10', title: 'Walk a list and decide', xp: 30,
        brief: 'Set <b>total</b> to 0. Loop over the list. Check if <b>total</b> is greater than 3.',
        hint: 'Set total to 0 first, then For each, then If on total.',
        target: ['set', 'foreach', 'if'],
        blocks: [
          { id: 'set', label: 'Set variable', kind: 'set' },
          { id: 'foreach', label: 'For each item in list', kind: 'foreach' },
          { id: 'if', label: 'If / else', kind: 'if' },
          { id: 'print', label: 'Print a message', kind: 'print' }
        ]
      },

      {
        id: 'lg-11', title: 'The full program', xp: 35,
        brief: 'Set <b>n</b> to 2, add 5 to it, then print the variable.',
        hint: 'Set n to 2, Add 5, then Print variable. The output should be 7.',
        target: ['set', 'add', 'printvar'],
        blocks: [
          { id: 'set', label: 'Set variable', kind: 'set' },
          { id: 'add', label: 'Add to variable', kind: 'add' },
          { id: 'printvar', label: 'Print variable', kind: 'printvar' },
          { id: 'print', label: 'Print a message', kind: 'print' }
        ]
      }
    ]
  },

  /* ==========================================================
     HTML / CSS - visual, instant result.
     ========================================================== */
  web: {
    name: 'HTML & CSS',
    tag: 'Visual',
    blurb: 'Write markup, see it appear instantly. Structure and style, side by side.',
    levels: [
      {
        id: 'web-1', title: 'Your first heading', xp: 10,
        brief: 'Add a level-one heading that says <code>Hello</code>.',
        starter: '<!-- The preview shows on the right -->\n\n',
        hint: '<h1>Hello</h1>',
        checks: [
          { name: 'there is an h1', code: 'return !!doc.querySelector("h1");', fail: 'Use <h1>...</h1>' },
          { name: 'it says Hello', code: 'var h=doc.querySelector("h1"); return h && h.textContent.trim() === "Hello";', fail: 'Put the text Hello inside the h1.' }
        ]
      },
      {
        id: 'web-2', title: 'Two headings', xp: 10,
        brief: 'Add an <code>h1</code> saying <code>Menu</code> and an <code>h2</code> saying <code>Coffee</code>.',
        starter: '',
        hint: '<h1>Menu</h1><h2>Coffee</h2>',
        checks: [
          { name: 'h1 says Menu', code: 'var h=doc.querySelector("h1"); return h && h.textContent.trim()==="Menu";', fail: '<h1>Menu</h1>' },
          { name: 'h2 says Coffee', code: 'var h=doc.querySelector("h2"); return h && h.textContent.trim()==="Coffee";', fail: '<h2>Coffee</h2>' }
        ]
      },
      {
        id: 'web-3', title: 'A paragraph', xp: 10,
        brief: 'Add a paragraph that contains the word <code>fresh</code>.',
        starter: '',
        hint: '<p>It is fresh every morning.</p>',
        checks: [
          { name: 'there is a p', code: 'return !!doc.querySelector("p");', fail: 'Use <p>...</p>' },
          { name: 'it contains fresh', code: 'var p=doc.querySelector("p"); return p && p.textContent.toLowerCase().indexOf("fresh") !== -1;', fail: 'Include the word fresh.' }
        ]
      },
      {
        id: 'web-4', title: 'A link', xp: 15,
        brief: 'Add a link to <code>https://example.com</code> with the text <code>Click me</code>.',
        starter: '',
        hint: '<a href="https://example.com">Click me</a>',
        checks: [
          { name: 'there is a link', code: 'return !!doc.querySelector("a");', fail: 'Use <a href="...">...</a>' },
          { name: 'the href is right', code: 'var a=doc.querySelector("a"); return a && a.getAttribute("href")==="https://example.com";', fail: 'href="https://example.com"' },
          { name: 'the text is right', code: 'var a=doc.querySelector("a"); return a && a.textContent.trim()==="Click me";', fail: 'Link text should be Click me.' }
        ]
      },
      {
        id: 'web-5', title: 'An unordered list', xp: 20,
        brief: 'Make a list with three items: <code>Tea</code>, <code>Coffee</code>, <code>Cake</code>.',
        starter: '',
        hint: '<ul><li>Tea</li><li>Coffee</li><li>Cake</li></ul>',
        checks: [
          { name: 'there is a ul', code: 'return !!doc.querySelector("ul");', fail: 'Use <ul>...</ul>' },
          { name: 'it has three items', code: 'return doc.querySelectorAll("ul li").length === 3;', fail: 'Three <li> items.' },
          { name: 'first is Tea', code: 'var l=doc.querySelector("ul li"); return l && l.textContent.trim()==="Tea";', fail: 'First item should be Tea.' }
        ]
      },
      {
        id: 'web-6', title: 'An image', xp: 20,
        brief: 'Add an image using <code>logo.png</code> as the source, with alt text <code>Logo</code>.',
        starter: '',
        hint: '<img src="logo.png" alt="Logo">',
        checks: [
          { name: 'there is an img', code: 'return !!doc.querySelector("img");', fail: 'Use <img>' },
          { name: 'src is logo.png', code: 'var i=doc.querySelector("img"); return i && i.getAttribute("src")==="logo.png";', fail: 'src="logo.png"' },
          { name: 'alt text is Logo', code: 'var i=doc.querySelector("img"); return i && i.getAttribute("alt")==="Logo";', fail: 'alt="Logo" - alt text matters for screen readers.' }
        ]
      },
      {
        id: 'web-7', title: 'Style it with CSS', xp: 25,
        brief: 'Make the heading <code>blue</code> using CSS.',
        starter: 'h1 {\n  color: ;\n}',
        hint: 'color: blue;',
        checks: [
          { name: 'the h1 is blue', code: 'var h=doc.querySelector("h1"); if(!h) return false; var c=getComputedStyle(h).color; return c==="rgb(0, 0, 255)";', fail: 'color: blue;' }
        ]
      },
      {
        id: 'web-8', title: 'A card', xp: 30,
        brief: 'Make a <code>div</code> with class <code>card</code> that contains a heading and a paragraph.',
        starter: '.card {\n  border: 1px solid #ccc;\n  padding: 16px;\n}\n\n',
        hint: '<div class="card"><h2>Title</h2><p>Some text.</p></div>',
        checks: [
          { name: 'there is a .card', code: 'return !!doc.querySelector(".card");', fail: 'Use <div class="card">' },
          { name: 'it has a heading', code: 'return !!doc.querySelector(".card h1, .card h2, .card h3");', fail: 'Put an h2 inside the card.' },
          { name: 'it has a paragraph', code: 'return !!doc.querySelector(".card p");', fail: 'Put a <p> inside the card.' }
        ]
      },

      {
        id: 'web-9', title: 'A table', xp: 30,
        teaches: 'Tables hold tabular data. A table needs a row of headers and then rows of cells.',
        brief: 'Make a table with two columns (<code>Item</code> and <code>Price</code>) and two body rows: <code>Tea / 50</code> and <code>Coffee / 120</code>.',
        starter: '',
        hint: '<table><thead><tr><th>Item</th><th>Price</th></tr></thead><tbody><tr><td>Tea</td><td>50</td></tr>...</tbody></table>',
        checks: [
          { name: 'there is a table', code: 'return !!doc.querySelector("table");', fail: 'Use <table>' },
          { name: 'it has two headers', code: 'return doc.querySelectorAll("th").length === 2;', fail: 'Two <th> inside a thead row.' },
          { name: 'it has two body rows', code: 'return doc.querySelectorAll("tbody tr").length === 2;', fail: 'Two <tr> inside <tbody>.' },
          { name: 'Coffee is 120', code: 'var rows=doc.querySelectorAll("tbody tr"); return rows[1] && rows[1].textContent.indexOf("120") !== -1;', fail: 'Second row should be Coffee / 120.' }
        ]
      },

      {
        id: 'web-10', title: 'A form input', xp: 30,
        teaches: 'A form is how a page collects something. Inputs carry a name so the server knows what it is.',
        brief: 'Add a text input with <code>name="email"</code> and a submit button that says <code>Send</code>.',
        starter: '',
        hint: '<form><input type="email" name="email"><button type="submit">Send</button></form>',
        checks: [
          { name: 'there is a form', code: 'return !!doc.querySelector("form");', fail: 'Use <form>' },
          { name: 'there is an email input', code: 'var i=doc.querySelector("input[name=email]"); return !!i && i.getAttribute("type") === "email";', fail: 'type="email" name="email"' },
          { name: 'there is a submit button', code: 'var b=doc.querySelector("button[type=submit]"); return !!b;', fail: 'Use <button type="submit">' }
        ]
      },

      {
        id: 'web-11', title: 'Semantic structure', xp: 30,
        teaches: 'Semantic tags describe meaning, not just appearance. A screen reader navigates by them.',
        brief: 'Wrap things properly: one <code>header</code>, one <code>main</code> and one <code>footer</code>.',
        starter: '',
        hint: '<header>...</header><main>...</main><footer>...</footer>',
        checks: [
          { name: 'there is a header', code: 'return !!doc.querySelector("header");', fail: 'Use <header>' },
          { name: 'there is a main', code: 'return !!doc.querySelector("main");', fail: 'Use <main>' },
          { name: 'there is a footer', code: 'return !!doc.querySelector("footer");', fail: 'Use <footer>' },
          { name: 'main comes before footer', code: 'var m=doc.querySelector("main"), f=doc.querySelector("footer"); return !!(m && f && (m.compareDocumentPosition(f) & 4));', fail: 'Order should be header, main, footer.' }
        ]
      },

      {
        id: 'web-12', title: 'CSS spacing', xp: 35,
        teaches: 'padding is space inside an element, margin is space outside it. Confusing the two is the classic mistake.',
        brief: 'Give the <code>h1</code> <code>20px</code> of padding and <code>10px</code> of margin.',
        starter: 'h1 {\n  padding: ;\n  margin: ;\n}',
        hint: 'padding: 20px; margin: 10px;',
        checks: [
          { name: 'padding is 20px', code: 'var h=doc.querySelector("h1"); if(!h) return false; var cs=getComputedStyle(h); return cs.paddingTop === "20px";', fail: 'padding: 20px;' },
          { name: 'margin is 10px', code: 'var h=doc.querySelector("h1"); if(!h) return false; var cs=getComputedStyle(h); return cs.marginTop === "10px";', fail: 'margin: 10px;' }
        ]
      },

      {
        id: 'web-13', title: 'Two columns with flexbox', xp: 35,
        teaches: 'display:flex lays children in a row. gap puts space between them without margins.',
        brief: 'Make a <code>div</code> with class <code>row</code> that lays its children out in a row with 10px between them.',
        starter: '.row {\n  display: ;\n  gap: 10px;\n}\n\n',
        hint: 'display: flex;',
        checks: [
          { name: 'there is a .row', code: 'return !!doc.querySelector(".row");', fail: 'Use <div class="row">' },
          { name: 'it is display flex', code: 'var r=doc.querySelector(".row"); if(!r) return false; return getComputedStyle(r).display === "flex";', fail: 'display: flex;' }
        ]
      }
    ]
  },

  /* ==========================================================
     SQL - against a real in-browser database.
     ========================================================== */
  sql: {
    name: 'SQL',
    tag: 'Real database',
    blurb: 'A real SQLite database in your browser. Write a query, see real rows come back.',
    levels: [
      {
        id: 'sql-1', title: 'Select everything', xp: 10,
        brief: 'Get all rows from the <code>employees</code> table.',
        starter: 'SELECT\n  \nFROM employees;',
        hint: 'SELECT * FROM employees;',
        checks: [{ name: 'all 5 rows come back', code: 'return rows.length === 5;', fail: 'Use SELECT * FROM employees; - that returns all 5 rows.' }]
      },
      {
        id: 'sql-2', title: 'Pick some columns', xp: 10,
        brief: 'Get only the <code>name</code> and <code>role</code> of every employee.',
        starter: 'SELECT *\nFROM employees;',
        hint: 'SELECT name, role FROM employees;',
        checks: [
          { name: '5 rows', code: 'return rows.length === 5;', fail: 'Still 5 employees.' },
          { name: 'only 2 columns', code: 'return rows.length && Object.keys(rows[0]).length === 2;', fail: 'Name the columns: name, role' }
        ]
      },
      {
        id: 'sql-3', title: 'Filter with WHERE', xp: 15,
        brief: 'Get only employees whose <code>role</code> is <code>"Engineer"</code>.',
        starter: 'SELECT *\nFROM employees\nWHERE ;',
        hint: "WHERE role = 'Engineer'",
        checks: [
          { name: '2 engineers come back', code: 'return rows.length === 2;', fail: 'There are 2 engineers. Filter on role.' },
          { name: 'all are Engineers', code: 'return rows.every(function(r){return r.role==="Engineer";});', fail: 'Every row should have role Engineer.' }
        ]
      },
      {
        id: 'sql-4', title: 'Compare numbers', xp: 15,
        brief: 'Get employees earning more than <code>80000</code>.',
        starter: 'SELECT *\nFROM employees\nWHERE ;',
        hint: 'WHERE salary > 80000',
        checks: [
          { name: '3 rows come back', code: 'return rows.length === 3;', fail: '3 employees earn over 80000.' }
        ]
      },
      {
        id: 'sql-5', title: 'Order the results', xp: 20,
        brief: 'List employees by salary, highest first.',
        starter: 'SELECT *\nFROM employees\nORDER BY ;',
        hint: 'ORDER BY salary DESC',
        checks: [
          { name: '5 rows', code: 'return rows.length === 5;', fail: 'Still all 5.' },
          { name: 'highest salary is first', code: 'return rows[0].salary > rows[rows.length-1].salary;', fail: 'DESC means descending - highest first.' }
        ]
      },
      {
        id: 'sql-6', title: 'Count things', xp: 20,
        brief: 'Count how many employees there are. Give the column the name <code>total</code>.',
        starter: 'SELECT \nFROM employees;',
        hint: 'SELECT COUNT(*) AS total FROM employees;',
        checks: [
          { name: 'total is 5', code: 'return rows[0] && rows[0].total === 5;', fail: 'COUNT(*) counts rows. Alias it: AS total' }
        ]
      },
      {
        id: 'sql-7', title: 'Combine two tables', xp: 30,
        brief: 'Get each employee name with their department name. Join <code>employees</code> to <code>departments</code> on <code>dept_id</code>.',
        starter: 'SELECT e.name, d.name AS dept\nFROM employees e\n;',
        hint: 'JOIN departments d ON e.dept_id = d.id',
        checks: [
          { name: '5 rows come back', code: 'return rows.length === 5;', fail: 'Every employee has a department.' },
          { name: 'dept column exists', code: 'return rows[0] && rows[0].dept !== undefined;', fail: 'Alias the department name as dept' }
        ]
      },

      {
        id: 'sql-8', title: 'Matching a list', xp: 25,
        teaches: 'IN tests against several values at once, instead of writing role = x OR role = y.',
        brief: 'Get employees who are either a <code>Manager</code> or in <code>Sales</code>.',
        starter: 'SELECT *\nFROM employees\nWHERE ;',
        hint: "WHERE role IN ('Manager', 'Sales')",
        checks: [
          { name: '3 rows come back', code: 'return rows.length === 3;', fail: 'Bilal is the Manager; Hina and Usman are Sales.' },
          { name: 'all match', code: 'return rows.every(function(r){return r.role === "Manager" || r.role === "Sales";});', fail: 'Every row must be Manager or Sales.' }
        ]
      },

      {
        id: 'sql-9', title: 'Text search', xp: 25,
        teaches: 'LIKE matches a pattern. % means any characters, so "%al%" finds a name containing al.',
        brief: 'Find employees whose name contains <code>"al"</code>.',
        starter: 'SELECT *\nFROM employees\nWHERE name LIKE ;',
        hint: "WHERE name LIKE '%al%'",
        checks: [
          { name: '2 rows come back', code: 'return rows.length === 2;', fail: 'Ali and Bilal both contain "al".' },
          { name: 'they are the right ones', code: 'return rows[0].name === "Ali" && rows[1].name === "Bilal";', fail: 'Ali, Bilal' }
        ]
      },

      {
        id: 'sql-10', title: 'Grouping', xp: 35,
        teaches: 'GROUP BY collapses rows into groups so you can count or sum per group.',
        brief: 'For each <code>role</code>, count how many employees have it. Give the columns the names <code>role</code> and <code>n</code>.',
        starter: 'SELECT role, \nFROM employees\n;',
        hint: 'SELECT role, COUNT(*) AS n FROM employees GROUP BY role;',
        checks: [
          { name: '3 groups come back', code: 'return rows.length === 3;', fail: 'Engineer, Manager, Sales - three roles.' },
          { name: 'Engineer has 2', code: 'return rows.some(function(r){return r.role === "Engineer" && r.n === 2;});', fail: 'Ali and Sara are Engineers.' }
        ]
      },

      {
        id: 'sql-11', title: 'The average', xp: 30,
        teaches: 'AVG, SUM, MIN and MAX all summarise a numeric column.',
        brief: 'Work out the average salary across all employees. Call it <code>avg_salary</code>.',
        starter: 'SELECT \nFROM employees;',
        hint: 'SELECT AVG(salary) AS avg_salary FROM employees;',
        checks: [
          { name: 'avg_salary is 88600', code: 'return rows[0] && Math.round(rows[0].avg_salary) === 88600;', fail: '(95000 + 88000 + 120000 + 72000 + 68000) / 5 = 88600' }
        ]
      },

      {
        id: 'sql-12', title: 'Sorting by two keys', xp: 30,
        teaches: 'ORDER BY takes several columns. The first is the main sort, the second breaks ties.',
        brief: 'List employees by role alphabetically, then by salary descending within the same role.',
        starter: 'SELECT *\nFROM employees\nORDER BY ;',
        hint: 'ORDER BY role ASC, salary DESC',
        checks: [
          { name: '5 rows', code: 'return rows.length === 5;', fail: 'Still all employees.' },
          { name: 'Engineers are salary-descending', code: 'var e = rows.filter(function(r){return r.role === "Engineer";}); return e[0].name === "Ali";', fail: 'Ali (95000) should come before Sara (88000).' },
          { name: 'roles are grouped', code: 'return rows[0].role === "Engineer";', fail: 'Engineer is first alphabetically.' }
        ]
      },

      {
        id: 'sql-13', title: 'Change data', xp: 35,
        teaches: 'UPDATE changes rows that already exist. The same WHERE discipline applies.',
        brief: 'Give everyone in <code>Sales</code> a 10 percent raise, then show the whole table again. Two statements, one after the other.',
        starter: "UPDATE employees SET salary = \nWHERE ;\n\nSELECT * FROM employees;",
        hint: "UPDATE employees SET salary = salary * 1.1 WHERE role = 'Sales';",
        checks: [
          { name: '5 rows', code: 'return rows.length === 5;', fail: 'Select all employees after the update.' },
          { name: 'Hina is now 79200', code: 'var h = rows.find(function(r){return r.name === "Hina";}); return h && Math.round(h.salary) === 79200;', fail: '72000 plus ten percent is 79200.' },
          { name: 'Ali was untouched', code: 'var a = rows.find(function(r){return r.name === "Ali";}); return a && a.salary === 95000;', fail: 'Only Sales rows should change.' }
        ]
      },

      {
        id: 'sql-14', title: 'Subquery', xp: 40,
        teaches: 'A subquery is a SELECT used as a value inside another query.',
        brief: 'Find the employee with the highest salary, without sorting. Name the column <code>top</code>.',
        starter: 'SELECT name, salary AS top\nFROM employees\nWHERE salary = (  )',
        hint: 'WHERE salary = (SELECT MAX(salary) FROM employees)',
        checks: [
          { name: '1 row comes back', code: 'return rows.length === 1;', fail: 'Only the highest earner.' },
          { name: 'it is Bilal', code: 'return rows[0].name === "Bilal";', fail: 'Bilal earns 120000, the most.' }
        ]
      }
    ]
  }
};

/* The extra levels for every track live in their own files, loaded after
   this one. Each of those files appends itself to TRACKS, so there is
   nothing to wire up here. See levels-js.js, levels-logic.js,
   levels-web.js and levels-sql.js. */