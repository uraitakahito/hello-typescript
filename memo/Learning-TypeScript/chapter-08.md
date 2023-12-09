## 関数プロパティ

JavaScriptにはクラスのメンバーを呼び出し可能な関数として宣言するためにメソッド(method)とプロパティ(property)があります。

myFunction() {}のように、メンバー名の後に丸括弧を置くというメソッドの書き方については、すでに例を示しました。この方法は、関数をクラスのプロトタイプに割り当てるので、すべてのクラスインスタンスが同一の関数定義を使用します。

もう1つの構文は、その値が関数であるプロパティを宣言することです。これにより、クラスの インスタンスごとに新しい関数が作成されます。この方法は、this スコープが常にクラスインスタンスを指すアロー関数(() =>)を使いたい場合に、特に役立ちます(その代わり、時間とメモリーが犠牲になります)。

```typescript
class WithMethod {
  myMethod() {}
}
new WithMethod().myMethod === new WithMethod().myMethod; // true

class WithProperty {
  myProperty: () => {}
}
new WithMethod().myProperty === new WithMethod().myProperty; // false
```

```typescript
// 明確に割り当てられたプロパティ
// プロパティに厳格な初期化チェックを適用すべきでないと確信する場合は、プロパティの後に「!」アサーションを追加して、チェックを無効にできます
class ActivitiesQueue {
  pending!: string[]; // Ok
  initialize(pending: string[]) {
    this.pending = pending;
  }
  next() {
    return this.pending.pop();
  }
}
const activities = new ActivitiesQueue();
activities.initialize(['eat', 'sleep', 'learn']);
```

## オーバーライドされたコンストラクター

バニラJavaScriptと同様に、TypeScriptでは、サブクラスは独自のコンストラクターを定義する必要はありません。
独自のコンストラクターを持たないサブクラスは、暗黙にベースクラスのコンストラクターを使用します。
JavaScriptでは、サブクラスで独自のコンストラクターを宣言する場合、そのコンストラクターはsuperキーワードを使ってベースクラスのコンストラクターを呼び出す必要があります。

```typescript
class GradeAnnouncer {
  message: string;

  constructor(grade: number) {
    this.message = grade <= 65 ? "Maybe next time..." : "You pass!";
  }
}

class PassingAnnouncer extends GradeAnnouncer {
  constructor() {
    super(100);
  }
}

class FailingAnnouncer extends GradeAnnouncer {
  constructor() {} // error
}
```

## メンバーの可視性

JavaScriptでは、クラスメンバーの名前を「#」で始めることで、それがプライベートなクラスメンバーであることを指定できます。

```typescript
class Base {
  isPublicImplicit = 0;
  public isPublicExplicit = 1;
  protected isProtected = 2;
  private isPrivate = 3;
  #truePrivate = 4;
}

class Subclass extends Base {
  examples() {
    this.isPublicImplicit; // Ok
    this.isPublicExplicit; // Ok
    this.isProtected; // Ok
    this.isPrivate; // error
    this.#truePrivate; // error
  }
}
```
