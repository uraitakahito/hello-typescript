関数宣言の中で最後のパラメーターにスプレッド演算子(...)を置くことで、関数に渡されるそのパラメーター以降の「残りの」(rest)引数が、すべて1つの配列内に格納されることを表現できます。このような **レストパラメーター(rest parameter)** の型は、通常のパラメーターと同じように宣言できますが、それが引数の配列であることを示すために、最後に[]を追加する点が異なります。

```typescript
function singAllTheSongs(singer: string, ...songs: string[]) {
    for (const song of songs) {
        console.log(`${song}, by ${singer}`);
    }
}
```

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

関数のオーバーロード

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
```
