/* eslint-disable no-console */
function fizzbuzz(n: number): number | 'Fizz' | 'Buzz' | 'FizzBuzz' {
  if (n % 15 === 0) {
    return 'FizzBuzz';
  }
  if (n % 3 === 0) {
    return 'Fizz';
  }
  if (n % 5 === 0) {
    return 'Buzz';
  }
  return n;
}

let a: number = 1;
console.log(fizzbuzz(a += 1));
console.log(fizzbuzz(a += 1));
console.log(fizzbuzz(a += 1));
console.log(fizzbuzz(a += 1));
console.log(fizzbuzz(a += 1));
