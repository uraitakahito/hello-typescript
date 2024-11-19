//
// @typescript-eslint/naming-convention should complain about this code:
//

// Enum name `sex` must match one of the following formats: UPPER_CASE
enum sex {
  // Enum Member name `male` must match one of the following formats: UPPER_CASE
  male = 0,
  FEMALE = 1,
}

class Person {
  name: string;

  // Class Property name `amhuman` must have one of the following prefixes: can, did, has, is, must, needs, should, will
  amhuman: boolean;

  sex: sex;

  constructor(name: string, s = sex.male) {
    this.name = name;
    this.amhuman = true;
    this.sex = s;
  }
}

// Type parameter name `foo` must match one of the following formats: PascalCase
function identity<foo>(input: foo) {
  return input;
}

const tanaka = new Person('tanaka');
console.log(identity<Person>(tanaka));
