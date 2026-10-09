/* ============================================================
   LOGIC TRACK, part 2: lg-12 through lg-50

   Same shape as the first eleven levels in levels.js:

     target  the sequence of block kinds that finishes the level
     blocks  the palette the learner picks from

   The player may place a block more than once, and the palette always
   contains at least one block that does not belong in the answer.

   Loaded after levels.js and appended to TRACKS.logic.
   ============================================================ */
var LOGIC_PART2 = [
  {
    id: 'lg-12', title: 'Two variables', xp: 20,
    brief: 'Set <b>a</b> to 7. Set <b>b</b> to 5. Print both.',
    hint: 'Set, Set, Print variable, Print variable.',
    target: ['set', 'set', 'printvar', 'printvar'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'add', label: 'Add to variable', kind: 'add' }
    ]
  },
  {
    id: 'lg-13', title: 'Add twice', xp: 20,
    brief: 'Set <b>score</b> to 10. Add 3. Add 2. Then print it.',
    hint: 'One Set, two Adds, one Print variable.',
    target: ['set', 'add', 'add', 'printvar'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'add', label: 'Add to variable', kind: 'add' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'if', label: 'If / else', kind: 'if' }
    ]
  },
  {
    id: 'lg-14', title: 'Subtract by adding', xp: 25,
    brief: 'Set <b>lives</b> to 3. Add -1 three times. Then print it.',
    hint: 'Adding a negative number subtracts.',
    target: ['set', 'add', 'add', 'add', 'printvar'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'add', label: 'Add to variable', kind: 'add' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'print', label: 'Print a message', kind: 'print' }
    ]
  },
  {
    id: 'lg-15', title: 'Print, then set', xp: 25,
    brief: 'Print a message first. Then set <b>x</b> to 1. Then print the variable.',
    hint: 'Order matters: Print, Set, Print variable.',
    target: ['print', 'set', 'printvar'],
    blocks: [
      { id: 'print', label: 'Print a message', kind: 'print' },
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'add', label: 'Add to variable', kind: 'add' }
    ]
  },
  {
    id: 'lg-16', title: 'Two prints and a set', xp: 25,
    brief: 'Print a message. Set <b>n</b> to 4. Print another message.',
    hint: 'Print, Set, Print.',
    target: ['print', 'set', 'print'],
    blocks: [
      { id: 'print', label: 'Print a message', kind: 'print' },
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'print', label: 'Print a message', kind: 'print' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' }
    ]
  },
  {
    id: 'lg-17', title: 'Repeat then set', xp: 25,
    brief: 'Repeat a message twice. Then set <b>done</b> to 1 and print it.',
    hint: 'Repeat first, then Set, then Print variable.',
    target: ['repeat', 'set', 'printvar'],
    blocks: [
      { id: 'repeat', label: 'Repeat N times', kind: 'repeat' },
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'foreach', label: 'For each item in list', kind: 'foreach' }
    ]
  },
  {
    id: 'lg-18', title: 'Set then repeat', xp: 25,
    brief: 'Set <b>gap</b> to 2 first, then repeat a message three times.',
    hint: 'The Set has to come before the Repeat.',
    target: ['set', 'repeat'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'repeat', label: 'Repeat N times', kind: 'repeat' },
      { id: 'print', label: 'Print a message', kind: 'print' }
    ]
  },
  {
    id: 'lg-19', title: 'Loop, then check', xp: 30,
    brief: 'Set <b>total</b> to 10. Loop over the list. Then check if <b>total</b> is over 3.',
    hint: 'Set, For each, If.',
    target: ['set', 'foreach', 'if'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'foreach', label: 'For each item in list', kind: 'foreach' },
      { id: 'if', label: 'If / else', kind: 'if' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' }
    ]
  },
  {
    id: 'lg-20', title: 'Check, then loop', xp: 30,
    brief: 'Check if <b>score</b> is over 5 first, then loop over the list.',
    hint: 'The If comes before the For each this time.',
    target: ['if', 'foreach'],
    blocks: [
      { id: 'if', label: 'If / else', kind: 'if' },
      { id: 'foreach', label: 'For each item in list', kind: 'foreach' },
      { id: 'set', label: 'Set variable', kind: 'set' }
    ]
  },
  {
    id: 'lg-21', title: 'Loop, then repeat', xp: 30,
    brief: 'Loop over the list. Then repeat a message twice.',
    hint: 'For each first, Repeat second.',
    target: ['foreach', 'repeat'],
    blocks: [
      { id: 'foreach', label: 'For each item in list', kind: 'foreach' },
      { id: 'repeat', label: 'Repeat N times', kind: 'repeat' },
      { id: 'if', label: 'If / else', kind: 'if' }
    ]
  },
  {
    id: 'lg-22', title: 'Repeat, then loop', xp: 30,
    brief: 'Repeat a message twice, then loop over the list.',
    hint: 'Same two blocks, opposite order.',
    target: ['repeat', 'foreach'],
    blocks: [
      { id: 'repeat', label: 'Repeat N times', kind: 'repeat' },
      { id: 'foreach', label: 'For each item in list', kind: 'foreach' },
      { id: 'set', label: 'Set variable', kind: 'set' }
    ]
  },
  {
    id: 'lg-23', title: 'Build a counter', xp: 30,
    brief: 'Set <b>n</b> to 0. Add 1. Add 1. Add 1. Print the variable.',
    hint: 'One Set, three Adds, one Print variable.',
    target: ['set', 'add', 'add', 'add', 'printvar'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'add', label: 'Add to variable', kind: 'add' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'print', label: 'Print a message', kind: 'print' }
    ]
  },
  {
    id: 'lg-24', title: 'Two adds, two checks', xp: 35,
    brief: 'Set <b>x</b> to 1. Add 4. Check if <b>x</b> is over 3. Check if <b>x</b> is over 10.',
    hint: 'Set, Add, If, If.',
    target: ['set', 'add', 'if', 'if'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'add', label: 'Add to variable', kind: 'add' },
      { id: 'if', label: 'If / else', kind: 'if' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' }
    ]
  },
  {
    id: 'lg-25', title: 'Print three times over', xp: 35,
    brief: 'Print a message three times. Then set <b>end</b> to 1 and print it.',
    hint: 'Repeat, Set, Print variable.',
    target: ['repeat', 'set', 'printvar'],
    blocks: [
      { id: 'repeat', label: 'Repeat N times', kind: 'repeat' },
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'if', label: 'If / else', kind: 'if' }
    ]
  },
  {
    id: 'lg-26', title: 'Two loops', xp: 35,
    brief: 'Loop over the list, then loop over the list again.',
    hint: 'The same block twice. For each, For each.',
    target: ['foreach', 'foreach'],
    blocks: [
      { id: 'foreach', label: 'For each item in list', kind: 'foreach' },
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'print', label: 'Print a message', kind: 'print' }
    ]
  },
  {
    id: 'lg-27', title: 'Two repeats', xp: 35,
    brief: 'Repeat a message twice. Then repeat a different message three times.',
    hint: 'Repeat, Repeat.',
    target: ['repeat', 'repeat'],
    blocks: [
      { id: 'repeat', label: 'Repeat N times', kind: 'repeat' },
      { id: 'foreach', label: 'For each item in list', kind: 'foreach' }
    ]
  },
  {
    id: 'lg-28', title: 'Set two variables, print both', xp: 35,
    brief: 'Set <b>x</b> to 1. Set <b>y</b> to 2. Print both variables.',
    hint: 'Set, Set, Print variable, Print variable.',
    target: ['set', 'set', 'printvar', 'printvar'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'if', label: 'If / else', kind: 'if' }
    ]
  },
  {
    id: 'lg-29', title: 'Mix a loop and a check', xp: 35,
    brief: 'Set <b>count</b> to 3. Loop over the list. Print the variable.',
    hint: 'Set, For each, Print variable.',
    target: ['set', 'foreach', 'printvar'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'foreach', label: 'For each item in list', kind: 'foreach' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'if', label: 'If / else', kind: 'if' }
    ]
  },
  {
    id: 'lg-30', title: 'Print, loop, print', xp: 35,
    brief: 'Print a message. Loop over the list. Print a closing message.',
    hint: 'Print, For each, Print.',
    target: ['print', 'foreach', 'print'],
    blocks: [
      { id: 'print', label: 'Print a message', kind: 'print' },
      { id: 'foreach', label: 'For each item in list', kind: 'foreach' },
      { id: 'repeat', label: 'Repeat N times', kind: 'repeat' }
    ]
  },
  {
    id: 'lg-31', title: 'Set, add, loop, print', xp: 40,
    brief: 'Set <b>total</b> to 0. Add 2. Loop over the list. Print the variable.',
    hint: 'Four blocks in that exact order.',
    target: ['set', 'add', 'foreach', 'printvar'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'add', label: 'Add to variable', kind: 'add' },
      { id: 'foreach', label: 'For each item in list', kind: 'foreach' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'if', label: 'If / else', kind: 'if' }
    ]
  },
  {
    id: 'lg-32', title: 'Long chain', xp: 40,
    brief: 'Set <b>n</b> to 5. Add 5. Add 5. Check if <b>n</b> is over 10. Print the variable.',
    hint: 'Set, Add, Add, If, Print variable.',
    target: ['set', 'add', 'add', 'if', 'printvar'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'add', label: 'Add to variable', kind: 'add' },
      { id: 'if', label: 'If / else', kind: 'if' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'print', label: 'Print a message', kind: 'print' }
    ]
  },
  {
    id: 'lg-33', title: 'Count down by adding', xp: 40,
    brief: 'Set <b>left</b> to 10. Add -2 four times. Print the variable.',
    hint: 'Negative adds walk the number down.',
    target: ['set', 'add', 'add', 'add', 'add', 'printvar'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'add', label: 'Add to variable', kind: 'add' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'if', label: 'If / else', kind: 'if' }
    ]
  },
  {
    id: 'lg-34', title: 'Two lists back to back', xp: 40,
    brief: 'Loop over the list, then loop over the list, then loop once more.',
    hint: 'The same block three times.',
    target: ['foreach', 'foreach', 'foreach'],
    blocks: [
      { id: 'foreach', label: 'For each item in list', kind: 'foreach' },
      { id: 'repeat', label: 'Repeat N times', kind: 'repeat' },
      { id: 'set', label: 'Set variable', kind: 'set' }
    ]
  },
  {
    id: 'lg-35', title: 'Check every step', xp: 40,
    brief: 'Set <b>x</b> to 2. Check if <b>x</b> is over 1. Add 1. Check again.',
    hint: 'Set, If, Add, If.',
    target: ['set', 'if', 'add', 'if'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'add', label: 'Add to variable', kind: 'add' },
      { id: 'if', label: 'If / else', kind: 'if' },
      { id: 'print', label: 'Print a message', kind: 'print' }
    ]
  },
  {
    id: 'lg-36', title: 'Print inside the flow', xp: 40,
    brief: 'Set <b>n</b> to 3. Print a message. Loop over the list. Check if <b>n</b> is over 1.',
    hint: 'Set, Print, For each, If.',
    target: ['set', 'print', 'foreach', 'if'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'print', label: 'Print a message', kind: 'print' },
      { id: 'foreach', label: 'For each item in list', kind: 'foreach' },
      { id: 'if', label: 'If / else', kind: 'if' },
      { id: 'add', label: 'Add to variable', kind: 'add' }
    ]
  },
  {
    id: 'lg-37', title: 'Accumulate with adds', xp: 40,
    brief: 'Set <b>sum</b> to 0. Add 10. Add 20. Add 30. Print the variable.',
    hint: 'One Set, three Adds, one Print variable.',
    target: ['set', 'add', 'add', 'add', 'printvar'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'add', label: 'Add to variable', kind: 'add' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'repeat', label: 'Repeat N times', kind: 'repeat' }
    ]
  },
  {
    id: 'lg-38', title: 'Alternate the blocks', xp: 40,
    brief: 'Set <b>a</b> to 1. Print it. Add 1 to it. Print it again.',
    hint: 'Set, Print variable, Add, Print variable.',
    target: ['set', 'printvar', 'add', 'printvar'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'add', label: 'Add to variable', kind: 'add' },
      { id: 'if', label: 'If / else', kind: 'if' }
    ]
  },
  {
    id: 'lg-39', title: 'Everything but the loop', xp: 40,
    brief: 'Set <b>x</b> to 1. Add 2. Check if <b>x</b> is over 2. Print the variable.',
    hint: 'Set, Add, If, Print variable.',
    target: ['set', 'add', 'if', 'printvar'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'add', label: 'Add to variable', kind: 'add' },
      { id: 'if', label: 'If / else', kind: 'if' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'repeat', label: 'Repeat N times', kind: 'repeat' }
    ]
  },
  {
    id: 'lg-40', title: 'Everything but the check', xp: 40,
    brief: 'Set <b>x</b> to 1. Add 2. Loop over the list. Print the variable.',
    hint: 'Set, Add, For each, Print variable.',
    target: ['set', 'add', 'foreach', 'printvar'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'add', label: 'Add to variable', kind: 'add' },
      { id: 'foreach', label: 'For each item in list', kind: 'foreach' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'print', label: 'Print a message', kind: 'print' }
    ]
  },
  {
    id: 'lg-41', title: 'Set up, tear down', xp: 45,
    brief: 'Set <b>x</b> to 5. Print the variable. Set <b>x</b> to 0. Print it again.',
    hint: 'The same variable can be set twice.',
    target: ['set', 'printvar', 'set', 'printvar'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'add', label: 'Add to variable', kind: 'add' }
    ]
  },
  {
    id: 'lg-42', title: 'Four checks', xp: 45,
    brief: 'Check if <b>x</b> is over 1, over 2, over 3, then over 4.',
    hint: 'The same block four times.',
    target: ['if', 'if', 'if', 'if'],
    blocks: [
      { id: 'if', label: 'If / else', kind: 'if' },
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'print', label: 'Print a message', kind: 'print' }
    ]
  },
  {
    id: 'lg-43', title: 'Loop, then three adds', xp: 45,
    brief: 'Loop over the list. Set <b>n</b> to 1. Add 1. Add 1. Print the variable.',
    hint: 'For each, Set, Add, Add, Print variable.',
    target: ['foreach', 'set', 'add', 'add', 'printvar'],
    blocks: [
      { id: 'foreach', label: 'For each item in list', kind: 'foreach' },
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'add', label: 'Add to variable', kind: 'add' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'if', label: 'If / else', kind: 'if' }
    ]
  },
  {
    id: 'lg-44', title: 'Repeat five times', xp: 45,
    brief: 'Repeat a message five times. Then print the variable.',
    hint: 'Repeat 5, then Print variable.',
    target: ['repeat', 'printvar'],
    blocks: [
      { id: 'repeat', label: 'Repeat N times', kind: 'repeat' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'if', label: 'If / else', kind: 'if' }
    ]
  },
  {
    id: 'lg-45', title: 'Check, add, check, add', xp: 45,
    brief: 'Set <b>n</b> to 0. Check if <b>n</b> is over -1. Add 5. Check if <b>n</b> is over 4.',
    hint: 'Set, If, Add, If.',
    target: ['set', 'if', 'add', 'if'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'add', label: 'Add to variable', kind: 'add' },
      { id: 'if', label: 'If / else', kind: 'if' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' }
    ]
  },
  {
    id: 'lg-46', title: 'Print both sides', xp: 45,
    brief: 'Set <b>x</b> to 2. Set <b>y</b> to 9. Print <b>x</b>, print <b>y</b>, print <b>x</b> again.',
    hint: 'Set, Set, Print variable three times.',
    target: ['set', 'set', 'printvar', 'printvar', 'printvar'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'repeat', label: 'Repeat N times', kind: 'repeat' }
    ]
  },
  {
    id: 'lg-47', title: 'Long arithmetic run', xp: 50,
    brief: 'Set <b>n</b> to 1. Add 1 five times. Then check if <b>n</b> is over 5.',
    hint: 'One Set, five Adds, one If.',
    target: ['set', 'add', 'add', 'add', 'add', 'add', 'if'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'add', label: 'Add to variable', kind: 'add' },
      { id: 'if', label: 'If / else', kind: 'if' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' }
    ]
  },
  {
    id: 'lg-48', title: 'The whole toolbox', xp: 50,
    brief: 'Set <b>n</b> to 2. Add 3. Loop over the list. Check if <b>n</b> is over 4. Print the variable.',
    hint: 'Every kind of block, in this order: Set, Add, For each, If, Print variable.',
    target: ['set', 'add', 'foreach', 'if', 'printvar'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'add', label: 'Add to variable', kind: 'add' },
      { id: 'foreach', label: 'For each item in list', kind: 'foreach' },
      { id: 'if', label: 'If / else', kind: 'if' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'print', label: 'Print a message', kind: 'print' }
    ]
  },
  {
    id: 'lg-49', title: 'Print, repeat, loop', xp: 50,
    brief: 'Print a message. Repeat a message twice. Loop over the list.',
    hint: 'Print, Repeat, For each.',
    target: ['print', 'repeat', 'foreach'],
    blocks: [
      { id: 'print', label: 'Print a message', kind: 'print' },
      { id: 'repeat', label: 'Repeat N times', kind: 'repeat' },
      { id: 'foreach', label: 'For each item in list', kind: 'foreach' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' }
    ]
  },
  {
    id: 'lg-50', title: 'Final program', xp: 60,
    brief: 'Set <b>total</b> to 0. Add 4. Add 6. Loop over the list. Check if <b>total</b> is over 5. Print the variable.',
    hint: 'Six blocks: Set, Add, Add, For each, If, Print variable.',
    target: ['set', 'add', 'add', 'foreach', 'if', 'printvar'],
    blocks: [
      { id: 'set', label: 'Set variable', kind: 'set' },
      { id: 'add', label: 'Add to variable', kind: 'add' },
      { id: 'foreach', label: 'For each item in list', kind: 'foreach' },
      { id: 'if', label: 'If / else', kind: 'if' },
      { id: 'printvar', label: 'Print variable', kind: 'printvar' },
      { id: 'print', label: 'Print a message', kind: 'print' }
    ]
  }
];

/* Appended here rather than in levels.js: this file loads AFTER levels.js,
   so TRACKS already exists and LOGIC_PART2 is defined. */
if (typeof TRACKS !== 'undefined' && Array.isArray(LOGIC_PART2)) {
  TRACKS.logic.levels = TRACKS.logic.levels.concat(LOGIC_PART2);
}