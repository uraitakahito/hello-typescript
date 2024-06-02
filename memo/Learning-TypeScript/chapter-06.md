# 6 配列

### 6.1.1 配列型と関数型

```typescript
// 型は、stringの配列を返す関数
let createString: () => string[];
// 型は、それぞれがstringを返す関数の配列
let stringCreators: (() => string)[];
```

### 6.1.2 合併型の配列

```typescript
// 型は、stringまたはnumberの配列
let stringOrArrayOfNumber: string | number[];
// 型は、それぞれがstringまたはnumberである要素の配列
let arrayOfStringOrNumber: (string | number)[];
```

### 6.1.3 進化するany型の配列

次のvalues配列は、初めは任意の型の要素を含む配列であり、stringの要素を含む配列へと進化し、さらにnumber|stringの要素を含む配列へと進化します。

```typescript
let values = []; // any[]
values.push(''); // string[]
values[0] = 0; // (string | number)[]
```

## 6.2 不安定なメンバー

TypeScriptの型システムは、厳密に言えば、 **不安定なメンバー(unsound)** であることが知られています。

```typescript
function withElements(elements: string[]) {
  console.log(elements[9001].length); // 型エラーが発生しない
}
```

### 6.3.1 スプレッド演算子

```typescript
// string[]
const soldiers = ["Tom", "Tomyris"];
// number[]
const numbers = [1, 2, 3];
// (string | number)[]
const unionArray = [...soldiers, ...numbers];
```

## 6.4 タプル(tuple)

```typescript
let yearAndWarrior: [number, string];
yearAndWarrior = [530, "Tomyris"]; // Ok
yearAndWarrior = [false, "Tomyris"]; // NG
yearAndWarrior = [530]; // NG
```

### 6.4.1 タプルの割り当て可能性

TypeScriptはタプル型を、可変長な配列型よりも限定的な型として扱います。つまり、可変超配列型はタプル型に割り当てることができません。

```typescript
const pairLoose = [false, 123];
const pairTuple: [boolean, number] = pairLoose; // NG
```

#### 6.4.1.1 スプレッド引数としてのタプル

```typescript
function logPair(name: string, value: number) {
  console.log(`${name}: ${value}`);
}
const pairArray = [ "age", 30 ];
logPair(...pairArray); // Ng
const pairTupleIncorrect: [number, string] = [1, "Tomoe"];
logPair(...pairTupleIncorrect); // Ng
const pairTupleCorrect: [string, number] = ["age", 30];
logPair(...pairTupleCorrect); // Ok
```

### 6.4.2 タプルの型推論

コード内で生成された配列をタプルではなく、可変長配列と見なします。

```typescript
// 戻り値の型: (string | number)[]
function firstCharAndSize(input: string) {
  return [input.charAt(0), input.length];
}
// firstChar: string | number
// size: string | number
const [firstChar, size] = firstCharAndSize("hello");
```

#### 6.4.2.1 明示的なタプル型

```typescript
// 戻り値の型: [string, number]
function firstCharAndSize(input: string): [string, number] {
  return [input.charAt(0), input.length];
}
// firstChar: string
// size: number
const [firstChar, size] = firstCharAndSize("hello");
```

#### 6.4.2.2 constアサーションが指定されたタプル

TypeScriptではas const演算子が提供されています。これはconstアサーション(const assertion)と呼ばれ、値の後に配置できます。
配列リテラルの後に置かれている場合は、その配列をタプルとして扱うように指示します。

```typescript
const unionArray = [1157, "Tomoe"]; // (string | number)[]
const readonlyTuple = [1157, "Tomoe"] as const; // readonly [1157, "Tomoe"]
```
