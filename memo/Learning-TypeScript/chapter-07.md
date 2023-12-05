```typescript
// 関数とメソッド
// TypeScriptでは、インターフェースのメンバーを関数として宣言する方法が2つあります
// メソッド構文
//   member(): void
// プロパティ構文
//   member: () => void
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

```typescript
// 呼び出しシグネチャ
// インターフェースとオブジェクト型は、呼び出しシグネチャ(call signature)を宣言できます。
// これは、関数として呼び出せる値について、その呼び出し方法を型システムで記述したものです。
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

TypeScript には、インデックスシグネチャ(index signature)と呼ばれる構文が用意されて おり、インターフェースのオブジェクトが任意のキーを受け取り、そのキーが特定の型を持つ ことを表現できます。インデックスシグネチャは任意の文字列のキーを表すのに使うのが最も 一般的です。なぜなら、JavaScript オブジェクトのプロパティの探索では、キーが暗黙的に文 字列に変換されるからです。

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
