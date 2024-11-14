export class Foo {
  // @typescript-eslint/naming-convention should say:
  // Class Property name `People` must match one of the following formats: camelCase
  static People = Object.freeze([
    { name: "Tom", age: 10 },
    { name: "Alice", age: 20 },
  ]);
}
