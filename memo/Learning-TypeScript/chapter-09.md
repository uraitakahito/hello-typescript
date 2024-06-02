# 9 型修飾子

## 9.1 トップ型

**トップ型(top type)** -- **ユニバーサル型(universal type)** とも呼ばれます -- は、システム内で取り得るすべての値を表現できる型です。

any型の場所には任意の型の値を与えられることから、any型はトップ型として機能します。一般にanyは、console.logのパラメーターのように、任意の型のデータを受け取れる場所で使われます。

```typescript
let anyValue: any;
anyValue = "Lucille Ball"; // Ok
anyValue = 123; // Ok
console.log(anyValue); // Ok
```

### 9.1.2 unknown

**unknown** 型は、TypeScriptでの真のトップ型です。unknownは、すべてのオブジェクトをunknown型の場所に渡せるという点で、anyと似ています。anyとの重要な違いは、TypeScriptはunknown型の値に対して、次のように、はるかに制限的だということです。

- TypeScriptは、unknown型の値のプロパティに直接アクセすることを許可しません
- トップ型(anyまたはunknown)でない型にはunknownを割り当てられません

```typescript
function greetComedian(name: unknown) {
  console.log(`Announcing ${name.toUpperCase()}`); // error
}
```

unknown型のnameのメンバーへのアクセスを可能にする唯一の方法は、instanceofやtypeof、または型アサーションを使って、値の型を絞り込むことです。

```typescript
function greetComedianSafety(name: unknown) {
  if (typeof name === "string") {
    console.log(`Announcing ${name.toUpperCase()}!`); // Ok
  } else {
    console.log("Well, I'm off.");
  }
}
```

## 9.2 型述語

TypeScriptには、引数が特定の型かどうかをブール値で返す関数のための、特別な構文があります。
この構文は、**型述語(type predicate)** や **ユーザー定義型ガード(user-defined type guard)** と呼ばれます。

```typescript
function isNumberOrString(value: unknown): value is number | string {
  return ['number', 'string'].includes(typeof value);
}
function logValueIfExists(value: number | string | null | undefined) {
  if (isNumberOrString(value)) {
    value.toString(); // Ok
  } else {
    console.log("value does not exist:", value);
  }
}
```

## 9.3 型演算子

### 9.3.1 keyof

既存の型を受け取り、その型で許される全てのキーの合併型を返す
次の例で、keyof Ratingsは'audience' | 'critics'と同じ意味

```typescript
interface Ratings {
  audience: number;
  critics: number;
}
function getRatingKeyof(ratings: Ratings, key: keyof Ratings): number {
  return ratings[key]; // Ok
}
const ratings: Ratings = { audience: 66, critics: 84 };
getRatingKeyof(ratings, 'audience'); // Ok
getRatingKeyof(ratings, 'not valid'); // error
```

### 9.3.2 typeof

与えられた値の型を返します

```typescript
const original = {
  medium: "movie",
  title: "Mean Girls",
};
let adaption: typeof original;
if (Math.random() > 0.5) {
  adaption = { ...original, medium: "play" }; // Ok
} else {
  adaption = { ...original, medium: 2}; // error
}
```

型演算子のtypeofは、ランタイム演算子のtypeofと見た目が似ていますが、異なるものです。TypeScriptのtypeofは型演算子なので、型の世界でだけ使え、コンパイルされたコードには現れません。

#### 9.3.2.1 keyof typeof

typeofは値の型を取得し、keyofは型が受け入れるキーを取得します。

```typescript
const ratings = {
  audience: 66,
  critics: 84,
};
function logRatings(key: keyof typeof ratings) {
  console.log(ratings[key]); // Ok
}
logRatings('audience'); // Ok
logRatings('not valid'); // error
```

## 9.4 型アサーション

型システムによる値の型の解釈を上書きするための構文。型アサーション(type assertion)または型キャスト(type cast)と呼ばれます。JSON.parse時などに使われます。

```typescript
const rawData = `["grace", "frankie"]`;
JSON.parse(rawData); // any
JSON.parse(rawData) as string[]; // string[]
JSON.parse(rawData) as [string, string]; // [string, string]
```

### 9.4.2 非nullアサーション

型アサーションがよく使われるもう１つの事例は、理論上はnullやundefinedであり得るものの、実際にはそうであり得ないとわかっている変数の型から、nullやundefinedを取り除くというものです。
非nullアサーションは、Map.getなどのAPIで特に役立ちます。それらのAPIは、値が存在する場合にはその値を、そうでない場合にはundefinedを返します。

```typescript
const seasonCounts = new Map([
  ["I Love Lucy", 6],
  ["The Golden Girls", 7],
]);
const maybeValue = seasonCounts.get("I Love Lucy"); // number | undefined
console.log(maybeValue.toString()); // error
const knownValue = seasonCounts.get("I Love Lucy")!;
console.log(knownValue.toString()); // Ok
```

## 9.5 constアサーション

as constは次の3つのルールを、受け取った値に適用します。

- 配列は、変更可能な配列としてではなく、readonlyのタプルとして扱われる
- リテラルは、それらの一般的なプリミティブ型ではなく、リテラル型として扱われる
- オブジェクトのプロパティはreadonlyとみなされる

```typescript
[0, '']; // (number | string)[]
[0, ''] as const // readonly [0, '']
```
