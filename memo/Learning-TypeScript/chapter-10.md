# 10 ジェネリック

## 10.1 ジェネリック関数

```typescript
const identity = <T>(input: T) => input;
identity(123); // 型: 123
```
### 10.1.1 明示的なジェネリック呼び出しの型

## 10.2 ジェネリックインタフェース

```typescript
interface Box<T> {
  inside: T;
}
let stringyBox: Box<string> = { inside: "Hello, world!" };
let numberBox: Box<number> = { inside: 123 };
let incorrectBox: Box<number> = { inside: "Hello, world!" }; // error
```

## 10.3 ジェネリッククラス

```typescript
class Secret<Key, Value> {
  key: Key;
  value: Value;
  constructor(key: Key, value: Value) {
    this.key = key;
    this.value = value;
  }
  getValue(key: Key): Value | undefined {
    return key === this.key ? this.value : undefined;
  }
}
const storage = new Secret(12345, "The secret");
storage.getValue(12345);
```

## 10.4 ジェネリック型エイリアス

```typescript
type Nullish<T> = T | null | undefined;
type CreateValue<Input, Output> = (input: Input) => Output;
let creator: CreateValue<string, number>;
creator = text => text.length; // Ok
creator = text => text.toUpperCase(); // error
```

### 10.4.1 ジェネリックなタグ付き合併型

```typescript
type Result<Data> = FailureResult | SuccessfulResult<Data>;
interface FailureResult {
  error: Error;
  succeeded: false;
}
interface SuccessfulResult<Data> {
  data: Data;
  succeeded: true;
}
function handleResult(result: Result<string>) {
  if (result.succeeded) {
    console.log(`We did it! ${result.data}`);
  }
  result.data; // error
}
```

## 10.6 制約付きジェネリック型

型パラメーターが自分自身を、ある型を拡張(extend)する必要があると宣言できます
つまり、その型に割り当てられる型だけに制約できる

```typescript
interface WithLength {
  length: number;
}
function logWithLength<T extends WithLength>(input: T) {
  console.log(`Length: ${input.length}`);
  return input;
}
logWithLength("No one can figure out your worth but you."); // Ok
logWithLength([false, true]); // Ok
logWithLength(new Date()); // error
```

### 10.6.1 keyofと制約付き型パラメーター

```typescript
function get<T, Key extends keyof T>(container: T, key: Key) {
  return container[key];
}
const roles = {
  favorite: "Fargo",
  others: ["Almost Famous", "Burn After Reading"],
};
const favorite = get(roles, "favorite"); // string
const missing = get(roles, "extras"); // error
```

## 10.7 Promise

### 10.7.1 Promiseの作成

```typescript
class PromiseLike<Value> {
  constructor(
    executor: (
      resolve: (value: Value) => void,
      reject: (reason: unknown) => void
    ) => void,
  ) { }
}
```

Promiseのジェネリックメソッドのthenは、自身が返すPromiseの解決される値を表す、新しい型パラメーターを導入します。

```typescript
// 型: Promise<string>
const textEventually = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Hello, world!"), 1000);
});

// 型: Promise<number>
const lengthEventually = textEventually.then((text) => text.length);
```

### 10.7.2 async関数

JavaScriptでasyncキーワードを使って宣言された関数 -- **async関数** と呼ばれます -- は、すべてPromiseを返します。JavaScriptでは、async関数によって返された値がThenableでない場合は、あたかも、それに対してPromise.resolveが呼び出されたかのように、その値がPromiseの中にラップされます。TypeScriptはこれを認識し、async関数の戻り値の型を、どのような値が返されるとしても、常にPromiseと推論します。

```typescript
// 型: (text: string) => Promise<number>
async function lengthAfterSecond(text: string) {
  return new Promise((resolve) => setTimeout(resolve, 1000));
  return text.length;
}
// 型: (text: string) => Promise<number>
async function lengthImmediately(text: string) {
  return text.length;
}
```
