/* ============================================================
   HTML & CSS TRACK, part 2: web-14 through web-50

   Same shape as the first thirteen levels in levels.js: a starter
   snippet, and checks that run against a real DOM.

   Loaded after levels.js and appended to TRACKS.web.
   ============================================================ */
var WEB_PART2 = [
  {
    id: 'web-14', title: 'An ordered list', xp: 20,
    teaches: '<ol> numbers its items automatically. Use it when order matters.',
    brief: 'Make an ordered list with three items: <code>First</code>, <code>Second</code>, <code>Third</code>.',
    starter: '',
    hint: '<ol><li>First</li><li>Second</li><li>Third</li></ol>',
    checks: [
      { name: 'there is an ol', code: 'return !!doc.querySelector("ol");', fail: 'Use <ol>' },
      { name: 'it has three items', code: 'return doc.querySelectorAll("ol li").length === 3;', fail: 'Three <li> inside the <ol>.' },
      { name: 'order is right', code: 'var i=doc.querySelectorAll("ol li"); return i[0].textContent.trim()==="First" && i[2].textContent.trim()==="Third";', fail: 'First, Second, Third in that order.' }
    ]
  },
  {
    id: 'web-15', title: 'A nested list', xp: 25,
    teaches: 'A list can sit inside a list item. That is how you show sub-items.',
    brief: 'Make a list with <code>Tea</code> and <code>Coffee</code>, and put a nested list inside <code>Tea</code> holding <code>Green</code> and <code>Black</code>.',
    starter: '',
    hint: '<ul><li>Tea<ul><li>Green</li><li>Black</li></ul></li><li>Coffee</li></ul>',
    checks: [
      { name: 'there is an outer list', code: 'return !!doc.querySelector("ul");', fail: 'Use <ul>' },
      { name: 'there is a nested list', code: 'return !!doc.querySelector("ul ul");', fail: 'Put a <ul> inside the first <li>.' },
      { name: 'nested has two items', code: 'return doc.querySelectorAll("ul ul li").length === 2;', fail: 'Green and Black.' },
      { name: 'outer still has two', code: 'var outer=doc.querySelector("ul"); return outer.children.length === 2;', fail: 'Tea and Coffee at the top level.' }
    ]
  },
  {
    id: 'web-16', title: 'An id and a class', xp: 25,
    teaches: 'An id must be unique and is used by JavaScript. A class can be reused.',
    brief: 'Make a <code>div</code> with id <code>hero</code> and class <code>panel</code>.',
    starter: '',
    hint: '<div id="hero" class="panel">Hi</div>',
    checks: [
      { name: 'there is a div', code: 'return !!doc.querySelector("div");', fail: 'Use <div>' },
      { name: 'the id is hero', code: 'var d=doc.querySelector("div"); return d && d.id === "hero";', fail: 'id="hero"' },
      { name: 'the class is panel', code: 'var d=doc.querySelector("div"); return d && d.classList.contains("panel");', fail: 'class="panel"' }
    ]
  },
  {
    id: 'web-17', title: 'Reuse a class', xp: 25,
    teaches: 'One class can be on many elements. That is the point of classes.',
    brief: 'Make three <code>span</code> elements, all with class <code>tag</code>.',
    starter: '',
    hint: '<span class="tag">a</span><span class="tag">b</span><span class="tag">c</span>',
    checks: [
      { name: 'there are three spans', code: 'return doc.querySelectorAll("span").length === 3;', fail: 'Three <span> elements.' },
      { name: 'all three have the class', code: 'return doc.querySelectorAll(".tag").length === 3;', fail: 'class="tag" on each one.' }
    ]
  },
  {
    id: 'web-18', title: 'Font size', xp: 25,
    teaches: 'font-size accepts px, rem and %. rem is relative to the root font, so it respects user settings.',
    brief: 'Give the <code>h1</code> a font size of <code>40px</code>.',
    starter: '<h1>Big</h1>\n\n<style>\nh1 {\n  font-size: ;\n}\n</style>',
    hint: 'font-size: 40px;',
    checks: [
      { name: 'there is an h1', code: 'return !!doc.querySelector("h1");', fail: 'Use <h1>' },
      { name: 'font size is 40px', code: 'var h=doc.querySelector("h1"); return h && getComputedStyle(h).fontSize === "40px";', fail: 'font-size: 40px;' }
    ]
  },
  {
    id: 'web-19', title: 'Text alignment', xp: 25,
    teaches: 'text-align lines text up inside its element. It does not move the element itself.',
    brief: 'Centre the text in the <code>p</code>.',
    starter: '<p>Centred</p>\n\n<style>\np {\n  text-align: ;\n}\n</style>',
    hint: 'text-align: center;',
    checks: [
      { name: 'there is a p', code: 'return !!doc.querySelector("p");', fail: 'Use <p>' },
      { name: 'it is centred', code: 'var p=doc.querySelector("p"); return p && getComputedStyle(p).textAlign === "center";', fail: 'text-align: center;' }
    ]
  },
  {
    id: 'web-20', title: 'A background colour', xp: 25,
    teaches: 'background-color fills behind the content. Hex and named colours both work.',
    brief: 'Give the <code>div</code> a background of <code>#eeeeee</code>.',
    starter: '<div>Box</div>\n\n<style>\ndiv {\n  background-color: ;\n}\n</style>',
    hint: 'background-color: #eeeeee;',
    checks: [
      { name: 'there is a div', code: 'return !!doc.querySelector("div");', fail: 'Use <div>' },
      { name: 'the background is set', code: 'var d=doc.querySelector("div"); if(!d) return false; var bg=getComputedStyle(d).backgroundColor; return bg==="rgb(238, 238, 238)" || bg==="#eeeeee";', fail: 'background-color: #eeeeee;' }
    ]
  },
  {
    id: 'web-21', title: 'A border', xp: 30,
    teaches: 'border is shorthand for width, style and colour, and needs all three.',
    brief: 'Give the <code>div</code> a <code>2px</code> solid red border.',
    starter: '<div>Box</div>\n\n<style>\ndiv {\n  border: ;\n}\n</style>',
    hint: 'border: 2px solid red;',
    checks: [
      { name: 'there is a div', code: 'return !!doc.querySelector("div");', fail: 'Use <div>' },
      { name: 'the border is 2px', code: 'var d=doc.querySelector("div"); return d && getComputedStyle(d).borderTopWidth === "2px";', fail: 'border: 2px solid red;' },
      { name: 'the border is solid', code: 'var d=doc.querySelector("div"); return d && getComputedStyle(d).borderTopStyle === "solid";', fail: 'Include solid in the shorthand.' },
      { name: 'it is red', code: 'var d=doc.querySelector("div"); return d && getComputedStyle(d).borderTopColor === "rgb(255, 0, 0)";', fail: 'border: 2px solid red;' }
    ]
  },
  {
    id: 'web-22', title: 'Rounded corners', xp: 30,
    teaches: 'border-radius accepts one value for all corners, or four for each corner.',
    brief: 'Give the <code>div</code> a <code>8px</code> border radius.',
    starter: '<div>Rounded</div>\n\n<style>\ndiv {\n  border-radius: ;\n}\n</style>',
    hint: 'border-radius: 8px;',
    checks: [
      { name: 'there is a div', code: 'return !!doc.querySelector("div");', fail: 'Use <div>' },
      /* jsdom does not expand border-radius into a computed px value, so read the
         declaration from the stylesheet instead. A real browser agrees. */
      { name: 'the radius is 8px', code: 'var ok=false; var s=doc.querySelectorAll("style"); for(var i=0;i<s.length;i++){ var t=s[i].textContent.replace(/\\s/g,""); if(t.indexOf("border-radius:8px")!==-1) ok=true; } return ok;', fail: 'border-radius: 8px;' }
    ]
  },
  {
    id: 'web-23', title: 'Box sizing', xp: 30,
    teaches: 'By default padding is added on top of a width. border-box includes it, so layouts stay predictable.',
    brief: 'Set the <code>div</code> to <code>border-box</code> sizing with a width of <code>200px</code>.',
    starter: '<div>Sized</div>\n\n<style>\ndiv {\n  box-sizing: ;\n  width: ;\n}\n</style>',
    hint: 'box-sizing: border-box; width: 200px;',
    checks: [
      { name: 'there is a div', code: 'return !!doc.querySelector("div");', fail: 'Use <div>' },
      { name: 'box-sizing is border-box', code: 'var d=doc.querySelector("div"); return d && getComputedStyle(d).boxSizing === "border-box";', fail: 'box-sizing: border-box;' },
      { name: 'width is 200px', code: 'var d=doc.querySelector("div"); return d && getComputedStyle(d).width === "200px";', fail: 'width: 200px;' }
    ]
  },
  {
    id: 'web-24', title: 'A column grid', xp: 35,
    teaches: 'display:grid with grid-template-columns splits the space into tracks.',
    brief: 'Make a <code>div</code> with class <code>grid</code> that lays out in three equal columns.',
    starter: '<div class="grid"><b>a</b><b>b</b><b>c</b></div>\n\n<style>\n.grid {\n  display: ;\n  grid-template-columns: ;\n}\n</style>',
    hint: 'display: grid; grid-template-columns: repeat(3, 1fr);',
    checks: [
      { name: 'there is a .grid', code: 'return !!doc.querySelector(".grid");', fail: 'Use <div class="grid">' },
      { name: 'it is display grid', code: 'var g=doc.querySelector(".grid"); return g && getComputedStyle(g).display === "grid";', fail: 'display: grid;' },
      /* The computed value may read "repeat(3, 1fr)" or three resolved tracks,
         depending on the engine, so count columns from the declaration. */
      { name: 'three columns are defined', code: 'var ok=false; var s=doc.querySelectorAll("style"); for(var i=0;i<s.length;i++){ var t=s[i].textContent.replace(/\\s/g,""); if(t.indexOf("grid-template-columns:repeat(3,")!==-1) ok=true; } return ok;', fail: 'grid-template-columns: repeat(3, 1fr);' }
    ]
  },
  {
    id: 'web-25', title: 'Flex direction', xp: 35,
    teaches: 'flex-direction decides whether children run in a row or a column. row is the default.',
    brief: 'Make a <code>div</code> with class <code>stack</code> whose children go top to bottom.',
    starter: '<div class="stack"><b>a</b><b>b</b></div>\n\n<style>\n.stack {\n  display: flex;\n  flex-direction: ;\n}\n</style>',
    hint: 'flex-direction: column;',
    checks: [
      { name: 'there is a .stack', code: 'return !!doc.querySelector(".stack");', fail: 'Use <div class="stack">' },
      { name: 'it is flex', code: 'var s=doc.querySelector(".stack"); return s && getComputedStyle(s).display === "flex";', fail: 'display: flex;' },
      { name: 'direction is column', code: 'var s=doc.querySelector(".stack"); return s && getComputedStyle(s).flexDirection === "column";', fail: 'flex-direction: column;' }
    ]
  },
  {
    id: 'web-26', title: 'Space between items', xp: 35,
    teaches: 'justify-content lines up children along the main axis. space-between pushes them apart.',
    brief: 'Lay the children of <code>.row</code> out with equal space between them, left and right edges pinned.',
    starter: '<div class="row"><b>a</b><b>b</b><b>c</b></div>\n\n<style>\n.row {\n  display: flex;\n  justify-content: ;\n}\n</style>',
    hint: 'justify-content: space-between;',
    checks: [
      { name: 'there is a .row', code: 'return !!doc.querySelector(".row");', fail: 'Use <div class="row">' },
      { name: 'it is flex', code: 'var r=doc.querySelector(".row"); return r && getComputedStyle(r).display === "flex";', fail: 'display: flex;' },
      { name: 'justify is space-between', code: 'var r=doc.querySelector(".row"); return r && getComputedStyle(r).justifyContent === "space-between";', fail: 'justify-content: space-between;' }
    ]
  },
  {
    id: 'web-27', title: 'Centre with flex', xp: 35,
    teaches: 'Centring on both axes needs justify-content and align-items together.',
    brief: 'Centre the children of <code>.center</code> horizontally and vertically.',
    starter: '<div class="center"><b>hi</b></div>\n\n<style>\n.center {\n  display: flex;\n  justify-content: ;\n  align-items: ;\n}\n</style>',
    hint: 'justify-content: center; align-items: center;',
    checks: [
      { name: 'there is a .center', code: 'return !!doc.querySelector(".center");', fail: 'Use <div class="center">' },
      { name: 'it is flex', code: 'var c=doc.querySelector(".center"); return c && getComputedStyle(c).display === "flex";', fail: 'display: flex;' },
      { name: 'justify is center', code: 'var c=doc.querySelector(".center"); return c && getComputedStyle(c).justifyContent === "center";', fail: 'justify-content: center;' },
      { name: 'align is center', code: 'var c=doc.querySelector(".center"); return c && getComputedStyle(c).alignItems === "center";', fail: 'align-items: center;' }
    ]
  },
  {
    id: 'web-28', title: 'A relative position', xp: 35,
    teaches: 'position:relative moves an element from where it would sit, without taking it out of flow.',
    brief: 'Nudge the <code>div</code> up by <code>10px</code> using a relative position.',
    starter: '<div>Moved</div>\n\n<style>\ndiv {\n  position: relative;\n  top: ;\n}\n</style>',
    hint: 'top: -10px;',
    checks: [
      { name: 'there is a div', code: 'return !!doc.querySelector("div");', fail: 'Use <div>' },
      { name: 'position is relative', code: 'var d=doc.querySelector("div"); return d && getComputedStyle(d).position === "relative";', fail: 'position: relative;' },
      { name: 'top is -10px', code: 'var d=doc.querySelector("div"); return d && getComputedStyle(d).top === "-10px";', fail: 'top: -10px;' }
    ]
  },
  {
    id: 'web-29', title: 'An absolute badge', xp: 40,
    teaches: 'position:absolute positions against the nearest positioned ancestor, so the parent needs position too.',
    brief: 'Put the <code>span</code> inside <code>div.badge</code>. The div is positioned, and the span sits absolutely in its top right corner.',
    starter: '<div class="badge"><span>9</span></div>\n\n<style>\n.badge {\n  position: relative;\n}\nspan {\n  position: ;\n  top: 0;\n  right: 0;\n}\n</style>',
    hint: 'position: absolute;',
    checks: [
      { name: 'the span is inside the div', code: 'var s=doc.querySelector(".badge span"); return !!s;', fail: 'Put <span> inside <div class="badge">.' },
      { name: 'the div is relative', code: 'var d=doc.querySelector(".badge"); return d && getComputedStyle(d).position === "relative";', fail: 'position: relative;' },
      { name: 'the span is absolute', code: 'var s=doc.querySelector(".badge span"); return s && getComputedStyle(s).position === "absolute";', fail: 'position: absolute;' }
    ]
  },
  {
    id: 'web-30', title: 'A hover state', xp: 40,
    teaches: 'A pseudo-class reacts to a state. :hover is the one you will use most.',
    brief: 'Make the link turn blue when the pointer is over it.',
    starter: '<a href="#">Hover me</a>\n\n<style>\na {\n  color: black;\n}\n\n</style>',
    hint: 'a:hover { color: blue; }',
    checks: [
      { name: 'there is a link', code: 'return !!doc.querySelector("a");', fail: 'Use <a>' },
      { name: 'there is a hover rule', code: 'var ok=false; var sheets=doc.querySelectorAll("style"); for(var i=0;i<sheets.length;i++){ if(sheets[i].textContent.indexOf(":hover")!==-1) ok=true; } return ok;', fail: 'Add an a:hover rule.' },
      { name: 'hover changes the colour', code: 'var ok=false; var sheets=doc.querySelectorAll("style"); for(var i=0;i<sheets.length;i++){ if(/:hover[^{]*\{[^}]*color\s*:/.test(sheets[i].textContent)) ok=true; } return ok;', fail: 'a:hover { color: blue; }' }
    ]
  },
  {
    id: 'web-31', title: 'Remove the link underline', xp: 35,
    teaches: 'text-decoration: none removes the underline browsers put on links.',
    brief: 'Remove the underline from the link and make it blue.',
    starter: '<a href="#">Link</a>\n\n<style>\na {\n  color: ;\n  text-decoration: ;\n}\n</style>',
    hint: 'color: blue; text-decoration: none;',
    checks: [
      { name: 'there is a link', code: 'return !!doc.querySelector("a");', fail: 'Use <a>' },
      /* A link keeps the browser default colour unless a rule wins on specificity,
         so confirm the rule itself is present. */
      { name: 'it is blue', code: 'var ok=false; var s=doc.querySelectorAll("style"); for(var i=0;i<s.length;i++){ var t=s[i].textContent.replace(/\\s/g,""); if(t.indexOf("color:blue")!==-1) ok=true; } return ok;', fail: 'color: blue;' },
      { name: 'no underline', code: 'var a=doc.querySelector("a"); return a && getComputedStyle(a).textDecorationLine === "none";', fail: 'text-decoration: none;' }
    ]
  },
  {
    id: 'web-32', title: 'Style only the first item', xp: 40,
    teaches: ':first-child targets the first child of its parent. :nth-child(n) targets any position.',
    brief: 'Make the first <code>li</code> in the list bold, and leave the others alone.',
    starter: '<ul>\n  <li>One</li>\n  <li>Two</li>\n</ul>\n\n<style>\n\n</style>',
    hint: 'li:first-child { font-weight: bold; }',
    checks: [
      { name: 'there are two items', code: 'return doc.querySelectorAll("li").length === 2;', fail: 'Two <li> elements.' },
      { name: 'the first is bold', code: 'var i=doc.querySelectorAll("li"); return getComputedStyle(i[0]).fontWeight === "bold" || getComputedStyle(i[0]).fontWeight === "700";', fail: 'li:first-child { font-weight: bold; }' },
      { name: 'the second is not bold', code: 'var i=doc.querySelectorAll("li"); var w=getComputedStyle(i[1]).fontWeight; return w!=="bold" && w!=="700";', fail: 'Target only the first child.' }
    ]
  },
  {
    id: 'web-33', title: 'Select by attribute', xp: 40,
    teaches: 'An attribute selector looks at an attribute, not the element name. [disabled] finds disabled inputs.',
    brief: 'Make the disabled input look faded with <code>opacity</code> of <code>0.4</code>, using an attribute selector.',
    starter: '<input disabled>\n<input>\n\n<style>\n\n</style>',
    hint: 'input[disabled] { opacity: 0.4; }',
    checks: [
      { name: 'there are two inputs', code: 'return doc.querySelectorAll("input").length === 2;', fail: 'Two <input> elements.' },
      { name: 'the disabled one is faded', code: 'var i=doc.querySelectorAll("input"); return Math.abs(parseFloat(getComputedStyle(i[0]).opacity) - 0.4) < 0.01;', fail: 'input[disabled] { opacity: 0.4; }' },
      { name: 'the other one is not', code: 'var i=doc.querySelectorAll("input"); var o=parseFloat(getComputedStyle(i[1]).opacity); return isNaN(o) || Math.abs(o-1) < 0.01;', fail: 'Only target input[disabled].' }
    ]
  },
  {
    id: 'web-34', title: 'A row of equal cards', xp: 40,
    teaches: 'flex:1 makes each child share the leftover space evenly, so the row stays even as content changes.',
    brief: 'Make the three <code>div.card</code> elements share the row equally.',
    starter: '<div class="bar">\n  <div class="card">a</div>\n  <div class="card">b</div>\n  <div class="card">c</div>\n</div>\n\n<style>\n.bar {\n  display: flex;\n}\n\n</style>',
    hint: '.card { flex: 1; }',
    checks: [
      { name: 'the bar is flex', code: 'var b=doc.querySelector(".bar"); return b && getComputedStyle(b).display === "flex";', fail: 'display: flex;' },
      { name: 'cards share space', code: 'var c=doc.querySelector(".card"); return c && (getComputedStyle(c).flexGrow === "1" || getComputedStyle(c).flex === "1 1 0%" || getComputedStyle(c).flex === "1 1 0px");', fail: '.card { flex: 1; }' }
    ]
  },
  {
    id: 'web-35', title: 'A responsive switch', xp: 45,
    teaches: 'A media query applies CSS only when the viewport matches the condition.',
    brief: 'Apply <code>display:block</code> to <code>.responsive</code> only when the screen is <code>600px</code> wide or narrower.',
    starter: '<div class="responsive">x</div>\n\n<style>\n.responsive {\n  display: none;\n}\n\n</style>',
    hint: '@media (max-width: 600px) { .responsive { display: block; } }',
    checks: [
      { name: 'there is a .responsive', code: 'return !!doc.querySelector(".responsive");', fail: 'Use <div class="responsive">' },
      { name: 'there is a media query', code: 'var ok=false; var s=doc.querySelectorAll("style"); for(var i=0;i<s.length;i++){ if(s[i].textContent.indexOf("@media")!==-1) ok=true; } return ok;', fail: 'Wrap the rule in @media.' },
      { name: 'it targets max-width 600px', code: 'var ok=false; var s=doc.querySelectorAll("style"); for(var i=0;i<s.length;i++){ var t=s[i].textContent.replace(/\\s/g,""); if(t.indexOf("@media")!==-1 && t.indexOf("max-width:600px")!==-1) ok=true; } return ok;', fail: '@media (max-width: 600px) { ... }' }
    ]
  },
  {
    id: 'web-36', title: 'Specificity beats order', xp: 45,
    teaches: 'When two rules disagree, the more specific selector wins no matter which came later.',
    brief: 'Make the <code>p</code> green. There is a <code>div p</code> rule trying to set it red. A selector on the paragraph itself is more specific, so use it.',
    starter: '<div>\n  <p>Text</p>\n</div>\n\n<style>\ndiv p {\n  color: red;\n}\n\n</style>',
    hint: 'p { color: green; } will not win. Use #lead { color: green; }',
    checks: [
      { name: 'there is a p', code: 'return !!doc.querySelector("p");', fail: 'Use <p>' },
      { name: 'the p is green', code: 'var p=doc.querySelector("p"); return p && getComputedStyle(p).color === "rgb(0, 128, 0)";', fail: 'Use a more specific selector such as an id, and give the p id="lead".' }
    ]
  },
  {
    id: 'web-37', title: 'An image with alt text', xp: 35,
    teaches: 'alt describes the image for screen readers and shows when the image fails to load.',
    brief: 'Add an image of <code>logo.png</code> with alt text <code>Company logo</code>.',
    starter: '<img src="logo.png">',
    hint: '<img src="logo.png" alt="Company logo">',
    checks: [
      { name: 'there is an image', code: 'return !!doc.querySelector("img");', fail: 'Use <img>' },
      { name: 'the src is right', code: 'var i=doc.querySelector("img"); return i && i.getAttribute("src") === "logo.png";', fail: 'src="logo.png"' },
      { name: 'there is alt text', code: 'var i=doc.querySelector("img"); return i && i.getAttribute("alt") === "Company logo";', fail: 'alt="Company logo"' }
    ]
  },
  {
    id: 'web-38', title: 'A labelled checkbox', xp: 40,
    teaches: 'A label wrapped around its input makes the whole thing clickable, not just the small box.',
    brief: 'Make a checkbox with a label reading <code>Agree</code>, and tie the label to the input with <code>for</code>.',
    starter: '<input type="checkbox" id="agree">\n\n',
    hint: '<label for="agree">Agree</label>',
    checks: [
      { name: 'there is a checkbox', code: 'var c=doc.querySelector("input[type=checkbox]"); return !!c;', fail: 'Use <input type="checkbox">' },
      { name: 'there is a label', code: 'return !!doc.querySelector("label");', fail: 'Add a <label>' },
      { name: 'the label text is Agree', code: 'var l=doc.querySelector("label"); return l && l.textContent.trim() === "Agree";', fail: 'Label should read Agree.' },
      { name: 'the label points at the input', code: 'var c=doc.querySelector("input[type=checkbox]"), l=doc.querySelector("label"); return c && l && l.getAttribute("for") === c.id;', fail: 'Match for="..." to the input id.' }
    ]
  },
  {
    id: 'web-39', title: 'A dropdown', xp: 40,
    teaches: 'select holds options. The option with selected is the one shown first.',
    brief: 'Make a <code>select</code> with id <code>city</code> and three options: <code>Karachi</code>, <code>Lahore</code>, <code>Islamabad</code>.',
    starter: '<select id="city">\n\n</select>',
    hint: '<select id="city"><option>Karachi</option><option>Lahore</option><option>Islamabad</option></select>',
    checks: [
      { name: 'there is a select', code: 'return !!doc.querySelector("select");', fail: 'Use <select>' },
      { name: 'there are three options', code: 'return doc.querySelectorAll("option").length === 3;', fail: 'Three <option> elements.' },
      { name: 'the options are right', code: 'var o=doc.querySelectorAll("option"); return o[0].textContent.trim()==="Karachi" && o[1].textContent.trim()==="Lahore" && o[2].textContent.trim()==="Islamabad";', fail: 'Karachi, Lahore, Islamabad.' }
    ]
  },
  {
    id: 'web-40', title: 'A textarea', xp: 35,
    teaches: 'textarea holds multi-line text. Its content sits between the tags, not in a value attribute.',
    brief: 'Add a <code>textarea</code> with id <code>notes</code> containing <code>Hello</code>.',
    starter: '',
    hint: '<textarea id="notes">Hello</textarea>',
    checks: [
      { name: 'there is a textarea', code: 'return !!doc.querySelector("textarea");', fail: 'Use <textarea>' },
      { name: 'the id is notes', code: 'var t=doc.querySelector("textarea"); return t && t.id === "notes";', fail: 'id="notes"' },
      { name: 'it contains Hello', code: 'var t=doc.querySelector("textarea"); return t && t.value.trim() === "Hello";', fail: 'Put Hello between the tags.' }
    ]
  },
  {
    id: 'web-41', title: 'Navigation', xp: 40,
    teaches: 'nav marks a block of links. Wrapping links in a list keeps them lined up.',
    brief: 'Wrap a list of three links in a <code>nav</code>: <code>Home</code>, <code>Work</code>, <code>About</code>.',
    starter: '<a href="#">Home</a>\n<a href="#">Work</a>\n<a href="#">About</a>\n\n',
    hint: '<nav><ul><li><a href="#">Home</a></li>...</ul></nav>',
    checks: [
      { name: 'there is a nav', code: 'return !!doc.querySelector("nav");', fail: 'Use <nav>' },
      { name: 'there are three links', code: 'return doc.querySelectorAll("nav a").length === 3;', fail: 'Home, Work, About.' },
      { name: 'they sit in a list', code: 'return doc.querySelectorAll("nav li").length === 3;', fail: 'Wrap each link in an <li>.' },
      { name: 'the links are inside the nav', code: 'var a=doc.querySelectorAll("a"); for(var i=0;i<a.length;i++){ if(!doc.querySelector("nav").contains(a[i])) return false; } return true;', fail: 'Every link must live inside the nav.' }
    ]
  },
  {
    id: 'web-42', title: 'An article and figure', xp: 40,
    teaches: 'article holds a self-contained piece of content. figure wraps media with a caption.',
    brief: 'Make an <code>article</code> containing an <code>h2</code> and a <code>figure</code> with an <code>img</code> and a <code>figcaption</code>.',
    starter: '',
    hint: '<article><h2>Title</h2><figure><img src="a.png" alt="a"><figcaption>Caption</figcaption></figure></article>',
    checks: [
      { name: 'there is an article', code: 'return !!doc.querySelector("article");', fail: 'Use <article>' },
      { name: 'the h2 is inside it', code: 'return !!doc.querySelector("article h2");', fail: 'Put the <h2> inside the article.' },
      { name: 'there is a figure', code: 'return !!doc.querySelector("article figure");', fail: 'Use <figure>' },
      { name: 'the figure has an image', code: 'return !!doc.querySelector("figure img");', fail: 'Put an <img> in the figure.' },
      { name: 'and a caption', code: 'return !!doc.querySelector("figure figcaption");', fail: 'Add a <figcaption>.' }
    ]
  },
  {
    id: 'web-43', title: 'Line height and letter spacing', xp: 40,
    teaches: 'line-height sets the space between lines of text. A unitless value scales with the font size.',
    brief: 'Give the <code>p</code> a line height of <code>1.6</code>.',
    starter: '<p>Body text</p>\n\n<style>\np {\n  line-height: ;\n}\n</style>',
    hint: 'line-height: 1.6;',
    checks: [
      { name: 'there is a p', code: 'return !!doc.querySelector("p");', fail: 'Use <p>' },
      /* A unitless line-height is reported as-is by some engines and as px by
         others, so accept either. */
      { name: 'line height is set', code: 'var p=doc.querySelector("p"); if(!p) return false; var cs=getComputedStyle(p); var lh=parseFloat(cs.lineHeight); var fs=parseFloat(cs.fontSize); if(isNaN(lh)) return false; return Math.abs(lh - 1.6) < 0.05 || Math.abs(lh - 1.6*fs) < 0.6;', fail: 'line-height: 1.6;' }
    ]
  },
  {
    id: 'web-44', title: 'A max width', xp: 35,
    teaches: 'max-width caps how wide text grows so long lines stay readable.',
    brief: 'Stop the <code>div</code> growing past <code>600px</code>.',
    starter: '<div>Long text</div>\n\n<style>\ndiv {\n  max-width: ;\n}\n</style>',
    hint: 'max-width: 600px;',
    checks: [
      { name: 'there is a div', code: 'return !!doc.querySelector("div");', fail: 'Use <div>' },
      { name: 'max width is 600px', code: 'var d=doc.querySelector("div"); return d && getComputedStyle(d).maxWidth === "600px";', fail: 'max-width: 600px;' }
    ]
  },
  {
    id: 'web-45', title: 'A hover card', xp: 45,
    teaches: 'Position a child so it only appears when the parent is hovered, using opacity and absolute positioning.',
    brief: 'Add a <code>span.tip</code> inside <code>div.box</code>. It sits absolutely and is invisible until <code>.box:hover</code>.',
    starter: '<div class="box">Hover<span class="tip">Tip!</span></div>\n\n<style>\n.box {\n  position: relative;\n}\n.tip {\n  position: absolute;\n  opacity: ;\n}\n</style>',
    hint: 'opacity: 0;  then  .box:hover .tip { opacity: 1; }',
    checks: [
      { name: 'the tip is inside the box', code: 'return !!doc.querySelector(".box .tip");', fail: 'Put <span class="tip"> inside the div.' },
      { name: 'the box is positioned', code: 'var b=doc.querySelector(".box"); return b && getComputedStyle(b).position === "relative";', fail: 'position: relative;' },
      { name: 'the tip is absolute', code: 'var t=doc.querySelector(".tip"); return t && getComputedStyle(t).position === "absolute";', fail: 'position: absolute;' },
      { name: 'it starts hidden', code: 'var t=doc.querySelector(".tip"); var o=parseFloat(getComputedStyle(t).opacity); return !isNaN(o) && o < 0.05;', fail: 'opacity: 0;' }
    ]
  },
  {
    id: 'web-46', title: 'An accessible button', xp: 40,
    teaches: 'A button has built-in keyboard and screen reader behaviour. A clickable div does not.',
    brief: 'Add a real <code>button</code> with text <code>Save</code> and a <code>type</code> of <code>button</code>.',
    starter: '',
    hint: '<button type="button">Save</button>',
    checks: [
      { name: 'there is a button', code: 'return !!doc.querySelector("button");', fail: 'Use <button>' },
      { name: 'it says Save', code: 'var b=doc.querySelector("button"); return b && b.textContent.trim() === "Save";', fail: 'Button text should be Save.' },
      { name: 'the type is button', code: 'var b=doc.querySelector("button"); return b && b.getAttribute("type") === "button";', fail: 'type="button"' }
    ]
  },
  {
    id: 'web-47', title: 'Z-index stacking', xp: 45,
    teaches: 'z-index only applies to positioned elements, and a higher value paints on top.',
    brief: 'Make the <code>span</code> overlap the <code>div</code> and sit on top, using <code>z-index</code> of <code>10</code>.',
    starter: '<div class="base">base</div>\n<span class="over">over</span>\n\n<style>\n.over {\n  position: relative;\n  z-index: ;\n}\n</style>',
    hint: 'z-index: 10;',
    checks: [
      { name: 'there is an .over span', code: 'return !!doc.querySelector("span.over");', fail: 'Use <span class="over">' },
      { name: 'it is positioned', code: 'var s=doc.querySelector("span.over"); return s && getComputedStyle(s).position === "relative";', fail: 'z-index needs position: relative;' },
      { name: 'z-index is 10', code: 'var s=doc.querySelector("span.over"); return s && getComputedStyle(s).zIndex === "10";', fail: 'z-index: 10;' }
    ]
  },
  {
    id: 'web-48', title: 'A card grid', xp: 45,
    teaches: 'grid-template-columns plus gap lays out cards without needing widths or margins.',
    brief: 'Lay the six <code>div.card</code> elements out two per row with a <code>10px</code> gap.',
    starter: '<div class="wrap">\n  <div class="card">1</div><div class="card">2</div>\n  <div class="card">3</div><div class="card">4</div>\n  <div class="card">5</div><div class="card">6</div>\n</div>\n\n<style>\n.wrap {\n  display: ;\n  grid-template-columns: ;\n  gap: 10px;\n}\n</style>',
    hint: 'display: grid; grid-template-columns: repeat(2, 1fr);',
    checks: [
      { name: 'there are six cards', code: 'return doc.querySelectorAll(".card").length === 6;', fail: 'Six div.card elements.' },
      { name: 'the wrap is grid', code: 'var w=doc.querySelector(".wrap"); return w && getComputedStyle(w).display === "grid";', fail: 'display: grid;' },
      { name: 'two columns', code: 'var ok=false; var s=doc.querySelectorAll("style"); for(var i=0;i<s.length;i++){ var t=s[i].textContent.replace(/\\s/g,""); if(t.indexOf("grid-template-columns:repeat(2,")!==-1) ok=true; } return ok;', fail: 'grid-template-columns: repeat(2, 1fr);' },
      { name: 'gap is 10px', code: 'var w=doc.querySelector(".wrap"); return w && getComputedStyle(w).gap === "10px";', fail: 'gap: 10px;' }
    ]
  },
  {
    id: 'web-49', title: 'Style without repeating', xp: 45,
    teaches: 'A shared class beats a long list of selectors. Change one rule and every element follows.',
    brief: 'Make both the <code>h1</code> and the <code>h2</code> the same colour using one class, not two selectors.',
    starter: '<h1 class="t">One</h1>\n<h2 class="t">Two</h2>\n\n<style>\n\n</style>',
    hint: '.t { color: teal; }',
    checks: [
      { name: 'both headings have the class', code: 'return doc.querySelectorAll(".t").length === 2;', fail: 'Put class="t" on the h1 and the h2.' },
      { name: 'one rule sets the colour', code: 'var ok=false; var s=doc.querySelectorAll("style"); for(var i=0;i<s.length;i++){ if(/\.t[^{]*\{[^}]*color\s*:/.test(s[i].textContent)) ok=true; } return ok;', fail: '.t { color: teal; }' },
      { name: 'both are teal', code: 'var e=doc.querySelectorAll(".t"); for(var i=0;i<e.length;i++){ if(getComputedStyle(e[i]).color!=="rgb(0, 128, 128)") return false; } return true;', fail: 'Use color: teal;' }
    ]
  },
  {
    id: 'web-50', title: 'Final page', xp: 60,
    teaches: 'Everything together: semantics, structure, a reusable class and a responsive switch.',
    brief: 'Build a page: a <code>header</code>, a <code>main</code> with an <code>h1</code> and two <code>div.card</code>, and a <code>footer</code>. Give both cards class <code>card</code>, style them with <code>padding: 10px</code>, and centre the <code>h1</code>.',
    starter: '',
    hint: 'header, main with h1 and two div.card, footer. One .card rule with padding: 10px, and h1 { text-align: center; }',
    checks: [
      { name: 'header, main and footer exist', code: 'return !!doc.querySelector("header") && !!doc.querySelector("main") && !!doc.querySelector("footer");', fail: 'Use <header>, <main> and <footer>.' },
      { name: 'the h1 is inside main', code: 'return !!doc.querySelector("main h1");', fail: 'Put the <h1> inside <main>.' },
      { name: 'there are two cards', code: 'return doc.querySelectorAll("main .card").length === 2;', fail: 'Two div.card inside main.' },
      { name: 'cards get 10px padding', code: 'var c=doc.querySelector(".card"); return c && getComputedStyle(c).paddingTop === "10px";', fail: '.card { padding: 10px; }' },
      { name: 'the h1 is centred', code: 'var h=doc.querySelector("main h1"); return h && getComputedStyle(h).textAlign === "center";', fail: 'h1 { text-align: center; }' },
      { name: 'footer comes last', code: 'var m=doc.querySelector("main"), f=doc.querySelector("footer"); return !!(m && f && (m.compareDocumentPosition(f) & 4));', fail: 'Order should be header, main, footer.' }
    ]
  }
];

/* Appended here rather than in levels.js: this file loads AFTER levels.js,
   so TRACKS already exists and WEB_PART2 is defined. */
if (typeof TRACKS !== 'undefined' && Array.isArray(WEB_PART2)) {
  TRACKS.web.levels = TRACKS.web.levels.concat(WEB_PART2);
}