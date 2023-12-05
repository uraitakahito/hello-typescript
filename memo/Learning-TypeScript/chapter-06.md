constアサーションが指定されたタプル
TypeScriptではas const演算子が提供されています。これはconstアサーション(const assertion)と呼ばれ、値の後に配置できます。
配列リテラルの後に置かれている場合は、その配列をタプルとして扱うように指示します。

```typescript
const unionArray = [1157, "Tomoe"]; // (string | number)[]
const readonlyTuple = [1157, "Tomoe"] as const; // readonly [1157, "Tomoe"]
```
