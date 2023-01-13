// Natural numbers only include positive integers.

function sumNaturalNums(num) { 
  if(num < 1) return 0;

  let res = num + sumNaturalNums(num - 1)

  return res;
}

console.log(sumNaturalNums(10));