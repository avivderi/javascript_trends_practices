# תרגילים — Server Unit Testing

mock.fn, mock.method, export default {...}, Repository + Service + Controller

---

## קל — תרגילים 1-3

### תרגיל 1

**הוראות:** על דוגמת ה-`calculator` מהמצגת — כתבו בדיקה עם `mock.method` שמחליפה את `add` כך שתמיד תחזיר `0`, ואז מחזירה אותה בחזרה עם `mock.restoreAll()`.

**מטרה:** תרגול המנגנון הבסיסי לפני שעוברים לקוד שרת

**קלט:**
```js
const calculator = { add: (a, b) => a + b };
function useCalculator() { return calculator.add(2, 3); }

mock.method(calculator, "add", /* כתוב כאן */);
useCalculator(); // ?
mock.restoreAll();
useCalculator(); // ?
```

**פלט:**
```
אחרי mock.method  →  useCalculator() === 0
אחרי restoreAll   →  useCalculator() === 5  (המקורי חזר)
```

---

### תרגיל 2

**הוראות:** כתבו בדיקה ל-`userService.createUser` — מזייפים את `userRepository.findByEmail` (מחזיר `null`) ואת `userRepository.insertUser`, ובודקים שמשתמש נוצר בהצלחה.

**מטרה:** בדיקת Service — מקרה הצלחה

**קלט:**
```js
mock.method(userRepository, "findByEmail", async () => null);
mock.method(userRepository, "insertUser", /* כתוב כאן */);

const result = await userService.createUser({ name: "Alice", email: "a@x.com" });
```

**פלט:**
```
result.name                          →  "Alice"
userRepository.insertUser.mock.calls.length  →  1
```

---

### תרגיל 3

**הוראות:** כתבו בדיקה ל-`userService.createUser` כש-`findByEmail` מחזיר משתמש קיים — ודאו שנזרקת שגיאה `"Email already exists"` וש-`insertUser` **לא** נקרא.

**מטרה:** בדיקת Service — דחיית כפילות

**קלט:**
```js
mock.method(userRepository, "findByEmail", async () => ({ email: "a@x.com" }));
mock.method(userRepository, "insertUser", async () => { throw new Error("should not be called"); });

await assert.rejects(
  () => userService.createUser({ name: "Alice", email: "a@x.com" }),
  /* כתוב כאן */
);
```

**פלט:**
```
נזרקת שגיאה: "Email already exists"
userRepository.insertUser.mock.calls.length  →  0
```

---

## בינוני — תרגילים 4-6

### תרגיל 4

**הוראות:** כתבו בדיקה ל-`createUserController` — מזייפים את `userService.createUser` (מחזיר משתמש), ובודקים שהתשובה היא 201.

**מטרה:** בדיקת Controller — מקרה הצלחה

**קלט:**
```js
mock.method(userService, "createUser", async () => ({ name: "Alice" }));

const res = { status: mock.fn(() => res), json: mock.fn() };
await createUserController({ body: { name: "Alice" } }, res);
```

**פלט:**
```
res.status.mock.calls[0].arguments[0]  →  201
```

---

### תרגיל 5

**הוראות:** כתבו בדיקה ל-`getUserController` כש-`userService.getUser` מחזיר `null` — ודאו שהתשובה היא 404.

**מטרה:** בדיקת Controller — מקרה 404

**קלט:**
```js
mock.method(userService, "getUser", async () => /* כתוב כאן */);

const res = { status: mock.fn(() => res), json: mock.fn() };
await getUserController({ params: { id: "999" } }, res);
```

**פלט:**
```
res.status.mock.calls[0].arguments[0]  →  404
```

---

### תרגיל 6

**הוראות:** כתבו בדיקה ל-`userService.updateUser` כש-`userRepository.findById` מחזיר `null` — ודאו שנזרקת שגיאה `"User not found"` וש-`updateUser` (ברמת ה-Repository) **לא** נקרא.

**מטרה:** בדיקת Service — ולידציה לפני עדכון

**קלט:**
```js
mock.method(userRepository, "findById", async () => null);
mock.method(userRepository, "updateUser", async () => { throw new Error("should not be called"); });

await assert.rejects(
  () => userService.updateUser("1", { name: "X" }),
  { message: "User not found" }
);
```

**פלט:**
```
נזרקת שגיאה: "User not found"
userRepository.updateUser.mock.calls.length  →  0
```

---

## קשה — תרגילים 7-8

### תרגיל 7

**הוראות:** כתבו בדיקה ל-`userService.deleteUser` כש-`userRepository.findById` מחזיר `null` — ודאו שנזרקת שגיאה וש-`deleteUser` (ברמת ה-Repository) לא נקרא כלל.

**מטרה:** בדיקת Service — מניעת מחיקה של רשומה לא קיימת

**קלט:**
```js
mock.method(userRepository, "findById", async () => null);
mock.method(userRepository, "deleteUser", /* כתוב כאן */);

await assert.rejects(() => userService.deleteUser("999"), { message: "User not found" });
```

**פלט:**
```
נזרקת שגיאה: "User not found"
userRepository.deleteUser.mock.calls.length  →  0
```

---

### תרגיל 8

**הוראות:** כתבו בדיקה ל-`deleteUserController` — מזייפים את `userService.deleteUser`, ובודקים שהתשובה היא 204 וש-`res.send` נקרא (בלי `res.json`).

**מטרה:** בדיקת Controller — 204 No Content

**קלט:**
```js
mock.method(userService, "deleteUser", async () => {});

const res = { status: mock.fn(() => res), json: mock.fn(() => res), send: mock.fn(() => res) };
await deleteUserController({ params: { id: "1" } }, res);
```

**פלט:**
```
res.status.mock.calls[0].arguments[0]  →  204
res.send.mock.calls.length             →  1
```

---