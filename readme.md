

## var, let, const

`var` ta purano. Keu use kore na akhon. Problem holo eta block scope bujhe na, if/loop er baaire ber hoe jai. Ek bar bug khailei bujhbe keno avoid kore shobai.

`let` use koro jodi value ta change hobe. `const` use koro baki shob jayga.

```js
let count = 0
count = count + 1  // fine

const API_URL = "https://api.example.com"
API_URL = "other"  // error dibe
```

Amar rule holo — shuru te `const` likhi, jodi error dey tahole `let` e change kori. `var` likhar dorkar nai.



## Spread operator (...)

Array ba object er contents ta onno jagay dhele dite chai? Spread use koro.

```js
const a = [1, 2, 3]
const b = [...a, 4, 5]
// [1, 2, 3, 4, 5]
```

Object e kaje laghe jodi kono property override korte chai:

```js
const user = { name: "Tasin", role: "user" }
const admin = { ...user, role: "admin" }
// { name: "Tasin", role: "admin" }
```

Copy korte gele eta khub useful, karon direct assign korle dujonta same memory point kore. Spread dile alag copy hoi.

```js
const original = [1, 2, 3]
const copy = [...original]  // real copy
```

---

## map, filter, forEach

Tinta method, tinta alag kaj. Ekta diye shobkichu korte gele confused hoye jao.

**map** — protita item ke change kore notun array dey.

```js
const prices = [100, 200, 300]
const after_discount = prices.map(p => p * 0.9)
// [90, 180, 270]
```

**filter** — condition pass kora items rakhhe, baki ber kore dey.

```js
const marks = [35, 60, 45, 80]
const passed = marks.filter(m => m >= 50)
// [60, 80]
```

**forEach** — shudhu loop kore, kono notun array ferat dey na. Console log ba dom update er moto kajer jonno.

```js
const names = ["Alice", "Bob", "Charlie"]
names.forEach(name => console.log(name))
```

Short version: result lagbe? `map` ba `filter`. Shudhu kichhu korte hobe? `forEach`.

---

## Arrow functions

Shudhu function likhhar shorter way. Beshi kichu na.

```js
// age likhhtam
function add(a, b) {
  return a + b
}

// ekhon likhi
const add = (a, b) => a + b
```

Ekta parameter thakle bracket lagbe na:

```js
const double = n => n * 2
```

Multi line hole curly brace ar return lagbe:

```js
const greet = name => {
  const msg = "hello " + name
  return msg
}
```

Ekta parthokko ache — arrow function er nijer `this` nai, parent er theke inherit kore. Classes ba event listener e mathai rakhha lagbe, otherwise normally khayal korte hobe na.

---

## Template literals

Backtick diye string likhle `${}` er modhhe variable ba expression direct rakhha jai. Plus sign diye jora lagbe na aar.

```js
const name = "Tasin"

// purano way
const msg = "Hello " + name + ", welcome back."

// template literal
const msg = `Hello ${name}, welcome back.`
```

Math ba condition o direct dewa jai:

```js
const total = `Total: ${price * quantity} taka`
const status = `User is ${isOnline ? "online" : "offline"}`
```

Multi line string o easily likhha jai:

```js
const card = `
  Name: ${user.name}
  Email: ${user.email}
  Role: ${user.role}
`
```