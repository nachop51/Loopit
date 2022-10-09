function FizzBuzz(n) {
  for (let i = 0, s = ""; i < n; i++, s = "") {
    if (i % 3 == 0) s += "Fizz";
    if (i % 5 == 0) s += "Buzz";
    console.log(s != "" ? s : i);
  }
}

FizzBuzz(100);
