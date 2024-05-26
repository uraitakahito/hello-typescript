### 4.1.1 オブジェクト型の宣言

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

### 4.1.2 オブジェクト型エイリアス

```typescript
type Poet = {
  born: number;
  name: string;
};
let poetLater2: Poet;
```

## 4.2 構造的型付け(structural typing)

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

構造的型付けは、 **ダックタイピング(duck typing)** と同じものではありません。

- 構造的型付けは、型をチェックする静的なシステムが存在します
- ダックタイピングでは、実行時にオブジェクトが使用されるまで、その型をチェックするものは存在しません

つまり、JavaScriptはダックタイピングを採用するのに対し、TypeScriptは構造的型付けを採用しています。

### 4.2.1 使われ方のチェック

```typescript
type FirstAndLastNames = {
  first: string;
  last: string;
};

// Ok
const hasBoth: FirstAndLastNames = {
  first: "Lucille",
  last: "Clifton",
};

const hasOnlyOne: FirstAndLastNames = {
  first: "Lucille",
}; // error
```

### 4.2.2 過剰プロパティチェック

ある変数がオブジェクト型として宣言され、その初期値が、その型に記述されている以上のフィールドを持つとき、TypeScriptはエラーを出力します。これを **過剰プロパティチェック(excess property checking)** と呼びます。

```typescript
type Poet = {
  born: number;
  name: string;
};

// Ok
const poetMatch: Poet = {
  born: 1928,
  name: "Maya Angelou",
};

// Error
const extraProperty: Poet = {
  activity: "walking",
  born: 1995,
  name: "Mary Oliver",
};
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

型アノテーションの代わりにsatisfies演算子を使う利点は、TypeScriptによる型の推論に影響がないことです。

```typescript
type Ingriedient = {
  name: string;
  amount: string | number;
};

// '{name: string; amount: string; }'型と推論される
const soySauce = {
  name: "soy sauce",
  amount: "2 cups",
};

// '{name: string; amount: string; }'型と推論される
const soySauceWithSatisfies = {
  name: "soy sauce",
  amount: "2 cups",
} satisfies Ingriedient;

// 型アノテーションにより'{name: string; amount: string | number; }'型が強制される
const soySauceWithAnnotation: Ingriedient = {
  name: "soy sauce",
  amount: "2 cups",
};

soySauce.amount.length; // Ok
souSauceWithSatisfies.amount.length; // Ok
soySauceWithAnnotation.amount.length; // error
```

変数に型アノテーションをつけないでおけば、将来TypeScriptでより高度な型推論が可能になった時、その恩恵をコードの変更なしで受けられます。このようなケースではsatisfies演算子を使いましょう。

### 4.2.4 オプションプロパティ

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

「?」を使ってオプションプロパティとして宣言されたプロパティは、存在しないことが許されます。

```typescript
type Writers = {
  author: string | undefined;
  editor?: string;
};

// Ok
const hasRequired: Writers = {
  author: undefined,
};

// error
const missingRequired: Writers = {};
```

### 4.3.1 オブジェクト型の合併型の推論

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
poem.name; // string
poem.pages; // number | undefined
poem.rhymes; // boolean | undefined
```

### 4.3.2 オブジェクト型の合併型の明示的型付け

オブジェクト型の合併型を明示的に記述すれば、オブジェクトの型をより明確に表現できます。

```typescript
type PoemWithPages = {
    name: string;
    pages: number;
};

type PoemWithRhymes = {
    name: string;
    rhymes: boolean;
};

type Poem = PoemWithPages | PoemWithRhymes;

const poem: Poem = Math.random() > 0.5
    ? { name: "The Double Image", pages: 7 }
    : { name: "Her Kind", rhymes: true };

poem.name; // Ok
poem.pages; // error
poem.rhymes; // error
```

### 4.3.4 タグ付き合併型(tagged union)

JavaScriptやTypeScriptで用いられる合併型オブジェクトとしては、そのオブジェクトがどのような形状であるか示すプロパティを持つものもよく見られます。
このような合併型を **タグ付き合併型(tagged union)** または **判別可能な合併型(discriminated union)** と呼び、オブジェクトの型を示す値を持つプロパティを **タグ** または **判別子(discriminant)** と呼びます。
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

## 4.4 交差型

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
// これは次と同じ
// {
//   genre: string;
//   name: string;
//   pages: number;
// }
```

#### 4.4.1.2 never

2つのプリミティブ型を交差させると、never型になります。

```typescript
type NotPossible = string & number; // never
```
