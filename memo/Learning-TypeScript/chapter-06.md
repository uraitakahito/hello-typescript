constアサーションが指定されたタプル
TypeScriptではas const演算子が提供されています。これはconstアサーション(const assertion)と呼ばれ、値の後に配置できます。
配列リテラルの後に置かれている場合は、その配列をタプルとして扱うように指示します。

```typescript
const unionArray = [1157, "Tomoe"]; // (string | number)[]
const readonlyTuple = [1157, "Tomoe"] as const; // readonly [1157, "Tomoe"]
```

## タプル

JavaScriptの配列は、理論的にはどのサイズにもなれますが、固定サイズの配列、つまりタプル(tuple)、を使うのが便利な場合もあります。タプルは、それぞれのインデックスにおいて決まった型を持ちます。これは、配列のすべてのメンバーの取り得るかたの合併型よりも限定された型です。

```typescript
let yearAndWarrior: [number, string];
yearAndWarrior = [530, "Tomyris]; // Ok
yearAndWarrior = [false, "Tomyris"]; // NG
```
