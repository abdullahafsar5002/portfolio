/* ============================================================
   SQL TRACK, part 2: sql-15 through sql-50

   Same shape as the first fourteen levels in levels.js. Every level runs
   against this file's schema, the same one engine.js loads into the
   browser database:

     departments  (1 Engineering, 2 Sales, 3 Accounts)
     employees    Ali Engineer 95000 d1
                  Sara Engineer 88000 d1
                  Bilal Manager 120000 d3
                  Hina Sales 72000 d2
                  Usman Sales 68000 d2

   Later levels add a projects table, so earlier answers keep working.

   Loaded after levels.js and appended to TRACKS.sql.
   ============================================================ */
var SQL_PART2 = [
  {
    id: 'sql-15', title: 'Only some columns', xp: 20,
    teaches: 'Listing columns explicitly is faster than SELECT * and documents exactly what you want.',
    brief: 'Get just the <code>name</code> and <code>salary</code> of every employee.',
    starter: 'SELECT \nFROM employees;',
    hint: 'SELECT name, salary FROM employees;',
    checks: [
      { name: '5 rows', code: 'return rows.length === 5;', fail: 'All employees should come back.' },
      { name: 'only two columns', code: 'return cols.length === 2;', fail: 'name and salary only.' },
      { name: 'the right names', code: 'return rows[0].name === "Ali" && rows[0].salary === 95000;', fail: 'Ali earns 95000.' }
    ]
  },
  {
    id: 'sql-16', title: 'Rename a column', xp: 20,
    teaches: 'AS gives a column a different label, which is how you make output readable.',
    brief: 'Show each employee name as <code>employee</code> and salary as <code>pay</code>.',
    starter: 'SELECT name AS , salary AS \nFROM employees;',
    hint: 'SELECT name AS employee, salary AS pay FROM employees;',
    checks: [
      { name: '5 rows', code: 'return rows.length === 5;', fail: 'All employees.' },
      { name: 'columns are employee and pay', code: 'return cols.indexOf("employee") !== -1 && cols.indexOf("pay") !== -1;', fail: 'Use AS employee and AS pay.' },
      { name: 'values are right', code: 'return rows[0].employee === "Ali" && rows[0].pay === 95000;', fail: 'Ali earns 95000.' }
    ]
  },
  {
    id: 'sql-17', title: 'Not equal', xp: 20,
    teaches: 'The <> operator means not equal. != does the same job.',
    brief: 'Get everyone who is <b>not</b> in Sales.',
    starter: 'SELECT name\nFROM employees\nWHERE ;',
    hint: "WHERE role <> 'Sales'",
    checks: [
      { name: '3 rows come back', code: 'return rows.length === 3;', fail: 'Ali, Sara and Bilal are not Sales.' },
      { name: 'none are Sales', code: 'return rows.every(function(r){ return r.role !== "Sales"; });', fail: 'Exclude every Sales row.' }
    ]
  },
  {
    id: 'sql-18', title: 'Two conditions with AND', xp: 25,
    teaches: 'AND needs both sides to be true. One side alone gives too many rows.',
    brief: 'Get employees who are Engineers <b>and</b> earn more than 90000.',
    starter: 'SELECT name, salary\nFROM employees\nWHERE ;',
    hint: "WHERE role = 'Engineer' AND salary > 90000",
    checks: [
      { name: '1 row comes back', code: 'return rows.length === 1;', fail: 'Only Ali is an Engineer over 90000.' },
      { name: 'it is Ali', code: 'return rows[0].name === "Ali" && rows[0].salary === 95000;', fail: 'Ali, 95000' }
    ]
  },
  {
    id: 'sql-19', title: 'Either condition', xp: 25,
    teaches: 'OR is true when at least one side is true. It matches more rows than AND does.',
    brief: 'Get everyone who is a Manager <b>or</b> earns more than 90000.',
    starter: 'SELECT name, role, salary\nFROM employees\nWHERE ;',
    hint: "WHERE role = 'Manager' OR salary > 90000",
    checks: [
      { name: '2 rows come back', code: 'return rows.length === 2;', fail: 'Bilal is the Manager; Ali earns over 90000.' },
      { name: 'they are the right ones', code: 'return rows.some(function(r){ return r.name === "Bilal"; }) && rows.some(function(r){ return r.name === "Ali"; });', fail: 'Bilal and Ali' }
    ]
  },
  {
    id: 'sql-20', title: 'Between two values', xp: 25,
    teaches: 'BETWEEN is inclusive on both ends, so it covers the numbers you typed and everything between.',
    brief: 'Get employees whose salary is between 70000 and 95000.',
    starter: 'SELECT name, salary\nFROM employees\nWHERE ;',
    hint: 'WHERE salary BETWEEN 70000 AND 95000',
    checks: [
      { name: '3 rows come back', code: 'return rows.length === 3;', fail: 'Ali 95000, Hina 72000, Usman 68000 is outside. Count the ones inside.' },
      { name: 'no one above the range', code: 'return rows.every(function(r){ return r.salary >= 70000 && r.salary <= 95000; });', fail: 'Every salary must be inside the range.' }
    ]
  },
  {
    id: 'sql-21', title: 'Lowest and highest', xp: 25,
    teaches: 'MIN and MAX pick the ends of a column without you having to sort.',
    brief: 'Get the lowest and highest salary in one row, as <code>lowest</code> and <code>highest</code>.',
    starter: 'SELECT  AS lowest,  AS highest\nFROM employees;',
    hint: 'SELECT MIN(salary) AS lowest, MAX(salary) AS highest FROM employees;',
    checks: [
      { name: '1 row comes back', code: 'return rows.length === 1;', fail: 'MIN and MAX together still give one row.' },
      { name: 'lowest is 68000', code: 'return rows[0].lowest === 68000;', fail: 'Usman earns the least.' },
      { name: 'highest is 120000', code: 'return rows[0].highest === 120000;', fail: 'Bilal earns the most.' }
    ]
  },
  {
    id: 'sql-22', title: 'Total salary', xp: 25,
    teaches: 'SUM adds a whole column up and ignores anything that is not a number.',
    brief: 'Add up every salary and call it <code>total</code>.',
    starter: 'SELECT  AS total\nFROM employees;',
    hint: 'SELECT SUM(salary) AS total FROM employees;',
    checks: [
      { name: '1 row comes back', code: 'return rows.length === 1;', fail: 'SUM gives a single value.' },
      { name: 'the total is 443000', code: 'return rows[0].total === 443000;', fail: '95000 + 88000 + 120000 + 72000 + 68000 = 443000' }
    ]
  },
  {
    id: 'sql-23', title: 'Count with a condition', xp: 30,
    teaches: 'Putting a WHERE next to COUNT filters before counting.',
    brief: 'Count how many employees are in Sales.',
    starter: 'SELECT COUNT(*) AS total\nFROM employees\n;',
    hint: "WHERE role = 'Sales'",
    checks: [
      { name: '1 row comes back', code: 'return rows.length === 1;', fail: 'A count is always one row.' },
      { name: 'the count is 2', code: 'return rows[0].total === 2;', fail: 'Hina and Usman are Sales.' }
    ]
  },
  {
    id: 'sql-24', title: 'Count distinct values', xp: 30,
    teaches: 'COUNT(column) skips NULLs. COUNT(DISTINCT column) counts each value only once.',
    brief: 'Count how many different roles exist.',
    starter: 'SELECT COUNT() AS roles\nFROM employees;',
    hint: 'SELECT COUNT(DISTINCT role) AS roles FROM employees;',
    checks: [
      { name: '1 row comes back', code: 'return rows.length === 1;', fail: 'One count.' },
      { name: 'the count is 3', code: 'return rows[0].roles === 3;', fail: 'Engineer, Manager and Sales.' }
    ]
  },
  {
    id: 'sql-25', title: 'Math on a column', xp: 30,
    teaches: 'You can do arithmetic straight inside a SELECT, and give the result a name.',
    brief: 'Show each employee name with their salary raised by 10 percent, as <code>raised</code>.',
    starter: 'SELECT name, salary * AS raised\nFROM employees;',
    hint: 'SELECT name, salary * 1.1 AS raised FROM employees;',
    checks: [
      { name: '5 rows', code: 'return rows.length === 5;', fail: 'Every employee.' },
      { name: 'there is a raised column', code: 'return cols.indexOf("raised") !== -1;', fail: 'Use AS raised.' },
      { name: 'Ali is 104500', code: 'return Math.round(rows[0].raised) === 104500;', fail: '95000 * 1.1 = 104500' }
    ]
  },
  {
    id: 'sql-26', title: 'A rounding function', xp: 30,
    teaches: 'Floating point maths can leave ugly decimals. ROUND tidies them up.',
    brief: 'Average the salary and round it to a whole number, as <code>rounded</code>.',
    starter: 'SELECT  AS rounded\nFROM employees;',
    hint: 'SELECT ROUND(AVG(salary)) AS rounded FROM employees;',
    checks: [
      { name: '1 row comes back', code: 'return rows.length === 1;', fail: 'One average.' },
      { name: 'it is 88600', code: 'return Math.round(rows[0].rounded) === 88600;', fail: 'The average is 88600.' }
    ]
  },
  {
    id: 'sql-27', title: 'Make a table', xp: 35,
    teaches: 'CREATE TABLE defines the shape. Without column types SQLite cannot store anything.',
    brief: 'Create a table called <code>tasks</code> with an <code>id</code> number and a <code>title</code> text.',
    starter: 'CREATE TABLE ;',
    hint: 'CREATE TABLE tasks (id INTEGER, title TEXT);',
    checks: [
      { name: 'the table exists', code: 'return tableExists("tasks");', fail: 'CREATE TABLE tasks' },
      { name: 'it has an id column', code: 'return colType("tasks", "id") !== null;', fail: 'id INTEGER' },
      { name: 'it has a title column', code: 'return colType("tasks", "title") !== null;', fail: 'title TEXT' }
    ]
  },
  {
    id: 'sql-28', title: 'Insert rows', xp: 35,
    teaches: 'INSERT adds rows. An explicit column list means later columns can be added safely.',
    brief: '<code>projects</code> already holds SkyFlame (id 1) and Toruk (id 2). Add a third row: id 3 titled <code>Code Quest</code>.',
    starter: 'INSERT INTO projects (id, title) VALUES ;',
    hint: "INSERT INTO projects (id, title) VALUES (3, 'Code Quest');",
    checks: [
      { name: 'three rows now', code: 'return countRows("projects") === 3;', fail: 'Add exactly one row.' },
      { name: 'it is Code Quest', code: 'return cell("projects", 3, "title") === "Code Quest";', fail: 'Row 3 should be Code Quest.' },
      { name: 'the others survived', code: 'return cell("projects", 1, "title") === "SkyFlame" && cell("projects", 2, "title") === "Toruk";', fail: 'Leave rows 1 and 2 alone.' }
    ]
  },
  {
    id: 'sql-29', title: 'Update a row', xp: 35,
    teaches: 'UPDATE changes existing rows. Leaving off the WHERE clause changes every row, which is rarely what you want.',
    brief: 'Change the title of project 1 to <code>SkyFlame ERP</code>.',
    starter: 'UPDATE projects\nSET ;',
    hint: "UPDATE projects SET title = 'SkyFlame ERP' WHERE id = 1;",
    checks: [
      { name: 'project 1 was renamed', code: 'return cell("projects", 1, "title") === "SkyFlame ERP";', fail: "SET title = 'SkyFlame ERP' WHERE id = 1" },
      { name: 'project 2 was left alone', code: 'return cell("projects", 2, "title") === "Toruk";', fail: 'Only id 1 should change.' }
    ]
  },
  {
    id: 'sql-30', title: 'Delete a row', xp: 35,
    teaches: 'DELETE removes whole rows. Test the WHERE clause with a SELECT first so you delete only what you meant to.',
    brief: 'Delete the project with id 2.',
    starter: 'DELETE FROM projects\n;',
    hint: 'DELETE FROM projects WHERE id = 2;',
    checks: [
      { name: 'one row is left', code: 'return countRows("projects") === 1;', fail: 'Delete exactly one row.' },
      { name: 'it is project 1', code: 'return cell("projects", 1, "title") === "SkyFlame";', fail: 'Project 1 must survive.' }
    ]
  },
  {
    id: 'sql-31', title: 'Insert from a query', xp: 40,
    teaches: 'INSERT INTO ... SELECT copies rows that already match a condition instead of retyping them.',
    brief: 'Copy every Sales employee into a table called <code>sales_team</code> with columns <code>name</code> and <code>salary</code>, then show what you copied.',
    starter: 'CREATE TABLE sales_team (name TEXT, salary INTEGER);\n\nINSERT INTO sales_team (name, salary)\nSELECT \nFROM employees\n\nSELECT * FROM sales_team;',
    hint: "INSERT INTO sales_team (name, salary) SELECT name, salary FROM employees WHERE role = 'Sales';",
    checks: [
      { name: 'the table exists', code: 'return tableExists("sales_team");', fail: 'Create sales_team first.' },
      { name: 'two rows copied', code: 'return countRows("sales_team") === 2;', fail: 'Hina and Usman.' },
      { name: 'they are the Sales people', code: 'return rows.length >= 2 && rows.some(function(r){ return r.name === "Hina"; }) && rows.some(function(r){ return r.name === "Usman"; });', fail: 'Hina and Usman are the Sales rows. Select them at the end.' }
    ]
  },
  {
    id: 'sql-32', title: 'Left join keeps everything', xp: 40,
    teaches: 'A LEFT JOIN keeps every row from the left table and fills unmatched right columns with NULL. That is how you spot employees with no department.',
    brief: 'List every employee with their department name, including anyone whose department is missing. Call the employee <code>employee</code>.',
    starter: 'SELECT e.name AS , d.name AS dept\nFROM employees e\n;',
    hint: 'FROM employees e LEFT JOIN departments d ON e.dept_id = d.id',
    checks: [
      { name: '5 employees come back', code: 'return rows.length === 5;', fail: 'A LEFT JOIN keeps all five.' },
      { name: 'every one has an employee name', code: 'return rows.every(function(r){ return !!r.employee; });', fail: 'Label the name column employee.' },
      { name: 'Ali is in Engineering', code: 'return rows[0].employee === "Ali" && rows[0].dept === "Engineering";', fail: 'Ali is in Engineering.' }
    ]
  },
  {
    id: 'sql-33', title: 'Count per department', xp: 40,
    teaches: 'GROUP BY with a COUNT of the join key shows the size of each group.',
    brief: 'For each <code>dept_id</code>, count the employees in it. Name the columns <code>dept_id</code> and <code>n</code>.',
    starter: 'SELECT dept_id, \nFROM employees\n;',
    hint: 'SELECT dept_id, COUNT(*) AS n FROM employees GROUP BY dept_id;',
    checks: [
      { name: '3 groups come back', code: 'return rows.length === 3;', fail: 'Departments 1, 2 and 3.' },
      { name: 'Engineering has 2', code: 'return rows.some(function(r){ return r.dept_id === 1 && r.n === 2; });', fail: 'Ali and Sara are in department 1.' },
      { name: 'Accounts has 1', code: 'return rows.some(function(r){ return r.dept_id === 3 && r.n === 1; });', fail: 'Only Bilal is in department 3.' }
    ]
  },
  {
    id: 'sql-34', title: 'Filter on a group total', xp: 45,
    teaches: 'WHERE filters rows before grouping. HAVING filters the groups afterwards, which is the only way to test an aggregate.',
    brief: 'Show roles and their head count, but only roles with more than one person. Name them <code>role</code> and <code>n</code>.',
    starter: 'SELECT role, COUNT(*) AS n\nFROM employees\nGROUP BY role\n;',
    hint: 'Add HAVING COUNT(*) > 1',
    checks: [
      { name: '2 groups come back', code: 'return rows.length === 2;', fail: 'Only Engineer and Sales have more than one.' },
      { name: 'Engineer has 2', code: 'return rows.some(function(r){ return r.role === "Engineer" && r.n === 2; });', fail: 'Ali and Sara.' },
      { name: 'Manager is excluded', code: 'return !rows.some(function(r){ return r.role === "Manager"; });', fail: 'Manager has only Bilal.' }
    ]
  },
  {
    id: 'sql-35', title: 'Average per role', xp: 40,
    teaches: 'An aggregate combined with GROUP BY gives one average per group.',
    brief: 'For each role, work out the average salary. Call them <code>role</code> and <code>avg_salary</code>.',
    starter: 'SELECT role, \nFROM employees\nGROUP BY role;',
    hint: 'SELECT role, AVG(salary) AS avg_salary FROM employees GROUP BY role;',
    checks: [
      { name: '3 groups come back', code: 'return rows.length === 3;', fail: 'One row per role.' },
      { name: 'Engineer averages 91500', code: 'var r=rows.find(function(x){ return x.role === "Engineer"; }); return r && Math.round(r.avg_salary) === 91500;', fail: '(95000 + 88000) / 2 = 91500' },
      { name: 'Manager averages 120000', code: 'var r=rows.find(function(x){ return x.role === "Manager"; }); return r && Math.round(r.avg_salary) === 120000;', fail: 'Bilal is the only Manager.' }
    ]
  },
  {
    id: 'sql-36', title: 'Sort by a computed value', xp: 40,
    teaches: 'ORDER BY can sort by an expression, not only a column you selected.',
    brief: 'List names ordered by salary from highest to lowest.',
    starter: 'SELECT name\nFROM employees\nORDER BY ;',
    hint: 'ORDER BY salary DESC',
    checks: [
      { name: '5 rows', code: 'return rows.length === 5;', fail: 'Everyone should be listed.' },
      { name: 'Bilal is first', code: 'return rows[0].name === "Bilal";', fail: 'Bilal earns 120000, the most.' },
      { name: 'Usman is last', code: 'return rows[4].name === "Usman";', fail: 'Usman earns 68000, the least.' }
    ]
  },
  {
    id: 'sql-37', title: 'Top two earners', xp: 45,
    teaches: 'LIMIT caps the row count, so sorting plus LIMIT is how you get a top N.',
    brief: 'Get the two highest salaries and their names, highest first.',
    starter: 'SELECT name, salary\nFROM employees\nORDER BY salary DESC\n;',
    hint: 'Add LIMIT 2',
    checks: [
      { name: '2 rows come back', code: 'return rows.length === 2;', fail: 'LIMIT 2' },
      { name: 'Bilal is first', code: 'return rows[0].name === "Bilal" && rows[0].salary === 120000;', fail: '120000 is the highest.' },
      { name: 'Ali is second', code: 'return rows[1].name === "Ali" && rows[1].salary === 95000;', fail: '95000 is next.' }
    ]
  },
  {
    id: 'sql-38', title: 'Rows of values', xp: 45,
    teaches: 'A VALUES list builds a small table inline. It is handy for filters and for quick reference data.',
    brief: 'List the department ids 1 and 3 using an inline VALUES list, and show employees whose dept_id is in that list.',
    starter: 'SELECT name, dept_id\nFROM employees\nWHERE dept_id IN (  )\n;',
    hint: 'WHERE dept_id IN (VALUES (1), (3))',
    checks: [
      { name: '3 rows come back', code: 'return rows.length === 3;', fail: 'Ali, Sara and Bilal.' },
      { name: 'departments 1 and 3 only', code: 'return rows.every(function(r){ return r.dept_id === 1 || r.dept_id === 3; });', fail: 'Only dept_id 1 and 3.' }
    ]
  },
  {
    id: 'sql-39', title: 'Combine two lists', xp: 45,
    teaches: 'UNION stacks two results and removes duplicates. UNION ALL keeps them, which is faster.',
    brief: 'List every role that is either Sales or Manager. Use a <code>SELECT DISTINCT</code> on role, not a WHERE on a column you did not select.',
    starter: 'SELECT DISTINCT role FROM employees WHERE role = \'Sales\'\n\n',
    hint: 'UNION SELECT DISTINCT role FROM employees WHERE role = \'Manager\'',
    checks: [
      { name: '2 rows come back', code: 'return rows.length === 2;', fail: 'Sales and Manager.' },
      { name: 'no duplicates', code: 'return rows[0].role !== rows[1].role;', fail: 'UNION removes duplicates.' },
      { name: 'they are the right ones', code: 'return rows.some(function(r){ return r.role === "Sales"; }) && rows.some(function(r){ return r.role === "Manager"; });', fail: 'Sales and Manager' }
    ]
  },
  {
    id: 'sql-40', title: 'A case for each label', xp: 45,
    teaches: 'CASE is a conditional expression. It works in a SELECT and can label rows the way a spreadsheet would.',
    brief: 'Show each name with a label <code>band</code>: "high" if salary is over 100000, otherwise "normal".',
    starter: 'SELECT name, \nFROM employees;',
    hint: "CASE WHEN salary > 100000 THEN 'high' ELSE 'normal' END AS band",
    checks: [
      { name: '5 rows', code: 'return rows.length === 5;', fail: 'Every employee.' },
      { name: 'there is a band column', code: 'return cols.indexOf("band") !== -1;', fail: 'Use AS band.' },
      { name: 'Bilal is high', code: 'var r=rows.find(function(x){ return x.name === "Bilal"; }); return r && r.band === "high";', fail: '120000 is over 100000.' },
      { name: 'Ali is normal', code: 'var r=rows.find(function(x){ return x.name === "Ali"; }); return r && r.band === "normal";', fail: '95000 is not over 100000.' }
    ]
  },
  {
    id: 'sql-41', title: 'Strip and upper case', xp: 45,
    teaches: 'Text functions clean up values before you compare or group them.',
    brief: 'Take the messy text <code>\'  ali khan  \'</code> and show it trimmed and in upper case, as <code>clean</code>.',
    starter: 'SELECT  AS clean;',
    hint: "UPPER(TRIM('  ali khan  '))",
    checks: [
      { name: 'one row comes back', code: 'return rows.length === 1;', fail: 'One row.' },
      { name: 'there is a clean column', code: 'return cols.indexOf("clean") !== -1;', fail: 'Use AS clean.' },
      { name: 'it is ALI KHAN', code: 'return rows[0].clean === "ALI KHAN";', fail: "UPPER(TRIM('  ali khan  ')) gives ALI KHAN" }
    ]
  },
  {
    id: 'sql-42', title: 'Search with LIKE', xp: 40,
    teaches: 'The underscore in LIKE matches exactly one character. % matches any number, including none.',
    brief: 'Find employees whose role starts with <code>Man</code>.',
    starter: 'SELECT name, role\nFROM employees\nWHERE ;',
    hint: "WHERE role LIKE 'Man%'",
    checks: [
      { name: '1 row comes back', code: 'return rows.length === 1;', fail: 'Only the Manager.' },
      { name: 'it is Bilal', code: 'return rows[0].name === "Bilal" && rows[0].role === "Manager";', fail: 'Bilal is the Manager.' }
    ]
  },
  {
    id: 'sql-43', title: 'Name length', xp: 40,
    teaches: 'LENGTH counts characters. It is a quick way to bucket or filter text.',
    brief: 'Show each name and its character count as <code>len</code>.',
    starter: 'SELECT name, \nFROM employees;',
    hint: 'SELECT name, LENGTH(name) AS len FROM employees;',
    checks: [
      { name: '5 rows', code: 'return rows.length === 5;', fail: 'Everyone.' },
      { name: 'Ali is 3', code: 'var r=rows.find(function(x){ return x.name === "Ali"; }); return r && r.len === 3;', fail: 'Ali has three letters.' },
      { name: 'Bilal is 5', code: 'var r=rows.find(function(x){ return x.name === "Bilal"; }); return r && r.len === 5;', fail: 'Bilal has five letters.' }
    ]
  },
  {
    id: 'sql-44', title: 'Substring search', xp: 45,
    teaches: 'SUBSTR pulls out part of a string, so you can build codes or initials from names.',
    brief: 'Build an <code>initial</code> for each employee: the first letter of their name.',
    starter: 'SELECT name, \nFROM employees;',
    hint: 'SUBSTR(name, 1, 1)',
    checks: [
      { name: '5 rows', code: 'return rows.length === 5;', fail: 'Everyone.' },
      { name: 'there is an initial column', code: 'return cols.indexOf("initial") !== -1;', fail: 'Use AS initial.' },
      { name: 'Ali is A', code: 'var r=rows.find(function(x){ return x.name === "Ali"; }); return r && r.initial === "A";', fail: 'SUBSTR(name, 1, 1)' }
    ]
  },
  {
    id: 'sql-45', title: 'Two departments at once', xp: 45,
    teaches: 'Comparing a column against a subquery that returns several rows lets you match a whole group.',
    brief: 'Get employees whose <code>dept_id</code> matches the <code>id</code> of a department named <code>Accounts</code>. Do not hardcode 3.',
    starter: 'SELECT name, dept_id\nFROM employees\nWHERE dept_id = (  )\n;',
    hint: 'WHERE dept_id = (SELECT id FROM departments WHERE name = \'Accounts\')',
    checks: [
      { name: '1 row comes back', code: 'return rows.length === 1;', fail: 'Only Bilal is in Accounts.' },
      { name: 'it is Bilal', code: 'return rows[0].name === "Bilal";', fail: 'Bilal is in Accounts.' },
      { name: 'the subquery is used', code: 'var t = sql.toLowerCase().replace(/\\s+/g, ""); return t.indexOf("selectidfromdepartments") !== -1;', fail: 'Look the id up with a subquery.' }
    ]
  },
  {
    id: 'sql-46', title: 'Above the company average', xp: 50,
    teaches: 'A subquery in the WHERE clause lets one result decide whether another row is included.',
    brief: 'Get employees who earn more than the average salary. Do not type the average out.',
    starter: 'SELECT name, salary\nFROM employees\nWHERE salary > \n;',
    hint: 'WHERE salary > (SELECT AVG(salary) FROM employees)',
    checks: [
      { name: '2 rows come back', code: 'return rows.length === 2;', fail: 'Only Ali and Bilal beat 88600.' },
      { name: 'they are the right ones', code: 'return rows.some(function(r){ return r.name === "Ali"; }) && rows.some(function(r){ return r.name === "Bilal"; });', fail: 'Ali and Bilal' },
      { name: 'the average is computed', code: 'var t = sql.toLowerCase().replace(/\\s+/g, ""); return t.indexOf("selectavg(salary)fromemployees") !== -1;', fail: 'Use a subquery for the average.' }
    ]
  },
  {
    id: 'sql-47', title: 'Staff and their managers', xp: 50,
    teaches: 'Joining a table to itself is called a self join. It needs aliases so each side can be named separately.',
    brief: 'List each employee with the name of their department. Use an inner join, so name the employee <code>employee</code> and the department <code>dept</code>.',
    starter: 'SELECT e.name AS , d.name AS dept\nFROM employees e\n',
    hint: 'JOIN departments d ON e.dept_id = d.id',
    checks: [
      { name: '5 rows', code: 'return rows.length === 5;', fail: 'Every employee has a department.' },
      { name: 'columns are right', code: 'return cols.indexOf("employee") !== -1 && cols.indexOf("dept") !== -1;', fail: 'employee and dept.' },
      { name: 'Ali is in Engineering', code: 'return rows[0].employee === "Ali" && rows[0].dept === "Engineering";', fail: 'Ali is in Engineering.' },
      { name: 'Bilal is in Accounts', code: 'var r=rows.find(function(x){ return x.employee === "Bilal"; }); return r && r.dept === "Accounts";', fail: 'Bilal is in Accounts.' }
    ]
  },
  {
    id: 'sql-48', title: 'Salary band report', xp: 55,
    teaches: 'A report often combines grouping, a computed value and an ordering, all in one query.',
    brief: 'For each role, show the highest salary and the number of people, named <code>role</code>, <code>top</code> and <code>n</code>. Highest salary role first.',
    starter: 'SELECT role, \nFROM employees\nGROUP BY role\nORDER BY ;',
    hint: 'MAX(salary) AS top, COUNT(*) AS n, then ORDER BY top DESC',
    checks: [
      { name: '3 rows', code: 'return rows.length === 3;', fail: 'One row per role.' },
      { name: 'Manager is first', code: 'return rows[0].role === "Manager" && rows[0].top === 120000;', fail: 'The Manager earns the most.' },
      { name: 'counts are right', code: 'var r=rows.find(function(x){ return x.role === "Sales"; }); return r && r.n === 2;', fail: 'Sales has two people.' }
    ]
  },
  {
    id: 'sql-49', title: 'Pay rise for everyone', xp: 55,
    teaches: 'UPDATE can compute from the current value, and a CASE lets different groups get different amounts.',
    brief: 'Give Sales a 10 percent raise and everyone else 5000, then show everyone.',
    starter: 'UPDATE employees\nSET \n;\n\nSELECT * FROM employees;',
    hint: "SET salary = salary * 1.1 / CASE WHEN role = 'Sales' ...",
    checks: [
      { name: '5 rows', code: 'return rows.length === 5;', fail: 'Select all employees after the update.' },
      { name: 'Hina is on 79200', code: 'var h=rows.find(function(r){ return r.name === "Hina"; }); return h && Math.round(h.salary) === 79200;', fail: '72000 * 1.1 = 79200' },
      { name: 'Ali is on 100000', code: 'var a=rows.find(function(r){ return r.name === "Ali"; }); return a && Math.round(a.salary) === 100000;', fail: '95000 + 5000 = 100000' }
    ]
  },
  {
    id: 'sql-50', title: 'Final query', xp: 60,
    teaches: 'A multi-table report: join, group, aggregate and order in a single statement.',
    brief: 'For each department, show its name and the total salary spent, as <code>dept</code> and <code>spend</code>. Highest spend first.',
    starter: 'SELECT d.name AS , \nFROM departments d\n\n',
    hint: 'JOIN employees e ON e.dept_id = d.id  then  SUM(e.salary) AS spend  GROUP BY d.name  ORDER BY spend DESC',
    checks: [
      { name: '3 rows', code: 'return rows.length === 3;', fail: 'One row per department with staff.' },
      { name: 'columns are right', code: 'return cols.indexOf("dept") !== -1 && cols.indexOf("spend") !== -1;', fail: 'dept and spend.' },
      { name: 'Engineering spent 183000', code: 'var r=rows.find(function(x){ return x.dept === "Engineering"; }); return r && r.spend === 183000;', fail: '95000 + 88000 = 183000' },
      { name: 'it is sorted by spend', code: 'return rows[0].spend >= rows[1].spend && rows[1].spend >= rows[2].spend;', fail: 'ORDER BY spend DESC' },
      { name: 'Engineering comes first', code: 'return rows[0].dept === "Engineering";', fail: 'Engineering spends 183000, the most.' }
    ]
  }
];

/* Appended here rather than in levels.js: this file loads AFTER levels.js,
   so TRACKS already exists and SQL_PART2 is defined. */
if (typeof TRACKS !== 'undefined' && Array.isArray(SQL_PART2)) {
  TRACKS.sql.levels = TRACKS.sql.levels.concat(SQL_PART2);
}