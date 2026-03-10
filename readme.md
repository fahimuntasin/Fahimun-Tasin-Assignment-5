## 1. var, let, and const

These are all ways to declare a variable. The difference is about scope and whether you can reassign the value.

`var` is the old way. It is function scoped, which means it leaks out of if blocks and loops. This causes bugs that are annoying to track down. Avoid it.

`let` is block scoped. It stays inside the curly braces where you defined it. Use it when the value will change.

`const` is also block scoped, but you cannot reassign it after declaration. Use this by default.

```js
var x = 1             // avoid
let count = 0         // use when value changes
const name = "Tasin"  // use by default
```

A simple rule: always reach for `const` first. If you find yourself needing to reassign, switch to `let`.



## 2. The Spread Operator (...)

The spread operator unpacks the contents of an array or object so you can use them somewhere else.

Merging arrays:
```js
const a = [1, 2, 3]
const b = [4, 5, 6]
const combined = [...a, ...b]
// [1, 2, 3, 4, 5, 6]
```

Copying an array without sharing a reference:
```js
const original = [1, 2, 3]
const copy = [...original]
```

Merging objects, or overriding a property:
```js
const user = { name: "Tasin", role: "user" }
const admin = { ...user, role: "admin" }
// { name: "Tasin", role: "admin" }
```

It also works in function calls when you have an array but the function expects individual arguments:
```js
const nums = [3, 1, 4]
Math.max(...nums) // 4
```



## 3. map(), filter(), and forEach()

All three iterate over an array. The difference is what they return and what they are meant for.

**map** transforms every item and returns a new array of the same length.
```js
const prices = [10, 20, 30]
const withTax = prices.map(p => p * 1.1)
// [11, 22, 33]
```

**filter** returns a new array containing only the items that passed your condition.
```js
const scores = [45, 80, 55, 90]
const passing = scores.filter(s => s >= 60)
// [80, 90]
```

**forEach** just runs a function for each item. It returns nothing. Use it when you want to do something like log, send a request, or update something outside the array.
```js
const names = ["Alice", "Bob"]
names.forEach(name => console.log(name))
```

The main thing to remember: if you need the result as an array, use `map` or `filter`. If you just need to loop and do something, use `forEach`.


## 4. Arrow Functions

Arrow functions are a shorter syntax for writing functions. They work the same way for most cases.

Regular function:
```js
function add(a, b) {
  return a + b
}
```

Arrow function:
```js
const add = (a, b) => a + b
```

If there is only one parameter, the parentheses are optional:
```js
const double = n => n * 2
```

If the body has more than one line, you need curly braces and an explicit return:
```js
const greet = (name) => {
  const message = "Hello, " + name
  return message
}
```

One real difference worth knowing: arrow functions do not have their own `this`. They inherit it from wherever they were defined. This matters when writing methods inside classes or working with event listeners, but for most everyday use you will not notice it.


## 5. Template Literals

Template literals let you write strings with backticks instead of quotes. The main benefit is that you can embed variables and expressions directly into the string using `${}`.

Old way:
```js
const name = "Tasin"
const msg = "Hello, " + name + ". You have " + (2 + 3) + " messages."
```

With template literals:
```js
const msg = `Hello, ${name}. You have ${2 + 3} messages.`
```

They also support multi-line strings without any special characters:
```js
const html = `
  <div>
    <h1>${name}</h1>
    <p>Welcome back.</p>
  </div>
`
```
Anything inside `${}` is evaluated as JavaScript, so you can put expressions, function calls, or ternaries in there:
```js
const status = `User is ${isLoggedIn ? "online" : "offline"}`
```
