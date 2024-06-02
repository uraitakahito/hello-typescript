### 3.1.1 合併型の宣言

「どちらか１つ」と言う型は、 **合併型(union type)** と呼ばれます。合併型の宣言の順序は重要でありません。

```typescript
let thinker: string | null = null;
if (Math.random() > 0.5) {
    thinker = "Susanne Langer";
}
```

### 3.1.2 合併型のプロパティ

合併型に含まれるすべての型に存在するメンバープロパティへのアクセスだけを許可します。

```typescript
let physicist = Math.random() > 0.5 ? "Marie Curie" : 84;
physicist.toString(); // Ok
physicist.toUpperCase(); // error
```

## 3.2 型の絞り込み

**型の絞り込み(type narrowing)** とは、ある値が、定義された型、宣言された型、あるいは以前に推論された型よりも限定的な型であることを、TypeScriptにコードで示すことです。また、型の絞り込みのために利用できる論理チェックのことを、 **型ガード(type guard)** と呼びます。

### 3.2.1 割り当てによる絞り込み

```typescript
let admiral: number | string;
admiral = "Grace Hopper";
admiral.toUpperCase(); // Ok
admiral.toFixed(); // error
```

### 3.2.2 条件チェック

```typescript
let scientist = Math.random() > 0.5
    ? "Rosalind Franklin"
    : 51;

if (scientist == "Rosalind Franklin") {
    scientist.toUpperCase(); // Ok
}

scientist.toUpperCase(); // error
```

## 3.3 リテラル型

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
## 3.4 厳格なnullチェック

合併型の絞り込みとリテラル型の強力さは、nullやundefinedの可能性のある値を扱う際に特に役立ちます。これは、TypeScriptで **厳格なnullチェック(strict null checking)** として知られています。TypeScriptは、厳格なnullチェックを用いて 「10億ドルの過ち」(billion-dollar mistake)を解決しようとする最新のプログラミング言語の1つです。

厳格なnullチェックを有効にすると、コードに潜むクラッシュの可能性を認識します。

```typescript
let nameMaybe = Math.random > 0.5
    ? "Tony Hoare"
    : undefined;
nameMaybe.toLowerCase(); // error
```

### 3.4.2 真値性による絞り込み

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

## 3.5 型エイリアス

再利用される型に、より簡単な名前を割り当てるための **型エイリアス(type alias)** が用意されています。慣例により、型エイリアスの名前はパスカルケースでつけられます。

```typescript
type RawData = boolean | number | string | null | undefined;
let rawDataFirst: RawData;
```
