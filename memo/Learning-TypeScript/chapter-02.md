ある値を関数呼び出しや変数に与えられるかどうかというTypeScriptのチェックは、 **割り当て可能性(assignability)** と呼ばれます

```typescript
let lastName = "King";
lastName = true; // error
```

初期化時に型が推論されない変数は進化する **any(evolving any)** とみなす

```typescript
let rocker; // any
rocker = "Joan Jett";
rocker.toUpperCase();
rocker = 19.58;
rocker.toPrecision(1);
rocker.toUpperCase(); // error
```

変数に初期値を割り当てることなく変数の型を宣言する型アノテーション(type annotation)と呼ばれる構文が用意されている

```typescript
let hoge: string;
hoge = "Joan Jett";
```

ECMAScript 2015の「ECMAScript modules」でファイル間のimportとexportが標準化されました。

```typescript
import { value } from "./values";
export const doubled = value * 2;
```

ファイルをモジュールにしたい場合、ファイル内のどこかに`export {};`を追加すれば強制的にモジュールにすることができます。

```typescript
const shared = "Cher";
export {};
```
