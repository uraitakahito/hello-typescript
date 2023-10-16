オブジェクト型の宣言

```typescript
let poetLater: {
    born: number;
    name: string;
};
poetLater = {
    born: 1935,
    name: "Mary Oliver",
};
poetLater = "Sappho";
// Error: Type 'string' is not assignable to type '{ born: number; name: string; }'
```

オブジェクト型エイリアス

```typescript
type Poet = {
    born: number;
    name: string;
};
let poetLater2: Poet;
```

構造的型付け(structural typing)

あるパラメーターや変数が特定のオブジェクト型であることを宣言する場合、実際に使用するオブジェクトが何であれ、それがそのオブジェクト型のプロパティを持つべきことをTypeScriptに伝える。

```typescript
type WithFirstName = {
    firstName: string;
}
type WithLastName = {
    lastName: string;
};
const hasBoth = {
    firstName: "Lucille",
    lastName: "Clifton",
};
let withFirstName: WithFirstName = hasBoth; // Ok
let withLastName: WithLastName = hasBoth; // Ok
```

ある変数がある型に存在するフィールドだけを持つことを、型チェッカーに補償させる目的で **satisfies演算子** を使えます。

```typescript
type Poet = {
    born: number;
    name: string;
}
const poetMatch = {
    born: 1928,
    name: "Maya Angelou"
} satisfies Poet;
const extraProperty = {
    activity: "walking",
    born: 1995,
    name: "Mary Oliver",
} satisfies Poet;
// Error: TYpe '{ activity: string; born: number; name: string; }'
```

オブジェクト型のプロパティは、オブジェクト内で全て必須である必要はありません

```typescript
type Book = {
    author?: string;
    pages: number;
};
const ok: Book = {
    pages: 80,
}
const missing: Book = {
    author: "Rita Dove",
}; // error
```

オブジェクト型の合併型の推論

初期値の中で値が与えられていないプロパティはオプション型(?)になります

```typescript
const poem = Math.random() > 0.5
    ? { name: "The Double Image", pages: 7 }
    : { name: "Her Kind", rhymes: true };
// {
//   name: string;
//   pages: number;
//   rhymes?: undefined;
// }
// |
// {
//   name: string;
//   pages?: number;
//   rhymes: undefined;
// }
```

タグ付き合併型(tagged union)

JavaScriptやTypeScriptで用いられる合併型オブジェクトとしては、そのオブジェクトがどのような形状であるか示すプロパティを持つものもよく見られます。
このような合併型をタグ付き合併型(tagged union)または判別可能な合併型(discriminated union)と呼び、オブジェクトの型を示す値を持つプロパティをタグまたは判別子(discriminant)と呼びます。
例えば次のPoem型は、PoemWithPages型またはPoemWithRhymes型のどちらかとなるオプジェクトを表現しますが、そのどちらになるかはtypeプロパティによって示されます

```typescript
type PoemWithPages = {
    name: string;
    pages: number;
    type: 'pages';
};
type PoemWithRhymes = {
    name: string;
    rhymes: boolean;
    type: 'rhymes';
}
type Poem = PoemWithPages | PoemWithRhymes;
const poem2: Poem = Math.random() > 0.5
  ?  { name: "The Double Image", pages: 7, type: "pages" }
  :  { name: "Her Kind", rhymes: true, type: "rhymes" };
if (poem2.type == "pages" ) {
    console.log(`It's got pages: ${poem.pages}`); // Ok
}
poem2.pages; // error
```

複数の型を同時に満たす型、すなわち **交差型(intersection type)** を記述するのに&が使われます。

```typescript
type Artwork = {
    genre: string;
    name: string;
};
type Writing = {
    pages: number;
    name: string;
};
type WrittenArt = Artwork & Writing;
```
