# 8. クラス

## 8.1 クラスメソッド

### 8.2.1 関数プロパティ

JavaScriptにはクラスのメンバーを呼び出し可能な関数として宣言するためにメソッド(method)とプロパティ(property)があります。

`myFunction() {}` のように、メンバー名の後に丸括弧を置くというメソッドの書き方は、関数をクラスのプロトタイプに割り当てるので、すべてのクラスインスタンスが同一の関数定義を使用します。

もう1つの構文は、その値が関数であるプロパティを宣言することです。これにより、クラスのインスタンスごとに新しい関数が作成されます。この方法は、 `this` スコープが常にクラスインスタンスを指すアロー関数( `() =>` )を使いたい場合に、特に役立ちます(その代わり、時間とメモリーが犠牲になります)。

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

#### 8.2.2.1 明確に割り当てられたプロパティ

```typescript
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

## 8.3 型としてのクラス

TypeScriptは、あるクラスのすべてのメンバーを含むオブジェクト型を、そのクラスに割り当て可能であると見なします。これは、TypeScriptの構造的片付けがオブジェクトの形状だけに関心があり、そのオブジェクトがどのように宣言されているかについては気にしないからです

```typescript
class SchoolBus {
  getAbilities() {
    return ["drive", "honk"];
  }
}
function withSchoolBus(bus: SchoolBus) {
  console.log(bus.getAbilities());
}
withSchoolBus(new SchoolBus()); // Ok
withSchoolBus({
  getAbilities: () => ["drive", "honk"],
}); // Ok
withSchoolBus({
  getAbilities: () => 123, // error
});
```

## 8.5 クラスの拡張

### 8.5.1 クラス拡張の割り当て可能性

```typescript
class Lesson {
  subject: string;

  constructor(subject: string) {
    this.subject = subject;
  }
}

class OnlineLesson {
  url: string;

  constructor(subject: string, url: string) {
    super(subject);
    this.url = url;
  }
}

let lesson: Lesson;
lesson = new Lesson("Math"); // Ok
lesson = new OnlineLesson("Math", "http://example.com"); // Ok

let online: OnlineLesson;
online = new OnlineLesson("Math", "http://example.com"); // Ok
online = new Lesson("Math"); // error
```

サブクラスのすべてのメンバーが、そのベースクラスにすでに同じ型で存在する場合は、ベースクラスのインスタンスをサブクラスの代わりに使うことが許されます。

```typescript
class PastGrades {
  grades: number[] = [];
}
class LabeledPastGrades extends PastGrades {
  labels?: string;
}
let subClass: LabeledPastGrades;
subClass = new LabeledPastGrades(); // Ok
subClass = new PastGrades(); // Ok
```

### 8.5.2 オーバーライドされたコンストラクター

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

### 8.5.3 オーバーライドされたメソッド

サブクラスは、ベースクラスと同じ名前の新しいメソッドを再宣言できます。ただし、サブクラスのメソッドはベースクラスのメソッドに割り当て可能でなければなりません。

```typescript
class GradeCounter {
  countGrades(grades: string[], letter: string) {
    return grades.filter((grade) => grade === letter).length;
  }
}

class FailureCounter {
  countGrades(grades: string[]) {
    return super.countGrades(grades, "F");
  }
}

class AnyFailureChecker {
  countGrades(grades: string[]) {
    return super.countGrades(grades, "F") !== 0; // error
  }
}
```

## 8.7 メンバーの可視性

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
