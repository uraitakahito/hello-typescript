# 7. インタフェース

## 型エイリアス vs インターフェース

```typescript
type Poet = {
  born: number;
  name: string;
};
interface Poet = {
  born: number;
  name: string;
}
```

インタフェースの後には;をつけません。

インターフェースと型エイリアスには、いくつか違いがあります。

- インターフェースは互いに「マージ」して拡張できます
- クラス宣言の構造の型チェックにインターフェースを使えます。型エイリアスは使えません
- インターフェースは一般的に、TypeScriptの型チェッカーでより高速に処理されます。インターフェースの宣言する名前付きの型が、内部的に簡単にキャッシュできるのに対し、型エイリアスはオブジェクトリテラルの動的なコピーアンドペーストとして処理されるからです
- インターフェースは、名前のないオブジェクトリテラルに対する別名(エイリアス)というより、名前付きオブジェクトとみなされるので、難解なエッジケースでエラーメッセージがより読みやすくなります

## 7.2 プロパティの種類

### 7.2.2 読み取り専用プロパティ

```typescript
interface Page {
  readonly text: string;
}
function read(page: Page) {
  console.log(page.text); // Ok
  page.text += "new"; // error
}
```

readonly修飾子は型システムだけに存在し、そのインタフェースが使用された場所のみ適用されることに注意してください。

```typescript
const pageIsh = {
  text: "hello"
};
pageIsh.text += "world"; // Ok
// pageIshの型はPageを満たす
read(pageIsh); // Ok
```

### 7.2.3 関数とメソッド

TypeScriptでは、インターフェースのメンバーを関数として宣言する方法が2つあります

メソッド構文

  member(): void

プロパティ構文

  member: () => void

```typescript
interface HasBothFunctionTypes {
    property: () => string;
    method(): string;
}
const hasBoth2: HasBothFunctionTypes = {
    property: () => "",
    method() {
        return "";
    }
};
hasBoth2.property(); // Ok
hasBoth2.method(); // Ok
```

メソッド構文とプロパティ構文の違いは次のものです。

- メソッドはreadonlyとして宣言できませんが、プロパティはできます
- インタフェースのマージではこれらの扱いは異なります
- 型に対する演算の一部では、これらの扱いは異なります
- 関数の実装がthisを参照する場合は、メソッドを使います。クラスのインスタンスでよく使われます。
- それ以外の場合はプロパティ関数を使います

### 7.2.4 呼び出しシグネチャ

インタフェースとオブジェクト型は、 **呼び出しシグネチャ(call signature)** を宣言できます。呼び出しシグネチャは関数型と似ていますが、矢印の代わりにコロンを使います。

```typescript
type FunctionAlias = (input: string) => number;
interface CallSignature {
    (input: string): number;
}
const typedFunctionAlias: FunctionAlias = (input) => input.length; // Ok
const typedCallSignature: CallSignature = (input) => input.length; // Ok
```

```typescript
// 呼び出しシグネチャを使うと、ユーザー定義のプロパティを追加で持つ関数を記述できます
interface FunctionWithCount {
    count: number;
    (): void;
}
let hasCallCount: FunctionWithCount;
function keepsTrackOfCalls() {
    keepsTrackOfCalls.count += 1;
    console.log(`I've been called ${keepsTrackOfCalls.count} times!`);
}
keepsTrackOfCalls.count = 0;
hasCallCount = keepsTrackOfCalls; // Ok
function doesNotHaveCount() {
    console.log("No idea!");
}
hasCallCount = doesNotHaveCount; // error
```

### 7.2.5 インデックスシグネチャ

TypeScript には、インデックスシグネチャ(index signature)と呼ばれる構文が用意されて おり、インターフェースのオブジェクトが任意のキーを受け取り、そのキーが特定の型を持つ ことを表現できます。インデックスシグネチャは任意の文字列のキーを表すのに使うのが最も 一般的です。なぜなら、JavaScript オブジェクトのプロパティの探索では、キーが暗黙的に文字列に変換されるからです。

```typescript
// インデックスシグネチャ(index signature)
interface WordCounts {
    [i: string]: number;
}
const counts: WordCounts = {};
counts.apple = 0; // Ok
counts.banana = 1; // Ok
counts.cherry = false; // error
```

インデックスシグネチャは、オブジェクトに値を割り当てるためには便利ですが、完全に型安全というわけではありません。

```typescript
interface DatesByName {
  [i: string]: Date;
}

const publishDates: DatesByName = {
  Frankenstein: new Date("1818-01-01"),
};

publishDates.Frankenstein; // 型: Date
console.log(publishDates.Frankenstein.toString()); // Ok
publishDates.Beloved; // 型: Date、しかし実行時の方はundefined
console.log(publishDates.Beloved.toString()); // error
```

任意のキーと値のペアを保管したい場合、Mapを使うほうが安全です。

#### 7.2.5.1 プロパティとインデックスシグネチャの混合

```typescript
interface ChapterStarts {
  prefer: 0;
  [i: string]: number;
}

const correctPreface : ChapterStarts = {
  prefer: 0,
  chapter1: 1,
  chapter2: 2,
};

const wrongPreface : ChapterStarts = {
  prefer: 1, // error
};
```

## 7.3 インタフェースの拡張

### 7.3.1 オーバーライドされたプロパティ

派生インターフェースは、ベースインターフェースから受け継いだプロパティを異なる型で再宣言することで、そのプロパティを **オーバーライド(override)** できます。TypeScriptの型チェッカーは、オーバーライドされたプロパティが、そのベースプロパティに割り当て可能であることを強制します。

```typescript
interface WithNullableName {
  name: string | null;
}
interface WithNonNullableName extends WithNullableName {
  name: string;
}
interface WithNumericName extends WithNullableName {
  name: number | string;
} // error
```

## 7.4 インターフェースのマージ

```typescript
interface Merged {
  fromFirst: string;
}
interface Merged {
  fromSecond: string;
}
// これは、次のように書いたのと同じです
// interface Merged {
//   fromFirst: string;
//   fromSecond: string;
// }
```
