# 5 関数

### 5.1.1 必須パラメーター

JavaScriptと違って、TypeScriptは、関数で宣言されているすべてのパラメーターが必須であることを前提としています。

### 5.1.4 レストパラメーター

関数宣言の中で最後のパラメーターにスプレッド演算子(...)を置くことで、関数に渡されるそのパラメーター以降の「残りの」(rest)引数が、すべて1つの配列内に格納されることを表現できます。このような **レストパラメーター(rest parameter)** の型は、通常のパラメーターと同じように宣言できますが、それが引数の配列であることを示すために、最後に[]を追加する点が異なります。

```typescript
function singAllTheSongs(singer: string, ...songs: string[]) {
  for (const song of songs) {
    console.log(`${song}, by ${singer}`);
  }
}
```

### 5.2.1 明示的な戻り値の型

変数と同様に、わざわざ型アノテーションを使って関数の戻り値の型を明示的に宣言することは勧めません。ただし、役に立つケースもあります。

- 様々な値を返し得る関数で、常に同じ型の値を返すように強制したい場合
- TypeScriptが値の型を推測できない、再帰関数を使う場合
- 非常に大きなプロジェクトで型チェックを高速化したい場合

## 5.3 関数の型

```typescript
const songs = ["Shake It Off", "You Belong With Me", "Love Story"];

function runOnSongs(getSongAt: (index: number) => string) {
  for (let i = 0; i < songs.length; i++) {
    console.log(getSongAt(i));
  }
}

function getSongAt(index: number) {
  return `${songs[index]}`;
}

runOnSongs(getSongAt); // Ok

function logSong(song: string) {
  return `${song}`;
}

runOnSongs(logSong); // error
```

### 5.3.1 関数の型と括弧

```typescript
// 型は、string | undefinedという合併型を返す関数
let returnsStringOrUndefined: () => string | undefined;
// 型は、stringを返す関数またはundefined
let maybeReturnsString: (() => string) | undefined;
```

### 5.3.2 パラメーターの型推論

関数の型が宣言済みの場所では、パラメーターの型を推論できます。

```typescript
let singer: (song: string) => string;

singer = function(song) {
  // songの型はstring
  return `${song.toUpperCase()}!`; // Ok
}
```

同様に関数を引数として渡す場合も、関数のパラメーターの型が推論されます。

```typescript
const songs = ["Shake It Off", "You Belong With Me", "Love Story"];

// song: string
// index: number
songs.forEach((song, index) => {
  console.log(`${index + 1}. ${song}`);
});
```

### 5.3.3 関数型エイリアス

```typescript
type StringToNumber = (input: string) => number;
let stringToNumber: StringToNumber;
stringToNumber = (input) => input.length; // Ok
stringToNumber = (input) => input.toUpperCase(); // error
```

## 5.4 その他の戻り値の型

### 5.4.1 void

voidで何も戻り値を返さない関数を表現できます。

JavaScriptのすべての関数は、実際に値を返さない場合、undefinedを返しますが、voidはundefinedとは異なります。

```typescript
function returnVoid() {
  return;
}

let lazyValue: string | undefined;
lazyValue = returnVoid(); // error
```

void型はJavaScriptではありません。関数の戻り値の型を宣言するために使われるTypeScriptのキーワードです。

### 5.4.2 never

処理を返さない関数に対しては **never** という型アノテーションを明治的に追加することで、その関数の呼び出し後のコードが一切実行されないことを表現できます。

```typescript
function fail(message: string): never {
  throw new Error(`Invariant failure: ${message}.`)
}

function workWithUnsafeParam(param: unknown) {
  if (typeof param !== "string") {
    fail(`param should be a string, not ${typeof param}`);
  }
  // ここでは、paramがstring型であることがわかっています
  param.toUpperCase(); // Ok
}
```

## 5.5 関数のオーバーロード

最終的な１つの **実装シグネチャ(implementation signature)** 及び関数本体の前に、いくつかの異なるパラメーター、戻り値の組み合わせを同じ関数名で複数回宣言できる機能です。

```typescript
function createDate(timestamp: number): Date;
function createDate(month: number, day: number, year: number): Date;
function createDate(monthOrTimestamp: number, day?: number, year?: number) {
  return day === undefined || year === undefined
    ? new Date(monthOrTimestamp)
    : new Date(year, monthOrTimestamp, day);
}
createDate(554356800); // Ok
createDate(7, 27, 1987); // Ok
createDate(4, 1); // error
```
