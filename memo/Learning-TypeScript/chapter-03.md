## 合併型

「どちらか１つ」と言う型は、 **合併型(union type)** と呼ばれます。合併型の宣言の順序は重要でありません。

```typescript
let thinker: string | null = null;
if (Math.random() > 0.5) {
    thinker = "Susanne Langer";
}
```

## 合併型のプロパティ

合併型に含まれるすべての型に存在するメンバープロパティへのアクセスだけを許可します。

```typescript
let physicist = Math.random() > 0.5 ? "Marie Curie" : 84;
physicist.toString(); // Ok
physicist.toUpperCase(); // error
```

## リテラル型

プリミティブ型の何らかの値としてではなく、プリミティブ型の特定の値として理解される型。

```typescript
const philosopher = "Hypatia";
```

合併型のアノテーションは、リテラルとプリミティブ型を組み合わせて書くこともできます

```typescript
let lifespan: number | "ongoing" | "uncertain";
lifespan = 89; // Ok
lifespan = "ongoing"; // Ok
lifespan = true; // error
```

## 3.4.2 真値性による絞り込み

JavaScriptにおいて **真値性(truthiness)** 、すなわち **真値(truthy)** であることは、ある値が&&演算子やif文など、Booleanのコンテキストで評価される場合に、真(true)と見なされるかどうかである。
JavaScriptの値は、 **偽値(falsy)**  -- false, 0, -0, 0n, "", null, undefined, NaN -- と定義されたものを除いて全て真値です。
TypeScriptは、取り得る値の一部だけが真値である場合に、真値性のチェックから変数の型を絞り込むことができます。

```typescript
let geneticist = Math.random() > 0.5 ? "Barbara McClintock" : undefined;
if (geneticist) {
    geneticist.toUpperCase(); // Ok: string
}
geneticist.toUpperCase(); // Error: 'geneticist' is possibly 'undefined'.
```

真値性のチェックは逆方向には働かない

```typescript
let biologist = Math.random() > 0.5 && "Rachel Carson";
if (biologist) {
    biologist; // string
} else {
    biologist; // false | string
}
```

値が割り当てられるまで変数がundefinedであると理解します。ある変数に値を割り当てる前に、そのプロパティにアクセスするなどして、その変数を使おうとすると、エラーメッセージが表示されます。

```typescript
let mathematician: string;
mathematician?.length;
// Error: Variable 'mathematician' is used before being assigned.
mathematician = "Mark Goldberg";
mathematician.length; // Ok
```

mathematicianの型がstring | undefinedであれば、前のコードスニペットは何のエラーも出しません

```typescript
let mathematician2: string | undefined;
mathematician2?.length; // Ok
```

再利用される型に、より簡単な名前を割り当てるための **型エイリアス(type alias)** が用意されています

```typescript
type RawData = boolean | number | string | null | undefined;
let rawDataFirst: RawData;
```
