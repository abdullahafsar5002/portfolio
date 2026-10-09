/* ============================================================
   JAVASCRIPT TRACK - part 2
   Loaded after levels.js and merged into TRACKS.js by the bootstrap
   in levels.js, so the browser only has to fetch two files.

   Levels here continue from js-20 and go further: strings in depth,
   array methods, objects, functions, the DOM, and small programs.
   ============================================================ */

var JS_PART2 = [

  /* ---------- strings ---------- */
  {
    id: 'js-21', title: 'String length', xp: 20,
    teaches: 'A string has a length property. Count includes spaces, so "a b" is 3.',
    brief: 'Store the <em>length</em> of <code>"hello world"</code> in <code>n</code>, then print it.',
    starter: 'const text = "hello world";\n\n// strings have a length\nconst n = ;\n\nconsole.log(n);',
    hint: 'const n = text.length;',
    tests: [
      { name: 'n is 11', code: 'return n === 11;', fail: '"hello world" is 11 characters, including the space.' },
      { name: 'it prints 11', code: 'return out.join("|") === "11";', fail: 'console.log(n);' }
    ]
  },
  {
    id: 'js-22', title: 'Upper and lower case', xp: 20,
    teaches: 'toUpperCase() and toLowerCase() return new strings. They do not change the original.',
    brief: 'From <code>word = "JavaScript"</code>, make <code>loud</code> and <code>quiet</code>. Print both.',
    starter: 'const word = "JavaScript";\n\nconst loud = ;\nconst quiet = ;\n\nconsole.log(loud);\nconsole.log(quiet);',
    hint: 'word.toUpperCase() and word.toLowerCase()',
    tests: [
      { name: 'loud is JAVASCRIPT', code: 'return loud === "JAVASCRIPT";', fail: 'word.toUpperCase();' },
      { name: 'quiet is javascript', code: 'return quiet === "javascript";', fail: 'word.toLowerCase();' },
      { name: 'it prints both', code: 'return out.join("|") === "JAVASCRIPT|javascript";', fail: 'Two console.log lines.' }
    ]
  },
  {
    id: 'js-23', title: 'Slicing a string', xp: 25,
    teaches: 'slice(start, end) takes characters from index start up to but not including end. Negative counts from the end.',
brief: 'From <code>word = "javascript"</code>, take the first 4 characters into <code>start</code> and the last 3 into <code>end</code> from the end.',
        starter: 'const word = "javascript";\n\nconst start = ;\nconst end = ;\n\nconsole.log(start);\nconsole.log(end);',
        hint: 'word.slice(0, 4) for the start, word.slice(-3) for the end',
    tests: [
      { name: 'start is java', code: 'return start === "java";', fail: 'slice(0, 4) gives four characters.' },
      { name: 'end is ipt', code: 'return end === "ipt";', fail: 'slice(-3) counts back from the end of "javascript".' }
    ]
  },
  {
    id: 'js-24', title: 'Split and join', xp: 25,
    teaches: 'split() turns a string into an array, join() turns an array back into a string.',
    brief: 'Turn <code>path = "home/user/docs"</code> into an array called <code>parts</code>. Print how many parts there are.',
    starter: 'const path = "home/user/docs";\n\nconst parts = ;\n\nconsole.log(parts.length);',
    hint: 'path.split("/")',
    tests: [
      { name: 'parts has 3 items', code: 'return Array.isArray(parts) && parts.length === 3;', fail: 'Three pieces separated by the slash.' },
      { name: 'the last part is docs', code: 'return parts[2] === "docs";', fail: 'Order is home, user, docs.' }
    ]
  },
  {
    id: 'js-25', title: 'Replacing text', xp: 25,
    teaches: 'replace() swaps the first match. For every match use replaceAll().',
    brief: 'In <code>line = "a-b-c"</code>, replace every dash with a space. Call it <code>spaced</code>. Print it.',
    starter: 'const line = "a-b-c";\n\nconst spaced = ;\n\nconsole.log(spaced);',
    hint: 'line.replaceAll("-", " ")',
    tests: [
      { name: 'spaced is "a b c"', code: 'return spaced === "a b c";', fail: 'Every dash becomes a space.' },
      { name: 'it prints a b c', code: 'return out.join("|") === "a b c";', fail: 'console.log(spaced);' }
    ]
  },

  /* ---------- numbers ---------- */
  {
    id: 'js-26', title: 'Rounding', xp: 20,
    teaches: 'Math.round, Math.floor and Math.ceil all return numbers. round goes to nearest, floor always down, ceil always up.',
    brief: 'Work out <code>rounded</code> (2.5 rounded to nearest), <code>down</code> (2.9 floored) and <code>up</code> (2.1 ceiled).',
    starter: 'const rounded = Math.;\nconst down = Math.;\nconst up = Math.;\n\nconsole.log(rounded);\nconsole.log(down);\nconsole.log(up);',
    hint: 'Math.round(2.5), Math.floor(2.9), Math.ceil(2.1)',
    tests: [
      { name: 'rounded is 3', code: 'return rounded === 3;', fail: '2.5 rounds up to 3.' },
      { name: 'down is 2', code: 'return down === 2;', fail: 'Math.floor always goes down.' },
      { name: 'up is 3', code: 'return up === 3;', fail: 'Math.ceil always goes up.' }
    ]
  },
  {
    id: 'js-27', title: 'Remainder', xp: 20,
    teaches: 'The % operator gives the remainder after division. It is how you check even and odd.',
    brief: 'Given <code>n = 17</code>, work out the remainder after dividing by 5. Call it <code>rem</code>. Print it.',
    starter: 'const n = 17;\n\n// % is the remainder operator\nconst rem = ;\n\nconsole.log(rem);',
    hint: 'const rem = n % 5;',
    tests: [
      { name: 'rem is 2', code: 'return rem === 2;', fail: '17 divided by 5 is 3 remainder 2.' },
      { name: 'it prints 2', code: 'return out.join("|") === "2";', fail: 'console.log(rem);' }
    ]
  },
  {
    id: 'js-28', title: 'Even or odd', xp: 25,
    teaches: 'A number is even when n % 2 is 0. This is the most common use of the remainder.',
    brief: 'For <code>n = 9</code>, set <code>parity</code> to <code>"odd"</code> or <code>"even"</code>. Print it.',
    starter: 'const n = 9;\nlet parity;\n\nif (  ) {\n  parity = "even";\n} else {\n  parity = "odd";\n}\n\nconsole.log(parity);',
    hint: 'if (n % 2 === 0)',
    tests: [
      { name: 'parity is odd', code: 'return parity === "odd";', fail: '9 leaves remainder 1 when divided by 2.' },
      { name: 'it prints odd', code: 'return out.join("|") === "odd";', fail: 'console.log(parity);' }
    ]
  },
  {
    id: 'js-29', title: 'Building a total', xp: 30,
    teaches: 'The accumulator pattern: start a number at 0, add to it inside a loop, print at the end.',
    brief: 'Add up <code>1 + 2 + ... + 10</code> using a loop. Call the result <code>sum</code>. Print it.',
    starter: 'let sum = 0;\n\n// add each number into sum\nfor (let i = 1; i <= 10; i++) {\n  \n}\n\nconsole.log(sum);',
    hint: 'sum = sum + i; or sum += i;',
    tests: [
      { name: 'sum is 55', code: 'return sum === 55;', fail: '1 to 10 adds up to 55.' },
      { name: 'it prints 55', code: 'return out.join("|") === "55";', fail: 'console.log(sum);' }
    ]
  },

  /* ---------- arrays ---------- */
  {
    id: 'js-30', title: 'Finding the largest', xp: 30,
    teaches: 'reduce with Math.max finds the biggest item. Math.max takes any number of arguments.',
    brief: 'Find the largest number in <code>nums = [12, 47, 8, 93, 25]</code>. Call it <code>largest</code>. Print it.',
    starter: 'const nums = [12, 47, 8, 93, 25];\n\nconst largest = nums.reduce(  );\n\nconsole.log(largest);',
    hint: 'nums.reduce((a, b) => Math.max(a, b))',
    tests: [
      { name: 'largest is 93', code: 'return largest === 93;', fail: '93 is the biggest of the five.' },
      { name: 'it prints 93', code: 'return out.join("|") === "93";', fail: 'console.log(largest);' }
    ]
  },
  {
    id: 'js-31', title: 'Sum of a list', xp: 25,
    teaches: 'reduce is the general "fold a list into one number" tool.',
    brief: 'Total up <code>prices = [5, 12, 8, 30]</code>. Call it <code>total</code>. Print it.',
    starter: 'const prices = [5, 12, 8, 30];\n\nconst total = prices.reduce(  , 0);\n\nconsole.log(total);',
    hint: 'prices.reduce((sum, p) => sum + p, 0)',
    tests: [
      { name: 'total is 55', code: 'return total === 55;', fail: '5 + 12 + 8 + 30 = 55.' },
      { name: 'it prints 55', code: 'return out.join("|") === "55";', fail: 'console.log(total);' }
    ]
  },
  {
    id: 'js-32', title: 'Does it contain two things', xp: 25,
    teaches: 'Checks can be combined with && (and) and || (or).',
    brief: 'From <code>tags = ["red", "blue"]</code>, set <code>ok</code> to true only if it contains both "red" and "blue". Print it.',
    starter: 'const tags = ["red", "blue"];\n\nconst ok = ;\n\nconsole.log(ok);',
    hint: 'tags.includes("red") && tags.includes("blue")',
    tests: [
      { name: 'ok is true', code: 'return ok === true;', fail: 'Both must be present, so join with &&.' },
      { name: 'it prints true', code: 'return out.join("|") === "true";', fail: 'console.log(ok);' }
    ]
  },
  {
    id: 'js-33', title: 'Removing items', xp: 30,
    teaches: 'filter keeps what you want. To keep what you do NOT want, invert the test.',
    brief: 'From <code>scores = [45, 88, 52, 91, 33]</code>, make <code>passed</code> keeping only scores of 50 or more. Print how many passed.',
    starter: 'const scores = [45, 88, 52, 91, 33];\n\nconst passed = scores.filter(  );\n\nconsole.log(passed.length);',
    hint: 'scores.filter(s => s >= 50)',
    tests: [
      { name: 'passed has 3 items', code: 'return Array.isArray(passed) && passed.length === 3;', fail: '88, 91 and 52 are 50 or more.' },
      { name: 'it prints 3', code: 'return out.join("|") === "3";', fail: 'console.log(passed.length);' }
    ]
  },
  {
    id: 'js-34', title: 'find vs filter', xp: 30,
    teaches: 'find returns the FIRST matching item. filter returns ALL matching items.',
    brief: 'From <code>people = [{name:"Ali",age:17},{name:"Sara",age:22}]</code>, find the first person over 18. Store just their <code>name</code> in <code>first</code>.',
    starter: 'const people = [\n  { name: "Ali", age: 17 },\n  { name: "Sara", age: 22 }\n];\n\nconst first = ;',
    hint: 'people.find(p => p.age > 18).name',
    tests: [
      { name: 'first is Sara', code: 'return first === "Sara";', fail: 'Ali is 17, Sara is 22. find returns the person.' }
    ]
  },
  {
    id: 'js-35', title: 'Sorting numbers', xp: 30,
    teaches: 'sort() on numbers needs a comparator. Without one, it sorts them as text and 10 lands before 9.',
    brief: 'Sort <code>nums = [30, 4, 100, 8]</code> from smallest to largest into <code>sorted</code>.',
    starter: 'const nums = [30, 4, 100, 8];\n\n// for numbers always pass a comparator\nconst sorted = nums.sort(  );\n\nconsole.log(sorted);',
    hint: 'nums.sort((a, b) => a - b)',
    tests: [
      { name: 'sorted is [4,8,30,100]', code: 'return JSON.stringify(sorted) === "[4,8,30,100]";', fail: 'Without the comparator, 100 would come before 30.' }
    ]
  },
  {
    id: 'js-36', title: 'Reversing', xp: 20,
    teaches: 'reverse() flips a list in place. reverse() on the string also works via split and reverse.',
    brief: 'Reverse <code>word = "stressed"</code> into <code>normal</code>. Print it.',
    starter: 'const word = "stressed";\n\n// split, reverse, join\nconst normal = ;\n\nconsole.log(normal);',
    hint: 'word.split("").reverse().join("")',
    tests: [
      { name: 'normal is desserts', code: 'return normal === "desserts";', fail: 'stressed reversed is desserts.' },
      { name: 'it prints desserts', code: 'return out.join("|") === "desserts";', fail: 'console.log(normal);' }
    ]
  },

  /* ---------- objects ---------- */
  {
    id: 'js-37', title: 'Looping over an object', xp: 30,
    teaches: 'Object.entries gives you [key, value] pairs you can loop over.',
    brief: 'Count how many keys <code>stock = {pen:3, book:5, bag:2}</code> has. Call it <code>count</code>. Print it.',
    starter: 'const stock = { pen: 3, book: 5, bag: 2 };\n\n// entries() turns an object into [key, value] pairs\nconst count = ;\n\nconsole.log(count);',
    hint: 'Object.keys(stock).length',
    tests: [
      { name: 'count is 3', code: 'return count === 3;', fail: 'pen, book, bag - three keys.' },
      { name: 'it prints 3', code: 'return out.join("|") === "3";', fail: 'console.log(count);' }
    ]
  },
  {
    id: 'js-38', title: 'Updating an object', xp: 30,
    teaches: 'Spreading an object copies it, then you can change or add keys in one expression.',
    brief: 'Make <code>updated</code> from <code>user = {name:"Ali", age:22}</code> with the age changed to 23. Do not change <code>user</code> itself.',
    starter: 'const user = { name: "Ali", age: 22 };\n\n// spread copies, then we change one key\nconst updated = ;',
    hint: '{ ...user, age: 23 }',
    tests: [
      { name: 'updated.age is 23', code: 'return updated && updated.age === 23;', fail: '{ ...user, age: 23 }' },
      { name: 'user is unchanged', code: 'return user.age === 22;', fail: 'The spread must create a copy, not mutate user.' },
      { name: 'name carried over', code: 'return updated && updated.name === "Ali";', fail: 'Spreading keeps the other keys.' }
    ]
  },
  {
    id: 'js-39', title: 'Optional chaining', xp: 30,
    teaches: '?. reads a value only if the thing before it exists, instead of throwing.',
    brief: '<code>profile = { address: { city: "Lahore" } }</code>. Print <code>profile.address?.city</code> and also <code>profile.phone?.number</code>.',
    starter: 'const profile = { address: { city: "Lahore" } };\n\n// ?. stops the code crashing when something is missing\nconsole.log(profile.address?.city);\nconsole.log(profile.phone?.number);',
    hint: 'A missing value comes back as undefined rather than an error.',
    tests: [
      { name: 'first line is Lahore', code: 'return out[0] === "Lahore";', fail: 'city exists.' },
      { name: 'second line is undefined', code: 'return out[1] === "undefined";', fail: 'phone does not exist, so ?. gives undefined.' }
    ]
  },
  {
    id: 'js-40', title: 'Nullish coalescing', xp: 30,
    teaches: '?? falls back to a default only when the left side is null or undefined, unlike || which also falls back for 0 and false.',
    brief: '<code>score = 0</code>. Print <code>score ?? 10</code> and <code>score || 10</code> to see the difference.',
    starter: 'const score = 0;\n\n// ?? only falls back for null/undefined\nconsole.log(score ?? 10);\n// || falls back for 0 too\nconsole.log(score || 10);',
    hint: 'One gives 0, the other gives 10.',
    tests: [
      { name: 'first is 0', code: 'return out[0] === "0";', fail: '?? keeps 0 because it is not null or undefined.' },
      { name: 'second is 10', code: 'return out[1] === "10";', fail: '|| treats 0 as falsy and falls back to 10.' }
    ]
  },

  /* ---------- functions ---------- */
  {
    id: 'js-41', title: 'Default parameters', xp: 30,
    teaches: 'A parameter with a default value is used when the argument is missing.',
    brief: 'Write <code>greet(name = "friend")</code> that returns <code>"hi NAME"</code>. Print <code>greet()</code> with no argument.',
    starter: 'function greet(name) {\n  return "hi " + ;\n}\n\nconsole.log(greet());',
    hint: 'function greet(name = "friend")',
    tests: [
      { name: 'greet() is "hi friend"', code: 'return greet() === "hi friend";', fail: 'The default kicks in when no argument is passed.' },
      { name: 'greet("Ali") is "hi Ali"', code: 'return greet("Ali") === "hi Ali";', fail: 'A passed argument overrides the default.' },
      { name: 'it prints hi friend', code: 'return out.join("|") === "hi friend";', fail: 'console.log(greet());' }
    ]
  },
  {
    id: 'js-42', title: 'Arrow functions', xp: 30,
    teaches: 'An arrow function is a shorter function with an implicit return when the body is one expression.',
    brief: 'Write a <code>double</code> arrow function that takes a number and returns it doubled. Print <code>double(21)</code>.',
    starter: 'const double = (n) => ;\n\nconsole.log(double(21));',
    hint: 'const double = n => n * 2;',
    tests: [
      { name: 'double(21) is 42', code: 'return double(21) === 42;', fail: 'Return n * 2.' },
      { name: 'it prints 42', code: 'return out.join("|") === "42";', fail: 'console.log(double(21));' }
    ]
  },
  {
    id: 'js-43', title: 'Returning early', xp: 35,
    teaches: 'return exits the function immediately. Guard clauses put the failure case first and keep the main path flat.',
    brief: 'Write <code>label(n)</code> that returns <code>"negative"</code> for n below 0, <code>"zero"</code> for 0 and <code>"positive"</code> otherwise. Print <code>label(0)</code>.',
    starter: 'function label(n) {\n  \n  return "positive";\n}\n\nconsole.log(label(0));',
    hint: 'if (n < 0) return "negative"; then check n === 0.',
    tests: [
      { name: 'label(-5) is negative', code: 'return label(-5) === "negative";', fail: 'Anything below zero.' },
      { name: 'label(0) is zero', code: 'return label(0) === "zero";', fail: 'Zero is not positive.' },
      { name: 'label(9) is positive', code: 'return label(9) === "positive";', fail: 'The final return covers the rest.' }
    ]
  },
  {
    id: 'js-44', title: 'Closure', xp: 40,
    teaches: 'An inner function keeps access to the variables of the function it was created in, even after that function has finished.',
    brief: 'Make a <code>counter()</code> function that returns a function. Each call of the returned function adds 1 and returns the new value. Print two calls.',
    starter: 'function counter() {\n  let n = 0;\n  return function () {\n    \n  };\n}\n\nconst next = counter();\nconsole.log(next());\nconsole.log(next());',
    hint: 'return n = n + 1;',
    tests: [
      { name: 'first call is 1', code: 'return out[0] === "1";', fail: 'n starts at 0, so the first call returns 1.' },
      { name: 'second call is 2', code: 'return out[1] === "2";', fail: 'n is remembered between calls.' }
    ]
  },

  /* ---------- array methods chained ---------- */
  {
    id: 'js-45', title: 'Chaining methods', xp: 35,
    teaches: 'filter, map and reduce are designed to chain. Each one hands its result to the next.',
    brief: 'From <code>orders = [{n:"a",t:500},{n:"b",t:1500},{n:"c",t:900},{n:"d",t:2500}]</code>, total only the orders over 1000 into <code>bigTotal</code>. Print it.',
    starter: 'const orders = [\n  { n: "a", t: 500 },\n  { n: "b", t: 1500 },\n  { n: "c", t: 900 },\n  { n: "d", t: 2500 }\n];\n\nconst bigTotal = orders\n  \n\nconsole.log(bigTotal);',
    hint: 'orders.filter(o => o.t > 1000).map(o => o.t).reduce((s, n) => s + n, 0)',
    tests: [
      { name: 'bigTotal is 4000', code: 'return bigTotal === 4000;', fail: '1500 + 2500 = 4000.' },
      { name: 'it prints 4000', code: 'return out.join("|") === "4000";', fail: 'console.log(bigTotal);' }
    ]
  },
  {
    id: 'js-46', title: 'Flat', xp: 30,
    teaches: 'flat() collapses nested arrays one level deep.',
    brief: 'Flatten <code>nested = [[1,2],[3,4]]</code> into <code>flat</code>. Print it.',
    starter: 'const nested = [[1, 2], [3, 4]];\n\nconst flat = ;\n\nconsole.log(flat);',
    hint: 'nested.flat()',
    tests: [
      { name: 'flat is [1,2,3,4]', code: 'return JSON.stringify(flat) === "[1,2,3,4]";', fail: 'flat() removes one level of nesting.' }
    ]
  },
  {
    id: 'js-47', title: 'Every and some', xp: 30,
    teaches: 'every() is true when all items pass. some() is true when at least one passes.',
    brief: 'Check that every number in <code>scores = [50, 60, 70]</code> is at least 40. Store it in <code>allPass</code>.',
    starter: 'const scores = [50, 60, 70];\n\nconst allPass = ;',
    hint: 'scores.every(s => s >= 40)',
    tests: [
      { name: 'allPass is true', code: 'return allPass === true;', fail: 'every() returns true only if all pass.' }
    ]
  },
  {
    id: 'js-48', title: 'includes', xp: 20,
    teaches: 'includes answers "is this in the list" without needing indexOf and a comparison.',
    brief: 'Check whether <code>roles = ["admin","editor"]</code> includes <code>"owner"</code>. Store it in <code>hasOwner</code>. Print it.',
    starter: 'const roles = ["admin", "editor"];\n\nconst hasOwner = ;\n\nconsole.log(hasOwner);',
    hint: 'roles.includes("owner")',
    tests: [
      { name: 'hasOwner is false', code: 'return hasOwner === false;', fail: 'There is no owner role, so it is false.' },
      { name: 'it prints false', code: 'return out.join("|") === "false";', fail: 'console.log(hasOwner);' }
    ]
  },

  /* ---------- small programs ---------- */
  {
    id: 'js-49', title: 'FizzBuzz', xp: 40,
    teaches: 'The classic interview warm-up. It tests ordering of conditions, not cleverness.',
    brief: 'For <code>n = 15</code>, print <code>"FizzBuzz"</code>, <code>"Fizz"</code> or <code>"Buzz"</code>.',
    starter: 'const n = 15;\n\n// check both conditions first, then one, then neither\n',
    hint: 'if both divisible by 3 and 5 -> FizzBuzz, else if 3 -> Fizz, else if 5 -> Buzz.',
    tests: [
      { name: 'it prints FizzBuzz', code: 'return out.join("|") === "FizzBuzz";', fail: '15 is divisible by both 3 and 5.' }
    ]
  },
  {
    id: 'js-50', title: 'Second largest', xp: 40,
    teaches: 'Sorting then picking is fine for small lists. It is the clearest answer, not the fastest.',
    brief: 'From <code>nums = [5, 19, 3, 42, 7]</code>, find the second largest. Call it <code>second</code>. Print it.',
    starter: 'const nums = [5, 19, 3, 42, 7];\n\n// sort descending, the second item is the answer\nconst second = ;\n\nconsole.log(second);',
    hint: 'nums.sort((a,b) => b - a)[1]',
    tests: [
      { name: 'second is 19', code: 'return second === 19;', fail: 'Sorted descending: 42, 19, 7, 5, 3.' },
      { name: 'it prints 19', code: 'return out.join("|") === "19";', fail: 'console.log(second);' }
    ]
  },
  {
    id: 'js-51', title: 'Remove duplicates', xp: 35,
    teaches: 'Converting an array to a Set drops duplicates, then spread it back into an array.',
    brief: 'Remove duplicates from <code>items = [1,2,2,3,3,3]</code>. Call it <code>unique</code>. Print how many are left.',
    starter: 'const items = [1, 2, 2, 3, 3, 3];\n\n// a Set only keeps one of each value\nconst unique = ;\n\nconsole.log(unique.length);',
    hint: '[...new Set(items)]',
    tests: [
      { name: 'unique has 3 items', code: 'return Array.isArray(unique) && unique.length === 3;', fail: '1, 2 and 3 survive.' },
      { name: 'it prints 3', code: 'return out.join("|") === "3";', fail: 'console.log(unique.length);' }
    ]
  },
  {
    id: 'js-52', title: 'Grouping', xp: 40,
    teaches: 'Reducing into an object builds a lookup table. This pattern appears everywhere in real code.',
    brief: 'Group <code>staff = [{d:"Eng",n:"Ali"},{d:"Sales",n:"Hina"},{d:"Eng",n:"Sara"}]</code> by department into <code>groups</code> where <code>groups.Eng</code> is an array of names. Print how many are in Eng.',
    starter: 'const staff = [\n  { d: "Eng", n: "Ali" },\n  { d: "Sales", n: "Hina" },\n  { d: "Eng", n: "Sara" }\n];\n\nconst groups = {};\nfor (const s of staff) {\n  \n}\n\nconsole.log(groups.Eng.length);',
    hint: 'if (!groups[s.d]) groups[s.d] = []; then push.',
    tests: [
      { name: 'Eng has 2', code: 'return groups.Eng && groups.Eng.length === 2;', fail: 'Ali and Sara are both in Eng.' },
      { name: 'Sales has 1', code: 'return groups.Sales && groups.Sales.length === 1;', fail: 'Only Hina is in Sales.' },
      { name: 'it prints 2', code: 'return out.join("|") === "2";', fail: 'console.log(groups.Eng.length);' }
    ]
  },
  {
    id: 'js-53', title: 'Deeply nested value', xp: 35,
    teaches: 'Reading nested data safely means optional chaining all the way down, with a fallback.',
    brief: 'From <code>data = { user: { profile: { name: "Ali" } } }</code>, get the name safely into <code>name</code>, defaulting to <code>"unknown"</code> if anything is missing. Print it.',
    starter: 'const data = { user: { profile: { name: "Ali" } } };\n\n// walk down, with a fallback at every step\nconst name = ;\n\nconsole.log(name);',
    hint: 'data.user?.profile?.name ?? "unknown"',
    tests: [
      { name: 'name is Ali', code: 'return name === "Ali";', fail: 'The chain reaches the name.' }
    ]
  },
  {
    id: 'js-54', title: 'Asynchronous thinking', xp: 40,
    teaches: 'A Promise represents a value that is not ready yet. setTimeout produces one; await waits for it.',
    brief: 'Write <code>wait(ms)</code> that returns a Promise. Store it in <code>p</code>, then print whether it is a Promise.',
    starter: '// a Promise says "the value is coming"\nfunction wait(ms) {\n  return new Promise(  );\n}\n\nconst p = ;\n\nconsole.log(p instanceof Promise);',
    hint: 'new Promise(resolve => setTimeout(() => resolve("done"), ms))',
    tests: [
      { name: 'wait returns a Promise', code: 'return wait(1) instanceof Promise;', fail: 'Return new Promise(...)' },
      { name: 'p is a Promise', code: 'return p instanceof Promise;', fail: 'const p = wait(10);' },
      { name: 'it prints true', code: 'return out.join("|") === "true";', fail: 'console.log(p instanceof Promise);' }
    ]
  },
  {
    id: 'js-55', title: 'Build a number list', xp: 40,
    teaches: 'A range helper saves typing everywhere. Generating data with code beats typing it.',
    brief: 'Make <code>range(n)</code> return an array of the numbers 0 to n-1. Print <code>range(5)</code>.',
    starter: 'function range(n) {\n  \n}\n\nconsole.log(range(5));',
    hint: 'const out = []; for (let i = 0; i < n; i++) out.push(i); return out;',
    tests: [
      { name: 'range(5) is [0,1,2,3,4]', code: 'return JSON.stringify(range(5)) === "[0,1,2,3,4]";', fail: 'Zero up to but not including n.' },
      { name: 'range(3) is [0,1,2]', code: 'return JSON.stringify(range(3)) === "[0,1,2]";', fail: 'Same rule for any n.' }
    ]
  },
  {
    id: 'js-56', title: 'A tiny library', xp: 45,
    teaches: 'Reusable pure functions are the point. Each one does one job and can be tested on its own.',
    brief: 'Write three functions: <code>double(n)</code>, <code>isEven(n)</code> and <code>sum(list)</code>. Print the sum of the doubles of <code>[1,2,3]</code>.',
    starter: 'function double(n) {\n  \n}\n\nfunction isEven(n) {\n  \n}\n\nfunction sum(list) {\n  \n}\n\nconsole.log(sum([1, 2, 3].map(double)));',
    hint: 'double: n * 2. isEven: n % 2 === 0. sum: reduce or a loop.',
    tests: [
      { name: 'double(4) is 8', code: 'return double(4) === 8;', fail: 'Return n * 2.' },
      { name: 'isEven(4) is true', code: 'return isEven(4) === true;', fail: 'n % 2 === 0' },
      { name: 'isEven(3) is false', code: 'return isEven(3) === false;', fail: '3 leaves remainder 1.' },
      { name: 'it prints 12', code: 'return out.join("|") === "12";', fail: '2 + 4 + 6 = 12.' }
    ]
  },
  {
    id: 'js-57', title: 'Working with dates', xp: 35,
    teaches: 'The Date object stores a moment in time. getFullYear and toISOString read it back.',
    brief: 'Make an object <code>info</code> holding <code>year</code> (the current year) and <code>now</code> (a Date). Print just the year.',
    starter: 'const info = {\n  year: ,\n  now: \n};\n\nconsole.log(info.year);',
    hint: 'new Date().getFullYear()',
    tests: [
      { name: 'year is a number', code: 'return typeof info.year === "number";', fail: 'getFullYear() returns a number.' },
      { name: 'now is a Date', code: 'return info.now instanceof Date;', fail: 'info.now should be new Date()' }
    ]
  },
  {
    id: 'js-58', title: 'Validation', xp: 40,
    teaches: 'Before trusting input, check it. This is the first half of every real form.',
    brief: 'Write <code>validEmail(s)</code> that returns true only when <code>s</code> contains both an <code>@</code> and a <code>.</code> after it. Print it for <code>"ali@site.com"</code>.',
    starter: 'function validEmail(s) {\n  \n}\n\nconsole.log(validEmail("ali@site.com"));',
    hint: 'const at = s.indexOf("@"); return at > 0 && s.indexOf(".", at) > at;',
    tests: [
      { name: 'valid email is true', code: 'return validEmail("ali@site.com") === true;', fail: 'There is an @ and a dot after it.' },
      { name: 'no at sign is false', code: 'return validEmail("ali.site.com") === false;', fail: 'Without an @ it cannot be an email.' },
      { name: 'no dot is false', code: 'return validEmail("ali@site") === false;', fail: 'A dot is needed after the @.' },
      { name: 'it prints true', code: 'return out.join("|") === "true";', fail: 'console.log(validEmail("ali@site.com"));' }
    ]
  },
  {
    id: 'js-59', title: 'Format a table', xp: 45,
    teaches: 'Turning data into presentable text is a real task. Padding and joining matter more than you think.',
    brief: 'From <code>rows = [["Ali",95000],["Hina",72000]]</code>, build <code>lines</code> where each entry is name plus a colon plus salary, like <code>"Ali:95000"</code>. Join them with a newline into <code>text</code>.',
    starter: 'const rows = [["Ali", 95000], ["Hina", 72000]];\n\nconst lines = rows.map(  );\nconst text = ;\n\nconsole.log(text);',
    hint: 'r => r[0] + ":" + r[1]  and  lines.join("\\n")',
    tests: [
      { name: 'text has both rows', code: 'return text === "Ali:95000\\nHina:72000";', fail: 'Join the two lines with a newline.' }
    ]
  },
  {
    id: 'js-60', title: 'Final program: a ledger', xp: 60,
    teaches: 'Combine almost everything: objects, filter, reduce, destructuring and a pure function.',
    brief: 'You have ledger entries of <code>{name, qty, price}</code>. Work out the total value of entries with qty over 1. Print it.',
    starter: 'const ledger = [\n  { name: "bolt", qty: 4, price: 10 },\n  { name: "nut", qty: 1, price: 25 },\n  { name: "washer", qty: 8, price: 3 }\n];\n\n// only qty over 1, then total up qty * price\nconst total = ledger\n  \n\nconsole.log(total);',
    hint: 'ledger.filter(e => e.qty > 1).reduce((sum, e) => sum + e.qty * e.price, 0)',
    tests: [
      { name: 'total is 64', code: 'return total === 64;', fail: '4*10 = 40, plus 8*3 = 24, so 64.' },
      { name: 'it prints 64', code: 'return out.join("|") === "64";', fail: 'console.log(total);' }
    ]
  }
];/* Appended here rather than in levels.js: this file loads AFTER levels.js,
   so TRACKS already exists and JS_PART2 is defined. */
if (typeof TRACKS !== 'undefined' && Array.isArray(JS_PART2)) {
  TRACKS.js.levels = TRACKS.js.levels.concat(JS_PART2);
}

